//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '顶鲜优选商城管理员小程序',
    userInfo: {},
    hasUserInfo: app.globalData.hasUserInfo,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log(app.globalData.hasUserInfo);
    wx.showToast({
      title: '加载…',
      icon: 'loading',
      duration: 1000
    })
    var that = this
    app.getUserInfo(function(userInfo, userSession, hasUserInfo){
      //更新数据
      app.globalData.userSession = userSession
      app.globalData.hasUserInfo = hasUserInfo
      app.globalData.userInfo = userInfo

      console.log(app.globalData)
    })

  },

  onShow: function(){
    // console.log('onshow');
  },

  // getUserInfo: function(e) {
  //   console.log(e);
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // }
})
