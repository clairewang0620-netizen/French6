// ----------------------------------------------------------------------
// 🔊 终极音频引擎：MP3 优先 + 浏览器 TTS 自动降级
// ----------------------------------------------------------------------

/**
 * 使用浏览器原生 SpeechSynthesis 发音（法语）
 */
function speakTTS(text: string) {
  if (!window.speechSynthesis) return;
  
  // 取消当前正在进行的播放
  window.speechSynthesis.cancel();
  
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'fr-FR'; // 强制法语
  utterance.rate = 0.9;     // 语速略慢，方便学习
  utterance.pitch = 1.0;
  
  console.log(`[Audio Engine] 触发浏览器 TTS 降级发音: "${text}"`);
  window.speechSynthesis.speak(utterance);
}

/**
 * 核心播放函数：尝试加载 MP3，失败则降级到 TTS
 */
export function playAudioByPath(text: string, path: string) {
  // 确保绝对路径
  const absolutePath = path.startsWith('/') ? path : `/${path}`;
  
  console.log(`[Audio Engine] 尝试加载 MP3: ${absolutePath}`);
  
  const audio = document.createElement('audio');
  audio.src = absolutePath;
  audio.autoplay = true;
  audio.style.display = 'none';

  // 播放成功监听
  audio.onplay = () => {
    console.log(`[Audio Engine] MP3 播放成功: ${absolutePath}`);
  };

  // 关键：加载失败监听（例如 404）
  audio.onerror = () => {
    console.warn(`[Audio Engine] MP3 资源不存在: ${absolutePath}。正在切换到系统 TTS...`);
    // 自动降级到 TTS
    speakTTS(text);
    
    if (document.body.contains(audio)) {
      document.body.removeChild(audio);
    }
  };

  audio.onended = () => {
    if (document.body.contains(audio)) {
      document.body.removeChild(audio);
    }
  };

  document.body.appendChild(audio);
  
  // 显式触发
  audio.play().catch(() => {
    // 如果浏览器拦截了 MP3（通常是没交互），尝试 TTS 作为最后保障
    console.warn('[Audio Engine] MP3 被浏览器拦截');
  });
}

/**
 * 文件名转换
 */
const slugify = (text: string): string => {
  return text
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
};

export const audioService = {
  /**
   * 业务发音入口
   */
  play: (text: string) => {
    if (!text) return;
    const filename = slugify(text);
    const path = `/audio/${filename}.mp3`;
    playAudioByPath(text, path);
  },

  /**
   * 测试入口
   */
  test: () => {
    // 测试时同时尝试播放文件和 TTS
    playAudioByPath("Bonjour", "/audio/test.mp3");
  }
};