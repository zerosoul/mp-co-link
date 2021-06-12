// index.js
// 获取应用实例
import request from '../../utils/request';
import { showToast } from '../../utils/util';
const app = getApp()

Page({
  data: {

  },
  // 事件处理函数
  goProfileDetail(evt) {
    console.log(evt);
    const {target:{dataset:{uid}}}=evt;
    wx.navigateTo({
      url: `/pages/profile/index?uid=${uid}`
    })
    wx.getUserProfile({
      lang: 'zh_CN',
      desc: '数据仅用于当前小程序使用',
      success: (res) => {
        console.log(app.globalData)
        app.globalData.userInfo = JSON.parse(res.rawData);
        wx.hideLoading({
          success: (res) => {
            wx.navigateTo({
              url: '../reg/index',
            })
          },
        })
      },
      fail: (e) => {
        wx.hideLoading();
      }
    });
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
                  console.log('app data', app.globalData.userData)
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
