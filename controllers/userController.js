const User = require('../models/userModel');
const asyncHandler = require('../utils/asyncHandler');
const generateToken = require('../utils/generateToken');

/**
 * 用户认证
 * @route   POST /api/users/login
 * @access  公开
 */
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // 查找用户
  const user = await User.findOne({ email });

  // 检查用户是否存在和密码是否匹配
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('邮箱或密码无效');
  }
});

/**
 * 注册新用户
 * @route   POST /api/users
 * @access  公开
 */
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // 检查用户是否已存在
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('用户已存在');
  }

  // 创建新用户
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('用户数据无效');
  }
});

/**
 * 获取用户个人资料
 * @route   GET /api/users/profile
 * @access  私有
 */
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('用户不存在');
  }
});

/**
 * 更新用户个人资料
 * @route   PUT /api/users/profile
 * @access  私有
 */
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('用户不存在');
  }
});

/**
 * 获取所有用户
 * @route   GET /api/users
 * @access  私有/管理员
 */
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

module.exports = {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
}; 