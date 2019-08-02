import React from "react";
import "./index.scss";
import { Provider } from "react-redux";
import store from "./store/configureStore";

function App() {
  return (
    <Provider store={store()}>
      <p>asdasdasd</p>
    </Provider>
  );
}

export default App;
