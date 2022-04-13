import './Playlist.scss';
import VDom from '../../../../modules/VDom';
import Track from './Track/Track';
import { config } from '../../../../modules/Client/Client';

export default class Playlist extends VDom.Component {
  render = (): VDom.VirtualElement => {
    let n = 1;
    return (
      <ul class="sidebar__my-playlist">
        {this.props.playlist
          ? this.props.playlist.map((v: any) => (
              <Track order={n++} title={v.title} cover={config.files + v.cover} artist={v.artist} />
            ))
          : ''}
      </ul>
    );
  };
}
