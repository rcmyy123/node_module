const express = require('express');
const {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
} = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// 用户路由
router.route('/')
  .post(registerUser) // 注册新用户
  .get(protect, admin, getUsers); // 管理员获取所有用户

router.post('/login', authUser); // 用户登录

router.route('/profile')
  .get(protect, getUserProfile) // 获取个人资料
  .put(protect, updateUserProfile); // 更新个人资料

module.exports = router; 