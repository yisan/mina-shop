// pages/cart/index.js
import {
  showModal
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
    allChecked: false
  },
  onShow() {
    const address = wx.getStorageSync('address')
    const cart = wx.getStorageSync('cart') || [];
    this.setData({
      address
    })
    this.updateCart(cart)
  },
  // 点击收货地址
  handleChooseAddress() {
    wx.chooseAddress({
      success: (result) => {
        result.all = result.provinceName + result.cityName + result.countyName + result.detailInfo
        wx.setStorageSync('address', result)
      }
    });
  },
  // 商品选中
  handleItemChange(e) {
    // 获取被修改的商品的id
    const goods_id = e.currentTarget.dataset.id
    console.log(goods_id);
    let {
      cart
    } = this.data
    let index = cart.findIndex(v => v.goods_id === goods_id)
    cart[index].checked = !cart[index].checked
    this.updateCart(cart)
  },
  // 全选按钮
  handleCheckedAll(e) {
    let {
      cart,
      allChecked
    } = this.data
    allChecked = !allChecked
    cart.forEach(v => v.checked = allChecked);
    this.updateCart(cart)
  },
  // 数量加减操作
  async handleItemNumEdit(e) {
    let {
      operation,
      id
    } = e.currentTarget.dataset
    let {
      cart
    } = this.data
    const index = cart.findIndex(v => v.goods_id === id)
    if (cart[index].num === 1 && operation === -1) {
      const res = await showModal({
        content: '您是否要删除？'
      })
      if (res.confirm) {
        cart.splice(index, 1)
        this.updateCart(cart)
      }
    } else {
      cart[index].num += operation
      this.updateCart(cart)
    }

  },
  // 设置购物车选中状态，重新计算
  updateCart(cart) {
    let allChecked = true
    let totalPrice = 0
    let totalNum = 0
    // 计算全选
    // every 数组方法 ：遍历 接收一个回调函数 每个回调函数都返回true 那么every方法返回true
    // 只要有一个回调函数返回false 就不再循环执行，直接返回false
    // 空数组 调用 every 返回值是false
    // const allChecked = cart.length ? cart.every(v => v.checked) : false
    cart.forEach(item => {
      if (item.checked) {
        totalPrice += item.goods_price
        totalNum += item.num
      } else {
        allChecked = false
      }
    });
    // 判断数组是否为空 因为如果为空是不会执行 forEach的
    allChecked = cart.length != 0 ? allChecked : false
    this.setData({
      cart,
      allChecked,
      totalNum,
      totalPrice
    })
    wx.setStorageSync('cart', cart);
  }
})