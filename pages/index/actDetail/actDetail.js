Page({
    data: {
        state: '',
        aid: '',
        activity: {},
    },
    onLoad(options) {
        this.setData({
            state: wx.getStorageSync('userinfo') == '',
            aid: options.aid
        });
        this.getAct();
    },
    getAct() {
        wx.cloud.database().collection('activities')
            .doc(this.data.aid).get()
            .then(res => {
                this.setData({
                    activity: res.data
                })
            })
            .catch(err => {
                console.log('获取活动数据库失败', err)
            })
    },
    btn() {
        wx.showToast({
            icon: 'none',
            title: '请联系客服确认相关信息后再参加~',
        })
    }
})