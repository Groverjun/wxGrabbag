var a = require("../../../api/api.js");

Page({
    data: {
        flag: !0,
        typeList: [],
        className: "",
        teamId: ""
    },
    onLoad: function() {
        wx.getStorageSync("member_info") && this.setData({
            teamId: wx.getStorageSync("member_info").currentTeamId
        }), this.getList();
    },
    getList: function() {
        var t = this;
        a.getGoodsTypeList({
            data: {
                teamId: this.data.teamId
            },
            success: function(a) {
                0 == a.data.status ? t.setData({
                    typeList: a.data.data
                }) : wx.showToast({
                    title: a.data.message
                });
            }
        });
    },
    newClass: function() {
        this.setData({
            flag: !1,
            className: ""
        });
    },
    hideClass: function() {
        this.setData({
            flag: !0
        });
    },
    inputName: function(a) {
        a.detail.value && this.setData({
            className: a.detail.value
        });
    },
    addClassify: function() {
        var t = this;
        t.data.className.length >= 2 && t.data.className.length <= 6 ? a.addClassify({
            method: "post",
            data: {
                teamId: this.data.teamId,
                typeName: t.data.className
            },
            success: function(a) {
                0 == a.data.status ? (wx.showToast({
                    title: "添加成功"
                }), t.getList(), t.setData({
                    flag: !0,
                    className: ""
                })) : wx.showToast({
                    title: a.data.message
                });
            }
        }) : wx.showToast({
            title: "分类名有误"
        });
    }
});