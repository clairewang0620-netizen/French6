class AudioService {
  private currentAudio: HTMLAudioElement | null = null;
  public isUnlocked: boolean = false;
  private audioContext: any = null; // Use any to support webkitAudioContext without strict type issues

  /**
   * GLOBAL AUDIO UNLOCK
   * Critical for iOS/Android/WeChat compatibility.
   * Must be called inside a synchronous user interaction event (click/touch).
   */
  public unlock() {
    if (this.isUnlocked) return;

    try {
      // 1. Resume/Create AudioContext (Web Audio API)
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        this.audioContext = new AudioContextClass();
        this.audioContext.resume().catch((e: any) => console.warn('AudioContext resume failed', e));
      }

      // 2. Play silent HTML5 Audio (DOM Audio)
      // Minimal silent MP3 data URI to wake up the audio thread
      const silentMp3 = 'data:audio/mp3;base64,//uQZAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAP/7kGQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==';
      const silentAudio = new Audio(silentMp3);
      silentAudio.play().then(() => {
        console.log('[AudioService] Audio unlocked successfully');
      }).catch((e) => {
        // Expected if interaction is not valid, but we try anyway
        console.warn('[AudioService] Silent unlock failed', e);
      });

      this.isUnlocked = true;
    } catch (e) {
      console.error('[AudioService] Unlock error', e);
    }
  }

  /**
   * Unified speak method using HTML5 Audio only.
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
    // Using the fixed sample file to ensure sound output on all devices as requested.
    const src = "/audio/fr_sample.mp3";

    try {
      const audio = new Audio(src);
      this.currentAudio = audio;

      // 3. Mandatory Attributes for Mobile
      audio.preload = "auto";
      // @ts-ignore
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

      // 5. Load & Play
      audio.load();
      
      // Reset time to ensure clean start
      audio.currentTime = 0;

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((e) => {
          console.warn('[AudioService] Play blocked. Ensure audioService.unlock() was called on user interaction.', e);
          callbacks?.onError?.(e);
        });
      }

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
      } catch (e) {
        // Ignore errors during stop
      }
      this.currentAudio = null;
    }
  }
}

export const audioService = new AudioService();