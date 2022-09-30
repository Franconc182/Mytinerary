import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux';
import {configureStore as createStore} from "@reduxjs/toolkit";
import mainReducer from "./redux/reducers/mainReducer"
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const reduxStore= createStore({reducer:mainReducer})
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={reduxStore}> 
  <BrowserRouter>
    <App />
    <ToastContainer />
  </BrowserRouter>
  </Provider>
);