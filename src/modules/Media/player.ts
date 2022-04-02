// import soundfile from '../../music.mp3';

// export const mySound = new Audio(soundfile);
// mySound.preload = 'metadata';
// const context = new AudioContext()
// const track = context.createMediaElementSource(mySound)

import { Dic } from './media';

export type Track = {
  title: string,
  author: string,
  album: string,
  src: string,
  cover: string
}

export class PlayerClass {
  #playlist: Track[];

  #playlistIndex: number = 0;

  #playedCount: number = 0;

  #randPlayed: Dic = {};

  isPlayRand: boolean = false;

  audio: HTMLAudioElement;

  currentTrack: Track;

  analyser: AnalyserNode;

  #audioCtx: AudioContext;

  #mediaMetadata: MediaMetadata;

  constructor(tracks: Track[] = [], initVolume:number = 0.5) {
    this.#playlist = tracks;
    this.#playlist = tracks;
    this.currentTrack = this.#playlist[this.#playlistIndex];
    this.audio = new Audio(this.currentTrack.src);
    this.audio.preload = 'metadata';
    this.audio.volume = initVolume;
    this.#audioCtx = new AudioContext();
    this.analyser = this.#audioCtx.createAnalyser();
    this.analyser.fftSize = 2048;
    const source = this.#audioCtx.createMediaElementSource(this.audio);
    source.connect(this.analyser);
    this.analyser.connect(this.#audioCtx.destination);
    this.#initMetadata(this.currentTrack);
  }

  addTrack(track: Track): void {
    this.#playlist.push(track);
  }

  popTrack(): void {
    this.#playlist.pop();
  }

  play(): void {
    this.#audioCtx.resume();
    this.audio.play()
      .then((): void => this.#updatePosition());
  }

  stop(): void {
    this.audio.pause();
  }

  next(): void {
    if (this.#playedCount > this.#playlist.length - 1) {
      return;
    }
    if (this.isPlayRand) {
      let idx: number = Math.trunc(Math.random() * this.#playlist.length);
      while (this.#randPlayed.hasOwnProperty(idx)) {
        idx = Math.trunc(Math.random() * this.#playlist.length);
      }
      this.#randPlayed[idx] = this.#playlist[idx];
      this.#playlistIndex = idx;
    } else {
      this.#playlistIndex += 1;
    }
    this.#playedCount += 1;
    const nextTrack = this.#playlist[this.#playlistIndex];
    this.audio.src = nextTrack.src;
    this.currentTrack = nextTrack;
    this.#updateMetadata(this.currentTrack);
  }

  prev(): void {
    if (this.#playlistIndex === 0) {
      return;
    }
    this.#playlistIndex -= 1;
    const prevTrack = this.#playlist[this.#playlistIndex];
    this.audio.src = prevTrack.src;
    this.currentTrack = prevTrack;
    this.#updateMetadata(this.currentTrack);
  }

  #updateMetadata(track: Track): void {
    if (!('mediaSession' ! in navigator)) {
      return;
    }
    navigator.mediaSession.metadata = new MediaMetadata({
      title: track.title,
      artist: track.author,
      album: track.album,
      artwork: [
        {
          src: track.cover,
        },
      ],
    });
  }

  #updatePosition(): void {
    if (!('mediaSession' ! in navigator)) {
      return;
    }

    navigator.mediaSession.setPositionState({
      duration: this.audio.duration,
      playbackRate: this.audio.playbackRate,
      position: this.audio.currentTime,
    });
  }

  #initMetadata(track: Track): void {
    if (!('mediaSession' in navigator)) {
      return;
    }
    this.#updateMetadata(track);
    navigator.mediaSession.setActionHandler('play', () => {
      this.play();
    });
    navigator.mediaSession.setActionHandler('pause', () => {
      this.stop();
    });

    navigator.mediaSession.setActionHandler('previoustrack', () => {
      this.prev();
    });

    navigator.mediaSession.setActionHandler('nexttrack', () => {
      this.next();
    });
  }
}
