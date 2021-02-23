// pages/goods_detail/index.js
import {
  request
} from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    const {
      goods_id
    } = options
    this.getGoodsDetail(goods_id)
  },
  async getGoodsDetail(goods_id) {
    const goodsInfo = await request({
      url: '/goods/detail',
      data: {
        goods_id
      }
    })
    this.setData({
      goodsInfo
    })
  }
})