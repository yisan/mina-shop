// pages/goods_list/index.js
import {
  request
} from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
        id: 0,
        value: '综合',
        isActive: true
      },
      {
        id: 1,
        value: '销量',
        isActive: false
      },
      {
        id: 2,
        value: '价格',
        isActive: false
      }
    ],
    goodsList: [],
    defaultImg: 'https://ww1.sinaimg.cn/large/007rAy9hgy1g24by9t530j30i20i2glm.jpg'
  },
  queryParams: {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10
  },
  totalPages: 1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.queryParams.cid = options.cid || ''
    this.queryParams.query = options.query || ''
    this.getGoodsList()
  },

  // 获取商品列表数据
  async getGoodsList() {
    const res = await request({
      url: '/goods/search',
      data: this.queryParams
    })
    // 获取总页数 
    // 总页数 = Math.ceil(总条数/页容量 pagesize)
    // 总页数 = Math.ceil(23 / 10) = 3
    const total = res.total
    this.totalPages = Math.ceil(total / this.queryParams.pagesize)

    this.setData({
      // 拼接数组
      goodsList: [...this.data.goodsList, ...res.goods]
    })
    // 关闭下拉刷新的窗口
    wx.stopPullDownRefresh()

  },
  // 标题点击事件，从子组件中传递过来的
  handleTabsItemChange(e) {
    // 1.获取被点击的标题索引
    const {
      index
    } = e.detail
    // 2.修改源数组
    let {
      tabs
    } = this.data
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    // 3.赋值到data中
    this.setData({
      tabs
    })
  },
  // 页面上滑 滚动条触底事件
  onReachBottom() {
    // 判断是否有下一页数据
    if (this.queryParams.pagenum >= this.totalPages) {
      wx.showToast({
        title: '没有下一页数据',
        icon: 'none',
      });
    } else {
      this.queryParams.pagenum++
      this.getGoodsList()
    }
  },
  // 下拉刷新
  onPullDownRefresh() {
    // 重置数组
    this.setData({
      goodsList: []
    })
    // 重置页码
    this.queryParams.pagenum = 1
    this.getGoodsList()
  }

})