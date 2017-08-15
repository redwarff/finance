import React, { Component } from 'react'
import { Link, IndexLink, withRouter } from 'react-router'

import {navbar} from 'bootstrap-css'

class NavItemPure extends Component {
	render () {
		const { router } = this.props
		const { index, to, children, ...props } = this.props

		const LinkComponent = index ?  IndexLink : Link

		return (
			<li className={router.isActive(to,true) ? navbar.active : 'inactive'}>
				<LinkComponent to={to} {...props}>{children}</LinkComponent>
			</li>
		)
	}
}

const NavItem = withRouter(NavItemPure)

export default NavItem
