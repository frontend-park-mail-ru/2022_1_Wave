import VDom from '@rflban/vdom';
import './PagePlaylist.scss';
import { config } from '../../../modules/Client/Client';
import PageTrack from './PageTrack/PageTrack';
import { ITrack } from '../../../modules/Media/media';

interface PagePlaylistProps {
  playlist: Array<any>;
  runTrack: (track: ITrack) => (e: Event) => void;
}

export default class PagePlaylist extends VDom.Component<PagePlaylistProps> {
  render = (): VDom.VirtualElement => {
    const { playlist } = this.props;
    let n: number = 1;
    return (
      <div class="artist-playlist">
        {playlist
          ? playlist.map((v: any) => (
            <PageTrack
              id={v.id}
              handleClick={this.props.runTrack(playlist[n - 1])}
              num={n++}
              cover={config.files + v.cover}
              name={v.title}
              listenedCnt={v.listenings}
              duration={v.duration}
              contextMenu={this.props.children}
            />
          ))
          : ''}
      </div>
    );
  };
}
