import VDom from './modules/VDom';
// import App from './components/App/App';
import VirtualElement from './modules/VDom/VirtualElement';
import Component from './modules/VDom/Component';
import Ref from './modules/VDom/Ref';
import render from './modules/VDom/render';
import Player from './components/common/Player/Player';
import { PlayerClass, Track } from './modules/Media/player';

class Dummy extends Component {
  render = (): VirtualElement => (
    <div>
      <p>{this.props.data}</p>
    </div>
  );
}

class DummyParent extends Component {
  render = (): VirtualElement => {
    const children = this.children.map((child) => (
      <div class='child'>
        {child}
      </div>
    ));

    return (
      <div>
        {children}
      </div>
    );
  };
}

class DummyApp extends Component {
  constructor(props: any) {
    super(props);

    this.state = {
      counter: 0,
    };
  }

  handler = (e: Event) => console.log(e);

  render = (): VirtualElement => (
    <div onclick={(e: Event) => console.log(e)} style={{
      background: 'cyan',
    }}>
      <Dummy data='Counter:'/>
      <Dummy data={this.state.counter.toString()}/>
      <DummyParent>
        <p >first</p>
        <p>second</p>
        <p>third</p>
      </DummyParent>
      <Dummy data='footer'/>
    </div>
  );

  didMount(): void {
    setInterval(() => this.setState({ counter: this.state.counter + 1 }), 1000);
  }
}

// render(<DummyApp/>, document.getElementById('root')!);
const tracks = [{
  album: '',
  author: 'SomeAuthor',
  cover: '/assets/playlist-track-icon-dummy.png',
  src: '/assets/music.mp3',
  title: 'SomeTitle',

}, {
  album: '',
  author: 'SomeAuthorVEEEEEEEEEEEEEERYLONg',
  cover: '/assets/playlist-track-icon-dummy.png',
  src: '/assets/music.mp3',
  title: 'SomeTitleVEEEEEEEEEEEEEERYLONg',

}];


// const source = context.createMediaElementSource(audio);
// source.connect(analyser);
// analyser.connect(context.destination);

const audio = new Audio();

audio.src = '/assets/music.mp3';//this.currentTrack.src;
audio.controls = true;

const audioCtx = new AudioContext();
const source = audioCtx.createMediaElementSource(audio);
source.connect(audioCtx.destination);
audio.load();
document.getElementById('root').appendChild(audio);


//const player = new PlayerClass(tracks);

//render(<Player player={player} />, document.getElementById('root')!);
