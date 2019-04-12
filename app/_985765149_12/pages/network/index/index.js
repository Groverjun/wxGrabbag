var t = require("../../../A93C6C17D69926BFCF5A041083A49EA6.js"), e = wx.getSystemInfoSync().windowWidth;

Page({
    data: {
        teamId: "",
        details: "",
        isMyself: !1,
        myBannerTop: [ "../../../../../images/guy.png" ],
        screenheight: .53 * e,
        nums: "",
        userId: "",
        hasTrueNum: !0,
        isLoad: !1
    },
    onLoad: function(e) {
        this.setData({
            imgHead: t.urlServer.imgHead,
            isLoad: !0
        }), wx.getStorageSync("teamId") && this.setData({
            teamId: wx.getStorageSync("teamId"),
            userId: wx.getStorageSync("cardId")
        }), null == wx.getStorageSync("member_info").truePhoneNumber && this.setData({
            hasTrueNum: !1
        }), this.getTeam(), this.setCard(), this.setNums(), this.setMyself();
    },
    onHide: function() {
        this.setData({
            isLoad: !1
        });
    },
    onShow: function() {
        this.data.isLoad || (this.setData({
            teamId: wx.getStorageSync("teamId")
        }), this.getTeam(), this.setMyself(), this.setNums()), null == wx.getStorageSync("member_info").truePhoneNumber ? this.setData({
            hasTrueNum: !1
        }) : this.setData({
            hasTrueNum: !0
        });
    },
    setNums: function() {
        wx.getStorageSync("nums") ? this.setData({
            nums: wx.getStorageSync("nums")
        }) : this.setData({
            nums: 0
        });
    },
    setMyself: function() {
        wx.getStorageSync("cardId") == wx.getStorageSync("member_info").userId ? this.setData({
            isMyself: !0
        }) : this.setData({
            isMyself: !1
        });
    },
    setCard: function() {
        t.addCard({
            data: {
                touserId: this.data.userId
            },
            success: function(t) {
                t.data.status;
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    getTeam: function() {
        var e = this;
        "" != this.data.teamId && null != this.data.teamId ? t.getTeamInfo({
            data: {
                teamId: this.data.teamId,
                userId: this.data.userId
            },
            success: function(t) {
                0 == t.data.status && (null != t.data.data.teamInfo.teamDetail && "" != t.data.data.teamInfo.teamDetail ? e.setData({
                    details: JSON.parse(t.data.data.teamInfo.teamDetail)
                }) : e.setData({
                    details: ""
                }));
            }
        }) : this.setData({
            details: ""
        });
    },
    goBack: function() {
        wx.navigateTo({
            url: "/pages/card/list/list"
        });
    },
    getNumberToLev: function(e) {
        e.detail.encryptedData ? t.setPhoneNumber({
            method: "post",
            data: {
                encryptedData: e.detail.encryptedData,
                iv: e.detail.iv
            },
            success: function(t) {
                if (0 == t.data.status) {
                    var e = wx.getStorageSync("member_info");
                    e.truePhoneNumber = t.data.data, wx.setStorageSync("member_info", e), wx.navigateTo({
                        url: "/pages/index/leavMess/index"
                    });
                }
            }
        }) : wx.navigateTo({
            url: "/pages/index/leavMess/index"
        });
    },
    previewImage: function(t) {
        var e = t.target.dataset.id, a = [];
        a.push(this.data.imgHead + this.data.details[e].value), wx.previewImage({
            urls: a
        });
    },
    onShareAppMessage: function() {}
});