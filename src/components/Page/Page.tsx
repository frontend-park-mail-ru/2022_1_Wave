import VDom from '@rflban/vdom';
import '../../index.css';
import './Page.scss';
import PlayerConnected from './Player/Player';
import SidebarConnected from './Sidebar/Sidebar';

interface PageProps {
  content: VDom.VirtualElement;
}

export default class Page extends VDom.Component<PageProps> {
  render = (): VDom.VirtualElement => {
    const { content } = this.props;
    return (
      <div class="page">
        <SidebarConnected />
        <div class="content">{content}</div>
        <PlayerConnected />
      </div>
    );
  };
}
