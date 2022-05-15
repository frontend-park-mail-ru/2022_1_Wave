import VDom from '@rflban/vdom';
import '../../../index.css';
import './Navbar.scss';
import {Map} from '../../../modules/Store/types';
import {userLogout} from '../../../actions/User';
import {connect} from '../../../modules/Connect';
import {Clear, SearchRequest} from '../../../actions/Search';
import Search from './Search/Search';
import MobMenu from './MobMenu/MobMenu';
import AuthMenu from "./AuthMenu/AuthMenu";
import NavMenu from "./NavMenu/NavMenu";
import ProfileMenu from "./ProfileMenu/ProfileMenu";
import {mainSmallScreen} from "../../../mediaQueries";

interface NavbarProps {
  logout: () => void;
  isAuth: boolean;
  user: Map;
  search: (_req: string) => void;
}

class Navbar extends VDom.Component<NavbarProps> {
  state = {
    isPopupShow: false,
    isSmallScreen: mainSmallScreen.matches,
    isSidebarOpened: false,
  };

  constructor(props: NavbarProps) {
    super(props);

    this.logout = this.logout.bind(this);
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

  logout = (): void => {
    this.props.logout();
  };

  render = (): VDom.VirtualElement => {
    if (!this.state.isSmallScreen) {
      return (
        <div class="navbar">
          <NavMenu/>
          <Search/>
          {this.props.isAuth ?
            <ProfileMenu
              username={this.props.user?.username}
              avatarSrc={this.props.user?.avatar}
              logout={this.logout}
            /> :
            <AuthMenu/>
          }
        </div>
      );
    }

    return (
      <div class="navbar">
        <MobMenu/>
        <Search/>
      </div>
    );
  };
}

const mapStateToProps = (state: any): Map => ({
  isAuth: state.user?.id != null,
  user: state.user ?? {},
  searched: state.search ?? null,
});

const mapDispatchToProps = (dispatch: any): Map => ({
  logout: (): void => {
    dispatch(userLogout());
  },
  search: (request: string): void => {
    dispatch(SearchRequest(request));
  },
  dropSearch: (): void => {
    dispatch(Clear);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
