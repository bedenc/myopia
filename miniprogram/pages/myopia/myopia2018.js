// miniprogram/pages/myopia/myopia2018.js
Page({

  /**
   * 页面的初始数据
   */
  locate: {
    "district": [{
        "school": [{
            "code": "01",
            "name": "郭守敬小学"
          },
          {
            "code": "02",
            "name": "邢台市第二十五中学"
          },
          {
            "code": "03",
            "name": "邢台市第十九中学"
          },
          {
            "code": "04",
            "name": "邢台市第十二中学"
          },
          {
            "code": "05",
            "name": "邢台市第五中学"
          },
          {
            "code": "06",
            "name": "邢台市第二十三中学"
          },
          {
            "code": "07",
            "name": "邢台市技师学院"
          }
        ],
        "code": "01",
        "name": "桥西区"
      },
      {
        "school": [{
            "code": "01",
            "name": "平乡县第一中学"
          },
          {
            "code": "02",
            "name": "平乡县滏阳中学"
          },
          {
            "code": "03",
            "name": "平乡县油召中学"
          },
          {
            "code": "04",
            "name": "平乡县县直第一小学"
          },
          {
            "code": "05",
            "name": "常河镇中心小学"
          },
          {
            "code": "06",
            "name": "平乡县中学"
          }
        ],
        "code": "02",
        "name": "平乡县"
      }
    ]
  },
  data: {
    multiArray: [],
    multiIndex: [0, 0],
    instruction:""
  },
  bindMultiPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },

  bindMultiPickerColumnChange(e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    //更新滑动的第几列e.detail.column的数组下标值e.detail.value
    data.multiIndex[e.detail.column] = e.detail.value;

    if (e.detail.column == 0) {
      data.multiIndex[0] = e.detail.value;
      data.multiArray[1] = this.locate.district[e.detail.value].school;
      console.log(data.multiArray)
    } else {
      data.multiIndex[1] = e.detail.value;
    }
    this.setData(data);
  },

  queryMyopia: function(e) {
    var index = [this.data.multiIndex[0] + 1, this.data.multiIndex[1]+1];
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
        this.setData({
          instruction: JSON.stringify(res.result)
        })
      },
      fail: err => {
        console.error('[云函数] [query] 调用失败', err)
        wx.navigateTo({
          url: '../index/index',
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var temp = this.locate;
    this.setData({
        multiArray: [temp.district, temp.district[0].school],
        multiIndex: [0, 0]
      },
      console.log(temp)
    )
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