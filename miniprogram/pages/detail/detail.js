let interstitialAd = null
Page({
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
  // calculate: function(e) {
  //   interstitialAd.show().catch((err) => {
  //     console.error(err)
  //   })
  // },
  onShareTimeline: function () {
    return {
      title: '快来算算你的到手工资吧！',
      query: {
        key: value
      },
      imageUrl: ''
    }
  },
  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 创建插屏广告实例
    // if(wx.createInterstitialAd){
    //   interstitialAd = wx.createInterstitialAd({ adUnitId: 'adunit-5a2e28b484cb5b44' })
    //   interstitialAd.onLoad(() => {
    //     console.log('onLoad event emit')
    //   })
    //   interstitialAd.onError((err) => {
    //     console.log('onError event emit', err)
    //   })
    //   interstitialAd.onClose((res) => {
    //     console.log('onClose event emit', res)
    //   })
    // }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // interstitialAd.show().catch((err) => {
    //   console.error(err)
    // })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})