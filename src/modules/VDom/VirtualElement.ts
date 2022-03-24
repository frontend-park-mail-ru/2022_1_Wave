
export default class VirtualElement {
  public readonly type: string;

  public readonly props: any;

  public readonly key: string | undefined;

  public readonly children: Array<VirtualElement | string>;

  constructor(type: string, props: any, children: Array<VirtualElement | string>, key?: string) {
    this.type = type;
    this.props = props;
    this.key = key;
    this.children = [...children];
  }
}
