// pages/my/qiandao/qiandao.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
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

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.showUser()
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

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})