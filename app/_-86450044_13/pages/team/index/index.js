var t = require("../../../libs/wxcharts.js"), a = require("../../../api/api.js"), e = (getApp().globalData, 
wx.getSystemInfoSync().windowWidth);

Page({
    data: {
        list: [ {
            teamId: ""
        } ],
        myTeam: [],
        isEdit: !1,
        teamId: "",
        teamName: "",
        exitName: "",
        customCount: 0,
        totalUser: 0,
        rate: 0,
        imgHead: "",
        userName: "",
        userId: "",
        isOwner: !1,
        isExit: !0,
        isDissolution: !0,
        current: 0,
        glob: 0,
        totalMoney: 0,
        globPer: 0,
        isEditMoney: !0,
        editUser: "",
        hasAuth: !0,
        userTeamId: "",
        appId: getApp().globalData.cardAppid,
        screenwidth: .9 * e,
        currentShow: 0,
        nowMonth: "",
        nowDate: "",
        nowDateMonth: "",
        creatTeamTime: "",
        orderCountNum: 0,
        orderCount: {}
    },
    onLoad: function(t) {
        this.setData({
            imgHead: a.urlServer.imgHead
        }), this.getList(0), this.setName(), this.setNowDate();
    },
    onShow: function() {
        this.getList(0), this.getMyInfo();
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh(), this.getList(), this.checkAuth(), this.setData({
            nowDateMonth: ""
        }), this.getOrdetCount(), this.setNowDate();
    },
    setName: function() {
        wx.getStorageSync("member_info") && this.setData({
            userName: wx.getStorageSync("member_info").userName,
            userId: wx.getStorageSync("member_info").userId,
            userTeamId: wx.getStorageSync("member_info").userTeamId,
            teamId: wx.getStorageSync("member_info").currentTeamId
        });
    },
    setHeadImg: function(t) {
        return t ? -1 == t.indexOf("qlogo") ? a.urlServer.imgHead + t : t : "../../../images/ic_head.png";
    },
    getList: function(t) {
        var e = this, s = this;
        s.setData({
            list: [ {
                teamId: ""
            } ]
        }), a.getTeamList({
            data: void 0,
            success: function(a) {
                if (null != a.data.data) {
                    var o = a.data.data;
                    if (o.length > 0) {
                        for (var n in o) o[n].isCurrent = !1, t ? o[n].teamId == e.data.teamId && (o[n].isCurrent = !0, 
                        o[n].isMy = !0) : o[n].teamId == getApp().globalData.teamId && (o[n].isCurrent = !0, 
                        o[n].isMy = !0, s.setData({
                            teamId: o[n].teamId
                        }));
                        s.getTeamInfo(), o.length > 0 && s.setData({
                            list: o,
                            teamName: o[0].teamName,
                            current: 0
                        });
                    } else getApp().globalData.teamId = "", s.setData({
                        myTeam: [],
                        totalUser: 0,
                        customCount: 0,
                        rate: 0,
                        glob: 0,
                        totalMoney: "0元",
                        globPer: 0
                    });
                    s.checkAuth();
                }
            }
        });
    },
    getTeamInfo: function(t) {
        var e = this, s = this, o = {
            teamId: getApp().globalData.teamId ? getApp().globalData.teamId : this.data.teamId
        };
        this.setData({
            teamId: getApp().globalData.teamId
        }), 2 == t && (o.type = 1), !getApp().globalData.teamId && this.data.teamId || a.getTeamInfo({
            data: o,
            success: function(a) {
                var o = [];
                t || s.getMonthBetween(a.data.data.teamInfo.createTime), null != a.data.data.owner && o.push(a.data.data.owner), 
                null != a.data.data.owner && a.data.data.owner.userId == s.data.userId ? (s.setData({
                    isOwner: !0
                }), t && wx.setStorageSync("isMember", !0), s.setData({
                    currentShow: 0
                })) : (s.setData({
                    isOwner: !1,
                    currentShow: 1
                }), t && wx.setStorageSync("isMember", !1)), null != a.data.data.users && a.data.data.users.length > 0 && (o = o.concat(a.data.data.users));
                for (var n in o) o[n].userHeadImg = s.setHeadImg(o[n].userHeadImg), o[n].per = 0, 
                0 != o[n].userAim && 0 != o[n].userComplet && null != o[n].userAim && null != o[n].userComplet && (o[n].per = (1 * o[n].userComplet / o[n].userAim * 1 * 100).toFixed(2)), 
                o[n].userAim2 = s.setTarget(o[n].userAim);
                s.setData({
                    myTeam: o
                }), s.data.isOwner ? (s.setData({
                    customCount: a.data.data.customCount,
                    totalUser: a.data.data.totalUser,
                    glob: s.setTarget(a.data.data.glob),
                    globPer: 0
                }), void 0 != a.data.data.totalMoney ? s.setData({
                    totalMoney: s.setTarget(a.data.data.totalMoney)
                }) : s.setData({
                    totalMoney: "0元"
                }), 0 != s.data.customCount && 0 != s.data.totalUser ? s.setData({
                    rate: (1 * s.data.customCount / s.data.totalUser * 1 * 100).toFixed(2)
                }) : s.setData({
                    rate: 0
                }), 0 != a.data.data.glob && 0 != a.data.data.totalMoney && void 0 != a.data.data.totalMoney ? s.setData({
                    globPer: (1 * a.data.data.totalMoney / a.data.data.glob * 1 * 100).toFixed(2)
                }) : s.setData({
                    globPer: 0
                })) : e.getPersonData(), s.drawManage(), s.getOrderStatistics(), s.getOrdetCount();
            }
        });
    },
    getOrderStatistics: function() {
        var t = this;
        a.getOrderStatistics({
            data: {
                teamId: this.data.teamId,
                type: 0 == this.data.currentShow ? 2 : 1
            },
            success: function(a) {
                if (0 == a.data.status) {
                    var e = a.data.data, s = {
                        month_count: 0,
                        today_count: 0,
                        week_count: 0
                    };
                    for (var o in e) s.month_count += e[o].month_count, s.today_count += e[o].today_count, 
                    s.week_count += e[o].week_count;
                    t.setData({
                        orderCount: s
                    });
                }
            }
        });
    },
    getPersonData: function() {
        var t = this;
        a.getMyteamInfoStatic({
            data: {
                teamId: getApp().globalData.teamId
            },
            success: function(a) {
                0 == a.data.status && (t.setData({
                    customCount: a.data.data.customCount,
                    totalUser: a.data.data.totalUser,
                    glob: t.setTarget(a.data.data.glob),
                    globPer: 0
                }), void 0 != a.data.data.totalMoney ? t.setData({
                    totalMoney: t.setTarget(a.data.data.totalMoney)
                }) : t.setData({
                    totalMoney: "0元"
                }), 0 != t.data.customCount && 0 != t.data.totalUser ? t.setData({
                    rate: (1 * t.data.customCount / t.data.totalUser * 1 * 100).toFixed(2)
                }) : t.setData({
                    rate: 0
                }), 0 != a.data.data.glob && 0 != a.data.data.totalMoney && void 0 != a.data.data.totalMoney ? t.setData({
                    globPer: (1 * a.data.data.totalMoney / a.data.data.glob * 1 * 100).toFixed(2)
                }) : t.setData({
                    globPer: 0
                }));
            }
        });
    },
    getOrdetCount: function() {
        var t = this, e = {
            type: 0
        };
        e.teamId = getApp().globalData.teamId, a.getOrdetCount({
            data: e,
            success: function(a) {
                0 == a.data.status && t.setData({
                    orderCountNum: a.data.data.waittindelivery + a.data.data.waittinget + a.data.data.waittingpay + a.data.data.waittingrevoke
                });
            }
        });
    },
    switchPerson: function(t) {
        var a = this, e = t.currentTarget.dataset.type;
        this.setData({
            currentShow: e
        }), 1 == this.data.currentShow ? (this.getPersonData(), a.getOrderStatistics()) : this.getTeamInfo(1);
    },
    setTarget: function(t) {
        return t >= 1e4 ? (t / 1e4).toFixed(2) + "万" : t / 1 + "元";
    },
    goCreatTime: function() {
        wx.navigateTo({
            url: "/pages/my/company/index?type=2"
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
    delMember: function(t) {
        var e = this, s = t.target.dataset.id;
        t.target.dataset.index;
        wx.showModal({
            title: "温馨提示",
            content: "删除该成员后，该成员下的独占客户将会转为团队共享且不可恢复，确认删除吗？",
            confirmText: "删除",
            success: function(t) {
                t.confirm && a.wxRequest({
                    method: "post",
                    success: function(t) {
                        0 == t.data.status && (e.getList(), e.getTeamInfo(1));
                    }
                }, a.urlServer.ApiUrl + "/user/deleteUserFromTeam?userId=" + s);
            }
        });
    },
    goEdit: function(t) {
        var a = t.currentTarget.dataset.id;
        a == this.data.userTeamId ? wx.navigateTo({
            url: "/pages/my/company/index?teamId=" + a
        }) : wx.showModal({
            title: "温馨提示",
            showCancel: !1,
            confirmText: "我知道了",
            content: "管理员才能编辑公司信息哦",
            success: function(t) {}
        });
    },
    switchTeam: function(t) {
        var a = t.currentTarget.dataset.id, e = t.currentTarget.dataset.index;
        getApp().globalData.teamId = a;
        for (var s in this.data.list) this.data.list[s].isCurrent = !1;
        this.data.list[e].isCurrent = !0, this.setData({
            teamId: a,
            teamName: this.data.list[e].teamName,
            list: this.data.list,
            showTeam: !1,
            current: e,
            isEdit: !1
        }), this.getTeamInfo(2), this.getMyInfo();
    },
    getMyInfo: function() {
        var t = this;
        a.getMyInfo({
            success: function(a) {
                0 == a.data.status && (t.setData({
                    userTeamId: a.data.data.userTeamId
                }), wx.setStorageSync("member_info", a.data.data), null != a.data.data.vipLevel ? wx.setStorageSync("isMember", !0) : wx.setStorageSync("isMember", !1));
            }
        });
    },
    onShareAppMessage: function(t) {
        var a = this;
        return {
            title: "hello," + a.data.userName + "邀请你加入以下团队，请尽快查看",
            desc: "hello," + a.data.userName + "邀请你加入以下团队，请尽快查看",
            path: "/pages/team/invi/invi?teamId=" + a.data.teamId + "&userName=" + a.data.userName
        };
    },
    checkAuth: function() {
        var t = this;
        a.checkCanInvite({
            data: {
                teamId: getApp().globalData.teamId
            },
            success: function(a) {
                0 != a.data.status ? t.setData({
                    hasAuth: !1
                }) : t.setData({
                    hasAuth: !0
                });
            }
        });
    },
    callPhone: function() {
        wx.showActionSheet({
            itemList: [ "复制加微信", "立即拨打" ],
            success: function(t) {
                0 == t.tapIndex ? wx.setClipboardData({
                    data: "18515667629",
                    success: function(t) {
                        wx.showToast({
                            title: "已复制"
                        });
                    }
                }) : 1 == t.tapIndex && wx.makePhoneCall({
                    phoneNumber: "18515667629"
                });
            },
            fail: function(t) {
                console.log(t.errMsg);
            }
        });
    },
    goCompanyPage: function(t) {
        var a = t.currentTarget.dataset.type, e = "";
        this.data.teamId == this.data.userTeamId ? (e = 1 == a ? "/pages/my/company/index?type=1&teamId=" + this.data.userTeamId : 2 == a ? "/pages/product/list/list" : 3 == a ? "/pages/my/details/index?page=1&id=" + this.data.userTeamId : "/pages/my/dynamic/list/list", 
        wx.navigateTo({
            url: e
        })) : wx.showModal({
            title: "温馨提示",
            showCancel: !1,
            confirmText: "我知道了",
            content: "管理员才能编辑公司信息哦",
            success: function(t) {}
        });
    },
    drawManage: function() {
        var e = this, s = [], o = [], n = [];
        a.get7daysStatistics({
            data: {
                teamId: this.data.teamId,
                type: this.data.currentShow
            },
            success: function(a) {
                if (0 == a.data.status) {
                    var d = a.data.data, i = void 0;
                    for (var r in d) i = d[r].day_str.substr(5).replace("-", "."), s.push(i), o.push(d[r].online_money), 
                    n.push(d[r].underline_money);
                    new t({
                        canvasId: "lineCanvas",
                        type: "line",
                        categories: s,
                        animation: !0,
                        series: [ {
                            name: "线上商城订单",
                            data: o,
                            format: function(t) {
                                return t;
                            },
                            color: "#EF582B"
                        }, {
                            name: "线下签约订单",
                            data: n,
                            format: function(t) {
                                return t;
                            },
                            color: "#FFCC01"
                        } ],
                        xAxis: {
                            disableGrid: !0
                        },
                        yAxis: {
                            gridColor: "#eee",
                            disableGrid: !0
                        },
                        width: e.data.screenwidth,
                        height: 150
                    });
                }
            }
        });
    },
    setNowDate: function() {
        var t = new Date(), a = t.getFullYear();
        a = a.toString();
        var e = t.getMonth() + 1;
        this.setData({
            nowDate: a + "年" + e + "月",
            nowMonth: e + "月"
        });
    },
    getMonthBetween: function(t) {
        this.setData({
            timeList: []
        });
        var a = [], e = new Date(t), s = new Date(), o = e;
        for (o.setMonth(e.getMonth() + 1), s.setMonth(s.getMonth() + 1); o <= s; ) {
            var n = o.getMonth();
            n = 0 == n ? 12 : n;
            var d = o.getFullYear() + "年" + n + "月";
            d == o.getFullYear() + "-0" && (d = o.getFullYear() + "-12"), a.push(d), o.setMonth(n + 1);
        }
        a.push(this.data.nowDate), this.setData({
            timeList: a
        });
    },
    bindTimeChange: function(t) {
        var e = this.data.timeList[parseInt(t.detail.value)];
        this.setData({
            nowDate: e
        }), this.setData({
            nowDateMonth: e.substr(e.indexOf("年") + 1)
        }), e = (e = (e = 2 == e.substr(5).length ? e.substr(0, 5) + "0" + e.substr(5) : e).replace("年", "")).replace("月", "");
        var s = this;
        a.getSpacialByMonthId({
            data: {
                monthId: e,
                teamId: this.data.teamId,
                type: this.data.currentShow
            },
            success: function(t) {
                0 == t.data.status && (t.data.data.aimmoney = t.data.data.aimmoney ? t.data.data.aimmoney : 0, 
                t.data.data.custom_money = t.data.data.custom_money ? t.data.data.custom_money : 0, 
                t.data.data.orderCount = t.data.data.orderCount ? t.data.data.orderCount : 0, s.setData({
                    glob: s.setTarget(t.data.data.aimmoney),
                    totalMoney: s.setTarget(t.data.data.custom_money),
                    "orderCount.month_count": t.data.data.orderCount
                }), 0 != t.data.data.aimmoney && 0 != t.data.data.custom_money && void 0 != t.data.data.custom_money ? s.setData({
                    globPer: (1 * t.data.data.custom_money / t.data.data.aimmoney * 1 * 100).toFixed(2)
                }) : s.setData({
                    globPer: 0
                }));
            }
        });
    },
    goStaPage: function() {
        this.data.teamId == this.data.userTeamId ? wx.navigateTo({
            url: "/pages/team/statistics/statistics?teamId=" + this.data.teamId
        }) : wx.showModal({
            title: "温馨提示",
            showCancel: !1,
            confirmText: "我知道了",
            content: "管理员才能查看财务统计哦",
            success: function(t) {}
        });
    },
    goEditSign: function(t) {
        t.currentTarget.dataset.id == this.data.userTeamId ? this.setData({
            showModal: !0
        }) : wx.showModal({
            title: "温馨提示",
            showCancel: !1,
            confirmText: "我知道了",
            content: "管理员才能编辑公司信息哦",
            success: function(t) {}
        });
    },
    hsMsgBlur: function(t) {
        this.setData({
            sign: t.detail.value
        });
    },
    onCancel: function() {
        this.setData({
            showModal: !1
        });
    },
    onConfirm: function() {
        console.log("sign：" + this.data.sign);
        var t = this;
        t.data.sign ? a.modifySign({
            method: "post",
            data: {
                teamId: t.data.teamId,
                sign: t.data.sign
            },
            success: function(a) {
                t.setData({
                    showModal: !1
                }), a.data && wx.showToast({
                    title: "修改成功"
                }), t.getList(0);
            }
        }) : wx.showToast({
            title: "请输入团队标语"
        });
    }
});