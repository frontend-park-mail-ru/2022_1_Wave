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

  logout = ():void => {
    this.setState({ isPopupShow: !this.state.isPopupShow });
  };

  render = (): VirtualElement => (
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
      <div class="navbar__avatar">
        <div class="navbar__avatar__wrapper">
          <img onclick={this.logout} class="navbar__avatar__img_round" src={avatar} alt="avatar.png"/>
          <div class="popup">
            <a class="popup__settings__link" href="">
              <div class="text popup__text">Settings</div>
            </a>
            <div class="text popup__text popup__logout">Log out</div>
          </div>
        </div>
      </div>
    </div>);
}
