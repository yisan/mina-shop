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
  onLoad: async function (options) {
    //  1.发送异步请求获取轮播图数据
    const res = await request({
      url: '/home/swiperdata'
    })
    this.setData({
      swiperList: res.data.message
    })
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
      swiperList: res.data.message
    })
  },
  async getCategoryList() {
    const res = await request({
      url: '/home/catitems'
    })
    this.setData({
      categoryList: res.data.message
    })
  },
  async getFloorList() {
    const res = await request({
      url: '/home/floordata'
    })
    console.log(res);
    this.setData({
      floorList: res.data.message
    })
  }
});