import { Component } from '../VDom/all';
import Router from './Router';
import { zip } from '../VDom/util';

export default class RouteNavigator {
  handledSwitchers: {
    path: string;
    switcher: Component;
    params: object;
  }[];

  unhandledPath: string;

  router: Router;

  get params(): any {
    return zip(...this.handledSwitchers.map((item) => item.params));
  }

  constructor(router: Router) {
    this.handledSwitchers = [];
    this.unhandledPath = window.location.pathname;
    this.router = router;
  }

  start(): void {
    window.onpopstate = (e): void => {
      e.preventDefault();
      this.rerender(window.location.pathname);
    };
  }

  go(path: string): void {
    if (path === window.location.pathname) {
      window.history.replaceState(null, '', path);
    } else {
      window.history.pushState(null, '', path);
    }
    this.rerender(path);
  }

  contains(switcher: Component): boolean {
    return this.handledSwitchers.some((handled) => handled.switcher === switcher);
  }

  rerender(path: string): void {
    // let idx = 0;
    //
    // while (idx < this.handledSwitchers.length && path.startsWith(this.handledSwitchers[idx].path)) {
    //   path = path.slice(this.handledSwitchers[idx].path.length);
    //   idx += 1;
    // }
    //
    // const { switcher } = this.handledSwitchers[idx - 1];
    // this.unhandledPath = path;
    // this.handledSwitchers.length = idx - 1;
    // switcher.enqueueUpdate();

    this.unhandledPath = path;
    this.handledSwitchers.length = 0;
    this.router.enqueueUpdate();
  }
}
