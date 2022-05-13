import './AuthRequiredModal.scss';
import VDom from '@rflban/vdom';
import {
  Button, Caption,
  ModalDisplayerStateless, Subhead,
} from '@rflban/waveui';
import RouteNavigator from '../../../modules/Router/RouteNavigator';
import RouterContext from '../../../modules/Router/RouterContext';
import Link from '../../../modules/Router/Link2';

interface AuthRequiredModalProps {
  ref?: VDom.Ref<VDom.RefTypes>;
  open: boolean;
  onOpen?: Function;
  onClose?: Function;
}

interface AuthRequiredModalState {
}

export default class AuthRequiredModal extends VDom.Component<AuthRequiredModalProps, AuthRequiredModalState, null, RouteNavigator> {
  static contextType = RouterContext;

  render(): VDom.VirtualElement {
    return (
      <ModalDisplayerStateless
        open={this.props.open}
        onOpen={this.props.onOpen}
        onClose={this.props.onClose}
        direction="row"
        animated
        wrapper={(m: VDom.VirtualElement): VDom.VirtualElement => (
          <RouterContext.Provider value={this.context}>
            {m}
          </RouterContext.Provider>
        )}
      >
        <div class="waveAuthRequiredModal">
          <Subhead size="m" align="left">
            This action requires to be signed in
          </Subhead>
          <div class="waveAuthRequiredModal__controls">
            <Button
              mode="secondary"
              size="s"
            >
              Dismiss
            </Button>
            <div class="waveAuthRequiredModal__links">
              <Link to="/login">
                <Button
                  mode="secondary"
                  size="s"
                >
                  Log in
                </Button>
              </Link>
              <Caption size="l">
                or
              </Caption>
              <Link to="/signup">
                <Button
                  mode="primary"
                  size="s"
                >
                  Sign up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </ModalDisplayerStateless>
    );
  }
}
