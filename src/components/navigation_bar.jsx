import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './navigation_bar.css'
import { Menu } from 'semantic-ui-react'
import { Link, IndexLink, withRouter } from 'react-router'
import { inject, observer } from 'mobx-react'

@withRouter @CSSModules(styles) @inject('userStore', 'accountsStore') @observer
export default class NavigationBar extends React.Component {

	logout = () => {
		this.props.userStore.logoutUser().then(body => {
			if (!body.errors) {
				this.props.accountsStore.clear()
				this.props.router.push('/login')
			}
		})
	}

	render() {
		const { router, userStore } = this.props
		return (
			<Menu size="large" compact>
				<Menu.Item as={IndexLink} to="/" active={router.isActive('/', true)} className={styles.navLink}>
					Home
				</Menu.Item>
				{!userStore.user && [
					<Menu.Item key="login" as={Link} to="/login" active={router.isActive('/login', true)} className={styles.navLink}>
						Login
					</Menu.Item>,
					<Menu.Item key="register" as={Link} to="/register" active={router.isActive('/register', true)} className={styles.navLink}>
						Register
					</Menu.Item>
				]}
				{userStore.user &&
					<Menu.Item as={'a'} className={styles.navLink} onClick={this.logout}>
						Log out
					</Menu.Item>
				}
			</Menu>
		)
	}
}
