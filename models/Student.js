/**
 * 学生数据模型
 * 定义学生数据的结构和验证规则
 */

const mongoose = require('mongoose');

// 创建学生数据模型的Schema
const StudentSchema = new mongoose.Schema({
  /**
   * 学生姓名
   * 类型: 字符串
   * 必需: 是
   */
  name: {
    type: String,
    required: [true, '请输入学生姓名'],
    trim: true // 去除字符串两端的空白
  },
  
  /**
   * 学生年龄
   * 类型: 数字
   * 必需: 是
   * 验证: 必须是正整数
   */
  age: {
    type: Number,
    required: [true, '请输入学生年龄'],
    validate: {
      validator: function(value) {
        return Number.isInteger(value) && value > 0;
      },
      message: '年龄必须是正整数'
    }
  },
  
  /**
   * 学生班级
   * 类型: 字符串
   * 必需: 是
   */
  class: {
    type: String,
    required: [true, '请输入学生班级'],
    trim: true // 去除字符串两端的空白
  },
  
  /**
   * 创建时间
   * 类型: 日期
   * 默认值: 当前时间
   */
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// 创建并导出学生模型
// 使用'list'作为集合名称，符合需求
module.exports = mongoose.model('Student', StudentSchema, 'list');