import Component from '../../modules/VDom/Component';
import VirtualElement from '../../modules/VDom/VirtualElement';
import VDom from '../../modules/VDom';
import Navbar from '../common/Navbar/Navbar';
import { IProps } from '../../modules/VDom/Interfaces';
import Sidebar from './Sidebar/Sidebar';
import Player from './Player/Player';
import '../../index.css';
import './Page.scss';
import Homepage from '../Homepage/Homepage';
import { PlayerClass } from '../../modules/Media/player';

export default class Page extends Component {
  render = (): VirtualElement => {
    const player = new PlayerClass();
    const { content, isAuthorized } = this.props;
    return (
      <div class="page">
        <Sidebar isAuthorized={isAuthorized}/>
        <div class="content">
          {content}
        </div>
        {/* <Player player={player}/> */}
      </div>
    );
  };
}
