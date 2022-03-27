// import soundfile from '../../music.mp3';

// export const mySound = new Audio(soundfile);
// mySound.preload = 'metadata';
//const context = new AudioContext()
//const track = context.createMediaElementSource(mySound)

class volume {

}

// class player{
//
//   #volume : number
//   #freq : number
//
//   addTrack()
//   popTrack()
//
//   play()
//   stop()
//   next()
//   prev()
// }

if ('mediaSession' in navigator) {
  navigator.mediaSession.metadata = new MediaMetadata({
    title: 'Unforgettable',
    artist: 'Nat King Cole',
    album: 'The Ultimate Collection (Remastered)',
    artwork: [
      {
        src: 'https://dummyimage.com/96x96',
        sizes: '96x96',
        type: 'image/png'
      },
      {
        src: 'https://dummyimage.com/128x128',
        sizes: '128x128',
        type: 'image/png'
      },
      {
        src: 'https://dummyimage.com/192x192',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: 'https://dummyimage.com/256x256',
        sizes: '256x256',
        type: 'image/png'
      },
      {
        src: 'https://dummyimage.com/384x384',
        sizes: '384x384',
        type: 'image/png'
      },
      {
        src: 'https://dummyimage.com/512x512',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  });

  navigator.mediaSession.setActionHandler('play', function () {
    console.log('play');
    mySound.play();
  });
  navigator.mediaSession.setActionHandler('pause', function () {
    console.log('pause');
    mySound.pause();
  });
  navigator.mediaSession.setActionHandler('stop', function () {
    console.log('stop');
  });
};
