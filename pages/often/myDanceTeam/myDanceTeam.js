Page({
    data: {
        state: '',
        isShow: true,
        danceTeam: {}
    },
    onLoad() {
        this.setData({
            state: wx.getStorageSync('userinfo') == '',
        })
        if (!this.data.state) {
            this.getopenid()
        }
    },
    getopenid() {
        wx.cloud.callFunction({
            name: 'getOpenid'
        }).then(res => {
            this.setData({ openid: res.result.openid });
            this.getDanceTeam();
            console.log('获取openid函数成功', res.result.openid);
        }).catch(res => {
            console.log('获取openid函数失败', res)
        });
    },
    //获取用户舞团
    getDanceTeam() {
        wx.cloud.database().collection('danceTeam')
            .where({
                uid: this.data.openid
            })
            .get()
            .then(res => {
                this.setData({
                    danceTeam: res.data
                })
                if (this.data.danceTeam==''){
                    this.setData({
                        isShow:false
                    })
                }
            })
            .catch(res => {
                console.log('获取用户舞团信息失败', res)
            })
    }

})