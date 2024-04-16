// load .env
require('dotenv').config()

const subdomain = require('express-subdomain');
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const index = require('./routes/index');
const watch = require('./routes/watch');
const write = require('./routes/write');
const art = require('./routes/art');
const software = require('./routes/software');
const video = require('./routes/video');
const read = require('./routes/read');
const readwell = require('./routes/readwell');
const thoughtblog = require('./routes/thoughtblog');
const phthalo = require('./routes/phthalo');

const app = express();

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

// TODO: get subdomains to work
app.use('/', index);
// app.use(subdomain('watch', watch));
app.use('/watch', watch);
// app.use(subdomain('write', write));
app.use('/write', write);
// app.use(subdomain('art', art));
app.use('/art', art);
// app.use(subdomain('software', software));
app.use('/software', software);
// app.use(subdomain('video', index));
app.use('/video', video);
// app.use(subdomain('read', read));
app.use('/read', read);
app.use('/readwell', readwell);
app.use('/thoughtblog', thoughtblog);
app.use('/phthalo', phthalo);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
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
});

module.exports = app;
