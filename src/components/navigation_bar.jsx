import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './navigation_bar.css'
import { Menu } from 'semantic-ui-react'
import { Link, IndexLink, withRouter } from 'react-router'

@withRouter @CSSModules(styles)
export default class NavigationBar extends React.Component {
	render() {
		const { router } = this.props
		return (
			<Menu size="large" compact>
				<Menu.Item as={IndexLink} to="/" active={router.isActive('/', true)} className={styles.navLink}>
					Home
				</Menu.Item>
				<Menu.Item as={Link} to="/404" active={router.isActive('/404', true)} className={styles.navLink}>
					404
				</Menu.Item>
				<Menu.Item as={Link} to="/login" active={router.isActive('/login', true)} className={styles.navLink}>
					Login
				</Menu.Item>
				<Menu.Item as={Link} to="/register" active={router.isActive('/register', true)} className={styles.navLink}>
					Register
				</Menu.Item>
			</Menu>
		)
	}
}
