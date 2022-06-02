App({
  globalData: {
    tapID: null,
  },
  
  onLaunch() {
    //  云开发环境初始化
    wx.cloud.init({
      env: "cloud1-4g8zgsp8753a10d4"
    })

    // 获取胶囊信息
    let menuButtonObject = wx.getMenuButtonBoundingClientRect()
    console.log(menuButtonObject)
    // 获取设备信息
    wx.getSystemInfo({
      success: res => {
        console.log(res)
        // 整个导航栏的高度
        let navHeight = menuButtonObject.top + menuButtonObject.height + (menuButtonObject.top - res.statusBarHeight) * 2
        // 导航栏的高度
        let nav = navHeight - res.statusBarHeight

        // 挂载到全区变量 globalData 上
        this.globalData.navHeight = navHeight
        this.globalData.nav = nav

        // 胶囊与左边的距离
        this.globalData.menuLeft = menuButtonObject.left
        // 胶囊的高度
        this.globalData.menuHeight = menuButtonObject.height
        // 胶囊距离顶部的高度
        this.globalData.menuBot = menuButtonObject.top - res.statusBarHeight
        // 整个设备的宽度
        this.globalData.windowWidth = res.windowWidth
        console.log(this.globalData);
      },
      fail: err => {
        console.log(err)
      }
    })

  }

})
