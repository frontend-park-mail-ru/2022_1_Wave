import VDom from './modules/VDom';
// import App from './components/App/App';
import VirtualElement from './modules/VDom/VirtualElement';
import Component from './modules/VDom/Component';
import Ref from './modules/VDom/Ref';
import render from './modules/VDom/render';
import Player from './components/Page/Player/Player';
import { PlayerClass, Track } from './modules/Media/player';
import Sidebar from "./components/Sidebar/Sidebar";
import Homepage from "./components/Homepage/Homepage";
import Page from "./components/Page/Page";
import LoginPage from "./components/LoginPage/LoginPage";
import ArtistPage from "./components/ArtistPage/ArtistPage";
import PersonalPage from "./components/PersonalPage/PersonalPage";
import VDom from './modules/VDom';
import { Context, ContextType, IContext, IContextType } from './modules/VDom/Context';
// import App from './components/App/App';

class Dummy extends VDom.Component {
  render = (): VDom.VirtualElement => (
    <div>
      <p>{this.props.data}</p>
    </div>
  );
}

function f(tag: JSX.IntrinsicElements): void {
  console.log(tag);
}

console.log(f);

const dummyContextType = new ContextType<string>('dummy', 'default dummy');
const dummyContext = new Context(dummyContextType, 'first dummy');

class DummyParent extends VDom.Component {
  render = (): VDom.VirtualElement => {
    const children = this.children.map((child) => (
      <div key={(child as VDom.VirtualElement).key} class='child'>
        {child}
      </div>
    ));

    return (
      <div>
        <div>
          {children}
        </div>
      </div>
    );
  };
}

class DummyApp extends VDom.Component {
  constructor(props: any) {
    super(props);

    this.state = {
      counter: 0,
    };

    this.items = [];
  }

  produceContext(): IContext | null {
    return dummyContext;
  }

  handler = (e: Event): void => console.log(e);

  items: number[];

  render = (): VDom.VirtualElement => {
    const elements = this.items
      .map((item) => (
        <p onclick={(e: any): void => console.log(e)} key={item.toString()}>{item.toString()}</p>
      ));

    return (
      <div style={{
        background: 'cyan',
      }}>
        <Dummy data='Counter:'/>
        <Dummy data={this.state.counter.toString()}/>
        <DummyParent>
          {elements}
        </DummyParent>
        <Dummy data='footer'/>
      </div>
    );
  };

  didMount(): void {
    setInterval(() => {
      this.items.unshift(this.state.counter);
      this.setState({ counter: this.state.counter + 1 });
    }, 1000);
  }
}

VDom.render(<DummyApp/>, document.getElementById('root')!);

// User.getCSRFToken()
//   .then(() => {
//     const root = document.querySelector('#root');
//     const app = new App();
//     app.mount(root);
//   });

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

const player = new PlayerClass(tracks);

//render(<Player player={player} />, document.getElementById('root')!);
//render(<Page isAuthorized={false} content={<Homepage isAuthorized={false}/>}/>, document.getElementById('root')!);
//render(<LoginPage/>, document.getElementById('root')!);
//render(<Page isAuthorized={false} content={<ArtistPage />}/>, document.getElementById('root')!);
//render(<Page isAuthorized={true} content={<Homepage isAuthorized={true}/>}/>, document.getElementById('root')!);
render(<Page isAuthorized={false} content={<PersonalPage />}/>, document.getElementById('root')!);
