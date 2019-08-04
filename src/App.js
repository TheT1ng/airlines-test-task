import React from "react";
import "./index.scss";
import { Provider } from "react-redux";
import store from "./store/configureStore";
import MainScreen from "./containers/MainScreen";

function App() {
  return (
    <Provider store={store()}>
      <MainScreen />
    </Provider>
  );
}

export default App;
