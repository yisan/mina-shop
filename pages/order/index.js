// pages/order/index.js
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
        value: '全部',
        isActive: true
      },
      {
        id: 1,
        value: '待付款',
        isActive: false
      },
      {
        id: 2,
        value: '待发货',
        isActive: false
      },
      {
        id: 3,
        value: '退款/退货',
        isActive: false
      }
    ],
    orders: []
  },
  onShow() {
    const token = wx.getStorageSync('token');
    if (!token) {
      wx.navigateTo({
        url: '/pages/auth/index',
      });
      return
    }
    // 1.获取当前小程序的页面栈-数组 长度最大为10个页面
    // 2.数组中，索引最大的页面就是当前页面
    let pages = getCurrentPages();
    let currentPage = pages[pages.length - 1]
    const type = currentPage.options.type
    this.changeSelectedByIndex(type - 1)
    this.getOrders(type)
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
    this.getOrders(index + 1)
  },
  async getOrders(type) {
    const {
      orders
    } = await request({
      url: '/my/orders/all',
      data: {
        type
      }
    })
    this.setData({
      // 1.合并对象操作
      // 2.当箭头函数要返回对象的时候，为了区分于代码块，要用 () 将对象包裹起来
      orders: orders.map(v => ({
        ...v,
        create_time_cn: (new Date(v.create_time * 1000).toLocaleString())
      }))
    })
  }
})