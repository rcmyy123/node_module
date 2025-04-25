const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

/**
 * 身份验证中间件
 * 保护路由，确保只有已认证的用户可以访问
 */
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // 检查请求头中是否包含token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // 获取token
      token = req.headers.authorization.split(' ')[1];

      // 验证token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 获取用户信息（不包括密码）
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('未授权，token无效');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('未授权，没有提供token');
  }
});

/**
 * 管理员权限检查中间件
 */
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403);
    throw new Error('未授权，仅管理员可访问');
  }
};

module.exports = { protect, admin }; 