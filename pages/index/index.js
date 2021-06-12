// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    list:app.globalData.userList
  },
  // 事件处理函数
  goProfileDetail(evt) {
    console.log(evt);
    const {target:{dataset:{uid}}}=evt;
    wx.navigateTo({
      url: `/pages/profile/index?uid=${uid}`
    })
  },
  onLoad() {
    
  },
  
})
