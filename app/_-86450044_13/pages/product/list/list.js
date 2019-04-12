var t = require("../../../api/api.js"), a = require("../../../utils/util.js"), s = require("../../../libs/moment.js");

Page({
    data: {
        goodsList: [],
        pageId: 1,
        pagesize: 100,
        imgHead: "",
        showFlag: !1,
        showType: "",
        teamId: "",
        appId: getApp().globalData.cardAppid,
        userId: "",
        supportBuy: ""
    },
    onLoad: function() {
        this.setData({
            imgHead: t.urlServer.imgHead,
            teamId: getApp().globalData.teamId
        }), wx.showLoading(), this.getUserId();
    },
    getUserId: function() {
        if (wx.getStorageSync("member_info") && this.setData({
            userId: wx.getStorageSync("member_info").userId
        }), getApp().globalData.teamId) this.setData({
            teamId: getApp().globalData.teamId
        }), this.getGoodsList(), this.getTeamInfo(); else {
            var t = this;
            this.getTeamId(function() {
                t.getGoodsList(), t.getTeamInfo();
            });
        }
    },
    getTeamId: function(a) {
        var s = this;
        t.getMyInfo({
            success: function(t) {
                0 == t.data.status ? (s.setData({
                    teamId: t.data.data.currentTeamId
                }), a()) : wx.showToast({
                    title: t.data.message
                });
            }
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
                    showType: t.data.data.teamInfo.productShowType,
                    supportBuy: t.data.data.teamInfo.supportBuy
                });
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    getGoodsList: function() {
        wx.showLoading();
        var a = this;
        t.getGoodsList({
            data: {
                teamId: this.data.teamId
            },
            success: function(t) {
                if (0 == t.data.status && t.data.data.length > 0) {
                    for (var e = t.data.data, o = 0; o < e.length; o++) e[o].createTime = s.unix(e[o].createTime / 1e3).format("YYYY/MM/DD"), 
                    e[o].productPic = null != e[o].productPic ? e[o].productPic.split(",")[0] : "";
                    a.setData({
                        goodsList: e
                    });
                }
                wx.hideLoading();
            }
        });
    },
    goInfo: function(t) {
        var a = t.currentTarget.dataset.goodsid;
        wx.navigateTo({
            url: "/pages/product/add/index?id=" + a + "&supportBuy=" + this.data.supportBuy
        });
    },
    goGoodsEdit: function() {
        wx.navigateTo({
            url: "/pages/product/add/index?supportBuy=" + this.data.supportBuy
        });
    },
    modifyGoods: function(s, e) {
        var o = this;
        t.modifyGoods({
            method: "post",
            data: {
                goodsid: s,
                sellState: e
            },
            success: function(t) {
                0 == t.data.status ? 1 == e ? wx.showToast({
                    title: "已上架"
                }) : (wx.showToast({
                    title: "已下架"
                }), o.setData({
                    isHide: !0
                })) : a.showToast(t.data.message);
            }
        });
    },
    delGoods: function(s) {
        var e = this, o = s.currentTarget.dataset.index, d = s.currentTarget.dataset.goodsid;
        wx.showModal({
            title: "提示",
            content: "是否删除此商品吗",
            success: function(s) {
                s.confirm && t.wxRequest({
                    method: "post",
                    success: function(t) {
                        0 == t.data.status ? (e.data.goodsList.splice(o, 1), e.setData({
                            goodsList: e.data.goodsList
                        }), a.showToast("删除成功")) : a.showToast(t.data.message);
                    }
                }, t.urlServer.ApiUrl + "/product/delete/product?productId=" + d);
            }
        });
    },
    switchCardBox: function() {
        this.setData({
            showFlag: !this.data.showFlag
        });
    },
    checkType: function(t) {
        this.setData({
            showType: t.currentTarget.dataset.type
        });
    },
    saveType: function() {
        var s = this;
        t.modifyTeam({
            method: "post",
            data: {
                showType: parseInt(this.data.showType)
            },
            success: function(t) {
                0 == t.data.status ? (s.setData({
                    showFlag: !1
                }), a.showToast("修改成功")) : a.showToast(t.data.message);
            }
        });
    },
    goClassify: function() {
        wx.navigateTo({
            url: "/pages/product/classify/classify"
        });
    }
});