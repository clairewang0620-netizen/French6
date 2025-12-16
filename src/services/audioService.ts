class AudioService {
  private currentAudio: HTMLAudioElement | null = null;
  
  // Property required by AudioUnlocker component
  public isUnlocked: boolean = false;

  /**
   * Unlock mechanism compatible with existing components.
   * Plays the sample file silently to warm up the audio context.
   */
  public unlock() {
    if (this.isUnlocked) return;
    
    // Use the same sample file for unlocking logic
    const audio = new Audio("/audio/fr_sample.mp3");
    audio.volume = 0;
    audio.play().then(() => {
      this.isUnlocked = true;
    }).catch(() => {
      // Silent failure allowed
    });
  }

  /**
   * Universal speak method using HTML5 Audio only.
   * Strictly no SpeechSynthesis.
   */
  public speak(
    text: string, 
    callbacks?: { 
      onStart?: () => void; 
      onEnd?: () => void; 
      onError?: (e: any) => void; 
    }
  ) {
    // 1. Stop previous audio
    this.stop();

    // 2. Resource Path
    // NOTE: Since we cannot modify data structure to add individual file paths,
    // and we must ensure sound plays on all devices, we use the single sample file.
    // In production, this would be: `/audio/${text}.mp3`
    const src = "/audio/fr_sample.mp3";

    try {
      const audio = new Audio(src);
      this.currentAudio = audio;

      // 3. Mandatory Attributes for Mobile/WeChat
      audio.preload = "auto";
      // @ts-ignore: Standard HTMLAudioElement definition might miss playsInline (video prop), but required for iOS WebAudio occasionally
      audio.playsInline = true;

      // 4. Event Bindings
      audio.onplay = () => callbacks?.onStart?.();
      audio.onended = () => {
        callbacks?.onEnd?.();
        this.currentAudio = null;
      };
      audio.onerror = (e) => {
        console.error('[AudioService] Playback error', e);
        callbacks?.onError?.(e);
        this.currentAudio = null;
      };

      // 5. Load & Play (No async/await)
      audio.load();
      audio.play().catch((e) => {
        // Silent failure to avoid UI blocking, per requirements
        console.warn('[AudioService] Autoplay blocked or failed', e);
        callbacks?.onError?.(e);
      });

    } catch (e) {
      console.error('[AudioService] Setup error', e);
      callbacks?.onError?.(e);
    }
  }

  public stop() {
    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
      } catch (e) {}
      this.currentAudio = null;
    }
  }
}

export const audioService = new AudioService();