import React from 'react'
import {observer} from 'mobx-react'
import Guest from './Guest'
import GuestEntry from './GuestEntry'

@observer
export default class Guests extends React.Component {

	render() {
		const {guestStore} = this.props.route

		return (
			<div>
				<div>Your account:</div>
				{guestStore.accounts.map(account => (
					<div key={account._id}>
						{account.surplus.map(item => (
							<div key={item._id}>
								{`${item.name}: ${item.balance}`}
							</div>
						))}
					</div>
				)
				)}
			</div>
		)
	}
}
