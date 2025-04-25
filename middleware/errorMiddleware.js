/**
 * 错误处理中间件
 */
const errorHandler = (err, req, res, next) => {
  // 获取状态码，如果不存在则默认为500
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = errorHandler; 