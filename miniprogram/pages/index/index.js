//index.js
const app = getApp()
var sliderWidth = 96;

Page({
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
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    tabs: ["2018近视查询", "BMI计算"],
    activeIndex: 1,
    sliderOffset: 0,
    sliderLeft: 0,
    multiArray: [],
    multiIndex: [0, 0],
    age: 0,
    bmi: 0,
    birthshow: false,
    date: "2013-6",
    radioItems: [
      { name: '成年人', value: 'adult', checked: true },
      { name: '6-18岁青少年', value: 'child' }
    ]
  },
  //{{birthshow?'show':'hide'}}
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindDateChange: function (e) {
    if (e) {
      this.setData({
        'date': e.detail.value
      })
    }
  },

  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var radioItems = this.data.radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }
    this.setData({
      radioItems: radioItems
    });
    if (e.detail.value == 'child') 
      this.setData({
      'birthshow': true
    });
    else
      this.setData({
        'birthshow': false
      }); 
  },
  calbmi: function (e) {
    var b = e.detail.value.sg;
    var c = e.detail.value.tz;
    var a = Math.round(c * 100000 / (b * b)) / 10;
    var d = e.detail.value.
    this.setData({ 'bmi': a });
    console.log(a, b)
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
  onLoad: function() {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },

  onGetUserInfo: function(e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../pages/bmi/bmi',
        })
      }
    })
  },

  // 上传图片
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]
        
        // 上传图片
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath
            
            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
    var temp = this.locate;
    this.setData({
      multiArray: [temp.district, temp.district[0].school],
      multiIndex: [0, 0]
    },
      console.log()
    )
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  }
});
