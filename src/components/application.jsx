import React from 'react'
import DevTool from 'mobx-react-devtools'
import { observer, inject } from 'mobx-react'
import { Container, Header, Segment } from 'semantic-ui-react'
import CSSModules from 'react-css-modules'

import NavigationBar from './navigation_bar'
import styles from './application.css'

@CSSModules(styles) @observer
export default class App extends React.Component {

	render() {
		
		return (
			<Container fluid>
				<DevTool />
				<Container textAlign="center">
					<NavigationBar /> 
					<Segment.Group>
						<Segment className={styles.headerContainer}>
							<Header as="h1" textAlign="center" className={styles.header}>
								An app
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
