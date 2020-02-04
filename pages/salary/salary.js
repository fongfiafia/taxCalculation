// pages/salary/salary.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cities: ['北京', '上海', '深圳', '广州',
            '天津','南京','武汉','杭州',
            '重庆','济南','西安','成都',
            '苏州','南昌','太原','石家庄'],
    gongJiJins:['12','11','10','9','8','7',
             '6','5','4','3','2','1' 
              ],
    taxResult: 0,
    sheBaoResult: 0,
    gongjiJinResult: 0,
    cityIndex: 0,
    gongJiJinIndex: 0,
    shuiQianSalaryNum: 0, // 税前工资
    sheBaoBaseNum: 0, // 社保基数
    gongJiJinBaseNum: 0, // 公积金基数
    additionGongJiJinRate: 0, // 补充公积金比例
    specialDecreNum: 0, // 专项附加扣除
    result: 0,
    startPoint: 5000, // 起征点 固定的
    wuXianYiJin: 0,
    hideview: true
  },
  detail: function (e) {
    wx.showModal({
      content: '子女教育：每个子女1000元 \n 继续教育：400元/月 \n 住房贷款利息：1500元/月 \n'+
                '住房租金:1500元/月 \n 赡养老人：2000元/月 \n 大病医疗：限额80000元/年',
    })
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  bindCountryChange: function (e) {
    this.setData({
      cityIndex: e.detail.value
    })
  },
  gongJiJinBaseChange: function(e){
    this.setData({
      gongJiJinIndex: e.detail.value
    })
  },
  // 计算主体
  calculate: function (e) {
    // 计算社保相关
    var temp = this.data.shuiQianSalaryNum;
    var yangLaoTemp = temp * 0.08;
    var yiliaoTemp = temp * 0.02;
    var shiyeTemp = temp * 0.005;
    this.setData({
      sheBaoResult: yangLaoTemp + yiliaoTemp + shiyeTemp
    })

    let gongJiJinNum = this.data.gongJiJins[this.data.gongJiJinIndex];
    if (gongJiJinNum == null){
      gongJiJinNum = 1;
    }
    var gongjiJinResult = this.data.shuiQianSalaryNum * gongJiJinNum * 0.01; // 需要缴纳的公积金
    
    let money_before = this.data.shuiQianSalaryNum - this.data.startPoint - this.data.specialDecreNum
                       - this.data.shuiQianSalaryNum * gongJiJinNum * 0.01 - this.data.sheBaoResult; 
      // 税改前需纳税计算
      if (money_before <= 0) {
        this.money_before = 0;
      } else if (money_before > 0 && money_before <= 3000) {
        this.money_before = money_before * 0.03;
      } else if (money_before > 3000 && money_before <= 12000) {
        this.money_before = money_before * 0.1 - 210;
      } else if (money_before > 12000 && money_before <= 25000) {
        this.money_before = money_before * 0.2 - 1410;
      } else if (money_before > 25000 && money_before <= 35000) {
        this.money_before = money_before * 0.25 - 2660;
      } else if (money_before > 35000 && money_before <= 55000) {
        this.money_before = money_before * 0.3 - 4410;
      } else if (money_before > 55000 && money_before <= 80000) {
        this.money_before = money_before * 0.35 - 7160;
      } else if (money_before > 80000) {
        this.money_before = money_before * 0.45 - 15160;
      }
    var taxResult = this.money_before; // 缴纳的税金
    taxResult = parseInt(taxResult).toFixed(2); // 保留两位小数
    var result = this.data.shuiQianSalaryNum - this.money_before - this.data.shuiQianSalaryNum * gongJiJinNum * 0.01 - this.data.sheBaoResult;
    result = parseInt(result).toFixed(2);// 保留两位小数

    this.setData({
        hideview: false,
        result: result,
        taxResult: taxResult,
        gongjiJinResult: gongjiJinResult
      })
  },

  showResult: function (e) {
    this.setData({
      hideview: false
    })
  },
  shuiQianSalary:function(e){
    this.setData({
      shuiQianSalaryNum: e.detail.value
    })
  },
  sheBaoBase: function (e) {
    this.setData({
      sheBaoBaseNum: e.detail.value
    })
  },
  gongJiJinBase: function (e) {
    this.setData({
      gongJiJinBaseNum: e.detail.value
    })
  },
  additionGongJiJin: function (e) {
    this.setData({
      additionGongJiJinRate: e.detail.value
    })
  },
  specialDecre: function (e) {
    this.setData({
      specialDecreNum: e.detail.value
    })
  },





  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    return{
      title: '工资涨了？个税调整了？快来算算到手多少钱吧！',
      desc: '工资涨了？个税调整了？快来算算到手多少钱吧！',
      imageUrl: '/img/shareTo.jpg'
    }
  }
})