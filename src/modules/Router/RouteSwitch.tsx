import VDom from '../VDom';
import Route from './Route';
import Router from './Router';
import { ContextType, IContextType } from '../VDom/Context';

const routeRegExp = /^(?:\/:?[\w_~.-]+)*$/;
const pathRegExp = /^(?:\/[\w_~.-]+)*$/;

type RouteProps = {
  to: string,
  exact: boolean,
}

export const routerContextType = new ContextType<Router | null>('router', null);

function match(expectPath: string, actualPath: string, isExact: boolean):
  { params: any, handled: string, rest: string } | null {
  if (actualPath === '/') {
    actualPath = '';
  }
  if (!expectPath.match(routeRegExp)) {
    throw Error(`Invalid route: ${expectPath}`);
  }
  if (!actualPath.match(pathRegExp)) {
    throw Error(`Invalid path: ${actualPath}`);
  }

  const expect: string[] = expectPath.split('/');
  const actual: string[] = actualPath.split('/');
  const params: any = {};

  if (expect.length > actual.length) {
    return null;
  }

  if (isExact && expect.length !== actual.length) {
    return null;
  }

  const isMatching = expect.every((expectFrag, idx) => {
    const actualFrag = actual[idx];

    if (expectFrag.startsWith(':')) {
      params[expectFrag.slice(1)] = actualFrag;
      return true;
    }

    return expectFrag === actualFrag;
  });

  if (!isMatching) {
    return null;
  }

  const handled = `/${actual.slice(0, expect.length).join('/')}`;
  const rest = `/${actual.slice(expect.length).join('/')}`;

  return { params, handled, rest };
}

export default class RouteSwitch extends VDom.Component<any, any, any, Router> {
  private toRender: VDom.VirtualElement | null;

  get contextType(): IContextType {
    return routerContextType;
  }

  constructor(props: any) {
    super(props);
    this.toRender = null;
    console.log('Switch!');
  }

  route(): void {
    const router = this.ctx.value;

    if (!this.children.every((child) => (
      child instanceof VDom.VirtualElement && child.type === Route
    ))) {
      throw Error('RouteSwitch have to contain only Route components');
    }

    const toRender = this.children.reduce((acc, cur): VDom.VirtualNode => {
      const child = cur as VDom.VirtualElement;
      const { to: path, exact: isExact } = child.props as RouteProps;

      const matchResult = match(path, router.unhandledPath, isExact);

      if (matchResult) {
        const { params, handled, rest } = matchResult;
        router.unhandledPath = rest;
        router.handledSwitchers.push({
          path: handled,
          switcher: this,
        });

        child.props.params = params;

        return child;
      }

      return acc;
    }, null);

    if (toRender) {
      this.toRender = toRender;
    }
  }

  render(): VDom.VirtualElement {
    const router = this.ctx.value;

    if (!router.contains(this)) {
      this.route();
    }

    if (!this.toRender) {
      throw Error('RouteSwitch no match');
    }

    return this.toRender;
  }
}
