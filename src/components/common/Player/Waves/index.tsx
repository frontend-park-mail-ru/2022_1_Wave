import './style.scss'
import VDom from "@rflban/vdom";
import {IComponentPropsCommon} from "@rflban/vdom/dist/IComponentProps";


interface wavesProps extends IComponentPropsCommon{
    analyser: AnalyserNode;
    audio: HTMLAudioElement;

}

export default class Waves extends VDom.Component<wavesProps> {


  state = {
    freqArray: [],
    waveHeights: [0, 0, 0, 0],
  }

  didMount():void {
    if(!this.props.analyser || !this.props.audio) return;

    this.props.audio.addEventListener('timeupdate',this.updateWaveFront);
    const freqArray: Uint8Array = new Uint8Array(this.props.analyser.frequencyBinCount);
    this.setState({freqArray});
  }

  willUmount():void {
    this.props.audio.removeEventListener('timeupdate',this.updateWaveFront);
  }

  updateWaveFront = (): void => {
    const currFreq: Uint8Array = this.state.freqArray as unknown as Uint8Array;
    if (!currFreq || currFreq.length === 0) {
      return;
    }
    this.props.analyser.getByteFrequencyData(currFreq);
    const barsHeight: Array<number> = [0, 0, 0, 0];
    const hzStep: number = 24;
    const lowFreq: Array<number> = [0, 700];
    const midFreq: Array<number> = [1000, 2500];
    const midUpFreq: Array<number> = [4000, 6000];
    const highFreq: Array<number> = [7000, 9000];
    const freqRanges: Array<Array<number>> = [lowFreq, midFreq, midUpFreq, highFreq];

    for (let i = 0; i < barsHeight.length; i += 1) {
      const range = freqRanges[i];
      const leftBorder = Math.round(range[0] / hzStep);
      const rightBorder = Math.round(range[1] / hzStep);
      let sum = 0;
      let elNums = 0;
      currFreq.slice(leftBorder, rightBorder).forEach((val: number): void => {
        sum += val;
        elNums += 1;
      });
      const interpolated = sum / elNums;
      barsHeight[i] = (interpolated / 256) * 100 / (4 - i) * (5 + 0.1 * i) + (Math.random() - 0.5) * 20;
      barsHeight[i] = barsHeight[i] > 0 ? barsHeight[i] : 0;
    }
    this.setState({freqArray: currFreq, waveHeights: barsHeight});
  }

  render = (): VDom.VirtualElement  =>
    <div class="player__waves">
      <div class="bar" id="1" style={{height: `calc(${this.state.waveHeights[0]}% + 2px)`}}/>
      <div class="bar" id="2" style={{height: `calc(${this.state.waveHeights[1]}% + 2px)`}}/>
      <div class="bar" id="3" style={{height: `calc(${this.state.waveHeights[2]}% + 2px)`}}/>
      <div class="bar" id="4" style={{height: `calc(${this.state.waveHeights[3]}% + 2px)`}}/>
    </div>
}