import React from 'react'
import { Header, Segment, Form, Button, Message } from 'semantic-ui-react'
import CSSModules from 'react-css-modules'
import styles from './login.css'
import { Link, withRouter } from 'react-router'
import { observer, inject } from 'mobx-react'

@withRouter @CSSModules(styles) @inject('userStore', 'formStore') @observer
export default class Login extends React.Component {
	
	onSubmit = () => {
		const { formStore, userStore, router } = this.props
		userStore.loginUser(formStore.getField('email').value, formStore.getField('password').value)
			.then(body => !body.errors && router.push('/'))
	}

	componentDidMount () {
		this.props.formStore.initializeFromNames([ 'email', 'password' ])
		this.props.userStore.resetErrors()
	}

	render() {
		const { userStore, formStore } = this.props
		
		return (
			<div className={styles.centered}>
				<div className={styles.container} textAlign="center">
					<Header as="h2">
						Log in
					</Header>
					<Form size='large' error={userStore.validationErrors.login}>
						<Segment stacked>
							<Form.Input
								value={formStore.getField('email').value}
								onChange={(e, { value }) => formStore.changeField('email', value)}
								fluid
								icon='user'
								iconPosition='left'
								placeholder='E-mail address'
							/>
							<Form.Input
								value={formStore.getField('password').value}
								onChange={(e, { value }) => formStore.changeField('password', value)}
								fluid
								icon='lock'
								iconPosition='left'
								placeholder='Password'
								type='password'
							/>
							{userStore.validationErrors.login &&
								<Message error>
									{userStore.validationErrors.login}
								</Message>
							}

							<Button color='teal' fluid size='large' type="submit" onClick={this.onSubmit}>Login</Button>
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
