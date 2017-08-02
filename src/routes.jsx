import React from 'react'
import {Route, IndexRoute} from 'react-router'

import App from './components/App'
import About from './components/About'
import Guests from './components/Guests'

const routes = (store) => {
	return (
		<Route path="/" component={App} guestStore={store}>
			<IndexRoute component={About}/>
			<Route path="guests" component={Guests} guestStore={store}/>
		</Route>
	)
}

export default routes
