// pages/auth/index.js
import {
  login
} from '../../utils/asyncWx';
import {
  request
} from '../../request/index';
Page({

  // 获取用户信息
  async handleGetUserInfo(e) {
    try {
      // 1.获取用户信息
      const {
        encryptedData,
        rawData,
        iv,
        signature
      } = e.detail
      // 2.获取小程序登录成功后的code
      const {
        code
      } = await login()
      // 3.发送请求获取token
      const loginParams = {
        encryptedData,
        rawData,
        iv,
        signature,
        code
      }
      const {
        token
      } = await request({
        url: '/users/wxlogin',
        data: loginParams,
        method: 'post'
      })
      // 4.把token存入缓存中，同时跳转到上一个页面  个人开发者账号无支付权限，获取不到token 必须是企业账号才可以。 这里只是模拟代码
      token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
      wx.setStorageSync('token', token)
      //5.返回上一页 1  2:上两页
      wx.navigateBack({
        delta: 1
      });
    } catch (error) {
      console.log(error);
      console.log('---------');
      // 模拟代码
      const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
      wx.setStorageSync('token', token)
      wx.navigateBack({
        delta: 1
      });
    }

  }

})