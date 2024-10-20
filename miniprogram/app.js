//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.cloud.init({
      traceUser: true,
    })
  },
  globalData: {
    availableCountTimes: 2,
    adviceCount:0,
  },
  getCurrentTime:function(e) {
    //获取当前时间并打印
　　let yy = new Date().getFullYear();
　　let mm = new Date().getMonth()+1;
　　let dd = new Date().getDate();
　　let hh = new Date().getHours();
　　let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
　　let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
　  return yy+'/'+mm+'/'+dd+' '+hh+':'+mf+':'+ss;
  },
})