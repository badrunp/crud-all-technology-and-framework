const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const app = express();
dotenv.config();
const PORT = process.env.PORT || 500;
const DB_URL = process.env.DB_URL;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './src/views'));
app.use('/public', express.static(path.join(__dirname, 'public')))
// app.use(cookieParser());
app.use(morgan('tiny')); 

app.use(methomdOverride('_method'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}))

// app.use(function(req,res,next){
//     req.session.message = "Hello"
//     next()
// })


app.use(function(req,res,next){
    var error = req.session.error;
    var message = req.session.message;
    var inputOldValues = req.session.inputOldValues;
    delete req.session.error;
    delete req.session.message;
    delete req.session.inputOldValues;
    res.locals.message = '';
    res.locals.inputOldValues = '';
    res.locals.error = '';
    if(error)  res.locals.error = error;
    if(message)  res.locals.message = message;
    if(inputOldValues)  res.locals.inputOldValues = inputOldValues;
    next();
})


app.use('/', require('./src/route/productRoute'));


mongoose.connect(DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Database error'));
db.once('open', function(){
    console.log(`Databse connected`);
})

app.listen(PORT, function(){
    console.log(`Server is running on port ${PORT}`);
})