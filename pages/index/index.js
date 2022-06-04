const App = getApp()
Page({
    data: {
        openid:'',
        aid:'',
        actArr:[],
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
        dianzanSrc: 'https://636c-cloud1-4g8zgsp8753a10d4-1311372251.tcb.qcloud.la/icons/dynamic/dianzan.png',
        shoucang: false,
        shoucangSrc: 'https://636c-cloud1-4g8zgsp8753a10d4-1311372251.tcb.qcloud.la/icons/dynamic/shoucang.png',
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
                // console.log('获取视频数据库成功', res.result.data)
            })
            .catch(res => {
                console.log('获取视频数据库失败', res)
            })
    },
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
    dianzanClick() {
        if (this.data.dianzan) {
            this.setData({
                dianzan: false,
                dianzanSrc: 'https://636c-cloud1-4g8zgsp8753a10d4-1311372251.tcb.qcloud.la/icons/dynamic/dianzan.png'
            })
        } else {
            this.setData({
                dianzan: true,
                dianzanSrc: 'https://636c-cloud1-4g8zgsp8753a10d4-1311372251.tcb.qcloud.la/icons/dynamic/%E7%82%B9%E8%B5%9E.png'
            })
        }
    },
    shoucangClick(e){
        if (this.data.shoucang) {
            this.setData({
                shoucang: false,
                shoucangSrc: 'https://636c-cloud1-4g8zgsp8753a10d4-1311372251.tcb.qcloud.la/icons/dynamic/shoucang.png'
            })
        } else {
            this.setData({
                shoucang: true,
                shoucangSrc: 'https://636c-cloud1-4g8zgsp8753a10d4-1311372251.tcb.qcloud.la/icons/dynamic/%E6%94%B6%E8%97%8F.png',
                active:e.currentTarget.dataset.id
            })
            this.data.actArr.push(this.data.active);
            wx.cloud.database().collection('user')
            .doc(this.data.openid)
            .update({
                data:{
                    active:this.data.actArr
                }
            })
            .then(res=>{
                console.log('修改成功',res)
            })
            .catch(res=>{
                console.log('修改失败',res)
            })
        }
    },
    getopenid() {
        wx.cloud.callFunction({
            name: 'getOpenid'
        }).then(res => {
            this.setData({ openid: res.result.openid });
            this. getUserAct();
            console.log('获取openid函数成功', res.result.openid);
        }).catch(res => {
            console.log('获取openid函数失败', res)
        });
    },
    getUserAct(){
        wx.cloud.database().collection('user')
            .doc(this.data.openid)
            .get()
            .then(res=>{
                this.setData({
                    actArr:res.data.active
                })
                console.log('获取登录用户信息成功',res)
            })
            .catch(res=>{
                console.log('获取登录用户信息失败',res)
            })
    }

})