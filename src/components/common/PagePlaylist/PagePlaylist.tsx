import VDom from '../../../modules/VDom';
import './PagePlaylist.scss';
import { config } from '../../../modules/Client/Client';
import {IComponentPropsCommon} from "../../../modules/VDom/IComponentProps";
import PageTrack from "./PageTrack/PageTrack";
import {ITrack} from "../../../modules/Media/media";

interface PagePlaylistProps extends IComponentPropsCommon {
  playlist: Array<any>;
  runTrack: (track:ITrack) => (e:Event) => void;
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
