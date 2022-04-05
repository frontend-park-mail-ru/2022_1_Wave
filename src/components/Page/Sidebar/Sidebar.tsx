import VirtualElement from '../../../modules/VDom/VirtualElement';
import './Sidebar.scss';
import Component from '../../../modules/VDom/Component';
import VDom from '../../../modules/VDom';
import Playlist from './Playlist/Playlist';
import '../../../index.css';
import logo from '../../../assets/logo_img.png';
import pic from '../../../assets/playlist-track-icon-dummy.png';
import Navigation from './Navigation/Navigation';
import { IProps } from '../../../modules/VDom/Interfaces';

export default class Sidebar extends Component {
  render = (): VirtualElement => {
    const { isAuthorized } = this.props;
    const content = isAuthorized ? (
      <div>
        <Navigation title='My playlist'/>
        <Navigation title='Last listening'/>
        <Navigation title='Recommended'/>
      </div>
    ) : <Navigation title='Listening in the world'/>;
    return (
      <div class="sidebar">
        <div class="sidebar__header">
          <div class="header__logo">
            <img class="logo__picture" src={logo} alt="logo.svg"/>
          </div>
        </div>
        { content}
        <Playlist/>
      </div>
    );
  };
}
