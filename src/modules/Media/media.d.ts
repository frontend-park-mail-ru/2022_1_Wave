import { Track } from './player';

export interface IPlayerClass {
  audio: HTMLAudioElement;

  currentTrack: Track;

  analyser: AnalyserNode;

  addTrack(): void;

  popTrack(): void;

  play(): void;

  stop(): void;

  next(): void;

  prev(): void;

}
