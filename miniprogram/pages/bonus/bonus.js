// pages/bonus/bonus.js
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
    text2: '税后年终奖'
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
    this.setData({
      calFlag : temp
    })
    var shuiQianNum = this.data.shuiQianBonusNum;
    e.detail.value = shuiQianNum;
    this.shuiQianBonus(e);
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
  onLoad: function (){
  }
})