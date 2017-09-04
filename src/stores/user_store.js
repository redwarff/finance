import { observable } from 'mobx'
import * as api from 'lib/api'

export default class UserStore {
	@observable user = null
	@observable validationErrors = {}

	registerUser = (email, password, passwordConfirm) => {
		return api.registerUser(email, password, passwordConfirm).then(body => {
			if (body.errors) {
				this.validationErrors = body.errors
				return body
			} else {
				this.validationErrors = {}
				this.user = {
					email: body.email,
					id: body.id
				}
				return body
			}
		})
	}

	loginUser = (email, password) => {
		return api.loginUser(email, password).then(body => {
			if (body.errors) {
				this.validationErrors = body.errors
				return body
			} else {
				this.validationErrors = {}
				this.user = {
					email: body.email,
					id: body.id
				}
				return body
			}
		})
	}

	logoutUser = () => {
		return api.logoutUser().then(body => {
			if (body.errors) {
				this.validationErrors = body.errors
				return body
			} else {
				this.validationErrors = {}
				this.user = null
				return body
			}
		})
	}

	resetErrors = () => {
		this.validationErrors = {}
	}
}
