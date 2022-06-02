Page({
    data: {
        videoList: [],
    },
    onLoad: function (options) {
        this.getVideo(options);
      },
      getVideo(e) {
          console.log(e);
        wx.cloud.database().collection('video').where({
            kind:e.kind
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
      }
})