import Component from '../../../../modules/VDom/Component';
import VDom from '../../../../modules/VDom';
import VirtualElement from '../../../../modules/VDom/VirtualElement';
import '../../../../index.css';
import './Navigation.scss';

import { IProps } from '../../../../modules/VDom/Interfaces';

export default class Navigation extends Component {
  constructor(props: IProps) {
    super(props);
    this.state = {
      title: '',
    };
  }

  didMount(): void {
    const { title } = this.props;
    console.log("Navigator:",title);
    this.setState({ title });
  }

  render = (): VirtualElement => (
    <div class="nav-block">
      <div class="nav-block__icon__wrapper">
        <div class="fa-brands fa-itunes-note icon__wrapper__icon-fa"></div>
        <div class="icon__wrapper__icon-default"></div>
      </div>
      <p class="text nav-block__navigation-text">
        {this.state.title}
      </p>
    </div>
  );
}
