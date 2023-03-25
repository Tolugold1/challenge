import React from "react";
import { configureStore } from "./redux/configureStore";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./App.styles.scss";
import Main from "./Components/Main"

const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
          <Main />
      </BrowserRouter>
    </Provider>
  )
}

export default App;