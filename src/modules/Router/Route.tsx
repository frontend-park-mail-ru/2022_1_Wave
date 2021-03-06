import VDom from '@rflban/vdom';
import RouteProps from './RouteProps';

export default class Route extends VDom.Component<RouteProps> {
  render(): VDom.VirtualElement {
    return <>{this.props.children}</>;
  }
}
