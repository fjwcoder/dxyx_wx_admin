//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '登录失败，用户状态锁定',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },



})
