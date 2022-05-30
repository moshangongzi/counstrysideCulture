// const appKey = 'fc35d7872c25744ab4669c7d9dbcf15e' // 用于访问新闻接口的appKey
// const appKey = '27ecdb5376a3714e1211170e0d4e26ed' // 用于访问新闻接口的appKey
// const request = require('../../utils/request.js')
// const extractArticleInfo = require('./utils/getArticleTime.js')
// const shuffle = require('./utils/shuffle.js')

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
    tapID: 2, // 判断是否选中
    contentNewsList: [],
    showCopyright: false,
    refreshing: false
  },

  onLoad: function () {
    // this.renderPage('top', false, () => {
    //   this.setData({
    //     showCopyright: true
    //   })
    // })
  },

  // headerBar 点击
  headerTitleClick: function (e) {
    this.setData({ tapID: e.target.dataset.id })
  },

  //跳转到新闻详情页
  viewDetail: function (e) {
    let newsUrl = e.currentTarget.dataset.newsurl || ''
    let newsTitle = e.currentTarget.dataset.newstitle || ''
    let newsAuthor = e.currentTarget.dataset.newsauthor || ''
    wx.navigateTo({
      url: '../detail/detail?newsUrl=' + newsUrl
    })
  },

  handleSwiperChange: function (e) {
    this.setData({
      swiperIndex: `${e.detail.current + 1}/4`
    })
  },

  onPulldownrefresh_SV() {
    this.renderPage('top', true, () => {
      this.setData({
        refreshing: false
      })
    })
  },
  // isRefresh 是否为下拉刷新
  renderPage: function (newsType, isRefresh, calllBack) {
    if (!isRefresh) {
      wx.showLoading({
        title: '加载中'
      })
      request({ url: `https://v.juhe.cn/toutiao/index?type=${newsType}&key=${appKey}`, newstype: newsType })
        .then(res => {
          wx.hideLoading()
          let { articleList, topPic } = extractArticleInfo(res.result.data)
          this.setData({
            contentNewsList: articleList,
            topPic
          })
          if (calllBack) {
            calllBack()
          }
        })
        .catch(error => {
          wx.hideLoading()
        })
    } else {
      // 数组随机排序，模拟刷新
      let contentNewsListTemp = shuffle(JSON.parse(JSON.stringify(this.data.contentNewsList)))
      /* contentNewsListTemp.sort(() => {
        return Math.random() > 0.5 ? -1 : 1
      }) */
      setTimeout(() => {
        this.setData({
          contentNewsList: contentNewsListTemp
        })
        if (calllBack) {
          calllBack()
        }
      }, 2000)
    }
  }
})
