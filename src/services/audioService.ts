// ----------------------------------------------------------------------
// 📱 移动端（iOS/Android）全浏览器兼容版音频引擎 V5
// ----------------------------------------------------------------------

let _audioInstance: HTMLAudioElement | null = null;
let _isUnlocked = false;
let _cachedFrenchVoice: SpeechSynthesisVoice | null = null;
let _voiceLoadingRetries = 0;

/**
 * 核心：寻找最纯正的法语语音包
 * 兼容性说明：
 * - iOS: 必须匹配名称中含 "Thomas", "Audrey" 或 "Aurélie" 的包。
 * - Android: 必须匹配 "Google" 或 "French" 相关的系统包。
 */
function findFrenchVoice(): SpeechSynthesisVoice | null {
  if (_cachedFrenchVoice) return _cachedFrenchVoice;
  if (typeof window === 'undefined' || !window.speechSynthesis) return null;

  const voices = window.speechSynthesis.getVoices();
  
  // 1. 优先寻找法国(fr-FR)的本地高质量包
  const preferred = voices.find(v => (v.lang === 'fr-FR' || v.lang === 'fr_FR') && (v.name.includes('Thomas') || v.name.includes('Audrey') || v.name.includes('Google')));
  
  // 2. 次优：任何 fr-FR 包
  const secondary = voices.find(v => v.lang === 'fr-FR' || v.lang === 'fr_FR');

  // 3. 兜底：任何包含 fr 字符的包
  const fallback = voices.find(v => v.lang.toLowerCase().startsWith('fr'));

  const finalVoice = preferred || secondary || fallback || null;

  if (finalVoice) {
    _cachedFrenchVoice = finalVoice;
    console.log(`[Audio Engine] 已成功锁定法语语音包: ${finalVoice.name} [${finalVoice.lang}]`);
  }
  return finalVoice;
}

/**
 * 安卓系统特别处理：轮询加载语音库
 * 许多安卓浏览器（如华为、小米）初始化 getVoices() 非常慢
 */
function pollVoices() {
  if (_cachedFrenchVoice || _voiceLoadingRetries > 20) return;
  const v = findFrenchVoice();
  if (!v) {
    _voiceLoadingRetries++;
    setTimeout(pollVoices, 200);
  }
}

// 启动轮询
if (typeof window !== 'undefined' && window.speechSynthesis) {
  pollVoices();
  window.speechSynthesis.onvoiceschanged = () => findFrenchVoice();
}

/**
 * 原生 TTS 发音逻辑
 */
function speakTTS(text: string) {
  if (!window.speechSynthesis) return;

  // 必须先 cancel，防止队列挂起
  window.speechSynthesis.cancel();

  // 创建朗读实例
  const utterance = new SpeechSynthesisUtterance(text);
  
  // 强制法语环境
  utterance.lang = 'fr-FR';
  
  // 尝试绑定法语包
  const voice = findFrenchVoice();
  if (voice) {
    utterance.voice = voice;
  }

  // 移动端参数微调，确保各浏览器一致
  utterance.rate = 0.9;
  utterance.pitch = 1.0;
  utterance.volume = 1.0;

  // 针对部分安卓系统需要“预热”才能发声的问题
  console.log(`[Audio Engine] 正在通过系统 TTS 朗读: "${text}"`);
  
  // iOS 必须在 cancel 后稍微延迟 speak
  setTimeout(() => {
    window.speechSynthesis.speak(utterance);
  }, 50);
}

/**
 * 获取单例 Audio 节点（用于 MP3 播放）
 */
function getAudioInstance() {
  if (!_audioInstance) {
    _audioInstance = new Audio();
    _audioInstance.preload = "auto";
    _audioInstance.style.display = 'none';
    document.body.appendChild(_audioInstance);
  }
  return _audioInstance;
}

const slugify = (text: string): string => {
  return text
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().trim()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
};

export const audioService = {
  /**
   * 解锁音频上下文（必须由用户点击触发）
   */
  unlock: () => {
    if (_isUnlocked) return;
    
    // 1. 解锁 HTML5 Audio
    const audio = getAudioInstance();
    const silentBlob = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAA==";
    audio.src = silentBlob;
    audio.play().then(() => {
      _isUnlocked = true;
      console.log("[Audio Engine] 移动端 HTML5 Audio 已激活");
    }).catch(() => {});

    // 2. 解锁并预热系统 TTS 引擎
    if (window.speechSynthesis) {
      const u = new SpeechSynthesisUtterance("");
      u.volume = 0;
      window.speechSynthesis.speak(u);
      findFrenchVoice(); // 顺便再次尝试加载语音包
    }
  },

  /**
   * 业务播放主函数
   */
  play: (text: string) => {
    if (!text) return;

    // 每次播放都尝试激活上下文（确保万无一失）
    audioService.unlock();

    const filename = slugify(text);
    const path = `/audio/${filename}.mp3`;
    const audio = getAudioInstance();

    const triggerFallback = () => {
      // 检查语音包是否已加载，如果没有，尝试最后一次加载
      if (!_cachedFrenchVoice) findFrenchVoice();
      speakTTS(text);
    };

    audio.onended = null;
    audio.onerror = triggerFallback;

    // 尝试播放 MP3
    audio.src = path;
    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise.catch(error => {
        // 如果 MP3 无法播放或被策略拦截，直接切换到 TTS
        triggerFallback();
      });
    }
  },

  test: () => {
    audioService.play("Bonjour");
  }
};
