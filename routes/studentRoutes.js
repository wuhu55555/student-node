/**
 * 学生管理路由文件
 * 实现所有学生相关的API端点
 */

const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

/**
 * @route   GET /api/get-students
 * @desc    获取所有学生
 * @access  Public
 */
router.get('/get-students', async (req, res) => {
  try {
    // 查询所有学生数据
    const students = await Student.find();
    
    // 返回学生数据数组
    res.status(200).json(students);
  } catch (error) {
    // 记录错误日志
    console.error('获取学生列表失败:', error.message);
    
    // 返回服务器错误响应
    res.status(500).json({ message: '服务器错误，获取学生列表失败' });
  }
});

/**
 * @route   POST /api/add-student
 * @desc    添加新学生
 * @access  Public
 */
router.post('/add-student', async (req, res) => {
  try {
    // 从请求体中获取学生信息
    const { name, age, class: studentClass } = req.body;
    
    // 创建新学生实例
    const newStudent = new Student({
      name,
      age,
      class: studentClass
    });
    
    // 保存到数据库
    const student = await newStudent.save();
    
    // 返回新添加的学生对象，包含自动生成的id
    res.status(201).json(student);
  } catch (error) {
    // 处理验证错误
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: '数据验证失败', errors: messages });
    }
    
    // 记录其他错误
    console.error('添加学生失败:', error.message);
    
    // 返回服务器错误响应
    res.status(500).json({ message: '服务器错误，添加学生失败' });
  }
});

/**
 * @route   POST /api/update-student/:id
 * @desc    根据ID更新学生信息
 * @access  Public
 */
router.post('/update-student/:id', async (req, res) => {
  try {
    // 获取学生ID
    const { id } = req.params;
    
    // 获取要更新的数据
    const { name, age, class: studentClass } = req.body;
    
    // 更新学生信息
    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      { name, age, class: studentClass },
      { 
        new: true, // 返回更新后的文档
        runValidators: true // 运行验证器
      }
    );
    
    // 检查学生是否存在
    if (!updatedStudent) {
      return res.status(404).json({ message: '找不到指定的学生' });
    }
    
    // 返回更新后的学生对象
    res.status(200).json(updatedStudent);
  } catch (error) {
    // 处理ID格式错误
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: '学生ID格式错误' });
    }
    
    // 处理验证错误
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: '数据验证失败', errors: messages });
    }
    
    // 记录其他错误
    console.error('更新学生信息失败:', error.message);
    
    // 返回服务器错误响应
    res.status(500).json({ message: '服务器错误，更新学生信息失败' });
  }
});

/**
 * @route   POST /api/del-student/:id
 * @desc    根据ID删除学生
 * @access  Public
 */
router.post('/del-student/:id', async (req, res) => {
  try {
    // 获取学生ID
    const { id } = req.params;
    
    // 删除学生
    const deletedStudent = await Student.findByIdAndDelete(id);
    
    // 检查学生是否存在
    if (!deletedStudent) {
      return res.status(404).json({ message: '找不到指定的学生' });
    }
    
    // 返回删除成功的状态
    res.status(200).json({ message: '学生删除成功' });
  } catch (error) {
    // 处理ID格式错误
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: '学生ID格式错误' });
    }
    
    // 记录错误
    console.error('删除学生失败:', error.message);
    
    // 返回服务器错误响应
    res.status(500).json({ message: '服务器错误，删除学生失败' });
  }
});

module.exports = router;