const mongoose = require('mongoose');

/**
 * 连接MongoDB数据库
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB 已连接: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error(`MongoDB连接错误: ${error.message}`);
    console.log('警告: 应用将继续运行，但数据库功能将不可用');
    return false;
  }
};

module.exports = connectDB; 