const { AppError } = require('./errorHandler');

const validate = (schema) => (req, res, next) => {
  try {
    const result = schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    req.body = result.body || req.body;
    req.query = result.query || req.query;
    req.params = result.params || req.params;
    next();
  } catch (error) {
    const messages = error.issues?.map((i) => ({
      field: i.path.join('.'),
      message: i.message,
    }));
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: messages || [{ message: error.message }],
    });
  }
};

module.exports = { validate };
