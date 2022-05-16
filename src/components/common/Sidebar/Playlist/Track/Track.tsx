import './Track.scss';
import VDom from '@rflban/vdom';

export default class Track extends VDom.Component {
  render = (): VDom.VirtualElement => (
    <div onclick={this.props.clickHandler} ontouchend={this.props.clickHandler} class={`track-block ${this.props.highlight}`}>
      <p class="text track-block__number">{this.props.order.toString().padStart(2, '0')}</p>
      <img class="track-block__icon" src={this.props.cover} />
      <div class="track-block__track-info">
        <p class="text track-info__title ">{this.props.title}</p>
        <p class="text track-info__artist">{this.props.artist}</p>
      </div>
    </div>
  );
}
