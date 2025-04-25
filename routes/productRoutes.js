const express = require('express');
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// 产品路由
router.route('/')
  .get(getProducts) // 获取所有产品
  .post(protect, admin, createProduct); // 创建产品

router.route('/:id')
  .get(getProductById) // 获取单个产品
  .put(protect, admin, updateProduct) // 更新产品
  .delete(protect, admin, deleteProduct); // 删除产品

module.exports = router; 