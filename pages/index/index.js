const App = getApp()
Page({
  data: {
    headerTitleName: [
      { name: '推荐', id: 1 },
      { name: '活动', id: 2 },
      { name: '分类', id: 3 },
    ],
    swiperList: [
      { id: 1, imgUrl: 'https://636c-cloud1-4g8zgsp8753a10d4-1311372251.tcb.qcloud.la/images/index/banner.jpg?sign=442718cbffef7b5e91216bf88e49f387&t=1654148945' },
      { id: 2, imgUrl: 'https://636c-cloud1-4g8zgsp8753a10d4-1311372251.tcb.qcloud.la/images/index/banner1.jpg?sign=6479335791cbac973d259e1677a68864&t=1654148994' },
      { id: 3, imgUrl: 'https://636c-cloud1-4g8zgsp8753a10d4-1311372251.tcb.qcloud.la/images/index/banner2.jpg?sign=72a97ecd8b45e938efc252b74c32f952&t=1654149060' },
      { id: 4, imgUrl: 'https://636c-cloud1-4g8zgsp8753a10d4-1311372251.tcb.qcloud.la/images/index/banner3.jpg?sign=8e4cc878812860c89698862a851b91c7&t=1654149073' }
    ],
    tuiJianList: [
      { id: 1, title: '红衣服', imgUrl: 'https://636c-cloud1-4g8zgsp8753a10d4-1311372251.tcb.qcloud.la/images/index/1.jpg?sign=9c65523fe9275c710e592e32bf6d987a&t=1654149105', playCount: 6.5 },
      { id: 2, title: '绿衣服', imgUrl: 'https://636c-cloud1-4g8zgsp8753a10d4-1311372251.tcb.qcloud.la/images/index/2.jpg?sign=d238263f59dc1e598732226494fb270b&t=1654149117', playCount: 9.6 },
      { id: 3, title: '红衣服2', imgUrl: 'https://636c-cloud1-4g8zgsp8753a10d4-1311372251.tcb.qcloud.la/images/index/3.jpg?sign=8428eb54254d7e485cc7c1283328acce&t=1654149128', playCount: 8 }
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
        imgUrl: 'https://636c-cloud1-4g8zgsp8753a10d4-1311372251.tcb.qcloud.la/images/index/activity.jpg?sign=49b4b4168a4ddc8cd71b237c70e3b89d&t=1654149148'
      },
      {
        id: 2,
        title: "2022湖南省广场舞大赛",
        imgUrl: 'https://636c-cloud1-4g8zgsp8753a10d4-1311372251.tcb.qcloud.la/images/index/activity1.jpg?sign=dc68f592377d12320f50ef27a557b8e2&t=1654149159'
      },
      {
        id: 3,
        title: "社区广场舞大赛",
        imgUrl: 'https://636c-cloud1-4g8zgsp8753a10d4-1311372251.tcb.qcloud.la/images/index/activity2.jpg?sign=42b40c63f95a8b43619210f98604aec0&t=1654149170'
      },
      {
        id: 4,
        title: "2022全国广场舞总决赛",
        imgUrl: 'https://636c-cloud1-4g8zgsp8753a10d4-1311372251.tcb.qcloud.la/images/index/activity3.jpg?sign=934b593975dad174b29d2e6e03b463a9&t=1654149181'
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

  onShow: function() {
    if(App.globalData.tapID){
      this.setData({
        tapID:App.globalData.tapID,
      })
    }
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
