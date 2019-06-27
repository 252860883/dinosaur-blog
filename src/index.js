import React from 'react';
import ReactDOM from 'react-dom';
import './style/common.scss'
import { TransitionGroup, CSSTransition } from "react-transition-group";
// 引入路由
import Root from './router/index';

import registerServiceWorker from './registerServiceWorker';

// redux
import { Provider } from 'react-redux'

import { createStore } from 'redux'
import todoApp from './redux/reducers.js'

let store = createStore(todoApp)

//这里是出口文件 
ReactDOM.render(
    <Root />
    , document.getElementById('root'));
registerServiceWorker();






