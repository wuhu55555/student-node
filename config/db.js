/**
 * 数据库配置文件
 * 负责建立和维护与MongoDB的连接
 */

const mongoose = require('mongoose');

/**
 * 连接到MongoDB数据库
 * 使用提供的连接字符串并配置连接选项
 */
async function connectDB() {
  try {
    // MongoDB连接字符串
    const mongoURI = 'mongodb://root:n6bnsdjd@test-db-mongodb.ns-sdnoa53q.svc:27017';
    
    // 连接到MongoDB
    await mongoose.connect(mongoURI, {
      // 指定数据库名称
      dbName: 'student_management',
      // 使用新的URL解析器
      useNewUrlParser: true,
      // 使用新的服务器发现和监视引擎
      useUnifiedTopology: true
    });
    
    console.log('MongoDB连接成功');
  } catch (error) {
    console.error('MongoDB连接失败:', error.message);
    // 连接失败时退出进程
    process.exit(1);
  }
}

// 导出连接函数
module.exports = connectDB;