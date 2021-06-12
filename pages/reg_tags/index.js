// pages/reg_tags/index.js
const app = getApp();

Page({

  /**
   * Page initial data
   */
  data: {
    tags: [
      {tagName: 'item',  active: false},{tagName: 'item',  active: false},{tagName: 'item',  active: false},{tagName: 'item',  active: false},{tagName: 'item',  active: false},{tagName: 'item',  active: false},{tagName: 'item',  active: false},{tagName: 'item',  active: false},{tagName: 'item',  active: false},{tagName: 'item',  active: false},{tagName: 'item',  active: false},{tagName: 'item',  active: false},{tagName: 'item',  active: false}
    ],
    selectedTags: []
  },

  handleItem: function(e) {
    if (this.data.selectedTags.length >= 5) {
      wx.showToast({
        title: '至多选择5个tag哦',
        icon: 'error'
      });
    } else {
      const id = e.currentTarget.dataset.id;
      let newTags = this.data.tags;
      newTags[id].active = !newTags[id].active
      this.setData({
        tags: [...newTags],
        selectedTags: [...this.data.selectedTags, id]
      })
    }
  },

  handleNext() {
    console.log(app.globalData)
    const userData = app.globalData.userData;
    const contentData = {
      gender: userData.content.gender,
      email: userData.content.email,
      avatar: userData.content.avatar,
      tags: this.data.tags.filter((it) => it.active).map((it) => it.tagName)
    };
    console.log(userData)
    wx.request({
      url: 'https://wx.nicegoodthings.com/profile',
      data: {
        username: userData.username,
        location: JSON.stringify(userData.location),
        id: userData.id,
        content: JSON.stringify(contentData)
      },
      method: 'POST',
      success: (res) => {
        if (res.data.status === 1) {
          app.globalData.id = userData.id;
          wx.navigateTo({
            url: '../index/index'
          });
        } else {
          wx.showToast({
            title: '注册失败',
            icon: 'error'
          })
        }
      }
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

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

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})