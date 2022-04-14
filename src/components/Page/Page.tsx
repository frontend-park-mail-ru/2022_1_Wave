import VDom from '../../modules/VDom';
import '../../index.css';
import './Page.scss';
import PlayerConnected from './Player/Player';
import SidebarConnected from './Sidebar/Sidebar';

export default class Page extends VDom.Component {
  render = (): VDom.VirtualElement => {
    const { content, isAuthorized } = this.props;
    return (
      <div class="page">
        <SidebarConnected isAuthorized={isAuthorized} />
        <div class="content">{content}</div>
        <PlayerConnected />
      </div>
    );
  };
}
