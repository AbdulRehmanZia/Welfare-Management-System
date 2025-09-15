export const ApiResponse = (res, statusCode, data = null, message, meta) => {
  const response = {
    statusCode,
    data,
    message,
    success: statusCode < 400,
  };
  if (meta !== undefined) {
    response.meta = meta;
  }

  return res.status(statusCode).json(response);
};


export const ApiError = (res, statusCode, message, error = null) => {
  return res.status(statusCode).json({
    success: false,
    message,
    error,
  });
};


