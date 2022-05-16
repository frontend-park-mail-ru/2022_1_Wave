import VDom from "@rflban/vdom";
import './NavMenu.scss';
import LinkedTextButton from "../LinkedTextButton/LinkedTextButton";
import { Map } from '../../../../modules/Store/types';
import {
  showAuthRequired as showAuthReq,
} from '../../../../actions/Modals';
import { connect } from '../../../../modules/Connect';

interface NavMenuProps {
  showAuthRequired: () => void;
  isAuth: boolean;
}

class NavMenu extends VDom.Component<NavMenuProps> {
  libraryClickHandler = (e: MouseEvent): void => {
    if (e.ctrlKey || e.metaKey) {
      return;
    }

    if (!this.props.isAuth) {
      e.stopPropagation();
      e.preventDefault();
      this.props.showAuthRequired();
    }
  }

  render = (): VDom.VirtualElement => (
    <div class="nav-menu">
      <LinkedTextButton to='/' text='DISCOVER'/>
      <LinkedTextButton to='/library' text='MY LIBRARY' onClickCapture={this.libraryClickHandler}/>
    </div>
  )
}
const mapDispatchToProps = (dispatch: any): Map => ({
  showAuthRequired: (): void => {
    dispatch(showAuthReq());
  },
});

const mapStateToProps = (state: any): Map => ({
  isAuth: state.userStatus === 'authorized',
});

export default connect(mapStateToProps, mapDispatchToProps)(NavMenu);
