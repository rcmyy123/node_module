/**
 * 异步处理器中间件
 * 用于简化异步控制器处理，避免使用多个try-catch块
 * @param {Function} fn - 异步函数
 * @returns {Function} Express中间件函数
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler; 