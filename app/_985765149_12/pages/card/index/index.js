var t = require("../../../A93C6C17D69926BFCF5A041083A49EA6.js"), a = require("../../../B9ABCFC5D69926BFDFCDA7C2AFA49EA6.js"), e = getApp(), s = wx.getSystemInfoSync().windowWidth, n = wx.createInnerAudioContext();

Page({
    data: {
        appId: getApp().globalData.crmAppid,
        cardType: 1,
        userInfo: {},
        userId: "",
        imgHead: "",
        screenheight: "",
        teamId: "",
        isMyself: !1,
        isFromShare: !1,
        nowSec: 0,
        count: "",
        isPlay: !1,
        myTeamId: "",
        nums: "",
        isLoad: !1,
        hasTrueNum: !0,
        watchList: []
    },
    onLoad: function(a) {
        this.setData({
            imgHead: t.urlServer.imgHead,
            screenheight: .75 * s,
            isLoad: !0
        }), a.userId || a.scene ? (this.setData({
            userId: a.userId ? a.userId : decodeURIComponent(a.scene),
            isFromShare: !0
        }), wx.setStorageSync("cardId", a.userId), a.teamId && wx.setStorageSync("teamId", a.teamId)) : (wx.getStorageSync("cardId") && this.setData({
            userId: wx.getStorageSync("cardId")
        }), wx.getStorageSync("teamId") && this.setData({
            teamId: wx.getStorageSync("teamId")
        })), new e.LoginPannel(), this.judgingLogin();
    },
    judgingLogin: function() {
        wx.getStorageSync("member_info") ? (null == wx.getStorageSync("member_info").truePhoneNumber && this.setData({
            hasTrueNum: !1
        }), this.getMyInfomation(), this.setMyself(), this.getCard(), this.setCard(), this.getWatch()) : (this.setData({
            isLogin: !1
        }), this.openLoginPannel());
    },
    openLoginPannel: function() {
        this.loginPannel.show({
            loginBack: this.onLogin
        });
    },
    onLogin: function() {
        this.setData({
            "__lgpanel__.isHide": !0
        }), null == wx.getStorageSync("member_info").truePhoneNumber && this.setData({
            hasTrueNum: !1
        }), this.getMyInfomation(), this.setMyself(), this.getCard(), this.setCard(), this.getWatch();
    },
    onHide: function() {
        this.setData({
            isLoad: !1
        });
    },
    onShow: function() {
        !this.data.isLoad && wx.getStorageSync("member_info") && (this.setData({
            userId: wx.getStorageSync("cardId"),
            teamId: wx.getStorageSync("teamId")
        }), this.setMyself(), this.getCard(), this.getWatch()), null == wx.getStorageSync("member_info").truePhoneNumber ? this.setData({
            hasTrueNum: !1
        }) : this.setData({
            hasTrueNum: !0
        });
    },
    onPullDownRefresh: function() {
        this.getCard();
    },
    getWatch: function() {
        var a = this;
        t.getWatchPic({
            data: {
                userId: this.data.userId
            },
            success: function(e) {
                if (0 == e.data.status) {
                    var s = e.data.data;
                    for (var n in s) s[n].user_head_img = -1 == s[n].user_head_img.indexOf("wx") ? t.urlServer.imgHead + s[n].user_head_img : s[n].user_head_img;
                    a.setData({
                        watchList: s
                    });
                }
            }
        });
    },
    goSend: function() {
        wx.navigateTo({
            url: "/pages/card/sendCard/index"
        });
    },
    getMyInfomation: function() {
        var a = this;
        t.getMyInfo({
            success: function(t) {
                console.log(t.data.data), 0 == t.data.status && (a.setData({
                    myTeamId: null != t.data.data.currentTeamId ? t.data.data.currentTeamId : ""
                }), wx.setStorageSync("member_info", t.data.data), console.log(wx.getStorageSync("member_info")));
            }
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
            success: function(t) {},
            fail: function(t) {}
        });
    },
    giveThumbs: function() {
        var a = this;
        this.data.userId != wx.getStorageSync("member_info").userId ? t.giveThumbs({
            data: {
                to: this.data.userId
            },
            success: function(t) {
                0 == t.data.status ? (a.setData({
                    beThumed: !0,
                    "userInfo.thumed": parseInt(a.data.userInfo.thumed + 1)
                }), wx.showToast({
                    title: "已点赞"
                })) : wx.showToast({
                    title: t.data.message
                });
            },
            fail: function(t) {
                console.log(t), wx.showToast({
                    title: t.data.message
                });
            }
        }) : wx.showToast({
            title: "不能给自己点赞哦"
        });
    },
    getCard: function() {
        n.onPlay(function() {
            a.setData({
                count: n.duration
            }), a.setData({
                isPlay: !0
            }), console.log("录音播放中");
        }), n.onTimeUpdate(function() {
            a.setData({
                nowSec: n.currentTime
            }), console.log(a.data.nowSec), console.log("录音播放过程中");
        }), n.onEnded(function() {
            a.setData({
                isPlay: !1,
                nowSec: 0
            }), console.log("录音播放停止");
        }), n.onSeeking(function() {
            console.log("录音改变时间");
        });
        var a = this;
        this.data.userId && t.getInfoUser({
            data: {
                userId: this.data.userId,
                isCord: 1
            },
            success: function(e) {
                0 == e.data.status && (wx.stopPullDownRefresh(), e.data.data.userHeadImg = null != e.data.data.userHeadImg && "" != e.data.data.userHeadImg ? a.setHead(e.data.data.userHeadImg) : "", 
                null != e.data.data.summary && (e.data.data.summary = JSON.parse(e.data.data.summary), 
                "" != e.data.data.summary.mp3 && (n.src = t.urlServer.voiceUrl + e.data.data.summary.mp3)), 
                e.data.data.messageCount > 0 ? (a.setData({
                    nums: e.data.data.messageCount
                }), wx.setStorageSync("nums", e.data.data.messageCount)) : (a.setData({
                    nums: 0
                }), wx.removeStorageSync("nums")), null != e.data.data.pics && (e.data.data.pics = JSON.parse(e.data.data.pics)), 
                a.setData({
                    userInfo: e.data.data,
                    cardType: e.data.data.theme
                }), wx.setStorageSync("teamId", e.data.data.currentTeamId));
            }
        });
    },
    audioPlay: function() {
        n.src && n.play();
    },
    slider2change: function(t) {
        n.seek(t.detail.value);
    },
    setHead: function(t) {
        return -1 != t.indexOf("qlogo") ? t : this.data.imgHead + t;
    },
    creatContact: function(t) {
        var a = {
            firstName: this.data.userInfo.userName,
            mobilePhoneNumber: this.data.userInfo.userPhone
        };
        this.data.userInfo.teamName && (a.organization = this.data.userInfo.teamName), this.data.userInfo.userEmail && (a.email = this.data.userInfo.userEmail), 
        wx.addPhoneContact(a), this.setFormId(t.detail.formId);
    },
    goSetFormId: function(t) {
        this.setFormId(t.detail.formId);
    },
    goBack: function(t) {
        this.setFormId(t.detail.formId), wx.navigateTo({
            url: "/pages/card/list/list"
        });
    },
    callPhone: function(t) {
        this.setFormId(t.detail.formId), a.callPhone(this.data.userInfo.userPhone), this.setLog(8);
    },
    setFormId: function(a) {
        a && t.setFormId({
            data: {
                type: 1,
                formId: a
            },
            success: function(t) {
                console.log(t);
            }
        });
    },
    setBord: function(t) {
        var a = t.currentTarget.dataset.id, e = "", s = void 0;
        console.log(t.detail.formId), this.setFormId(t.detail.formId), 1 == a ? (e = this.data.userInfo.userName, 
        s = 6) : 2 == a ? (e = this.data.userInfo.userEmail, s = 9) : 3 == a ? e = this.data.userInfo.wechatNumber : (e = this.data.userInfo.teamName, 
        s = 10), wx.setClipboardData({
            data: e,
            success: function(t) {
                wx.getClipboardData({
                    success: function(t) {
                        wx.showToast({
                            title: "复制成功"
                        });
                    }
                });
            }
        }), this.setLog(s);
    },
    setLog: function(a) {
        this.data.userId != wx.getStorageSync("member_info").userId && t.addLog({
            data: {
                type: a,
                userId: this.data.userInfo.userId,
                userName: wx.getStorageSync("member_info").userName
            },
            success: function(t) {}
        });
    },
    getNumberToLev: function(a) {
        console.log(a), a.detail.encryptedData ? t.setPhoneNumber({
            method: "post",
            data: {
                encryptedData: a.detail.encryptedData,
                iv: a.detail.iv
            },
            success: function(t) {
                if (0 == t.data.status) {
                    var a = wx.getStorageSync("member_info");
                    a.truePhoneNumber = t.data.data, wx.setStorageSync("member_info", a);
                }
                wx.navigateTo({
                    url: "/pages/index/leavMess/index"
                });
            }
        }) : wx.navigateTo({
            url: "/pages/index/leavMess/index"
        });
    },
    onShareAppMessage: function() {
        return {
            title: "hello,这是" + this.data.userInfo.userName + "的名片,望惠存",
            path: "/pages/card/index/index?userId=" + this.data.userId + "&teamId=" + this.data.teamId
        };
    }
});