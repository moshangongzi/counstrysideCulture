const App = getApp()
Page({
    data: {
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
        activityList: [{
                id: 1,
                title: "2021中华广场舞大赛",
                imgUrl: 'https://636c-cloud1-4g8zgsp8753a10d4-1311372251.tcb.qcloud.la/images/index/activity.jpg?sign=49b4b4168a4ddc8cd71b237c70e3b89d&t=1654149148'
            },
            {
                id: 2,
                title: "2022湖南省广场舞大赛",
                imgUrl: 'https://636c-cloud1-4g8zgsp8753a10d4-1311372251.tcb.qcloud.la/images/index/activity1.jpg?sign=dc68f592377d12320f50ef27a557b8e2&t=1654149159'
            },
            {
                id: 3,
                title: "社区广场舞大赛",
                imgUrl: 'https://636c-cloud1-4g8zgsp8753a10d4-1311372251.tcb.qcloud.la/images/index/activity2.jpg?sign=42b40c63f95a8b43619210f98604aec0&t=1654149170'
            },
            {
                id: 4,
                title: "2022全国广场舞总决赛",
                imgUrl: 'https://636c-cloud1-4g8zgsp8753a10d4-1311372251.tcb.qcloud.la/images/index/activity3.jpg?sign=934b593975dad174b29d2e6e03b463a9&t=1654149181'
            },
        ],
        swiperIndex: '1/4',
        topPic: [],
        tapID: 1, // 判断是否选中
        navHeight: ''
    },

    onLoad: function() {
        this.setData({
            navHeight: App.globalData.navHeight,
        });
        this.getVideo();
        this.random()
    },

    onShow: function() {
        if (App.globalData.tapID) {
            this.setData({
                tapID: App.globalData.tapID,
            })
        }
    },

    // headerBar 点击
    headerTitleClick: function(e) {
        this.setData({ tapID: e.target.dataset.id })
    },

    handleSwiperChange: function(e) {
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
                    // console.log('获取视频数据库成功', res.result.data)
            })
            .catch(res => {
                console.log('获取视频数据库失败', res)
            })
    }

})