import VirtualElement from '../../../modules/VDom/VirtualElement';
import './Player.scss';
import Component from '../../../modules/VDom/Component';
import createElement from 'factory';
// import '../../App/App.sass';
// import { mySound } '../../../modules/Media/media';

class Player extends Component {
  render = (): VirtualElement => (
    <div class="player">
      <div class="player__waves"></div>
      <div class="player__track">
        <div class="track__picture"></div>
        <div class="track__name">
          <div class="text track__name__title">Someth</div>
          <div class="text track__name__author">Smth</div>
        </div>
      </div>
      <div class="player__control">
        <div class="fa-solid fa-backward-step control__prev"></div>
        <div class="fa-regular fa-circle-play control__play_pause"></div>
        <div class="fa-solid fa-forward-step control__next"></div>
      </div>
      <div class="player__progressbar"></div>
      <div class="player__shuffle"></div>
      <div class="player__volume"></div>
    </div>
  );
}

export default Player;
