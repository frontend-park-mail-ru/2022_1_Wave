import { Track } from './player';

export interface IPlayerClass {
  audio: HTMLAudioElement;

  currentTrack: Track;

  addTrack(): void;

  popTrack(): void;

  play(): void;

  stop(): void;

  next(): void;

  prev(): void;

}
