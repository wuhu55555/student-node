# 学生管理系统后端

## 项目介绍

这是一个基于 Node.js 和 Express 框架开发的学生管理系统后端API服务。该系统提供了完整的学生信息管理功能，包括查询、添加、更新和删除学生数据。

## 技术栈

- **后端框架**: Node.js + Express
- **数据库**: MongoDB
- **ORM工具**: Mongoose
- **其他依赖**: 
  - cors - 处理跨域请求

## 功能特性

- ✅ 查询所有学生信息
- ✅ 添加新学生
- ✅ 更新学生信息
- ✅ 删除学生
- ✅ 数据验证和错误处理
- ✅ RESTful API 设计
- ✅ 基本日志记录功能

## 项目结构

```
├── config/           # 配置文件目录
│   └── db.js         # 数据库连接配置
├── models/           # 数据模型目录
│   └── Student.js    # 学生数据模型
├── routes/           # 路由目录
│   └── studentRoutes.js  # 学生管理路由
├── server.js         # 主服务器文件
├── entrypoint.sh     # 启动脚本
├── package.json      # 项目依赖配置
├── README.md         # 项目说明文档
└── 对接文档.txt      # API对接文档
```

## 安装与部署

### 环境要求

- Node.js (v12 或更高版本)
- npm 或 yarn
- MongoDB 数据库

### 安装步骤

1. **克隆项目**

```bash
git clone <项目仓库地址>
cd <项目目录>
```

2. **安装依赖**

```bash
npm install
```

3. **配置数据库**

项目使用以下MongoDB连接信息：
- 连接字符串: `mongodb://root:n6bnsdjd@test-db-mongodb.ns-sdnoa53q.svc:27017`
- 数据库名称: `student_management`
- 集合名称: `list`

可在 `config/db.js` 文件中修改数据库连接配置。

## 运行项目

### 开发环境

```bash
# 使用npm脚本
npm run dev

# 或直接运行
node server.js

# 或使用启动脚本
bash entrypoint.sh
```

### 生产环境

```bash
# 使用启动脚本的生产模式
bash entrypoint.sh production
```

## API接口说明

### 1. 查询所有学生

- **URL**: `/api/get-students`
- **方法**: `GET`
- **功能**: 获取所有学生列表
- **响应**: 学生对象数组

### 2. 添加新学生

- **URL**: `/api/add-student`
- **方法**: `POST`
- **功能**: 添加新的学生信息
- **请求体**: `{"name": "学生姓名", "age": 年龄, "class": "班级"}`
- **响应**: 新创建的学生对象

### 3. 更新学生信息

- **URL**: `/api/update-student/:id`
- **方法**: `POST`
- **功能**: 根据ID更新学生信息
- **路径参数**: `id` - 学生ID
- **请求体**: `{"name": "更新后的姓名", "age": 更新后的年龄, "class": "更新后的班级"}`
- **响应**: 更新后的学生对象

### 4. 删除学生

- **URL**: `/api/del-student/:id`
- **方法**: `POST`
- **功能**: 根据ID删除学生
- **路径参数**: `id` - 学生ID
- **响应**: 删除操作结果状态

## CURL测试示例

### 添加学生

```bash
curl -X POST http://localhost:3000/api/add-student \
  -H "Content-Type: application/json" \
  -d '{"name": "张三", "age": 20, "class": "计算机科学与技术1班"}'
```

### 查询学生列表

```bash
curl -X GET http://localhost:3000/api/get-students
```

## 错误处理

系统实现了完善的错误处理机制，包括：
- 数据验证错误
- 数据库操作错误
- 404路由未找到错误
- 服务器内部错误

所有错误都会返回适当的HTTP状态码和错误信息。

## 注意事项

1. 所有API接口都支持跨域访问
2. 年龄字段必须是正整数
3. 学生姓名和班级不能为空
4. 系统会记录所有请求的基本日志信息
5. 服务器默认监听端口3000，可通过环境变量PORT修改

## 许可证

[MIT](LICENSE)

## 贡献

欢迎提交Issue和Pull Request！