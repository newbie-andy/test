import React, { Component } from 'react';
import config from './config.json';
import styles from './greeter.css';

// let greet = require('./config.json');   //这里不再需要json-loader因为其内部已经内置了，1.0的版本需要添加

// module.exports = function() {
//     let greeting = document.createElement('div');
//     greeting.textContent = greet.greetText;

//     return greeting;
// } 

class Greeter extends Component {
    render() {
        return (
            <div className={ styles.root }>
                { config.greetText + '-demo' }
            </div>
        )
    }
}

export default Greeter;