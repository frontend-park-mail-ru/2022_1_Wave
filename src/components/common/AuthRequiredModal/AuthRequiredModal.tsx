import './AuthRequiredModal.scss';
import VDom from '@rflban/vdom';
import {
  Button, Caption,
  ModalDisplayerStateless, Subhead,
} from '@rflban/waveui';
import RouteNavigator from '../../../modules/Router/RouteNavigator';
import RouterContext from '../../../modules/Router/RouterContext';
import Link from '../../../modules/Router/Link2';
import {
  mainMobileScreen,
} from '../../../mediaQueries';

interface AuthRequiredModalProps {
  ref?: VDom.Ref<VDom.RefTypes>;
  open: boolean;
  onOpen?: Function;
  onClose?: Function;
}

interface AuthRequiredModalState {
  smallScreen: boolean;
}

export default class AuthRequiredModal extends VDom.Component<AuthRequiredModalProps, AuthRequiredModalState, null, RouteNavigator> {
  static contextType = RouterContext;

  state = {
    smallScreen: mainMobileScreen.matches,
  }

  mediaSmallScreenhandler = (e: MediaQueryListEvent): void => {
    this.setState({
      smallScreen: e.matches,
    });
  }

  didMount(): void {
    mainMobileScreen.addEventListener('change', this.mediaSmallScreenhandler);
  }

  willUmount(): void {
    mainMobileScreen.removeEventListener('change', this.mediaSmallScreenhandler);
  }

  handleDismiss = (_e: MouseEvent): void => {
    this.props.onClose?.();
  }

  render(): VDom.VirtualElement {
    const {
      open,
      onOpen,
      onClose,
    } = this.props;
    const {
      smallScreen,
    } = this.state;

    return (
      <ModalDisplayerStateless
        open={open}
        onOpen={onOpen}
        onClose={onClose}
        direction="row"
        animated
        wrapper={(m: VDom.VirtualElement): VDom.VirtualElement => (
          <RouterContext.Provider value={this.context}>
            {m}
          </RouterContext.Provider>
        )}
      >
        <div class="waveAuthRequiredModal">
          <Subhead size={smallScreen ? 'l' : 'm'} align={smallScreen ? 'center' : 'left'}>
            You need an account for this action
          </Subhead>
          <div class="waveAuthRequiredModal__controls">
            <Button
              stretched={smallScreen}
              mode="secondary"
              size={smallScreen ? 'l' : 's'}
              onClick={this.handleDismiss}
              class="waveAuthRequiredModal__dismiss"
            >
              Dismiss
            </Button>
            <div class="waveAuthRequiredModal__links">
              <Link to="/login">
                <Button
                  stretched={smallScreen}
                  mode="secondary"
                  size={smallScreen ? 'l' : 's'}
                >
                  Log in
                </Button>
              </Link>
              {
                smallScreen
                  ? (
                    <Subhead size="s">
                      or
                    </Subhead>
                  )
                  : (
                    <Caption size="l">
                      or
                    </Caption>
                  )
              }
              <Link to="/signup">
                <Button
                  stretched={smallScreen}
                  mode="primary"
                  size={smallScreen ? 'l' : 's'}
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
