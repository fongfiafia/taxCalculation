// pages/feedback/feadback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comment: "",
  },

  submit: function(e){
    console.log("ddddd"+getApp().globalData.adviceCount)
    if (getApp().globalData.adviceCount >= 2){
      return
    }

    if (this.data.comment == "" ) {
      return 
    }
    
    var db = wx.cloud.database()
    db.collection('advice').add({
      data: {
        comment: this.data.comment,
        createTime: db.serverDate()
      }, 
    }).then(res => {
      console.log("insert success")
     var tmpCount =  getApp().globalData.adviceCount
      getApp().globalData.adviceCount = tmpCount + 1

      this.showModal(e)
    })
    .catch(console.error)
  },

  setCommentHandler:function(e){
    this.setData({
      comment: e.detail.value
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

  }
})