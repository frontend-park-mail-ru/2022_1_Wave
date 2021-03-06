import VDom from '@rflban/vdom';
import '../../../../index.css';
import './Navigation.scss';

export default class Navigation extends VDom.Component<any> {
  render = (): VDom.VirtualElement => (
    <div onclick={this.props.clickHandler} class="nav-block">
      <div class="nav-block__icon__wrapper">
        <div class="fa-brands fa-itunes-note icon__wrapper__icon-fa"></div>
        <div class="icon__wrapper__icon-default"></div>
      </div>
      <p class="text nav-block__navigation-text">{this.props.title}</p>
    </div>
  );
}
