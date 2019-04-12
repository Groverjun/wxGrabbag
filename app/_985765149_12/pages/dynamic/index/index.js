function t(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var a, e = require("../../../A93C6C17D69926BFCF5A041083A49EA6.js"), s = require("../../../B9ABCFC5D69926BFDFCDA7C2AFA49EA6.js"), i = getApp(), d = wx.createAnimation({
    duration: 400,
    timingFunction: "linear",
    delay: 0
});

Page((a = {
    data: {
        id: "",
        userId: "",
        pageId: 1,
        pagesize: 10,
        imgHead: "",
        goodsList: [],
        cartType: 1,
        teamId: "",
        isLogin: !0,
        isMyself: !1,
        isFromShare: !1,
        nums: "",
        hasTrueNum: !0,
        isLoad: !1,
        nowIndex: "",
        animationData: "",
        hideInput: !0,
        hasMoreData: !0,
        msg: "",
        commentFlag: !1
    },
    onLoad: function(t) {
        this.setData({
            imgHead: e.urlServer.imgHead,
            isLoad: !0
        }), t.userId ? (this.setData({
            userId: t.userId,
            teamId: t.teamId,
            isFromShare: !0
        }), wx.setStorageSync("cardId", t.userId), wx.setStorageSync("teamId", t.teamId)) : wx.getStorageSync("cardId") && this.setData({
            userId: wx.getStorageSync("cardId"),
            teamId: wx.getStorageSync("teamId")
        }), new i.LoginPannel(), this.judgingLogin();
    },
    onHide: function() {
        this.setData({
            isLoad: !1
        });
    },
    onShow: function() {
        if (!this.data.isLoad && wx.getStorageSync("member_info")) if (this.setData({
            teamId: wx.getStorageSync("teamId"),
            userId: wx.getStorageSync("cardId")
        }), this.data.teamId) this.getCard(), this.setMyself(), this.getGoodsList(); else {
            var t = this;
            this.getCard(function() {
                t.getGoodsList(), t.setMyself();
            });
        }
        null == wx.getStorageSync("member_info").truePhoneNumber ? this.setData({
            hasTrueNum: !1
        }) : this.setData({
            hasTrueNum: !0
        });
    },
    judgingLogin: function() {
        wx.getStorageSync("member_info") ? (null == wx.getStorageSync("member_info").truePhoneNumber && this.setData({
            hasTrueNum: !1
        }), this.setMyself(), this.getCard(), this.getGoodsList(), this.setCard()) : (this.setData({
            isLogin: !1
        }), this.openLoginPannel());
    },
    setHead: function(t) {
        return t ? -1 == t.indexOf("qlogo") ? e.urlServer.imgHead + t : t : "../../../images/ic_head.png";
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
        }), this.setMyself(), this.getCard(), this.getGoodsList(), this.setMyself(), this.setCard();
    },
    setCard: function() {
        this.data.isMyself || e.addCard({
            data: {
                touserId: this.data.userId
            },
            success: function(t) {},
            fail: function(t) {}
        });
    },
    setMyself: function() {
        wx.getStorageSync("cardId") == wx.getStorageSync("member_info").userId ? this.setData({
            isMyself: !0
        }) : this.setData({
            isMyself: !1
        });
    },
    getCard: function(t) {
        var a = this;
        this.data.userId && e.getInfoUser({
            data: {
                userId: this.data.userId
            },
            success: function(e) {
                0 == e.data.status && (e.data.data.teamIcon = null != e.data.data.teamIcon && "" != e.data.data.teamIcon ? a.setHead(e.data.data.teamIcon) : "", 
                a.setData({
                    userInfo: e.data.data,
                    teamId: null != e.data.data.currentTeamId ? e.data.data.currentTeamId : ""
                }), e.data.data.messageCount > 0 ? (a.setData({
                    nums: e.data.data.messageCount
                }), wx.setStorageSync("nums", e.data.data.messageCount)) : (a.setData({
                    nums: 0
                }), wx.removeStorageSync("nums")), wx.setStorageSync("teamId", e.data.data.currentTeamId)), 
                t && t();
            }
        });
    },
    goBack: function() {
        wx.navigateTo({
            url: "/pages/card/list/list"
        });
    },
    getGoodsList: function() {
        var t = this;
        "" != this.data.teamId && null != this.data.teamId ? e.getDynamicsList({
            data: {
                pageId: t.data.pageId,
                pagesize: t.data.pagesize,
                teamId: this.data.teamId,
                userId: this.data.userId
            },
            success: function(a) {
                if (console.log(a), 0 == a.data.status && a.data.data.length > 0) {
                    for (var e = a.data.data, i = 0; i < e.length; i++) null != e[i].dynamicsCover && (e[i].dynamicsCover = e[i].dynamicsCover.split(",")), 
                    e[i].createTime = s.timeAgo(e[i].createTime), e[i].isShow = !1, e[i].isOpen = !1;
                    t.setData({
                        goodsList: e
                    }), e.length < 10 && t.setData({
                        hasMoreData: !1
                    });
                } else t.setData({
                    goodsList: []
                });
            }
        }) : (t.setData({
            goodsList: []
        }), wx.hideLoading());
    }
}, t(a, "goBack", function() {
    wx.navigateTo({
        url: "/pages/card/list/list"
    });
}), t(a, "goDetail", function(t) {
    var a = t.currentTarget.dataset.id;
    this.setFormId(t.detail.formId), wx.navigateTo({
        url: "/pages/dynamic/articleDetail/articleDetail?id=" + a
    });
}), t(a, "setFormId", function(t) {
    t && e.setFormId({
        data: {
            type: 1,
            formId: t
        },
        success: function(t) {
            console.log(t);
        }
    });
}), t(a, "getNumberToLev", function(t) {
    t.detail.encryptedData ? e.setPhoneNumber({
        method: "post",
        data: {
            encryptedData: t.detail.encryptedData,
            iv: t.detail.iv
        },
        success: function(t) {
            if (0 == t.data.status) {
                var a = wx.getStorageSync("member_info");
                a.truePhoneNumber = t.data.data, wx.setStorageSync("member_info", a), wx.navigateTo({
                    url: "/pages/index/leavMess/index"
                });
            }
        }
    }) : wx.navigateTo({
        url: "/pages/index/leavMess/index"
    });
}), t(a, "switchOpen", function(a) {
    var e = a.currentTarget.dataset.index, s = "goodsList[" + e + "].isOpen";
    console.log(s), this.setData(t({}, s, !this.data.goodsList[e].isOpen));
}), t(a, "goShowComm", function(a) {
    var e = a.currentTarget.dataset.index, s = "goodsList[" + e + "].isShow";
    console.log(s);
    var i = this.data.goodsList[e].isShow;
    if (console.log(i), i) this.animation = d, d.translateX(300).step(), this.setData({
        animationData: d.export()
    }), setTimeout(function() {
        var a;
        d.translateX(0).step(), this.setData((a = {
            animationData: d.export()
        }, t(a, s, !1), t(a, "commentFlag", !1), a));
    }.bind(this), 200); else {
        var n;
        this.animation = d, d.translateX(300).step(), this.setData((n = {
            nowIndex: e,
            animationData: d.export()
        }, t(n, s, !0), t(n, "commentFlag", !0), n)), setTimeout(function() {
            d.translateX(0).step(), this.setData({
                animationData: d.export(),
                hideInput: !0
            });
        }.bind(this), 200);
    }
}), t(a, "goThumbUp", function(a) {
    var s = this, i = a.currentTarget.dataset.index, d = "goodsList[" + i + "].isShow", n = "goodsList[" + i + "].thumb";
    if (this.setFormId(a.detail.formId), this.data.goodsList[i].thumb) e.goCancelThumbUp({
        data: {
            dynamicsId: this.data.goodsList[i].dynamicsId
        },
        success: function(a) {
            if (0 == a.data.status) {
                var e;
                s.data.goodsList[i].nameList;
                for (var o in s.data.goodsList[i].nameList) wx.getStorageSync("member_info").userName == s.data.goodsList[i].nameList[o] && s.data.goodsList[i].nameList.splice(o, 1);
                s.setData((e = {}, t(e, d, !1), t(e, n, !1), t(e, "goodsList", s.data.goodsList), 
                e));
            }
        }
    }); else {
        var o = {
            dynamicsId: this.data.goodsList[i].dynamicsId,
            userId: this.data.userId
        };
        null != this.data.goodsList[i].dynamicsTitle && (o.title = this.data.goodsList[i].dynamicsTitle), 
        e.goThumbUp({
            data: o,
            success: function(a) {
                if (0 == a.data.status) {
                    var e;
                    s.data.goodsList[i].nameList.unshift(wx.getStorageSync("member_info").userName), 
                    s.setData((e = {}, t(e, d, !1), t(e, n, !0), t(e, "goodsList", s.data.goodsList), 
                    e));
                }
            }
        });
    }
}), t(a, "setFormId", function(t) {
    e.setFormId({
        data: {
            type: 1,
            formId: t
        },
        success: function(t) {
            console.log(t);
        }
    });
}), t(a, "addComment", function(a) {
    var e, s = a.currentTarget.dataset.index, i = "goodsList[" + s + "].isShow";
    this.setFormId(a.detail.formId), this.setData((e = {}, t(e, i, !1), t(e, "hideInput", !1), 
    t(e, "nowIndex", s), t(e, "msg", ""), e));
}), t(a, "inputMessage", function(t) {
    this.setData({
        msg: t.detail.value
    });
}), t(a, "formSubmit", function() {
    var t = this;
    this.data.msg && e.addComment({
        method: "post",
        data: {
            dynamicsId: this.data.goodsList[this.data.nowIndex].dynamicsId,
            commentDetail: this.data.msg,
            title: this.data.goodsList[this.data.nowIndex].dynamicsTitle,
            userId: this.data.userId
        },
        success: function(a) {
            if (0 == a.data.status) {
                var e = wx.getStorageSync("member_info");
                t.data.goodsList[t.data.nowIndex].comments.push({
                    userName: e.userName,
                    commentDetail: t.data.msg,
                    msg: ""
                }), t.setData({
                    goodsList: t.data.goodsList,
                    hideInput: !0
                });
            }
        }
    });
}), t(a, "onPullDownRefresh", function() {
    var t = this;
    t.setData({
        pageId: 1
    }), t.getGoodsList();
}), t(a, "onReachBottom", function() {
    var t = this;
    t.data.hasMoreData && (t.setData({
        pageId: t.data.pageId + 1
    }), t.getGoodsList());
}), t(a, "onPageScroll", function(a) {
    if (this.data.commentFlag) {
        var e = "goodsList[" + this.data.nowIndex + "].isShow";
        this.setData(t({}, e, !1));
    }
}), t(a, "prewImg", function(t) {
    var a = this, e = t.currentTarget.dataset.index, s = t.currentTarget.dataset.iindex, i = [], d = a.data.goodsList[e].dynamicsCover;
    for (var n in d) i.push(a.data.imgHead + d[n]);
    wx.previewImage({
        current: a.data.imgHead + a.data.goodsList[e].dynamicsCover[s],
        urls: i
    });
}), t(a, "onShareAppMessage", function(t) {
    var a = t.target.dataset.index, e = "";
    return e = null != this.data.goodsList[a].dynamicsTitle ? "/pages/dynamic/articleDetail/articleDetail?id=" + this.data.goodsList[a].dynamicsId : "/pages/dynamic/index/index?userId=" + this.data.userId + "&teamId=" + this.data.teamId, 
    {
        path: e
    };
}), a));