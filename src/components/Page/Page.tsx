import VirtualElement from '../../modules/VDom/VirtualElement';
import VDom from '../../modules/VDom';
import Sidebar from './Sidebar/Sidebar';
import Player from './Player/Player';
import '../../index.css';
import './Page.scss';
import { PlayerClass } from '../../modules/Media/player';
import { Store } from '../../modules/Store/store';
import { ContextType, IContextType } from '../../modules/VDom/Context';
import { IStore, Map } from '../../modules/Store/types';
import { connect } from '../../modules/Connect';
import rootReducer from '../../modules/Reducers';
import { getPopularAction } from '../../actions/Album';
import { IProps } from '../../modules/VDom/Interfaces';
import playlistPopular from '../../reducers/popular';

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
        {/* <Player player={player}/> */}
      </div>
    );
  };
}

const mapStateToProps = (state: any):Map => ({
  playlist: state.playlistPopular ? state.playlistPopular.playlist : null,
  something: state.playlistPopular,
});

const mapDispatchToProps = (dispatch:any):Map => ({
  getPlaylist: () => {
    dispatch(getPopularAction);
  },
});

const PageConnected = connect(mapStateToProps, mapDispatchToProps)(Page);
export default PageConnected;
