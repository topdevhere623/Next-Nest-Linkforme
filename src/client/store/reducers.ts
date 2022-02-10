import {combineReducers} from "redux";
import {factory} from "./factory/reducers";
import IFactoryState from "./factory";

export interface IStoreState {
    factory: IFactoryState;
    dispatch?: any;
}

export const reducers = combineReducers( {
   factory: factory
});