var e = require("../../../api/api.js"), a = require("../../../utils/util.js"), t = wx.getSystemInfoSync().windowWidth;

Page({
    data: {
        userHead: "",
        userInfo: {
            userWatched: 0,
            userSaved: 0
        },
        imgHead: "",
        pics: [],
        teamId: "",
        cardType: "",
        screenheight: t,
        showCardType: !1,
        appId: getApp().globalData.cardAppid,
        hasTrueNum: !0,
        watchList: []
    },
    onLoad: function(a) {
        this.setData({
            imgHead: e.urlServer.imgHead,
            teamId: getApp().globalData.teamId
        }), this.getInfo(), this.getMyInfo(), this.getWatch();
    },
    onShow: function() {
        this.getInfo(), this.data.cardType || this.getMyInfo(), null == wx.getStorageSync("member_info").truePhoneNumber ? this.setData({
            hasTrueNum: !1
        }) : this.setData({
            hasTrueNum: !0
        });
    },
    setHeadImg: function(a) {
        if (a) {
            var t = -1 == a.indexOf("wx") ? e.urlServer.imgHead + a : a;
            this.setData({
                userHead: t
            });
        } else this.setData({
            userHead: "../../../images/ic_head.png"
        });
    },
    getInfo: function() {
        wx.getStorageSync("member_info") && (this.setData({
            userInfo: wx.getStorageSync("member_info")
        }), null == wx.getStorageSync("member_info").truePhoneNumber && this.setData({
            hasTrueNum: !1
        }), this.setHeadImg(wx.getStorageSync("member_info").userHeadImg));
    },
    goSend: function() {
        wx.navigateTo({
            url: "/pages/my/sendCard/index"
        });
    },
    getMyInfo: function() {
        var a = this;
        wx.getStorageSync("token") && e.getMyInfo({
            success: function(e) {
                0 == e.data.status ? (a.setData({
                    userInfo: e.data.data,
                    cardType: e.data.data.theme,
                    teamId: e.data.data.currentTeamId
                }), a.setHeadImg(e.data.data.userHeadImg), wx.setStorageSync("member_info", e.data.data)) : wx.showToast({
                    title: e.data.message
                });
            }
        });
    },
    goEdit: function(a) {
        a.detail.encryptedData ? e.setPhoneNumber({
            method: "post",
            data: {
                encryptedData: a.detail.encryptedData,
                iv: a.detail.iv
            },
            success: function(e) {
                if (0 == e.data.status) {
                    var a = wx.getStorageSync("member_info");
                    a.truePhoneNumber = e.data.data, wx.setStorageSync("member_info", a), wx.navigateTo({
                        url: "/pages/my/editCard/index"
                    });
                }
            }
        }) : wx.navigateTo({
            url: "/pages/my/editCard/index"
        });
    },
    getWatch: function() {
        var a = this;
        e.getWatchPic({
            data: {
                userId: this.data.userInfo.userId
            },
            success: function(t) {
                if (0 == t.data.status) {
                    var s = t.data.data;
                    for (var n in s) s[n].user_head_img = -1 == s[n].user_head_img.indexOf("wx") ? e.urlServer.imgHead + s[n].user_head_img : s[n].user_head_img;
                    a.setData({
                        watchList: s
                    });
                }
            }
        });
    },
    myPhone: function(e) {
        wx.showActionSheet({
            itemList: [ "复制加微信", "立即拨打" ],
            success: function(e) {
                0 == e.tapIndex ? wx.setClipboardData({
                    data: "18515667629",
                    success: function(e) {
                        wx.showToast({
                            title: "已复制"
                        });
                    }
                }) : 1 == e.tapIndex && wx.makePhoneCall({
                    phoneNumber: "18515667629"
                });
            },
            fail: function(e) {
                console.log(e.errMsg);
            }
        });
    },
    goCompanyDetail: function() {
        var e = getApp().globalData.teamId;
        e && null != e && wx.navigateTo({
            url: "/pages/my/card/index?userId=" + this.data.userInfo.userId + "&page=2&teamId=" + e
        });
    },
    goCall: function() {
        a.callPhone(this.data.userInfo.userPhone);
    },
    callPhone: function() {
        a.callPhone("4006670650");
    },
    copyStr: function() {
        a.copyStr(this.data.userInfo.userEmail);
    },
    switchCardBox: function() {
        this.setData({
            showCardType: !this.data.showCardType
        });
    },
    checkCardType: function(e) {
        var a = e.currentTarget.dataset.type;
        this.setData({
            cardType: a
        });
    },
    saveType: function() {
        var t = this;
        e.modifyMyInfo({
            method: "post",
            data: {
                theme: parseInt(this.data.cardType)
            },
            success: function(e) {
                0 == e.data.status ? (t.setData({
                    showCardType: !1
                }), a.showToast("修改成功")) : a.showToast(e.data.message);
            }
        });
    },
    onShareAppMessage: function(e) {
        return {
            title: "hello,这是" + this.data.userInfo.userName + "的名片,望惠存",
            desc: "hello,这是" + this.data.userInfo.userName + "的名片,望惠存",
            path: "/pages/my/card/index?userId=" + this.data.userInfo.userId + "&userName=" + this.data.userInfo.userName + "&teamId=" + this.data.teamId + "&page=1"
        };
    }
});