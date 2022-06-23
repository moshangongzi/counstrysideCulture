const db = wx.cloud.database()
Page({
  data: {
    videoList: [],
    dianzan: false,
    dianzanID: 0, // 每一次点赞的id
    dianzanList: [],
    dianzanIDList: [], // 记录点赞过的视频id
    dianzanSrc1: 'https://636c-cloud1-4g8zgsp8753a10d4-1311372251.tcb.qcloud.la/icons/dynamic/dianzan.png',
    dianzanSrc2: 'https://636c-cloud1-4g8zgsp8753a10d4-1311372251.tcb.qcloud.la/icons/dynamic/%E7%82%B9%E8%B5%9E.png',
    shoucang: false,
    shoucangSrc1: 'https://636c-cloud1-4g8zgsp8753a10d4-1311372251.tcb.qcloud.la/icons/dynamic/shoucang.png',
    shoucangSrc2: 'https://636c-cloud1-4g8zgsp8753a10d4-1311372251.tcb.qcloud.la/icons/dynamic/%E6%94%B6%E8%97%8F.png',
  },
  onLoad: function (options) {
    this.getopenid();
    this.getVideo(options);
  },
  onShow: function () {

  },
  getVideo(e) {
    console.log(e);
    wx.cloud.database().collection('video').where({
      kind: e.kind
    })
      .get()
      .then(res => {
        this.setData({
          videoList: res.data
        })
        console.log('获取视频数据库成功', res)
      })
      .catch(res => {
        console.log('获取视频数据库失败', res)
      })
  },
  // 点赞和取消点赞
  dianzanClick(e) {
    // 获取点赞的视频的id，
    // console.log(e.currentTarget.dataset.id);
    // 根据点赞视频的id，更新视频的点赞属性为true
    let flag = true
    db.collection('video').doc(e.currentTarget.dataset.id).get().then(res => {
      // 如果dianzan为true，改成false
      if (res.data.dianzan) {
        flag = false
      }

      db.collection('video').doc(e.currentTarget.dataset.id).update({
        // data 传入需要局部更新的数据
        data: {
          dianzan: flag
        },
        success: res => {
          console.log(res)
          this.getVideo()
        }
      })
    })

  },
  shoucangClick(e) {
    let flag = true
    db.collection('video').doc(e.currentTarget.dataset.id).get().then(res => {
      // 如果shoucang为true,改成false，将视频从收藏夹删掉
      // 否则shoucang为false,改成true，将视频放进收藏夹
      if (res.data.shoucang) {
        flag = false
        this.data.collArr.splice(this.data.collArr.indexOf(e.currentTarget.dataset.id), 1);
        wx.cloud.database().collection('user')
          .doc(this.data.openid)
          .update({
            data: {
              collection: this.data.collArr
            }
          })
          .then(res => {
            console.log('修改成功', res)
          })
          .catch(res => {
            console.log('修改失败', res)
          })

      } else {
        this.setData({
          coll: e.currentTarget.dataset.id
        });
        this.data.collArr.push(this.data.coll);
        wx.cloud.database().collection('user')
          .doc(this.data.openid)
          .update({
            data: {
              collection: this.data.collArr
            }
          })
          .then(res => {
            console.log('修改成功', res)
          })
          .catch(res => {
            console.log('修改失败', res)
          })
      }

      // 改变数据库中shoucang状态
      db.collection('video').doc(e.currentTarget.dataset.id).update({
        // data 传入需要局部更新的数据
        data: {
          shoucang: flag
        },
        success: res => {
          this.getVideo()
        }
      })
    })
  },
  getopenid() {
    wx.cloud.callFunction({
      name: 'getOpenid'
    }).then(res => {
      this.setData({ openid: res.result.openid });
      this.getUserColl();
      // console.log('获取openid函数成功', res.result.openid);
    }).catch(res => {
      console.log('获取openid函数失败', res)
    });
  },
  //获取用户收藏
  getUserColl() {
    wx.cloud.database().collection('user')
      .doc(this.data.openid)
      .get()
      .then(res => {
        if (res.data.collection) {
          this.setData({
            collArr: res.data.collection
          })
          console.log('获取登录用户信息成功', res.data.collection)
        } else {
          console.log('用户收藏夹为空')
        }

      })
      .catch(res => {
        console.log('获取登录用户信息失败', res)
      })
  }
})