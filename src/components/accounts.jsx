import React from 'react'
import { observer, inject } from 'mobx-react'

@inject('store') @observer
export default class Accounts extends React.Component {

	render() {
		const { store } = this.props

		return (
			<div>
				<div>Your account:</div>
				{store.accounts.map(account => (
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
