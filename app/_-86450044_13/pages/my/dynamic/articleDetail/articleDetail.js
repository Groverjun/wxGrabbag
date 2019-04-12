var a = require("../../../../api/api.js"), t = require("../../../../utils/util.js");

Page({
    data: {
        id: "",
        info: {}
    },
    onLoad: function(t) {
        this.setData({
            imgHead: a.urlServer.imgHead
        }), t.id && (this.setData({
            id: t.id
        }), this.getInfo());
    },
    getInfo: function() {
        var i = this;
        a.getDynamicsById({
            data: {
                dynimicsId: this.data.id
            },
            success: function(a) {
                if (wx.hideLoading(), 0 == a.data.status) {
                    var e = a.data.data;
                    if (e.dynamicsCover && (e.dynamicsCover = e.dynamicsCover.split(",")), null != e.dynamicsDetail && "" != e.dynamicsDetail && (e.dynamicsDetail = JSON.parse(a.data.data.dynamicsDetail)), 
                    e.comments.length > 0) {
                        var s = e.comments;
                        for (var n in s) s[n].createTime = t.formatDate(s[n].createTime);
                    }
                    e.createTime = t.timeAgo(e.createTime), i.setData({
                        info: e
                    });
                }
            }
        });
    },
    goDelete: function() {
        var t = this;
        wx.showModal({
            title: "提示",
            content: "确认要删除此文章吗？",
            success: function(i) {
                i.confirm && a.delDynamics({
                    data: {
                        id: t.data.info.dynamicsId
                    },
                    success: function(a) {
                        if (0 == a.data.status) {
                            wx.showToast({
                                title: "已删除"
                            });
                            var t = getCurrentPages();
                            t[t.length - 2];
                            wx.navigateBack({
                                delta: 1
                            });
                        } else wx.showToast({
                            title: a.data.message
                        });
                    }
                });
            }
        });
    },
    onShareAppMessage: function() {
        return {
            title: this.data.info.dynamicsTitle,
            path: "/pages/my/dynamic/articleDetail/articleDetail?id=" + this.data.id
        };
    }
});