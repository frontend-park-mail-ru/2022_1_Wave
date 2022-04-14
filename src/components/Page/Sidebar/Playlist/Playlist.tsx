import './Playlist.scss';
import VDom from '../../../../modules/VDom';
import { config } from '../../../../modules/Client/Client';
import { Map } from '../../../../modules/Store/types';
import { connect } from '../../../../modules/Connect';
import { setPosition } from '../../../../actions/Player';
import Track from './Track/Track';
import { IProps } from '../../../../modules/VDom/Interfaces';

class Playlist extends VDom.Component {
  constructor(props: IProps) {
    super(props);
    this.setTrack = this.setTrack.bind(this);
  }

  setTrack(pos: number): (e: Event) => void {
    return (e: Event): void => {
      this.props.setPos(pos);
    };
  }

  render = (): VDom.VirtualElement => {
    let n = 1;
    return (
      <ul class="sidebar__my-playlist">
        {this.props.playlist
          ? this.props.playlist.map((v: any) => {
              if (this.props.position === n - 1) {
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
                  clickHandler={this.setTrack(n - 1)}
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

const mapDispatchToProps = (dispatch: any): Map => ({
  setPos: (num: number): void => {
    dispatch(setPosition(num));
  },
});
const mapStateToProps = (state: any): Map => ({
  playlist: state.playerPlaylist ? state.playerPlaylist : null,
  position: state.playerPosition ? state.playerPosition.value : 0,
});

const PlaylistConnected = connect(mapStateToProps, mapDispatchToProps)(Playlist);
export default PlaylistConnected;
