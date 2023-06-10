const express = require('express');
const ExpressError = require('./expressError');
const { calculateMean, calculateMedian, calculateMode, areQueryParamsNumbers } = require('./functions');

const app = express();

app.use(express.json());


// mean route
app.get('/mean', (req, res, next) => {
    const { nums } = req.query;
    if (!nums) {
      throw new ExpressError('nums are required', 400);
    }
  
    if (!areQueryParamsNumbers(req.query)) {
      throw new ExpressError('Invalid query parameters: must be numbers', 400);
    }
  
    const numbers = nums.split(',').map(Number);
  
    const mean = calculateMean(numbers);
    return res.send({ operation: 'mean', value: mean });
  });


// median route
app.get('/median', (req, res, next) => {
    const { nums } = req.query;
    if (!nums) {
      throw new ExpressError('nums are required', 400);
    }
  
    if (!areQueryParamsNumbers(req.query)) {
      throw new ExpressError('Invalid query parameters: must be numbers', 400);
    }
  
    const numbers = nums.split(',').map(Number);
  
    const median = calculateMedian(numbers);
    return res.send({ operation: 'median', value: median });
  });

app.get('/mode', (req, res, next) => {
    const { nums } = req.query;
    if (!nums) {
      throw new ExpressError('nums are required', 400);
    }
  
    if (!areQueryParamsNumbers(req.query)) {
      throw new ExpressError('Invalid query parameters: must be numbers', 400);
    }
  
    const numbers = nums.split(',').map(Number);
  
    const mode = calculateMode(numbers);
    return res.send({ operation: 'mode', value: mode });
});
  




// 404 handler
app.use(function (req, res, next) {
  const notFoundError = new ExpressError("Not Found", 404);
  return next(notFoundError)
});

// generic error handler
app.use(function(err, req, res, next) {
  // the default status is 500 Internal Server Error
  let status = err.status || 500;
  let message = err.message;

  // set the status and alert the user
  return res.status(status).json({
    error: {message, status}
  });
});
// end generic handler
app.listen(3000, function() {
  console.log('Server is listening on port 3000');
});