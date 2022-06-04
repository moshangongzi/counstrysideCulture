const App = getApp();
const db = wx.cloud.database()
const _ = db.command
Page({
    data: {
        state: '',
        navTitleName: [
            { id: 1, name: '动态', },
            { id: 2, name: '我的舞团', },
        ],
        dynamicList: [],
        // 舞团信息
        danceTeamInfo: {},
        swiperList: [
            { id: 1, imgUrl: 'https://636c-cloud1-4g8zgsp8753a10d4-1311372251.tcb.qcloud.la/images/index/banner1.jpg?sign=f043c8067fac26fedf75e0c1be1f88ba&t=1654149383' },
            { id: 2, imgUrl: 'https://636c-cloud1-4g8zgsp8753a10d4-1311372251.tcb.qcloud.la/images/index/banner3.jpg?sign=c1f219fe5f28f00495494d36e748debf&t=1654149391' },
        ],
        navTitleID: 1,
        navHeight: '',
        menuHeight: '',
        openid: '',
        teamId: '', //舞团id
        status: '',
        dianzanSrc1: 'https://636c-cloud1-4g8zgsp8753a10d4-1311372251.tcb.qcloud.la/icons/dynamic/dianzan.png',
        dianzanSrc2: 'https://636c-cloud1-4g8zgsp8753a10d4-1311372251.tcb.qcloud.la/icons/dynamic/%E7%82%B9%E8%B5%9E.png',
    },
    onLoad: function() {
        this.setData({
            state: wx.getStorageSync('userinfo') == '',
            navHeight: App.globalData.navHeight,
            menuHeight: App.globalData.menuHeight
        })
        if (!this.data.state) {
            this.getopenid()
        }

    },

    onShow: function() {
        this.showDynamic()
    },

    // 动态数据渲染
    showDynamic: function() {
        // 1、获取数据库allUserDynamics中的所有数据，存入dynamicList
        db.collection('allUserDynamics').get().then(res => {
            // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
            // console.log('allUserDynamics', res.data)
            this.setData({
                dynamicList: res.data.reverse()
            })
        })
    },
    // 切换动态和我的舞团页面
    navTitleNameClick: function(e) {
        // console.log(e);
        this.setData({ navTitleID: e.target.dataset.id })
            // console.log(this.data.navTitleID);
    },
    fabuPicClick: function(e) {
        wx.navigateTo({
            url: '../public/publicPic/publicPic',
        })
    },
    fabuVidClick: function(e) {
        wx.navigateTo({
            url: '../public/publicVid/publicVid',
        })
    },
    // 点赞
    dianZanClick: function(e) {
        db.collection('allUserDynamics').doc(e.currentTarget.dataset.id).get().then(res => {
            // 如果dianzanFlag为false，改成true
            // 点赞加1
            if (!res.data.dianzanFlag) {
                db.collection('allUserDynamics').doc(e.currentTarget.dataset.id).update({
                    // data 传入需要局部更新的数据
                    data: {
                        // 表示将 done 字段置为 true
                        dianzan: _.inc(1),
                        dianzanFlag: true
                    },
                    success: res => {
                        console.log(res)
                        this.showDynamic()
                    }
                })
            } else if (res.data.dianzanFlag) {
                let dz = null
                db.collection('allUserDynamics').doc(e.currentTarget.dataset.id).get()
                    .then(res => {
                        dz = res.data.dianzan - 1
                        db.collection('allUserDynamics').doc(e.currentTarget.dataset.id).update({
                            // data 传入需要局部更新的数据
                            data: {
                                dianzan: dz,
                                dianzanFlag: false
                            },
                            success: res => {
                                // console.log(res)
                                this.showDynamic()
                            }
                        })
                    })
            }
        })
    },
    // 获取当前用户的id
    getopenid() {
        wx.cloud.callFunction({
            name: 'getOpenid'
        }).then(res => {
            this.setData({ openid: res.result.openid });
            this.getUserAct();
            this.getTid()
            this.getDanceTeam();
            // console.log('获取openid函数成功', res.result.openid);
        }).catch(res => {
            console.log('获取openid函数失败', res)
        });
    },
    // 获取当前用户的status
    getUserAct() {
        wx.cloud.database().collection('user')
            .doc(this.data.openid)
            .get()
            .then(res => {
                this.setData({
                    status: res.data.status
                })
                // console.log('status', this.data.status)
            })
            .catch(err => {
                console.log('获取status失败', err)
            })
    },
    // 点击管理
    manageClick: function(e) {
        console.log('ok');
        wx.navigateTo({
            url: '../often/memberList/memberList',
        })
    },
    //获取舞团id
    getTid() {
        wx.cloud.database().collection('user')
            .doc(this.data.openid)
            .get()
            .then(res => {
                this.setData({
                    teamId: res.data.teamId
                })
                this.getDanceTeam()
            })
            .catch(res => {
                console.log('获取用户的舞团id失败', res)
            })
    },
    //获取舞团信息
    getDanceTeam() {
        wx.cloud.database().collection('danceTeam')
            .doc(this.data.teamId)
            .get()
            .then(res => {
                this.setData({
                    danceTeamInfo: res.data,
                });
                this.slice()
                // console.log('获取舞团信息chengon');
            })
            .catch(res => {
                // console.log('获取舞团信息失败', )
            })
    },
    slice() {
        var member = this.data.danceTeamInfo.member
        member = member.slice(0, 2);
        this.setData({
            ['danceTeamInfo.member']: member
        })
    }

})