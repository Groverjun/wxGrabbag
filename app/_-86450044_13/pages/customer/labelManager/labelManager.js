function t(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var a = require("../../../api/api.js");

Page({
    data: {
        id: "",
        list: [],
        lebelName: "",
        dotIndex: 0,
        dotColor: [ "#D81E06", "#FF9800", "#057C53", "#069AD8", "#9006D8", "#FB3B76", "#0B0348" ]
    },
    onLoad: function(t) {
        t.id && (this.setData({
            id: t.id,
            lebelName: t.name
        }), this.getLables());
    },
    changeColor: function(t) {
        this.setData({
            dotIndex: t.currentTarget.dataset.index
        });
    },
    getLables: function() {
        var t = this;
        a.getLabels({
            data: {
                lebelId: this.data.id
            },
            success: function(a) {
                if (0 == a.data.status && null != a.data.data) {
                    var e = a.data.data[0];
                    for (var s in t.data.dotColor) e.lebelColor == t.data.dotColor[s] && t.setData({
                        dotIndex: s
                    });
                    t.setData({
                        list: e.lebelContent.split(",")
                    });
                }
            }
        });
    },
    inputLableName: function(t) {
        this.setData({
            lebelName: t.detail.value
        });
    },
    inputName: function(a) {
        var e = "list[" + a.target.dataset.index + "]";
        this.setData(t({}, e, a.detail.value));
    },
    addModel: function() {
        this.data.list.push(""), this.setData({
            list: this.data.list
        });
    },
    delModel: function(t) {
        var a = t.target.dataset.index;
        this.data.list.splice(a, 1), this.setData({
            list: this.data.list
        });
    },
    doAdd: function() {
        if (!this.data.lebelName) return wx.showToast({
            title: "请输入标签组名称"
        }), !1;
        if (this.data.list.length <= 0 && "状态" !== this.data.lebelName) return wx.showToast({
            title: "还没添加标签哦"
        }), !1;
        for (var t in this.data.list) if (this.data.list[t].length <= 0 || "" == this.data.list[t]) return wx.showToast({
            title: "请输入标签名称"
        }), !1;
        var e = {
            lebelColor: this.data.dotColor[this.data.dotIndex],
            lebelName: this.data.lebelName
        }, s = "";
        for (var t in this.data.list) s += this.data.list[t] + ",";
        s = s.substr(0, s.length - 1), e.lebelContent = s, console.log(e), this.data.id ? (e.lebelId = this.data.id, 
        a.modifyLabel({
            method: "post",
            data: e,
            success: function(t) {
                if (0 == t.data.status) {
                    var a = getCurrentPages();
                    a[a.length - 2];
                    wx.navigateBack({
                        delta: 2
                    });
                } else wx.showToast({
                    title: t.data.message
                });
            }
        })) : a.addLabels({
            method: "post",
            data: e,
            success: function(t) {
                if (0 == t.data.status) {
                    var a = getCurrentPages();
                    a[a.length - 2];
                    wx.navigateBack({
                        delta: 2
                    });
                } else wx.showToast({
                    title: t.data.message
                });
            }
        });
    },
    delGroup: function() {
        var t = this;
        wx.showModal({
            title: "提示",
            content: "确认要删除此标签组吗？",
            success: function(e) {
                e.confirm && a.deleteLabel({
                    data: {
                        labelId: t.data.id
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
    onShareAppMessage: function() {}
});