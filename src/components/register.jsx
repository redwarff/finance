import React from 'react'
import { inject, observer } from 'mobx-react'
import { Header, Segment, Form, Button, Label } from 'semantic-ui-react'
import CSSModules from 'react-css-modules'
import styles from './register.css'
import { withRouter } from 'react-router'

@withRouter @CSSModules(styles) @inject('userStore', 'formStore') @observer
export default class Register extends React.Component {

	onSubmit = () => {
		const { formStore, userStore, router } = this.props
		userStore.registerUser(formStore.getField('email').value, formStore.getField('password').value, formStore.getField('passwordConfirm').value)
			.then(body => !body.errors && router.push('/'))
	}

	componentDidMount () {
		this.props.formStore.initializeFromNames([ 'email', 'password', 'passwordConfirm' ])
	}

	render() {
		const { formStore, userStore } = this.props
		
		return (
			<div className={styles.centered}>
				<div className={styles.container} textAlign="center">
					<Header as="h2">
						Register
					</Header>
					<Form size='large'>
						<Segment stacked textAlign="left">
							<Form.Input
								value={formStore.getField('email').value}
								onChange={(e, { value }) => formStore.changeField('email', value)}
								fluid
								label="E-mail address"
								icon='user'
								iconPosition='left'
								placeholder='E-mail address'
								error={userStore.validationErrors.email}
							/>
							{userStore.validationErrors.email && 
								<Label basic color="red" pointing className={styles.label}>
									{userStore.validationErrors.email.msg}
								</Label>
							}
							<Form.Input
								value={formStore.getField('password').value}
								onChange={(e, { value }) => formStore.changeField('password', value)}
								fluid
								label="Password"
								icon='lock'
								iconPosition='left'
								placeholder='Password'
								type='password'
								error={userStore.validationErrors.password}
							/>
							{userStore.validationErrors.password && 
								<Label basic color="red" pointing className={styles.label}>
									{userStore.validationErrors.password.msg}
								</Label>
							}
							<Form.Input
								value={formStore.getField('passwordConfirm').value}
								onChange={(e, { value }) => formStore.changeField('passwordConfirm', value)}
								fluid
								label="Confirm password"
								icon='lock'
								iconPosition='left'
								placeholder='Repeat password'
								type='password'
								error={userStore.validationErrors.passwordConfirm}
							/>
							{userStore.validationErrors.passwordConfirm && 
								<Label basic color="red" pointing className={styles.label}>
									{userStore.validationErrors.passwordConfirm.msg}
								</Label>
							}

							<Button color='teal' fluid size='large' type="submit" onClick={this.onSubmit}>Register</Button>
						</Segment>
					</Form>
				</div>
			</div>
		)
	}
}
