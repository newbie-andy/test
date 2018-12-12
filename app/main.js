// const greeting = require('./greeting.js');

// let app = document.getElementById('app');
// app.appendChild(greeting());
import React from 'react';
import { render } from "react-dom";
import Greeter from './greeting';
import './main.css';

render(<Greeter />, document.getElementById('app'))