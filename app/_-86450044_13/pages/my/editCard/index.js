var e = getApp(), a = require("../../../api/api.js"), t = require("../../../utils/util.js");

Page({
    data: {
        userHead: "../../../images/ic_head.png",
        editImg: !1,
        userInfo: {},
        userName: "",
        userPhone: "",
        userEmail: "",
        userPosition: "",
        isEdit: !1,
        wechatNumber: ""
    },
    onLoad: function(a) {
        var t = a.avatar;
        t && this.setData({
            userHead: t,
            editImg: !0
        }), new e.LoginPannel(), this.judgingLogin(), this.initValidate();
    },
    onShow: function() {
        wx.getStorageSync("member_info") && (this.getMyInfo(), this.getInfo());
    },
    judgingLogin: function() {
        wx.getStorageSync("member_info") || this.openLoginPannel();
    },
    openLoginPannel: function() {
        this.loginPannel.show({
            loginBack: this.onLogin
        });
    },
    onLogin: function() {
        this.setData({
            "__lgpanel__.isHide": !0
        }), this.getMyInfo(), this.getInfo();
    },
    inputUserName: function(e) {
        this.setData({
            userName: e.detail.value
        });
    },
    inputUserPhone: function(e) {
        this.setData({
            userPhone: e.detail.value
        });
    },
    inputWechatNumber: function(e) {
        this.setData({
            wechatNumber: e.detail.value
        });
    },
    inputUserEmail: function(e) {
        this.setData({
            userEmail: e.detail.value
        });
    },
    inputUserPosition: function(e) {
        this.setData({
            userPosition: e.detail.value
        });
    },
    initValidate: function() {
        this.WxValidate = e.wxValidate({
            userName: {
                required: !0,
                minlength: 2
            },
            userPhone: {
                required: !0,
                tel: !0
            }
        }, {
            userName: {
                required: "请填写姓名"
            },
            userPhone: {
                required: "请输入手机号"
            },
            userEmail: {
                email: "请输入正确的邮箱"
            }
        });
    },
    goPage: function(e) {
        var a = e.currentTarget.dataset.type, t = "";
        1 == a ? t = "/pages/my/introduction/introduction" : 2 == a && (t = "/pages/my/myPhoto/index"), 
        this.setCompanyStore(), wx.navigateTo({
            url: t
        });
    },
    getCompanyStore: function() {
        if (wx.getStorageSync("companyEdit")) {
            var e = wx.getStorageSync("companyEdit");
            e.userName && this.setData({
                "userInfo.userName": e.userName
            }), e.userPhone && this.setData({
                "userInfo.userPhone": e.userPhone
            }), e.userEmail && this.setData({
                "userInfo.userEmail": e.userEmail
            }), e.userPosition && this.setData({
                "userInfo.userPosition": e.userPosition
            });
        }
    },
    setCompanyStore: function() {
        var e = {};
        this.data.userName && (e.userName = this.data.userName), this.data.userPhone && (e.userPhone = this.data.userPhone), 
        this.data.userEmail && (e.userEmail = this.data.userEmail), this.data.userPosition && (e.userPosition = this.data.userPosition), 
        wx.setStorageSync("companyEdit", e);
    },
    setHeadImg: function(e) {
        if (e) {
            var t = -1 == e.indexOf("wx") ? a.urlServer.imgHead + e : e;
            this.setData({
                userHead: t
            });
        } else this.setData({
            userHead: "../../../images/ic_head.png"
        });
    },
    getInfo: function() {
        this.getMyInfo();
    },
    getMyInfo: function(e) {
        var t = this;
        a.getMyInfo({
            success: function(a) {
                0 == a.data.status ? (e ? wx.switchTab({
                    url: "/pages/my/index/index"
                }) : ("" != a.data.data.summary && null != a.data.data.summary && (a.data.data.summary = JSON.parse(a.data.data.summary)), 
                t.setData({
                    userInfo: a.data.data,
                    wechatNumber: a.data.data.wechatNumber
                }), (t.data.userInfo.userTeamId == t.data.userInfo.currentTeamId || null == t.data.userInfo.userTeamId && null == t.data.userInfo.currentTeamId) && t.setData({
                    isEdit: !0
                }), t.data.editImg || t.setHeadImg(a.data.data.userHeadImg)), t.getCompanyStore(), 
                wx.setStorageSync("member_info", a.data.data)) : wx.showToast({
                    title: a.data.message
                });
            }
        });
    },
    changeHead: function() {
        var e = this;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(a) {
                var t = a.tempFilePaths;
                wx.redirectTo({
                    url: "/pages/upload/upload?src=" + t + "&type=1"
                }), e.setData({
                    editImg: !0
                });
            }
        });
    },
    formSubmit: function(e) {
        var a = this;
        if (!this.WxValidate.checkForm(e)) {
            i = this.WxValidate.errorList[0];
            return wx.showToast({
                title: i.msg,
                duration: 2e3
            }), !1;
        }
        if (null == a.data.wechatNumber || "" == a.data.wechatNumber) {
            var i = "请输入微信号";
            return wx.showToast({
                title: i,
                duration: 2e3
            }), !1;
        }
        if (!this.data.userInfo.teamName && this.data.isEdit) return wx.showToast({
            title: "请先创建团队"
        }), !1;
        var s = {
            name: e.detail.value.userName,
            phone: e.detail.value.userPhone,
            wechatNumber: e.detail.value.wechatNumber,
            formId: e.detail.formId
        };
        e.detail.value.userEmail && (s.email = e.detail.value.userEmail), e.detail.value.userPosition && (s.position = e.detail.value.userPosition), 
        wx.showLoading({
            title: "信息保存中..",
            mask: !0
        }), this.data.editImg ? t.uploadHead(a.data.userHead, function(e) {
            s.headUrl = e[0].filePath, a.modifyUserInfo(s);
        }) : a.modifyUserInfo(s);
    },
    modifyUserInfo: function(e) {
        var t = this;
        a.modifyMyInfo({
            method: "post",
            data: e,
            success: function(e) {
                wx.hideLoading(), 0 == e.data.status ? (t.getMyInfo(1), wx.removeStorageSync("companyEdit")) : wx.showToast({
                    title: e.data.message
                });
            }
        });
    },
    goModifyCom: function() {
        this.data.isEdit && (wx.navigateTo({
            url: "/pages/my/company/index?type=1&teamId=" + this.data.userInfo.userTeamId
        }), this.setCompanyStore());
    }
});