const express = require('express');
const app = express();
const itemRouter = require('./itemRouter');
const ExpressError = require('./expressError');
const morgan = require('morgan');


app.use(express.json());
app.use('/items', itemRouter);
app.use(morgan('dev'));


// 404 handler

app.use(function (req, res, next) {
    return next(new ExpressError("Not Found", 404));
  });


// basic error handler 
app.use((err, req, res, next) => {
    res.status(err.status || 500);
  
    return res.json({
      error: err.message,
    });
  });



  module.exports = app;