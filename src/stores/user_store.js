import { observable } from 'mobx'
import * as api from 'lib/api'

export default class UserStore {
	@observable loggedIn = false

	registerUser = (email, password) => {
		api.registerUser(email, password).then(body => {
			if (body) {
				this.loggedIn = true
			}
		})
	}
}
