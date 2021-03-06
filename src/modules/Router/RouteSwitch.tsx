import VDom from '@rflban/vdom';
import Route from './Route';
import RouteNavigator from './RouteNavigator';
import RouterContext from './RouterContext';
import match from './match';
import RouteProps from './RouteProps';

export default class RouteSwitch extends VDom.Component<any, any, any, RouteNavigator | null> {
  static contextType = RouterContext;

  private toRenderIdx: number | null;

  constructor(props: any) {
    super(props);
    this.toRenderIdx = null;

    if (this.context == null) {
      throw Error('Router has not been found');
    }
  }

  route(): void {
    const navigator = this.context!;

    if (
      !this.children.every((child) => child instanceof VDom.VirtualElement && child.type === Route)
    ) {
      throw Error('RouteSwitch have to contain only Route components');
    }

    this.toRenderIdx = null;
    let idx = 0;

    // eslint-disable-next-line no-restricted-syntax
    for (const child of this.children) {
      const route = child as VDom.VirtualElement;
      const { to: path, exact: isExact } = route.props as RouteProps;

      const matchResult = match(path, navigator.unhandledPath, isExact ?? false);

      if (matchResult) {
        const { params, handled, rest } = matchResult;

        navigator.unhandledPath = rest;
        navigator.handledSwitchers.push({
          path: handled,
          switcher: this as unknown as VDom.Component,
          params,
        });

        this.toRenderIdx = idx;
        break;
      }

      idx += 1;
    }
  }

  render(): VDom.VirtualElement {
    const navigator = this.context!;

    if (!navigator.contains(this as unknown as VDom.Component)) {
      this.route();
    }

    if (this.toRenderIdx == null) {
      console.log(navigator);
      throw Error('RouteSwitch no match');
    }

    console.log(this.props.children[this.toRenderIdx]);
    console.log(navigator);

    return (
      <RouterContext.Provider value={navigator}>
        {this.props.children[this.toRenderIdx]}
      </RouterContext.Provider>
    );
  }
}
