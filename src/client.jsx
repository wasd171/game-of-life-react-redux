import React from 'react'
import {render} from 'react-dom'
import TapPlugin from 'react-tap-event-plugin'
TapPlugin();

import normalize from 'normalize.css'

import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import rootReducer  from './reducers/index'
import App from './components/App.jsx'

let store = applyMiddleware(thunk)(createStore)(rootReducer);

render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.querySelector('#react-app')
);