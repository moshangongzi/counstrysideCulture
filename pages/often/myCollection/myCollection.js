Page({
    data: {
        videoList: [],
        collList: ['61e9c47162971dda01efb05f05a67d50', '61e9c47162971dda01efb06003c1d371']
    },
    onLoad: function () {
        this.getVideo();
    },
    getVideo() {
        wx.cloud.database().collection('video')
        .doc('61e9c47162971dda01efb05f05a67d50')
            .get()
            .then(res => {
                this.setData({
                    videoList: res.data
                })
                console.log('获取视频数据库成功', res)
            })
            .catch(res => {
                console.log('获取视频数据库失败', res)
            })
    }
})