require('dotenv').config()
const express = require('express')
const path = require('path')
const app = express()
const mongoose = require('mongoose')

// Database connection URL
const remoteDbUrl = process.env.PROD_MONGODB

mongoose.connect(remoteDbUrl)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
	console.log('Succesfully connected to db')
})

// Schemas
const kittySchema = mongoose.Schema({
	name: String
})

kittySchema.methods.speak = function () {
	const greeting = this.name
		? 'Meow name is ' + this.name
		: 'I don\'t have a name'
	console.log(greeting)
}

// Models
const Kitten = mongoose.model('Kitten', kittySchema)

// const silence = new Kitten({ name: 'Fluffy' })

// silence.save(function (err, silence) {
// 	if (err) return console.error(err)
// 	silence.speak()
// 	Kitten.find(function (err, kittens) {
// 		if (err) return console.error(err)
// 		console.log(kittens)
// 	})
// })

// Express server
app.use(express.static('public'))

// Api
app.get('/api/kittens', function (req, res) {
	Kitten.find(function (err, kittens) {
		if (err) return console.error(err)
		res.json(kittens)
	})
})

app.get('/*', function (req, res) {
	res.sendFile(path.join(__dirname + '/public/index.html'))
})

app.listen(process.env.PORT || 3000, function () {
	console.log(process.env.PORT ? 'Example app listening!' : 'Example app listening on port 3000!')
})
