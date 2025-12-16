class AudioService {
  private synth: SpeechSynthesis;
  private voices: SpeechSynthesisVoice[] = [];
  // ⚠️ CRITICAL: Keep a reference to the active utterance to prevent garbage collection
  // causing audio to cut off prematurely on iOS Safari.
  private activeUtterance: SpeechSynthesisUtterance | null = null;
  private voicesLoaded: boolean = false;

  constructor() {
    this.synth = window.speechSynthesis;
    
    // Initial load attempt
    this.loadVoices();

    // Async load listener (Required for Chrome/Android)
    if (this.synth && this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = () => {
        this.loadVoices();
      };
    }
  }

  private loadVoices() {
    if (!this.synth) return;
    
    const allVoices = this.synth.getVoices();
    if (allVoices.length > 0) {
      this.voices = allVoices;
      this.voicesLoaded = true;
      console.log(`[AudioService] Voices loaded: ${allVoices.length} available.`);
    }
  }

  /**
   * Selects the best possible French voice based on platform quirks.
   */
  private getBestVoice(): SpeechSynthesisVoice | null {
    if (this.voices.length === 0) {
      this.loadVoices(); // Last ditch attempt
    }

    // 1. Exact match for France French (fr-FR)
    // Priority: Premium/Enhanced voices often contain "Siri", "Google", "Thomas", "Audrey"
    let voice = this.voices.find(v => v.lang === 'fr-FR' && !v.name.includes('Compact'));
    
    // 2. Any fr-FR
    if (!voice) {
      voice = this.voices.find(v => v.lang === 'fr-FR');
    }

    // 3. Fallback to any French (fr-CA, fr-BE, etc.)
    if (!voice) {
      voice = this.voices.find(v => v.lang.startsWith('fr'));
    }

    return voice || null;
  }

  /**
   * Public API to speak text.
   * Now accepts callbacks to manage UI state.
   */
  public speak(
    text: string, 
    callbacks?: { 
      onStart?: () => void; 
      onEnd?: () => void; 
      onError?: (e: any) => void; 
    }
  ) {
    if (!this.synth) {
      console.error('[AudioService] SpeechSynthesis not supported.');
      callbacks?.onError?.('Not supported');
      return;
    }

    // 1. Cancel any currently playing audio (Global Reset)
    this.stop();

    // 2. Select Voice
    const selectedVoice = this.getBestVoice();
    
    // Debugging info
    const ua = navigator.userAgent;
    const platform = /iPad|iPhone|iPod/.test(ua) ? 'iOS' : /Android/.test(ua) ? 'Android' : 'Desktop';
    console.log(`[AudioService] Platform: ${platform}`);
    console.log(`[AudioService] Voice: ${selectedVoice ? `${selectedVoice.name} (${selectedVoice.lang})` : 'System Default'}`);

    // 3. Create Utterance
    const utterance = new SpeechSynthesisUtterance(text);
    
    // 4. Configure Utterance
    utterance.text = text;
    utterance.rate = 0.9; // Slightly slower for better clarity
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    // IMPORTANT: Set lang explicitly. 
    // Android Chrome sometimes ignores the voice object if lang isn't set matching it.
    utterance.lang = selectedVoice ? selectedVoice.lang : 'fr-FR';

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    // 5. Event Handling
    utterance.onstart = () => {
      console.log('[AudioService] Start');
      callbacks?.onStart?.();
    };

    utterance.onend = () => {
      console.log('[AudioService] End');
      callbacks?.onEnd?.();
      this.activeUtterance = null; // Release reference
    };

    utterance.onerror = (e) => {
      console.error('[AudioService] Error', e);
      // Cancel is considered an error in some browsers, but we treat it as an end for UI purposes if needed
      // but here we send error.
      if (e.error !== 'interrupted') {
          callbacks?.onError?.(e);
      } else {
          // If interrupted (by another click), strictly speaking, it ended.
          callbacks?.onEnd?.(); 
      }
      this.activeUtterance = null;
    };

    // 6. Assign to class property to prevent Garbage Collection (Crucial for iOS)
    this.activeUtterance = utterance;

    // 7. Speak
    // Small timeout ensures the 'cancel' operation has fully processed in the engine
    setTimeout(() => {
        this.synth.speak(utterance);
    }, 10);
  }

  public stop() {
    if (this.synth.speaking || this.synth.pending) {
      this.synth.cancel();
      this.activeUtterance = null;
    }
  }

  public isReady(): boolean {
    return this.voices.length > 0 || this.synth.getVoices().length > 0;
  }
}

export const audioService = new AudioService();