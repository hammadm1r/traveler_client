import { createRoot } from 'react-dom/client'
import './index.css'
import * as ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import App from './App.jsx'
import { Provider } from 'react-redux'
import { BrowserRouter } from "react-router-dom";
import store from './Toolkit/store.js';
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById('root')).render(
  
  <BrowserRouter>
  <Provider store={store} >
  <Toaster position="top-center" reverseOrder={false} />
    <App />
    </Provider>
  </BrowserRouter>
);
