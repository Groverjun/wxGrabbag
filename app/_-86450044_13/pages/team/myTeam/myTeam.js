var t = require("../../../api/api.js");

Page({
    data: {
        userTeamId: "",
        teamId: "",
        myTeam: [],
        hasAuth: !0,
        isEdit: !1,
        isOwner: !1,
        userName: "",
        isExit: !0,
        isDissolution: !0,
        isEditMoney: !0,
        userId: "",
        editUser: "",
        moneyTarget: "",
        maxMonopoly: ""
    },
    onLoad: function(t) {
        this.getTeamId(), this.getTeamInfo(), this.checkAuth();
    },
    getTeamId: function() {
        wx.getStorageSync("member_info") && this.setData({
            teamId: wx.getStorageSync("member_info").currentTeamId,
            userTeamId: wx.getStorageSync("member_info").userTeamId,
            userName: wx.getStorageSync("member_info").userName,
            userId: wx.getStorageSync("member_info").userId
        });
    },
    getTeamInfo: function(e) {
        var a = this, s = {
            teamId: this.data.teamId
        };
        2 == e && (s.type = 1), t.getTeamInfo({
            data: s,
            success: function(t) {
                var s = [];
                null != t.data.data.owner && s.push(t.data.data.owner), null != t.data.data.users && t.data.data.users.length > 0 && (s = s.concat(t.data.data.users)), 
                null != t.data.data.owner && t.data.data.owner.userId == a.data.userId ? (a.setData({
                    isOwner: !0
                }), e && wx.setStorageSync("isMember", !0)) : (a.setData({
                    isOwner: !1
                }), e && wx.setStorageSync("isMember", !1));
                for (var i in s) s[i].userHeadImg = a.setHeadImg(s[i].userHeadImg), s[i].per = 0, 
                0 != s[i].userAim && 0 != s[i].userComplet && null != s[i].userAim && null != s[i].userComplet && (s[i].per = (1 * s[i].userComplet / s[i].userAim * 1 * 100).toFixed(2)), 
                s[i].userAim2 = a.setTarget(s[i].userAim);
                a.setData({
                    myTeam: s
                });
            }
        });
    },
    checkAuth: function() {
        var e = this;
        t.checkCanInvite({
            data: {
                teamId: this.data.teamId
            },
            success: function(t) {
                0 != t.data.status ? e.setData({
                    hasAuth: !1
                }) : e.setData({
                    hasAuth: !0
                });
            }
        });
    },
    switchManager: function() {
        this.setData({
            isEdit: !0
        });
    },
    endManger: function() {
        this.setData({
            isEdit: !1
        });
    },
    delMember: function(e) {
        var a = this, s = e.target.dataset.id;
        e.target.dataset.index;
        wx.showModal({
            title: "温馨提示",
            content: "删除该成员后，该成员下的独占客户将会转为团队共享且不可恢复，确认删除吗？",
            confirmText: "删除",
            success: function(e) {
                e.confirm && t.wxRequest({
                    method: "post",
                    success: function(t) {
                        0 == t.data.status && a.getTeamInfo(1);
                    }
                }, t.urlServer.ApiUrl + "/user/deleteUserFromTeam?userId=" + s);
            }
        });
    },
    setHeadImg: function(e) {
        return e ? -1 == e.indexOf("qlogo") ? t.urlServer.imgHead + e : e : "../../../images/ic_head.png";
    },
    setTarget: function(t) {
        return t >= 1e4 ? (t / 1e4).toFixed(2) + "万" : t / 1 + "元";
    },
    goMemberInfo: function(t) {
        var e = t.currentTarget.dataset.index;
        this.data.teamId == this.data.userTeamId ? wx.navigateTo({
            url: "/pages/team/staffAnalysis/index?userId=" + this.data.myTeam[e].userId + "&userHead=" + this.data.myTeam[e].userHeadImg + "&userName=" + this.data.myTeam[e].userName + "&teamId=" + this.data.teamId
        }) : wx.showModal({
            title: "温馨提示",
            showCancel: !1,
            content: "管理员才能查看成员详情哦",
            confirmText: "好的"
        });
    },
    noAuthClick: function() {
        var t = this;
        wx.showModal({
            title: "温馨提示",
            content: "团队成员数量已达上限，请联系客服开通VIP专享功能权限",
            confirmText: "立即开通",
            success: function(e) {
                e.confirm && t.callPhone();
            }
        });
    },
    editTeam: function() {
        this.setData({
            isExit: !1
        });
    },
    dissolutionTeam: function() {
        this.setData({
            isDissolution: !1
        });
    },
    hideExit: function() {
        this.setData({
            isExit: !0
        });
    },
    hideDiss: function() {
        this.setData({
            isDissolution: !0
        });
    },
    doExit: function(e) {
        var a = e.currentTarget.dataset.id;
        if (!this.data.exitName) return wx.showToast({
            title: "请输入团队名称"
        }), !1;
        if (this.data.exitName != this.data.teamName) return wx.showToast({
            title: "团队名称错误"
        }), !1;
        var s = this;
        1 == a ? t.wxRequest({
            method: "post",
            success: function(t) {
                0 == t.data.status && (wx.showToast({
                    title: "退出成功"
                }), s.setData({
                    isExit: !0
                }), s.getList(), s.getMyInfo());
            }
        }, t.urlServer.ApiUrl + "/user/exitTeam?teamId=" + this.data.teamId) : t.relaseTeam({
            data: {
                teamId: this.data.teamId
            },
            success: function(t) {
                0 == t.data.status && (wx.showToast({
                    title: "解散成功"
                }), s.setData({
                    isDissolution: !0
                }), s.getList(1), s.getMyInfo());
            }
        });
    },
    inputExitName: function(t) {
        t.detail.value && this.setData({
            exitName: t.detail.value
        });
    },
    editMember: function(t) {
        var e = t.currentTarget.dataset.id, a = t.currentTarget.dataset.index;
        this.setData({
            isEditMoney: !1,
            editUser: e
        }), null != this.data.myTeam[a].limitRelation && this.data.myTeam[a].limitRelation > 0 && this.setData({
            maxMonopoly: this.data.myTeam[a].limitRelation / 1
        }), null != this.data.myTeam[a].userAim && this.data.myTeam[a].userAim > 0 && this.setData({
            moneyTarget: this.data.myTeam[a].userAim / 1
        });
    },
    hideEdit: function() {
        this.setData({
            isEditMoney: !0
        });
    },
    inputTarget: function(t) {
        t.detail.value && this.setData({
            moneyTarget: t.detail.value
        });
    },
    inputMaxMonopoly: function(t) {
        t.detail.value && this.setData({
            maxMonopoly: t.detail.value
        });
    },
    doSaveTarget: function(e) {
        var a = this;
        this.data.maxMonopoly && this.data.maxMonopoly > 0 && this.modifymostRelation(e.detail.formId), 
        this.data.moneyTarget && this.data.moneyTarget > 0 && t.modifyAim({
            method: "post",
            data: {
                teamId: this.data.teamId,
                money: parseFloat(this.data.moneyTarget),
                userId: this.data.editUser,
                formId: e.detail.formId
            },
            success: function(t) {
                0 == t.data.status || wx.showToast({
                    title: t.data.message
                });
            }
        }), wx.showToast({
            title: "修改成功"
        }), a.setData({
            isEdit: !1,
            isEditMoney: !0
        }), a.getTeamInfo();
    },
    modifymostRelation: function(e) {
        t.modifymostRelation({
            method: "post",
            data: {
                relationCount: this.data.maxMonopoly,
                teamId: this.data.teamId,
                userId: this.data.editUser,
                formId: e
            },
            success: function(t) {
                0 == t.data.status || wx.showToast({
                    title: t.data.message
                });
            }
        });
    },
    onShareAppMessage: function(t) {
        var e = this;
        return {
            title: "hello," + e.data.userName + "邀请你加入以下团队，请尽快查看",
            desc: "hello," + e.data.userName + "邀请你加入以下团队，请尽快查看",
            path: "/pages/team/invi/invi?teamId=" + e.data.teamId + "&userName=" + e.data.userName
        };
    }
});