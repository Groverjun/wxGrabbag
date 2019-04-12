var a = require("../../../api/api.js"), t = require("../../../utils/util.js"), e = wx.getSystemInfoSync().windowHeight;

Page({
    data: {
        tabIndex: 0,
        childIndex: 0,
        height: e - 50 + "px",
        pageId: 1,
        pageSize: 10,
        hasMoreData: !0
    },
    onLoad: function(a) {
        this.getList();
    },
    onPullDownRefresh: function() {
        this.getList();
    },
    lowerUpload: function() {
        var a = this;
        a.data.hasMoreData && (a.setData({
            pageId: a.data.pageId + 1
        }), a.getList());
    },
    getList: function() {
        var e = this, s = {
            pageId: this.data.pageId,
            pageSize: this.data.pageSize
        };
        0 == this.data.tabIndex ? 1 == this.data.childIndex && (s.state = 1) : s.type = 0 == this.data.childIndex ? 1 : 1 == this.data.childIndex ? 2 : 4, 
        a.getLogs({
            data: s,
            success: function(a) {
                if (0 == a.data.status) {
                    var s = a.data.data.list;
                    if (s.length > 0) {
                        for (var i in s) s[i].headUrl = t.setHeadImg(s[i].headUrl), s[i].isNew = e.setFirst(s[i].createTime, s[i].logTimes), 
                        s[i].createTime = t.formatDateMMDDHM2(s[i].createTime);
                        Math.ceil(a.data.data.totalNumber / e.data.pageSize) <= e.data.pageId ? e.setData({
                            hasMoreData: !1
                        }) : e.setData({
                            hasMoreData: !0
                        }), 1 == e.data.pageId ? e.setData({
                            list: s
                        }) : e.setData({
                            list: e.data.list.concat(s)
                        });
                    } else 1 == e.data.pageId && e.setData({
                        list: [],
                        hasMoreData: !1
                    });
                }
            }
        });
    },
    setFirst: function(a, t) {
        return new Date(a).toDateString() == new Date().toDateString();
    },
    getForecast: function() {
        var e = this, s = {
            pageId: this.data.pageId,
            pageSize: this.data.pageSize
        };
        a.getPredict({
            data: s,
            success: function(a) {
                if (0 == a.data.status) {
                    var s = a.data.data.list;
                    if (s.length > 0) {
                        for (var i in s) s[i].user_head_img = t.setHeadImg(s[i].user_head_img), s[i].mesPer = parseInt(s[i].message_see / s[i].total_see * 100), 
                        s[i].cardPer = parseInt(s[i].card_see / s[i].total_see * 100), s[i].proPer = parseInt(s[i].product_see / s[i].total_see * 100), 
                        s[i].offPer = parseInt(s[i].office_see / s[i].total_see * 100), s[i].turnover = parseInt((parseInt(s[i].product_see) + parseInt(s[i].office_see)) / s[i].total_see * 100);
                        Math.ceil(a.data.data.totalNumber / e.data.pageSize) <= e.data.pageId ? e.setData({
                            hasMoreData: !1
                        }) : e.setData({
                            hasMoreData: !0
                        }), 1 == e.data.pageId ? e.setData({
                            list: s
                        }) : e.setData({
                            list: e.data.list.concat(s)
                        }), e.setData({
                            list: s
                        });
                    } else 1 == e.data.pageId && e.setData({
                        list: [],
                        hasMoreData: !1
                    });
                }
            }
        });
    },
    checkTab: function(a) {
        var t = a.currentTarget.dataset.type;
        this.setData({
            childIndex: 0,
            pageId: 1,
            hasMoreData: !0,
            tabIndex: t
        }), 2 == t ? this.setData({
            height: e + "px"
        }) : this.setData({
            height: e - 50 + "px"
        }), 0 == t || 1 == t ? this.getList() : this.getForecast();
    },
    checkChildTab: function(a) {
        var t = a.currentTarget.dataset.type;
        this.setData({
            childIndex: t,
            hasMoreData: !0,
            pageId: 1
        }), this.getList();
    },
    goLeavmess: function(a) {
        var t = a.currentTarget.dataset.fid, e = a.currentTarget.dataset.head;
        wx.navigateTo({
            url: "/pages/message/leavMess/index?userId=" + t + "&userHead=" + e
        });
    },
    onShareAppMessage: function() {}
});