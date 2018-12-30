// miniprogram/pages/myopia/myopia2018.js
Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    multiArray: [],
    multiIndex: [0, 0],
    instruction: ""   
  },
  

  queryMyopia: function(e) {
    var index = [this.data.multiIndex[0] + 1, this.data.multiIndex[1] + 1];
    // 调用云函数
    wx.cloud.callFunction({
      name: 'query',
      data: {
        "index": index,
        "id3": e.detail.value.id3,
        "name": e.detail.value.name
      },
      success: res => {
        console.log('[云函数] [query] user openid: ', res.result)
        var myopia18 = res.result.data;
        var eerr = res.result.errMsg;
        console.log(myopia18, eerr);
        if (myopia18.length != 1) {
          if (err.search("ok")) {
            this.setData({
              instruction: "居然没查到"
            })
          } else {
            this.setData({
              instruction: "网络问题，过会再试"
            })
          }
          return
        }
        this.setData({
          instruction: JSON.stringify(myopia18[0])
        })
      },
      fail: err => {
        console.error('[云函数-query] 网络有问题？？', err)
        this.setData({
          instruction: '哎呀，网络有问题'
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})