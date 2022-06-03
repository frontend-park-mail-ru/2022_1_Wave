import './Sidebar.scss';
import VDom from '@rflban/vdom';
import '../../../index.css';
import {Caption, Logo} from "@rflban/waveui";
import Navigation from './Navigation/Navigation';
import Link from '../../../modules/Router/Link2';
import { Map } from '../../../modules/Store/types';
import { setPosition } from '../../../actions/Player';
import { connect } from '../../../modules/Connect';
import Playlist from './Playlist/Playlist';
import { getPopularTracks } from '../../../actions/Playlist';
import {mainSmallScreen} from "../../../mediaQueries";
import {closeSidebar} from "../../../actions/Sidebar";
import {userLogout} from "../../../actions/User";

class SidebarComponent extends VDom.Component<any> {
  state = {
    isSmallScreen: mainSmallScreen.matches,
  }

  constructor(props: {}) {
    super(props);
    this.setTrack = this.setTrack.bind(this);
    this.clickRecomended = this.clickRecomended.bind(this);
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
    if(!this.props.playlist || this.props.playlist?.length < 0) {
      this.props.getPopular();
    }
  }

  willUmount(): void {
    mainSmallScreen.removeEventListener('change', this.mediaSmallScreenhandler);
  }

  close = (e:TouchEvent| MouseEvent):void => {
    if(e.currentTarget?.className.split('\n')[0] === 'sidebar-wrapper'){
      this.props.closeSidebar();
    }
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
          <Navigation clickHandler={this.props.logout} title="Logout" />
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
      <></>
    );
    const sidebarComponent: VDom.VirtualElement = (
      <div class={`sidebar 
      ${this.state.isSmallScreen ? 'sidebar_mobile' : ''}`}>
        <div class="sidebar__header">
          <Link to="/">
            <Logo align='left' size={'m'} class="header__logo"/>
            <Caption align="center" style={{
              display:'table',
              margin:'0 auto',
              'padding-right':'40px'}}> The Best Musical Service</Caption>
          </Link>
          { this.state.isSmallScreen &&
            <div onClick={this.close} class="sidebar__header__cross fa-solid fa-xmark"/>
          }
        </div>
        {content}
        <Playlist
          tracks={this.props.playlist}
        />
      </div>
    );
    
    return (
      this.state.isSmallScreen ?
        <div onclick={this.close} class={`sidebar-wrapper
        ${this.props.sidebarIsOpen ? 'sidebar_open': 'sidebar_closed'}`}>
          {sidebarComponent}
        </div>
        :
        sidebarComponent
    )
  };
}

const mapDispatchToProps = (dispatch: any): Map => ({
  setPos: (num: number): void => {
    dispatch(setPosition(num));
  },
  getPopular: (): void => {
    dispatch(getPopularTracks);
  },
  closeSidebar: ():void =>{
    dispatch(closeSidebar)
  },
  logout: (): void => {
    dispatch(userLogout());
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
