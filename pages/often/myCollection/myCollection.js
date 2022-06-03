Page({
    data: {
        state: '',
        video:{},
        testList: [],
        videoList: [],
        collList: [
            '61e9c47162971dda01efb05f05a67d50', '61e9c47162971dda01efb06003c1d371','128f646562986624006fc5bb36278578']
    },
    onLoad: function () {
        this.setData({
            state: wx.getStorageSync('userinfo') == '',
        });
        if(!this.data.state){
            this.getVideo();
        }      
    },
    getVideo() {
        for(var i=0;i<this.data.collList.length;i++){
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
})