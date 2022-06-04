Page({
    data: {
        state: '',
        video:{},
        testList: [],
        videoList: [],
        collList: []
    },
    onLoad: function () {
        this.setData({
            state: wx.getStorageSync('userinfo') == '',
        });
        if(!this.data.state){
            this.getopenid();      
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
    },
    getopenid() {
        wx.cloud.callFunction({
            name: 'getOpenid'
        }).then(res => {
            this.setData({ openid: res.result.openid });
            this. getUserColl();
            console.log('获取openid函数成功', res.result.openid);
        }).catch(res => {
            console.log('获取openid函数失败', res)
        });
    },
    getUserColl(){
        wx.cloud.database().collection('user')
            .doc(this.data.openid)
            .get()
            .then(res=>{
                this.setData({
                    collList:res.data.collection
                })
                this.getVideo();   
            })
            .catch(res=>{
                console.log('获取登录用户信息失败',res)
            })
    }
})