const apiUrl = 'http://localhost:3000'

export const getAccounts = () => (
	fetch(`${apiUrl}/api/accounts`).then(function(response) {
		return response.json()
	})
)

export const registerUser = (email, password) => {
	return fetch(`${apiUrl}/api/register`, {
		method: 'POST',
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