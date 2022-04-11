// eslint-disable-next-line max-classes-per-file
import VDom from './modules/VDom';
import { createContext } from './modules/VDom/Context';
import Router from './modules/Router/Router';
import Route from './modules/Router/Route';
import RouteSwitch from './modules/Router/RouteSwitch';
import Ref from './modules/VDom/Ref';
import Link from './modules/Router/Link';
// import App from './components/App/App';

const MyContext = createContext<number>(15);

class DudeChild extends VDom.Component {
  render = (): VDom.VirtualElement => {
    // console.log(this.children);
    return (
      <div>
        {this.children}
      </div>
    );
  };
}

class AnotherDudeChild extends VDom.Component {
  static contextType = MyContext;

  constructor(props: any) {
    super(props);

    console.log(this.context);
  }

  render = (): VDom.VirtualElement => {
    // console.log(this.children);
    return (
      <p>
        <p>{this.context}</p>
        {this.children}
      </p>
    );
  };
}

class Dude extends VDom.Component {
  pRef: Ref;

  items: number[] = [];

  constructor(props: any) {
    super(props);

    this.state = {
      counter: 0,
    };

    this.pRef = new Ref();
  }

  didMount(): void {
    // setInterval(() => {
    //   this.items.unshift(this.state.counter);
    //   if (this.items.length > 10) {
    //     this.items.pop();
    //   }
    //   this.setState({ counter: this.state.counter + 1 });
    //   // console.log(this.pRef.instance);
    //   // console.log(this.state.counter);
    // }, 1000);
  }

  render = (): VDom.VirtualElement => {
    let dudeChild = (
      <DudeChild>
        <p>I am DudeChild!</p>
        some text
      </DudeChild>
    );
    let child = (
      <p>man</p>
    );

    if (this.state.counter % 2 === 0) {
      dudeChild = (
        <AnotherDudeChild>
          I am AnotherDudeChild!
        </AnotherDudeChild>
      );
      child = (
        <div>boy</div>
      );
    }

    const itemsComps = this.items.map((item) => <p key={item.toString()}>{item}</p>);

    return (
      <Router>
        <MyContext.Provider value={8}>
          <RouteSwitch>
            <Route to="" exact>
              <div>home</div>
              <Link to="/about">go about</Link>
            </Route>
            <Route to="/about">
              <div>about</div>
              <Link to='/'>go home</Link>
              <div>
                <RouteSwitch>
                  <Route to="/some">
                    <Link to='/about/nothing'>go nothing</Link>
                  </Route>
                  <Route to="/nothing">
                    <div>about</div>
                    <Link to='/about/some'>go some</Link>
                  </Route>
                  <Route to="">
                  </Route>
                </RouteSwitch>
              </div>
            </Route>
          </RouteSwitch>
          <div>
            hi
            {dudeChild}
            <VDom.Fragment>
              {child}
              <p>who r u</p>
              <VDom.Fragment>
                <p ref={this.pRef}>i am u</p>
                <p>duuude</p>
              </VDom.Fragment>
            </VDom.Fragment>
            <p>{this.state.counter}</p>
            <div>
              {itemsComps}
            </div>
          </div>
        </MyContext.Provider>
      </Router>
    );
  };
}

VDom.render(<Dude/>, document.getElementById('root')!);

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

  handler = (e: Event): void => console.log(e);

  items: number[];

  render = (): VDom.VirtualElement => {
    const elements = this.items
      .map((item) => (
        <p onclick={(e: any): void => console.log(e)} key={item.toString()}>{item.toString()}</p>
      ));
    // const elements = this.items
    //   .map((item) => (
    //     <p onclick={(e: any): void => console.log(e)} key={item.toString()}>{item.toString()}</p>
    //   ));

    // <RouteSwitch>
    //   <Route exact to="">
    //     <div>home</div>
    //   </Route>
    //   <Route exact to="/about">
    //     <div>about</div>
    //   </Route>
    // </RouteSwitch>
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

// VDom.render(<DummyApp/>, document.getElementById('root')!);

// User.getCSRFToken()
//   .then(() => {
//     const root = document.querySelector('#root');
//     const app = new App();
//     app.mount(root);
//   });
