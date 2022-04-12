import VDom from '../VDom';

export default class Route extends VDom.Component {
  render(): VDom.VirtualElement {
    return <>{this.props.children}</>;
  }
}
