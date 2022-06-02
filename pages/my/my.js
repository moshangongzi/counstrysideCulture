Page({
    data: {
        openid: '',
        uname: '',
        userImg: '',
        loginShow: true,
        canIUse: wx.canIUse('button.open-type.getUserInfo'), // 这个是兼容
        menu: [
            {
                id: 1,
                icon: 'https://636c-cloud1-4g8zgsp8753a10d4-1311372251.tcb.qcloud.la/icons/my/%E6%88%91%E7%9A%84%E5%8A%A8%E6%80%81.png',
                text: '我的动态',
                jump: '/pages/menu/myDynamic/myDynamic'
            }, {
                id: 2,
                icon: 'https://636c-cloud1-4g8zgsp8753a10d4-1311372251.tcb.qcloud.la/icons/my/%E7%A9%BA%E9%97%B4.png',
                text: '舞团空间',
                jump: '/pages/dynamic/dynamic'
            }, {
                id: 3,
                icon: 'https://636c-cloud1-4g8zgsp8753a10d4-1311372251.tcb.qcloud.la/icons/my/%E8%AF%81%E4%B9%A6.png',
                text: '荣誉证书',
                jump: '/pages/menu/cert/cert'
            },
        ],
        often: [
            {
                id: 1,
                icon: 'https://636c-cloud1-4g8zgsp8753a10d4-1311372251.tcb.qcloud.la/icons/my/%E6%B4%BB%E5%8A%A8.png',
                text: '我的活动',
                pageName: 'myActivity'
            }, {
                id: 2,
                icon: 'https://636c-cloud1-4g8zgsp8753a10d4-1311372251.tcb.qcloud.la/icons/my/%E5%9B%A2%E9%98%9F.png',
                text: '我的舞团',
                pageName: 'myDanceTeam'
            }, {
                id: 3,
                icon: 'https://636c-cloud1-4g8zgsp8753a10d4-1311372251.tcb.qcloud.la/icons/my/%E6%94%B6%E8%97%8F.png',
                text: '我的收藏',
                pageName: 'myCollection'
            }
        ],
        assist: [
            {
                id: 1,
                icon: 'https://636c-cloud1-4g8zgsp8753a10d4-1311372251.tcb.qcloud.la/icons/my/%E5%AE%A2%E6%9C%8D.png',
                text: '客服帮助',
                pageName: 'kefu'
            }, {
                id: 2,
                icon: 'https://636c-cloud1-4g8zgsp8753a10d4-1311372251.tcb.qcloud.la/icons/my/%E6%B6%88%E6%81%AF.png',
                text: '我的消息',
                pageName: 'message'
            }, {
                id: 3,
                icon: 'https://636c-cloud1-4g8zgsp8753a10d4-1311372251.tcb.qcloud.la/icons/my/%E8%AE%BE%E7%BD%AE.png',
                text: '设置',
                pageName: 'setUp'
            },
        ],
    },
    onShow: function () {
        this.showUser()
    },
    showUser() {
        var that = this;
        wx.getStorage({
            key: 'userinfo',
            success(res) {
                that.setData({
                    uname: res.data.uname,
                    userImg: res.data.userImg,
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
                uname: e.detail.userInfo.nickName,
                userImg: e.detail.userInfo.avatarUrl,
            },
            key: 'userinfo',//本地缓存中指定的 key
            success: function () {
                console.log("存记录到本地成功");
                that.showUser();
                that.getopenid();
            }, fail: function () {
                console.log("存记录到本地失败")
            }
        });
    },
    //获取openid
    getopenid() {
        wx.cloud.callFunction({
            name: 'getOpenid'
        }).then(res => {
            this.setData({ openid: res.result.openid });
            this.addUser();
            console.log('获取openid函数成功', res.result.openid);
        }).catch(res => {
            console.log('获取openid函数失败', res)
        });
    },
    //新增用户
    addUser() {
        var that = this.data;
        wx.cloud.database().collection('user').add({
            data: {
                _id: that.openid,
                uname: that.uname,
                userImg: that.userImg
            }
        }).then(res => {
            console.log('添加用户成功', res)
        }).catch(res => {
            console.log('添加用户失败', res)
        });

    }
})