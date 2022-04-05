import VDom from '../VDom';
import Route from './Route';
import { ContextType, IContextType } from '../VDom/Context';

const pathRegExp = /^\/?(?::?[\w_~.-])+(?\/)$/;

type RouteProps = {
  to: string,
  exact: boolean,
}

class Router {
  #workingPath: string;

  get workingPath(): string {
    return this.#workingPath;
  }

  constructor() {
    this.#workingPath = '';
  }
}

const routerContextType = new ContextType<Router | null>('router', null);

function match(expectPath: string, actualPath: string, isExact: bool): bool {
  const expect: string[] = expectPath.split('/');
  const actual: string[] = actualPath.split('/');

  if (expect.length > actual.length) {
    return false;
  }

  if (isExact && expect.length !== actual.length) {
    return false;
  }

  expect.forEach((expectFrag, idx) => {
    const actualFrag = actual[idx];
  });

  return true;
}

export default class RouteSwitch extends VDom.Component<any, any, any, Router> {
  get contextType(): IContextType {
    return routerContextType;
  }

  render(): VDom.VirtualElement {
    const router = this.ctx.value;

    for (const child of this.children) {
      if (child instanceof VDom.VirtualElement && child.type === Route) {
        const { to: path, exact: isExact } = child.props as RouteProps;
      } else {
        throw Error('RouteSwitch have to contain only Route components');
      }
    }

    throw Error('RouteSwitch no match');
  }
}
