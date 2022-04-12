import './Sidebar.scss';
import VDom from '../../../modules/VDom';
import Playlist from './Playlist/Playlist';
import '../../../index.css';
import logo from '../../../assets/logo_img.png';
import Navigation from './Navigation/Navigation';

export default class Sidebar extends VDom.Component {
  render = (): VDom.VirtualElement => {
    const { isAuthorized, playlist } = this.props;
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
        <Playlist playlist={playlist}/>
      </div>
    );
  };
}
