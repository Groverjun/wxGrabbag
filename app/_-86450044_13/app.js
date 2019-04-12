function t(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var a, n = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("utils/wxValidate")), o = require("./components/login/login"), s = require("api/api.js");

App((a = {
    LoginPannel: o.LoginPannel,
    wxValidate: function(e, t) {
        return new n.default(e, t);
    },
    onLaunch: function(e) {
        wx.getStorageSync("member_info") && this.testToken();
    },
    testToken: function() {
        s.testToken({
            data: {
                token: wx.getStorageSync("token")
            },
            success: function(e) {
                -1 == e.data.data && (wx.clearStorageSync("member_info"), wx.clearStorageSync("token"));
            }
        });
    },
    getAuth: function() {
        wx.showLoading({
            title: "登录中"
        });
        var t = this;
        wx.login({
            success: function(a) {
                a.code ? (wx.getStorageSync("userInfo") || wx.setStorageSync("userInfo", e.detail.userInfo), 
                t.goLogin(a.code)) : wx.showModal({
                    title: "提示",
                    content: "获取用户信息超时，请重试",
                    showCancel: !1,
                    success: function(e) {
                        e.confirm && t.getAuth();
                    }
                });
            }
        });
    },
    goLogin: function(e) {
        var t = this, a = wx.getStorageSync("userInfo");
        s.loginUser({
            method: "post",
            data: {
                code: e,
                nickName: a.nickName,
                sex: a.gender,
                headUrl: a.avatarUrl
            },
            success: function(e) {
                0 == e.data.status && null != e.data.data && (wx.setStorageSync("member_info", e.data.data), 
                wx.setStorageSync("token", e.data.data.userOpenId), wx.hideLoading(), t.setData({
                    showLogin: !1
                }));
            }
        });
    },
    getCode: function() {
        var e = this;
        wx.login({
            success: function(t) {
                t.code ? e.goLogin(t.code) : wx.showModal({
                    title: "提示",
                    content: "获取用户信息超时，请重试",
                    showCancel: !1,
                    success: function(t) {
                        t.confirm && e.getCode();
                    }
                });
            }
        });
    }
}, t(a, "goLogin", function(e) {
    var t = this, a = wx.getStorageSync("userInfo");
    s.loginUser({
        method: "post",
        data: {
            code: e,
            nickName: a.nickName,
            sex: a.gender,
            headUrl: a.avatarUrl
        },
        success: function(e) {
            0 == e.data.status && null != e.data.data && (wx.setStorageSync("member_info", e.data.data), 
            wx.setStorageSync("token", e.data.data.userOpenId), t.getMyInfo(e.data.data.vipLevel));
        }
    });
}), t(a, "getMyInfo", function(e) {
    var t = this;
    s.getMyInfo({
        success: function(a) {
            0 == a.data.status ? (wx.setStorageSync("member_info", a.data.data), null != a.data.data.userTeamId && (t.globalData.teamId = a.data.data.userTeamId, 
            null != e && t.getTeamInfo(a.data.data.userTeamId))) : wx.showToast({
                title: a.data.message
            });
        }
    });
}), t(a, "getTeamInfo", function(e) {
    s.getTeamInfo({
        data: {
            teamId: e
        },
        success: function(e) {
            [].push(e.data.data.owner), null != e.data.data.owner && e.data.data.owner.userId == wx.getStorageSync("member_info").userId ? wx.setStorageSync("isMember", !0) : wx.setStorageSync("isMember", !1);
        }
    });
}), t(a, "globalData", {
    userInfo: null,
    teamId: "",
    cardAppid: "wxd61362939f7e3181"
}), a));