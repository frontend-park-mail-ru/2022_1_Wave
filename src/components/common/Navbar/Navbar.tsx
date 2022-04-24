import Component from '../../../modules/VDom/Component';
import VirtualElement from '../../../modules/VDom/VirtualElement';
import VDom from '../../../modules/VDom';
import '../../../index.css';
import './Navbar.scss';
import avatar from '../../../assets/avatar.png';
import { IProps } from '../../../modules/VDom/Interfaces';
import Link from '../../../modules/Router/Link';
import { Map } from '../../../modules/Store/types';
import { userLogout } from '../../../actions/User';
import { connect } from '../../../modules/Connect';

class Navbar extends Component {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isPopupShow: false,
    };
    this.logout = this.logout.bind(this);
  }

  logout = (): void => {
    this.props.logout();
  };

  render = (): VirtualElement => {
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
            <div class="text button__text ">DISCOVER</div>
          </div>
          <div class="navbar__menu__button">
            <div class="text button__text">MY LIBRARY</div>
          </div>
          <div class="navbar__menu__button">
            <div class="text button__text">RADIO</div>
          </div>
        </div>
        <div class="navbar__search">
          <input class="search__input" type="text" placeholder="Search artists, albums..." />
          <span class="fa-solid fa-magnifying-glass navbar__search__icon"></span>
        </div>
        {content}
      </div>
    );
  };
}

const mapStateToProps = (state: any): Map => ({
  isAuth: state.user?.id != null,
  user: state.user ?? {},
});

const mapDispatchToProps = (dispatch: any): Map => ({
  logout: (): void => {
    dispatch(userLogout());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
