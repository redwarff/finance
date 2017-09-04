import {observable, computed} from 'mobx'
import AccountModel from '../models/account_model'
import * as api from 'lib/api'

export default class AccountsStore {
	@observable _accounts = []

	@computed get accounts() {
		return this._accounts.slice()
	}

	clear () {
		this._accounts = []
	}

	getAccounts () {
		api.getAccounts().then(accounts => {
			if (accounts.errors) {
				console.log(accounts.errors)
			} else {
				this._accounts = accounts
			}
		})
	}

	addAccount (account) {
		this._accounts.push(new AccountModel(this, account))
	}

	toJS() {
		return this._accounts.map(account => account.toJS())
	}

	static fromJS(array) {
		const store = new AccountsStore()
		store._accounts = array.map(item => AccountModel.fromJS(store, item))
		return store
	}
}
