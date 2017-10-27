var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;



//NLU
var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
var natural_language_understanding = new NaturalLanguageUnderstandingV1({
    'username': 'fd7e2088-3249-4072-8f59-c6b41ff0f916',
    'password': 'ZmXBGsXeGeHz',
    'version_date': '2017-02-27'
});

var parameters = {
    'text': 'IBM is an American multinational technology company headquartered in Armonk, New York, United States, with operations in over 170 countries.',
    'features': {
        'entities': {
            'emotion': true,
            'sentiment': true,
            'limit': 2
        },
        'keywords': {
            'emotion': true,
            'sentiment': true,
            'limit': 2
        }
    }
}



natural_language_understanding.analyze(parameters, function(err, response) {
    if (err)
        console.log('error:', err);
    else
        console.log(JSON.stringify(response, null, 2));
});




//BLUEMIX NLU credentials

// "url": "https://gateway.watsonplatform.net/natural-language-understanding/api",
// "username": "fd7e2088-3249-4072-8f59-c6b41ff0f916",
// "password": "ZmXBGsXeGeHz"

//The current version is 2017-02-27