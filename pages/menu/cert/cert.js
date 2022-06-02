// pages/my/cert/cert.js
Page({
    data: {
    },
    onLoad() {
        console.log(!wx.getStorageSync('userinfo')=='')
    }
})