class SoundEngine {
  private ctx: AudioContext | null = null;
  private muted = false;

  setMuted(muted: boolean) {
    this.muted = muted;
  }

  private getContext(): AudioContext | null {
    if (this.muted || typeof window === 'undefined') return null;
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return null;
    if (!this.ctx) {
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  private playTone(
    freq: number,
    duration: number,
    type: OscillatorType = 'sine',
    gainPeak = 0.08,
    delay = 0
  ) {
    const ctx = this.getContext();
    if (!ctx) return;

    const startTime = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.exponentialRampToValueAtTime(gainPeak, startTime + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.02);
  }

  playClick() {
    this.playTone(420, 0.055, 'triangle', 0.04);
  }

  playCorrect(combo = 1) {
    const pitchLift = Math.min(combo - 1, 4) * 35;
    this.playTone(523.25 + pitchLift, 0.12, 'triangle', 0.08, 0);
    this.playTone(659.25 + pitchLift, 0.16, 'triangle', 0.085, 0.07);
    this.playTone(783.99 + pitchLift, 0.22, 'sine', 0.075, 0.14);
  }

  playWrong() {
    this.playTone(210, 0.16, 'sawtooth', 0.05, 0);
    this.playTone(165, 0.22, 'sawtooth', 0.045, 0.1);
  }

  playPowerUp() {
    this.playTone(440, 0.08, 'sine', 0.06, 0);
    this.playTone(660, 0.09, 'sine', 0.06, 0.05);
    this.playTone(880, 0.15, 'triangle', 0.07, 0.1);
  }

  playReward() {
    this.playTone(587.33, 0.1, 'triangle', 0.07, 0);
    this.playTone(880, 0.18, 'triangle', 0.08, 0.08);
  }

  playVictory() {
    this.playTone(523.25, 0.14, 'triangle', 0.08, 0);
    this.playTone(659.25, 0.14, 'triangle', 0.08, 0.11);
    this.playTone(783.99, 0.14, 'triangle', 0.08, 0.22);
    this.playTone(1046.5, 0.32, 'sine', 0.09, 0.33);
  }
}

export const sound = new SoundEngine();
