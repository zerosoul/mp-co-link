// pages/profile/index.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    currProfile:null
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    console.log({options});
    const {uid}=options;
    const currProfile=app.globalData.userList.find(u=>u.uuid==uid)
    this.setData({currProfile})
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

// method
sayHello(){
  console.log("say hello");
  wx.showToast({
    title: 'hello',
    duration: 2000,
    mask: true,
  })
},
haveCoffee(){
  console.log("have a coffee");
  wx.navigateTo({
    url: '/pages/appointment/index',
  })
}
})