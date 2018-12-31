// miniprogram/pages/myopia/myopia2018.js
Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    index:"",
    id3:"",
    name:"",
    instruction: "",
    myopia18: {
      "age": "",
      "glasstype": "-",
      "visionl": "-",
      "visionr": "-",
      "glassl": "-",
      "glassr": "-",
      "okl": "-",
      "okr": "-",
      "spherl": "-",
      "spherr": "-",
      "cylinl": "-",
      "cylinr": "-",
      "axisl": "-",
      "axisr": "-",
    }
  },
  

  onLoad: function(e) {
    // 调用云函数
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {
      wx.cloud.callFunction({
        name: 'query',
        data: {
          "point": e.point,
          "school": e.school,
          "id3": e.id3,
          "name": e.name
        },
        success: res => {
          console.log('[云函数] [query] : ', res.result )
          var result = res.result.data;
          var eerr = res.result.errMsg;
          console.log(result, eerr);
          if (result.length != 1) {
            if (eerr.search("ok")) {
              this.setData({
                instruction: "居然没查到,请检查信息是否有误"
              })
            } else {
              this.setData({
                instruction: "网络问题，过会再试"
              })
            }
            return
          }
          this.setData({
            myopia18: result[0],
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