var a = require("../../../libs/wxcharts.js"), t = require("../../../api/api.js"), e = require("../../../utils/util.js"), s = (getApp(), 
null), o = null, n = 320;

try {
    n = wx.getSystemInfoSync().windowWidth;
} catch (a) {
    console.error("getSystemInfoSync failed!");
}

Page({
    data: {
        user_Id: "",
        teamId: "",
        user_name: "",
        user_head_img: "",
        userData: {},
        list: [],
        turnover: "",
        pageId: 1,
        pageSize: 10,
        hasMoreData: !0,
        windowWidth: n,
        monthList: [],
        dayMoney: "",
        weekMoney: "",
        monthMoney: "",
        nowIndex: 5,
        scrollLeft: 0,
        spreadData: []
    },
    onLoad: function(a) {
        a.userId && this.setData({
            user_Id: a.userId,
            user_head_img: a.userHead,
            user_name: a.userName,
            teamId: a.teamId
        }), this.getUserInfo(), this.getList(), this.setMonthList();
    },
    setMonthList: function() {
        var a = new Date(), t = a.getFullYear();
        t = t.toString().substr(2);
        var e = a.getMonth() + 1, s = new Array(), o = e + 2, n = e + 1;
        o <= 0 && (t -= 1, o += 12), o < 10 && (o = "0" + o), n <= 0 && (t -= 1, n += 12), 
        n < 10 && (n = "0" + n), o > 12 ? s.push(parseInt(t) + 1 + "年1月") : s.push(t + "年" + o + "月"), 
        n > 12 ? s.push(parseInt(t) + 1 + "年1月") : s.push(t + "年" + n + "月"), s.push(t + "年" + e + "月");
        for (var r = 0; r < 5; r++) (e -= 1) <= 0 && (t -= 1, e += 12), e < 10 && (e = "0" + e), 
        e > 12 ? s.push(parseInt(t) + 1 + "年1月") : s.push(t + "年" + e + "月");
        this.setData({
            monthList: s.reverse(),
            scrollLeft: 255
        });
    },
    getUserInfo: function() {
        var a = this;
        t.getPersonalData({
            data: {
                userId: this.data.user_Id,
                teamId: this.data.teamId
            },
            success: function(t) {
                if (0 == t.data.status) {
                    var e = t.data.data;
                    a.setData({
                        userData: e,
                        turnover: 0 == e.totalUser ? 0 : e.today_follow / e.totalUser * 100,
                        dayMoney: a.setTarget(e.day_totalMoney),
                        weekMoney: a.setTarget(e.week_totalMoney),
                        monthMoney: a.setTarget(e.month_totalMoney)
                    }), a.setPie(), a.setRing(), a.setRadar();
                }
            }
        });
    },
    setRadar: function() {
        var a = this;
        t.getSpreadStatistics({
            data: {
                userId: this.data.user_Id
            },
            success: function(t) {
                if (0 == t.data.status) {
                    var e = t.data.data, s = [];
                    s[0] = a.setTarget(e.user_watched), s[1] = a.setTarget(e.dianzan), s[2] = a.setTarget(e.phone_saved), 
                    s[3] = a.setTarget(e.share_times), a.setData({
                        spreadData: s
                    });
                }
            }
        });
    },
    setTarget: function(a) {
        return a >= 1e4 ? (a / 1e4).toFixed(2) + "万" : a / 1;
    },
    setPie: function() {
        var t = 320, e = this;
        try {
            t = wx.getSystemInfoSync().windowWidth;
        } catch (a) {
            console.error("getSystemInfoSync failed!");
        }
        s = new a(0 == e.data.userData.month_totalMoney && 0 == e.data.userData.month_totalMoney ? {
            animation: !0,
            canvasId: "pieCanvas",
            type: "pie",
            series: [ {
                name: "已成交（0）元",
                data: 0,
                color: "#26C6DA"
            }, {
                name: "未成交（0）元",
                data: .01,
                color: "#FFB22B"
            } ],
            width: t,
            height: 250,
            dataLabel: !0
        } : {
            animation: !0,
            canvasId: "pieCanvas",
            type: "pie",
            series: [ {
                name: "已成交（" + e.data.userData.month_totalMoney + "）元",
                data: e.data.userData.month_totalMoney,
                color: "#26C6DA"
            }, {
                name: "未成交（" + (e.data.userData.glob - e.data.userData.month_totalMoney < 0 ? 0 : e.data.userData.glob - e.data.userData.month_totalMoney) + "）元",
                data: e.data.userData.glob - e.data.userData.month_totalMoney < 0 ? 0 : e.data.userData.glob - e.data.userData.month_totalMoney,
                color: "#FFB22B"
            } ],
            width: t,
            height: 250,
            dataLabel: !0
        });
    },
    setRing: function() {
        var t = this;
        o = new a({
            animation: !0,
            canvasId: "ringCanvas",
            type: "ring",
            extra: {
                ringWidth: 4,
                pie: {
                    offsetAngle: -45
                }
            },
            subtitle: {
                name: Math.round(t.data.turnover) + "%",
                color: "#7cb5ec",
                fontSize: 10
            },
            series: [ {
                data: Math.round(t.data.turnover),
                stroke: !1
            }, {
                data: 35,
                stroke: !1,
                color: "#E8EFF1"
            } ],
            disablePieStroke: !1,
            width: 100,
            height: 100,
            dataLabel: !1,
            legend: !1,
            background: "#fff",
            padding: 0
        }), o = new a({
            animation: !0,
            canvasId: "todayAdd",
            type: "ring",
            extra: {
                ringWidth: 4,
                pie: {
                    offsetAngle: -45
                }
            },
            subtitle: {
                name: Math.round(t.data.turnover) + "%",
                color: "#26C6DA",
                fontSize: 10
            },
            series: [ {
                data: Math.round(t.data.turnover),
                stroke: !1
            }, {
                name: "",
                data: 35,
                stroke: !1,
                color: "#E8EFF1"
            } ],
            disablePieStroke: !1,
            width: 100,
            height: 100,
            dataLabel: !1,
            legend: !1,
            background: "#fff",
            padding: 0,
            color: "#FFB22B"
        }), o = new a({
            animation: !0,
            canvasId: "completeData",
            type: "ring",
            extra: {
                ringWidth: 4,
                pie: {
                    offsetAngle: -45
                }
            },
            subtitle: {
                name: (t.data.userData.glob > 0 ? Math.round(t.data.userData.month_totalMoney / t.data.userData.glob * 100) : 0) + "%",
                color: "#26C6DA",
                fontSize: 10
            },
            series: [ {
                data: t.data.userData.glob > 0 ? Math.round(t.data.userData.month_totalMoney / t.data.userData.glob * 100) : 0,
                stroke: !1
            }, {
                name: "",
                data: 35,
                stroke: !1,
                color: "#E8EFF1"
            } ],
            disablePieStroke: !1,
            width: 100,
            height: 100,
            dataLabel: !1,
            legend: !1,
            background: "#fff",
            padding: 0,
            color: "#FFB22B"
        }), setTimeout(function() {
            o.stopAnimation();
        }, 500);
    },
    getList: function() {
        var a = this;
        t.getIntelligent({
            data: {
                pageId: this.data.pageId,
                pageSize: this.data.pageSize,
                userId: this.data.user_Id,
                teamId: this.data.teamId
            },
            success: function(t) {
                if (0 == t.data.status) {
                    var s = t.data.data;
                    if (s.length > 0) {
                        for (var o in s) s[o].dayj = e.formatDateMMDDHM(s[o].dayj);
                        Math.ceil(t.data.data.totalNumber / a.data.pageSize) <= a.data.pageId ? a.setData({
                            hasMoreData: !1
                        }) : a.setData({
                            hasMoreData: !0
                        }), 1 == a.data.pageId ? a.setData({
                            list: s
                        }) : a.setData({
                            list: a.data.list.concat(s)
                        });
                    } else 1 == a.data.pageId && a.setData({
                        list: [],
                        hasMoreData: !1
                    });
                }
            }
        });
    },
    touchHandler: function(a) {
        console.log(s.getCurrentDataIndex(a));
    },
    onReachBottom: function() {
        var a = this;
        a.data.hasMoreData && (a.setData({
            pageId: a.data.pageId + 1
        }), a.getList());
    },
    switchMonth: function(a) {
        var e = a.currentTarget.dataset.index, s = this.data.monthList[e], o = this;
        s = (s = s.replace("年", "")).replace("月", ""), o.setData({
            nowIndex: e
        }), t.getStaByMonth({
            data: {
                monthId: "20" + s,
                teamId: this.data.teamId,
                userId: this.data.user_Id
            },
            success: function(a) {
                if (0 == a.data.status) {
                    var t = a.data.data;
                    o.setData({
                        "userData.glob": t.glob,
                        "userData.month_totalMoney": t.custom_money
                    }), o.setPie();
                }
            }
        });
    },
    goList: function(a) {
        var t = a.currentTarget.dataset.type;
        wx.navigateTo({
            url: "/pages/customer/list/index?type=" + t + "&userId=" + this.data.user_Id
        });
    }
});