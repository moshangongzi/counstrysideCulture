// pages/my/qiandao/qiandao.js
Page({
    data: {
        state: '',
        username: '',
        userimg: '',
        dynamicList: [
            {
                id: 1,
                text: '第3天，挑战赛：7天单人舞挑战赛，打卡签到，第3天，挑战赛：7天单人舞挑战赛，打卡签到，第3天，挑战赛：7天单人舞挑战赛，打卡签到，',
                public_time: 10,
                img_video_url: 'https://636c-cloud1-4g8zgsp8753a10d4-1311372251.tcb.qcloud.la/images/index/activity.jpg?sign=ea788945ccf64124c471a96ae9093397&t=1654149642',
                dianzan: 11

            }
        ],
    },

    onLoad: function (options) {
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
})