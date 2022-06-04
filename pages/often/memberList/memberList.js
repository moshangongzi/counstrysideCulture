Page({
    data: {
        openid: '',
        teamId: '',
        isShow: true,
        memberList: [],
    },
    onLoad() {
        this.getopenid()
    },
    // 获取当前用户的id
    getopenid() {
        wx.cloud.callFunction({
            name: 'getOpenid'
        }).then(res => {
            this.setData({ openid: res.result.openid });
            this.getTid()
        }).catch(res => {
            console.log('获取openid函数失败', res)
        });
    },
    getTid() {
        wx.cloud.database().collection('user')
            .doc(this.data.openid)
            .get()
            .then(res => {
                this.setData({
                    teamId: res.data.teamId
                })
                this.getMember()
            })
            .catch(res => {
                console.log('获取用户的舞团id失败', res)
            })
    },
    //获取舞团成员
    getMember() {
        wx.cloud.database().collection('danceTeam')
            .doc(this.data.teamId)
            .get()
            .then(res => {
                this.setData({
                    memberList: res.data.member
                })
            })
            .catch(res => {
                console.log('获取舞团成员失败', res)
            })
    },
    del(e) {
        var that = this;
        wx.showModal({
            title: '提示',
            content: '您确定要删除该用户吗',
            success: function (res) {
                if (res.confirm) {
                    that.remove(that.data.memberList, e.currentTarget.dataset.id)
                    that.setData({
                        memberList: that.data.memberList
                    })
                    console.log(that.data.memberList);
                    that.updateMember()
                } else {
                    console.log('用户点击取消删除')
                }
            }
        })
    },
    //数据库更新成员信息
    updateMember() {
        wx.cloud.database().collection('danceTeam')
            .doc('10fb47c3629b34f0056a6a0b6c5d8b06')
            .update({
                data: {
                    member: this.data.memberList
                }
            })
            .then(res => {
                console.log('成功删除', res)
            })
            .catch(res => {
                console.log('删除失败', res)
            })
    },
    remove(array, val) {
        for (var i = 0; i < array.length; i++) {
            if (array[i].id == val) {
                array.splice(i, 1);
            }
        }
        return -1;
    },
    dismiss() {
        wx.showToast({
            icon: 'none',
            title: '请联系客服帮助删除',
        })
    }
})