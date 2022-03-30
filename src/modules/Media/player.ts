// import soundfile from '../../music.mp3';

// export const mySound = new Audio(soundfile);
// mySound.preload = 'metadata';
// const context = new AudioContext()
// const track = context.createMediaElementSource(mySound)

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

  audio: HTMLAudioElement;

  currentTrack: Track;

  #audioCtx: AudioContext;

  #mediaMetadata: MediaMetadata;

  constructor(tracks: Track[] = [], initVolume:number = 0.5) {
    this.#playlist = tracks;
    if (this.#playlist.length === 0) {
      this.audio = new Audio();
      this.audio.preload = 'metadata';
      return;
    }
    this.#playlist = tracks;
    this.currentTrack = this.#playlist[this.#playlistIndex];
    this.audio = new Audio(this.currentTrack.src);
    this.audio.volume = initVolume;
    // this.#audioCtx = new AudioContext();
  }

  handleEvent(callback: Function):Function {
    return () => callback(this.#playlist[this.#playlistIndex]);
  }

  addTrack(track: Track): void {
    this.#playlist.push(track);
  }

  popTrack(): void {
    this.#playlist.pop();
  }

  play(): void {
    this.audio.play();
  }

  stop(): void {
    this.audio.pause();
  }

  next(): void {
    if (this.#playlistIndex > this.#playlist.length - 1) {
      return;
    }
    this.#playlistIndex += 1;
    const nextTrack = this.#playlist[this.#playlistIndex];
    this.audio.src = nextTrack.src;
    this.currentTrack = nextTrack;
  }

  prev(): void {
    if (this.#playlistIndex === 0) {
      return;
    }
    this.#playlistIndex -= 1;
    const prevTrack = this.#playlist[this.#playlistIndex];
    this.audio.src = prevTrack.src;
    this.currentTrack = prevTrack;
  }

  #updateMetadata(track: Track): void {
    this.#mediaMetadata = new MediaMetadata({
      title: track.title,
      artist: track.author,
      album: track.album,
      artwork: [
        {
          src: track.cover,
          sizes: '256x256',
          type: 'image/png',
        },
      ],
    });
  }
}

function tryInitMediaSession() {

}
if ('mediaSession' in navigator) {
  navigator.mediaSession.metadata = new MediaMetadata({
    title: 'Unforgettable',
    artist: 'Nat King Cole',
    album: 'The Ultimate Collection (Remastered)',
    artwork: [
      {
        src: 'https://dummyimage.com/96x96',
        sizes: '96x96',
        type: 'image/png',
      },
      {
        src: 'https://dummyimage.com/128x128',
        sizes: '128x128',
        type: 'image/png',
      },
      {
        src: 'https://dummyimage.com/192x192',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'https://dummyimage.com/256x256',
        sizes: '256x256',
        type: 'image/png',
      },
      {
        src: 'https://dummyimage.com/384x384',
        sizes: '384x384',
        type: 'image/png',
      },
      {
        src: 'https://dummyimage.com/512x512',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  });

  navigator.mediaSession.setActionHandler('play', () => {
    console.log('play');
    mySound.play();
  });
  navigator.mediaSession.setActionHandler('pause', () => {
    console.log('pause');
    mySound.pause();
  });
  navigator.mediaSession.setActionHandler('stop', () => {
    console.log('stop');
  });
}
