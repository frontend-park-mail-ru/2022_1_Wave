import VDom from '@rflban/vdom';
import RouteNavigator from './RouteNavigator';
import RouterContext from './RouterContext';

interface RedirectProps {
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
    this.context!.swap(this.props.to);
  }
}
