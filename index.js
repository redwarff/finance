require('dotenv').config()
const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const bcrypt = require('bcrypt-nodejs')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const { check, validationResult } = require('express-validator/check')
const { matchedData } = require('express-validator/filter')

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

passport.use(new LocalStrategy({
	usernameField: 'email'
},
function(email, password, done) {
	User.findOne({ email: email }, function (err, user) {
		if (err) { return done(err) }
		if (!user) {
			return done(null, false)
		}
		bcrypt.compare(password, user.password, function(err, res) {
			if (res === true) {
				return done(null, user)
			} else {
				return done(null, false)
			}
		})
	})
}))

const dbUrl = process.env.NODE_ENV === 'production' ? process.env.PROD_MONGODB : process.env.LOCAL_MONGODB
mongoose.connect(dbUrl)

app.use(bodyParser.json())
app.use(session({
	secret: 'keyboard cat',
	store: new MongoStore({ mongooseConnection: mongoose.connection }),
	resave: false,
	saveUninitialized: false
	// cookie: { secure: true }
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(cors({ credentials: true, origin: true }))

// Database connection URL


const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
	console.log('Succesfully connected to database')
})

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
app.get('/api/accounts', authenticationMiddleware(), function (req, res) {
	console.log('user ', req.user)
	Account.find(function (err, accounts) {
		if (err) return console.error(err)
		res.json(accounts)
	})
})

app.post('/api/register', [
	check('email', 'Email can not be empty').isLength({ min: 1 }),
	check('email', 'Email must be a valid email').isEmail(),
	check('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
	check('passwordConfirm', 'Passwords must match').custom((value, { req }) => value === req.body.password)
], function (req, res) {
	console.log(JSON.stringify(req.body))
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.mapped() })
	}

	const user = matchedData(req)
	bcrypt.hash(user.password, null, null, function(err, hash) {
		const newUser = new User({
			email: user.email,
			password: hash
		})
		
		newUser.save(function (err, newUser) {
			if (err) return console.error(err)
			// User.find(function (err, users) {
			// 	if (err) return console.error(err)
			// 	console.log(users)
			// })

			console.log(newUser._id)
			req.login(newUser, function (err) {
				console.log('user should be logged in')
				res.status(200).json({ email: newUser.email, id: newUser._id })
			})
			
		})
	})
})

app.post('/api/login', function(req, res, next) {
	passport.authenticate('local', function(err, user) {
		if (err) { return next(err) }
		if (!user) { return res.status(401).json({ errors: { login: 'Incorrect username or password' } }) }
		req.logIn(user, function(err) {
			if (err) { return next(err) }
			return res.status(200).json({ email: user.email, id: user._id })
		})
	})(req, res, next)
})

app.get('/api/logout', authenticationMiddleware(), function(req, res) {
	req.logout()
	req.session.destroy(function (err) {
		res.clearCookie('connect.sid', { path: '/' })
		res.status(200).send()
	})
})

// Single page App
app.get('/*', function (req, res) {
	res.sendFile(path.join(__dirname + '/public/index.html'))
})

app.listen(process.env.PORT || 3000, function () {
	console.log(process.env.PORT ? 'Example app listening!' : 'Example app listening on port 3000!')
})

passport.serializeUser(function(user, done) {
	console.log('serialze user', user._id)
	done(null, user._id)
})

passport.deserializeUser(function(userId, done) {
	console.log('deserialize user', userId)
	User.findById(userId, function (err, user) {
		done(err, user)
	})
})

function authenticationMiddleware () {  
	return function (req, res, next) {
		console.log(req.user)
		if (req.isAuthenticated()) {
			return next()
		}
		res.status(401).json({ errors: { authentication: { msg: 'Access denied' } } })
	}
}
