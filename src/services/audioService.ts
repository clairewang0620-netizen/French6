class AudioService {
  private synth: SpeechSynthesis;
  private voices: SpeechSynthesisVoice[] = [];
  private activeUtterance: SpeechSynthesisUtterance | null = null;
  private voicesLoaded: boolean = false;
  private _isUnlocked: boolean = false;
  private isAndroid: boolean = /Android/i.test(navigator.userAgent);

  constructor() {
    this.synth = window.speechSynthesis;
    this.loadVoices();
    if (this.synth && this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = () => {
        this.loadVoices();
      };
    }
  }

  public get isUnlocked() {
    // Non-Android/Mobile platforms might not strictly need unlocking, 
    // but consistent behavior is safer.
    // However, prompt asks to fix Android.
    return this._isUnlocked;
  }

  public unlock() {
    if (this._isUnlocked) return;

    // 1. Resume AudioContext (Web Audio API)
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContext) {
      const ctx = new AudioContext();
      ctx.resume().catch(() => {});
    }

    // 2. Warm up SpeechSynthesis
    if (this.synth) {
      this.synth.cancel(); // Reset
      const warmUp = new SpeechSynthesisUtterance('');
      warmUp.volume = 0;
      warmUp.rate = 1;
      warmUp.text = ' ';
      this.synth.speak(warmUp);
    }

    this._isUnlocked = true;
    console.log('[AudioService] Audio unlocked');
  }

  private loadVoices() {
    if (!this.synth) return;
    const allVoices = this.synth.getVoices();
    if (allVoices.length > 0) {
      this.voices = allVoices;
      this.voicesLoaded = true;
    }
  }

  private getBestVoice(): SpeechSynthesisVoice | null {
    if (this.voices.length === 0) {
      this.loadVoices();
    }
    // Android WebViews often don't label voices well, sometimes just returning one or generic ones.
    let voice = this.voices.find(v => v.lang === 'fr-FR' && !v.name.includes('Compact'));
    if (!voice) voice = this.voices.find(v => v.lang === 'fr-FR');
    if (!voice) voice = this.voices.find(v => v.lang.startsWith('fr'));
    return voice || null;
  }

  private fallbackSpeak(text: string, callbacks?: any) {
    console.log('[AudioService] Using HTML5 Fallback');
    try {
      // Use Google Translate TTS as reliable fallback for Android WebViews without TTS engine
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=fr&q=${encodeURIComponent(text)}`;
      const audio = new Audio(url);
      
      audio.onplay = () => callbacks?.onStart?.();
      audio.onended = () => callbacks?.onEnd?.();
      audio.onerror = (e) => {
        console.error('[AudioService] Fallback error', e);
        callbacks?.onError?.(e);
      };
      
      audio.play().catch(e => {
        console.error('[AudioService] Fallback play failed', e);
        callbacks?.onError?.(e);
      });
    } catch (e) {
      callbacks?.onError?.(e);
    }
  }

  public speak(
    text: string, 
    callbacks?: { 
      onStart?: () => void; 
      onEnd?: () => void; 
      onError?: (e: any) => void; 
    }
  ) {
    // 1. Check Unlock State
    if (!this._isUnlocked && this.isAndroid) {
      console.warn('[AudioService] Locked. User interaction required.');
      alert('请点击页面任意位置以启用发音 (Tap anywhere to enable audio)');
      callbacks?.onError?.('LOCKED');
      return;
    }

    // 2. Android WebView Fallback Check
    // If we have no synth support or voices are persistently empty on Android (common in stripped WebViews)
    if (!this.synth || (this.isAndroid && this.voices.length === 0 && !this.voicesLoaded)) {
       // Try to load voices one last time
       this.loadVoices();
       if (this.voices.length === 0) {
         this.fallbackSpeak(text, callbacks);
         return;
       }
    }

    this.stop();

    const selectedVoice = this.getBestVoice();
    
    // On Android, if we still can't find a French voice but synth exists, 
    // it might be using a default remote engine. We try anyway, 
    // but if it fails, the onerror should catch it.
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.text = text;
    utterance.rate = 0.9; 
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    // Force lang is critical for Android
    utterance.lang = 'fr-FR'; 

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.onstart = () => callbacks?.onStart?.();
    utterance.onend = () => {
      callbacks?.onEnd?.();
      this.activeUtterance = null;
    };
    utterance.onerror = (e) => {
      console.error('[AudioService] TTS Error', e);
      if (e.error !== 'interrupted') {
        // Switch to fallback if native TTS fails
        this.fallbackSpeak(text, callbacks);
      } else {
        callbacks?.onEnd?.();
      }
      this.activeUtterance = null;
    };

    this.activeUtterance = utterance;

    // Android "Wake Up" Hack: Cancel before speak
    if (this.isAndroid) {
        this.synth.cancel();
    }

    setTimeout(() => {
        if (this.synth) this.synth.speak(utterance);
    }, 10);
  }

  public stop() {
    if (this.synth && (this.synth.speaking || this.synth.pending)) {
      this.synth.cancel();
      this.activeUtterance = null;
    }
  }

  public isReady(): boolean {
    return this.voices.length > 0 || (this.synth && this.synth.getVoices().length > 0);
  }
}

export const audioService = new AudioService();