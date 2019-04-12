var a = require("../../../api/api.js"), t = require("../../../utils/util.js");

Page({
    data: {
        currentShow: 2,
        list: [],
        pageId: 1,
        pageSize: 10,
        hasMoreData: !0,
        onlineIncome: 0,
        underIncome: 0,
        teamId: ""
    },
    onLoad: function(a) {
        a.teamId && this.setData({
            teamId: a.teamId
        }), wx.showLoading({
            title: "加载中"
        }), this.getTotalData(), this.getList();
    },
    getTotalData: function() {
        var t = this;
        a.getTotalData({
            data: {
                teamId: this.data.teamId
            },
            success: function(a) {
                0 == a.data.status && t.setData({
                    onlineIncome: a.data.data.onlineAmount / 100,
                    underIncome: a.data.data.underlineAmount
                });
            }
        });
    },
    getList: function() {
        var e = this;
        this.data.teamId && a.getStatistics({
            data: {
                pageId: this.data.pageId,
                pageSize: this.data.pageSize,
                teamId: this.data.teamId,
                type: this.data.currentShow
            },
            success: function(a) {
                if (0 == a.data.status) {
                    var s = a.data.data.list;
                    if (s.length > 0) {
                        for (var i in s) s[i].creatTime = t.formatDateYYYYMMDDMMDDHM(s[i].creatTime);
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
                    wx.hideLoading();
                }
            }
        });
    },
    onReachBottom: function() {
        var a = this;
        a.data.hasMoreData && (a.setData({
            pageId: a.data.pageId + 1
        }), a.getList());
    },
    switchPerson: function(a) {
        var t = this, e = a.currentTarget.dataset.type;
        this.setData({
            currentShow: e
        }), t.getList();
    }
});