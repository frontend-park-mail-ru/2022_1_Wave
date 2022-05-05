import VDom from "@rflban/vdom";
import './NavMenu.scss';
import LinkedTextButton from "../LinkedTextButton/LinkedTextButton";

export default class NavMenu extends VDom.Component {

  render = (): VDom.VirtualElement => (
    <div class="nav-menu">
      <LinkedTextButton to='/' text='DISCOVER'/>
      <LinkedTextButton to='/library' text='MY LIBRARY'/>
    </div>
  )
}