import VDom from '@rflban/vdom';
import {
  Button,
  Headline, Subhead,
} from '@rflban/waveui';
import './Homepage.scss';
import Popular from './Popular/Popular';

export default class Homepage extends VDom.Component {
  render = (): VDom.VirtualElement => (
    <div class="main__page">
      <div class="main__top-chart__album">
        <div class="main__top-chart__album__name">
          <Headline align="left">Flume: Skin</Headline>
          <Subhead align="left" size="s">
            <p class="waveHomepage__description">
              Flume walks us through his ‘weird’ new album, ‘Skin’. He has one goal: “I wanna make
              weird stuff.”
            </p>
          </Subhead>
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
