Page({
    data: {
        username: '',
        userimg: '',
        loginShow: true,
        canIUse: wx.canIUse('button.open-type.getUserInfo'), // 这个是兼容
        menu: [
            {
                id: 1,
                icon: '../../icons/my/我的动态.png',
                text: '我的动态',
                pageName:'myDynamic'
            }, {
                id: 2,
                icon: '../../icons/my/空间.png',
                text: '舞团空间',
                pageName:'space'
            }, {
                id: 3,
                icon: '../../icons/my/证书.png',
                text: '荣誉证书',
                pageName:'cert'
            },
        ],
        often: [
            {
                id: 1,
                icon: '../../icons/my/活动.png',
                text: '我的活动',
                pageName:'myActivity'
            }, {
                id: 2,
                icon: '../../icons/my/团队.png',
                text: '我的舞团',
                pageName:'myDanceTeam'
            }, {
                id: 3,
                icon: '../../icons/my/收藏.png',
                text: '我的收藏',
                pageName:'myCollection'
            }
        ],
        assist: [
            {
                id: 1,
                icon: '../../icons/my/客服.png',
                text: '客服帮助',
                pageName:'kefu'
            }, {
                id: 2,
                icon: '../../icons/my/消息.png',
                text: '我的消息',
                pageName:'message'
            }, {
                id: 3,
                icon: '../../icons/my/设置.png',
                text: '设置',
                pageName:'setUp'
            },
        ],
    },
    onLoad: function () {
        this.showUser()
    },
    showUser() {
        var that = this;
        wx.getStorage({
            key: 'userinfo',
            success(res) {
                that.setData({
                    username: res.data.username,
                    userimg: res.data.userimg,
                    loginShow: false,

                })
                console.log('获取本地存储用户数据成功')
            }, fail(res) {
                console.log('获取失败', res)
                that.setData({
                    loginShow: true
                })
            }
        })
    },
    bindGetUserInfo(e) {
        var that = this;
        wx.setStorage({
            data: {
                username: e.detail.userInfo.nickName,
                userimg: e.detail.userInfo.avatarUrl
            },
            key: 'userinfo',//本地缓存中指定的 key
            success: function () {
                console.log("存记录成功");
                that.showUser();
            },
            fail: function () {
                console.log("存记录失败")
            }
        })
    },
})