import VDom from '@rflban/vdom';
import './Menu.scss';

export default class ModMenu extends VDom.Component {
  render = (): VDom.VirtualElement => <div class="fa-solid fa-bars menu-navbar"></div>;
}
