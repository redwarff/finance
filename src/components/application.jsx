import React from 'react'
import DevTool from 'mobx-react-devtools'
import { observer, inject } from 'mobx-react'
import { Container, Header, Segment } from 'semantic-ui-react'
import CSSModules from 'react-css-modules'

import NavigationBar from './navigation_bar'
import styles from './application.css'

@CSSModules(styles) @inject('store') @observer
export default class App extends React.Component {
	
	componentDidMount = () => {
		const { store } = this.props
		store.getAccounts()
	}

	render() {
		
		return (
			<Container fluid>
				<DevTool />
				<Container textAlign="center">
					<NavigationBar /> 
					<Segment.Group>
						<Segment className={styles.headerContainer}>
							<Header as="h1" textAlign="center" className={styles.header}>
								An App
							</Header>
						</Segment>
						<Segment>
							{this.props.children}
						</Segment>
					</Segment.Group>
				</Container>
			</Container>
		)
	}
}
