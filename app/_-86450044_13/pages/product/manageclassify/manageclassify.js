var t, e, a, s, i, o, n, d, r, c = require("../../../api/api.js"), p = [];

Page({
    data: {
        hideEdit: !0,
        typeList: [],
        teamId: "",
        typeId: "",
        typeName: "",
        mainx: 0,
        start: {
            x: 0,
            y: 0
        }
    },
    onLoad: function() {
        wx.getStorageSync("member_info") && this.setData({
            teamId: wx.getStorageSync("member_info").currentTeamId
        }), this.getList();
    },
    getList: function() {
        var t = this;
        c.getGoodsTypeList({
            data: {
                teamId: this.data.teamId
            },
            success: function(e) {
                if (0 == e.data.status) {
                    for (var a = e.data.data, s = 0; s < a.length; s++) a[s].id = s + 1;
                    t.setData({
                        typeList: a
                    }), p = a;
                }
            }
        });
    },
    inputName: function(t) {
        t.detail.value && this.setData({
            typeName: t.detail.value
        });
    },
    editType: function(t) {
        var e = parseInt(t.currentTarget.dataset.id), a = t.currentTarget.dataset.typename;
        this.setData({
            hideEdit: !1,
            typeName: a,
            typeId: e
        });
    },
    delType: function(t) {
        var e = parseInt(t.currentTarget.dataset.id), a = this;
        wx.showModal({
            title: "温馨提示",
            confirmColor: "#de5d49",
            content: "是否删除该分类？",
            success: function(t) {
                t.confirm && a.goDel(e);
            }
        });
    },
    goDel: function(t) {
        var e = this;
        wx.request({
            url: c.urlServer.ApiUrl + "/trade_api/goodstype/delete/type/" + t,
            header: {
                "Content-Type": "application/json",
                token: wx.getStorageSync("token")
            },
            success: function(t) {
                0 == t.data.status ? (wx.showToast({
                    title: "删除成功"
                }), e.getList()) : wx.showToast({
                    title: t.data.message
                });
            }
        });
    },
    hideEditMask: function() {
        this.setData({
            hideEdit: !0
        });
    },
    saveName: function() {
        var t = this, e = this;
        c.modifyType({
            method: "post",
            data: {
                typeName: e.data.typeName,
                typeId: e.data.typeId
            },
            success: function(e) {
                0 == e.data.status ? (t.setData({
                    hideEdit: !0
                }), t.getList()) : wx.showToast({
                    title: e.data.message
                });
            }
        });
    },
    setTopData: function(t) {
        var e = t.currentTarget.dataset.index, a = [];
        a = p;
        var s = p[e];
        a.splice(e, 1), a.splice(0, 0, s), this.setData({
            typeList: a
        });
    },
    movestart: function(i) {
        n = i.target.dataset.index, t = i.touches[0].clientX, e = i.touches[0].clientY, 
        a = i.currentTarget.offsetLeft, s = i.currentTarget.offsetTop;
    },
    move: function(d) {
        r = d.currentTarget.offsetTop, i = d.touches[0].clientX - t + a, o = d.touches[0].clientY - e + s, 
        this.setData({
            mainx: n,
            opacity: .7,
            start: {
                x: i,
                y: o
            }
        });
    },
    moveend: function() {
        if (0 != o) {
            for (var t = [], e = 0; e < this.data.typeList.length; e++) t.push(this.data.typeList[e]);
            var a = this.data.typeList.length;
            d = 1;
            for (var s = 2; s < a; s++) o > 52 * (s - 1) + 2 * s - 26 && (d = s);
            o > 52 * (a - 1) + 2 * a - 26 && (d = a), console.log(d), t.splice(n - 1, 1), t.splice(d - 1, 0, p[n - 1]), 
            p = [];
            for (var i = 0; i < this.data.typeList.length; i++) void 0 != t[i] && (t[i].id = i + 1, 
            p.push(t[i]));
            this.setData({
                mainx: "",
                typeList: t,
                opacity: 1
            });
        }
    },
    saveSort: function() {
        for (var t = [], e = 0; e < p.length; e++) t.push({
            typeId: p[e].typeId,
            typeSortValue: e + 1
        });
        c.updateGoodsType({
            method: "post",
            data: {
                data: t
            },
            success: function(t) {
                0 == t.data.status ? wx.showToast({
                    title: "已保存"
                }) : wx.showToast({
                    title: t.data.message
                });
            }
        });
    }
});