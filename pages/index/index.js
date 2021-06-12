// index.js
// 获取应用实例
// import request from '../../utils/request';
// import { showToast } from '../../utils/util';
const app = getApp()

Page({
  data: {
    profiles:[]
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
    wx.login({
      success: (res) => {
        wx.request({
          url: 'https://wx.nicegoodthings.com/wx/login',
          data: {
            'jscode': res.code
          },
          success: (it) => {
            wx.request({
              url: 'https://wx.nicegoodthings.com/profile',
              data: {
                id: it.data.openid 
              },
              method: 'GET',
              success: (res) => {
                if (res.data.status === 0) {
                  app.globalData.userData = res.data;
                  console.log('app data', app.globalData.userData);
                  wx.request({
                    url: `https://wx.nicegoodthings.com/profiles`,
                    method: 'GET',
                    success: (res) => {
                      console.log("profile list",res.data);
                      const {profiles}=res.data;
                      let transformed=profiles.map(p=>{
                        const {location,username,id}=p;
                        const {gender,avatar,tags}=JSON.parse(p.content);
                        return {sex:gender,avatar,username,addr:JSON.parse(location).join('') ,id,tags,match:98,company:'字节跳动',position:'前端工程师'}
                      });
                      console.log({transformed});
                      this.setData({profiles:transformed})
                    },
                 
                  })
                } else {
                  wx.navigateTo({
                    url: '../landing/index'
                  })
                }
              }
            })
          }
        });
      }
    });
  },
  
})
