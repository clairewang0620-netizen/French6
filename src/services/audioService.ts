class AudioService {
  private synth: SpeechSynthesis;
  private voice: SpeechSynthesisVoice | null = null;

  constructor() {
    this.synth = window.speechSynthesis;
    
    if (!this.synth) {
      console.warn('SpeechSynthesis is not supported in this environment.');
      return;
    }

    // Initialize voice immediately
    this.initVoice();
    
    // Re-initialize when voices are loaded (crucial for Chrome/Android where voices load asynchronously)
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = () => this.initVoice();
    }
  }

  private initVoice() {
    if (!this.synth) return;
    
    const voices = this.synth.getVoices();
    if (voices.length === 0) return;

    // ---------------------------------------------------------
    // CRITICAL FIX: Strict French Voice Selection Logic
    // ---------------------------------------------------------
    // 1. Prioritize "fr-FR" (Standard French)
    // 2. Normalize 'fr_FR' to 'fr-FR' (for older Android WebViews)
    // 3. Fallback to any 'fr' (fr-CA, fr-BE, etc.)
    // 4. Removed exclusion of "Google" voices (they are often the best quality)
    
    this.voice = voices.find(v => v.lang.replace('_', '-') === 'fr-FR') || 
                 voices.find(v => v.lang.startsWith('fr')) || 
                 null;

    if (this.voice) {
      console.log(`[AudioService] Voice initialized: ${this.voice.name} (${this.voice.lang})`);
    } else {
      console.warn('[AudioService] No specific French voice found. Will force lang="fr-FR" as fallback.');
    }
  }

  public speak(text: string, rate: number = 0.85) {
    if (!this.synth) return;

    // Retry voice selection if it failed initially (race condition fix)
    // This is vital for Safari which might reload voices on interaction
    if (!this.voice) {
      this.initVoice();
    }

    if (this.synth.speaking) {
      this.synth.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    
    // ---------------------------------------------------------
    // CRITICAL FIX: Enforce Language & Voice Object
    // ---------------------------------------------------------
    // 1. Always set lang to fr-FR, even if no voice object found
    utterance.lang = 'fr-FR';

    // 2. Explicitly attach the French voice object if available
    // This prevents the browser from using the System Default (English) 
    // even if lang is set to French (common bug in mobile Safari/Chrome).
    if (this.voice) {
      utterance.voice = this.voice;
    }

    utterance.rate = rate;
    utterance.pitch = 1;

    // Debugging Protection: Verify in console that "voice" is NOT English
    console.log(
      "[TTS]",
      "text:", text.length > 20 ? text.substring(0, 20) + "..." : text,
      "lang:", utterance.lang,
      "voice:", utterance.voice ? `${utterance.voice.name} (${utterance.voice.lang})` : "System Default"
    );

    utterance.onerror = (e) => {
      console.error('Speech synthesis error:', e);
    };

    this.synth.speak(utterance);
  }

  public stop() {
    if (this.synth && this.synth.speaking) {
      this.synth.cancel();
    }
  }
}

export const audioService = new AudioService();