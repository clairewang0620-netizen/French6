// ----------------------------------------------------------------------
// 🔊 最终音频引擎 (Absolute Path Injection)
// ----------------------------------------------------------------------

/**
 * 核心播放函数：强制使用绝对根路径引用，防止 SPA 路由导致的路径偏移
 */
export function playAudioByPath(path: string) {
  // 确保路径以 / 开头，例如 /audio/test.mp3
  const absolutePath = path.startsWith('/') ? path : `/${path}`;
  
  console.log(`[Audio Engine] 正在请求: ${absolutePath}`);
  
  const audio = document.createElement('audio');
  audio.src = absolutePath;
  audio.autoplay = true;
  audio.style.display = 'none';

  audio.onended = () => {
    if (document.body.contains(audio)) {
      document.body.removeChild(audio);
    }
  };

  audio.onerror = () => {
    console.error(`[Audio Error 404] 无法在域名根目录下找到文件: ${absolutePath}`);
    if (document.body.contains(audio)) {
      document.body.removeChild(audio);
    }
  };

  document.body.appendChild(audio);
  audio.play().catch(err => {
    console.warn('[Audio] 自动播放拦截:', err.name);
  });
}

/**
 * 文件名转换逻辑
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
   * 业务播放接口：强制指向 /audio/ 扁平目录
   */
  play: (text: string) => {
    if (!text) return;
    const filename = slugify(text);
    // 强制绝对路径 /audio/xxx.mp3
    const path = `/audio/${filename}.mp3`;
    playAudioByPath(path);
  },

  /**
   * 紧急测试入口
   */
  test: () => {
    playAudioByPath('/audio/test.mp3');
  }
};