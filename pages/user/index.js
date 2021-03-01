// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    // 收藏商品的数量
    collectNums: 0
  },
  onShow() {
    const userInfo = wx.getStorageSync('user_info')
    const collect = wx.getStorageSync('collect') || []
    this.setData({
      userInfo,
      collectNums: collect.length
    })

  }

})