import './Playlist.scss';
import VDom from '@rflban/vdom';
import { config } from '../../../../modules/Client/Client';
import Track from './Track/Track';

export default class Playlist extends VDom.Component<any> {
  render = (): VDom.VirtualElement => {
    let n = 1;
    return (
      <ul class="sidebar__my-playlist">
        {this.props.playlist && this.props.playlist.length > 0
          ? this.props.playlist.map((v: any) => {
            if (this.props.highlite === n - 1) {
              return (
                <Track
                  highlight="track-block_current"
                  order={n++}
                  title={v.title}
                  cover={config.files + v.cover}
                  artist={v.artist}
                />
              );
            }
            return (
              <Track
                clickHandler={this.props.setTrack(n - 1)}
                highlight=""
                order={n++}
                title={v.title}
                cover={config.files + v.cover}
                artist={v.artist}
              />
            );
          })
          : ''}
      </ul>
    );
  };
}