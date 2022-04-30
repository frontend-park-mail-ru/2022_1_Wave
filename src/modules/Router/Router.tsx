import VDom from '@rflban/vdom';
import RouteNavigator from './RouteNavigator';
import RouterContext from './RouterContext';

export default class Router extends VDom.Component {
  private navigator: RouteNavigator;

  constructor(props: any) {
    super(props);

    this.navigator = new RouteNavigator(this);
    this.navigator.start();
  }

  render(): VDom.VirtualElement {
    return (
      <RouterContext.Provider value={this.navigator}>{this.props.children}</RouterContext.Provider>
    );
  }
}
