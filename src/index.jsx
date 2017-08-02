import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router'

import GuestStore from './stores/GuestStore'
import routes from './routes'

const initialState = window.initialState || {
	guests:[]
}
var store = GuestStore.fromJS(initialState.guests)

ReactDOM.render((
	<Router history={browserHistory} routes={routes(store)}>
	</Router>
), document.querySelector('#root'))
