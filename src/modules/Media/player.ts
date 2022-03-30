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

  analyser: AnalyserNode;

  #audioCtx: AudioContext;

  #mediaMetadata: MediaMetadata;

  constructor(tracks: Track[] = [], initVolume:number = 0.5) {
    this.#playlist = tracks;
    this.#playlist = tracks;
    this.currentTrack = this.#playlist[this.#playlistIndex];
    // this.audio = new Audio(this.currentTrack.src);
    // this.audio.preload = 'metadata';
    // this.audio.volume = initVolume;
    // this.#audioCtx = new AudioContext();
    // const analyser = this.#audioCtx.createAnalyser();
    // const source = this.#audioCtx.createMediaElementSource(this.audio);
    // source.connect(this.#audioCtx.destination);
    // source.connect(analyser);
    // analyser.connect(this.#audioCtx.destination);
    //var AudioContext = window.AudioContext || window.webkitAudioContext;
    this.audio = new Audio();
    //const analyser = context.createAnalyser();

    this.audio.src = this.currentTrack.src;
    this.audio.controls = true;

    const audioCtx = new AudioContext();
    const source = audioCtx.createMediaElementSource(this.audio);
    source.connect(audioCtx.destination);
    //console.log(source);
    this.audio.volume = 0.5;
    document.getElementById('root').appendChild(this.audio);
    // analyser.connect(context.destination);

    // this.analyser = this.#audioCtx.createAnalyser();
    // source.connect(this.analyser);
    // this.analyser.connect(this.#audioCtx.destination);
  //  this.#loadMedia(this.currentTrack.src);
  }

  // #loadMedia(url:string): void {
  //   console.log(url);
  //   fetch(url)
  //     .then(resp => resp.arrayBuffer())
  //     .then(buf => this.#audioCtx.decodeAudioData(buf))
  //     .then(audioBuffer => {
  //       console.log("h",audioBuffer);
  //       this.source.buffer = audioBuffer;
  //       this.source.loop = true;
  //       const streamResource = this.#audioCtx.createMediaStreamDestination();
  //       this.source.connect(streamResource);
  //       this.source.start();
  //       this.audio.srcObject = streamResource.stream;
  //       console.log("srcObject",this.audio.srcObject);
  //     })
  //     .catch((e) => console.log("cannot fetch",e,url));
  // }

  addTrack(track: Track): void {
    this.#playlist.push(track);
  }

  popTrack(): void {
    this.#playlist.pop();
  }

  play(): void {
    console.log('play');
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
  //  this.#loadMedia(this.currentTrack.src);
  }

  prev(): void {
    if (this.#playlistIndex === 0) {
      return;
    }
    this.#playlistIndex -= 1;
    const prevTrack = this.#playlist[this.#playlistIndex];
    this.audio.src = prevTrack.src;
    this.currentTrack = prevTrack;
   // this.#loadMedia(this.currentTrack.src);
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
//
// if ('mediaSession' in navigator) {
//   navigator.mediaSession.metadata = new MediaMetadata({
//     title: 'Unforgettable',
//     artist: 'Nat King Cole',
//     album: 'The Ultimate Collection (Remastered)',
//     artwork: [
//       {
//         src: 'https://dummyimage.com/96x96',
//         sizes: '96x96',
//         type: 'image/png',
//       },
//       {
//         src: 'https://dummyimage.com/128x128',
//         sizes: '128x128',
//         type: 'image/png',
//       },
//       {
//         src: 'https://dummyimage.com/192x192',
//         sizes: '192x192',
//         type: 'image/png',
//       },
//       {
//         src: 'https://dummyimage.com/256x256',
//         sizes: '256x256',
//         type: 'image/png',
//       },
//       {
//         src: 'https://dummyimage.com/384x384',
//         sizes: '384x384',
//         type: 'image/png',
//       },
//       {
//         src: 'https://dummyimage.com/512x512',
//         sizes: '512x512',
//         type: 'image/png',
//       },
//     ],
//   });
//
//   navigator.mediaSession.setActionHandler('play', () => {
//     console.log('play');
//     mySound.play();
//   });
//   navigator.mediaSession.setActionHandler('pause', () => {
//     console.log('pause');
//     mySound.pause();
//   });
//   navigator.mediaSession.setActionHandler('stop', () => {
//     console.log('stop');
//   });
// }
