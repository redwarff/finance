import React from 'react'
import {observer} from 'mobx-react'

@observer
export default class Accounts extends React.Component {

	render() {
		const {accountsStore} = this.props.route

		return (
			<div>
				<div>Your account:</div>
				{accountsStore.accounts.map(account => (
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
