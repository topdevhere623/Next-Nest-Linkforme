import thunk, {ThunkMiddleware} from "redux-thunk";
import {AnyAction, applyMiddleware, createStore} from "redux";
import {Context, createWrapper, MakeStore} from "next-redux-wrapper";
import {IStoreState, reducers} from "./reducers";
import {composeWithDevTools} from "redux-devtools-extension";

// Instantiating ThunkMiddleware object with the StoreState interface and AnyAction from Redux
const thunkMiddleware = thunk.withExtraArgument({}) as ThunkMiddleware<IStoreState, AnyAction>;

// create a makeStore function
// @ts-ignore
// This makeStore is needed for the wrapper, for every new page that is called, a new store with the current values will be created
const makeStore: MakeStore<IStoreState> = (context: Context) => createStore(reducers, composeWithDevTools(applyMiddleware(thunkMiddleware)));


// export an assembled wrapper
// this wrapper will be used to every page's component, for injecting the store and actions into it.
const wrapper = createWrapper<IStoreState | any>(makeStore, {debug: false});

export default wrapper;