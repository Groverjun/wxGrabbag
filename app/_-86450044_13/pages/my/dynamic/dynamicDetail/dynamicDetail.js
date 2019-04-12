var t = require("../../../../api/api.js"), a = require("../../../../utils/util.js");

Page({
    data: {
        info: {}
    },
    onLoad: function(a) {
        this.setData({
            imgHead: t.urlServer.imgHead
        }), a.id && (this.setData({
            id: a.id
        }), this.getInfo());
    },
    getInfo: function() {
        var e = this;
        t.getDynamicsById({
            data: {
                dynimicsId: this.data.id
            },
            success: function(t) {
                if (wx.hideLoading(), 0 == t.data.status) {
                    var i = t.data.data;
                    if (i.dynamicsCover && (i.dynamicsCover = i.dynamicsCover.split(",")), i.comments.length > 0) {
                        var s = i.comments;
                        for (var n in s) s[n].createTime = a.formatDate(s[n].createTime), null != s[n].setHeadImg && (s[n].setHeadImg = a.setHeadImg(s[n].setHeadImg));
                    }
                    console.log(a.timeAgo(i.createTime)), i.createTime = a.timeAgo(i.createTime), e.setData({
                        info: i
                    });
                }
            }
        });
    },
    goDelete: function() {
        var a = this;
        wx.showModal({
            title: "提示",
            content: "确认要删除此动态吗？",
            success: function(e) {
                e.confirm && t.delDynamics({
                    data: {
                        id: a.data.info.dynamicsId
                    },
                    success: function(t) {
                        if (0 == t.data.status) {
                            wx.showToast({
                                title: "已删除"
                            });
                            var a = getCurrentPages();
                            a[a.length - 2];
                            wx.navigateBack({
                                delta: 1
                            });
                        } else wx.showToast({
                            title: t.data.message
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