import VirtualElement from '../../modules/VDom/VirtualElement';
import VDom from '../../modules/VDom';
import Sidebar from './Sidebar/Sidebar';
import Player from './Player/Player';
import '../../index.css';
import './Page.scss';
import { PlayerClass } from '../../modules/Media/player';
import { Map } from '../../modules/Store/types';
import { connect } from '../../modules/Connect';
import { trackGetPopular } from '../../actions/Track';
import { IProps } from '../../modules/VDom/Interfaces';

class Page extends VDom.Component {
  constructor(props:IProps) {
    super(props);
    this.state = {
      playlist: null,
    };
  }

  didMount():void {
    this.props.getPlaylist();
  }

  render = (): VirtualElement => {
    const { content, isAuthorized } = this.props;
    console.log(this.props);
    const playlist = this.props.playlist ? this.props.playlist : null;
    if (this.state.playlist !== playlist) {
      this.setState({ playlist });
    }
    console.log('playlist:', this.state.playlist);

    const player = new PlayerClass(this.state.playlist);
    return (
      <div class="page">
        <Sidebar isAuthorized={isAuthorized}/>
        <div class="content">
          {content}
        </div>
        <Player player={player}></Player>
      </div>
    );
  };
}

const mapStateToProps = (state: any):Map => ({
  playlist: state.tracksPopular ? state.tracksPopular.popular : null,
  something: state.tracksPopular,
});

const mapDispatchToProps = (dispatch:any):Map => ({
  getPlaylist: () => {
    dispatch(trackGetPopular);
  },
});

const PageConnected = connect(mapStateToProps, mapDispatchToProps)(Page);
export default PageConnected;
