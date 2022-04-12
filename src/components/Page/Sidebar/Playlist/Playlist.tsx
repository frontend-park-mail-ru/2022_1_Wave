import './Playlist.scss';
import VDom from '../../../../modules/VDom';
import Track from './Track/Track';

export default class Playlist extends VDom.Component {
  render = (): VDom.VirtualElement => {
    let n = 0;
    return (
      <ul class="sidebar__my-playlist">
        { this.props.playlist ? this.props.playlist.map((v:any) => (<Track order={n++} title={v.title} cover={v.cover} artist={v.artist}/>)) : '' }
      </ul>
    );
  };
}
