import mongoose from 'mongoose'

/**
 * 用户表
 */
module.exports = new mongoose.Schema({
    username: String,
    password: String,
    type: String // 管理员、普通用户
});