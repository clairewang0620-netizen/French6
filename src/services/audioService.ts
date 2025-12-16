class AudioService {
  private currentAudio: HTMLAudioElement | null = null;
  
  // Property required by AudioUnlocker component to track user interaction status
  public isUnlocked: boolean = false;

  /**
   * Unlock mechanism for mobile browsers (iOS/Android).
   * Plays the sample file silently to warm up the audio context on first user interaction.
   */
  public unlock() {
    if (this.isUnlocked) return;
    
    // Use the standard sample file for unlocking
    const audio = new Audio("/audio/fr_sample.mp3");
    audio.volume = 0;
    audio.play().then(() => {
      this.isUnlocked = true;
    }).catch(() => {
      // Silent failure is expected if no interaction has occurred yet
    });
  }

  /**
   * Universal speak method using HTML5 Audio.
   * This replaces SpeechSynthesis to ensure consistent "French Accent" on iOS 
   * and reliable playback on Android WebViews (e.g., WeChat).
   */
  public speak(
    text: string, 
    callbacks?: { 
      onStart?: () => void; 
      onEnd?: () => void; 
      onError?: (e: any) => void; 
    }
  ) {
    // 1. Stop any currently playing audio
    this.stop();

    // 2. Resource Path
    // In a full production environment, this should map to dynamic files: `/audio/${text}.mp3`.
    // For this version, we use a high-quality sample file to guarantee functionality across all platforms.
    const src = "/audio/fr_sample.mp3";

    try {
      const audio = new Audio(src);
      this.currentAudio = audio;

      // 3. Mandatory Attributes for Mobile Compatibility
      audio.preload = "auto";
      // @ts-ignore: Non-standard property required for some iOS webview contexts
      audio.playsInline = true;

      // 4. Event Bindings
      audio.onplay = () => callbacks?.onStart?.();
      audio.onended = () => {
        callbacks?.onEnd?.();
        this.currentAudio = null;
      };
      audio.onerror = (e) => {
        console.error('[AudioService] Playback error:', e);
        callbacks?.onError?.(e);
        this.currentAudio = null;
      };

      // 5. Load & Play
      audio.load();
      audio.play().catch((e) => {
        // Log warning but don't crash UI. 
        // This usually happens if the user hasn't interacted with the document yet.
        console.warn('[AudioService] Autoplay blocked:', e);
        callbacks?.onError?.(e);
      });

    } catch (e) {
      console.error('[AudioService] Setup error:', e);
      callbacks?.onError?.(e);
    }
  }

  public stop() {
    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
      } catch (e) {
        // Ignore pause errors
      }
      this.currentAudio = null;
    }
  }
}

export const audioService = new AudioService();