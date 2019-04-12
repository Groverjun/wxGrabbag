var a = require("../../../api/api.js"), e = require("../../../utils/util.js"), t = (getApp().globalData, 
getApp()), s = wx.getSystemInfoSync().windowWidth;

Page({
    data: {
        userId: "",
        userName: "",
        userInfo: {
            userWatched: 0,
            userSaved: 0,
            thumed: 0
        },
        userHead: "",
        isOld: !1,
        beThumed: !1,
        list: [],
        isShow: !1,
        imgHead: "",
        page: "",
        teamId: "",
        teamName: "",
        typeName: "",
        initUserId: "",
        cardType: 1,
        screenheight: s,
        appId: getApp().globalData.cardAppid,
        hasTrueNum: !0,
        watchList: []
    },
    onLoad: function(e) {
        this.setData({
            imgHead: a.urlServer.imgHead
        }), e && this.setData({
            initUserId: e.userId,
            userId: e.userId,
            teamId: e.teamId,
            userName: e.userName,
            page: e.page
        }), new t.LoginPannel(), this.judgingLogin();
    },
    judgingLogin: function() {
        wx.getStorageSync("member_info") ? (null == wx.getStorageSync("member_info").truePhoneNumber && this.setData({
            hasTrueNum: !1
        }), this.setOldInfo(), this.data.initUserId == wx.getStorageSync("member_info").userId ? this.getMyInfo() : this.getInfo(), 
        this.setCard(), this.getWatch()) : this.openLoginPannel();
    },
    openLoginPannel: function() {
        this.loginPannel.show({
            loginBack: this.onLogin
        });
    },
    onLogin: function() {
        this.setData({
            "__lgpanel__.isHide": !0
        });
        var a = wx.getStorageSync("member_info");
        null == a.truePhoneNumber && this.setData({
            hasTrueNum: !1
        }), a.currentTeamId ? getApp().globalData.teamId = a.currentTeamId : getApp().globalData.teamId = a.userTeamId, 
        this.setOldInfo(), this.data.initUserId == wx.getStorageSync("member_info").userId ? this.getMyInfo() : this.getInfo(), 
        this.setCard(), this.getWatch();
    },
    getWatch: function() {
        var e = this;
        a.getWatchPic({
            data: {
                userId: this.data.userId
            },
            success: function(t) {
                if (0 == t.data.status) {
                    var s = t.data.data;
                    for (var i in s) s[i].user_head_img = -1 == s[i].user_head_img.indexOf("wx") ? a.urlServer.imgHead + s[i].user_head_img : s[i].user_head_img;
                    e.setData({
                        watchList: s
                    });
                }
            }
        });
    },
    setOldInfo: function() {
        null != wx.getStorageSync("member_info").userPhone && this.setData({
            isOld: !0
        });
    },
    getInfo: function() {
        var e = this;
        a.getUserInfo({
            data: {
                userId: this.data.userId
            },
            success: function(a) {
                0 == a.data.status && (e.setData({
                    userInfo: a.data.data,
                    beThumed: a.data.data.beThumed,
                    teamName: a.data.data.teamName,
                    typeName: a.data.data.typeName,
                    cardType: a.data.data.theme
                }), e.setHeadImg(a.data.data.userHeadImg), e.data.teamId ? e.getTeamInfo() : null != a.data.data.teamDetail && e.setDetails(a.data.data.teamDetail));
            },
            fail: function(a) {
                console.log(a);
            }
        });
    },
    getMyInfo: function() {
        var e = this;
        wx.getStorageSync("token") && a.getMyInfo({
            success: function(a) {
                0 == a.data.status ? (e.setData({
                    userInfo: a.data.data,
                    beThumed: a.data.data.beThumed,
                    teamName: a.data.data.teamName,
                    typeName: a.data.data.typeName,
                    cardType: a.data.data.theme
                }), e.setHeadImg(a.data.data.userHeadImg), null != a.data.data.teamDetail && e.setDetails(a.data.data.teamDetail)) : wx.showToast({
                    title: a.data.message
                });
            }
        });
    },
    getTeamInfo: function() {
        var e = this;
        a.getTeamInfoV1({
            data: {
                teamId: this.data.teamId
            },
            success: function(a) {
                0 == a.data.status && (e.setData({
                    teamName: a.data.data.teamName,
                    typeName: a.data.data.tradeTypeName
                }), null != a.data.data.teamDetail && e.setDetails(a.data.data.teamDetail));
            },
            fail: function(a) {
                console.log(a);
            }
        });
    },
    setHeadImg: function(e) {
        if (e) {
            var t = -1 == e.indexOf("wx") ? a.urlServer.imgHead + e : e;
            this.setData({
                userHead: t
            });
        } else this.setData({
            userHead: "../../../images/ic_head.png"
        });
    },
    creatCard: function(e) {
        var t = this;
        e.detail.encryptedData ? a.setPhoneNumber({
            method: "post",
            data: {
                encryptedData: e.detail.encryptedData,
                iv: e.detail.iv
            },
            success: function(a) {
                if (0 == a.data.status) {
                    var e = wx.getStorageSync("member_info");
                    e.truePhoneNumber = a.data.data, wx.setStorageSync("member_info", e), t.data.isOld ? wx.switchTab({
                        url: "/pages/my/index/index"
                    }) : wx.navigateTo({
                        url: "/pages/my/editCard/index"
                    });
                }
            }
        }) : this.data.isOld ? wx.switchTab({
            url: "/pages/my/index/index"
        }) : wx.navigateTo({
            url: "/pages/my/editCard/index"
        });
    },
    giveThumbs: function() {
        var e = this;
        this.data.beThumed || this.data.initUserId == wx.getStorageSync("member_info").userId ? wx.showToast({
            title: "已点赞"
        }) : a.giveThumbs({
            data: {
                to: this.data.initUserId
            },
            success: function(a) {
                0 == a.data.status ? (e.setData({
                    beThumed: !0,
                    "userInfo.thumed": parseInt(e.data.userInfo.thumed + 1)
                }), wx.showToast({
                    title: "已点赞"
                })) : wx.showToast({
                    title: a.data.message
                });
            },
            fail: function(a) {
                console.log(a), wx.showToast({
                    title: a.data.message
                });
            }
        });
    },
    saveUserData: function() {
        var e = this, t = {
            firstName: this.data.userInfo.userName,
            mobilePhoneNumber: this.data.userInfo.userPhone
        };
        this.data.userInfo.teamName && (t.organization = this.data.userInfo.teamName), this.data.userInfo.userEmail && (t.email = this.data.userInfo.userEmail), 
        t.success = function(t) {
            a.saveCustomerCount({
                data: {
                    userId: e.data.userInfo.userId
                },
                success: function(a) {}
            });
        }, wx.addPhoneContact(t);
    },
    setDetails: function(a) {
        "string" == typeof a && (a = JSON.parse(a));
        for (var e in a) if (2 == a[e].type) 40 == a[e].value.length && (a[e].value = this.data.imgHead + a[e].value); else if (4 == a[e].type) for (var t in a[e].value) 40 == a[e].value[t].length && (a[e].value[t] = this.data.imgHead + a[e].value[t]);
        this.setData({
            list: a
        });
    },
    saveMember: function() {
        if (getApp().globalData.teamId && null != getApp().globalData.teamId) {
            var a = "/pages/customer/add/add?name=" + this.data.userInfo.userName + "&userId=" + this.data.userId;
            this.data.userInfo.userPhone && (a += "&phone=" + this.data.userInfo.userPhone), 
            this.data.userInfo.userEmail && (a += "&email=" + this.data.userInfo.userEmail), 
            this.data.userInfo.teamName && (a += "&teamName=" + this.data.userInfo.teamName), 
            wx.navigateTo({
                url: a
            });
        } else wx.showModal({
            title: "温馨提示",
            content: "你还没有自己的团队，请先去创建哦",
            confirmText: "去创建",
            success: function(a) {
                a.confirm && wx.navigateTo({
                    url: "/pages/my/company/index"
                });
            }
        });
    },
    showDeatails: function() {
        this.setData({
            isShow: !0
        });
    },
    goCall: function() {
        e.callPhone(this.data.userInfo.userPhone);
    },
    copyStr: function() {
        e.copyStr(this.data.userInfo.userEmail);
    },
    setCard: function() {
        a.addCard({
            data: {
                touserId: this.data.userId
            },
            success: function(a) {
                a.data.status;
            },
            fail: function(a) {
                console.log(a);
            }
        });
    },
    onShareAppMessage: function(a) {
        return {
            title: "hello,这是" + this.data.userInfo.userName + "的名片,望惠存",
            desc: "hello,这是" + this.data.userInfo.userName + "的名片,望惠存",
            path: "/pages/my/card/index?userId=" + this.data.userInfo.userId + "&userName=" + this.data.userInfo.userName
        };
    }
});