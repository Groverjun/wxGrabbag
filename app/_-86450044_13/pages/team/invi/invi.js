var t = require("../../../api/api.js"), a = getApp();

Page({
    data: {
        teamId: "",
        info: {},
        isOld: !1,
        isShow: !1,
        imgHead: "",
        showLogin: !1,
        list: []
    },
    onLoad: function(e) {
        this.setData({
            imgHead: t.urlServer.imgHead
        }), e.teamId && this.setData({
            teamId: e.teamId,
            userName: e.userName
        }), new a.LoginPannel(), this.judgingLogin();
    },
    judgingLogin: function() {
        wx.getStorageSync("member_info") ? (this.getTeam(), this.setOldInfo()) : this.openLoginPannel();
    },
    openLoginPannel: function() {
        this.loginPannel.show({
            loginBack: this.onLogin
        });
    },
    onLogin: function() {
        this.setData({
            "__lgpanel__.isHide": !0
        });
        var t = wx.getStorageSync("member_info");
        t.currentTeamId ? getApp().globalData.teamId = t.currentTeamId : getApp().globalData.teamId = t.userTeamId, 
        this.getTeam(), this.setOldInfo();
    },
    setOldInfo: function() {
        null == wx.getStorageSync("member_info").userTeamId && null == wx.getStorageSync("member_info").currentTeamId || this.setData({
            isOld: !0
        });
    },
    setDetails: function() {
        var t = this.data.info.teamDetail;
        console.log(t), "string" == typeof t && (t = JSON.parse(t));
        for (var a in t) 2 == t[a].type && 40 == t[a].value.length && (t[a].value = this.data.imgHead + t[a].value);
        this.setData({
            list: t
        });
    },
    getTeam: function() {
        var a = this;
        t.getTeamInfoV1({
            data: {
                teamId: this.data.teamId
            },
            success: function(t) {
                0 == t.data.status && (a.setData({
                    info: t.data.data
                }), null != t.data.data.teamDetail && a.setDetails());
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    addTeam: function() {
        t.wxRequest({
            method: "post",
            success: function(t) {
                0 == t.data.status ? wx.switchTab({
                    url: "/pages/team/index/index"
                }) : 1 == t.data.status ? wx.showModal({
                    title: "温馨提示",
                    content: "该团队成员已满"
                }) : wx.showToast({
                    title: t.data.message
                });
            }
        }, t.urlServer.ApiUrl + "/user/joinTeam?teamId=" + this.data.teamId);
    },
    goCreat: function() {
        this.data.isOld ? wx.switchTab({
            url: "/pages/team/index/index"
        }) : wx.navigateTo({
            url: "/pages/my/company/index"
        });
    },
    showDeatails: function() {
        this.setData({
            isShow: !0
        });
    },
    onPullDownRefresh: function() {
        this.setData({
            isShow: !1
        });
    }
});