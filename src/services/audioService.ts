class AudioService {
  private synth: SpeechSynthesis;
  private voice: SpeechSynthesisVoice | null = null;
  private lang = 'fr-FR';

  constructor() {
    this.synth = window.speechSynthesis;
    
    if (!this.synth) {
      console.warn('SpeechSynthesis is not supported in this environment.');
      return;
    }

    this.initVoice();
    
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = () => this.initVoice();
    }
  }

  private initVoice() {
    if (!this.synth) return;
    
    const voices = this.synth.getVoices();
    this.voice = voices.find(v => v.lang === 'fr-FR' && !v.name.includes('Google')) || 
                 voices.find(v => v.lang === 'fr-FR') || 
                 voices.find(v => v.lang.startsWith('fr')) || 
                 null;
  }

  public speak(text: string, rate: number = 0.85) {
    if (!this.synth) return;

    if (this.synth.speaking) {
      this.synth.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    
    if (!this.voice) this.initVoice();
    if (this.voice) {
      utterance.voice = this.voice;
    }

    utterance.lang = this.lang;
    utterance.rate = rate;
    utterance.pitch = 1;

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