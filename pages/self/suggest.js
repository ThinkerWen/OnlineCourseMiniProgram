// pages/self/suggest.js
const MY_API = 'https://www.hive-net.cn:8443/wechat/suggest/'
Page({
  data: {
    height: 20,
    focus: false,
    mail: '',
    name: '',
    text: ''
  },

  bindButtonTap: function () {
    this.setData({
      focus: true
    })
  },

  bindTextAreaBlur: function (e) {
    console.log(e.detail.value)
  },

  bindFormSubmit: function (e) {
    this.setData({
      mail: e.detail.value.mail,
      name: e.detail.value.name,
      text: e.detail.value.text
    })
    this.sendMail()
  },

  sendMail: function() {
    wx.request({
      url: MY_API,
      method: 'POST',
      data: {
        mail: this.data.mail,
        name: this.data.name,
        text: this.data.text
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