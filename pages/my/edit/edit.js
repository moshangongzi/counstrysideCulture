let zid = '';
Page({
  data: {
    openid: '',
    uname: '',
    userImg: '',
    sex: '0',
    birthday: '',
    qq: '',
    tel: '',
    address: '',
    selfInfo: '',

    show: false,
    Initial: new Date(1970, 0, 1).getTime(),//
    minDate: new Date(1920, 0, 1).getTime(),
    maxDate: new Date().getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      } else if (type === 'day') {
        return `${value}日`;
      }
      value = value + 'time';
      return value;
    }
  },
  onLoad() { 
    this.getopenid(); 
  },
  //获取openid
  getopenid() {
    wx.cloud.callFunction({
      name: 'getOpenid'
    }).then(res => {
      zid = res.result.openid;
      this.setData({ openid: res.result.openid });
      console.log('获取openid函数成功', res.result.openid);
      this.getUserinfo();
    }).catch(res => {
      console.log('获取openid函数失败', res)
    });
  },
  //获取用户信息
  getUserinfo() {
    wx.cloud.database().collection('user').doc(zid).get()
    .then(res => {
      this.setData({
        uname: res.data.uname,
        userImg: res.data.userImg,
        sex: res.data.sex,
        birthday: res.data.birthday,
        qq: res.data.qq,
        tel: res.data.tel,
        address: res.data.address,
        selfInfo: res.data.selfInfo,
      });
      console.log('获取用户信息成功', res);
    }).catch(res => {
      console.log('获取用户信息函数失败', res)
    });
  },
  //设置背景函数
  bgTips() {
    wx.showToast({
      icon: 'none',
      title: '暂不支持设置背景，背景就是您的头像噢~'
    })
  },
  //选择性别函数
  chooseSex(e) {
    this.setData({
      sex: e.detail,
    });
  },
  //生日函数
  changeTime(value) {
    var date = new Date(value);
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = date.getDate() + ' ';
    return Y + M + D;
  },
  onConfirm(e) {
    this.setData({
      birthday: this.changeTime(e.detail)
    });
    this.onClose()
  },
  showPopup() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  //保存
  formSubmit(e) {
    this.setData({
      uname: e.detail.value.uname,
      sex: e.detail.value.sex,
      qq: e.detail.value.qq,
      tel: e.detail.value.tel,
      address: e.detail.value.address,
      selfInfo: e.detail.value.selfInfo,
    });
    this.updateUser();
  },
  //更新至数据库
  updateUser() {
    var that = this.data;
    wx.cloud.database().collection('user')
      .doc(zid)
      .update({
        data: {
          uname: that.uname,
          sex: that.sex,
          birthday:that.birthday,
          qq: that.qq,
          tel: that.tel,
          address: that.address,
          selfInfo: that.selfInfo
        }
      })
      .then(res => {
        console.log('更新用户信息成功', res);
        wx.showToast({
          title: '保存成功！',
        })
      })
      .catch(res => {
        console.error('更新用户信息失败', res)
      })
  }
})