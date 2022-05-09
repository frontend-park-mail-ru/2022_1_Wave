import { Dic, ITrack } from './media';
import { config } from '../Client/Client';

export class PlayerClass {
  playlist: ITrack[];

  currentIndex: number = 0;

  #playedCount: number = 0;

  #randPlayed: Dic = {};

  isPlayRand: boolean = false;

  audio: HTMLAudioElement;

  currentTrack: ITrack;

  analyser: AnalyserNode;

  #audioCtx: AudioContext;

  constructor(tracks: ITrack[] = [], initVolume: number = 0.5) {
    if (!tracks || tracks.length === 0) {
      return;
    }
    this.playlist = tracks;
    this.currentTrack = this.playlist[this.currentIndex];
    this.audio = new Audio(config.files + this.currentTrack.src);
    this.audio.crossOrigin = 'anonymous';
    this.audio.preload = 'metadata';
    this.audio.volume = initVolume;
    this.#audioCtx = new AudioContext();
    this.analyser = this.#audioCtx.createAnalyser();
    this.analyser.maxDecibels = -10;
    this.analyser.minDecibels = -80;
    this.analyser.fftSize = 2048;
    const source = this.#audioCtx.createMediaElementSource(this.audio);
    source.connect(this.analyser);
    this.analyser.connect(this.#audioCtx.destination);
    this.#updateMetadata(this.currentTrack);
  }

  updatePlaylist(tracks: ITrack[]): void {
    if (this.audio) {
      this.audio.pause();
    }
    this.currentIndex = 0;
    this.playlist = tracks;
    this.currentTrack = this.playlist[this.currentIndex];
    this.audio.src = this.currentTrack? config.files + this.currentTrack.src : '';
    this.#updateMetadata(this.currentTrack);
  }

  addTrack(track: ITrack): void {
    this.playlist.push(track);
  }

  popTrack(): void {
    this.playlist.pop();
  }

  play(): void {
    this.#audioCtx.resume();
    this.audio.play().then((): void => this.#updatePosition());
  }

  stop(): void {
    this.audio.pause();
  }

  next(): void {
    if (this.currentIndex > this.playlist.length - 1) {
      return;
    }
    if (this.isPlayRand) {
      let idx: number = Math.trunc(Math.random() * this.playlist.length);
      while (this.#randPlayed.hasOwnProperty(idx)) {
        idx = Math.trunc(Math.random() * this.playlist.length);
      }
      this.#randPlayed[idx] = this.playlist[idx];
      this.currentIndex = idx;
    } else {
      this.currentIndex += 1;
    }
    this.#playedCount += 1;
    const nextTrack = this.playlist[this.currentIndex];
    this.audio.src = nextTrack ? config.files + nextTrack.src : this.audio.src;
    this.currentTrack = nextTrack;
    this.#updateMetadata(this.currentTrack);
  }

  setPosition(index: number): void {
    if (this.isPlayRand) {
      let idx: number = Math.trunc(Math.random() * this.playlist.length);
      console.log(this.#randPlayed)
      while (this.#randPlayed.hasOwnProperty(idx)) {
        idx = Math.trunc(Math.random() * this.playlist.length);
      }
      this.#randPlayed[idx] = this.playlist[idx];
      this.currentIndex = idx;
    } else {
      this.currentIndex = index;
    }
    const nextTrack = this.playlist[this.currentIndex];
    this.audio.src = nextTrack ? config.files + nextTrack.src : this.audio.src;
    this.currentTrack = nextTrack;
    this.#updateMetadata(this.currentTrack);
  }

  prev(): void {
    if (this.currentIndex === 0) {
      return;
    }
    this.currentIndex -= 1;
    const prevTrack = this.playlist[this.currentIndex];
    this.audio.src = config.files + prevTrack.src;
    this.audio.src = prevTrack ? config.files + prevTrack.src : this.audio.src;
    this.currentTrack = prevTrack;
    this.#updateMetadata(this.currentTrack);
  }

  #updateMetadata(track: ITrack): void {
    if (!('mediaSession'! in navigator)) {
      return;
    }
    navigator.mediaSession.metadata = new MediaMetadata({
      title: track.title,
      artist: track.artist,
      album: track.album,
      artwork: [
        {
          src: track.cover,
        },
      ],
    });
  }

  #updatePosition(): void {
    if (!('mediaSession'! in navigator)) {
      return;
    }

    navigator.mediaSession.setPositionState({
      duration: this.audio.duration,
      playbackRate: this.audio.playbackRate,
      position: this.audio.currentTime,
    });
  }
}
