import VDom from '@rflban/vdom';
import RouterContext from './RouterContext';
import RouteNavigator from './RouteNavigator';

interface LinkProps {
  to: string;
  class?: string;
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

  handleClick(e: MouseEvent): void {
    if (e.ctrlKey || e.metaKey) {
      return;
    }

    e.preventDefault();
    const navigator = this.context!;
    navigator.go(this.props.to);
  }

  render(): VDom.VirtualElement {
    const { to, class: additionalClass = '' } = this.props;

    return (
      <a style={{ ['text-decoration']: 'none' }} class={`${additionalClass}`} href={to} onClick={this.handleClick}>
        {this.props.children}
      </a>
    );
  }
}
