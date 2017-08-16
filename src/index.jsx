import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router'
import routes from './routes'
import AccountsStore from './stores/accounts_store'
import { Provider } from 'mobx-react'

const initialState = window.initialState || {
	accounts: []
}
var store = AccountsStore.fromJS(initialState.accounts)

ReactDOM.render((
	<Provider store={store}>
		<Router history={browserHistory} routes={routes()}>
		</Router>
	</Provider>
), document.querySelector('#root'))
