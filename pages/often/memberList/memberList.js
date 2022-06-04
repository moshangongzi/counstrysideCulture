Page({
    data: {
        isShow: true,
        memberList: [],
    },
    onLoad() {
        this.getMember()
    },
    //获取舞团成员
    getMember() {
        wx.cloud.database().collection('danceTeam')
            .doc('8f75309d629ad43d06f2766147c7a2d8')
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
                        memberList: memberList
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
            .doc('8f75309d629ad43d06f2766147c7a2d8')
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