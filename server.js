/**
 * 学生管理系统 - 主服务器文件
 * 作为应用程序的入口点，配置Express应用并连接所有组件
 */

// 导入必要的依赖
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// 创建Express应用实例
const app = express();

// 连接MongoDB数据库
connectDB();

// 配置中间件

// 使用CORS中间件，允许跨域请求
app.use(cors());

// 解析JSON请求体
app.use(express.json());

// 解析URL编码的请求体
app.use(express.urlencoded({ extended: true }));

// 基本日志记录中间件
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
});

// 引入并使用学生路由
app.use('/api', require('./routes/studentRoutes'));

// 基本路由
app.get('/', (req, res) => {
  res.send('学生管理系统API正在运行');
});

// 404处理中间件
app.use((req, res, next) => {
  res.status(404).json({ message: '请求的路由不存在' });
});

// 全局错误处理中间件
app.use((err, req, res, next) => {
  console.error('全局错误:', err.stack);
  res.status(500).json({ message: '服务器内部错误' });
});

// 定义服务器端口
const PORT = process.env.PORT || 3000;

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器正在运行，监听端口 ${PORT}`);
});

// 处理未捕获的异常
process.on('uncaughtException', (err) => {
  console.error('未捕获的异常:', err);
  process.exit(1);
});

// 处理未处理的Promise拒绝
process.on('unhandledRejection', (err) => {
  console.error('未处理的Promise拒绝:', err);
  process.exit(1);
});