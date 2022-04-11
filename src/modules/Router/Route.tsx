import VDom from '../VDom';

export default class Route extends VDom.Component {
  render(): VDom.VirtualElement {
    return (
      <VDom.Fragment>
        {this.props.children}
      </VDom.Fragment>
    );
  }
}
