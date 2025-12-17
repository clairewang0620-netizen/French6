// ----------------------------------------------------------------------
// 🔊 Audio Service (Static MP3 Implementation)
// ----------------------------------------------------------------------
// 专为移动端 (iOS/Android/WeChat) 优化的原生播放方案
// ----------------------------------------------------------------------

let currentAudio: HTMLAudioElement | null = null;

/**
 * 核心播放函数 (Singleton Pattern)
 * @param filename 不带后缀的文件名
 */
function playFrenchAudio(filename: string) {
  try {
    // 1. 停止当前音频，防止重叠
    if (currentAudio) {
      currentAudio.pause();
      currentAudio = null;
    }

    // 2. 构造路径 (相对路径，适配 base: './')
    const src = `audio/fr/${filename}.mp3`;
    const audio = new Audio(src);
    
    // 3. 配置
    audio.preload = 'auto';
    // audio.crossOrigin = 'anonymous'; // 如有跨域需求可开启

    // 4. 事件监听 (遵循 iOS/Android 交互策略)
    audio.oncanplaythrough = () => {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          // 常见错误：用户未交互导致自动播放被拦截
          console.error('[Audio] Playback interrupted:', error);
        });
      }
    };

    audio.onerror = (e) => {
      console.warn(`[Audio 404] 无法加载音频: ${src}`);
      console.warn(`[Hint] 请确保 public/audio/fr/ 目录下存在名为 "${filename}.mp3" 的文件`);
    };

    // 5. 更新当前实例
    currentAudio = audio;

    // 6. 尝试立即加载 (部分浏览器需要)
    audio.load();

  } catch (err) {
    console.error('[Audio Exception]', err);
  }
}

export const audioService = {
  /**
   * 播放文本对应的音频
   * @param text 法语原文 (例如: "Bonjour, ça va ?")
   */
  play: (text: string) => {
    if (!text) return;

    // -------------------------------------------------------
    // 文件名标准化逻辑 (Slugify)
    // -------------------------------------------------------
    // 规则：
    // 1. 去除重音 (é -> e, à -> a)
    // 2. 转小写
    // 3. 移除撇号 (c'est -> cest)
    // 4. 替换非字母数字字符为下划线
    // 5. 去除首尾下划线
    // -------------------------------------------------------
    const filename = text
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Remove accents
      .toLowerCase()
      .trim()
      .replace(/['’]/g, '')        // Remove apostrophes
      .replace(/[^a-z0-9]+/g, '_') // Replace symbols with _
      .replace(/^_+|_+$/g, '');    // Trim _

    if (filename) {
      // console.log(`[Audio Debug] "${text}" -> "${filename}.mp3"`);
      playFrenchAudio(filename);
    }
  }
};