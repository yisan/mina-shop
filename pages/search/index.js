// pages/search/index.js
import {
  request
} from '../../request/index';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: [],
    // 取消按钮是否隐藏
    isFocus: false,
    inputValue: ''
  },
  timeId: -1,

  handleInput(e) {
    const {
      value
    } = e.detail
    if (!value.trim()) {
      this.setData({
        goods: [],
        isFocus: false
      })
      return
    }
    this.setData({
      isFocus: true
    })
    clearTimeout(this.timeId)
    this.timeId = setTimeout(() => {
      this.qsearch(value)
    }, 1000);
  },
  handleCancel() {
    this.setData({
      inputValue: '',
      isFocus: false,
      goods: []
    })
  },
  async qsearch(query) {
    const res = await request({
      url: '/goods/qsearch',
      data: {
        query
      }
    })
    this.setData({
      goods: res
    })
  }
})