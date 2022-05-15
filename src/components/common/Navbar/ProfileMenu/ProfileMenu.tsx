import VDom from "@rflban/vdom";
import {
  Menu,
  MenuItem,
  Caption,
  Divider,
  SettingsIcon,
  LogoutIcon,
} from '@rflban/waveui';
import {IComponentPropsCommon} from "@rflban/vdom/dist/IComponentProps";
import avatar from "../../../../assets/avatar_placeholder.png";
import Link from "../../../../modules/Router/Link2";
import './ProfileMenu.scss';

interface ProfileMenuProps extends IComponentPropsCommon{
  username: string,
  avatarSrc: string,
  logout: (_e: Event) => void,
}

export default class ProfileMenu extends VDom.Component<ProfileMenuProps> {
  private readonly menuRef = new VDom.Ref();

  menuOpen = (): void => {
    (this.menuRef.instance as any).open();
  }

  render = (): VDom.VirtualElement => (
    <div class="profile-menu">
      <div class="profile-menu__avatar-wrapper">
        <div class="profile-menu__avatar_img-round__wrapper">
          <img
            class="profile-menu__avatar_img-round"
            src={this.props.avatarSrc ?? avatar}
            alt="avatar.png"
            onclick={this.menuOpen}
          />
          <Menu
            ref={this.menuRef}
          >
            <div class="profile-menu__menu-label">
              <Caption size="m" align="left">
                Logged in as{'\u00A0'}
              </Caption>
              <Caption size="m" align="left" style={{ 'font-weight': '500' }}>
                {this.props.username}
              </Caption>
            </div>
            <Divider/>
            <Link to="/settings">
              <MenuItem
                before={<SettingsIcon style={{height: '45%'}} />}
                closeOnClick
              >
                Settings
              </MenuItem>
            </Link>
            <MenuItem
              before={<LogoutIcon style={{height: '40%'}} />}
              closeOnClick
              onClick={this.props.logout}
            >
              Logout
            </MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  )
}