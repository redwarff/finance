import React from 'react'
import {Route, IndexRoute} from 'react-router'

import App from './components/application'
import Accounts from './components/accounts'
import Login from './components/login'
import Register from './components/register'

const routes = () => {
	return (
		<Route path="/" component={App}>
			<IndexRoute component={Accounts}/>
			<Route path="/login" component={Login} />
			<Route path="/register" component={Register} />
		</Route>
	)
}

export default routes
