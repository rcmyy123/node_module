const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: [true, '请输入产品名称'],
    },
    description: {
      type: String,
      required: [true, '请输入产品描述'],
    },
    price: {
      type: Number,
      required: [true, '请输入产品价格'],
      default: 0,
    },
    category: {
      type: String,
      required: [true, '请选择产品类别'],
    },
    countInStock: {
      type: Number,
      required: [true, '请输入库存数量'],
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product; 