Page({
    data: {
        id: '113143',
        tel: '13323440987',
        state:''
    },
    onLoad(){
        this.setData({
            state:wx.getStorageSync('userinfo')=='',
        })
    },
    loginout() {
        wx.showModal({
            title: '提示',
            content: '您确定要退出登录吗',
            success: function (res) {
                if (res.confirm) {//这里是点击了确定以后
                    console.log('用户点击确定')
                    wx.removeStorageSync('userinfo');
                    wx.switchTab({
                        url: '/pages/my/my'
                    })
                } else {
                    console.log('用户点击取消')
                }
            }
        })
    }
})