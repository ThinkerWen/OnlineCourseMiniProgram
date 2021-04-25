// pages/introduction/edit.js
var app = getApp()
const MY_API = 'https://www.hive-net.cn/'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: '',
    nickName: '',
    sex: '男',
    ret_sex: 0,
    age: 18,
    school: '',
    qq: '',
    saying: ''
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  bindFormSubmit: function (e) {
    console.log("IN");
    this.setData({
      nickName: e.detail.value.nickname,
      sex: e.detail.value.sex,
      age: e.detail.value.age,
      school: e.detail.value.school,
      qq: e.detail.value.qq,
      saying: e.detail.value.saying
    })
    console.log("ok");
    this.setData({
      ret_sex: this.data.sex=='男' ? 0 : 1
    })
    this.setUser();
  },

  setUser: function() {
    wx.request({
      url: MY_API,
      method: 'POST',
      data: {
        openid: app.globalData.openid,
        nickName: this.data.nickName,
        sex: this.data.ret_sex,
        age: this.data.age,
        school: this.data.school,
        qq: this.data.qq,
        saying: this.data.saying
      },
      success: res => {
        if (res.statusCode === 200) {
          if(!res.data){
            wx.showToast({
              title: '错误，请联系管理员',
              icon: 'none',
              duration: 1000
            });
            return;
          }
        } else{
          wx.showToast({
            title: '错误，请联系管理员',
            icon: 'none',
            duration: 1000
          });
          console.error('错误，请联系管理员');
        }
      },
    })
  }
})

