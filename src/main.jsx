import App from "../App";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import {applyMiddleware, compose, legacy_createStore as createStore } from "redux";
import thunk from 'redux-thunk';
import rootReducer from "./services/reducers";

const container = document.getElementById("root");
const root = createRoot(container);

const composeAlt = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const composedEnhancers = composeAlt(applyMiddleware(thunk));

const store = createStore(rootReducer, composedEnhancers);

root.render(
  <Provider store={store}>
    <App tab="home" />
  </Provider>
);
