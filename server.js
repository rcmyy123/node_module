const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorMiddleware');

// 加载环境变量
dotenv.config();

// 根据ENABLE_DB环境变量决定是否连接数据库
if (process.env.ENABLE_DB === 'true') {
  connectDB().then(connected => {
    if (!connected) {
      console.log('注意: 某些功能可能不可用，因为数据库连接失败');
    }
  });
} else {
  console.log('数据库连接已禁用，数据库相关功能将不可用');
}

// 初始化Express应用
const app = express();

// 中间件
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin: process.env.CLIENT_URL,   // 只允许 .env 里设置的域名访问
  credentials: true
}));
app.use(helmet());

// 日志中间件
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// 路由
// 只在启用数据库时加载需要数据库的路由
if (process.env.ENABLE_DB === 'true') {
  app.use('/api/users', require('./routes/userRoutes'));
  app.use('/api/products', require('./routes/productRoutes'));
}
// DeepSeek路由不需要数据库，始终加载
app.use('/api/deepseek', require('./routes/deepseekRoutes'));

// 根路由
app.get('/', (req, res) => {
  res.json({ message: 'API 服务运行中' });
});

// 错误处理中间件
app.use(errorHandler);

// 启动服务器
const PORT = process.env.PORT || 5000;
app.listen(PORT,'0.0.0.0',() => {
  console.log(`服务器在${process.env.NODE_ENV}模式下运行，端口: ${PORT}`);
}); 