// pages/introduction/introduction.js
var app = getApp();
const API_URL = 'http://localhost/swzl/shiwu/';
const MY_API = 'https://www.hive-net.cn/'
Page({
  data: {
    userInfo: {},
    nickName: '',
    sex: 0,
    age: 18,
    school: '',
    qq: '',
    saying: '',
    edited: 0
  },

  bindGetUserInfo: function (e) {
    console.log(e.detail.userInfo)
  },

  txtMore: function () {
    var that = this;
    var openid = that.data.openid;
    if (openid != null) {
      wx.switchTab({
        url: '../index/index',
      })
    } else {
      console.log('尚未登录');
    }
  },

  onShow: function () {
    var token = wx.getStorageSync('authToken');

  },

  onLoad: function () {
    this.getUser();
    var that = this;

    app.getUserInfo(function (userInfo) {
      that.setData({
        userInfo: userInfo,
        nickName: '王晓文',
        sex: '',
        age: 20,
        school: '烟台大学',
        qq: 296854007,
        saying: '我爱你'
      })
    })
  },

  getUser: function() {
    wx.request({
      url: MY_API,
      data: {
        openid: app.globalData.openid
      },
      success: res => {
        if (res.statusCode === 200) {
          if(!res.data){
            return;
          }
          this.setData({
            nickName: res.data['nickName'],
            sex: res.data['sex']==1 ? '女' : '男',
            age: res.data['age'],
            school: res.data['school'],
            qq: res.data['qq'],
            saying: res.data['saying'],
            edited: 1
          })
        } else{
          console.error('错误，请联系管理员');
        }
      },
    })
  }
})