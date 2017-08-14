const apiUrl = 'http://localhost:3000/'

export const getAccounts = () => (
	fetch('api/accounts').then(function(response) {
		return response.json()
	})
)