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
    const {uid}=options;
    console.log({options,uid});
    wx.request({
      url: `https://wx.nicegoodthings.com/profile?id=${uid}`,
      method: 'GET',
      success: (res) => {
        console.log("profile detail",res.data);
        const {location,username,content}=res.data;
        let {avatar,goodDomainTags=[],goodTopicTags=[],interestDomainTags=[],interestTopicTags=[]}=JSON.parse(content);
        let tmp={skilled:[...goodTopicTags,goodDomainTags],commonAttentions:[...interestTopicTags,...interestDomainTags],location:JSON.parse(location).join(''),username,avatar,company:'奋斗',position:"全干工程师",match:99};
        this.setData({profile:tmp})

      },
   
    })
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