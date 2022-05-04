import VDom from "@rflban/vdom";
import './NavMenu.scss';
import LinkedTextButton from "../LinkedTextButton/LinkedTextButton";

export default class NavMenu extends VDom.Component {

  render = (): VDom.VirtualElement => (
    <div class="nav-menu">
      <LinkedTextButton to='/login' text='DISCOVER'/>
      <LinkedTextButton to='/signup' text='MY LIBRARY'/>
    </div>
  )
}