import { Component } from '../VDom/all';

export default class Router {
  handledSwitchers: {
    path: string,
    switcher: Component,
  }[];

  unhandledPath: string;

  constructor() {
    this.handledSwitchers = [];
    this.unhandledPath = window.location.pathname;
    if (this.unhandledPath === '/') {
      this.unhandledPath = '';
    }

    window.history.onpopstate = (): void => this.rerender();
  }

  go(path: string): void {
    if (path === window.location.pathname) {
      window.history.replaceState(null, '', path);
    } else {
      window.history.pushState(null, '', path);
    }
  }

  contains(switcher: Component): boolean {
    return this.handledSwitchers.some((handled) => handled.switcher === switcher);
  }

  rerender(): void {
    const path = this.location.pathname;

    let commonFrags = '';
    let commonLen = 0;
    let idx = 0;

    while (idx < this.handledSwitchers.length && path.startsWith(commonFrags)) {
      commonLen += commonFrags.length;
      commonFrags += this.handledSwitchers[idx].path;
      idx += 1;
    }

    this.unhandledPath = path.slice(commonLen);
    this.handledSwitchers.length = idx;
    this.handledSwitchers[idx - 1].switcher.route();
    this.handledSwitchers[idx - 1].switcher.setState(this.handledSwitchers[idx - 1].switcher.state);
  }
}
