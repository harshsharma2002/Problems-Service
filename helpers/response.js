const APIResponse = (res, statusCode, data) => {
  res.status(statusCode).send(data);
};

module.exports = { APIResponse };
