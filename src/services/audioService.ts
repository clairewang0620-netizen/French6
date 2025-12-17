export const audioService = {
  /**
   * Play static audio file.
   * Currently mapped to a single sample file to ensure stability across all devices.
   */
  play: (text: string) => {
    if (!text) return;

    // ⚠️ Production Note:
    // Once you have the full set of audio files, uncomment the dynamic logic below:
    // const filename = text.trim().toLowerCase().replace(/[^a-z0-9]/g, '_');
    // const url = `/audio/${filename}.mp3`;

    // ✅ Current Stable Implementation:
    // Points to a single existing file to guarantee no 404 errors on any device.
    const url = '/audio/fr_sample.mp3';

    const audio = new Audio(url);
    audio.preload = 'auto';
    audio.currentTime = 0;

    audio.play().catch(err => {
      console.error('[Audio] Playback failed. Ensure /audio/fr_sample.mp3 exists.', err);
    });
  }
};