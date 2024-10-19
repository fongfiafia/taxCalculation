// pages/bonus/bonus.js
let rewardedVideoAd = null
Page({
   /**
   * 页面的初始数据
   */
  data: {
    taxRate: '',
    taxNum: '',
    resultNum: '',
    shuiQianBonusNum: '',
    calFlag: false, // fasle表示正算，true表示反算
    text1: '税前年终奖',
    text2: '税后年终奖',
    clickTimes:0,
    availableCountTimes: 0,
    hideAdvert :true,
    disableHideReverse: ""
    // hideCalculate : true
  },
  // 开启转发到朋友圈功能
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '快来算算你的到手工资吧！',
      path: '/pages/index.js'
    }
  },
  onShareTimeline: function () {
    return {
      title: '快来算算你的到手工资吧！',
      query: {
        key: value
      },
      imageUrl: ''
    }
  },
  onLoad: function (options){
    this.setData({
      availableCountTimes : getApp().globalData.availableCountTimes
     })

     if (getApp().globalData.availableCountTimes == 0 ) {
       this.setData({
         hideAdvert: false,
         disableHideReverse: "any str"
       })
     }

     if(wx.createRewardedVideoAd){
      rewardedVideoAd = wx.createRewardedVideoAd({ adUnitId: 'adunit-9eda0049b868a58e' })
      rewardedVideoAd.onLoad(() => {
        console.log('onLoad event emit')
      })
      rewardedVideoAd.onError((err) => {
        console.log('onError event emit', err)
      })
      rewardedVideoAd.onClose((res) => {
        if (res && res.isEnded) {
          console.log("complete jiesu ")
            this.setData({
              availableCountTimes : 10,
              hideAdvert: true,
              disableHideReverse: "",
            })
            getApp().globalData.availableCountTimes = 10
        } else {
          console.log("interupt jiesu ")
        }
      })
    }
  },
  
  shuiQianBonus: function(e) {
    var temp = e.detail.value;
    var taxNumTemp = 0;
    var resultNumTemp = 0;
    var calFlag = this.data.calFlag;
    var text1 = '';
    var text2 = '';
    if (!calFlag){
      taxNumTemp = parseInt(temp * 0.03).toFixed(2);
      resultNumTemp = temp - taxNumTemp;
      text1 = '税前年终奖';
      text2 = '税后年终奖';
    } else {
      resultNumTemp = parseInt(temp / 0.97).toFixed(2);
      taxNumTemp = resultNumTemp - temp;
      text1 = '税后年终奖';
      text2 = '税前年终奖';
    }
    this.setData({
      shuiQianBonusNum : e.detail.value,
      taxRate : '3%',
      taxNum: taxNumTemp,
      resultNum: resultNumTemp,
      text1: text1,
      text2: text2
    })
  },
  reverse: function(e) {
    var temp = e.detail.value;
    var curAvailableCountTimes = this.data.availableCountTimes - 1 
    if ( curAvailableCountTimes == 0) {
      this.setData({
        hideAdvert : false,
        disableHideReverse: "any str"
      })
    } 
    this.setData({
      calFlag : temp,
      availableCountTimes: curAvailableCountTimes
    })

    getApp().globalData.availableCountTimes = curAvailableCountTimes
    var shuiQianNum = this.data.shuiQianBonusNum;
    e.detail.value = shuiQianNum;
    this.shuiQianBonus(e);
  },
  watchAdvert: function(e) {
    rewardedVideoAd.show()
    .catch(() => {
        rewardedVideoAd.load()
        .then(() => rewardedVideoAd.show())
        .catch(err => {
          console.log('激励视频 广告显示失败')
        })
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '工资涨了？个税调整了？快来算算到手多少钱吧！',
      desc: '工资涨了？个税调整了？快来算算到手多少钱吧！',
      imageUrl: '/img/shareTo.jpg'
    }
  },

})