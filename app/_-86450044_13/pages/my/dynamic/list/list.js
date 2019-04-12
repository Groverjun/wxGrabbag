var a = require("../../../../api/api.js"), t = (require("../../../../utils/util.js"), 
require("../../../../libs/moment.js"));

Page({
    data: {
        goodsList: [],
        pageId: 1,
        pagesize: 10,
        imgHead: "",
        teamId: "",
        userId: ""
    },
    onLoad: function() {
        this.setData({
            imgHead: a.urlServer.imgHead
        }), wx.showLoading();
    },
    onShow: function() {
        this.getUserId(), this.data.teamId && this.getGoodsList();
    },
    getUserId: function() {
        if (getApp().globalData.teamId) this.setData({
            teamId: getApp().globalData.teamId
        }), this.getGoodsList(); else {
            var a = this;
            this.getTeamId(function() {
                a.getGoodsList();
            });
        }
    },
    getTeamId: function(t) {
        var e = this;
        a.getMyInfo({
            success: function(a) {
                0 == a.data.status ? (e.setData({
                    teamId: a.data.data.currentTeamId
                }), t()) : wx.showToast({
                    title: a.data.message
                });
            }
        });
    },
    getGoodsList: function() {
        wx.showLoading();
        var e = this;
        a.getDynamicsList({
            data: {
                pageId: e.data.pageId,
                pagesize: e.data.pagesize,
                teamId: this.data.teamId
            },
            success: function(a) {
                if (0 == a.data.status && a.data.data.length > 0) {
                    for (var i = a.data.data, s = 0; s < i.length; s++) i[s].createTime = t.unix(i[s].createTime / 1e3).format("YYYY/MM/DD"), 
                    i[s].dynamicsCover && (i[s].dynamicsCover = i[s].dynamicsCover.split(","));
                    e.setData({
                        goodsList: i
                    });
                } else e.setData({
                    goodsList: []
                });
                wx.hideLoading();
            }
        });
    },
    goInfo: function(a) {
        var t = this.data.goodsList[a.currentTarget.dataset.index].dynamicsId;
        this.data.goodsList[a.currentTarget.dataset.index].dynamicsTitle ? wx.navigateTo({
            url: "/pages/my/dynamic/articleDetail/articleDetail?id=" + t
        }) : wx.navigateTo({
            url: "/pages/my/dynamic/dynamicDetail/dynamicDetail?id=" + t
        });
    },
    goGoodsEdit: function() {
        wx.showActionSheet({
            itemList: [ "发布动态", "发布文章" ],
            success: function(a) {
                0 == a.tapIndex ? wx.navigateTo({
                    url: "/pages/my/dynamic/addDynamic/addDynamic"
                }) : wx.navigateTo({
                    url: "/pages/my/dynamic/addArticle/addArticle"
                });
            },
            fail: function(a) {
                console.log(a.errMsg);
            }
        });
    }
});