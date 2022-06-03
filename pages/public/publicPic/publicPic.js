var util = require('../../../utils/util.js');
const db = wx.cloud.database()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tempFilePaths: '',
        openid: '',
        // content应该包括用户的id，头像，姓名，发布的时间，发布的文字和照片,用户的舞团名字,舞团id，点赞数
        // 文字和照片是必须有的，在提交之前要判断该两项内容是否为空
        content: {},
        tname: '',
        dID: 0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getUserDanceTeamName()
    },

    getUserDanceTeamName: function () {
        // 获取用户的舞团名称
        // 根据当前用户的id获取用户舞团的id，再根据舞团的id获取舞团的名称
        // 根据用户表的舞团id=舞团表的id
        wx.cloud.callFunction({
            // 云函数名称
            name: 'getOpenid',
            success: res => {
                this.setData({
                    openid: res.result.openid,
                    'content.uopenid': res.result.openid,
                })
                db.collection('user').doc(this.data.openid).get()
                    .then(res => {
                        // 获取舞团的teamId
                        // console.log(res.data)
                        this.setData({
                            'content.uname': res.data.uname,
                            'content.userImg': res.data.userImg,
                            'content.teamId': res.data.teamId,
                        })
                        return db.collection('danceTeam').doc(res.data.teamId).get()
                    })
                    .then(res => {
                        // 获取舞团的名字
                        // console.log(res.data.tname)
                        this.setData({
                            tname: res.data.tname,
                            'content.tname': res.data.tname,
                        })
                    })
            },
            fail: console.error
        })
    },

    // 选择一张图片
    chooseImg: function () {
        wx.showActionSheet({
            itemList: ['从相册选择', '拍照'],
            success: res => {
                if (!res.cancel) {
                    if (res.tapIndex == 0) {
                        this.chooseWxImage('album')
                    } else if (res.tapIndex == 1) {
                        this.chooseWxImage('camera')
                    }
                }
            }
        })
    },

    // 将图片存入云存储
    chooseWxImage: function (type) {
        wx.chooseImage({
            sizeType: ['original', 'compressed'],
            sourceType: [type],
            count: 1,
            success: res => {
                this.setData({
                    tempFilePaths: res.tempFilePaths[0],
                    // 给对象添加属性的写法,重要知识点！！！
                    // 'content.tempFilePaths': res.tempFilePaths[0],
                })
                this.savePic(res.tempFilePaths[0])
                // console.log(this.data.content);
            }
        })
    },

    // 随机生成文件的后缀id
    getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值 
      },

    // 将图片存入云存储
    savePic: function (tempFilePaths) {
        this.setData({
            dID:this.getRandomIntInclusive(1,1234567)
        })
        wx.cloud.uploadFile({
            cloudPath: `dynamicImages/dynamicImg${this.data.dID}.png`, // 上传至云端的路径
            filePath: tempFilePaths, // 小程序临时文件路径
            success: res => {
                // 返回文件 ID
                console.log(res.fileID)
                this.setData({
                    'content.tempFilePaths': res.fileID,
                     // 0代表图片文件
                     'content.FileType': 0,
                })
            },
            fail: console.error
        })
    },

    bindInput: function (e) {
        this.setData({
            'content.con': e.detail.value
        })
        // console.log(this.data.content);
    },
    // 确认发布动态
    confirmPublic: function (e) {
        let that = this;
        let currentTime = util.formatTime(new Date());
        that.setData({
            'content.time': currentTime,
            'content.dianzan': 0,
        })
        console.log(this.data.content);

        // 1、判断内容是否为空，为空给出提示
        if (!this.data.content.con) {
            wx.showToast({
                title: '内容不能为空',
                icon: 'none',
                duration: 2000
            })
            return
        }

        // 2、将content存入云数据库
        db.collection("allUserDynamics").add({
            // data 字段表示需新增的 JSON 数据
            data: that.data.content
        })
            .then(res => {
                console.log(res)
            })
        // 3、跳转到动态页面
        wx.switchTab({
            url: '/pages/dynamic/dynamic',
        })
    },


})