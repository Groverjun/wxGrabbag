getApp();

var t = require("../../../A93C6C17D69926BFCF5A041083A49EA6.js"), e = require("../../../B9ABCFC5D69926BFDFCDA7C2AFA49EA6.js");

Page({
    data: {
        list: [],
        pageId: 1,
        pageSize: 10,
        isloading: !0,
        storeInfo: {},
        imgHead: "",
        currentTab: 0,
        hideEva: !0,
        commentScore: 5,
        nowWorker: {},
        anonymousFlag: !0,
        menuTop: "",
        waittindelivery: 0,
        waittinget: 0,
        waittingrevoke: 0,
        waittingpay: 0
    },
    onLoad: function(e) {
        this.setData({
            imgHead: t.urlServer.imgHead,
            teamId: wx.getStorageSync("teamId")
        }), e.type && this.setData({
            currentTab: e.type
        }), this.getStoreInfo(), this.getOrderList();
    },
    onshow: function() {
        var t = this, e = wx.createSelectorQuery();
        e.select("#fix").boundingClientRect(), e.exec(function(e) {
            t.setData({
                menuTop: e[0].top
            });
        }), this.getOrderList();
    },
    onHide: function() {
        this.getOrderList();
    },
    onPageScroll: function(t) {
        var e = this;
        t.scrollTop > e.data.menuTop ? e.setData({
            menuFixed: !0
        }) : e.setData({
            menuFixed: !1
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
        return [ "1", "60", "80", "600,610", "800,850,900" ][this.data.currentTab];
    },
    getOrderList: function() {
        wx.showLoading({
            title: "加载中..."
        });
        var a = this;
        t.getOrderList({
            data: {
                pageId: a.data.pageId,
                pageSize: a.data.pageSize,
                state: a.getState()
            },
            success: function(t) {
                if (wx.stopPullDownRefresh(), 0 == t.data.status) {
                    var i = t.data.data.list, r = t.data.data.list.length, s = t.data.data.totalCount;
                    if (s < a.data.pageSize || s / a.data.pageSize < a.data.pageId ? a.setData({
                        isloading: !1
                    }) : a.setData({
                        isloading: !0
                    }), r) if (1 == a.data.pageId) {
                        for (var n in i) i[n].orderGct = e.formatDateYYYYMMDDMMDDHM(i[n].orderGct);
                        a.setData({
                            list: i
                        });
                    } else {
                        for (var o in i) i[o].orderGct = e.formatDateYYYYMMDDMMDDHM(i[o].orderGct), a.data.list.push(i[o]);
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
                a.getOrderCount(), wx.hideLoading();
            }
        });
    },
    onReachBottom: function() {
        var t = this;
        t.data.isloading && (t.setData({
            pageId: t.data.pageId + 1
        }), t.getOrderList());
    },
    goPayOrder: function(e) {
        var a = this;
        t.wxRequest({
            data: {
                orderId: e.currentTarget.dataset.id,
                orderType: 2
            },
            success: function(t) {
                if (0 == t.data.status) {
                    var e = t.data.data;
                    wx.requestPayment({
                        timeStamp: e.timeStamp,
                        nonceStr: e.nonceStr,
                        package: e._package,
                        signType: e.signType,
                        paySign: e.paySign,
                        success: function(t) {
                            wx.showToast({
                                title: "支付成功"
                            });
                        },
                        fail: function(t) {
                            wx.showToast({
                                title: "支付失败"
                            });
                        }
                    }), a.getOrderList();
                } else wx.showToast({
                    title: t.data.message
                });
            }
        }, t.urlServer.ApiUrl + "/trade_api/order/pay/h5");
    },
    goorderdetail: function(t) {
        var e = t.currentTarget.dataset.id;
        wx.setStorageSync("orderId", e);
        wx.navigateTo({
            url: "/pages/product/orderDetail/orderDetail"
        });
    },
    cancelOrder: function(e) {
        var a = this, i = "", r = e.currentTarget.dataset.id;
        i = "/trade_api/order/userRequestCallback/", wx.showModal({
            title: "提示",
            cancelText: "取消",
            confirmText: "确定",
            content: "您确认要取消该订单吗？",
            success: function(e) {
                e.confirm && t.wxRequest({
                    method: "get",
                    success: function(t) {
                        0 == t.data.status ? wx.showToast({
                            title: "已取消"
                        }) : wx.showToast({
                            title: t.data.message
                        });
                    }
                }, t.urlServer.ApiUrl + i + r), a.getOrderList();
            }
        });
    },
    onShareAppMessage: function(t) {
        return {
            title: "发现一家好店-" + this.data.storeInfo.storeName + "-邀您来逛逛！",
            desc: this.data.storeInfo.storeName
        };
    },
    successOrder: function(e) {
        var a = this, i = e.currentTarget.dataset.id;
        e.currentTarget.dataset.index;
        wx.showModal({
            title: "提示",
            cancelText: "取消",
            confirmText: "确认",
            content: "您确认要完成此订单吗？",
            success: function(e) {
                e.confirm && t.wxRequest({
                    method: "get",
                    success: function(t) {
                        0 == t.data.status ? wx.showToast({
                            title: "已完成"
                        }) : wx.showToast({
                            title: t.data.message
                        });
                    }
                }, t.urlServer.ApiUrl + "/trade_api/order/userconfirm/" + i), a.getOrderList();
            }
        });
    },
    getOrderCount: function() {
        var e = this;
        t.getOrderCount({
            data: {
                teamId: this.data.teamId,
                type: 1
            },
            success: function(t) {
                0 == t.data.status && e.setData({
                    waittindelivery: t.data.data.waittindelivery,
                    waittinget: t.data.data.waittinget,
                    waittingrevoke: t.data.data.waittingrevoke,
                    waittingpay: t.data.data.waittingpay
                });
            }
        });
    }
});