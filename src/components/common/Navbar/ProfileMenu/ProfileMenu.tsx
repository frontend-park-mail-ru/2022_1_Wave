import VDom from "@rflban/vdom";
import {IComponentPropsCommon} from "@rflban/vdom/dist/IComponentProps";
import avatar from "../../../../assets/avatar.png";
import Link from "../../../../modules/Router/Link2";
import './ProfileMenu.scss';

interface ProfileMenuProps extends IComponentPropsCommon{
    avatarSrc: string,
    logout: (e: Event) => void,
}

export default class ProfileMenu extends VDom.Component<ProfileMenuProps> {

  render = (): VDom.VirtualElement => (
    <div class="profile-menu">
      <div class="profile-menu__avatar-wrapper">
        <img
          class="profile-menu__avatar_img-round"
          src={this.props.avatarSrc ?? avatar}
          alt="avatar.png"
        />
        <div class="profile-menu__popup">
          <Link to="/settings">
            <div class="text profile-menu__popup__text profile-menu__popup__settings">Settings</div>
          </Link>
          <div onClick={this.props.logout}>
            <div class="text profile-menu__popup__text profile-menu__popup__logout">Logout</div>
          </div>
        </div>
      </div>
    </div>
  )
}