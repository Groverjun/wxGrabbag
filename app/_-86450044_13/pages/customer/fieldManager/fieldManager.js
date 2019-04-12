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
        list: [],
        array: [ "必填", "选填" ],
        isRequired: !1,
        state: ""
    },
    onLoad: function(t) {
        this.getFiled();
    },
    getFiled: function() {
        var t = this;
        a.getfield({
            data: {
                teamId: getApp().globalData.teamId
            },
            success: function(a) {
                0 == a.data.status && t.setData({
                    list: JSON.parse(a.data.data.idText),
                    isRequired: !!(!0 & a.data.data.state),
                    state: a.data.data.state
                });
            }
        });
    },
    addModel: function() {
        this.data.list.push({
            required: !1,
            name: ""
        }), this.setData({
            list: this.data.list
        });
    },
    inputName: function(a) {
        var e = "list[" + a.currentTarget.dataset.index + "].name";
        this.setData(t({}, e, a.detail.value));
    },
    delModel: function(t) {
        var a = t.currentTarget.dataset.index;
        console.log(a), this.data.list.splice(a, 1), this.setData({
            list: this.data.list
        });
    },
    bindPickerChange: function(a) {
        var e = "list[" + a.currentTarget.dataset.index + "].required";
        this.setData(t({}, e, 0 == a.detail.value));
    },
    bindPickerChangeWechat: function(t) {
        this.setData({
            isRequired: 0 == t.detail.value
        });
    },
    modifyFild: function() {
        var t = this;
        for (var e in this.data.list) if (this.data.list[e].name.length <= 0 || "" == this.data.list[e].name) return wx.showToast({
            title: "请输入字段名称"
        }), !1;
        var i = 0;
        i = t.data.isRequired ? 65534 & t.data.state | 1 : 65534 & t.data.state | 0, a.modifyFild({
            method: "post",
            data: {
                idText: JSON.stringify(this.data.list),
                state: i
            },
            success: function(t) {
                if (0 == t.data.status) {
                    wx.showToast({
                        title: "修改成功"
                    });
                    var a = getCurrentPages();
                    a[a.length - 2].setData({
                        isEditFiled: !0
                    }), wx.navigateBack({
                        delta: 1
                    });
                }
            }
        });
    }
});