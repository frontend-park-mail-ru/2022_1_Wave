import VDom from '@rflban/vdom';
import './Homepage.scss';
import Popular from './Popular/Popular';
import {Button} from "@rflban/waveui";

export default class Homepage extends VDom.Component {
  render = (): VDom.VirtualElement => (
    <div class="main__page">
      <div class="main__top-chart__album">
        <div class="main__top-chart__album__name">
          <div class="text main__top-chart__album__name">Flume: Skin</div>
          <div class="text main__top-chart__album__quote">
            Flume walks us through his ‘weird’ new album, ‘Skin’. He has one goal: “I wanna make
            weird stuff.”
          </div>
        </div>
        <div class="main__top-chart__album__controls">
          <Button class='main__top-chart__album__btn_play' mode='primary'>Play</Button>
          <Button class='main__top-chart__album__btn_follow' mode='outline'>Follow</Button>
        </div>
      </div>
      <Popular />
    </div>
  );
}
