import VDom from '@rflban/vdom';
import './MobMenu.scss';
import {IComponentPropsCommon} from "@rflban/vdom/dist/IComponentProps";
import {Map} from "../../../../modules/Store/types";
import {closeSidebar, openSidebar} from "../../../../actions/Sidebar";
import {connect} from "../../../../modules/Connect";

interface MobMenuProps extends IComponentPropsCommon{
  openSidebar: () =>void,
  closeSidebar: () =>void,
  isSidebar: boolean,
}

class MobMenu extends VDom.Component<MobMenuProps> {

  toogleMenu = (e:Event): void => {
    e.preventDefault();
    if (!this.props.isSidebar){
      this.props.openSidebar();
    }else{
      this.props.closeSidebar();
    }
  }

  render = (): VDom.VirtualElement => (
    <div onclick={this.toogleMenu}
      ontouch={this.toogleMenu}
      onblur={this.toogleMenu}
      class="fa-solid fa-bars menu-navbar"
      style={{visibility: `${this.props.isSidebar ? 'hidden': 'visible'}`}}>
    </div>)
}


const mapStateToProps = (state: any): Map => ({
  isSidebar: state.sidebar,
});

const mapDispatchToProps = (dispatch: any): Map => ({
  openSidebar: ():void =>{
    dispatch(openSidebar);
  },
  closeSidebar: ():void =>{
    dispatch(closeSidebar)
  },
});

export default connect(mapStateToProps,mapDispatchToProps)(MobMenu)
