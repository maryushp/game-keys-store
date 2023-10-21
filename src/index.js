import React from 'react';
import ReactDOM, {createRoot} from 'react-dom/client';
import {BrowserRouter as Router} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import './styles/index.css';

const root = document.getElementById('root');
const rootReact = createRoot(root);
rootReact.render(
    <Router>
        <App/>
    </Router>
);