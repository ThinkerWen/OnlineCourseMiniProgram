App({

  globalData: {
    API_BASE: "https://www.hive-net.cn/backend/wangke",
    userInfo: null,
    openid: ''
  },

  //用户自定义的全局数据，可以通过var app = getApp()获取app实例，再通过     app.globalData.userInfo获取数据
  getUserProfile: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      wx.getUserProfile({
        desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        withCredentials: false,
        success: (res) => {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
      console.log(globalData.userInfo)
    }
  },

  onLaunch: function () {
    var that = this
    // 小程序开启后调登录接口
    // login.login(this);

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        if (res.code) {
          //发起网络请求
          wx.request({
            // url替换为自己的登录接口
            url: 'https://www.hive-net.cn/example',
            data: {
              code: res.code
            },
            method: 'POST',
            header: {'content-type': 'application/json'},
            success: res => {
              if (res.statusCode == 200) {
                if (!res.data['identify']){
                  console.log('错误，请联系管理员')
                  return;
                }
                that.globalData.openid = res.data['identify']
              } else {
                console.log(res.errMsg)
              }
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              that.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

})