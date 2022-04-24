import VDom from '../../../modules/VDom';
import { Map } from '../../../modules/Store/types';
import { connect } from '../../../modules/Connect';
import { NotifyType, purge } from '../../../actions/Notifier';
import { IComponentPropsCommon } from '../../../modules/VDom/IComponentProps';
import './Notifier.scss';

interface NotifierComponentProps extends IComponentPropsCommon {
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
      class={`text notification ${this.props?.notification?.status}`}
    >
      {this.props?.notification?.msg ?? ''}
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
