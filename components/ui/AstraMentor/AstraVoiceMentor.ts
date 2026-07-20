"use client";

class VoiceMentor {
  private synth: SpeechSynthesis | null = null;
  private voice: SpeechSynthesisVoice | null = null;
  private isMuted: boolean = false;

  constructor() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      this.synth = window.speechSynthesis;
      this.initVoice();
    }
  }

  private initVoice() {
    if (!this.synth) return;
    const updateVoices = () => {
      const voices = this.synth?.getVoices() || [];
      // Select a natural, calm female or gentle English voice
      const preferred = voices.find(
        (v) =>
          v.lang.startsWith("en") &&
          (v.name.includes("Natural") ||
            v.name.includes("Samantha") ||
            v.name.includes("Victoria") ||
            v.name.includes("Karen") ||
            v.name.includes("Google US English") ||
            v.name.includes("Zira"))
      );
      this.voice = preferred || voices.find((v) => v.lang.startsWith("en")) || null;
    };

    updateVoices();
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = updateVoices;
    }
  }

  public speak(text: string, onEnd?: () => void) {
    if (this.isMuted || !this.synth) {
      if (onEnd) onEnd();
      return;
    }

    try {
      this.synth.cancel(); // Cancel ongoing speech

      const utterance = new SpeechSynthesisUtterance(text);
      if (this.voice) utterance.voice = this.voice;
      utterance.pitch = 0.95; // Slightly lower, serene tone
      utterance.rate = 0.88; // Relaxed, encouraging pace
      utterance.volume = 1.0;

      if (onEnd) {
        utterance.onend = () => onEnd();
        utterance.onerror = () => onEnd();
      }

      this.synth.speak(utterance);
    } catch (e) {
      console.log("Voice synthesis error:", e);
      if (onEnd) onEnd();
    }
  }

  public stop() {
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch (e) {}
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stop();
    }
    return this.isMuted;
  }

  public getMutedState(): boolean {
    return this.isMuted;
  }
}

export const astraVoice = new VoiceMentor();
