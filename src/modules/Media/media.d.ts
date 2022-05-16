export interface Dic {
  [key: number]: Object;
}

export interface ITrack {
  title: string;
  artist: string;
  album: string;
  src: string;
  cover: string;
}
export interface IPlayerClass {
  audio: HTMLAudioElement;

  playlist: ITrack[];

  currentTrack: ITrack;

  currentIndex: number;

  isPlayRand: boolean;

  analyser: AnalyserNode;

  addTrack(track: ITrack): void;

  popTrack(): void;

  setPosition(index: number): void;

  updatePlaylist(tracks: ITrack[]): void;

  play(): void;

  stop(): void;

  next(): void;

  prev(): void;
}
