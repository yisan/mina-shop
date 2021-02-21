// pages/category/index.js
import {
  request
} from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftMenuList: [],
    rightMenuContent: [],
    currentIndex: 0,
    // 右侧内容的滚动条距离顶部的距离
    scrollTop: 0
  },
  // 不放在data里考虑其不与渲染层交互，临时存储，省资源
  categoryList: [],

  /**
   * 生命周期函数--监听页面加载
   * 
   */
  onLoad: function (options) {
    // 1.先判断有没有旧数据
    // 2.没有，发送新请求
    // 3.有旧的数据，并且没有过期，使用本地存储的旧数据
    // 获取本地存储数据
    const cates = wx.getStorageSync('cates')
    if (!cates) {
      this.getCategoryList()
    } else {
      // 有旧的数据 定义过期时间 5分钟
      if (Date.now() - cates.time > 1000 * 300) {
        this.getCategoryList()
      } else {
        this.categoryList = cates.data
        let leftMenuList = this.categoryList.map(v => v.cat_name)
        let rightMenuContent = this.categoryList[0].children
        this.setData({
          leftMenuList,
          rightMenuContent
        })
      }
    }
  },
  // 左侧菜单点击事件
  handleItemTap(e) {
    // 1.获取被点击的标题的索引
    // 2.给currentIndex赋值
    // 3.根据不同的索引来渲染右侧的商品内容
    const {
      index
    } = e.currentTarget.dataset
    let rightMenuContent = this.categoryList[index].children
    this.setData({
      currentIndex: index,
      rightMenuContent,
      // 从新设置右侧内容的scroll-view 距离顶部的距离
      scrollTop: 0
    })
  },

  //  获取分类数据
  async getCategoryList() {
    const res = await request({
      url: '/categories'
    })
    this.categoryList = res.data.message
    // 将数据存储到本地
    wx.setStorageSync('cates', {
      time: Date.now(),
      data: this.categoryList
    });
    // 构造左侧大菜单数据
    let leftMenuList = this.categoryList.map(v => v.cat_name)
    let rightMenuContent = this.categoryList[0].children

    this.setData({
      leftMenuList,
      rightMenuContent
    })
  }
})