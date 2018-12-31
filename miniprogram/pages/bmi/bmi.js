// miniprogram/pages/bmi/bmi.js
var bmitab = {
  '6': [13.2, 13.4, 16.4, 17.7, 12.8, 13.1, 16.2, 17.5],
  "6.5": [13.4, 13.8, 16.7, 18.1, 12.9, 13.3, 16.5, 18],
  "7": [13.5, 13.9, 17, 18.7, 13, 13.4, 16.8, 18.5],
  "7.5": [13.5, 13.9, 17.4, 19.2, 13, 13.5, 17.2, 19],
  "8": [13.6, 14, 17.8, 19.7, 13.1, 13.6, 17.6, 19.4],
  "8.5": [13.6, 14, 18.1, 20.3, 13.1, 13.7, 18.1, 19.9],
  "9": [13.7, 14.1, 18.5, 20.8, 13.2, 13.8, 18.5, 20.4],
  "9.5": [13.8, 14.2, 18.9, 21.4, 13.2, 13.9, 19, 21],
  "10": [13.9, 14.4, 19.2, 21.9, 13.3, 14, 19.5, 21.5],
  "10.5": [14, 14.6, 19.6, 22.5, 13.4, 14.1, 20, 22.1],
  "11": [14.2, 14.9, 19.9, 23, 13.7, 14.3, 20.5, 22.7],
  "11.5": [14.3, 15.1, 20.3, 23.6, 13.9, 14.5, 21.1, 23.3],
  "12": [14.4, 15.4, 20.7, 24.1, 14.1, 14.7, 21.5, 23.9],
  "12.5": [14.5, 15.6, 21, 24.7, 14.3, 14.9, 21.9, 24.5],
  "13": [14.8, 15.9, 21.4, 25.2, 14.6, 15.3, 22.2, 25],
  "13.5": [15, 16.1, 21.9, 25.7, 14.9, 15.6, 22.6, 25.6],
  "14": [15.3, 16.4, 22.3, 26.1, 15.3, 16, 22.8, 25.9],
  "14.5": [15.5, 16.7, 22.6, 26.4, 15.7, 16.3, 23, 26.3],
  "15": [15.8, 16.9, 22.9, 26.6, 16, 16.6, 23.2, 26.6],
  "15.5": [16, 17, 23.1, 26.9, 16.2, 16.8, 23.4, 26.9],
  "16": [16.2, 17.3, 23.3, 27.1, 16.4, 17, 23.6, 27.1],
  "16.5": [16.4, 17.5, 23.5, 27.4, 16.5, 17.1, 23.7, 27.4],
  "17": [16.6, 17.7, 23.7, 27.6, 16.6, 17.2, 23.8, 27.6],
  "17.5": [16.8, 17.9, 23.8, 27.8, 16.7, 17.3, 23.9, 27.8],
  "18": [18.1, 18.5, 24, 28, 17.2, 18.5, 24, 28],
};
Page({

  /**
   * 页面的初始数据
   */

  
  data: {
    age: 0,
    bmi: 0,
    target:0,
    btype:"",
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
//[options.age.toString
    var that = this;
    var sg=options.sg;
    var tz=options.tz;
    var age = bmitab[options.age];
    var temp = tz*10000/(sg*sg);
    var s = options.sex * 4;
    tz = Math.round((sg * sg *22)/1000)/10;
    temp = Math.round(temp*10)/10;
    that.setData({
      bmi:temp,
      target:tz,
    })

    console.log(age, options.age);
    if(temp <= age[s]){
      this.setData({btype:"中度消瘦",})
    } else if (temp <= age[s+1]){
      this.setData({ btype: "轻度消瘦", })
    }else if(temp >= age[s+3]){
      this.setData({ btype: "肥胖", })
    } else if (temp >= age[s + 2]){
      this.setData({ btype: "超重", })
    }else {
      this.setData({ btype: "正常范围", })
    };

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