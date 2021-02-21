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
    //  1.发送异步请求获取轮播图数据
    var reqTask = wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
      data: {},
      success: (result) => {
        this.setData({
          swiperList: result.data.message
        })
      },
    });
    this.getSwiperList()
    this.getCategoryList()
    this.getFloorList()
  },
  // 获取轮播图数据
  getSwiperList() {
    request({
      url: '/home/swiperdata'
    }).then(result => {
      this.setData({
        swiperList: result.data.message
      })
    })
  },
  getCategoryList() {
    request({
      url: '/home/catitems'
    }).then(result => {
      this.setData({
        categoryList: result.data.message
      })
    })
  },
  getFloorList() {
    request({
      url: '/home/floordata'
    }).then(result => {
      console.log(result);
      this.setData({
        floorList: result.data.message
      })
    })
  }
});