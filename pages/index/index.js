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
    res.forEach(v => {
      v.navigator_url = v.navigator_url.replace(/main/, 'index')
    });
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
    res.forEach(v1 => {
      v1.product_list.forEach(v2 => {
        v2.navigator_url = v2.navigator_url.replace(/\?/, '/index\?')
      })
    });
    this.setData({
      floorList: res
    })
  }
});