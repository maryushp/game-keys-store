import React from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter as Router} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import './styles/index.css';
import FetchInterceptors from "./utils/InterceptorsConfig";

const root = document.getElementById('root');
const rootReact = createRoot(root);
const interceptors = new FetchInterceptors();
rootReact.render(
    <Router>
        <App/>
    </Router>
);