import { createRoot } from 'react-dom/client'
import './index.css'
import * as ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
