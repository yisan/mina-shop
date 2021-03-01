// pages/collect/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collect: [],
    tabs: [{
        id: 0,
        value: '商品收藏',
        isActive: true
      },
      {
        id: 1,
        value: '品牌收藏',
        isActive: false
      },
      {
        id: 2,
        value: '店铺收藏',
        isActive: false
      },
      {
        id: 3,
        value: '浏览足迹',
        isActive: false
      }
    ],
  },
  onShow() {
    const collect = wx.getStorageSync('collect') || []
    this.setData({
      collect
    })
  },
  // 根据标题索引来激活选中
  changeSelectedByIndex(index) {
    let {
      tabs
    } = this.data
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    // 3.赋值到data中
    this.setData({
      tabs
    })
  },
  // 标题点击事件，从子组件中传递过来的
  handleTabsItemChange(e) {
    // 1.获取被点击的标题索引
    const {
      index
    } = e.detail
    this.changeSelectedByIndex(index)
    // 重新发起请求
    // this.getOrders(index + 1)
  },

})