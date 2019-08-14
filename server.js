const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const config = require('config')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 5000

/*
	Mongodb config is in config file
	And connect to the mongodb
*/
const db = config.get('mongoURI')
mongoose.connect(db, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false
}).then(() => console.log('Database connected..')).catch(err => console.log(err))


/*
	Enable body-parser middleware
*/
app.use(express.json())


/*
	Initializeing routes
*/
app.use('/api/todos', require('./routes/api/todos'))
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))


/*
	Serve static assets if in production
*/
if(process.env.NODE_ENV === 'production'){
	// Set static folder
	app.use(express.static('client/build'))
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	} )
}


/*
	Listening to the port
*/
app.listen(PORT, _ => console.log(`Server running on port : ${PORT}`))
