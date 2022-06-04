const App = getApp()
const db = wx.cloud.database()
Page({
    data: {
        openid: '',
        aid: '',
        collArr: [],
        headerTitleName: [
            { name: '推荐', id: 1 },
            { name: '活动', id: 2 },
            { name: '分类', id: 3 },
        ],
        swiperList: [
            { id: 1, imgUrl: 'https://636c-cloud1-4g8zgsp8753a10d4-1311372251.tcb.qcloud.la/images/index/banner.jpg?sign=442718cbffef7b5e91216bf88e49f387&t=1654148945' },
            { id: 2, imgUrl: 'https://636c-cloud1-4g8zgsp8753a10d4-1311372251.tcb.qcloud.la/images/index/banner1.jpg?sign=6479335791cbac973d259e1677a68864&t=1654148994' },
            { id: 3, imgUrl: 'https://636c-cloud1-4g8zgsp8753a10d4-1311372251.tcb.qcloud.la/images/index/banner2.jpg?sign=72a97ecd8b45e938efc252b74c32f952&t=1654149060' },
            { id: 4, imgUrl: 'https://636c-cloud1-4g8zgsp8753a10d4-1311372251.tcb.qcloud.la/images/index/banner3.jpg?sign=8e4cc878812860c89698862a851b91c7&t=1654149073' }
        ],
        videoList: [],
        randomArray: [],
        categoryList: [{
            id: 1,
            firstCateName: '广场舞',
            secondCate: [{
                id: '1_1',
                name: '16步',
            },
            {
                id: '1_2',
                name: '32步'
            },
            {
                id: '1_3',
                name: '步子舞'
            },
            {
                id: '1_4',
                name: '中三舞'
            }
            ]
        },
        {
            id: 2,
            firstCateName: '健身',
            secondCate: [{
                id: '2_1',
                name: '健身操',
            },
            {
                id: '2_2',
                name: '瘦肚子舞'
            },
            {
                id: '2_3',
                name: '形体'
            },
            {
                id: '2_4',
                name: '懒人操'
            },
            {
                id: '2_5',
                name: '颈椎舞',
            },
            {
                id: '2_6',
                name: '瑜伽'
            },
            {
                id: '2_7',
                name: '全身暴汗'
            },
            {
                id: '2_8',
                name: '拍打操'
            },
            ]
        },
        {
            id: 3,
            firstCateName: '流行舞',
            secondCate: [{
                id: '3_1',
                name: '水兵舞',
            },
            {
                id: '3_2',
                name: '鬼步舞'
            },
            {
                id: '3_3',
                name: '爵士舞'
            },
            {
                id: '3_4',
                name: '现代舞'
            },
            {
                id: '3_5',
                name: '肚皮舞',
            },
            {
                id: '3_6',
                name: '形体舞'
            },
            {
                id: '3_7',
                name: '古典舞'
            },
            {
                id: '3_8',
                name: '恰恰舞'
            },
            {
                id: '3_9',
                name: '拉丁舞'
            },
            ]
        },
        ],
        actList: [],
        dianzan: false,
        dianzanID: 0, // 每一次点赞的id
        dianzanList: [],
        dianzanIDList: [], // 记录点赞过的视频id
        dianzanSrc1: 'https://636c-cloud1-4g8zgsp8753a10d4-1311372251.tcb.qcloud.la/icons/dynamic/dianzan.png',
        dianzanSrc2: 'https://636c-cloud1-4g8zgsp8753a10d4-1311372251.tcb.qcloud.la/icons/dynamic/%E7%82%B9%E8%B5%9E.png',
        shoucang: false,
        shoucangSrc1: 'https://636c-cloud1-4g8zgsp8753a10d4-1311372251.tcb.qcloud.la/icons/dynamic/shoucang.png',
        shoucangSrc2: 'https://636c-cloud1-4g8zgsp8753a10d4-1311372251.tcb.qcloud.la/icons/dynamic/%E6%94%B6%E8%97%8F.png',
        swiperIndex: '1/4',
        topPic: [],
        tapID: 1, // 判断是否选中
        navHeight: ''
    },

    onLoad: function () {
        this.setData({
            navHeight: App.globalData.navHeight,
        });
        this.getopenid();
        this.getVideo();
        this.random();
        this.getAct();
    },

    onShow: function () {
        if (App.globalData.tapID) {
            this.setData({
                tapID: App.globalData.tapID,
            })
        }
    },

    // headerBar 点击
    headerTitleClick: function (e) {
        this.setData({ tapID: e.target.dataset.id })
    },

    handleSwiperChange: function (e) {
        this.setData({
            swiperIndex: `${e.detail.current + 1}/4`
        })
    },
    random() {
        for (var i = 0; i < 10; i++) {
            this.setData({
                ['randomArray[' + i + ']']: Math.floor(Math.random() * 37),
            })
        }
    },
    getVideo() {
        wx.cloud.callFunction({
            name: 'getVideo'
        })
            .then(res => {
                this.setData({
                    videoList: res.result.data
                })
            })
            .catch(res => {
                console.log('获取视频数据库失败', res)
            })
    },
    //获取活动
    getAct() {
        wx.cloud.database().collection('activities').get()
            .then(res => {
                this.setData({
                    actList: res.data
                })
                console.log('获取活动数据库成功', res.data)
            })
            .catch(err => {
                console.log('获取活动数据库失败', err)
            })
    },
    // 点赞和取消点赞
    dianzanClick(e) {
        // 获取点赞的视频的id，
        // console.log(e.currentTarget.dataset.id);
        // 根据点赞视频的id，更新视频的点赞属性为true
        let flag = true
        db.collection('video').doc(e.currentTarget.dataset.id).get().then(res => {
            // 如果dianzan为true，改成false
            if (res.data.dianzan) {
                flag = false
            }

            db.collection('video').doc(e.currentTarget.dataset.id).update({
                // data 传入需要局部更新的数据
                data: {
                    dianzan: flag
                },
                success: res => {
                    console.log(res)
                    this.getVideo()
                }
            })
        })

    },
    shoucangClick(e) {
        let flag = true
        db.collection('video').doc(e.currentTarget.dataset.id).get().then(res => {
            if (res.data.shoucang) {
                flag = false
            } else {
                this.setData({
                    coll: e.currentTarget.dataset.id
                });
                this.data.collArr.push(this.data.coll);
                wx.cloud.database().collection('user')
                    .doc(this.data.openid)
                    .update({
                        data: {
                            collection: this.data.collArr
                        }
                    })
                    .then(res => {
                        console.log('修改成功', res)
                    })
                    .catch(res => {
                        console.log('修改失败', res)
                    })
            }
            db.collection('video').doc(e.currentTarget.dataset.id).update({
                // data 传入需要局部更新的数据
                data: {
                    shoucang: flag
                },
                success: res => {
                    this.getVideo()
                }
            })
        })
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
    //获取用户收藏
    getUserColl() {
        wx.cloud.database().collection('user')
            .doc(this.data.openid)
            .get()
            .then(res => {
                if (res.data.collection) {
                    this.setData({
                        collArr: res.data.collection
                    })
                    console.log('获取登录用户信息成功', res.data.collection)
                } else {
                    console.log('用户收藏夹为空')
                }

            })
            .catch(res => {
                console.log('获取登录用户信息失败', res)
            })
    }

})