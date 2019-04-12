var t = require("../../../A93C6C17D69926BFCF5A041083A49EA6.js");

require("../../../B9ABCFC5D69926BFDFCDA7C2AFA49EA6.js");

Page({
    data: {
        addrList: [],
        type: "",
        prevpage: ""
    },
    onLoad: function(t) {
        t.type && this.setData({
            type: t.type
        });
        var a = getCurrentPages(), e = a[a.length - 2].route;
        this.setData({
            prevpage: e
        }), wx.setStorageSync("addrList", this.data.addrList), this.getList();
    },
    onShow: function() {
        this.getList();
    },
    onHide: function() {
        this.getList();
    },
    getList: function() {
        wx.showLoading({
            title: "加载中..."
        });
        var a = this, e = [];
        t.getAddrList({
            success: function(t) {
                0 == t.data.status && (e = t.data.data, a.setData({
                    addrList: t.data.data
                })), wx.hideLoading();
            }
        });
    },
    goAddr: function(t) {
        var a = t.currentTarget.dataset.id, e = "/pages/product/address/address";
        a && (e += "?id=" + a), wx.navigateTo({
            url: e
        });
    },
    setDefault: function(a) {
        var e = this, s = a.currentTarget.dataset.id;
        t.mofifyAddr({
            method: "post",
            data: {
                addressDefalut: 1,
                addressId: s
            },
            success: function(t) {
                0 == t.data.status ? e.getList() : wx.showToast({
                    title: t.data.message
                });
            }
        });
    },
    confirmAddr: function(t) {
        console.log(1);
        var a = t.currentTarget.dataset.index;
        wx.setStorageSync("addrIndex", a), console.log(a), "pages/product/settlement/settlement" == this.data.prevpage && wx.navigateBack({
            delta: 1
        });
    },
    onShareAppMessage: function(t) {
        return {
            title: "发现一家好店-" + getApp().globalData.storeName + "-邀您来逛逛！",
            desc: getApp().globalData.storeName
        };
    }
});