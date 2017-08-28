require('dotenv').config()
const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const validator = require('validator')
const cors = require('cors')

app.use(bodyParser.json())
app.use(cors())

// Database connection URL
const dbUrl = process.env.NODE_ENV === 'production' ? process.env.PROD_MONGODB : process.env.LOCAL_MONGODB

mongoose.connect(dbUrl)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
	console.log('Succesfully connected to database')
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

const userSchema = mongoose.Schema({
	email: String,
	password: String
})

// Models
const Account = mongoose.model('Account', accountSchema)
const User = mongoose.model('User', userSchema)

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

app.post('/api/register', function (req, res) {
	console.log(JSON.stringify(req.body))
	const newUser = new User({
		email: req.body.email,
		password: req.body.password
	})

	newUser.save(function (err, newUser) {
		if (err) return console.error(err)
		User.find(function (err, users) {
			if (err) return console.error(err)
			console.log(users)
		})
	})
})

// Single page App
app.get('/*', function (req, res) {
	res.sendFile(path.join(__dirname + '/public/index.html'))
})

app.listen(process.env.PORT || 3000, function () {
	console.log(process.env.PORT ? 'Example app listening!' : 'Example app listening on port 3000!')
})
