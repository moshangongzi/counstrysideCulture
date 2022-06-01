// const appKey = 'fc35d7872c25744ab4669c7d9dbcf15e' // 用于访问新闻接口的appKey
// const appKey = '27ecdb5376a3714e1211170e0d4e26ed' // 用于访问新闻接口的appKey
// const request = require('../../utils/request.js')
// const extractArticleInfo = require('./utils/getArticleTime.js')
// const shuffle = require('./utils/shuffle.js')
const App = getApp()
Page({
  data: {
    headerTitleName: [
      { name: '推荐', id: 1 },
      { name: '活动', id: 2 },
      { name: '分类', id: 3 },
    ],
    swiperList: [
      { id: 1, imgUrl: './images/banner.jpg' },
      { id: 2, imgUrl: './images/banner1.jpg' },
      { id: 3, imgUrl: './images/banner2.jpg' },
      { id: 4, imgUrl: './images/banner3.jpg' }
    ],
    tuiJianList: [
      { id: 1, title: '红衣服', imgUrl: './images/1.jpg', playCount: 6.5 },
      { id: 2, title: '绿衣服', imgUrl: './images/2.jpg', playCount: 9.6 },
      { id: 3, title: '红衣服2', imgUrl: './images/3.jpg', playCount: 8 }
    ],
    categoryList: [
      {
        id: 1,
        firstCateName: '广场舞',
        secondCate: [
          {
            id: 1,
            name: '16步',
          },
          {
            id: 2,
            name: '32步'
          },
          {
            id: 3,
            name: '步子舞'
          },
          {
            id: 4,
            name: '中三舞'
          }
        ]
      },
      {
        id: 2,
        firstCateName: '健身',
        secondCate: [
          {
            id: 1,
            name: '健身操',
          },
          {
            id: 2,
            name: '瘦肚子舞'
          },
          {
            id: 3,
            name: '形体'
          },
          {
            id: 4,
            name: '懒人操'
          },
          {
            id: 5,
            name: '颈椎舞',
          },
          {
            id: 6,
            name: '瑜伽'
          },
          {
            id: 7,
            name: '全身暴汗'
          },
          {
            id: 8,
            name: '拍打操'
          },
        ]
      },
      {
        id: 3,
        firstCateName: '流行舞',
        secondCate: [
          {
            id: 1,
            name: '水兵舞',
          },
          {
            id: 2,
            name: '鬼步舞'
          },
          {
            id: 3,
            name: '爵士舞'
          },
          {
            id: 4,
            name: '现代舞'
          },
          {
            id: 5,
            name: '肚皮舞',
          },
          {
            id: 6,
            name: '形体舞'
          },
          {
            id: 7,
            name: '古典舞'
          },
          {
            id: 8,
            name: '恰恰舞'
          },
          {
            id: 9,
            name: '拉丁舞'
          },
        ]
      },
    ],
    activityList: [
      {
        id: 1,
        title: "2021中华广场舞大赛",
        imgUrl: './images/activity.jpg'
      },
      {
        id: 2,
        title: "2022湖南省广场舞大赛",
        imgUrl: './images/activity1.jpg'
      },
      {
        id: 3,
        title: "社区广场舞大赛",
        imgUrl: './images/activity2.jpg'
      },
      {
        id: 4,
        title: "2022全国广场舞总决赛",
        imgUrl: './images/activity3.jpg'
      },
    ],
    swiperIndex: '1/4',
    topPic: [],
    tapID: 1, // 判断是否选中
    navHeight: ''
  },

  onLoad: function () {
    this.setData({
      navHeight: App.globalData.navHeight,
    })
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
  
})
