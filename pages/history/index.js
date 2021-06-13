// pages/history/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    history:null
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const {uuid,hid}=options;
    wx.request({
      url: `https://wx.nicegoodthings.com/profile/history?id=${uuid}`,
      method: 'GET',
      success: (res) => {
        const {history}=res.data;
        let curr=history.find(h=>h.indexOf(hid)>-1);
        if(curr){
          curr=JSON.parse(curr);
          this.setData({history:curr})
        }
        console.log("history detail", history,curr,hid);
      },

    })
  },
  handleDecline(){
    console.log('handle decline');
  },
  handleAccept(){
    console.log('handle accept');
  }
})