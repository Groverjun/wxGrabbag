var a = wx.getSystemInfoSync().screenWidth, t = require("../../../../api/api.js");

require("../../../../utils/util.js");

Page({
    data: {
        dyContent: "",
        images: [],
        iheight: .31 * a
    },
    onLoad: function(t) {
        console.log(.31 * a);
    },
    inputGoodsName: function(a) {
        a.detail.value && this.setData({
            dyContent: a.detail.value
        });
    },
    chooseLogo: function() {
        var a = this;
        wx.chooseImage({
            count: 9,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(t) {
                t.tempFilePaths[0];
                var e = a.data.images.concat(t.tempFilePaths);
                a.setData({
                    images: e
                });
            }
        });
    },
    deleteImage: function(a) {
        var t = this, e = t.data.images, s = a.currentTarget.dataset.index;
        wx.showModal({
            title: "提示",
            content: "确定要删除此图片吗？",
            success: function(a) {
                if (a.confirm) console.log("点击确定了"), e.splice(s, 1); else if (a.cancel) return console.log("点击取消了"), 
                !1;
                t.setData({
                    images: e
                });
            }
        });
    },
    uploadImg: function(a, e, s) {
        var i = this, o = a[0];
        a.length ? wx.uploadFile({
            url: t.urlServer.ApiUrl + "/file/upload",
            filePath: o,
            name: "file",
            success: function(t) {
                var o = JSON.parse(t.data);
                e.push(o.data.list[0].filePath), a.shift(), i.uploadImg(a, e, s);
            }
        }) : s(e);
    },
    saveDynamic: function() {
        var a = this;
        if (!this.data.dyContent) return wx.showToast({
            title: "请输入动态内容"
        }), !1;
        if (this.data.images.length > 0) {
            var t = a.data.images, e = [];
            wx.showLoading({
                title: "图片上传中...",
                mask: !0
            }), a.uploadImg(t, e, function(t) {
                var e = t;
                a.doAddData(e);
            });
        } else a.doAddData();
    },
    doAddData: function(a) {
        var e = {
            dynamicsDetail: this.data.dyContent
        };
        a && (e.dynamicsCover = a.join(",")), t.addDynamics({
            method: "post",
            data: e,
            success: function(a) {
                0 == a.data.status ? (wx.showToast({
                    title: "添加成功"
                }), wx.navigateBack()) : wx.showToast({
                    title: a.data.message
                });
            }
        });
    },
    onShareAppMessage: function() {}
});