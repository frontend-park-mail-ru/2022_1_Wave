import Component from '../../../modules/VDom/Component';
import VirtualElement from '../../../modules/VDom/VirtualElement';
import VDom from '../../../modules/VDom';
import '../../../index.css';
import './ArtistPlaylist.scss';
import ArtistTrack from './ArtistTrack/ArtistTrack';
import { config } from '../../../modules/Client/Client';
import { Map } from '../../../modules/Store/types';
import { artistGetById, artistGetPopularById } from '../../../actions/Artist';
import { ITrack } from '../../../modules/Media/media';
import { setTrack, setTracks } from '../../../actions/Playlist';
import { startPlay, stopPlay } from '../../../actions/Player';
import { connect } from '../../../modules/Connect';
import { IProps } from '../../../modules/VDom/Interfaces';

export default class ArtistPlaylist extends Component {
  render = (): VirtualElement => {
    const { playlist } = this.props;
    let n: number = 1;
    return (
      <div class="artist-playlist">
        {playlist
          ? playlist.map((v: any) => (
              <ArtistTrack
                handleClick={this.props.runTrack(playlist[n - 1])}
                num={n++}
                cover={config.files + v.cover}
                name={v.title}
                listenedCnt={v.listenings}
                isLiked={false}
                duration={v.duration}
              />
            ))
          : ''}
      </div>
    );
  };
}
