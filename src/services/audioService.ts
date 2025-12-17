export const audioService = {
  /**
   * 播放静态音频文件。
   * 目前统一映射到单个样本文件，以确保在 iOS/Android 上的绝对稳定性。
   */
  play: (text: string) => {
    if (!text) return;

    // ⚠️ 生产环境说明：
    // 当您准备好所有音频文件后，请取消下方注释并使用动态路径：
    // const filename = text.trim().toLowerCase().replace(/[^a-z0-9]/g, '_');
    // const url = `/audio/${filename}.mp3`;

    // ✅ 当前稳定版实现：
    // 指向唯一的样本文件，确保点击必有声音，无 404 错误。
    const url = '/audio/fr_sample.mp3';

    try {
      const audio = new Audio(url);
      
      // 兼容性设置
      audio.preload = 'auto';
      audio.currentTime = 0;

      // 播放并捕获潜在错误（如用户未交互时的自动播放限制）
      audio.play().catch(err => {
        console.error('[Audio] 播放失败。请检查 /audio/fr_sample.mp3 是否存在。', err);
      });
    } catch (error) {
      console.error('[Audio] 初始化失败:', error);
    }
  }
};