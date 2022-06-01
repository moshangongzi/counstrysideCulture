const App = getApp()
Component({
    properties: {
        navBarTitle: {
            type: String,
            value: '首页'
        },
        showBackIcon: {
            type: Boolean,
            value: false
        }
    },
    data: {
        navHeight: App.globalData.navHeight,
        menuHeight: App.globalData.menuHeight
    },
    methods: {
        clickBack: function (e) {
            wx.navigateBack({
                delta: 1
            })
        }
    }
})