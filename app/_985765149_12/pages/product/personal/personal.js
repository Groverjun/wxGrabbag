var t = require("../../../A93C6C17D69926BFCF5A041083A49EA6.js");

require("../../../B9ABCFC5D69926BFDFCDA7C2AFA49EA6.js");

Page({
    data: {
        userInfo: "",
        imgHead: "",
        teamId: "",
        waittindelivery: 0,
        waittinget: 0,
        waittingrevoke: 0,
        waittingpay: 0
    },
    onLoad: function(a) {
        this.setData({
            imgHead: t.urlServer.imgHead,
            userInfo: wx.getStorageSync("userInfo"),
            teamId: wx.getStorageSync("teamId")
        }), this.getOrderCount();
    },
    onShow: function() {},
    goaddresslist: function() {
        var t = "/pages/product/addresslist/addresslist";
        this.data.type && (t += "?type=" + this.data.type), wx.navigateTo({
            url: t
        });
    },
    goOrder: function(t) {
        getApp().globalData.tabIndex = t.currentTarget.dataset.index;
        var a = getApp().globalData.tabIndex;
        wx.navigateTo({
            url: "/pages/product/orderlist/orderlist?type=" + a
        });
    },
    goOrderlist: function() {
        wx.navigateTo({
            url: "/pages/product/orderlist/orderlist?type=0"
        });
    },
    getOrderCount: function() {
        var a = this;
        t.getOrderCount({
            data: {
                type: 1
            },
            success: function(t) {
                0 == t.data.status && a.setData({
                    waittindelivery: t.data.data.waittindelivery,
                    waittinget: t.data.data.waittinget,
                    waittingrevoke: t.data.data.waittingrevoke,
                    waittingpay: t.data.data.waittingpay
                });
            }
        });
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});