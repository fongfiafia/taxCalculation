//index.js
//获取应用实例
const app = getApp()

// 在文件顶部声明插屏广告变量
let interstitialAd = null

console.log("index.js loaded");

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
  onShareTimeline: function () {
    return {
      title: '快来算算你的到手工资吧！',
      query: {
        key: value
      },
      imageUrl: ''
    }
  },
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    msgList: [
      { url: "url", title: "本产品近期打算升级！欢迎点击下方：" },
      { url: "url", title: "关于-意见反馈中填写您的意见！" }],
    faqOpen: [false, false, false]
  },
  toSalary: function (e) {
    this.showInterstitialAd()
    setTimeout(() => {
      wx.navigateTo({
        url: '/pages/salary/salary'
      })
    }, 300)  // ���广告一些时间来显示
  },
  toBonus: function (e) {
    this.showInterstitialAd()
    setTimeout(() => {
      wx.navigateTo({
        url: '/pages/bonus/bonus'
      })
    }, 300)  // 给广告一些时间来显示
  },
  onShareAppMessage: function () {
    return {
      title: '工资涨了？个税调整了？快来算算到手多少钱吧！',
      desc: '工资涨了？个税调整了？快来算算到手多少钱吧！',
      imageUrl: '/img/shareTo.jpg'
    }
  },
  // 事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    app.sleep
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    // 创建插屏广告实例
    this.initInterstitialAd()
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  // 显示广告的函数
  showInterstitialAd: function () {
    if (interstitialAd) {
      interstitialAd.show().catch((err) => {
        // console.error('显示插屏广告失败', err)
        // 如果广告显示失败，我们可以尝试重新加载广告
        this.initInterstitialAd()
      })
    } else {
    //   console.log('插屏广告实例不存在')
      // 如果广告实例不存在，我们可以尝试重新创建
      this.initInterstitialAd()
    }
  },

  initInterstitialAd: function () {
    if (wx.createInterstitialAd) {
      interstitialAd = wx.createInterstitialAd({
        adUnitId: 'adunit-06f06e0f191ae37d'
      })
      interstitialAd.onLoad(() => {
        console.log('插屏广告加载成功')
      })
      interstitialAd.onError((err) => {
        // console.error('插屏广告错误', err)
      })
      interstitialAd.onClose(() => {
        // console.log('插屏广告关闭')
      })
    }
  },

  toggleFAQ(e) {
    const index = e.currentTarget.dataset.index;
    const faqOpen = this.data.faqOpen;
    faqOpen[index] = !faqOpen[index];
    this.setData({ faqOpen });

    // 显示插屏广告
    this.showInterstitialAd();
  }
})
