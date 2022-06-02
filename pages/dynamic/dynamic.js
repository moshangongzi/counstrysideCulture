const App = getApp()
Page({

    data: {
        navTitleName: [
            { id: 1, name: '动态', },
            { id: 2, name: '我的舞团', },
        ],
        dynamicList: [
            {
                id: 1,
                text: '第3天，挑战赛：7天单人舞挑战赛，打卡签到，第3天，挑战赛：7天单人舞挑战赛，打卡签到，第3天，挑战赛：7天单人舞挑战赛，打卡签到，',
                public_time: 10,
                user: {
                    id: 1,
                    nickName: '花姐',
                    avater_url: '/images/index/banner1.jpg'
                },
                img_video_url: '/images/index/banner2.jpg',
                dianzan: 11

            }
        ],
        // 舞团信息
        danceTeamInfo: {
            id: 1,
            teamName: '最炫民族风',
            teamIcon: '/images/dynamic/activity.jpg',
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
                    memberIcon: '/images/dynamic/activity1.jpg',
                    memberNickName: '最美舞者',
                    status: 0,
                },
                {
                    id: 2,
                    memberIcon: '/images/dynamic/activity2.jpg',
                    memberNickName: '最帅舞者',
                    status: 1,
                }
            ]
        },
        swiperList: [
            { id: 1, imgUrl: '/images/index/banner.jpg' },
            { id: 2, imgUrl: '/images/index/banner1.jpg' },
        ],
        navTitleID: 1,
        navHeight: '',
        menuHeight: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            navHeight: App.globalData.navHeight,
            menuHeight: App.globalData.menuHeight
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