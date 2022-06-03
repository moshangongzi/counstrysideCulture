Page({
  data: {
      state:''
  },
  onLoad(){
      this.setData({
          state:wx.getStorageSync('userinfo')=='',
      })
  }  
})