getApp();

var t = require("../../../api/api.js"), e = require("../../../utils/util.js");

Page({
    data: {
        list: [],
        pageId: 1,
        pageSize: 10,
        isloading: !0,
        storeInfo: {},
        imgHead: "",
        currentTab: 0,
        teamId: "",
        userTeamId: "",
        orderCount: {}
    },
    onLoad: function(e) {
        this.setData({
            imgHead: t.urlServer.imgHead
        }), this.getTeamId(), this.getOrderList(), this.getOrdetCount();
    },
    onShow: function() {
        this.getOrderList();
    },
    getTeamId: function() {
        wx.getStorageSync("member_info") && this.setData({
            teamId: wx.getStorageSync("member_info").currentTeamId,
            userTeamId: wx.getStorageSync("member_info").userTeamId
        });
    },
    getOrdetCount: function() {
        var e = this, a = {
            type: 0
        };
        a.teamId = this.data.teamId, t.getOrdetCount({
            data: a,
            success: function(t) {
                0 == t.data.status && e.setData({
                    orderCount: t.data.data
                });
            }
        });
    },
    switchStatus: function(t) {
        var e = t.currentTarget.dataset.index;
        this.setData({
            currentTab: e,
            pageId: 1
        }), this.getOrderList();
    },
    getStoreInfo: function() {
        wx.getStorageSync("storeInfo") && this.setData({
            storeInfo: wx.getStorageSync("storeInfo")
        });
    },
    onPullDownRefresh: function() {
        this.setData({
            pageId: 1
        }), this.getOrderList();
    },
    getState: function() {
        return [ "1,20,30", "60", "80", "500,600,610", "850,900" ][this.data.currentTab];
    },
    getOrderList: function() {
        var a = this;
        t.getOrder({
            data: {
                pageId: a.data.pageId,
                pageSize: a.data.pageSize,
                state: a.getState(),
                teamId: this.data.teamId
            },
            success: function(t) {
                if (wx.stopPullDownRefresh(), 0 == t.data.status) {
                    var s = t.data.data.list, r = t.data.data.list.length, i = t.data.data.totalNumber;
                    if (i < a.data.pageSize || i / a.data.pageSize < a.data.pageId ? a.setData({
                        isloading: !1
                    }) : a.setData({
                        isloading: !0
                    }), r) if (1 == a.data.pageId) {
                        for (var d in s) {
                            s[d].orderGct = e.formatDateYYYYMMDDMMDDHM(s[d].orderGct), s[d].headUrl = a.setHeadImg(s[d].headUrl);
                            for (var o in s[d].itmes) s[d].itmes[o].goodsPic = s[d].itmes[o].goodsPic.split(",");
                        }
                        a.setData({
                            list: s
                        });
                    } else {
                        for (var n in s) s[n].orderGct = e.formatDateYYYYMMDDMMDDHM(s[n].orderGct), s[n].headUrl = a.setHeadImg(s[n].headUrl), 
                        s[n].goodsPic = s[n].goodsPic.split(","), a.data.list.push(s[n]);
                        a.setData({
                            list: a.data.list
                        });
                    } else 1 == a.data.pageId ? a.setData({
                        list: [],
                        isloading: !1
                    }) : a.setData({
                        isloading: !1
                    });
                    wx.stopPullDownRefresh();
                } else t.data.status;
                wx.hideLoading();
            }
        });
    },
    onReachBottom: function() {
        var t = this;
        t.data.isloading && (t.setData({
            pageId: t.data.pageId + 1
        }), t.getOrderList());
    },
    agreeReturn: function(e) {
        var a = this, s = e.currentTarget.dataset.id, r = e.currentTarget.dataset.index;
        wx.showModal({
            title: "提示",
            content: "确认退款后，用户支付的商品金额和运费将退还给用户，确认退款？",
            success: function(e) {
                e.confirm && t.wxRequest({
                    success: function(t) {
                        0 == t.data.status ? (wx.showToast({
                            title: "退款成功"
                        }), a.data.list.splice(r, 1), a.setData({
                            list: a.data.list
                        })) : wx.showToast({
                            title: t.data.message
                        }), a.getOrdetCount();
                    }
                }, t.urlServer.ApiUrl + "/trade_api/order/storeRevokeOrder/" + s);
            }
        });
    },
    confirmDeliver: function(e) {
        var a = this, s = e.currentTarget.dataset.id, r = e.currentTarget.dataset.index;
        t.wxRequest({
            success: function(t) {
                0 == t.data.status ? (wx.showToast({
                    title: "请快速安排送货"
                }), a.data.list.splice(r, 1), a.setData({
                    list: a.data.list
                }), a.getOrdetCount()) : wx.showToast({
                    title: t.data.message
                });
            }
        }, t.urlServer.ApiUrl + "/trade_api/order/send/" + s);
    },
    successOrder: function(e) {
        var a = this, s = e.currentTarget.dataset.id, r = e.currentTarget.dataset.index;
        wx.showModal({
            title: "提示",
            cancelText: "取消",
            confirmText: "确认",
            content: "您确认送达了吗？",
            success: function(e) {
                e.confirm && t.wxRequest({
                    success: function(t) {
                        0 == t.data.status ? (wx.showToast({
                            title: "已确认"
                        }), a.data.list[r].orderState = 600, a.setData({
                            list: a.data.list
                        })) : wx.showToast({
                            title: t.data.message
                        });
                    }
                }, t.urlServer.ApiUrl + "/trade_api/order/confirm/" + s);
            }
        });
    },
    onShareAppMessage: function(t) {
        return {
            title: "发现一家好店-" + this.data.storeInfo.storeName + "-邀您来逛逛！",
            desc: this.data.storeInfo.storeName
        };
    },
    switchEva: function() {
        this.setData({
            hideEva: !this.data.hideEva
        });
    },
    setHeadImg: function(e) {
        if (e) return -1 == e.indexOf("qlogo") ? t.urlServer.imgHead + e : e;
    }
});