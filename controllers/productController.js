const Product = require('../models/productModel');
const asyncHandler = require('../utils/asyncHandler');

/**
 * 获取所有产品
 * @route   GET /api/products
 * @access  公开
 */
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

/**
 * 获取单个产品
 * @route   GET /api/products/:id
 * @access  公开
 */
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('产品未找到');
  }
});

/**
 * 创建产品
 * @route   POST /api/products
 * @access  私有/管理员
 */
const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, category, countInStock } = req.body;

  const product = await Product.create({
    user: req.user._id,
    name,
    description,
    price,
    category,
    countInStock,
  });

  if (product) {
    res.status(201).json(product);
  } else {
    res.status(400);
    throw new Error('产品信息无效');
  }
});

/**
 * 更新产品
 * @route   PUT /api/products/:id
 * @access  私有/管理员
 */
const updateProduct = asyncHandler(async (req, res) => {
  const { name, description, price, category, countInStock } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.countInStock = countInStock || product.countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('产品未找到');
  }
});

/**
 * 删除产品
 * @route   DELETE /api/products/:id
 * @access  私有/管理员
 */
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.json({ message: '产品已删除' });
  } else {
    res.status(404);
    throw new Error('产品未找到');
  }
});

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
}; 