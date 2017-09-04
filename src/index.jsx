import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router'
import routes from './routes'
import AccountsStore from './stores/accounts_store'
import UserStore from './stores/user_store.js'
import FormStore from './stores/form_store.js'
import { Provider } from 'mobx-react'
import 'semantic-ui-css/semantic.min.css'

const initialState = window.initialState || {
	accounts: []
}
const accountsStore = AccountsStore.fromJS(initialState.accounts)
const userStore = new UserStore()
const formStore = new FormStore()

ReactDOM.render((
	<Provider accountsStore={accountsStore} userStore={userStore} formStore={formStore}>
		<Router history={browserHistory} routes={routes()}>
		</Router>
	</Provider>
), document.querySelector('#root'))
