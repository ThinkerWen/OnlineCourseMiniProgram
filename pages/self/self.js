var app = getApp();
const API_URL = 'http://localhost/swzl/shiwu/';
Page({
  data: {
    userInfo: {},
    openid: null
  },

  bindGetUserInfo: function (e) {
  },

  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
        })
      }
    })
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
    var that = this;

    app.getUserProfil(function (userInfo) {
      that.setData({
        userInfo: userInfo
      })
    })
  }
})