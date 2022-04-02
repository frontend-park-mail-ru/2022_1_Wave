import { Track } from './player';

export interface Dic {
  [key: number]: Object
}

export interface IPlayerClass {
  audio: HTMLAudioElement;

  currentTrack: Track;

  isPlayRand: boolean;

  analyser: AnalyserNode;

  addTrack(): void;

  popTrack(): void;

  play(): void;

  stop(): void;

  next(): void;

  prev(): void;

}
