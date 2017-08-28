import React from 'react'
import { inject, observer } from 'mobx-react'
import { Header, Segment, Form, Button, Message } from 'semantic-ui-react'
import CSSModules from 'react-css-modules'
import styles from './register.css'
import { Link } from 'react-router'

@CSSModules(styles) @inject('userStore', 'formStore') @observer
export default class Register extends React.Component {

	onSubmit = () => {
		const { formStore } = this.props
		this.props.userStore.registerUser(formStore.getField('email').value, formStore.getField('password').value)
	}

	componentDidMount () {
		this.props.formStore.initializeFromNames([ 'email', 'password', 'passwordConfirm' ])
	}

	render() {
		const { formStore } = this.props
		
		return (
			<div className={styles.centered}>
				<div className={styles.container} textAlign="center">
					<Header as="h2">
						Register
					</Header>
					<Form size='large'>
						<Segment stacked>
							<Form.Input
								className={styles.labelLeft}
								value={formStore.getField('email').value}
								onChange={(e, { value }) => formStore.changeField('email', value)}
								fluid
								label="E-mail address"
								icon='user'
								iconPosition='left'
								placeholder='E-mail address'
							/>
							<Form.Input
								className={styles.labelLeft}
								value={formStore.getField('password').value}
								onChange={(e, { value }) => formStore.changeField('password', value)}
								fluid
								label="Password"
								icon='lock'
								iconPosition='left'
								placeholder='Password'
								type='password'
							/>
							<Form.Input
								className={styles.labelLeft}
								value={formStore.getField('passwordConfirm').value}
								onChange={(e, { value }) => formStore.changeField('passwordConfirm', value)}
								fluid
								label="Confirm password"
								icon='lock'
								iconPosition='left'
								placeholder='Repeat password'
								type='password'
							/>

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
