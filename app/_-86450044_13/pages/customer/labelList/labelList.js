var e = require("../../../api/api.js");

Page({
    data: {
        list: [],
        label: []
    },
    onLoad: function(e) {
        this.getLabels();
    },
    onShow: function() {
        this.getLabels();
    },
    getLabels: function() {
        var a = this;
        e.getLabels({
            success: function(e) {
                if (0 == e.data.status && null != e.data.data) {
                    var t = e.data.data;
                    for (var l in t) {
                        null != t[l].lebelContent && "" != t[l].lebelContent && (t[l].lebelIndex = -1, t[l].lebelContent = t[l].lebelContent.split(",")), 
                        "状态" == t[l].lebelName && ("" == t[l].lebelContent && (t[l].lebelContent = []), 
                        t[l].lebelContent.push("成交"), t[l].lebelContent.push("流失"));
                        for (var n in t[l].lebelContent) for (var i in a.data.label) a.data.label[i].lebelContent == t[l].lebelContent[n] && (t[l].lebelIndex = a.data.label[i].lebelIndex);
                    }
                    a.setData({
                        list: t
                    });
                }
            }
        });
    },
    goEditPage: function(e) {
        var a = e.currentTarget.dataset.index;
        wx.navigateTo({
            url: "/pages/customer/labelManager/labelManager?id=" + this.data.list[a].lebelId + "&name=" + this.data.list[a].lebelName
        });
    },
    goEdit: function() {
        wx.navigateTo({
            url: "/pages/customer/labelManager/labelManager"
        });
    }
});