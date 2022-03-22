
export default class VirtualElement {
  public readonly type: string;

  public readonly props: any;

  public readonly key: string | null;

  public readonly children: Array<VirtualElement | string>;

  constructor(type: string, children: Array<VirtualElement | string>, key?: string) {
    this.type = type;
    this.props = {};
    this.key = key ?? null;
    this.children = [...children];
  }
}
