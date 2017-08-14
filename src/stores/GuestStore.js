import {observable, computed} from 'mobx'
import GuestModel from '../models/GuestModel'
import * as api from 'lib/api'

export default class GuestStore {
	@observable _guests = [];
	@observable accounts = [];

	@computed get guests() {
		return this._guests.slice()
	}

	@computed get guestCount() {
		return this._guests.length
	}

	getAccounts () {
		api.getAccounts().then(accounts => {
			this.accounts = accounts
		})
	}

	addGuest (guest) {
		this._guests.push(new GuestModel(this, guest))
	}

	toJS() {
		return this._guests.map(guest => guest.toJS())
	}

	static fromJS(array) {
		const store = new GuestStore()
		store._guests = array.map(item => GuestModel.fromJS(store, item))
		return store
	}
}
