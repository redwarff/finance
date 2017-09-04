const apiUrl = 'http://localhost:3000'

export const getAccounts = () => (
	fetch(`${apiUrl}/api/accounts`, { credentials: 'include' }).then(function(response) {
		return response.json()
	})
)

export const registerUser = (email, password, passwordConfirm) => {
	return fetch(`${apiUrl}/api/register`, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			email,
			password,
			passwordConfirm
		}) })
		.then(function(response) {
			return response.json()
		})
}

export const loginUser = (email, password) => {
	console.log(email, password)
	return fetch(`${apiUrl}/api/login`, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			email,
			password
		}) })
		.then(function(response) {
			return response.json()
		})
}

export const logoutUser = () => {
	return fetch(`${apiUrl}/api/logout`, {
		credentials: 'include'
	}).then(function(response) {
		if (!response.ok) {
			return response.json()
		} else {
			return {}
		}
	})
}