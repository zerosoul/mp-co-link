// index.js
// 获取应用实例
import request from '../../utils/request';
import { showToast } from '../../utils/util';
const app = getApp()

Page({
  data: {

  },
  // 事件处理函数
  handleWechatLogin() {
    wx.showLoading({
      title: '正在登陆',
      mask: true,
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
                if (res.data.status === 1) {
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
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
