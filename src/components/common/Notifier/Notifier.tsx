import VDom from '@rflban/vdom';
import { Map } from '../../../modules/Store/types';
import { connect } from '../../../modules/Connect';
import { NotifyType, purge } from '../../../actions/Notifier';
import './Notifier.scss';

interface NotifierComponentProps {
  notification: NotifyType;
  errActiveTime: number;
  successActiveTime: number;
  clearNotifier: () => void;
}

class NotifierComponent extends VDom.Component<NotifierComponentProps> {
  constructor(props: NotifierComponentProps) {
    super(props);
    this.hideNotifier = this.hideNotifier.bind(this);
  }

  hideNotifier(): void {
    this.props.clearNotifier();
  }

  didUpdate(): void {
    switch (this.props.notification?.status) {
    case 'error':
      setTimeout(() => {
        this.hideNotifier();
      }, this.props.errActiveTime * 1000);
      break;
    case 'success':
      setTimeout(() => {
        this.hideNotifier();
      }, this.props.successActiveTime * 1000);
      break;
    default:
    }
  }

  render = (): VDom.VirtualElement => (
    <div
      onclick={this.hideNotifier}
      style={{ display: this.props.notification ? 'flex' : 'none' }}
      class={`notification ${this.props?.notification?.status}`}
    >
      <div class="text notification__text">{this.props?.notification?.msg ?? ''}</div>
    </div>
  );
}

const mapStateToProps = (state: any): Map => ({
  notification: state.notification,
});

const mapDispatchToProps = (dispatch: any): Map => ({
  clearNotifier: (): void => {
    dispatch(purge);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NotifierComponent);
