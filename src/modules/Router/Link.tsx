import VDom from '../VDom';
import RouterContext from './RouterContext';
import RouteNavigator from './RouteNavigator';

interface LinkProps {
  to: string,
  as?: string | (new (props: any) => VDom.Component);
}

export default class Link extends VDom.Component<LinkProps, any, null, RouteNavigator> {
  static contextType = RouterContext;

  constructor(props: LinkProps) {
    super(props);
    this.handleClick = this.handleClick.bind(this);

    if (this.context == null) {
      throw Error('Router has not been found');
    }
  }

  handleClick(e: Event): void {
    e.preventDefault();
    const navigator = this.context!;
    navigator.go(this.props.to);
  }

  render(): VDom.VirtualElement {
    const { as, ...restProps } = this.props;

    let WrappedComponent = as;
    if (WrappedComponent == null) {
      WrappedComponent = 'a';
    }

    return (
      <WrappedComponent {...restProps} onClick={this.handleClick}>
        {this.props.children}
      </WrappedComponent>
    );
  }
}
