var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, a = require("../../../../api/api.js"), e = (require("../../../../utils/util.js"), 
wx.getSystemInfoSync().windowWidth);

Page({
    data: {
        dynamicsTitle: "",
        hideAdd: !0,
        list: [],
        arImg: "",
        screenheight: e
    },
    onLoad: function(t) {},
    chooseLogo: function() {
        var t = this;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(a) {
                var e = a.tempFilePaths[0];
                t.data.arImg = e, t.setData({
                    arImg: t.data.arImg
                });
            }
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
                var o = s.tempFilePaths[0];
                t ? i.data.list[e].value = o : i.data.list.push({
                    type: a,
                    value: o
                }), i.setData({
                    list: i.data.list
                });
            }
        });
    },
    delModel: function(t) {
        var a = t.currentTarget.dataset.id;
        this.data.list.splice(a, 1), console.log(this.data.list), this.setData({
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
    inputGoodsName: function(t) {
        t.detail.value && this.setData({
            dynamicsTitle: t.detail.value
        });
    },
    formSubmit: function(t) {
        t.detail.value;
        return this.data.arImg ? this.data.dynamicsTitle ? void this.setSaveData() : (wx.showToast({
            title: "请输入文章标题"
        }), !1) : (wx.showToast({
            title: "请选择文章封面"
        }), !1);
    },
    setSaveData: function() {
        var a = this, e = {}, i = [ a.data.arImg ], s = [];
        wx.showLoading({
            title: "图片上传中...",
            mask: !0
        }), e.dynamicsTitle = this.data.dynamicsTitle, a.uploadImg(i, s, function(i) {
            var s = i[0], o = a.data.list;
            o ? "object" != (void 0 === o ? "undefined" : t(o)) && (o = JSON.parse(o)) : o = [];
            var l = [];
            a.setDetail(o, l, function(t) {
                wx.hideLoading(), e.dynamicsCover = s, 0 != t.length && (e.dynamicsDetail = t, a.setData({
                    list: t
                })), wx.showLoading({
                    title: "信息保存中...",
                    mask: !0
                }), a.saveGoods(e);
            });
        });
    },
    setDetail: function(t, e, i) {
        var s = this, o = t[0];
        return t.length ? "2" != o.type || "2" == o.type && (40 == o.value.length || -1 != o.value.indexOf("img")) ? (console.log(o.value), 
        -1 != o.value.indexOf("img") ? (o.value = o.value.substr(o.value.indexOf("img/") + 4), 
        e.push(o)) : e.push(o), t.shift(), s.setDetail(t, e, i), !1) : void wx.uploadFile({
            url: a.urlServer.ApiUrl + "/file/upload",
            filePath: o.value,
            name: "file",
            success: function(a) {
                var l = JSON.parse(a.data);
                o.value = l.data.list[0].filePath, e.push(o), t.shift(), s.setDetail(t, e, i);
            }
        }) : (i(e), !1);
    },
    uploadImg: function(t, e, i) {
        var s = this, o = t[0];
        if (t.length) return o.indexOf("/img/") > -1 ? (t.shift(), e.push(o), void s.uploadImg(t, e, i)) : void wx.uploadFile({
            url: a.urlServer.ApiUrl + "/file/upload",
            filePath: o,
            name: "file",
            success: function(a) {
                var o = JSON.parse(a.data);
                console.log(o), e.push(o.data.list[0].filePath), t.shift(), s.uploadImg(t, e, i);
            }
        });
        i(e);
    },
    saveGoods: function(t) {
        a.addDynamics({
            method: "post",
            data: t,
            success: function(t) {
                0 == t.data.status ? (wx.showToast({
                    title: "添加成功"
                }), wx.navigateBack()) : wx.showToast({
                    title: t.data.message
                });
            }
        });
    },
    onShareAppMessage: function() {}
});