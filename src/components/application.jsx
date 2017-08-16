import CSSModules from 'react-css-modules'
import { container, jumbotron, buttons } from 'bootstrap-css'
import React from 'react'
import DevTool from 'mobx-react-devtools'
import { observer, inject } from 'mobx-react'

import NavigationBar from './navigation_bar'

import styles from './application.css'
Object.assign(styles, jumbotron, container, buttons)

@inject('store') @observer
class App extends React.Component {
	
	componentDidMount = () => {
		const { store } = this.props
		store.getAccounts()
	}

	render() {
		
		return (
			<div className={styles.container}>
				<DevTool/>
				<NavigationBar/>
				<div className={styles.appHeading}>
					<h1>An App</h1>
					{this.props.children}
				</div>

			</div>
		)
	}
}

export default CSSModules(App, styles)
