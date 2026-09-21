// Web Audio API Synth Engine for PARU Cyberdeck Player
// Simulates authentic 128 BPM Indie Dance & Minimal Deep Tech grooves
// Also connects to AudioAnalyser for real-time waveform visualization

class AudioEngine {
  private ctx: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private masterGain: GainNode | null = null;
  private isPlaying: boolean = false;
  private timerId: number | null = null;
  private currentStep: number = 0;
  private bpm: number = 128;
  private currentTrackId: string = 'track-1';
  private listeners: Set<() => void> = new Set();

  private bassFrequencies = [
    87.31, 87.31, 116.54, 87.31, // F2, F2, Bb2, F2
    103.83, 87.31, 77.78, 87.31  // G#2, F2, Eb2, F2
  ];

  private synthFrequencies = [
    349.23, 0, 415.30, 349.23,
    523.25, 466.16, 0, 415.30
  ];

  public init() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.4;

      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public subscribe(cb: () => void) {
    this.listeners.add(cb);
    return () => {
      this.listeners.delete(cb);
    };
  }

  private notify() {
    this.listeners.forEach(cb => cb());
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getCurrentTrackId(): string {
    return this.currentTrackId;
  }

  public getBpm(): number {
    return this.bpm;
  }

  public playTrack(trackId: string, trackBpm: number = 128) {
    this.init();
    this.currentTrackId = trackId;
    this.bpm = trackBpm;

    if (!this.isPlaying) {
      this.isPlaying = true;
      this.startClock();
    }
    this.notify();
  }

  public togglePlay(trackId?: string, trackBpm: number = 128) {
    this.init();
    if (this.isPlaying) {
      if (trackId && trackId !== this.currentTrackId) {
        this.currentTrackId = trackId;
        this.bpm = trackBpm;
        this.notify();
      } else {
        this.stop();
      }
    } else {
      if (trackId) {
        this.currentTrackId = trackId;
        this.bpm = trackBpm;
      }
      this.isPlaying = true;
      this.startClock();
      this.notify();
    }
  }

  public stop() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      window.clearInterval(this.timerId);
      this.timerId = null;
    }
    this.notify();
  }

  public setVolume(vol: number) {
    if (this.masterGain) {
      this.masterGain.gain.value = Math.max(0, Math.min(1, vol));
    }
  }

  public getAnalyserData(): Uint8Array {
    if (!this.analyser) {
      return new Uint8Array(32);
    }
    const data = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(data);
    return data;
  }

  private startClock() {
    if (this.timerId !== null) {
      window.clearInterval(this.timerId);
    }
    // 16th notes calculation: (60 / BPM) / 4 * 1000
    const stepIntervalMs = (60 / this.bpm / 4) * 1000;
    this.currentStep = 0;

    this.timerId = window.setInterval(() => {
      if (!this.isPlaying || !this.ctx) return;
      this.triggerStep(this.currentStep);
      this.currentStep = (this.currentStep + 1) % 16;
    }, stepIntervalMs);
  }

  private triggerStep(step: number) {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    // 1. Kick drum on beats 0, 4, 8, 12 (4x4 floor)
    if (step % 4 === 0) {
      this.playKick(now);
    }

    // 2. Offbeat hi-hat on 2, 6, 10, 14
    if (step % 4 === 2) {
      this.playHat(now);
    }

    // 3. Shaker on every 16th note with velocity swing
    if (step % 2 === 1) {
      this.playShaker(now, step % 4 === 3 ? 0.08 : 0.04);
    }

    // 4. Rolling Deep Tech Bassline
    const bassIdx = Math.floor(step / 2) % this.bassFrequencies.length;
    const bassFreq = this.bassFrequencies[bassIdx];
    if (step % 2 === 0 && bassFreq > 0) {
      this.playBass(now, bassFreq);
    }

    // 5. Synth accent
    const synthIdx = step % this.synthFrequencies.length;
    const synthFreq = this.synthFrequencies[synthIdx];
    if (synthFreq > 0 && Math.random() > 0.3) {
      this.playSynth(now, synthFreq);
    }
  }

  private playKick(time: number) {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.frequency.setValueAtTime(140, time);
    osc.frequency.exponentialRampToValueAtTime(36, time + 0.12);

    gain.gain.setValueAtTime(0.7, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.25);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + 0.25);
  }

  private playHat(time: number) {
    if (!this.ctx || !this.masterGain) return;
    const bufferSize = this.ctx.sampleRate * 0.06;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 7500;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.18, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(time);
    noise.stop(time + 0.06);
  }

  private playShaker(time: number, vol: number) {
    if (!this.ctx || !this.masterGain) return;
    const bufferSize = this.ctx.sampleRate * 0.03;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 9000;
    filter.Q.value = 3;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(vol, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.025);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(time);
    noise.stop(time + 0.03);
  }

  private playBass(time: number, freq: number) {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, time);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(380, time);
    filter.frequency.exponentialRampToValueAtTime(110, time + 0.18);
    filter.Q.value = 4;

    gain.gain.setValueAtTime(0.35, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.22);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + 0.22);
  }

  private playSynth(time: number, freq: number) {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(freq, time);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, time);
    filter.Q.value = 6;

    gain.gain.setValueAtTime(0.08, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.15);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + 0.15);
  }
}

export const soundEngine = new AudioEngine();
