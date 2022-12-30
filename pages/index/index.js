const app = getApp();

Page({
  data: {
    hasReason: false, //有答案
    isInit: true, //是否第一次进入应用
    searchKey: "",
    question: "",
    reason: ""
  },

  //页面显示获取设备屏幕高度，以适配scroll-view组件高度
  onShow() {
    wx.getSystemInfo({
      success: (res) => {
        //80为顶部搜索框区域高度 rpx转px 屏幕宽度/750
        this.setData({
          scrollHeight: res.windowHeight - (100 * res.windowWidth / 750)
        });
      }
    })
  },

  //搜索输入框输入取值
  searchInputEvent(e) {
    this.setData({
      searchKey: e.detail.value
    });
  },
  
  //搜索按钮点击事件
  searchClickEvent() {
    if (!this.data.searchKey) {
      wx.showToast({
        title: '请输入题目',
        icon: 'none',
        duration: 1000
      });
      return;
    }
    this.setData({
      isInit: false
    })
    wx.request({
      url: app.globalData.API_BASE + "/search",
      data: {
        token: 'free',
        question: this.data.searchKey
      },
      success: res => {
        console.log(res)
        if (res.statusCode === 200 && res.data.code == 0) {
          this.setData({
            question: res.data.data.reasonList[0].question,
            reason: res.data.data.reasonList[0].reason,
            hasReason: true
          })
        } else{
          this.setData({
            hasReason: false,
            question: this.data.searchKey,
            reason: "暂无结果，我们已经收到您的需求，请过段时间再次前来查询。"
          })
          console.error('错误，请联系管理员');
        }
      },
    })
  }
});
