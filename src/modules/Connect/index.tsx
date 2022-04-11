import VDom from '../VDom';
import { IProps } from '../VDom/Interfaces';
import { IStore, Map } from '../Store/types';
import { Store } from '../Store/store';
import {ContextType, createContext, IContextType} from '../VDom/Context';

export const StoreContext = createContext<IStore>(null);

// eslint-disable-next-line no-unused-vars,max-len,import/prefer-default-export
export const connect = (mapStateToProps: Map, mapDispatchToProps:Map) => (WrappedComponent: (new (props:any) => VDom.Component)):void => {
  // eslint-disable-next-line no-unused-vars
  class Connect extends VDom.Component<any, any, any, Store> {
    static contextType = StoreContext;


    constructor(props: IProps) {
      super(props);
      this.state = null;
    }

    didMount(): void {
      this.state = this.context.getState();
      this.context.subscribe((state:any):void => {
        this.setState(state);
      });
    }

    render(): VDom.VirtualElement {
      const store = this.context;
      // this.state = store.getState();
      // this.ctx.value.subscribe((state:any):void => {
      //   console.log("state",state);
      //   this.setState(state);
      // });
      // console.log('context Connect: ', store);

      // eslint-disable-next-line max-len
      // return VDom.createElement(WrappedComponent, { ...this.props, ...mapStateToProps(this.state), ...mapDispatchToProps(store.dispatch) });
      return (
        <WrappedComponent
          { ...this.props}
          {...mapStateToProps(store.getState())}
          {...store ? mapDispatchToProps(store.dispatch) : null}
        />
      );
    }
  }
  return Connect;
};
