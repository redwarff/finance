import {observable, computed} from 'mobx'

export default class AccountModel {
	store
	@observable account

	@computed get total () {
		const totalSurplus = this.account.surplus
			? this.account.surplus.reduce((acc, cur) => (
				acc.balance + cur.balance
			))
			: 0
		const totalDebt = this.account.debt
			? this.account.debt.reduce((acc, cur) => (
				acc.balance + cur.balance
			))
			: 0
		return totalSurplus + totalDebt
	}

	constructor(store, account) {
		this.store = store
		this.account = account
	}

	destroy() {
		this.store.accounts.remove(this)
	}

	setaccount(account) {
		this.account = account
	}

	toJS() {
		return {
			account: this.account
		}
	}

	static fromJS(store, account) {
		return new AccountModel(store, account)
	}
}
