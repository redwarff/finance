import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router'
import routes from './routes'
import AccountsStore from './stores/accounts_store'

const initialState = window.initialState || {
	guests:[]
}
var store = AccountsStore.fromJS(initialState.guests)

ReactDOM.render((
	<Router history={browserHistory} routes={routes(store)}>
	</Router>
), document.querySelector('#root'))
