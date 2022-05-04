import './Sidebar.scss';
import VDom from '@rflban/vdom';
import '../../../index.css';
import {Logo} from "@rflban/waveui";
import Navigation from './Navigation/Navigation';
import Link from '../../../modules/Router/Link2';
import { Map } from '../../../modules/Store/types';
import { setPosition } from '../../../actions/Player';
import { connect } from '../../../modules/Connect';
import Playlist from './Playlist/Playlist';
import { getPopularTracks } from '../../../actions/Playlist';
import {mainSmallScreen} from "../../../mediaQueries";

class SidebarComponent extends VDom.Component<any> {
  state = {
    isSmallScreen: mainSmallScreen.matches,
  }

  constructor(props: {}) {
    super(props);
    this.setTrack = this.setTrack.bind(this);
    this.clickRecomended = this.clickRecomended.bind(this);
    this.props.getPopular();
  }

  setTrack(pos: number): (_e: Event) => void {
    return (e: Event): void => {
      e.stopPropagation();
      this.props.setPos(pos);
    };
  }

  clickRecomended(_e: Event): void {
    this.props.getPopular();
  }

  mediaSmallScreenhandler = (e: MediaQueryListEvent): void => {
    this.setState({
      isSmallScreen: e.matches,
    });
  }

  didMount(): void {
    mainSmallScreen.addEventListener('change', this.mediaSmallScreenhandler);
  }

  willUmount(): void {
    mainSmallScreen.removeEventListener('change', this.mediaSmallScreenhandler);
  }

  render = (): VDom.VirtualElement => {
    if (!this.props) {
      return <div class="sidebar" />;
    }
    const content = this.state.isSmallScreen ? (
      <div>
        <Link to='/' >
          <Navigation title="Discover" />
        </Link>
        <Link to='/library' >
          <Navigation title="My Library" />
        </Link>
        {this.props.isAuth ? <div>
          <Link to='/settings' >
            <Navigation title="Settings" />
          </Link>
        </div> : 
          <div>
            <Link to='/login' >
              <Navigation title="Log in" />
            </Link>
            <Link to='/signup' >
              <Navigation title="Sign up" />
            </Link>
          </div>
        }
      </div>
    ) : (
      <div>
          
      </div>
    );
    return (
      <div class={`sidebar 
      ${this.state.isSmallScreen ? 'sidebar_mobile' : ''}
      ${this.state.isSmallScreen ? 
        this.props.sidebarIsOpen ? 'sidebar_open': 'sidebar_closed'
        : ''}`}>
        <div class="sidebar__header">
          <Link to="/">
            <Logo size={'m'} class="header__logo"/>
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
  sidebarIsOpen: state.sidebar ?? null,
});

const Sidebar = connect(mapStateToProps, mapDispatchToProps)(SidebarComponent);
export default Sidebar;
