import React from 'react'
import {Route, IndexRoute} from 'react-router'

import App from './components/application'
import Accounts from './components/accounts'

const routes = () => {
	return (
		<Route path="/" component={App}>
			<IndexRoute component={Accounts}/>
		</Route>
	)
}

export default routes
