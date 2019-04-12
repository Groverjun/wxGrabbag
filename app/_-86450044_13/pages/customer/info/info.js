var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, a = require("../../../api/api.js"), e = require("../../../utils/util.js");

Page({
    data: {
        scopeIndex: 0,
        scope: [ "自己独占", "团队共享" ],
        customer: "",
        customerInfo: {},
        customInfoDetails: [],
        customLabel: 0,
        customUserLabel: [],
        custType: [],
        custLevel: [],
        custState: [],
        timeStr: "无",
        multiArray: [ [ "今天", "明天", "后天" ], [], [] ],
        multiIndex: [ 0, 0, 0 ],
        timeVal: "无",
        shareName: "",
        isEditTime: !1
    },
    onLoad: function(t) {
        this.setData({
            custType: a.customer.custType,
            custLevel: a.customer.custLevel,
            custState: a.customer.custState
        }), this.data.customer = t.relationId, this.getCustomerInfo(), this.getDateInit(), 
        this.calcTimeHours(1, 1), this.calcTimeHours(1, 2, this.data.multiArray[1][this.data.multiIndex[1]]);
    },
    onShow: function() {
        var t = getCurrentPages(), a = t[t.length - 1];
        this.setData({
            customLabel: a.data.label
        }), this.getCustomerInfo();
    },
    getDateInit: function() {
        for (var t = [], a = "", e = 0; e < 30; e++) a = 0 == e ? "今天" : 1 == e ? "明天" : 2 == e ? "后天" : this.getDateStr(e), 
        t.push(a);
        this.setData({
            "multiArray[0]": t
        });
    },
    getDateStr: function(t) {
        var a = new Date();
        a.setDate(a.getDate() + t);
        a.getFullYear();
        return (a.getMonth() + 1 < 10 ? "0" + (a.getMonth() + 1) : a.getMonth() + 1) + "/" + (a.getDate() < 10 ? "0" + a.getDate() : a.getDate());
    },
    getCustomerInfo: function() {
        var t = this, s = {
            relationShipId: t.data.customer
        };
        a.getRelationDetail({
            data: s,
            success: function(a) {
                0 == a.data.status ? (t.setData({
                    customerInfo: a.data.data,
                    scopeIndex: parseInt(a.data.data.shareState) - 1,
                    "customerInfo.customHead": a.data.data.customName.substring(a.data.data.customName.length - 2)
                }), null != a.data.data.customInfo && t.setData({
                    customInfoDetails: JSON.parse(a.data.data.customInfo)
                }), null != a.data.data.customUserLabel && t.setData({
                    customUserLabel: JSON.parse(a.data.data.customUserLabel)
                }), t.data.customerInfo.customTime && t.setData({
                    timeStr: e.formatDateMMDDHM2(a.data.data.customTime)
                }), null != a.data.data.kekeFollow.followId && t.setData({
                    "customerInfo.kekeFollow.followModifyTime": e.formatDateMMDDHM(a.data.data.kekeFollow.followModifyTime)
                }), 1 == t.data.customerInfo.shareState && t.setData({
                    shareName: wx.getStorageSync("member_info").userId == t.data.customerInfo.userId ? "自己独占" : t.data.customerInfo.userName.substring(t.data.customerInfo.userName.length - 2) + "独占"
                })) : wx.showToast({
                    title: a.data.message
                });
            }
        });
    },
    onShareAppMessage: function(t) {
        return {
            title: "配配通CRM",
            desc: "hello,这是来自" + this.data.customerInfo.customName + "的名片,望惠存",
            path: "/pages/my/card/index"
        };
    },
    bindScopeChange: function(t) {
        this.setData({
            scopeIndex: t.detail.value
        }), this.modifyUserInfo(2);
    },
    addInfo: function(t) {
        var a = t.target.dataset.name, e = "", s = this;
        wx.showActionSheet({
            itemList: [ "复制" ],
            success: function(t) {
                0 == t.tapIndex && (1 == a && (e = s.data.customerInfo.customName), 3 == a && (e = s.data.customerInfo.customEmail), 
                4 == a && (e = s.data.customerInfo.customCompany), 5 == a && (e = s.data.customerInfo.customMark), 
                wx.setClipboardData({
                    data: e,
                    success: function(t) {
                        wx.getClipboardData({
                            success: function(t) {
                                wx.showToast({
                                    title: "复制成功"
                                });
                            }
                        });
                    }
                }));
            },
            fail: function(t) {
                console.log(t.errMsg);
            }
        });
    },
    playPhone: function() {
        wx.makePhoneCall({
            phoneNumber: this.data.customerInfo.customPhone
        });
    },
    getMyCustomer: function() {
        this.modifyUserInfo(3);
    },
    editCustomer: function() {
        wx.navigateTo({
            url: "/pages/customer/add/add?relationId=" + this.data.customerInfo.relationId
        });
    },
    editNote: function() {
        wx.navigateTo({
            url: "/pages/customer/editRecord/editRecord?relationId=" + this.data.customerInfo.relationId + "&customLabel=" + this.data.customerInfo.customLabel + "&customCompany=" + this.data.customerInfo.customCompany + "&customName=" + this.data.customerInfo.customName + "&editTag=1&customTime=" + this.data.timeStr
        });
    },
    modifyUserInfo: function(t, e) {
        var s = this, o = {};
        o.relationShipId = s.data.customerInfo.relationId, 3 == t && (o.state = 1), 2 == t && (o.state = parseInt(s.data.scopeIndex) + 1), 
        1 == t && (o.time = s.getTimeStamp()), e && (o.formId = e), console.log(o), a.modifyRelation({
            method: "post",
            data: o,
            success: function(a) {
                0 == a.data.status ? (wx.showToast({
                    title: "修改成功"
                }), 3 == t ? s.setData({
                    scopeIndex: 0
                }) : 1 == t && s.setData({
                    isEditTime: !1
                })) : -102 == a.data.status ? wx.showModal({
                    title: "温馨提示",
                    showCancel: !1,
                    content: "独占客户已达到最大数量，请将部分独占客户共享后，再进行添加",
                    success: function(t) {}
                }) : wx.showToast({
                    title: a.data.message
                });
            }
        });
    },
    getTimeStamp: function() {
        var t = new Date(), a = t.getFullYear(), e = t.getMonth() + 1, s = t.getDate(), o = void 0, i = void 0, n = this.data.multiArray[0][this.data.multiIndex[0]], u = "";
        return parseInt(e), parseInt(n), u = "今天" == n ? e + "/" + s : "明天" == n ? e + "/" + (s += 1) : "后天" == n ? e + "/" + (s += 2) : n, 
        o = this.data.multiArray[1][this.data.multiIndex[1]].substr(0, this.data.multiArray[1][this.data.multiIndex[1]].indexOf("点")), 
        i = void 0 != this.data.multiArray[2][this.data.multiIndex[2]] ? this.data.multiArray[2][this.data.multiIndex[2]].substr(0, this.data.multiArray[2][this.data.multiIndex[2]].length - 1) : t.getMinutes(), 
        Date.parse(a + "/" + u + " " + o + ":" + i);
    },
    calcTimeHours: function(t, a, e) {
        var s = this.getTime(t);
        if (1 == a) {
            var o = [];
            for (var i in s) o.push(i + "点");
            this.setData({
                "multiArray[1]": o
            });
        } else {
            for (var n = [], u = s[e.substr(0, e.indexOf("点"))], r = 0; r < u.length; r++) n.push(u[r] + "分");
            this.setData({
                "multiArray[2]": n
            });
        }
    },
    timerChange: function(t) {
        this.setData({
            timeStr: this.data.multiArray[0][this.data.multiIndex[0]] + " " + this.data.multiArray[1][this.data.multiIndex[1]] + " " + (this.data.multiArray[2][this.data.multiIndex[2]] ? this.data.multiArray[2][this.data.multiIndex[2]] : ""),
            isEditTime: !0
        });
    },
    saveTime: function(t) {
        this.modifyUserInfo(1, t.detail.formId);
    },
    timerColumnChange: function(t) {
        var a = t.detail.column, e = t.detail.value;
        0 == a ? (this.setData({
            "multiIndex[0]": e
        }), 0 == e ? this.calcTimeHours(1, 1) : this.calcTimeHours(2, 1)) : 1 == a ? (this.setData({
            "multiIndex[1]": e
        }), "今天" == this.data.multiArray[0][this.data.multiIndex[0]] ? this.calcTimeHours(1, 2, this.data.multiArray[1][this.data.multiIndex[1]]) : this.calcTimeHours(2, 2, this.data.multiArray[1][this.data.multiIndex[1]])) : this.setData({
            "multiIndex[2]": e
        });
    },
    goCall: function() {
        e.callPhone(this.data.customerInfo.customPhone);
    },
    copyStr: function() {
        e.copyStr(this.data.customerInfo.customEmail);
    },
    getTime: function(a) {
        var e = void 0, s = void 0, o = void 0;
        if (1 == a) {
            var i = new Date();
            e = i.getHours(), o = (s = i.getMinutes()) + 30;
        } else e = 0, o = s = 0;
        o = 10 * parseInt(o / 10) + (o = o % 10 > 5 ? 10 : o % 10 == 0 ? 0 : 5), e = parseInt(o / 60) + e, 
        s = o % 60;
        for (var n = []; e < 24; ) "object" != t(n[e]) && (n[e] = []), n[e].push(s), (s += 5) >= 60 && (e++, 
        s = 0);
        return n;
    },
    goEdit: function() {
        console.log(JSON.stringify(this.data.customUserLabel)), wx.navigateTo({
            url: "/pages/customer/search/search?type=2&page=3&relationId=" + this.data.customerInfo.relationId + "&label=" + JSON.stringify(this.data.customUserLabel) + "&money=" + this.data.customerInfo.customMoney
        });
    }
});