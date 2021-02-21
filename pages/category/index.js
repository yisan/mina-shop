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
    rightMenuContent: []
  },
  // 不放在data里考虑其不与渲染层交互，临时存储，省资源
  categoryList: [],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCategoryList()
  },
  //  获取分类数据
  getCategoryList() {
    request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/categories'
    }).then(result => {
      console.log(result);
      this.categoryList = result.data.message
      // 构造左侧大菜单数据
      let leftMenuList = this.categoryList.map(v => v.cat_name)
      let rightMenuContent = this.categoryList[0].children

      console.log(leftMenuList);
      console.log(rightMenuContent);
      this.setData({
        leftMenuList,
        rightMenuContent
      })
    })
  }
})