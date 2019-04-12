getApp();

var e = require("../../../A93C6C17D69926BFCF5A041083A49EA6.js"), t = require("../../../B9ABCFC5D69926BFDFCDA7C2AFA49EA6.js");

Page({
    data: {
        id: "",
        type: "",
        info: {},
        imgHead: "",
        orderStateText: "",
        orderStateDetails: "",
        storeInfo: {},
        orderId: "",
        orderUserPhone: ""
    },
    onLoad: function(t) {
        this.setData({
            imgHead: e.urlServer.imgHead
        }), t.id && this.setData({
            id: t.id,
            type: t.type
        }), this.setData({
            orderId: wx.getStorageSync("orderId")
        }), this.getStoreInfo(), this.getInfo();
    },
    getStoreInfo: function() {
        wx.getStorageSync("storeInfo") && this.setData({
            storeInfo: wx.getStorageSync("storeInfo")
        });
    },
    getInfo: function() {
        var r = this;
        e.wxRequest({
            success: function(e) {
                if (0 == e.data.status) {
                    var a = e.data.data;
                    if (console.log(a), a.orderGct = t.formatDateYYYYMMDDMMDDHM(a.orderGct), a.orderGmt = t.formatDateYYYYMMDDMMDDHM(a.orderGmt), 
                    null != a.orderPayRemark) {
                        var o = JSON.parse(a.orderPayRemark).payType;
                        a.orderPayType = o[0].toString().substring(0, o[0].toString().indexOf(":"));
                    }
                    null != a.orderActiveContent && (a.orderActiveContent = a.orderActiveContent.split("||")), 
                    1 == a.orderBespeak && (a.expectTime = t.formatDateYYYYMMDDMMDDHM(a.expectTime)), 
                    r.setData({
                        info: a
                    });
                }
            }
        }, e.urlServer.ApiUrl + "/trade_api/getOrder/singgleOrder?orderId=" + this.data.orderId);
    },
    onShareAppMessage: function(e) {
        return {
            title: "发现一家好店-" + this.data.storeInfo.storeName + "-邀您来逛逛！",
            desc: this.data.storeInfo.storeName
        };
    },
    cancelOrder: function(t) {
        var r = "", a = t.currentTarget.dataset.id;
        r = "/trade_api/order/userRequestCallback/", wx.showModal({
            title: "提示",
            cancelText: "取消",
            confirmText: "确认",
            content: "您确认要申请退款吗？",
            success: function(t) {
                t.confirm && e.wxRequest({
                    method: "get",
                    success: function(e) {
                        0 == e.data.status ? (wx.showToast({
                            title: "申请退款成功，等待商家审核"
                        }), wx.navigateTo({
                            url: "/pages/product/orderlist/orderlist"
                        })) : wx.showToast({
                            title: e.data.message
                        });
                    }
                }, e.urlServer.ApiUrl + r + a);
            }
        });
    }
});