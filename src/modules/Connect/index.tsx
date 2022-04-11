import VDom from '../VDom';
import { IProps } from '../VDom/Interfaces';
import { IStore, Map } from '../Store/types';
import { Store } from '../Store/store';
import { ContextType, IContextType } from '../VDom/Context';

export const storeContextType = new ContextType<IStore>('store', null);

// eslint-disable-next-line no-unused-vars,max-len,import/prefer-default-export
export const connect = (mapStateToProps: Function[], mapDispatchToProps:Function[]) => (WrappedComponent: (new (props:any) => VDom.Component)) => {
  // eslint-disable-next-line no-unused-vars
  class Connect extends VDom.Component<any, any, any, Store> {
    get contextType(): IContextType {
      return storeContextType;
    }

    constructor(props: IProps) {
      super(props);
      this.state = null;
    }

    didMount(): void {
      this.state = this.ctx.value.getState();
      this.ctx.value.subscribe((state:any):void => {
        this.setState(state);
      });
    }

    render(): VDom.VirtualElement {
      const store = this.ctx.value;
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
