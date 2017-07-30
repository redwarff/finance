import {observable, computed} from 'mobx'
import GuestModel from '../models/GuestModel'


export default class GuestStore {
	@observable _guests = [];

	@computed get guests() {
		return this._guests.slice();
	}

	@computed get guestCount() {
		return this._guests.length;
	}

	addGuest (guest) {
		this._guests.push(new GuestModel(this, guest));
	}

	toJS() {
		return this._guests.map(guest => guest.toJS());
	}

	static fromJS(array) {
		const store = new GuestStore();
		store._guests = array.map(item => GuestModel.fromJS(guestStore, item));
		return store;
	}
}
