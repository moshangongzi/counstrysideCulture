const app = getApp()
Page({
    data: {
        state: '',
    },
    onLoad: function (options) {
        this.setData({
            state: wx.getStorageSync('userinfo') == '',
        })
    },

    fabuPicClick: function (e) {
        wx.navigateTo({
            url: '../public/publicPic/publicPic',
        })
    },
    fabuVidClick: function (e) {
        wx.navigateTo({
            url: '../public/publicVid/publicVid',
        })
    },
    joinActivity: function (e) {
        app.globalData.tapID = 2
        wx.switchTab({
            url: '../index/index',
        });
    },
})