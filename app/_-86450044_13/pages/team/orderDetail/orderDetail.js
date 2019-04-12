getApp();

var t = require("../../../api/api.js"), e = require("../../../utils/util.js");

Page({
    data: {
        id: "",
        type: "",
        info: {},
        imgHead: "",
        orderStateText: "",
        orderStateDetails: "",
        storeInfo: {}
    },
    onLoad: function(e) {
        this.setData({
            imgHead: t.urlServer.imgHead
        }), e.id && this.setData({
            id: e.id,
            type: e.type
        }), this.getStoreInfo(), this.getInfo();
    },
    getStoreInfo: function() {
        wx.getStorageSync("storeInfo") && this.setData({
            storeInfo: wx.getStorageSync("storeInfo")
        });
    },
    callPhone: function() {
        this.data.info.orderUserPhone ? e.callPhone(this.data.info.orderUserPhone) : wx.showToast({
            title: "客户未提供电话"
        });
    },
    copyWX: function() {
        this.data.info.orderUserPhone ? wx.setClipboardData({
            data: this.data.info.orderUserPhone,
            success: function(t) {
                wx.getClipboardData({
                    success: function(t) {
                        wx.showToast({
                            title: "复制成功"
                        });
                    }
                });
            }
        }) : wx.showToast({
            title: "客户未提供微信"
        });
    },
    getInfo: function() {
        var a = this;
        t.getOrderById({
            data: {
                orderId: this.data.id
            },
            success: function(t) {
                if (0 == t.data.status) {
                    var r = t.data.data;
                    if (r.orderGct = e.formatDateYYYYMMDDMMDDHM(r.orderGct), r.orderGmt = e.formatDateYYYYMMDDMMDDHM(r.orderGmt), 
                    null != r.orderPayRemark) {
                        var o = JSON.parse(r.orderPayRemark).payType;
                        r.orderPayType = o[0].toString().substring(0, o[0].toString().indexOf(":"));
                    }
                    null != r.orderActiveContent && (r.orderActiveContent = r.orderActiveContent.split("||")), 
                    1 == r.orderBespeak && (r.expectTime = e.formatDateYYYYMMDDMMDDHM(r.expectTime)), 
                    r.headUrl = a.setHeadImg(r.headUrl), r.storeIcon = a.setHeadImg(r.storeIcon), a.setData({
                        info: r
                    }), a.getStateInfo();
                }
            }
        });
    },
    setHeadImg: function(e) {
        if (e) return -1 == e.indexOf("qlogo") ? t.urlServer.imgHead + e : e;
    },
    getStateInfo: function() {
        var t = {
            1: "等待付款",
            20: "等待付款",
            30: "等待付款",
            40: "已付款",
            50: "等待商家接单",
            60: "待收货",
            70: "待收货",
            75: "已接单",
            80: "正在配送中",
            90: "已送达",
            500: "已送达",
            600: "已完成",
            610: "已完成",
            700: "已撤销",
            800: "已拒绝",
            900: "已退款"
        }, e = {
            1: "订单已提交",
            20: "订单已提交",
            30: "订单已提交",
            40: "已付款",
            50: "等待商家接单",
            60: this.data.info.orderTransportId > 0 || null == this.data.info.orderTransportId ? "正在分配跑腿员" : " 商家已确认",
            70: "正在分配跑腿员",
            75: "跑腿员已接单",
            80: this.data.info.orderTransportId > 0 || null == this.data.info.orderTransportId ? "为您配送中" : "商家为您配送中",
            90: "确认送达",
            500: "确认送达",
            600: this.data.info.orderTransportId > 0 || null == this.data.info.orderTransportId ? "已为您配送完成" : "正在分配跑腿员",
            610: this.data.info.orderTransportId > 0 || null == this.data.info.orderTransportId ? " 已为您配送完成" : " 正在分配跑腿员",
            700: "已撤销",
            800: "已拒绝",
            900: "已退款到微信钱包，请查收"
        };
        this.data.info.orderExceptionState >> 3 == 1 && 900 != this.data.info.orderState ? this.setData({
            orderStateText: "退款中",
            orderStateDetails: "等待商家确认退款"
        }) : this.setData({
            orderStateText: t[this.data.info.orderState],
            orderStateDetails: e[this.data.info.orderState]
        });
    },
    onShareAppMessage: function(t) {
        return {
            title: "发现一家好店-" + this.data.storeInfo.storeName + "-邀您来逛逛！",
            desc: this.data.storeInfo.storeName
        };
    },
    goPayOrder: function(e) {
        var a = this, r = wx.getExtConfigSync ? wx.getExtConfigSync() : {};
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
                            }), a.getInfo();
                        },
                        fail: function(t) {
                            wx.showToast({
                                title: "支付失败"
                            });
                        }
                    });
                } else wx.showToast({
                    title: t.data.message
                });
            }
        }, t.urlServer.ApiUrl + "/pay/wechat/h5/" + r.merchant.agentId);
    },
    cancelOrder: function(e) {
        var a = this, r = e.currentTarget.dataset.id, o = this.data.info.orderState, s = "";
        s = o <= 50 ? "/order/goods/withdraw/" : "/order/goods/apply/drawback/", wx.showModal({
            title: "提示",
            cancelText: "不撤销",
            confirmText: "撤销",
            content: "您确认要取消该订单吗？",
            success: function(e) {
                e.confirm && t.wxRequest({
                    method: "post",
                    success: function(t) {
                        0 == t.data.status ? (wx.showToast({
                            title: "已撤销"
                        }), a.data.info.orderState = 700, a.setData({
                            info: a.data.info
                        }), o > 50 && (wx.switchTab({
                            url: "/pages/user/order/index"
                        }), getApp().globalData.tabIndex = 3)) : wx.showToast({
                            title: t.data.message
                        });
                    }
                }, t.urlServer.ApiUrl + s + r);
            }
        });
    },
    successOrder: function(e) {
        var a = this, r = e.currentTarget.dataset.id, o = e.currentTarget.dataset.index;
        wx.showModal({
            title: "提示",
            cancelText: "取消",
            confirmText: "确认",
            content: "您确认要完成此订单吗？",
            success: function(e) {
                e.confirm && t.wxRequest({
                    method: "post",
                    success: function(t) {
                        0 == t.data.status ? (wx.showToast({
                            title: "已完成"
                        }), a.data.list[o].orderState = 600, a.setData({
                            list: a.data.list
                        })) : wx.showToast({
                            title: t.data.message
                        });
                    }
                }, t.urlServer.ApiUrl + "/order/goods/user/delivery/" + r);
            }
        });
    },
    goMessage: function() {
        wx.navigateTo({
            url: "/pages/message/leavMess/index?userId=" + this.data.info.userId + "&userHead=" + this.data.info.headUrl
        });
    },
    goSaveUser: function() {
        this.data.info.orderUserPhone ? wx.navigateTo({
            url: "/pages/customer/add/add?name=" + this.data.info.nickName + "&phone=" + this.data.info.orderUserPhone
        }) : wx.navigateTo({
            url: "/pages/customer/add/add?name=" + this.data.info.nickName
        });
    }
});