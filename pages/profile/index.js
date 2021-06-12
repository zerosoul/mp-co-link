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
        // const {profiles}=res.data;
        // this.setData({profiles:profiles.map(p=>{
        //   const {location,username,id}=p;
        //       const {gender,avatar,tags}=JSON.parse(p.content);
        //   return {sex:gender,avatar,username,addr:JSON.parse(location).join('') ,uuid:id,tags,match:98,company:'字节跳动',position:'前端工程师'}
        // })})
      },
   
    })
    // const currProfile=app.globalData.userList.find(u=>u.uuid==uid)
    // this.setData({currProfile})
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