let zid='';
Page({
  data: {
    openid: '',
    uname: '',
    userImg: '',
    show: false,
    date: '1970-1-1',
    Initial: new Date(1970, 0, 1).getTime(),
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
      zid=res.result.openid;
      this.setData({ openid: res.result.openid });
      console.log('获取openid函数成功', res.result.openid);
      this.getUserinfo();
    }).catch(res => {
      console.log('获取openid函数失败', res)
    });
  },
  //获取用户信息
  getUserinfo(){
    console.log('id',zid)
    wx.cloud.callFunction({
      name: 'getData',
      data:{
        id:zid
      }
    }).then(res => {
      this.setData({ 
        uname: res.result.data.uname,
        userImg:res.result.data.userImg
      });
      console.log('获取用户信息成功', res);
    }).catch(res => {
      console.log('获取用户信息函数失败', res)
    });
  },





  changeTime(value) {
    var date = new Date(value);
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = date.getDate() + ' ';
    return Y + M + D;
  },
  onConfirm(e) {
    console.log(e.detail)
    this.setData({
      date: this.changeTime(e.detail),
    });
    this.onClose()
  },
  showPopup() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
})