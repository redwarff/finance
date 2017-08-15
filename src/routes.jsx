import React from 'react'
import {Route, IndexRoute} from 'react-router'

import App from './components/application'
import About from './components/About'
import Accounts from './components/accounts'

const routes = (store) => {
	return (
		<Route path="/" component={App} accountsStore={store}>
			<IndexRoute component={About}/>
			<Route path="accounts" component={Accounts} accountsStore={store}/>
		</Route>
	)
}

export default routes
