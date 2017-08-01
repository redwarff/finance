const express = require('express')
const path = require('path')
const app = express()

app.use(express.static('public'))

app.get('/*', function (req, res) {
	res.sendFile(path.join(__dirname + '/public/index.html'))
})

app.listen(process.env.PORT || 3000, function () {
	console.log(process.env.PORT ? 'Example app listening!' : 'Example app listening on port 3000!')
})