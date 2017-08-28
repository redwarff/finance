import React from 'react'
import { Header, Segment, Form, Button, Message } from 'semantic-ui-react'
import CSSModules from 'react-css-modules'
import styles from './login.css'
import { Link } from 'react-router'

@CSSModules(styles)
export default class Login extends React.Component {
	
	render() {
		
		return (
			<div className={styles.centered}>
				<div className={styles.container} textAlign="center">
					<Header as="h2">
						Log in
					</Header>
					<Form size='large'>
						<Segment stacked>
							<Form.Input
								fluid
								icon='user'
								iconPosition='left'
								placeholder='E-mail address'
							/>
							<Form.Input
								fluid
								icon='lock'
								iconPosition='left'
								placeholder='Password'
								type='password'
							/>

							<Button color='teal' fluid size='large' type="submit" onClick={() => console.log('lgging')}>Login</Button>
						</Segment>
					</Form>
					<Message>
						New to us? <Link to="/register"> Sign Up </Link>
					</Message>
				</div>
			</div>
		)
	}
}
