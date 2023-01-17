const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const config = require('./config/database');

mongoose.connect(config.database, {
    useNewUrlParser: true
});
let db = mongoose.connection;

// Check Connection
db.once('open', function(){
    console.log('Connected to MongoDB');
});

// Check for DB errors
db.on('error', function(err){
    console.log(err);
});

// Init app
const app = express();

// Middleware
app.use(bodyParser.json());

app.use('/api/signup', require('./routes/signup.route'));
app.use('/api/signin', require('./routes/signin.route'));

// Load Vue app
app.use(express.static(path.join(__dirname, "public")));

app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));

// Set port
const port = process.env.PORT || 8000;
app.listen(port);
console.log( 'Node server is running on port ' + port);