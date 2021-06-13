// pages/appointment/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    addr:"",
    from:null,
    to:null,
    startDate: null,
    startTime:null,
    endDate:null,
    endTime:null
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const {fid,tid}=options;
    this.setData({from:fid,to:tid})
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },
bindTimeChange(evt){
  const {target:{dataset:{type}},detail:{value}}=evt;
  console.log({type});
  switch(type){
    case 'start':
      this.setData({startTime:value});
      break;
    case 'end':
      this.setData({endTime:value})
      break;
    default:
      break;
  }
},
handleSubmit(){
  const {addr,from,to,startDate,startTime,endDate,endTime}=this.data;
  const params={addr,from,to,range:{
    from:`${startDate} ${startTime}`,
    to:`${endDate} ${endTime}`
  }}
  console.log({params});
},
handleAddrChange(evt){
  const {detail:{value}}=evt;
  this.setData({addr:value})
},
bindDateChange(evt){
  const {target:{dataset:{type}},detail:{value}}=evt;
  console.log({type});
  switch(type){
    case 'start':
      this.setData({startDate:value});
      break;
    case 'end':
      this.setData({endDate:value})
      break;
    default:
      break;
  }
}
})