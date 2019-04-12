var t = require("../../A93C6C17D69926BFCF5A041083A49EA6.js"), n = {
    "__lgpanel__.isHide": !0,
    loginBack: {}
}, e = {
    getAuth: function(t) {
        wx.showLoading({
            title: "登录中"
        });
        var n = this;
        wx.login({
            success: function(e) {
                e.code ? (wx.getStorageSync("userInfo") || wx.setStorageSync("userInfo", t.detail.userInfo), 
                n.goLogin(e.code, t.detail.encryptedData, t.detail.iv)) : wx.showModal({
                    title: "提示",
                    content: "获取用户信息超时，请重试",
                    showCancel: !1,
                    success: function(t) {
                        t.confirm && n.getAuth();
                    }
                });
            }
        });
    },
    goLogin: function(n, e, a) {
        var i = this, o = wx.getStorageSync("userInfo");
        t.loginUser({
            method: "post",
            data: {
                encryptedData: e,
                iv: a,
                code: n,
                nickName: o.nickName,
                sex: o.gender,
                headUrl: o.avatarUrl,
                type: 1
            },
            success: function(t) {
                0 == t.data.status ? null != t.data.data && (wx.setStorageSync("member_info", t.data.data), 
                wx.setStorageSync("token", t.data.data.userOpenId), wx.hideLoading(), i.__lgpanel_login()) : wx.showToast({
                    title: "请稍后重试"
                });
            }
        });
    },
    __lgpanel_login: function() {
        "function" == typeof this.loginPannel._configs.loginBack && this.loginPannel._configs.loginBack();
    }
}, a = {
    show: function(t) {
        this.__page.setData({
            "__lgpanel__.isHide": !1
        }), t && Object.assign(this._configs, t);
    }
};

module.exports = {
    LoginPannel: function() {
        this._configs = {
            loginBack: null
        };
        var t = getCurrentPages(), i = t[t.length - 1];
        return Object.assign(i, e), this.__page = i, Object.assign(this, a), i.loginPannel = this, 
        i.setData(n), this;
    }
};