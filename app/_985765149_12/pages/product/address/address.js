var e = require("../../../A93C6C17D69926BFCF5A041083A49EA6.js"), t = require("../../../B9ABCFC5D69926BFDFCDA7C2AFA49EA6.js");

Page({
    data: {
        addressId: "",
        latitude: "",
        longitude: "",
        addressCity: "",
        addressLocation: "",
        addressDetailed: "",
        addressText: "",
        userId: "",
        edit: !1,
        type: "",
        animationAddressMenu: {},
        addressMenuIsShow: !1,
        value: [ 0, 0, 0 ],
        address: "",
        region: []
    },
    onLoad: function(e) {
        this.getUserInfo(), e.type && this.setData({
            type: e.type
        }), e.id && (this.setData({
            addressId: e.id
        }), this.getAddrInfo());
    },
    getUserInfo: function() {
        wx.getStorageSync("member_info") && this.setData({
            userId: wx.getStorageSync("member_info").userId
        });
    },
    bindRegionChange: function(e) {
        console.log("picker发送选择改变，携带值为", e.detail.value), this.setData({
            region: e.detail.value
        });
    },
    getAddrInfo: function(t) {
        var a = this, s = this;
        this.data.addressId && e.wxRequest({
            success: function(e) {
                if (0 == e.data.status) {
                    var d = e.data.data, i = [ d.addressProvince, d.addressCity, d.addressCounty ];
                    s.setData({
                        addressName: d.addressName,
                        addressPhone: d.addressPhone,
                        addressDetailed: d.addressDetailed,
                        region: i
                    }), "function" == typeof t && t.call(a);
                } else wx.showToast({
                    title: e.data.message
                });
            }
        }, e.urlServer.ApiUrl + "/trade_api/address/single/" + s.data.userId + "/" + s.data.addressId);
    },
    saveAddr: function(a) {
        var s = this, d = a.detail.value;
        if (d.inputName.length <= 0) return wx.showToast({
            title: "姓名为空"
        }), !1;
        if (d.inputPhone.length <= 0 || 0 == t.isPhone(d.inputPhone)) return wx.showToast({
            title: "电话格式有误"
        }), !1;
        if (this.data.region.length <= 0) return wx.showToast({
            title: "地址为空"
        }), !1;
        if (d.inputDetail.length <= 0) return wx.showToast({
            title: "详细地址为空"
        }), !1;
        var i = {}, r = "", n = void 0;
        this.data.addressText = "", (n = this.data.addressLocation.split("(")).splice(1, 0, this.data.addressDetailed), 
        n.splice(2, 0, "(");
        for (var o = 0; o < n.length - 1; o++) this.data.addressText += n[o];
        this.data.addressId ? (i = {
            addressName: d.inputName,
            addressPhone: d.inputPhone,
            addressDetailed: d.inputDetail,
            addressProvince: this.data.region[0],
            addressCity: this.data.region[1],
            addressCounty: this.data.region[2],
            addressId: this.data.addressId
        }, r = "/trade_api/address/modify") : (i = {
            addressName: d.inputName,
            addressPhone: d.inputPhone,
            addressDetailed: d.inputDetail,
            addressProvince: this.data.region[0],
            addressCity: this.data.region[1],
            addressCounty: this.data.region[2]
        }, r = "/trade_api/address/add"), e.wxRequest({
            method: "post",
            data: i,
            success: function(e) {
                if (0 == e.data.status) if (1 == s.data.type) {
                    wx.setStorageSync("tempAddr", i);
                    var t = getCurrentPages(), a = t[t.length - 3];
                    console.log(a), a.setData({
                        addEdit: !0
                    }), wx.navigateBack({
                        delta: 1
                    });
                } else wx.navigateBack({
                    delta: 1
                }); else wx.showToast({
                    title: e.data.message
                });
            }
        }, e.urlServer.ApiUrl + r);
    },
    delAddr: function() {
        var t = this;
        wx.showModal({
            title: "提示",
            content: "确认要删除此地址吗",
            success: function(a) {
                a.confirm && e.mofifyAddr({
                    method: "post",
                    data: {
                        addressIsDel: 1,
                        addressId: t.data.addressId
                    },
                    success: function(e) {
                        0 == e.data.status ? wx.navigateBack({
                            delta: 1
                        }) : wx.showToast({
                            title: e.data.message
                        });
                    }
                });
            }
        });
    },
    onShareAppMessage: function(e) {
        return {
            title: "发现一家好店-" + getApp().globalData.storeName + "-邀您来逛逛！",
            desc: getApp().globalData.storeName
        };
    }
});