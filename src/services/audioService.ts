// ----------------------------------------------------------------------
// 📱 移动端（iOS/Android）终极兼容版音频引擎
// ----------------------------------------------------------------------

let _audioInstance: HTMLAudioElement | null = null;
let _isUnlocked = false;

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
 * 核心：浏览器原生 TTS 发音（法语）
 */
function speakTTS(text: string) {
  if (!window.speechSynthesis) return;

  // iOS 必须先 cancel，否则可能导致整个 TTS 队列永久阻塞
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'fr-FR';
  utterance.rate = 0.9;
  utterance.pitch = 1.0;

  console.log(`[Audio Engine] 系统 TTS 发音: "${text}"`);
  
  // 延迟一小会儿执行，防止与上一个音频结束冲突
  setTimeout(() => {
    window.speechSynthesis.speak(utterance);
  }, 50);
}

/**
 * 路径转换函数
 */
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
   * 解锁音频上下文 (必须由用户手势事件直接触发)
   * 建议在 AccessGuard 的“验证进入”按钮或页面首次点击时调用
   */
  unlock: () => {
    if (_isUnlocked) return;
    
    // 1. 解锁 HTML5 Audio
    const audio = getAudioInstance();
    const silentBlob = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAA==";
    audio.src = silentBlob;
    audio.play().then(() => {
      _isUnlocked = true;
      console.log("[Audio Engine] 移动端 Audio 上下文已解锁");
    }).catch(e => console.warn("[Audio Engine] Audio 解锁失败:", e));

    // 2. 解锁 TTS (iOS 有时需要通过一个空的 speak 来解锁)
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

    // 每次播放都尝试解锁（以防万一）
    audioService.unlock();

    const filename = slugify(text);
    const path = `/audio/${filename}.mp3`;
    const audio = getAudioInstance();

    console.log(`[Audio Engine] 尝试播放 MP3: ${path}`);

    // 清除之前的监听器，防止回调堆积
    audio.onended = null;
    audio.onerror = null;

    // 如果播放 MP3 失败（404 或 拦截），则降级到 TTS
    const handleFallback = () => {
      console.warn(`[Audio Engine] MP3 无法播放，正在降级到系统 TTS: "${text}"`);
      speakTTS(text);
    };

    audio.onerror = handleFallback;

    // 执行播放
    audio.src = path;
    audio.play().catch(error => {
      console.error("[Audio Engine] 播放 Promise 被拦截:", error.name);
      handleFallback();
    });
  },

  /**
   * 测试音频
   */
  test: () => {
    audioService.play("Bonjour");
  }
};
