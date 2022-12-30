// pages/self/suggest.js
var md5Util = require('../../utils/md5.js')
const MY_API = 'https://www.hive-net.cn/funtools/system/suggest'
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
    var timestamp = new Date().getTime();
    var sign = this.signature(timestamp);
    wx.request({
      url: MY_API,
      method: 'POST',
      data: {
        contact: this.data.mail,
        name: this.data.name,
        content: this.data.text,
        timestamp: timestamp,
        sign: sign
      },
      success: res => {
        if (res.statusCode == 200 && res.data.code == 0) {
            wx.showToast({
              title: '已收到您的建议，我们会尽快回复',
              icon: 'none',
              duration: 1000
            });
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
  },

  signature: function(timestamp) {
    // 加密方法隐藏
    // Example
    var sign = md5Util.hexMD5(timestamp);
    console.log(sign);
    return sign;
  }
})