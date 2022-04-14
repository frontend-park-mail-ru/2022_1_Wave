import VDom from '../VDom';
import RouteNavigator from './RouteNavigator';
import RouterContext from './RouterContext';
import { IComponentPropsCommon } from '../VDom/IComponentProps';

interface RedirectProps extends IComponentPropsCommon {
  to: string;
}

export default class Redirect extends VDom.Component<
  RedirectProps,
  any,
  any,
  RouteNavigator | null
> {
  static contextType = RouterContext;

  render(): VDom.VirtualElement {
    return <></>;
  }

  didMount(): void {
    this.context!.go(this.props.to);
  }
}
