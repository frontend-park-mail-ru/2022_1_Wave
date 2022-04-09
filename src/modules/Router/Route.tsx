import VDom from '../VDom';

export default class Route extends VDom.Component {
  render(): VDom.VirtualElement {
    if (this.children.length !== 1) {
      throw Error('Route component have to contain only 1 child');
    }

    const child = this.children[0];

    if (!(child instanceof VDom.VirtualElement)) {
      throw Error('Route component have to be instance of VDom.VirtualElement');
    }

    child.props.params = this.props.params;

    return child;
  }
}
