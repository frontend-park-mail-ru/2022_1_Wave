// eslint-disable-next-line max-classes-per-file
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

  didUpdate(): void {
    console.log(this.ctx.value);
  }

  get contextType(): IContextType | null {
    return dummyContextType;
  }
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
