import {observable, computed} from 'mobx'

export default class FormStore {
	@observable _fields = [];

	@computed get fields() {
		return this._fields.slice()
	}

	initialize = fields => {
		this._fields = fields
	}

	initializeFromNames = names => {
		this._fields = names.map(name => ({
			name,
			value: ''
		}))
	}

	getField = name => {
		return this._fields.find(field => field.name === name) || { value: '' }
	}

	changeField = (name, value) => {
		this._fields.find(field => field.name === name).value = value
	}
}
