import Component from '../../../modules/VDom/Component';
import VirtualElement from '../../../modules/VDom/VirtualElement';
import VDom from '../../../modules/VDom';
import '../../../index.css';
import './ArtistPlaylist.scss';
import img from '../../../assets/playlist-track-icon-dummy.png';
import ArtistTrack from './ArtistTrack/ArtistTrack';

export default class ArtistPlaylist extends Component {
  render = (): VirtualElement => {
    const { playlist } = this.props;
    console.log(playlist);

    return (

      <div class="artist-playlist">
        <ArtistTrack num="1" cover={img} listenedCnt="2125" name="Rolling in the deep" isLiked={false} duration={'124'}/>
        <ArtistTrack num="2" cover={img} listenedCnt="2125" name="Rolling in the deep" isLiked={false} duration={'124'}/>
        <ArtistTrack num="2" cover={img} listenedCnt="2125" name="Rolling in the deep" isLiked={false} duration={'124'}/>
        <ArtistTrack num="2" cover={img} listenedCnt="2125" name="Rolling in the deep" isLiked={false} duration={'124'}/>
        <ArtistTrack num="2" cover={img} listenedCnt="2125" name="Rolling in the deep" isLiked={false} duration={'124'}/>
        <ArtistTrack num="2" cover={img} listenedCnt="2125" name="Rolling in the deep" isLiked={false} duration={'124'}/>
        <ArtistTrack num="2" cover={img} listenedCnt="2125" name="Rolling in the deep" isLiked={false} duration={'124'}/>
      </div>
    );
  };
}
