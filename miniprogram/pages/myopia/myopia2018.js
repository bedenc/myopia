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
          result = result[0];
          this.setData({
            myopia18: result,
          })
          var advice = '';
          var ser = result.spherr + result.cylinr / 2;
          var sel = result.spherl + result.cylinl / 2;
          var a= 0;
          if (ser <= -0.5){
            ser = 1;
          } else if (ser >= 2){
            ser = 4;
          } else {
            ser = 2;
          }
          if (sel <= -0.5) {
            sel = 1;
          } else if (sel >= 2) {
            sel = 4;
          } else {
            sel = 2;
          }
          console.log(ser,sel);
          switch (sel + ser ){
            case 2:
              advice = '屈光不正：双眼近视';
              if (result.visionl <= 4.8 || result.visionr <=4.8){
                advice += '（建议到医院复查） ';
              }else {
                advice += '（需定期随访） ';
              } console.log(ser, sel);
            break;
            case 3:
              if (sel>ser){
                advice = '屈光不正：右眼近视';
              }else{
                advice = '屈光不正：左眼近视';
              }              
              if (result.visionl <= 4.8 || result.visionr <= 4.8) {
                advice += '（建议到医院复查） ';
              } else {
                advice += '（需定期随访） ';
              } console.log(ser, sel);
              break;
            case 4:
              if (result.cylinr <= -1 || result.cylinl <= -1 ){
                advice = '';
              }
              advice = '视力正常,建议定期随访。';
              break;
            case 6:
              if (ser > sel) {
                advice = '屈光不正：右眼远视';
              } else {
                advice = '屈光不正：左眼远视';
              }  
              break;
            case 8:
              advice = '屈光不正：双眼远视 ';
              break;
            case 5:
              advice = '屈光不正：近视 + 远视 ';
              break;            
          }
          if (result.cylinr <= -1 ){
            advice += '右眼散光 ';
          } else if (result.cylinl <= -1 ){
            advice += '左眼散光 ';
          }
          a = Math.abs(result.cylinr - result.cylinl);
          if (a >= 1) {
            advice += '双眼柱镜差有点大，需定期随访;';
          } else if (a >= 1.5) {
            advice += '双眼柱镜差大，建议到医院复查;';
          }
          a = Math.abs(result.spherr - result.spherl);
          if (a >= 1.5) {
            advice += '双眼柱镜差有点大，需定期随访;';
          } else if (a >= 2) {
            advice += '双眼球镜镜差大，建议到医院复查;';
          }
          console.log(advice);
          this.setData({
            instruction: advice,
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