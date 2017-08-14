require('dotenv').config()
const express = require('express')
const path = require('path')
const app = express()
const mongoose = require('mongoose')
const validator = require('validator')

// Database connection URL
const remoteDbUrl = process.env.PROD_MONGODB

mongoose.connect(remoteDbUrl)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
	console.log('Succesfully connected to db')
})

// Schemas
const accountSchema = mongoose.Schema({
	surplus: [{
		balance: Number,
		name: String
	}],
	debt: [{
		balance: Number,
		name: String
	}]
})

accountSchema.methods.total = function () {
	const totalSurplus = this.surplus
		? this.surplus.reduce((acc, cur) => (
			acc.balance + cur.balance
		))
		: 0
	const totalDebt = this.debt
		? this.debt.reduce((acc, cur) => (
			acc.balance + cur.balance
		))
		: 0
	return totalSurplus + totalDebt
}

// Models
const Account = mongoose.model('Account', accountSchema)

// const myAccount = new Account({
// 	surplus: [
// 		{
// 			name: 'Bank account',
// 			balance: 20000
// 		},
// 		{
// 			name: 'Simonuv dluh',
// 			balance: 20000
// 		}
// 	]
// })

// myAccount.save(function (err, myAccount) {
// 	if (err) return console.error(err)
// 	Account.find(function (err, accounts) {
// 		if (err) return console.error(err)
// 		console.log(accounts)
// 	})
// })

// Express server
app.use(express.static('public'))

// Api
app.get('/api/accounts', function (req, res) {
	Account.find(function (err, accounts) {
		if (err) return console.error(err)
		res.json(accounts)
	})
})

// Single page App
app.get('/*', function (req, res) {
	res.sendFile(path.join(__dirname + '/public/index.html'))
})

app.listen(process.env.PORT || 3000, function () {
	console.log(process.env.PORT ? 'Example app listening!' : 'Example app listening on port 3000!')
})
