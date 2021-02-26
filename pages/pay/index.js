// pages/pay/index.js
import {
  request
} from '../../request/index';
import {
  showModal,
  showToast,
  requestPayment
} from '../../utils/asyncWx';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0,
  },
  onShow() {
    const address = wx.getStorageSync('address')
    let cart = wx.getStorageSync('cart') || [];
    cart = cart.filter(v => v.checked)
    this.setData({
      address
    })
    let totalPrice = 0
    let totalNum = 0
    // 计算全选
    // every 数组方法 ：遍历 接收一个回调函数 每个回调函数都返回true 那么every方法返回true
    // 只要有一个回调函数返回false 就不再循环执行，直接返回false
    // 空数组 调用 every 返回值是false
    // const allChecked = cart.length ? cart.every(v => v.checked) : false
    cart.forEach(item => {
      totalPrice += item.goods_price
      totalNum += item.num
    });
    this.setData({
      cart,
      totalNum,
      totalPrice,
      address
    })
  },
  // 点击支付
  async handleOrderPay() {
    try {
      // 1.判断缓存中是否有token
      const token = wx.getStorageSync('token')
      console.log(token);
      if (!token) {
        wx.navigateTo({
          url: '/pages/auth/index',
        });
        return
      }
      // 2.创建订单
      // 2.1 请求头参数
      // const header = {
      //   Authorization: token
      // }
      // 2.2 请求体参数
      const order_price = this.data.totalPrice
      const consignee_addr = this.data.address.all
      const cart = this.data.cart
      let goods = []
      cart.forEach(v => goods.push({
        goods_id: v.goods_id,
        goods_number: v.num,
        goods_price: v.goods_price
      }));
      // 2.3 发送请求，创建订单，获取订单编号
      const orderParams = {
        order_price,
        consignee_addr,
        goods
      }
      const {
        order_number
      } = await request({
        url: '/my/orders/create',
        method: 'POST',
        data: orderParams,
        // header
      })
      console.log(order_number);
      // 3.预支付接口请求
      const {
        pay
      } = await request({
        url: '/my/orders/req_unifiedorder',
        method: 'POST',
        // header,
        data: {
          order_number
        }
      })
      // 4.发起微信支付
      await requestPayment(pay)
      // 5.查询后台订单状态
      await request({
        url: '/my/orders/chkOrder',
        method: 'POST',
        // header,
        data: {
          order_number
        }
      })
      showToast({
        title: '支付成功'
      })
      // 本地移除已经支付到商品
      let newCart = wx.getStorageSync('cart')
      newCart = newCart.filter(v => !v.checked)
      wx.wx.setStorageSync('cart', newCart)

      // 跳转到订单页面
      wx.navigateTo({
        url: '/pages/order/index',
      });
    } catch (error) {
      showToast({
        title: '支付失败'
      })
    }
  }

})