var a = require("../../../api/api.js");

Page({
    data: {
        hideAdd: !0,
        list: [],
        goodsId: "",
        imgHead: ""
    },
    onLoad: function(t) {
        this.setData({
            imgHead: a.urlServer.imgHead
        }), this.getPhotos();
    },
    getPhotos: function() {
        var t = this;
        a.getMyInfo({
            success: function(a) {
                if (wx.hideLoading(), 0 == a.data.status && "" != a.data.data.pics && null != a.data.data.pics) {
                    var i = JSON.parse(a.data.data.pics);
                    for (var s in i) i[s].value = t.data.imgHead + i[s].value;
                    t.setData({
                        list: i
                    });
                }
            }
        });
    },
    chooseImg: function() {
        var a = this;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(t) {
                var i = t.tempFilePaths[0];
                a.data.list.push({
                    value: i
                }), a.setData({
                    list: a.data.list
                });
            }
        });
    },
    delModel: function(a) {
        var t = a.currentTarget.dataset.id;
        this.data.list.splice(t, 1), this.setData({
            list: this.data.list
        });
    },
    moveModel: function(a) {
        var t = a.currentTarget.dataset.id;
        this.data.list[t] = this.data.list.splice(t - 1, 1, this.data.list[t])[0], this.setData({
            list: this.data.list
        });
    },
    inputText: function(a) {
        var t = a.detail.value, i = a.target.dataset.id;
        this.data.list[i].value = t, this.setData({
            list: this.data.list
        });
    },
    saveDetails: function(a) {
        var t = this, i = t.data.list, s = [];
        this.data.list.length <= 0 && t.modifyInfo(), wx.showLoading({
            title: "图片上传中...",
            mask: !0
        }), t.uploadImg(i, s, function(a) {
            var i = a;
            for (var s in i) i[s].value.length > 40 && (i[s].value = i[s].value.substr(i[s].value.lastIndexOf("/") + 1));
            t.modifyInfo(i);
        });
    },
    uploadImg: function(t, i, s) {
        var e = this, d = t[0];
        return t.length ? d.value.indexOf("/img/") > -1 ? (t.shift(), i.push(d), e.uploadImg(t, i, s), 
        !1) : void wx.uploadFile({
            url: a.urlServer.ApiUrl + "/file/upload",
            filePath: d.value,
            name: "file",
            success: function(a) {
                var d = JSON.parse(a.data);
                console.log(d), i.push({
                    value: d.data.list[0].filePath
                }), t.shift(), e.uploadImg(t, i, s);
            }
        }) : (s(i), !1);
    },
    modifyInfo: function(t) {
        var i = {};
        i = t ? {
            pics: JSON.stringify(t)
        } : {
            pics: ""
        }, a.modifyMyInfo({
            method: "post",
            data: i,
            success: function(a) {
                wx.hideLoading(), 0 == a.data.status ? wx.navigateBack() : wx.showToast({
                    title: a.data.message
                });
            }
        });
    }
});