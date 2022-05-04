import VDom from "@rflban/vdom";
import './AuthMenu.scss';
import LinkedTextButton from "../LinkedTextButton/LinkedTextButton";

export default class AuthMenu extends VDom.Component {

  render = (): VDom.VirtualElement => (
    <div class="auth-menu">
      <LinkedTextButton to='/login' text='LOG IN'/>
      <LinkedTextButton to='/signup' text='SIGN IN'/>
    </div>
  )
}