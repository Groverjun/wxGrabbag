var t = require("../../../A93C6C17D69926BFCF5A041083A49EA6.js"), e = require("../../../B9ABCFC5D69926BFDFCDA7C2AFA49EA6.js"), a = wx.getSystemInfoSync().windowWidth, s = getApp();

Page({
    data: {
        id: "",
        goodsInfo: [],
        pics: [],
        info: {},
        screenheight: a,
        details: "",
        imgHead: "",
        teamId: "",
        userId: "",
        userInfo: "",
        userPhone: "",
        isLogin: !0,
        isMyself: !1,
        hasTrueNum: !0,
        showNav: !1,
        isBuy: !0
    },
    onLoad: function(e) {
        this.setData({
            imgHead: t.urlServer.imgHead
        }), e.id && this.setData({
            id: e.id
        }), e.userId ? (this.setData({
            userId: e.userId,
            teamId: e.teamId
        }), wx.setStorageSync("cardId", e.userId), wx.setStorageSync("teamId", e.teamId)) : wx.getStorageSync("cardId") && this.setData({
            teamId: wx.getStorageSync("teamId"),
            userId: wx.getStorageSync("cardId")
        }), wx.getStorageSync("teamId"), wx.removeStorageSync("goodsList"), wx.removeStorageSync("carList"), 
        new s.LoginPannel(), this.judgingLogin(), this.getCartNum();
    },
    onShow: function() {
        null == wx.getStorageSync("member_info").truePhoneNumber && this.setData({
            hasTrueNum: !1
        }), this.setMyself(), this.getCard(), this.getGoods(), this.setCard(), this.getCartNum();
    },
    onHide: function() {
        this.getCartNum();
    },
    judgingLogin: function() {
        wx.getStorageSync("member_info") ? null == wx.getStorageSync("member_info").truePhoneNumber && this.setData({
            hasTrueNum: !1
        }) : (this.setData({
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
        }), this.setMyself(), this.getCard(), this.getGoods(), this.setCard();
    },
    setMyself: function() {
        wx.getStorageSync("cardId") == wx.getStorageSync("member_info").userId ? this.setData({
            isMyself: !0
        }) : this.setData({
            isMyself: !1
        });
    },
    getCartNum: function() {
        var e = this;
        t.getcartNumber({
            success: function(t) {
                0 == t.data.status && e.setData({
                    cartNum: t.data.data
                });
            }
        });
    },
    getCard: function() {
        var e = this;
        t.getInfoUser({
            data: {
                userId: this.data.userId
            },
            success: function(t) {
                0 == t.data.status && e.setData({
                    userInfo: t.data.data,
                    userPhone: t.data.data.userPhone
                });
            }
        });
    },
    setCard: function() {
        t.addCard({
            data: {
                touserId: this.data.userId
            },
            success: function(t) {}
        });
    },
    setHead: function(e) {
        return e ? -1 == e.indexOf("qlogo") ? t.urlServer.imgHead + e : e : "../../../images/ic_head.png";
    },
    getGoods: function() {
        wx.showLoading();
        var e = this, a = !0;
        t.getGoodsList({
            data: {
                productId: this.data.id,
                userId: this.data.userId,
                teamId: this.data.teamId
            },
            success: function(t) {
                if (console.log(t), 0 == t.data.status && t.data.data.length > 0) {
                    var s = t.data.data[0];
                    s.productPic = null != s.productPic ? s.productPic.split(",") : [], a = 1 == s.canBuy, 
                    e.setData({
                        info: s,
                        isBuy: 1 == s.canBuy
                    }), null != s.productDetail && "" != s.productDetail && e.setData({
                        details: JSON.parse(s.productDetail)
                    });
                }
                wx.hideLoading();
            }
        });
    },
    goBuy: function(e) {
        var a = [], s = [], i = "", n = this.data.info;
        console.log(n), i = n.goodsId, s.push(n), console.log(s), a.push({
            goodsId: i,
            itemNumber: 1
        }), t.amountCalc({
            method: "post",
            data: {
                list: a,
                teamId: this.data.teamId
            },
            success: function(t) {
                wx.setStorageSync("goodsList", s), wx.navigateTo({
                    url: "/pages/product/settlement/settlement"
                });
            }
        });
    },
    callPhone: function() {
        e.callPhone(this.data.userPhone);
    },
    goTeamPage: function() {
        wx.switchTab({
            url: "/pages/network/index/index"
        });
    },
    checkShowNav: function() {
        this.setData({
            showNav: !this.data.showNav
        });
    },
    goleavMess: function() {
        wx.navigateTo({
            url: "/pages/index/leavMess/index"
        });
    },
    addincart: function() {
        var e = this;
        t.addCar({
            method: "post",
            data: {
                goodsId: parseInt(e.data.id),
                itemNumber: 1,
                teamId: e.data.teamId
            },
            success: function(t) {
                0 == t.data.status ? wx.showToast({
                    title: "添加购物车成功",
                    icon: "none"
                }) : wx.showToast({
                    title: t.data.message
                });
            }
        }), this.getCartNum();
    },
    gocart: function() {
        var t = "/pages/product/carts/carts";
        this.data.type && (t += "?type=" + this.data.type), wx.navigateTo({
            url: t
        });
    },
    gopersonal: function() {
        var t = "/pages/product/personal/personal";
        this.data.type && (t += "?type=" + this.data.type), wx.navigateTo({
            url: t
        });
    },
    goPage: function(e) {
        var a = e.currentTarget.dataset.type, s = "";
        s = 1 == a ? "/pages/card/list/list" : 2 == a ? "/pages/card/index/index" : 3 == a ? "/pages/product/index/index" : 4 == a ? "/pages/network/index/index" : "/pages/dynamic/index/index", 
        1 == a ? wx.navigateTo({
            url: s
        }) : wx.switchTab({
            url: s
        }), t.setFormId({
            data: {
                type: 1,
                formId: e.detail.formId
            },
            success: function(t) {}
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
    onShareAppMessage: function() {
        return {
            path: "/pages/product/details/details?userId=" + this.data.userId + "&teamId=" + this.data.teamId + "&id=" + this.data.id
        };
    },
    onShareApp: function() {
        return {
            path: "/pages/product/details/details?userId=" + this.data.userId + "&teamId=" + this.data.teamId + "&id=" + this.data.id
        };
    }
});