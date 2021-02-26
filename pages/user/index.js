// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },
  onShow() {
    const userInfo = wx.getStorageSync('user_info');
    this.setData({
      userInfo
    })

  }

})