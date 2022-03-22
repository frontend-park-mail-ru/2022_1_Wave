//import {createAsyncThunk} from "../Factory/thunk";
import HTTPClient from "../Client/Client";
import UserPaths from '../../config/User.js';
import { createStore} from "../Factory/store";
import {createLoggerMiddleware, createThunkMiddleware} from "../Factory/middleware";


const combineReducers = (reducers: object ) => {
    return (state, action) => {
        Object.entries(reducers)
            .map(([_, r]) =>{ r(state,action); });
        return state;
    }
}

const reducer1 = (state, action): object => {
    switch (action.type) {
        case "Inc":
            state.num++;
            break;
        case "Dec":
            state.num--;
            break;
    }
    return state;
};

const reducer2 = (state, action): object => {
    switch (action.type) {
        case "In":
            state.num++;
            break;
        case "De":
            state.num--;
            break;
    }
    return state;
};

const rootReducer = combineReducers({reducer1,reducer2})
const middleWares = [createLoggerMiddleware,createThunkMiddleware];
export  const store =  createStore(rootReducer,middleWares,{num:1});
