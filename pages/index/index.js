// index.js
// 获取应用实例
// import request from '../../utils/request';
// import { showToast } from '../../utils/util';
const app = getApp()

Page({
  data: {
    profiles: []
  },
  // 事件处理函数
  goProfileDetail(evt) {
    console.log(evt);
    const { currentTarget: { dataset: { uid } } } = evt;
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
                if (res.data.status === 1) {
                  app.globalData.userData = res.data;
                  console.log('app data', app.globalData.userData);
                  wx.request({
                    url: `https://wx.nicegoodthings.com/profiles`,
                    method: 'GET',
                    success: (res) => {
                      console.log("profile list", res.data);
                      const { profiles } = res.data;
                      let transformed = profiles.map(p => {
                        const { location, username, id } = p;
                        const { company = { company: '家里蹲', role: "自由职业者" }, gender, avatar, goodDomainTags = [], goodTopicTags = [] } = JSON.parse(p.content);
                        const addrArr = JSON.parse(location);
                        const addr = addrArr.splice(-2).join('') || addrArr.join('')
                        return { sex: gender, avatar, username, addr, id, tags: [...goodDomainTags, ...goodTopicTags], match: 98, company: company.company, position: company.role }
                      });
                      console.log({ transformed });
                      this.setData({ profiles: transformed })
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
