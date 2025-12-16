class AudioService {
  private currentAudio: HTMLAudioElement | null = null;
  public isUnlocked: boolean = false;

  /**
   * Unlock audio context/permissions on mobile devices (triggered by user interaction)
   * This plays a silent buffer to "warm up" the audio engine.
   */
  public unlock() {
    if (this.isUnlocked) return;
    
    // Shortest possible silent MP3 base64
    const silent = "data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//OEAAAAAAAAAAAAAAAAAAAAAAAASW5mbQAAAA8AAAAEAAABIADAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMD//////////////////////////////////////////////////////////////////wAAAAA=";
    const a = new Audio(silent);
    a.play().then(() => {
      this.isUnlocked = true;
      console.log("[AudioService] Audio unlocked");
    }).catch(e => {
      console.warn("[AudioService] Unlock failed (interaction needed)", e);
    });
  }

  /**
   * Play audio with hybrid strategy
   */
  public speak(
    text: string, 
    callbacks?: { 
      onStart?: () => void; 
      onEnd?: () => void; 
      onError?: (e: any) => void; 
    }
  ) {
    // 1. Stop any currently playing audio or TTS
    this.stop();

    const isAndroid = /Android/i.test(navigator.userAgent);

    if (isAndroid) {
      // --- ANDROID STRATEGY: HTML5 Audio ---
      // We use HTML5 Audio to bypass Android WebView TTS issues.
      // We point to Google Translate TTS API which acts as a "remote file".
      // This ensures playback works immediately without needing to upload local MP3s manually.
      try {
        const encodedText = encodeURIComponent(text);
        const url = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=fr&q=${encodedText}`;
        
        const audio = new Audio(url);
        this.currentAudio = audio;

        // Bind events
        audio.onplay = () => callbacks?.onStart?.();
        audio.onended = () => {
          callbacks?.onEnd?.();
          this.currentAudio = null;
        };
        audio.onerror = (e) => {
          console.error('[AudioService] Android HTML5 Audio error:', e);
          // Fallback: try local file if remote fails (e.g. offline)
          if (audio.src !== "/audio/sample-fr.mp3") {
              console.log("Retrying with local sample file...");
              audio.src = "/audio/sample-fr.mp3";
              audio.play();
          } else {
              callbacks?.onError?.(e);
              this.currentAudio = null;
          }
        };

        // Play
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(e => {
            console.error('[AudioService] Play blocked:', e);
            callbacks?.onError?.(e);
          });
        }
      } catch (e) {
        console.error('[AudioService] Android setup failed:', e);
        callbacks?.onError?.(e);
      }
    } else {
      // --- IOS / DESKTOP STRATEGY: Web Speech API ---
      // iOS Safari handles SpeechSynthesis very well and it saves bandwidth.
      if ('speechSynthesis' in window) {
        try {
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.lang = 'fr-FR'; 
          utterance.rate = 0.9; 

          utterance.onstart = () => callbacks?.onStart?.();
          utterance.onend = () => callbacks?.onEnd?.();
          utterance.onerror = (e) => {
             console.error('[AudioService] TTS error:', e);
             callbacks?.onError?.(e);
          };

          // iOS quirk: Cancel before speaking to prevent queue deadlocks
          window.speechSynthesis.cancel();
          window.speechSynthesis.speak(utterance);
        } catch (e) {
          console.error('[AudioService] TTS setup failed:', e);
          callbacks?.onError?.(e);
        }
      } else {
        callbacks?.onError?.('TTS Not supported');
      }
    }
  }

  public stop() {
    // Stop HTML5 Audio
    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
      } catch (e) {}
      this.currentAudio = null;
    }

    // Stop TTS
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

export const audioService = new AudioService();