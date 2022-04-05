import Component from '../../../modules/VDom/Component';
import VirtualElement from '../../../modules/VDom/VirtualElement';
import VDom from '../../../modules/VDom';
import '../../../index.css';
import './Navbar.scss';
import avatar from '../../../assets/avatar.jpeg';
import { IProps } from '../../../modules/VDom/Interfaces';

export default class Navbar extends Component {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isPopupShow: false,

    };
    this.logout = this.logout.bind(this);
  }

  logout = (): void => {
    this.setState({ isPopupShow: !this.state.isPopupShow });
  };

  render = (): VirtualElement => {
    const { isAuthorized } = this.props;
    const content = isAuthorized ? (
      <div className="navbar__avatar">
        <div className="navbar__avatar__wrapper">
          <img onClick={this.logout} className="navbar__avatar__img_round" src={avatar} alt="avatar.png"/>
          <div className="popup">
            <a className="popup__settings__link" href="">
              <div className="text popup__text">Settings</div>
            </a>
            <div className="text popup__text popup__logout">Log out</div>
          </div>
        </div>
      </div>
    ) : (
      <div class="navbar__menu navbar__auth__menu  ">
        <div class="navbar__menu__button">
          <a class="navbar__link-new-page" href="/login">
            <div class="text button__text">LOG IN</div>
          </a>
        </div>
        <div class="navbar__menu__button">
          <a class="navbar__link-new-page" href="/signup">
            <div class="text button__text">SIGN UP</div>
          </a>
        </div>
      </div>
    );
    return (
      <div class="navbar main__top-chart__header">
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
          <input class="search__input" type="text" placeholder="Search artists, albums..."/>
          <span class="fa-solid fa-magnifying-glass navbar__search__icon"></span>
        </div>
        {content}
      </div>);
  };
}
