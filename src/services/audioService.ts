export const audioService = {
  /**
   * 播放音频
   * 使用浏览器原生的 Web Speech API (TTS)。
   * 这不需要任何外部 MP3 文件，直接利用系统自带的法语语音引擎。
   */
  play: (text: string) => {
    if (!text) return;

    // 检查浏览器支持
    if (!('speechSynthesis' in window)) {
      console.error('当前浏览器不支持语音合成 (Web Speech API)');
      alert('您的浏览器不支持语音播放，请尝试使用 Chrome、Safari 或 Edge。');
      return;
    }

    try {
      // 1. 停止当前正在播放的任何语音，防止重叠
      window.speechSynthesis.cancel();

      // 2. 创建语音实例
      const utterance = new SpeechSynthesisUtterance(text);

      // 3. 关键配置：设置为法语
      utterance.lang = 'fr-FR'; 
      utterance.rate = 0.8; // 语速：0.8 倍速，适合学习者
      utterance.pitch = 1;  // 音调：正常
      utterance.volume = 1; // 音量：最大

      // 4. 尝试优化语音选择 (针对 iOS/macOS/Android 的高质量语音)
      // 注意：getVoices 是异步的，有时首次加载可能为空，但设置 lang 通常足以触发默认语音
      const voices = window.speechSynthesis.getVoices();
      
      // 优先选择包含 "Google" 或 "Siri" 的法语语音，通常质量更好
      const preferredVoice = voices.find(v => 
        (v.lang === 'fr-FR' || v.lang === 'fr_FR') && 
        (v.name.includes('Google') || v.name.includes('Siri') || v.name.includes('Thomas') || v.name.includes('Audrey'))
      );

      // 如果找不到特定高质量语音，退而求其次找任意法语语音
      const fallbackVoice = voices.find(v => v.lang.startsWith('fr'));

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      } else if (fallbackVoice) {
        utterance.voice = fallbackVoice;
      }

      // 5. 执行播放
      window.speechSynthesis.speak(utterance);

    } catch (error) {
      console.error('[Audio] 播放出错:', error);
    }
  }
};