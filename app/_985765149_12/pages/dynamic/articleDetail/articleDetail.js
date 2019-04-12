var i = require("../../../A93C6C17D69926BFCF5A041083A49EA6.js"), a = require("../../../B9ABCFC5D69926BFDFCDA7C2AFA49EA6.js"), t = getApp();

Page({
    data: {
        id: "",
        showNav: !1,
        info: {}
    },
    onLoad: function(a) {
        this.setData({
            imgHead: i.urlServer.imgHead
        }), a.id && this.setData({
            id: a.id
        }), new t.LoginPannel(), this.judgingLogin();
    },
    judgingLogin: function() {
        wx.getStorageSync("member_info") ? this.getInfo() : (this.setData({
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
        }), this.getInfo();
    },
    getInfo: function() {
        var t = this;
        this.data.id && i.getDynamicsById({
            data: {
                dynimicsId: this.data.id,
                userId: wx.getStorageSync("cardId")
            },
            success: function(i) {
                if (wx.hideLoading(), 0 == i.data.status) {
                    var e = i.data.data;
                    e.dynamicsCover && (e.dynamicsCover = e.dynamicsCover.split(",")), null != e.dynamicsDetail && "" != e.dynamicsDetail && (e.dynamicsDetail = JSON.parse(i.data.data.dynamicsDetail)), 
                    e.createTime = a.timeAgo(e.createTime), t.setData({
                        info: e
                    });
                }
            }
        });
    },
    checkShowNav: function() {
        this.setData({
            showNav: !this.data.showNav
        });
    },
    goPage: function(a) {
        var t = a.currentTarget.dataset.type, e = "";
        e = 1 == t ? "/pages/card/list/list" : 2 == t ? "/pages/card/index/index" : 3 == t ? "/pages/product/index/index" : 4 == t ? "/pages/network/index/index" : "/pages/dynamic/index/index", 
        1 == t ? wx.navigateTo({
            url: e
        }) : wx.switchTab({
            url: e
        }), i.setFormId({
            data: {
                type: 1,
                formId: a.detail.formId
            },
            success: function(i) {
                console.log(i);
            }
        });
    },
    onShareAppMessage: function(i) {
        return {
            title: this.data.info.dynamicsTitle,
            path: "/pages/dynamic/articleDetail/articleDetail?id=" + this.data.id
        };
    }
});