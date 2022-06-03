const App = getApp();
const db = wx.cloud.database()
Page({
    data: {
        state:'',
        navTitleName: [
            { id: 1, name: '动态', },
            { id: 2, name: '我的舞团', },
        ],
        dynamicList: [],
        // 舞团信息
        danceTeamInfo: {
            id: 1,
            teamName: '最炫民族风',
            teamIcon: 'https://636c-cloud1-4g8zgsp8753a10d4-1311372251.tcb.qcloud.la/images/index/activity1.jpg?sign=c1e1505fa38eee71f775352be5b1ad2a&t=1654149347',
            teamInfo: [
                {
                    name: '作品',
                    number: 5
                },
                {
                    name: '成员',
                    number: 2
                },
                {
                    name: '全国排名',
                    number: 168431
                },
                {
                    name: '访客',
                    number: 523
                },
            ],
            member: [
                {
                    id: 1,
                    memberIcon: 'https://636c-cloud1-4g8zgsp8753a10d4-1311372251.tcb.qcloud.la/images/index/activity1.jpg?sign=35ffbaf83f6b7c7aed0cff89c0f51e82&t=1654149364',
                    memberNickName: '最美舞者',
                    status: 0,
                },
                {
                    id: 2,
                    memberIcon: 'https://636c-cloud1-4g8zgsp8753a10d4-1311372251.tcb.qcloud.la/images/index/activity1.jpg?sign=35ffbaf83f6b7c7aed0cff89c0f51e82&t=1654149364',
                    memberNickName: '最帅舞者',
                    status: 1,
                }
            ]
        },
        swiperList: [
            { id: 1, imgUrl: 'https://636c-cloud1-4g8zgsp8753a10d4-1311372251.tcb.qcloud.la/images/index/banner1.jpg?sign=f043c8067fac26fedf75e0c1be1f88ba&t=1654149383' },
            { id: 2, imgUrl: 'https://636c-cloud1-4g8zgsp8753a10d4-1311372251.tcb.qcloud.la/images/index/banner3.jpg?sign=c1f219fe5f28f00495494d36e748debf&t=1654149391' },
        ],
        navTitleID: 2,
        navHeight: '',
        menuHeight: '',
        activeFlag: false
    },
    onLoad: function (options) {
        this.setData({
            state:wx.getStorageSync('userinfo')=='',
            navHeight: App.globalData.navHeight,
            menuHeight: App.globalData.menuHeight
        })
    },

    onShow: function () {
        // this.showDynamic()
        //  1、获取数据库allUserDynamics中的所有数据，存入dynamicList
         db.collection('allUserDynamics').get().then(res => {
            // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
            console.log(res.data)
            this.setData({
                dynamicList: res.data
            })
        })
    },

    // 动态数据渲染
    showDynamic: function () {
        // 1、获取数据库allUserDynamics中的所有数据，存入dynamicList
        db.collection('allUserDynamics').get().then(res => {
            // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
            console.log(res.data)
            this.setData({
                dynamicList: res.data
            })
        })
    },

    navTitleNameClick: function (e) {
        console.log(e);
        this.setData({ navTitleID: e.target.dataset.id })
        console.log(this.data.navTitleID);
    },
    fabuPicClick: function (e) {
        wx.navigateTo({
            url: '../public/publicPic/publicPic',
        })
    },
    fabuVidClick: function (e) {
        wx.navigateTo({
            url: '../public/publicVid/publicVid',
        })
    },

    // 点赞
    dianZanClick: function (e) {
        let dz = null
        console.log(e.currentTarget.dataset.id);
        db.collection('allUserDynamics').doc(e.currentTarget.dataset.id).get()
            .then(res => {
                // console.log(res.data)
                dz = res.data.dianzan + 1
                console.log(dz);
                db.collection('allUserDynamics').doc(e.currentTarget.dataset.id).update({
                    // data 传入需要局部更新的数据
                    data: {
                        // 表示将 done 字段置为 true
                        dianzan: dz
                    },
                    success: res => {
                        console.log(res)
                        this.showDynamic()
                    }
                })
            })
    },
    // 切换最新动态和视频的页面
    activeClick: function() {
        if(!this.data.activeFlag){
            this.setData({
                activeFlag: true
            })
        }else if(this.data.activeFlag) {
            this.setData({
                activeFlag: false
            })
        }
    }
})