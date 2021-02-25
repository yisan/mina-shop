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
  GoodsInfo: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {
      goods_id
    } = options
    this.getGoodsDetail(goods_id)
  },
  // 点击轮播图，大图预览
  handlePreviewImage() {
    // 先构造要预览的图片数组
    const urls = this.GoodsInfo.pics.map(v => v.pics_mid)
    wx.previewImage({
      current: urls[0],
      urls: urls,

    });
  },
  // 添加到购物车
  handleCartAdd() {
    let cart = wx.getStorageSync('cart') || []
    let index = cart.findIndex(v => v.goods_id === this.GoodsInfo.goods_id)
    if (index === -1) {
      // 不存在 第一次添加
      this.GoodsInfo.num = 1
      this.GoodsInfo.checked = true
      cart.push(this.GoodsInfo)
    } else {
      cart[index]++
    }
    wx.setStorageSync('cart', cart);
    wx.showToast({
      title: '添加成功',
      icon: 'none',
      mask: true
    });
  },
  async getGoodsDetail(goods_id) {
    const goodsInfo = await request({
      url: '/goods/detail',
      data: {
        goods_id
      }
    })
    this.GoodsInfo = goodsInfo
    console.log(goodsInfo);
    this.setData({
      goodsInfo: {
        goods_name: goodsInfo.goods_name,
        goods_price: goodsInfo.goods_price,
        // iphone部分手机，不识别webp图片格式
        // 最后后台修改
        // 临时 ： 确保后台存在 1.webp => 1.jpg
        // goods_introduce: goodsInfo.goods_introduce,
        goods_introduce: goodsInfo.goods_introduce.replace(/\.webp/g, '.jpg'),
        pics: goodsInfo.pics
      }
    })
  }
})