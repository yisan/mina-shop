/**
 * promise 形式 showModal
 * @param {content} param0 
 */
export const showModal = ({
  content
}) => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: '提示',
      content: content,
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    });
  })
}

/**
 * promise 形式 showToast
 * @param {title} param0 
 */
export const showToast = ({
  title
}) => {
  return new Promise((resolve, reject) => {
    wx.showToast({
      title: title,
      icon: 'none',
      duration: 1500,
      mask: true,
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    });
  })
}