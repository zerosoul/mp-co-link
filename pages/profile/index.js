// pages/profile/index.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    profile: null
  },
  getCommonTags(tags1 = [], tags2 = []) {
    let tmps = [];
    for (let index = 0; index < tags2.length; index++) {
      if (tags1.includes(tags2[index])) {
        tmps.push(tags2[index])
      }

    }
    return tmps;
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const { uid } = options;
    console.log({ options, uid });
    const { goodDomainTags = [], goodTopicTags = [], interestDomainTags = [], interestTopicTags = [] } = JSON.parse(app.globalData.userData.content);
    const currTags = [...goodDomainTags, ...goodTopicTags, ...interestDomainTags, ...interestTopicTags];
    wx.request({
      url: `https://wx.nicegoodthings.com/profile?id=${uid}`,
      method: 'GET',
      success: (res) => {
        console.log("profile detail", res.data);
        const { id, location, username, content } = res.data;
        let { avatar, company = {}, goodDomainTags = [], goodTopicTags = [], interestDomainTags = [], interestTopicTags = [] } = JSON.parse(content);
        let commons = this.getCommonTags(currTags, [...goodDomainTags, ...goodTopicTags, ...interestDomainTags, ...interestTopicTags])
        let tmp = { id, skilled: [...goodTopicTags, goodDomainTags], commonAttentions: commons, location: JSON.parse(location).join(''), username, avatar, company: company.company, position: company.role, match: 99 };
        this.setData({ profile: tmp })
      },

    })
  },

  // method
  sayHello() {
    console.log("say hello");
    wx.showToast({
      title: 'hello there',
      duration: 2000,
      mask: true,
    })
  },
  haveCoffee(evt) {
    const { target: { dataset: { uid } } } = evt;

    console.log("have a coffee", this.data.profile);
    wx.navigateTo({
      url: `/pages/appointment/index?fid=${app.globalData.userData.id}&tid=${uid}`,
    })
  }
})