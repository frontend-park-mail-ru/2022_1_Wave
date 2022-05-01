import VDom from '@rflban/vdom';
import '../../../index.css';
import './Navbar.scss';
import avatar from '../../../assets/avatar.png';
import Link from '../../../modules/Router/Link';
import { Map } from '../../../modules/Store/types';
import { userLogout } from '../../../actions/User';
import { connect } from '../../../modules/Connect';
import { Clear, SearchRequest } from '../../../actions/Search';
import Search from './Search/Search';
import ModMenu from './Menu/Menu';

interface NavbarProps {
  logout: () => void;
  isAuth: boolean;
  user: Map;
  search: (_req: string) => void;
}

class Navbar extends VDom.Component<NavbarProps> {
  constructor(props: NavbarProps) {
    super(props);
    this.state = {
      isPopupShow: false,
      screenWidth: window.screen.width,
    };
    this.logout = this.logout.bind(this);
  }

  logout = (): void => {
    this.props.logout();
  };

  render = (): VDom.VirtualElement => {
    console.log('screen width:', this.state.screenWidth);
    if (this.state.screenWidth > 720) {
      const content = this.props.isAuth ? (
        <div class="navbar__avatar">
          <div class="navbar__avatar__wrapper">
            <img
              class="navbar__avatar__img_round"
              src={this.props.user.avatar ?? avatar}
              alt="avatar.png"
            />
            <div class="popup">
              <Link as="div" to="/settings" class="text popup__text popup__settings">
                Settings
              </Link>
              <div onClick={this.logout} class="text popup__text popup__logout">
                Log out
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div class="navbar__menu navbar__auth__menu  ">
          <div class="navbar__menu__button">
            <a class="navbar__link-new-page" href="/login">
              <Link to="/login" as="div" class="text button__text">
                LOG IN
              </Link>
            </a>
          </div>
          <div class="navbar__menu__button">
            <a class="navbar__link-new-page" href="/signup">
              <Link to="/signup" as="div" class="text button__text">
                SIGN UP
              </Link>
            </a>
          </div>
        </div>
      );
      return (
        <div class="navbar">
          <div class="navbar__menu">
            <div class="navbar__menu__button">
              <Link to="/" class="text button__text ">
                DISCOVER
              </Link>
            </div>
            <div class="navbar__menu__button">
              <div class="text button__text">MY LIBRARY</div>
            </div>
          </div>
          <Search />
          {content}
        </div>
      );
    }

    return (
      <div class="navbar">
        <ModMenu />
        <Search />
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
