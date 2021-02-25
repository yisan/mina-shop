// pages/cart/index.js
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
    let totalPrice = 0
    let totalNum = 0
    let allChecked = true
    const address = wx.getStorageSync('address')
    const cart = wx.getStorageSync('cart') || [];
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
      address,
      cart,
      allChecked,
      totalNum,
      totalPrice
    })
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
  // 复选框点击事件
  handleItemChange(e) {
    // 获取被修改的商品的id
    const goods_id = e.currentTarget.dataset.id
    console.log(goods_id);
  }
})