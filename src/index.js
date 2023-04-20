import React from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.min.css"
import App from './App';
import './index.styles.scss'
import { Provider } from 'react-redux';
import { ConfigureStore } from "./redux/configureStore"

const store = ConfigureStore()

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)