function t(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var a, e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, i = require("../../../api/api.js");

Page((a = {
    data: {
        tradeIndex: 0,
        trade: [],
        tradeId: [],
        remark: "",
        multiArray: [ [ "今天", "明天", "后天" ], [], [] ],
        multiIndex: [ 0, 0, 0 ],
        timeVal: "请选择",
        editTag: 2,
        userName: "",
        userConpany: "",
        userLabel: 0,
        relationId: "",
        relationName: ""
    },
    onLoad: function(t) {
        this.getMode(), this.getDateInit(), this.calcTimeHours(1, 1), this.setData({
            editTag: t.editTag,
            relationName: t.customName,
            userConpany: t.customCompany,
            userLabel: t.customLabel,
            relationId: t.relationId
        });
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
    getMode: function() {
        var t = this;
        i.flowList({
            success: function(a) {
                if (0 == a.data.status) {
                    for (var e = a.data.data, i = [], r = [], s = 0; s < e.length; s++) i.push(e[s].followTypeName), 
                    r.push(e[s].followTypeId);
                    t.setData({
                        trade: i,
                        tradeId: r
                    });
                } else wx.showToast({
                    title: a.data.message
                });
            }
        });
    },
    bindTradeChange: function(t) {
        this.setData({
            tradeIndex: t.detail.value
        });
    },
    timerColumnChange: function(t) {
        this.setData({
            tradeIndex: t.detail.value
        });
    },
    writeLogMethod: function(t) {
        var a = this;
        if (a.data.relationId) if ("请选择" == (a.data.tradeIndex ? a.data.trade[a.data.tradeIndex] : "请选择")) wx.showToast({
            title: "请选择拜访方式"
        }); else {
            var e = {
                typeId: a.data.tradeId[a.data.tradeIndex],
                typeName: a.data.trade[a.data.tradeIndex],
                relationId: a.data.relationId,
                formId: t.detail.formId
            };
            a.data.remark && (e.remark = a.data.remark), "请选择" != a.data.timeVal && (e.time = a.getTimeStamp(), 
            e.formId = t.detail.formId), i.writeLog({
                method: "post",
                data: e,
                success: function(t) {
                    0 == t.data.status ? (wx.showToast({
                        title: "添加成功"
                    }), wx.switchTab({
                        url: "/pages/customer/index/index"
                    })) : wx.showToast({
                        title: t.data.message
                    });
                }
            });
        } else wx.showToast({
            title: "请选择拜访对象"
        });
    },
    bindTextAreaBlur: function(t) {
        t.detail.value && this.setData({
            remark: t.detail.value
        });
    },
    getTimeStamp: function() {
        var t = new Date(), a = t.getFullYear(), e = t.getMonth() + 1, i = t.getDate(), r = void 0, s = void 0, d = this.data.multiArray[0][this.data.multiIndex[0]], n = "";
        return parseInt(e), parseInt(d), n = "今天" == d ? e + "/" + i : "明天" == d ? e + "/" + (i += 1) : "后天" == d ? e + "/" + (i += 2) : d, 
        r = this.data.multiArray[1][this.data.multiIndex[1]].substr(0, this.data.multiArray[1][this.data.multiIndex[1]].indexOf("点")), 
        s = void 0 != this.data.multiArray[2][this.data.multiIndex[2]] ? this.data.multiArray[2][this.data.multiIndex[2]].substr(0, this.data.multiArray[2][this.data.multiIndex[2]].length - 1) : t.getMinutes(), 
        Date.parse(a + "/" + n + " " + r + ":" + s);
    },
    calcTimeHours: function(t, a, e) {
        var i = this.getTime(t);
        if (1 == a) {
            var r = [];
            for (var s in i) r.push(s + "点");
            this.setData({
                "multiArray[1]": r
            });
        } else {
            for (var d = [], n = i[e.substr(0, e.indexOf("点"))], o = 0; o < n.length; o++) d.push(n[o] + "分");
            this.setData({
                "multiArray[2]": d
            });
        }
    },
    timerChange: function(t) {
        this.setData({
            timeVal: this.data.multiArray[0][this.data.multiIndex[0]] + " " + this.data.multiArray[1][this.data.multiIndex[1]] + " " + (this.data.multiArray[2][this.data.multiIndex[2]] ? this.data.multiArray[2][this.data.multiIndex[2]] : "")
        });
    }
}, t(a, "timerColumnChange", function(t) {
    var a = t.detail.column, e = t.detail.value;
    0 == a ? (this.setData({
        "multiIndex[0]": e
    }), 0 == e ? this.calcTimeHours(1, 1) : this.calcTimeHours(2, 1)) : 1 == a ? (this.setData({
        "multiIndex[1]": e
    }), "今天" == this.data.multiArray[0][this.data.multiIndex[0]] ? this.calcTimeHours(1, 2, this.data.multiArray[1][this.data.multiIndex[1]]) : this.calcTimeHours(2, 2, this.data.multiArray[1][this.data.multiIndex[1]])) : this.setData({
        "multiIndex[2]": e
    });
}), t(a, "getTime", function(t) {
    var a = void 0, i = void 0, r = void 0;
    if (1 == t) {
        var s = new Date();
        a = s.getHours(), r = (i = s.getMinutes()) + 30;
    } else a = 0, r = i = 0;
    r = 10 * parseInt(r / 10) + (r = r % 10 > 5 ? 10 : r % 10 == 0 ? 0 : 5), a = parseInt(r / 60) + a, 
    i = r % 60;
    for (var d = []; a < 24; ) "object" != e(d[a]) && (d[a] = []), d[a].push(i), (i += 5) >= 60 && (a++, 
    i = 0);
    return d;
}), t(a, "goList", function() {
    2 == this.data.editTag && wx.navigateTo({
        url: "/pages/customer/list/index"
    });
}), a));