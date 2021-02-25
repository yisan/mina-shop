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