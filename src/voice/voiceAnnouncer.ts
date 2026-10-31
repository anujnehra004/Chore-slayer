// Web Speech API Voice Announcer for Cyberpunk Arcade Immersion

class VoiceAnnouncer {
  public enabled: boolean = true;
  private synth: SpeechSynthesis | null = null;
  private lastSpokenTime: number = 0;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  public speak(text: string, force: boolean = false) {
    if (!this.enabled || !this.synth) return;

    // Prevent voice overlapping unless forced
    const now = Date.now();
    if (!force && now - this.lastSpokenTime < 1800) return;
    this.lastSpokenTime = now;

    try {
      this.synth.cancel(); // Stop any pending speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.15; // Slightly faster, punchy delivery
      utterance.pitch = 0.95; // Futuristic tone
      utterance.volume = 0.8;

      // Try finding a cool English voice
      const voices = this.synth.getVoices();
      const preferred = voices.find(v => v.lang.includes('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('David')));
      if (preferred) {
        utterance.voice = preferred;
      }

      this.synth.speak(utterance);
    } catch {
      // Ignored if browser blocks speech
    }
  }

  public announceCombo(comboCount: number) {
    if (comboCount === 3) this.speak("Triple Combo!");
    else if (comboCount === 5) this.speak("Mega Slay! 5x Multiplier!");
    else if (comboCount === 10) this.speak("Unstoppable! Procrastination Vanquished!");
  }

  public announceAction(action: string) {
    this.speak(action);
  }
}

export const voiceAnnouncer = new VoiceAnnouncer();
