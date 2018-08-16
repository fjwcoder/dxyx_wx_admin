//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    
    // 获取用户信息
    wx.getSetting({
      success: res => {

        if (!res.authSetting['scope.userInfo']) {
          wx.redirectTo({
            url: '/pages/auth/auth',
          })
        }

      }
    })
  },

  globalData: {
    userInfo: null,
    // adminInfo: null,
    userSession: null,
    userAuth: null,
    hasUserInfo: false,
  },
  globalInfo: {
    requestUrl: 'https://mall.dxyxshop.com/wxapp',	
    
  },

  // 登录、授权
  getUserInfo: function(cb){
    var that = this
    if(this.globalData.userSession){
      typeof cb == "function" && cb(this.globalData.userInfo, this.globalData.userSession)
    }else{
      wx.getUserInfo({
        success: res=>{
console.log(res)
          var encryptedData = res.encryptedData
          var iv = res.iv
          this.globalData.userInfo = res.userInfo
          that.globalData.userInfo = res.userInfo

          if(this.globalData.userInfo){
            // 登录
            wx.login({
              success: res => {
console.log(res);
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                if(res.code){
                  // 发起网络请求
                  wx.request({
                    url: this.globalInfo.requestUrl+'/login/login',
                    data: {code: res.code, encryptedData: encryptedData, iv: iv},
                    success: res=> {
console.log(res);
                      if(res.status){
                        that.globalData.userSession = res.userSession
                        that.globalData.hasUserInfo = true
                        typeof cb == "function" && cb(that.globalData.userInfo, that.globalData.userSession, that.globalData.hasUserInfo)
                      }else{
                        // 登录失败或用户已锁定
                        wx.redirectTo({
                          url: '/pages/error/error',
                        })
                      }
                    },
                    fail: function(e){
                      console.log('third server error')
                    }
                  })
                }else{
                  console.log('login code error')
                }





              }
            })
          }else{
            console.log('获取用户信息失败')
          }
        },
        fail: res => {
          wx.redirectTo({
            url: '/pages/auth/auth',
          })
        } // end fail
      })

    }
  }

})