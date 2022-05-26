import './AuthRequiredModal.scss';
import VDom from '@rflban/vdom';
import {
  Button,
  ModalDisplayer,
  PlusIcon,
  Subhead,
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

export default class AuthRequiredModal extends VDom.Component<AuthRequiredModalProps, AuthRequiredModalState> {
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
      <RouterContext.Consumer>
        {(navigator: RouteNavigator): VDom.VirtualElement => (
          <ModalDisplayer
            open={open}
            onOpen={onOpen}
            onClose={onClose}
            direction="row"
            animated
            wrapper={(m: VDom.VirtualElement): VDom.VirtualElement => (
              <RouterContext.Provider value={navigator}>
                {m}
              </RouterContext.Provider>
            )}
          >
            <div class="waveAuthRequiredModal">
              <div class="waveAuthRequiredModal__collapse" onClick={onClose}>
                <PlusIcon class="waveAuthRequiredModal__collapse__icon"/>
              </div>
              <Subhead size="m" align="center">
                You need an account for this action
              </Subhead>
              <div class="waveAuthRequiredModal__links">
                <Link to="/login">
                  <Button
                    stretched
                    mode="secondary"
                    size={smallScreen ? 'm' : 's'}
                  >
                    Log in
                  </Button>
                </Link>
                {!smallScreen && (
                  <Subhead size="s">
                    or
                  </Subhead>
                )}
                <Link to="/signup">
                  <Button
                    stretched
                    mode="primary"
                    size={smallScreen ? 'm' : 's'}
                  >
                    Sign up
                  </Button>
                </Link>
              </div>
            </div>
          </ModalDisplayer>
        )}
      </RouterContext.Consumer>
    );
  }
}
