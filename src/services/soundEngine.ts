
// src/services/soundEngine.ts

class SoundEngine {
  private audioContext: AudioContext;
  private masterGain: GainNode;

  constructor() {
    this.audioContext = new AudioContext();
    this.masterGain = this.audioContext.createGain();
    this.masterGain.gain.value = 0.3; // Default volume
    this.masterGain.connect(this.audioContext.destination);
  }

  private playNote(frequency: number, startTime: number, duration: number) {
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.type = 'sine'; // Simple sine wave for now
    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);

    // ADSR Envelope
    const now = this.audioContext.currentTime;
    const attackTime = 0.05;
    const decayTime = 0.1;
    const sustainLevel = 0.7;
    const releaseTime = 0.5;

    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(1, now + attackTime);
    gainNode.gain.linearRampToValueAtTime(sustainLevel, now + attackTime + decayTime);

    oscillator.connect(gainNode);
    gainNode.connect(this.masterGain);

    oscillator.start(startTime);
    oscillator.stop(startTime + duration);

    // Release phase
    gainNode.gain.setValueAtTime(sustainLevel, now + duration - releaseTime);
    gainNode.gain.linearRampToValueAtTime(0, now + duration);
  }

  playChord(frequencies: number[], duration: number = 1) {
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
    const now = this.audioContext.currentTime;
    frequencies.forEach(freq => {
      this.playNote(freq, now, duration);
    });
  }
}

export const soundEngine = new SoundEngine();
