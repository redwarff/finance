import React from 'react'
import { observer, inject } from 'mobx-react'
import { Item, Icon, Divider } from 'semantic-ui-react'

@inject('store') @observer
export default class Accounts extends React.Component {

	render() {
		const { store } = this.props

		return (
			<div>
				<div>Your account:</div>
				<Divider />
				<Item.Group divided>
					{store.accounts.map(account => (
						<Item key={account._id}>
							<Item.Content>
								<Item.Group>
									{account.surplus.map(item => (
										<Item key={item._id}>
											<Item.Content>
												<Icon name="tag" color="green" />
												{`${item.name}: ${item.balance}`}
											</Item.Content>
										</Item>
									))}
								</Item.Group>
							</Item.Content>
						</Item>
					)
					)}
				</Item.Group>
			</div>
		)
	}
}
