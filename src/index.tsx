import { createElement } from 'factory';
// import App from './components/App/App';
import patch from './modules/VDom/patchNode';
import VirtualElement from './modules/VDom/VirtualElement';
import Player from './components/common/Player/Player';
import "@fortawesome/fontawesome-free/js/all.js";
import "@fortawesome/fontawesome-free/css/all.css";
import render from './modules/VDom/render';


render(<Player/>,document.getElementById('root')!);
//____________________-test
const config = { attributes: true, childList: true, subtree: true };

const targetNode = document.getElementById('root');

const observer = new MutationObserver((mutationsList, observer) =>{
  for(const mutation of mutationsList) {
    if (mutation.type === 'childList') {
      if( mutation.addedNodes[0].nodeName == 'AUDIO'){

        mutation.addedNodes[0].addEventListener('progress',progress);
        mutation.addedNodes[0].addEventListener('timeupdated',timeupdate);

      }
    }
    else if (mutation.type === 'attributes') {
      console.log('The ' + mutation.attributeName + ' attribute was modified.');
    }
  }
});

observer.observe(targetNode, config);

function progress(e) {
  console.log('Event:',e);
  const audio = document.querySelector('audio');
  console.log('Audio tag',audio);
  let bufferedEnd =  audio.buffered.end(audio.buffered.length - 1);
  let duration = audio.duration;
  console.log(((bufferedEnd / duration)*100) + "%");
  // const targer = e.currentTarget;
  // console.log('Target:',targer)
  // console.log('Audio:', targer.currentTime,targer.duration);
}

function timeupdate(e) {
  console.log('Event:',e);
  const audio = document.querySelector('audio');
  let duration = audio.duration;
  console.log(((myAudio.currentTime / duration)*100) + "%");

}
document.querySelector('body').addEventListener('click', (e) => {

  if (navigator.mediaSession.playbackState === 'playing') {
    // mySound.pause();
    navigator.mediaSession.playbackState = 'paused';
  } else {
    // mySound.play()
    //   .then(() => {
    //     navigator.mediaSession.playbackState = 'playing';
    //     console.log('started music', mySound.buffered, mySound.duration/60, mySound.preload);
  });
}
});
//____________________-end test

// User.getCSRFToken()
//   .then(() => {
//     const root = document.querySelector('#root');
//     const app = new App();
//     app.mount(root);
//   });
