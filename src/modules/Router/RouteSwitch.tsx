import VDom from '../VDom';
import Route from './Route';
import { Context, ContextType, IContext, IContextType } from '../VDom/Context';

const routeRegExp = /^(?:\/:?[\w_~.-]+)*$/;
const pathRegExp = /^(?:\/[\w_~.-]+)*$/;

type RouteProps = {
  to: string,
  exact: boolean,
}

class Router {
  #workingPath: string;

  handledPaths: string[];

  unhandledPath: string;

  get workingPath(): string {
    return this.#workingPath;
  }

  constructor() {
    this.#workingPath = '';
    this.handledPaths = [];
    this.unhandledPath = window.location.pathname;
  }
}

const routerContextType = new ContextType<Router | null>('router', null);

function match(expectPath: string, actualPath: string, isExact: boolean):
  { params: any, rest: string } | null {
  if (!expectPath.match(routeRegExp)) {
    throw Error(`Invalid route: ${expectPath}`);
  }
  if (!actualPath.match(pathRegExp)) {
    throw Error(`Invalid path: ${actualPath}`);
  }

  const expect: string[] = expectPath.split('/');
  const actual: string[] = actualPath.split('/');
  const rest = `/${actual.slice(expect.length).join('/')}`;
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

  return { params, rest };
}

// class Parent extends VDom.Component {
//   produceContext(): IContext {
//     return new Context(routerContextType, new Router());
//   }
// }

export default class RouteSwitch extends VDom.Component<any, any, any, Router> {
  get contextType(): IContextType {
    return routerContextType;
  }

  render(): VDom.VirtualElement {
    const router = this.ctx.value;

    for (const child of this.children) {
      if (child instanceof VDom.VirtualElement && child.type === Route) {
        const { to: path, exact: isExact } = child.props as RouteProps;

        const matchResult = match(path, router.unhandledPath, isExact);

        if (matchResult) {
          const { params, rest } = matchResult;
          router.unhandledPath = rest;

          child.props.params = params;

          return child;
        }
      } else {
        throw Error('RouteSwitch have to contain only Route components');
      }
    }

    throw Error('RouteSwitch no match');
  }
}
