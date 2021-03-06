var t = require("../../../A93C6C17D69926BFCF5A041083A49EA6.js");

require("../../../B9ABCFC5D69926BFDFCDA7C2AFA49EA6.js");

Page({
    data: {
        userInfo: {
            userWatched: 0,
            userSaved: 0
        },
        imgUrl1: "",
        imgUrl2: "",
        imgUrl3: "",
        type: 1
    },
    onLoad: function(e) {
        var a = wx.getStorageSync("token");
        wx.showLoading({
            title: "加载中"
        }), setTimeout(function() {
            wx.hideLoading();
        }, 2e3), this.setData({
            imgUrl1: t.urlServer.ApiUrl + "/common/getCardPic?token=" + a + "&type=1&gp=0.jpg",
            imgUrl2: t.urlServer.ApiUrl + "/common/getCardPic?token=" + a + "&type=2&gp=0.jpg",
            imgUrl3: t.urlServer.ApiUrl + "/common/getCardPic?token=" + a + "&type=3&gp=0.jpg"
        });
    },
    getMyInfo: function() {
        var e = this;
        wx.getStorageSync("token") && t.getMyInfo({
            success: function(t) {
                0 == t.data.status ? (e.setData({
                    userInfo: t.data.data
                }), e.setHeadImg(t.data.data.userHeadImg)) : wx.showToast({
                    title: t.data.message
                });
            }
        });
    },
    downImg: function() {
        var e = wx.getStorageSync("token");
        wx.showLoading({
            title: "保存中..."
        }), wx.downloadFile({
            url: t.urlServer.ApiUrl + "/common/getCardPic?token=" + e + "&type=" + this.data.type + "&gp=0.jpg",
            success: function(t) {
                200 === t.statusCode && wx.saveImageToPhotosAlbum({
                    filePath: t.tempFilePath,
                    success: function(t) {
                        wx.hideLoading(), wx.showToast({
                            title: "已保存"
                        });
                    },
                    fail: function() {
                        wx.hideLoading();
                    }
                });
            }
        });
    },
    switchSwiper: function(t) {
        this.setData({
            type: parseInt(t.detail.current) + 1
        });
    },
    onShareAppMessage: function() {}
});