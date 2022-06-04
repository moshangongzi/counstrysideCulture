const db = wx.cloud.database()
Page({
    data: {
        state: '',
        video: {},
        testList: [],
        videoList: [],
        collList: [],
        openid: '',
        shoucangSrc2: 'https://636c-cloud1-4g8zgsp8753a10d4-1311372251.tcb.qcloud.la/icons/dynamic/%E6%94%B6%E8%97%8F.png',
    },
    onLoad: function () {
        this.setData({
            state: wx.getStorageSync('userinfo') == '',
        });
        if (!this.data.state) {
            this.getopenid();
        }
    },
    getVideo() {
        console.log('getVideo');
        this.setData({
            testList: []
        })
        if (!this.data.collList.length) {
            this.setData({
                videoList: []
            })
        } else {
            for (var i = 0; i < this.data.collList.length; i++) {
                wx.cloud.database().collection('video')
                    .doc(this.data.collList[i])
                    .get()
                    .then(res => {
                        this.setData({
                            video: res.data
                        })
                        this.data.testList.push(this.data.video);
                        this.setData({
                            videoList: this.data.testList
                        })
                    })
                    .catch(res => {
                        console.log('获取视频数据库失败', res)
                    })
            }
        }


    },
    getopenid() {
        wx.cloud.callFunction({
            name: 'getOpenid'
        }).then(res => {
            this.setData({ openid: res.result.openid });
            this.getUserColl();
            console.log('获取openid函数成功', res.result.openid);
        }).catch(res => {
            console.log('获取openid函数失败', res)
        });
    },
    getUserColl() {
        console.log('getUserColl');
        wx.cloud.database().collection('user')
            .doc(this.data.openid)
            .get()
            .then(res => {
                this.setData({
                    collList: res.data.collection
                })
                this.getVideo();
            })
            .catch(res => {
                console.log('获取登录用户信息失败', res)
            })
    },
    shoucangClick(e) {
        console.log('ok');
        db.collection('video').doc(e.currentTarget.dataset.id).get().then(res => {
            this.data.collList.splice(this.data.collList.indexOf(e.currentTarget.dataset.id), 1);
            console.log(this.data.collList);
            wx.cloud.database().collection('user')
                .doc(this.data.openid)
                .update({
                    data: {
                        collection: this.data.collList
                    }
                })
                .then(res => {
                    console.log('修改成功', res)
                    // 改变数据库中shoucang状态
                    db.collection('video').doc(e.currentTarget.dataset.id).update({
                        // data 传入需要局部更新的数据
                        data: {
                            shoucang: false
                        },
                        success: res => {
                            console.log('success');
                            this.getUserColl()
                        }
                    })
                    
                })
                .catch(res => {
                    console.log('修改失败', res)
                })


        })
    },



})