// miniprogram/pages/bmi/bmi.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isg : 120,
    itz: 50,
    age: 0,
    bmi: 0,
    birthshow: false,
    date: ""
  },

  bindDateChange:function(e){
    if (e) {
      this.setData({
        'date': e.detail.value
      })}
  },

  radioChange:function(e){
    if (e.detail.value == "child")
    this.setData({
      'birthshow': true
    });
    else 
      this.setData({
        'birthshow': false
      }); 
  },
  formSubmit:function(e){
    var b = e.detail.value.sg;
    var c = e.detail.value.tz;
    var a = Math.round(c* 100000 / (b * b)) /10;
    this.setData({ 'bmi': a});
    console.log(a,b)    
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