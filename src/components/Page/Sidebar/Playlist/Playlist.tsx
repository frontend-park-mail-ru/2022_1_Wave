import Component from '../../../../modules/VDom/Component';
import './Playlist.css';
import { IProps } from '../../../../modules/VDom/Interfaces';
import VirtualElement from '../../../../modules/VDom/VirtualElement';
import VDom from '../../../../modules/VDom';
import Track from './Track/Track';
import pic from '../../../../assets/playlist-track-icon-dummy.png';

import * as player from '../../../../modules/Media/player';

export default class Playlist extends Component {
  constructor(props:IProps) {
    super(props);
    const tracks: player.Track[] = [];
    this.state = {
      playList: tracks,
    };
  }

  didMount():void {
    const { tracks } = this.state;
    this.setState({ playlist: tracks });
  }

  render = (): VirtualElement => {
    let n = 0;

    return (
      <ul class="sidebar__my-playlist">
        <Track order={n++} title="SomeTrack" cover={pic} artist="aboba"/>
        <Track order={n++} title="SomeTrack" cover={pic} artist="aboba"/>
        <Track order={n++} title="SomeTrack" cover={pic} artist="aboba"/>
        <Track order={n++} title="SomeTrack" cover={pic} artist="aboba"/>
        <Track order={n++} title="SomeTrack" cover={pic} artist="aboba"/>
        <Track order={n++} title="SomeTrack" cover={pic} artist="aboba"/>
        <Track order={n++} title="SomeTrack" cover={pic} artist="aboba"/>
        <Track order={n++} title="SomeTrack" cover={pic} artist="aboba"/>
        <Track order={n++} title="SomeTrack" cover={pic} artist="aboba"/>
        <Track order={n++} title="SomeTrack" cover={pic} artist="aboba"/>
        <Track order={n++} title="SomeTrack" cover={pic} artist="aboba"/>
        <Track order={n++} title="SomeTrack" cover={pic} artist="aboba"/>
        <Track order={n++} title="SomeTrack" cover={pic} artist="aboba"/>
        <Track order={n++} title="SomeTrack" cover={pic} artist="aboba"/>
        <Track order={n++} title="SomeTrack" cover={pic} artist="aboba"/>
      </ul>
    );
  };
}
