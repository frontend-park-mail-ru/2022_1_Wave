export interface Map {
    [key: string]: any
}

export interface IStore {
    getState():Map;
    // eslint-disable-next-line no-unused-vars
    subscribe(listener: ()=> void):void;
    // eslint-disable-next-line no-unused-vars
    dispatch(action:Function):void;
}
