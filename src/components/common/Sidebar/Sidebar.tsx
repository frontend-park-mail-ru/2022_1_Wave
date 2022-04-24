import './Sidebar.scss';
import VDom from '../../../modules/VDom';
import '../../../index.css';
import logo from '../../../assets/logo_img.png';
import Navigation from './Navigation/Navigation';
import Link from '../../../modules/Router/Link';
import { Map } from '../../../modules/Store/types';
import { setPosition } from '../../../actions/Player';
import { connect } from '../../../modules/Connect';
import { IProps } from '../../../modules/VDom/Interfaces';
import Playlist from './Playlist/Playlist';
import { getPopularTracks } from '../../../actions/Playlist';

class Sidebar extends VDom.Component {
  constructor(props: IProps) {
    super(props);
    this.setTrack = this.setTrack.bind(this);
    this.clickRecomended = this.clickRecomended.bind(this);
    this.props.getPopular();
  }

  setTrack(pos: number): (e: Event) => void {
    return (e: Event): void => {
      this.props.setPos(pos);
    };
  }

  clickRecomended(e: Event): void {
    this.props.getPopular();
  }

  render = (): VDom.VirtualElement => {
    const { isAuthorized } = this.props;
    if (!this.props) {
      return <div class="sidebar" />;
    }
    const content = isAuthorized ? (
      <div>
        <Navigation title="My playlist" />
        <Navigation title="Last listening" />
        <Navigation clickHandler={this.clickRecomended} title="Recommended" />
      </div>
    ) : (
      <Navigation title="Listening in the world" />
    );
    return (
      <div class="sidebar">
        <div class="sidebar__header">
          <Link to="/">
            <div class="header__logo">
              <img class="logo__picture" src={logo} alt="logo.svg" />
            </div>
          </Link>
        </div>
        {content}
        <Playlist
          highlite={this.props.position}
          playlist={this.props.playlist}
          setTrack={this.setTrack}
        />
      </div>
    );
  };
}

const mapDispatchToProps = (dispatch: any): Map => ({
  setPos: (num: number): void => {
    dispatch(setPosition(num));
  },
  getPopular: (): void => {
    dispatch(getPopularTracks);
  },
});
const mapStateToProps = (state: any): Map => ({
  playlist: state.playerPlaylist ? state.playerPlaylist : null,
  position: state.playerPosition ? state.playerPosition.value : 0,
});

const SidebarConnected = connect(mapStateToProps, mapDispatchToProps)(Sidebar);
export default SidebarConnected;
