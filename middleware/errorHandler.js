const errorHandler = (err, req, res, next) => {
  res.json({
    title: res.statusCode,
    description: err.message,
    details: err.stack,
  });
};

module.exports = errorHandler;
