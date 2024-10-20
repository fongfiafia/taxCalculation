// pages/salary/salary.js
let rewardedVideoAd = null

// 在 Page 对象外部定义税率表
const taxRates = [
  { limit: 36000, rate: 0.03, deduction: 0 },
  { limit: 144000, rate: 0.1, deduction: 2520 },
  { limit: 300000, rate: 0.2, deduction: 16920 },
  { limit: 420000, rate: 0.25, deduction: 31920 },
  { limit: 660000, rate: 0.3, deduction: 52920 },
  { limit: 960000, rate: 0.35, deduction: 85920 },
  { limit: Infinity, rate: 0.45, deduction: 181920 }
];

Page({
  /**
   * 页面的初始数据
   */
  data: {
    cities: ['北京', '上海', '深圳', '广州',
      '天津', '南京', '武汉', '杭州',
      '重庆', '济南', '西安', '成都',
      '苏州', '南昌', '太原', '石家庄'],
    gongJiJins: ['12', '11', '10', '9', '8', '7',
      '6', '5', '4', '3', '2', '1'
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
    specialDecreNum: 0, // 专项附加除
    result: 0,
    startPoint: 5000, // 起征点 固定的
    wuXianYiJin: 0,
    hideview: true,
    hideAdvert: true,
    hideCalculate: false,
    availableCountTimes: 0,
    showBaseModal: false,
    currentPeriod: 1,
    showPeriodPicker: false,
    tempPeriod: 1,
    sheBaoBase: 0,
    gongJiJinBase: 0,
    gongJiJinRate: 0,
    wuXianYiJin: 0,
    sheBaoResult: 0,
    gongJiJinResult: 0,
    accumulatedTaxableIncome: 0,
    applicableRate: 0,
    quickDeduction: 0,
    accumulatedTax: 0,
    showConfetti: false,
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
  watchAdvert: function (e) {
    rewardedVideoAd.show()
      .catch(() => {
        rewardedVideoAd.load()
          .then(() => rewardedVideoAd.show())
          .catch(err => {
            console.log('激励视频 广告显示失败')
          })
      })
  },
  detail: function (e) {
    this.setData({
      modalName: 'DialogModal1',
      modalContent: '子女教育：每个子女1000元\n继续教育：400元/月\n住房贷款利息：1500元/月\n' +
        '住房租金：1500元/月\n赡养老人：2000元/月\n大病医疗：限额80000元'
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
  gongJiJinBaseChange: function (e) {
    this.setData({
      gongJiJinIndex: e.detail.value
    })
  },
  // 计算主体
  calculate: function (e) {
    const shuiQianSalaryNum = parseFloat(this.data.shuiQianSalaryNum);
    const wuXianYiJin = parseFloat(this.data.wuXianYiJin);
    const specialDecreNum = parseFloat(this.data.specialDecreNum) || 0;
    const currentPeriod = this.data.currentPeriod;

    let accumulatedTax = 0;
    let totalTaxableIncome = 0;
    let applicableRate, quickDeduction;

    for (let month = 1; month <= currentPeriod; month++) {
      // 计算当月累计应纳税所得额
      totalTaxableIncome += shuiQianSalaryNum - wuXianYiJin - specialDecreNum - 5000;

      // 查找适用税率和速算扣除数
      for (const { limit, rate, deduction } of taxRates) {
        if (totalTaxableIncome <= limit) {
          applicableRate = rate;
          quickDeduction = deduction;
          break;
        }
      }

      // 计算当月应缴税额
      const monthlyTax = totalTaxableIncome * applicableRate - quickDeduction - accumulatedTax;
      accumulatedTax += monthlyTax;
    }

    // 计算当月应缴税额（最后一个月的税额）
    const currentMonthTax = accumulatedTax - (currentPeriod > 1 ? (totalTaxableIncome - (shuiQianSalaryNum - wuXianYiJin - specialDecreNum - 5000)) * applicableRate - quickDeduction : 0);

    // 计算到手工资
    const netSalary = shuiQianSalaryNum - wuXianYiJin - currentMonthTax;

    // 更新页面数据
    this.setData({
      hideview: false,
      accumulatedTaxableIncome: totalTaxableIncome.toFixed(2),
      applicableRate: (applicableRate * 100).toFixed(2),
      quickDeduction: quickDeduction.toFixed(2),
      accumulatedTax: accumulatedTax.toFixed(2),
      taxResult: currentMonthTax.toFixed(2),
      result: netSalary.toFixed(2),
    });

    // 处理广告逻辑
    let nowAvailableCountTimes = this.data.availableCountTimes - 1;
    let hideAdvert = this.data.hideAdvert;
    let hideCalculate = this.data.hideCalculate;
    if (nowAvailableCountTimes == 0) {
      hideAdvert = false;
      hideCalculate = true;
    }
    getApp().globalData.availableCountTimes = nowAvailableCountTimes;
    this.setData({
      availableCountTimes: nowAvailableCountTimes,
      hideAdvert: hideAdvert,
      hideCalculate: hideCalculate,
    });

    // 显示礼花动画
    this.setData({ showConfetti: true });
    this.showConfettiAnimation();
  },

  showResult: function (e) {
    this.setData({
      hideview: false
    })
  },
  shuiQianSalary: function (e) {
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
  wuXianYiJinInput(e) {
    // 处理五险一金输入
    const value = e.detail.value;
    this.setData({
      wuXianYiJin: value
    });
  },

  showBaseModal() {
    this.setData({
      showBaseModal: true
    });
  },

  hideBaseModal() {
    this.setData({
      showBaseModal: false
    });
  },

  sheBaoBaseInput(e) {
    this.setData({
      sheBaoBase: parseFloat(e.detail.value) || 0
    });
    this.calculateInsurance();
  },

  gongJiJinBaseInput(e) {
    this.setData({
      gongJiJinBase: parseFloat(e.detail.value) || 0
    });
    this.calculateInsurance();
  },

  gongJiJinRateInput(e) {
    this.setData({
      gongJiJinRate: parseFloat(e.detail.value) || 0
    });
    this.calculateInsurance();
  },

  calculateInsurance() {
    const { sheBaoBase, gongJiJinBase, gongJiJinRate } = this.data;

    // 社保计算
    const pension = sheBaoBase * 0.08;
    const medical = sheBaoBase * 0.02;
    const unemployment = sheBaoBase * 0.005;
    const sheBaoTotal = pension + medical + unemployment;

    // 公积金计算
    const gongJiJinTotal = gongJiJinBase * (gongJiJinRate / 100);

    // 五险一金总和
    const wuXianYiJinTotal = sheBaoTotal + gongJiJinTotal;

    this.setData({
      sheBaoResult: sheBaoTotal.toFixed(2),
      gongJiJinResult: gongJiJinTotal.toFixed(2),
      wuXianYiJin: wuXianYiJinTotal.toFixed(2)
    });
  },

  confirmBaseChange() {
    this.calculateInsurance();
    this.hideBaseModal();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("ddd" + getApp().globalData.availableCountTimes)
    if (getApp().globalData.availableCountTimes == 0) {
      this.setData({
        hideAdvert: false,
        hideCalculate: true
      })
    }

    this.setData({
      availableCountTimes: getApp().globalData.availableCountTimes
    })

    if (wx.createRewardedVideoAd) {
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
            availableCountTimes: 10,
            hideCalculate: false,
            hideAdvert: true,
          })
          getApp().globalData.availableCountTimes = 10
        } else {
          console.log("interupt jiesu ")
        }
      })
    }

    // 设置当前期数为当前月份
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // getMonth() 返回 0-11
    this.setData({
      currentPeriod: currentMonth
    });
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
    return {
      title: '工资涨了？个税调整了？快来算算到手多少钱吧！',
      desc: '工资涨了？个税调整了？快来算算到手少钱吧！',
      imageUrl: '/img/shareTo.jpg'
    }
  },

  showPeriodPicker() {
    this.setData({
      showPeriodPicker: true,
      tempPeriod: this.data.currentPeriod
    });
  },

  hidePeriodPicker() {
    this.setData({
      showPeriodPicker: false
    });
  },

  periodChange(e) {
    const val = e.detail.value;
    this.setData({
      tempPeriod: val[0] + 1
    });
  },

  confirmPeriodChange() {
    this.setData({
      currentPeriod: this.data.tempPeriod,
      showPeriodPicker: false
    });
    // 这里可以添加其他需要根据期数变化而更新的逻辑
  },

  // 添加新的函数来处理礼花动画
  showConfettiAnimation: function () {
    const ctx = wx.createCanvasContext('confetti');
    const canvasWidth = wx.getSystemInfoSync().windowWidth;
    const canvasHeight = wx.getSystemInfoSync().windowHeight;

    let confetti = [];
    const confettiCount = 100;
    const gravity = 0.5;
    const terminalVelocity = 5;
    const drag = 0.075;
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff'];

    // 初始化礼花
    for (let i = 0; i < confettiCount; i++) {
      confetti.push({
        color: colors[Math.floor(Math.random() * colors.length)],
        dimensions: {
          x: Math.random() * 10 + 5,
          y: Math.random() * 10 + 5,
        },
        position: {
          x: Math.random() * canvasWidth,
          y: Math.random() * canvasHeight - canvasHeight,
        },
        rotation: Math.random() * 360,
        scale: Math.random(),
        velocity: {
          x: Math.random() * 6 - 3,
          y: Math.random() * 3 + 3,
        },
      });
    }

    // 动画函数
    const animate = () => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      confetti.forEach((confetto, index) => {
        let width = confetto.dimensions.x * confetto.scale;
        let height = confetto.dimensions.y * confetto.scale;

        // 移动礼花
        confetto.velocity.x -= confetto.velocity.x * drag;
        confetto.velocity.y = Math.min(confetto.velocity.y + gravity, terminalVelocity);
        confetto.velocity.x += Math.random() > 0.5 ? Math.random() : -Math.random();

        confetto.position.x += confetto.velocity.x;
        confetto.position.y += confetto.velocity.y;

        if (confetto.position.y >= canvasHeight) confetto.position.y = -height;
        if (confetto.position.x > canvasWidth) confetto.position.x = 0;
        if (confetto.position.x < 0) confetto.position.x = canvasWidth;

        // 绘制礼花
        ctx.fillStyle = confetto.color;
        ctx.beginPath();
        ctx.moveTo(confetto.position.x, confetto.position.y);
        ctx.lineTo(confetto.position.x + width, confetto.position.y + height / 2);
        ctx.lineTo(confetto.position.x, confetto.position.y + height);
        ctx.closePath();
        ctx.fill();
      });

      ctx.draw();
      requestAnimationFrame(animate);
    };

    // 开始动画
    animate();

    // 5秒后停止动画
    setTimeout(() => {
      this.setData({ showConfetti: false });
    }, 5000);
  },
})
