import './Sidebar.scss';
import VDom from '@rflban/vdom';
import '../../../index.css';
import logo from '../../../assets/logo_img.png';
import Navigation from './Navigation/Navigation';
import Link from '../../../modules/Router/Link';
import { Map } from '../../../modules/Store/types';
import { setPosition } from '../../../actions/Player';
import { connect } from '../../../modules/Connect';
import Playlist from './Playlist/Playlist';
import { getPopularTracks } from '../../../actions/Playlist';

class SidebarComponent extends VDom.Component<any> {
  constructor(props: {}) {
    super(props);
    this.setTrack = this.setTrack.bind(this);
    this.clickRecomended = this.clickRecomended.bind(this);
    this.props.getPopular();
  }

  setTrack(pos: number): (_e: Event) => void {
    return (_e: Event): void => {
      this.props.setPos(pos);
    };
  }

  clickRecomended(_e: Event): void {
    this.props.getPopular();
  }

  render = (): VDom.VirtualElement => {
    if (!this.props) {
      return <div class="sidebar" />;
    }
    const content = this.props.isAuth ? (
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
  isAuth: state.user?.id != null,
  playlist: state.playerPlaylist ? state.playerPlaylist : null,
  position: state.playerPosition ? state.playerPosition.value : 0,
});

const Sidebar = connect(mapStateToProps, mapDispatchToProps)(SidebarComponent);
export default Sidebar;
