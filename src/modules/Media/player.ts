// import soundfile from '../../music.mp3';

// export const mySound = new Audio(soundfile);
// mySound.preload = 'metadata';
// const context = new AudioContext()
// const track = context.createMediaElementSource(mySound)

class volume {
  #volume;

  up(percent: number) {}

  down(percent: number) {}
}

export type Track = {
  title: string,
  author: string,
  album: string,
  src: string,
  cover: string
}

export class PlayerClass {
  #volume : number;

  #freq : number;

  #playlist: Track[];

  #playlistIndex: number;

  audio: HTMLAudioElement;

  #mediaMetadata: MediaMetadata;

  constructor(src: string, initVolume:number = 50, tracks: Track[] = []) {
    this.#volume = initVolume;
    this.#playlist = tracks;
    if (this.#playlist.length === 0) {
      this.audio = new Audio(src);
    }
  }

  // addTrack(track: Track): void {
  //   //const source = new MediaSource();
  //   console.log('created element');
  //   source.src
  //   this.audioPlayer.appendChild(source);
  //   // if(this.#mediaMetadata) {
  //   //   this.#updateMetadata()
  //   // }
  // }
  // popTrack()

  play(): void {
    this.audio.play();
  }

  stop(): void {
    this.audio.pause();
  }

  next(): void {}

  prev(): void {

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
