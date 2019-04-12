var t = require("../../../api/api.js"), a = require("../../../utils/util.js"), e = getApp().globalData;

Page({
    data: {
        list: [],
        selectIndex: 1,
        page: 1,
        pageSize: 10,
        custType: [],
        custLevel: [],
        custState: [],
        hasMoreData: !0,
        teamId: "",
        type: 3,
        totalCount: 0,
        userId: ""
    },
    onLoad: function(a) {
        this.setData({
            custType: t.customer.custType,
            custLevel: t.customer.custLevel,
            custState: t.customer.custState
        }), a.type && (this.setData({
            type: a.type,
            userId: a.userId
        }), wx.setNavigationBarTitle({
            title: "工作分析"
        })), this.getList();
    },
    setCurrent: function(t) {
        this.setData({
            type: t.currentTarget.dataset.id,
            page: 1
        }), this.getList();
    },
    getList: function() {
        if (e.teamId) {
            var s = this, i = {
                type: this.data.type,
                teamId: e.teamId,
                pageId: this.data.page,
                pageSize: this.data.pageSize
            };
            this.data.type > 3 && this.data.userId && (i.userId = this.data.userId), t.getCustomerList({
                data: i,
                success: function(t) {
                    if (0 == t.data.status) {
                        var e = s.data.list, i = t.data.data.list;
                        if (1 == s.data.page && (e = []), i.length > 0) {
                            for (var o in i) i[o].customHeadText = i[o].customName.substring(i[o].customName.length - 2), 
                            null != i[o].customTime && (i[o].customTime = a.formatDateMMDDHM(i[o].customTime)), 
                            null != i[o].kekeFollow.followId && (i[o].kekeFollow.followModifyTime = a.formatDateMMDDHM(i[o].kekeFollow.followModifyTime)), 
                            3 == s.data.selectIndex && 1 == i[o].shareState && (i[o].shareName = s.data.userId == i[o].userId ? "自己独占" : i[o].userName.substring(i[o].userName.length - 2) + "独占");
                            i.length < s.data.totalNumber ? s.setData({
                                list: e.concat(i),
                                hasMoreData: !1,
                                totalCount: t.data.data.totalNumber
                            }) : s.setData({
                                list: e.concat(i),
                                hasMoreData: !0,
                                totalCount: t.data.data.totalNumber
                            });
                        } else 1 == s.data.page && s.setData({
                            list: [],
                            hasMoreData: !1,
                            totalCount: 0
                        });
                    } else -1 == t.data.status && getApp().getCode();
                }
            });
        }
    },
    onPullDownRefresh: function() {
        var t = this;
        t.setData({
            page: 1
        }), t.getList();
    },
    onReachBottom: function() {
        var t = this;
        t.data.hasMoreData && (t.setData({
            page: t.data.page + 1
        }), t.getList());
    },
    goRecord: function(t) {
        var a = t.currentTarget.dataset.id, e = t.currentTarget.dataset.name;
        if (this.data.type > 3) wx.navigateTo({
            url: "/pages/customer/info/info?relationId=" + a
        }); else {
            var s = getCurrentPages();
            s[s.length - 2].setData({
                relationId: a,
                relationName: e
            }), wx.navigateBack({
                delta: 1
            });
        }
    }
});