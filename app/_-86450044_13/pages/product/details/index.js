var t = require("../../../api/api.js");

Page({
    data: {
        hideAdd: !0,
        list: [],
        goodsId: "",
        imgHead: ""
    },
    onLoad: function(a) {
        if (a.id) return this.setData({
            goodsId: a.id,
            imgHead: t.urlServer.imgHead
        }), void this.setGoodsDetails();
        console.log(a.id), this.setGoodsDetails2();
    },
    setGoodsDetails: function() {
        var t = this;
        if (wx.getStorageSync("editDetails")) {
            var a = wx.getStorageSync("editDetails");
            "string" == typeof a && (a = JSON.parse(a));
            for (var e in a) 2 == a[e].type && -1 == a[e].value.indexOf("http") && (a[e].value = t.data.imgHead + a[e].value);
            this.setData({
                list: a
            });
        }
    },
    setGoodsDetails2: function() {
        var t = this;
        if (wx.getStorageSync("goodsDetails")) {
            var a = wx.getStorageSync("goodsDetails");
            for (var e in a) 2 == a[e].type && -1 != a[e].value.indexOf("group") && (a[e].value = t.data.imgHead + a[e].value);
            this.setData({
                list: a
            });
        }
    },
    showAdd: function() {
        this.setData({
            hideAdd: !1
        });
    },
    hideAdd: function() {
        this.setData({
            hideAdd: !0
        });
    },
    addModel: function(t) {
        var a = t.currentTarget.dataset.type;
        2 == a ? this.chooseImg(null, a) : (this.data.list.push({
            type: a,
            value: ""
        }), this.setData({
            list: this.data.list
        })), this.hideAdd();
    },
    chooseImg: function(t, a) {
        var e = "";
        t && (e = t.currentTarget.dataset.id);
        var i = this;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(s) {
                var d = s.tempFilePaths[0];
                t ? i.data.list[e].value = d : i.data.list.push({
                    type: a,
                    value: d
                }), console.log(i.data.list), i.setData({
                    list: i.data.list
                });
            }
        });
    },
    delModel: function(t) {
        var a = t.currentTarget.dataset.id;
        this.data.list.splice(a, 1), this.setData({
            list: this.data.list
        });
    },
    moveModel: function(t) {
        var a = t.currentTarget.dataset.id;
        this.data.list[a] = this.data.list.splice(a - 1, 1, this.data.list[a])[0], this.setData({
            list: this.data.list
        });
    },
    inputText: function(t) {
        var a = t.detail.value, e = t.target.dataset.id;
        this.data.list[e].value = a, this.setData({
            list: this.data.list
        });
    },
    saveDetails: function(t) {
        var a = t.detail.value;
        for (var e in a) if (0 == a[e].length) return wx.showToast({
            title: "请输入内容"
        }), !1;
        var i = this.data.list;
        for (var e in i) 2 == i[e].type && -1 != i[e].value.indexOf("group") && (i[e].value = i[e].value.substr(i[e].value.indexOf("group") - 1));
        wx.setStorageSync("goodsDetails", this.data.list);
        var s = getCurrentPages();
        s[s.length - 2].setData({
            edit: !0
        }), wx.navigateBack();
    }
});