# Node.js & Express RESTful API

基于Node.js和Express的RESTful API，具有用户认证和基本CRUD功能。

## 功能

- 基于Express的RESTful API
- JWT认证
- MongoDB数据库连接
- 用户注册与登录
- 产品CRUD操作
- 错误处理中间件
- 环境变量配置

## 项目结构

```
├── config/             # 配置文件
│   └── db.js           # 数据库配置
├── controllers/        # 控制器
│   ├── userController.js
│   └── productController.js
├── middleware/         # 中间件
│   ├── authMiddleware.js
│   └── errorMiddleware.js
├── models/             # 数据模型
│   ├── userModel.js
│   └── productModel.js
├── routes/             # 路由
│   ├── userRoutes.js
│   └── productRoutes.js
├── utils/              # 工具函数
│   ├── asyncHandler.js
│   └── generateToken.js
├── .env                # 环境变量
├── package.json        # 项目配置
├── README.md           # 项目说明
└── server.js           # 服务器入口
```

## 安装与使用

1. 克隆项目
```
git clone <仓库地址>
```

2. 安装依赖
```
npm install
```

3. 配置环境变量
创建 `.env` 文件并添加以下内容：
```
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/node_service
JWT_SECRET=<你的密钥>
JWT_EXPIRES_IN=30d
```

4. 运行开发服务器
```
npm run dev
```

5. 生产环境运行
```
npm start
```

## API 文档

### 用户相关

- `POST /api/users` - 注册新用户
- `POST /api/users/login` - 用户登录
- `GET /api/users/profile` - 获取用户资料 (需要认证)
- `PUT /api/users/profile` - 更新用户资料 (需要认证)
- `GET /api/users` - 获取所有用户 (仅限管理员)

### 产品相关

- `GET /api/products` - 获取所有产品
- `GET /api/products/:id` - 获取单个产品
- `POST /api/products` - 创建产品 (需要管理员权限)
- `PUT /api/products/:id` - 更新产品 (需要管理员权限)
- `DELETE /api/products/:id` - 删除产品 (需要管理员权限)

## 技术栈

- Node.js
- Express
- MongoDB & Mongoose
- JWT认证
- bcryptjs (密码加密) 