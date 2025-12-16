class AudioService {
  private currentAudio: HTMLAudioElement | null = null;
  public isUnlocked: boolean = false;

  public unlock() {
    if (this.isUnlocked) return;
    
    // Play a silent sound to unlock audio on iOS/Android WebViews
    // This allows subsequent audio playback without user interaction
    const silentAudio = new Audio("data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//OEAAAAAAAAAAAAAAAAAAAAAAAASW5mbQAAAA8AAAAEAAABIADAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMD//////////////////////////////////////////////////////////////////wAAAAA=");
    silentAudio.play().then(() => {
      this.isUnlocked = true;
    }).catch(e => {
      console.warn("Audio unlock failed (interaction might be needed)", e);
    });
    
    // Optimistically set to true
    this.isUnlocked = true;
  }

  /**
   * Play audio for the given text using HTML5 Audio.
   * This bypasses the buggy SpeechSynthesis API on Android WebViews.
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

    try {
      // 2. Generate Audio Source URL
      // We use Google Translate TTS API as a reliable source of "audio files" (MPEG stream).
      // This behaves exactly like playing a static MP3 file.
      // NOTE: If you have local files in public/audio, you would change this line to:
      // const url = `/audio/${this.getFilePath(text)}`;
      const encodedText = encodeURIComponent(text);
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=fr&q=${encodedText}`;

      // 3. Create and configure HTML5 Audio
      const audio = new Audio(url);
      this.currentAudio = audio;

      // 4. Attach Event Listeners
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

      // 5. Play
      // Ideally, this method is called within a user interaction event (click/tap)
      // which allows the browser to play audio without blocking.
      const playPromise = audio.play();

      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error('[AudioService] Play request interrupted or failed:', error);
          callbacks?.onError?.(error);
          this.currentAudio = null;
        });
      }

    } catch (e) {
      console.error('[AudioService] Critical error:', e);
      callbacks?.onError?.(e);
    }
  }

  public stop() {
    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
      } catch (e) {
        // Ignore errors during cleanup
      }
      this.currentAudio = null;
    }
  }

  // Helper method if you switch to local files later
  private getFilePath(text: string): string {
    // Simple logic to map text to filename if needed
    // e.g., "Bonjour" -> "vocab/bonjour.mp3"
    return `vocab/${text.toLowerCase().replace(/[^a-z0-9]/g, '_')}.mp3`;
  }
}

export const audioService = new AudioService();