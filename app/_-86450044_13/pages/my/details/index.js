var t = require("../../../api/api.js"), a = wx.getSystemInfoSync().windowWidth;

Page({
    data: {
        hideAdd: !0,
        list: [],
        imgHead: "",
        teamId: "",
        isEdit: !1,
        screenheight: .53 * a,
        tType: "",
        fontSizeItems: [ {
            name: "小",
            value: "11px",
            checked: "true"
        }, {
            name: "中",
            value: "13px"
        }, {
            name: "大",
            value: "15px"
        } ],
        tempPath: ""
    },
    onLoad: function(a) {
        this.setData({
            imgHead: t.urlServer.imgHead
        }), this.getMyInfo();
    },
    onShow: function() {},
    getMyInfo: function() {
        var a = this;
        wx.getStorageSync("token") && t.getMyInfo({
            success: function(t) {
                if (0 == t.data.status && null != t.data.data.teamDetail && "" != t.data.data.teamDetail) {
                    var e = t.data.data.teamDetail;
                    "string" == typeof e && (e = JSON.parse(e));
                    for (var i in e) if (2 == e[i].type) 40 == e[i].value.length && (e[i].value = a.data.imgHead + e[i].value); else if (4 == e[i].type) for (var s in e[i].value) 40 == e[i].value[s].length && (e[i].value[s] = a.data.imgHead + e[i].value[s]);
                    a.setData({
                        list: e
                    });
                }
            }
        });
    },
    setGoodsDetails2: function() {
        var t = this;
        if (wx.getStorageSync("companyDetail")) {
            var a = wx.getStorageSync("companyDetail");
            "string" == typeof a && (a = JSON.parse(a));
            for (var e in a) 2 == a[e].type && 40 == a[e].value.length && (a[e].value = t.data.imgHead + a[e].value);
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
        console.log(a), a && this.setData({
            tType: a
        }), 2 == a ? this.chooseImg(null, a) : 4 == a ? (this.data.list.push({
            type: a,
            value: []
        }), this.setData({
            list: this.data.list
        })) : 5 == a ? this.chooseVideo(null, a) : (this.data.list.push({
            type: a,
            value: ""
        }), this.setData({
            list: this.data.list
        })), this.hideAdd();
    },
    chooseVideo: function(t, a) {
        var e = "";
        t && (e = t.currentTarget.dataset.id);
        var i = this;
        wx.chooseVideo({
            compressed: !0,
            sourceType: [ "album", "camera" ],
            maxDuration: 60,
            camera: "back",
            success: function(s) {
                var l = s.tempFilePath;
                console.log(s.tempFilePath), t ? i.data.list[e].value = l : i.data.list.push({
                    type: a,
                    value: l
                }), i.setData({
                    list: i.data.list
                }), console.log(l);
            }
        });
    },
    getPath: function(t) {
        var a = this;
        if (a.data.tempPath) {
            var e = a.data.tempPath, i = e.lastIndexOf("/") + 1, s = e.lastIndexOf(".") - i, l = e.substr(i, s);
            if (console.log("path：" + e), console.log("vid：" + l), l) {
                var o = "http://vv.video.qq.com/getinfo?vids=" + l + "&platform=101001&charge=0&otype=json";
                wx.request({
                    url: o,
                    success: function(e) {
                        var i = (e.data.replace(/QZOutputJson=/, "") + "qwe").replace(/;qwe/, ""), s = JSON.parse(i);
                        if (console.log(s), s.vl.vi[0].fn) {
                            var l = s.vl.vi[0].fn, o = s.vl.vi[0].fvkey, n = s.vl.vi[0].ul.ui[0].url;
                            console.log(t.currentTarget.dataset.id + "   " + a.data.list[t.currentTarget.dataset.id].value), 
                            t ? a.data.list[t.currentTarget.dataset.id].value = n + l + "?vkey=" + o : a.data.list.push({
                                type: 6,
                                value: a.data.list[t.currentTarget.dataset.id].value
                            }), a.setData({
                                list: a.data.list
                            });
                        } else wx.showToast({
                            title: "视频资源不正确"
                        });
                    }
                });
            } else wx.showToast({
                title: "视频链接无效"
            });
        } else wx.showToast({
            title: "请输入视频链接"
        });
    },
    chooseImg: function(t, a) {
        console.log(1);
        var e = "";
        t && (e = t.currentTarget.dataset.id);
        var i = this;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(s) {
                var l = s.tempFilePaths[0];
                t ? i.data.list[e].value = l : i.data.list.push({
                    type: a,
                    value: l
                }), i.setData({
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
    inputLink: function(t) {
        var a = t.detail.value;
        this.setData({
            tempPath: a
        });
    },
    inputText: function(t) {
        var a = t.detail.value, e = t.target.dataset.id;
        this.data.list[e].value = a, this.setData({
            list: this.data.list
        });
    },
    saveDetails: function(t) {
        var a = t.detail.value, e = this;
        for (var i in a) if (0 == a[i].length) return wx.showToast({
            title: "请输入内容"
        }), !1;
        var s = this.data.list;
        for (var i in s) 2 == s[i].type && -1 != s[i].value.indexOf("img") && (s[i].value = s[i].value.substr(s[i].value.lastIndexOf("img/") + 4));
        wx.setStorageSync("companyInfo", this.data.list);
        var l = [], o = e.data.list, n = {};
        wx.showLoading({
            title: "图片上传中...",
            mask: !0
        }), e.setDetail(o, l, function(t) {
            if (console.log(t), 0 != t.length) {
                var a = t;
                for (var i in a) if (2 == a[i].type) a[i].value.indexOf("img") >= 0 && (a[i].value = a[i].value.substr(a[i].value.indexOf("img/") + 4)); else if (4 == a[i].type) for (var s in a[i].value) a[i].value[s].indexOf("img") >= 0 && (a[i].value[s] = a[i].value[s].substr(a[i].value[s].indexOf("img/") + 4));
                n.detail = JSON.stringify(t);
            } else n.detail = "";
            console.log(n.detail), e.modifyTeam(n);
        });
    },
    setDetail: function(a, e, i) {
        var s = this, l = a[0];
        if (!a.length || 0 == a.length) return i(e), !1;
        if (console.log(a), 4 == l.type) {
            var o = [];
            s.uploadBannerFile(l.value, o, function(t) {
                console.log("执行完毕"), l.value = t, e.push(l), a.shift(), console.log(a), s.setDetail(a, e, i);
            });
        } else {
            if ("2" != l.type || "2" == l.type && 40 == l.value.length) return e.push(l), a.shift(), 
            s.setDetail(a, e, i), !1;
            wx.uploadFile({
                url: t.urlServer.ApiUrl + "/file/upload",
                filePath: l.value,
                name: "file",
                success: function(t) {
                    var o = JSON.parse(t.data);
                    l.value = o.data.list[0].filePath, e.push(l), a.shift(), s.setDetail(a, e, i);
                }
            });
        }
    },
    uploadBannerFile: function(a, e, i) {
        var s = 0;
        !function l() {
            if (!(s >= a.length)) return a[s].indexOf("img") >= 0 ? (e.push(a[s]), s++, void l()) : void wx.uploadFile({
                url: t.urlServer.ApiUrl + "/file/upload",
                filePath: a[s],
                name: "file",
                success: function(t) {
                    var o = JSON.parse(t.data);
                    e.push(o.data.list[0].filePath), parseInt(s) + 1 >= a.length ? i(e) : (s++, console.log(s, e), 
                    l());
                }
            });
            i(e);
        }();
    },
    modifyTeam: function(a) {
        t.modifyTeam({
            method: "post",
            data: a,
            success: function(t) {
                0 == t.data.status && (wx.hideLoading(), wx.navigateBack());
            }
        });
    },
    chooseLogo: function(t) {
        var a = t.currentTarget.dataset.id;
        t.currentTarget.dataset.i;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(t) {
                var e = t.tempFilePaths[0];
                wx.navigateTo({
                    url: "/pages/upload/upload?src=" + e + "&type=3&bannerId=" + a
                });
            }
        });
    },
    delLogo: function(t) {
        var a = t.currentTarget.dataset.id, e = t.currentTarget.dataset.i;
        this.data.list[a].value.splice(e, 1), this.setData({
            list: this.data.list
        });
    }
});