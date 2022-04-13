import Component from '../../../modules/VDom/Component';
import VirtualElement from '../../../modules/VDom/VirtualElement';
import VDom from '../../../modules/VDom';
import '../../../index.css';
import './ArtistPlaylist.scss';
import ArtistTrack from './ArtistTrack/ArtistTrack';
import { config } from '../../../modules/Client/Client';

export default class ArtistPlaylist extends Component {
  render = (): VirtualElement => {
    const { playlist } = this.props;
    console.log('playlist:', playlist);
    let n: number = 1;
    return (
      <div class="artist-playlist">
        {playlist
          ? playlist.map((v: any) => (
              <ArtistTrack
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
