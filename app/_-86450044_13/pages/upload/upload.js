var t = require("../../libs/cropper/weCropper.js"), e = wx.getSystemInfoSync(), a = e.windowWidth, o = e.windowHeight - 50;

Page({
    data: {
        cropperOpt: {
            id: "cropper",
            width: a,
            height: o,
            scale: 2.5,
            zoom: 8,
            cut: {
                x: (a - 300) / 2,
                y: (o - 300) / 2,
                width: 300,
                height: 300
            }
        },
        src: "",
        type: "",
        goodsId: "",
        bannerId: "",
        supportBuy: ""
    },
    onLoad: function(e) {
        var r = this.data.cropperOpt, d = e.src;
        this.setData({
            type: e.type,
            src: e.src,
            bannerId: e.bannerId,
            supportBuy: e.supportBuy
        }), 3 == this.data.type && this.setData({
            "cropperOpt.cut": {
                x: (a - 300) / 2,
                y: (o - 160) / 2,
                width: 300,
                height: 160
            }
        }), e.goodsId && this.setData({
            goodsId: e.goodsId
        }), d && (Object.assign(r, {
            src: d
        }), new t(r).on("ready", function(t) {
            console.log("wecropper is ready for work!");
        }).on("beforeImageLoad", function(t) {
            wx.showToast({
                title: "上传中",
                icon: "loading",
                duration: 2e4
            });
        }).on("imageLoad", function(t) {
            wx.hideToast();
        }));
    },
    touchStart: function(t) {
        this.wecropper.touchStart(t);
    },
    touchMove: function(t) {
        this.wecropper.touchMove(t);
    },
    touchEnd: function(t) {
        this.wecropper.touchEnd(t);
    },
    getCropperImage: function() {
        var t = this;
        this.wecropper.getCropperImage(function(e) {
            if (e) {
                "fail" == e && (wx.showToast({
                    title: "ios暂不支持裁剪"
                }), e = t.data.src);
                var a = "/pages/my/editCard/index";
                if (3 == t.data.type || 4 == t.data.type) {
                    var o = getCurrentPages(), r = o[o.length - 2];
                    if (3 == t.data.type) {
                        var d = r.data.list;
                        d[t.data.bannerId].value.push(e), r.setData({
                            list: d
                        });
                    } else r.setData({
                        editImg: !0,
                        teamIcon: e
                    });
                    wx.navigateBack({
                        delta: 1
                    });
                } else 2 == t.data.type && (a = "/pages/product/add/index", t.data.goodsId && (a += "?id=" + t.data.goodsId)), 
                t.data.goodsId ? wx.redirectTo({
                    url: a + "&avatar=" + e + "&supportBuy=" + t.data.supportBuy
                }) : wx.redirectTo({
                    url: a + "?avatar=" + e + "&supportBuy=" + t.data.supportBuy
                });
            } else console.log("获取图片失败，请稍后重试");
        });
    }
});