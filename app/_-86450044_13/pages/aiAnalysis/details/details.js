var e = require("../../../libs/wxcharts.js"), a = require("../../../api/api.js"), t = require("../../../utils/util.js"), s = getApp(), r = null, n = null, o = 320;

try {
    o = wx.getSystemInfoSync().windowWidth;
} catch (e) {
    console.error("getSystemInfoSync failed!");
}

Page({
    data: {
        user_Id: "",
        user_name: "",
        user_head_img: "",
        card_see: "",
        message_see: "",
        office_see: "",
        product_see: "",
        total_see: "",
        list: [],
        turnover: "",
        pageId: 1,
        pageSize: 10,
        hasMoreData: !0,
        appId: s.globalData.cardAppid,
        windowWidth: o,
        userPhone: "",
        truePhoneNumber: ""
    },
    onLoad: function(e) {
        e.user_Id && this.setData({
            user_Id: e.user_Id
        }), this.getCard(), this.getUserInfo(), this.getList();
    },
    getCard: function() {
        var e = this;
        a.getInfoUser({
            data: {
                userId: this.data.user_Id
            },
            success: function(a) {
                0 == a.data.status && e.setData({
                    userPhone: a.data.data.userPhone,
                    truePhoneNumber: null != a.data.data.truePhoneNumber ? a.data.data.truePhoneNumber : ""
                });
            }
        });
    },
    getUserInfo: function() {
        var e = this;
        a.getPre({
            data: {
                userId: this.data.user_Id
            },
            success: function(a) {
                if (0 == a.data.status) {
                    var s = a.data.data;
                    e.setData({
                        user_name: s.user_name,
                        total_see: s.total_see,
                        user_head_img: t.setHeadImg(s.user_head_img),
                        mesPer: parseInt(s.message_see / s.total_see * 100),
                        cardPer: parseInt(s.card_see / s.total_see * 100),
                        proPer: parseInt(s.product_see / s.total_see * 100),
                        offPer: parseInt(s.office_see / s.total_see * 100),
                        turnover: parseInt((parseInt(s.product_see) + parseInt(s.office_see)) / s.total_see * 100)
                    }), e.setPie(), e.setRing();
                }
            }
        });
    },
    setPie: function() {
        var a = 320, t = this;
        try {
            a = wx.getSystemInfoSync().windowWidth;
        } catch (e) {
            console.error("getSystemInfoSync failed!");
        }
        r = new e({
            animation: !0,
            canvasId: "pieCanvas",
            type: "pie",
            series: [ {
                name: "对我感兴趣的",
                data: t.data.cardPer,
                color: "#745AF2"
            }, {
                name: "喜欢产品",
                data: t.data.proPer,
                color: "#26C6DA"
            }, {
                name: "看重公司",
                data: t.data.offPer,
                color: "#FC4B6C"
            } ],
            width: a,
            height: 300,
            dataLabel: !0
        });
    },
    setRing: function() {
        var a = this;
        (n = new e({
            animation: !0,
            canvasId: "ringCanvas",
            type: "ring",
            extra: {
                ringWidth: 4,
                pie: {
                    offsetAngle: -45
                }
            },
            title: {
                name: "成交率",
                color: "#BCBBBC",
                fontSize: 10
            },
            subtitle: {
                name: a.data.turnover + "%",
                color: "#7cb5ec",
                fontSize: 10
            },
            series: [ {
                name: "成交率",
                data: a.data.turnover,
                stroke: !1
            }, {
                name: "",
                data: 35,
                stroke: !1,
                color: "#E8EFF1"
            } ],
            disablePieStroke: !1,
            width: 100,
            height: 100,
            dataLabel: !1,
            legend: !1,
            background: "#fff",
            padding: 0
        })).addEventListener("renderComplete", function() {
            console.log("renderComplete");
        }), setTimeout(function() {
            n.stopAnimation();
        }, 500);
    },
    getList: function() {
        var e = this;
        a.getLogs({
            data: {
                pageId: this.data.pageId,
                pageSize: this.data.pageSize,
                userId: this.data.user_Id
            },
            success: function(a) {
                if (0 == a.data.status) {
                    var s = a.data.data.list;
                    if (s.length > 0) {
                        for (var r in s) s[r].createTime = t.formatDateMMDDHM(s[r].createTime);
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
    touchHandler: function(e) {
        console.log(r.getCurrentDataIndex(e));
    },
    onReachBottom: function() {
        var e = this;
        e.data.hasMoreData && (e.setData({
            pageId: e.data.pageId + 1
        }), e.getList());
    },
    callPhone: function() {
        this.data.truePhoneNumber ? t.callPhone(this.data.truePhoneNumber) : wx.showToast({
            title: "客户未提供电话"
        });
    },
    copyWX: function() {
        this.data.truePhoneNumber ? wx.setClipboardData({
            data: this.data.truePhoneNumber,
            success: function(e) {
                wx.getClipboardData({
                    success: function(e) {
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
    goMessage: function() {
        wx.navigateTo({
            url: "/pages/message/leavMess/index?userId=" + this.data.user_Id + "&userHead=" + this.data.user_head_img
        });
    },
    goSaveUser: function() {
        this.data.userPhone ? wx.navigateTo({
            url: "/pages/customer/add/add?name=" + this.data.user_name + "&phone=" + this.data.userPhone
        }) : wx.navigateTo({
            url: "/pages/customer/add/add?name=" + this.data.user_name
        });
    }
});