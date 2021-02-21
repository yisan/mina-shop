import {
  request
} from '../../request/index'
//Page Object
Page({
  data: {
    swiperList: [],
    categoryList: [],
    // 楼层数据
    floorList: []
  },
  // 页面开始加载，就会触发
  onLoad: function (options) {
    this.getSwiperList()
    this.getCategoryList()
    this.getFloorList()
  },
  // 获取轮播图数据
  async getSwiperList() {
    const res = await request({
      url: '/home/swiperdata'
    })
    this.setData({
      swiperList: res
    })
  },
  async getCategoryList() {
    const res = await request({
      url: '/home/catitems'
    })
    this.setData({
      categoryList: res
    })
  },
  async getFloorList() {
    const res = await request({
      url: '/home/floordata'
    })
    console.log(res);
    this.setData({
      floorList: res
    })
  }
});