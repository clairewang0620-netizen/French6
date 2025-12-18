// ----------------------------------------------------------------------
// 📱 移动端（iOS/Android）终极兼容版音频引擎 V3
// ----------------------------------------------------------------------

let _audioInstance: HTMLAudioElement | null = null;
let _isUnlocked = false;
let _frenchVoice: SpeechSynthesisVoice | null = null;

/**
 * 获取系统中的法语语音包（解决 iOS 发出英语声音的关键）
 */
function getFrenchVoice(): SpeechSynthesisVoice | null {
  if (_frenchVoice) return _frenchVoice;
  if (typeof window === 'undefined' || !window.speechSynthesis) return null;

  const voices = window.speechSynthesis.getVoices();
  // 优先级：fr-FR (法国) > fr-CA (加拿大) > 任何包含 fr 的
  _frenchVoice = 
    voices.find(v => v.lang === 'fr-FR' && v.localService) ||
    voices.find(v => v.lang === 'fr-FR') ||
    voices.find(v => v.lang.includes('fr')) ||
    null;
  
  return _frenchVoice;
}

// 某些浏览器 getVoices() 是异步加载的，需要监听变化
if (typeof window !== 'undefined' && window.speechSynthesis) {
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = getFrenchVoice;
  }
}

/**
 * 获取或创建全局单例 Audio 对象
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

/**
 * 核心：浏览器原生 TTS 发音
 */
function speakTTS(text: string) {
  if (!window.speechSynthesis) return;

  // 1. 停止之前的播放
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  
  // 2. 强制指定语言和语音包（防止 iOS 默认播英语）
  utterance.lang = 'fr-FR';
  const voice = getFrenchVoice();
  if (voice) {
    utterance.voice = voice;
    console.log(`[Audio Engine] 使用特定语音包: ${voice.name}`);
  } else {
    console.warn(`[Audio Engine] 未找到特定法语语音包，使用默认 fr-FR 设置`);
  }

  utterance.rate = 0.85; // 稍慢一点点，法语更清晰
  utterance.pitch = 1.0;
  utterance.volume = 1.0;

  // 3. 播放
  window.speechSynthesis.speak(utterance);
}

const slugify = (text: string): string => {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
};

export const audioService = {
  /**
   * 解锁音频上下文
   */
  unlock: () => {
    if (_isUnlocked) return;
    
    // 移动端必须在点击事件中立即触发一次 play
    const audio = getAudioInstance();
    audio.src = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAA==";
    const p = audio.play();
    if (p) {
      p.then(() => {
        _isUnlocked = true;
        console.log("[Audio Engine] 移动端上下文已解锁");
      }).catch(() => {});
    }

    // 预热 TTS
    if (window.speechSynthesis) {
      const u = new SpeechSynthesisUtterance("");
      u.volume = 0;
      window.speechSynthesis.speak(u);
    }
  },

  /**
   * 业务播放主函数
   */
  play: (text: string) => {
    if (!text) return;

    // 1. 确保在用户交互栈中调用解锁
    audioService.unlock();

    // 2. 立即尝试 TTS（作为同步备选，防止异步拦截）
    // 注意：在某些极其严格的移动设备上，异步获取 MP3 失败后再调 TTS 会被拦截
    // 所以我们需要一个更稳健的策略
    
    const filename = slugify(text);
    const path = `/audio/${filename}.mp3`;
    const audio = getAudioInstance();

    console.log(`[Audio Engine] 尝试播放 MP3: ${path}`);

    // 清除旧状态
    audio.onended = null;
    audio.onerror = null;

    // 如果 MP3 报错（404 等），切换到 TTS
    audio.onerror = () => {
      console.warn(`[Audio Engine] MP3 资源失效，降级到 TTS`);
      speakTTS(text);
    };

    audio.src = path;
    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise.catch(error => {
        // 如果 MP3 因为路径、网络或交互限制被拦截，直接改用 TTS
        console.error("[Audio Engine] MP3 播放失败，立即执行 TTS 补偿");
        speakTTS(text);
      });
    }
  },

  test: () => {
    audioService.play("Bonjour");
  }
};