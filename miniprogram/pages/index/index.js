//index.js
const app = getApp()
var sliderWidth = 96;

Page({
  locate: {
    "point": [{
        "school": [{
            "code": 1,
            "name": "郭守敬小学"
          },
          {
            "code": 2,
            "name": "第二十五中学"
          },
          {
            "code": 3,
            "name": "第十九中学"
          },
          {
            "code": 4,
            "name": "第十二中学"
          },
          {
            "code": 5,
            "name": "第五中学"
          },
          {
            "code": 6,
            "name": "第二十三中学"
          },
          {
            "code": 7,
            "name": "技师学院"
          },
          {
            "code": 8,
            "name": "第四幼儿园"
          },
          {
            "code": 9,
            "name": "第三幼儿园"
          },
          {
            "code": 9,
            "name": "第五幼儿园"
          }
        ],
        "code": 1,
        "name": "桥西区"
      },
      {
        "school": [{
            "code": 1,
            "name": "第一中学"
          },
          {
            "code": 2,
            "name": "滏阳中学"
          },
          {
            "code": 3,
            "name": "油召中学"
          },
          {
            "code": 4,
            "name": "县直第一小学"
          },
          {
            "code": 5,
            "name": "常河镇中心小学"
          },
          {
            "code": 6,
            "name": "平乡县中学"
          }
        ],
        "code": 2,
        "name": "平乡县"
      }
    ]
  },
  data: {
    tabs: ["2018近视反馈", "BMI计算"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    multiArray: [],
    multiIndex: [0, 0],
    birthshow: false,
    date: "",
    radioItems: [{
        name: '成年人',
        value: 'adult',
        checked: true
      },
      {
        name: '6-18岁青少年',
        value: 'child'
      }
    ],
    sexc: ['男', '女'],
    sex: 0,
    sg:"",
tz:"",
  },

  myopia: function(e) {
    var index = [this.data.multiArray[0][this.data.multiIndex[0]].code, this.data.multiArray[1][this.data.multiIndex[1]].code];
    var name = e.detail.value.name;
    var id3 = e.detail.value.id3;
    var a = RegExp("^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$","i");
    if (!a.test(id3)) {
        wx.showToast({
          title: '身份证号有误',
          duration:3000,
        })
        return;
    }
  //名字、身份证号非空
    if (name && id3) {
      wx.navigateTo({
        url: '../myopia/myopia2018?' + 'id3="' + id3 + '"&name=' + name + '&point=' + index[0] + '&school=' + index[1],
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }
  },

  bindPickerChange: function(e) {
    this.setData({
      sex: e.detail.value,
    })
    console.log('bindPickerChange 更改性别', this.data.sex)
  },

  //{{birthshow?'show':'hide'}}
  bindMultiPickerChange: function(e) {
    console.log('bindMultiPickerChange 更改学校', e.detail.value)
    this.setData({
      multiIndex: e.detail.value,
    })
  },

  bindDateChange: function(e) {
    if (e) {
      this.setData({
        'date': e.detail.value
      })
    }
  },

  radioChange: function(e) {
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

  sginput: function(e) {
    var a = RegExp("^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$");
    if(a.test(e.detail.value)){
      if (e.detail.value > 100 && e.detail.value < 250) 
      return;
    }
      wx.showToast({
        title: '身高超范围',
        duration: 3000,
      });
      this.setData({
        sg:"",
      });
  },


  tzinput: function(e) {
    var a = RegExp("^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$");
    if (a.test(e.detail.value)) {
      if (e.detail.value >20 && e.detail.value < 200)
        return;
    }
      wx.showToast({
        title: '体重超范围',
        duration: 3000,
      });
      this.setData({
        tz:"",
      });
  },

  calbmi: function(e) {
    var sg = e.detail.value.sg;
    var tz = e.detail.value.tz;
    var end = new Date;
    var age = new Date(this.data.date);
    if (age > 0) {
      age = (end - age) / 1000 / 60 / 60 / 24 / 365.25;
      age = Math.round(age * 10);
      if (age % 10 >= 5) {
        age = age + 5 - age % 10;
      } else {
        age = age - age % 10;
      }
      age = age / 10;
      if(age < 6){
        wx.showToast({
          title: '年龄太小不适用',
          duration:3000,
        })
        return;
      }
    } else {
      age = 18;
    }
    if (sg && tz) {
      wx.navigateTo({
        url: '../bmi/bmi' + '?age=' + age + '&sg=' + sg + '&tz=' + tz + '&sex=' + this.data.sex,
      })
    }

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
      data.multiArray[1] = this.locate.point[e.detail.value].school;
      console.log(data.multiArray)
    } else {
      data.multiIndex[1] = e.detail.value;
    }
    this.setData(data);
  },

  onLoad: function() {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
    var temp = this.locate;
    this.setData({
        multiArray: [temp.point, temp.point[0].school],
        multiIndex: [0, 0]
      },
      console.log()
    )
  },
  tabClick: function(e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  }
});