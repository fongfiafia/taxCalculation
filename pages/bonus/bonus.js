// pages/bonus/bonus.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    taxRate: '',
    taxNum: '',
    resultNum: '',
    shuiQianBonusNum: '',
    calFlag: false // fasle表示正算，true表示反算
  },
  shuiQianBonus: function(e) {
    var temp = e.detail.value;
    var taxNumTemp = 0;
    var resultNumTemp = 0;
    var calFlag = this.data.calFlag;
    if (!calFlag){
      taxNumTemp = parseInt(temp * 0.03).toFixed(2);
      resultNumTemp = temp - taxNumTemp;
    } else {
      resultNumTemp = parseInt(temp / 0.97).toFixed(2);
      taxNumTemp = resultNumTemp - temp;
    }
    this.setData({
      shuiQianBonusNum : e.detail.value,
      taxRate : '3%',
      taxNum: taxNumTemp,
      resultNum: resultNumTemp
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
  }
})