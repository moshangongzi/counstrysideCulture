import Dialog from '../../../miniprogram_npm/@vant/weapp/dialog/dialog'
const db = wx.cloud.database()
const _ = db.command
Page({
    data: {
        state: '',
        username: '',
        userimg: '',
        dynamicList: [],
        openid: '',
        dianzanSrc1: 'https://636c-cloud1-4g8zgsp8753a10d4-1311372251.tcb.qcloud.la/icons/dynamic/dianzan.png',
        dianzanSrc2: 'https://636c-cloud1-4g8zgsp8753a10d4-1311372251.tcb.qcloud.la/icons/dynamic/%E7%82%B9%E8%B5%9E.png',
    },

    onLoad: function (options) {
        this.getopenid()
        this.setData({
            state: wx.getStorageSync('userinfo') == '',
        });
        if (!this.data.state) {
            this.showUser()
        }
    },
    showUser() {
        var that = this;
        wx.getStorage({
            key: 'userinfo',
            success(res) {
                that.setData({
                    username: res.data.uname,
                    userimg: res.data.userImg,
                })
                console.log('获取本地存储用户数据成功')
            }, fail(res) {
                console.log('获取失败', res)
            }
        })
    },

    // 动态数据渲染
    showDynamic: function () {
        // 1、获取数据库allUserDynamics中的所有数据，存入dynamicList
        db.collection('allUserDynamics').where({
            _openid: this.data.openid,
        }).get().then(res => {
            // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
            console.log(res.data)
            this.setData({
                dynamicList: res.data.reverse()
            })
        })
    },

    // 获取当前用户的id
    getopenid() {
        wx.cloud.callFunction({
            name: 'getOpenid'
        }).then(res => {
            this.setData({ openid: res.result.openid });
            console.log('获取openid函数成功', res.result.openid);
            this.showDynamic()
        }).catch(res => {
            console.log('获取openid函数失败', res)
        });
    },

     // 点赞
    dianZanClick: function (e) {
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

    // 删除
    deleteClick: function(e) {
        Dialog.confirm({
            message: '确认删除？',
          })
            .then(() => {
                db.collection('allUserDynamics').doc(e.currentTarget.dataset.id).remove({
                    success: res => {
                      this.showDynamic()
                    }
                  })
            })
            .catch(() => {
              // on cancel
            });
    }
})