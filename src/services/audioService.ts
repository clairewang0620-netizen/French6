// 极简音频服务：只负责生成 URL 并播放
export const audioService = {
  /**
   * 播放法语发音
   * 使用 Google TTS 接口获取标准 MP3 流
   * 严格遵循 new Audio() 规范，无 AudioContext
   */
  play: (text: string) => {
    if (!text) return;

    try {
      // 构造 Google TTS MP3 地址
      // client=tw-ob 是公开稳定接口
      // tl=fr 指定法语
      const encodedText = encodeURIComponent(text);
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=fr&q=${encodedText}`;

      const audio = new Audio(url);
      
      // 强制设置
      audio.preload = 'auto';
      audio.currentTime = 0;

      // 播放并捕获错误（如网络问题）
      audio.play().catch(err => {
        console.error('[Audio] Playback failed:', err);
      });
      
    } catch (e) {
      console.error('[Audio] Setup failed:', e);
    }
  }
};