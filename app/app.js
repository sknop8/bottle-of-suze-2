var subdomain = require('express-subdomain');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var watch = require('./routes/watch');
var write = require('./routes/write');
var art = require('./routes/art');
var software = require('./routes/software');
var video = require('./routes/video');
var read = require('./routes/read');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(subdomain('watch', watch));
app.use('/watch', watch);
app.use(subdomain('write', write));
app.use('/write', write);
app.use(subdomain('art', art));
app.use('/art', art);
app.use(subdomain('software', software));
app.use('/software', software);
app.use(subdomain('video', index));
app.use('/video', video);
app.use(subdomain('read', index));
app.use('/read', read);
app.use('/', index);


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

app.listen(3000, () => {
    console.log('Server is up on 3000')
})

module.exports = app;
