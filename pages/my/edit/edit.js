Page({
  data: {
    username: '琥珀川',
    headimg: 'https://img.yzcdn.cn/vant/cat.jpeg',
    show: false,
    date: '1950-3-4',
    Initial:new Date(1980,0,1).getTime(),
    minDate: new Date(1920,0,1).getTime(),
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
  changeTime(value) {
    var date = new  Date(value);
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