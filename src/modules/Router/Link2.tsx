import VDom from '@rflban/vdom';
import RouterContext from './RouterContext';
import RouteNavigator from './RouteNavigator';

interface LinkProps {
  to: string;
  class?: string;
  onClick?: (_e: MouseEvent) => void;
  onClickCapture?: (_e: MouseEvent) => void;
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
    this.props.onClick?.(e);

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
      <a
        style={{
          ['text-decoration']: 'none',
          color: 'inherit',
        }}
        class={`${additionalClass}`}
        href={to}
        onClick={this.handleClick}
        onClickCapture={this.props.onClickCapture}
      >
        {this.props.children}
      </a>
    );
  }
}
