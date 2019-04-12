var t = require("../../../A93C6C17D69926BFCF5A041083A49EA6.js"), a = (require("../../../B9ABCFC5D69926BFDFCDA7C2AFA49EA6.js"), 
getApp());

Page({
    data: {
        id: "",
        userId: "",
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
        typeList: [],
        typeId: "",
        currentType: -1,
        teamInfo: "",
        cartNum: 0
    },
    onLoad: function(e) {
        this.setData({
            imgHead: t.urlServer.imgHead,
            isLoad: !0
        }), e.userId ? (this.setData({
            userId: e.userId,
            teamId: e.teamId,
            isFromShare: !0
        }), wx.setStorageSync("cardId", e.userId), wx.setStorageSync("teamId", e.teamId)) : wx.getStorageSync("cardId") && this.setData({
            userId: wx.getStorageSync("cardId"),
            teamId: wx.getStorageSync("teamId")
        }), console.log(wx.getStorageSync("teamId") + "     asdfdsfsa"), new a.LoginPannel(), 
        this.judgingLogin(), this.getCartNum();
    },
    onHide: function() {
        this.setData({
            isLoad: !1
        }), this.getCartNum();
    },
    onShow: function() {
        if (!this.data.isLoad && wx.getStorageSync("member_info")) if (this.setData({
            teamId: wx.getStorageSync("teamId"),
            userId: wx.getStorageSync("cardId")
        }), this.data.teamId) this.getCard(), this.getTeamInfo(), this.setMyself(), this.getGoodsList(); else {
            var t = this;
            this.getCard(function() {
                t.getTeamInfo(), t.getGoodsList(), t.setMyself();
            });
        }
        null == wx.getStorageSync("member_info").truePhoneNumber ? this.setData({
            hasTrueNum: !1
        }) : this.setData({
            hasTrueNum: !0
        }), this.getCartNum();
    },
    judgingLogin: function() {
        wx.getStorageSync("member_info") ? (null == wx.getStorageSync("member_info").truePhoneNumber && this.setData({
            hasTrueNum: !1
        }), this.setMyself(), this.getCard(), this.getTeamInfo(), this.getGoodsList(), this.setCard(), 
        this.getTypeList()) : (this.setData({
            isLogin: !1
        }), this.openLoginPannel());
    },
    getCartNum: function() {
        var a = this;
        t.getcartNumber({
            success: function(t) {
                0 == t.data.status && a.setData({
                    cartNum: t.data.data
                });
            }
        });
    },
    setHead: function(a) {
        return a ? -1 == a.indexOf("qlogo") ? t.urlServer.imgHead + a : a : "../../../images/ic_head.png";
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
        }), this.setMyself(), this.getCard(), this.getGoodsList(), this.setCard(), this.setMyself(), 
        this.getTypeList();
    },
    getTypeList: function() {
        var a = this;
        t.getGoodsTypeList({
            data: {
                teamId: this.data.teamId,
                ischeck: 1
            },
            success: function(t) {
                0 == t.data.status ? a.setData({
                    typeList: t.data.data
                }) : wx.showToast({
                    title: t.data.message
                });
            }
        }), this.getCartNum();
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
    setMyself: function() {
        wx.getStorageSync("cardId") == wx.getStorageSync("member_info").userId ? this.setData({
            isMyself: !0
        }) : this.setData({
            isMyself: !1
        });
    },
    getTeamInfo: function() {
        var a = this;
        t.getTeamInfo({
            data: {
                teamId: this.data.teamId
            },
            success: function(t) {
                0 == t.data.status && a.setData({
                    cartType: t.data.data.teamInfo.productShowType
                });
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    getCard: function(a) {
        var e = this, s = e.data.userId;
        e.data.userId && t.getInfoUser({
            data: {
                userId: s
            },
            success: function(t) {
                0 == t.data.status && (t.data.data.teamIcon = null != t.data.data.teamIcon && "" != t.data.data.teamIcon ? e.setHead(t.data.data.teamIcon) : "", 
                e.setData({
                    userInfo: t.data.data,
                    cardType: t.data.data.theme,
                    teamId: null != t.data.data.currentTeamId ? t.data.data.currentTeamId : ""
                }), console.log(t.data.data), t.data.data.messageCount > 0 ? (e.setData({
                    nums: t.data.data.messageCount
                }), wx.setStorageSync("nums", t.data.data.messageCount)) : (e.setData({
                    nums: 0
                }), wx.removeStorageSync("nums")), wx.setStorageSync("teamIcon", t.data.data.teamIcon), 
                wx.setStorageSync("teamId", t.data.data.currentTeamId)), a && a();
            }
        });
    },
    goBack: function() {
        wx.navigateTo({
            url: "/pages/card/list/list"
        });
    },
    getGoodsList: function() {
        wx.showLoading();
        var a = this;
        if ("" != this.data.teamId && null != this.data.teamId) {
            var e = {
                teamId: this.data.teamId,
                userId: this.data.userId
            };
            this.data.typeId && (e.typeId = this.data.typeId), t.getGoodsList({
                data: e,
                success: function(t) {
                    if (console.log(t), 0 == t.data.status && t.data.data.length > 0) {
                        for (var e = t.data.data, s = 0; s < e.length; s++) e[s].productPic = null != e[s].productPic ? e[s].productPic.split(",")[0] : "";
                        a.setData({
                            goodsList: e
                        });
                    } else a.setData({
                        goodsList: []
                    });
                    wx.hideLoading();
                }
            });
        } else a.setData({
            goodsList: []
        });
        this.getCartNum();
    },
    goDetail: function(t) {
        this.setFormId(t.detail.formId);
        var a = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/product/details/details?id=" + a
        });
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
    getNumberToLev: function(a) {
        a.detail.encryptedData ? t.setPhoneNumber({
            method: "post",
            data: {
                encryptedData: a.detail.encryptedData,
                iv: a.detail.iv
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
    },
    setType: function(t) {
        t.detail;
        var a = t.currentTarget.dataset.id;
        console.log(a), 1 == t.currentTarget.dataset.type ? (this.setData({
            currentType: -1,
            typeId: ""
        }), wx.pageScrollTo({
            scrollTop: 0,
            duration: 300
        })) : this.setData({
            currentType: t.currentTarget.dataset.index,
            typeId: t.currentTarget.dataset.id,
            pageId: 1
        }), this.setData({
            pageId: 1
        }), this.getGoodsList();
    },
    onShareAppMessage: function() {
        return {
            path: "/pages/product/index/index?userId=" + this.data.userId + "&teamId=" + this.data.teamId
        };
    }
});