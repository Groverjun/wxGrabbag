function t(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var e = require("../../../api/api.js");

Page({
    data: {
        page: 1,
        source: 1,
        list: [],
        typeIndex: -1,
        levelIndex: -1,
        stateIndex: -1,
        state: "",
        keyword: "",
        relationId: 0,
        label: [],
        isEdit: !0,
        turnover: "",
        isMember: !1,
        isEditLabel: !1
    },
    onLoad: function(t) {
        t && (this.setData({
            page: t.page,
            source: t.type,
            relationId: t.relationId
        }), console.log(t.label), t.label && this.setData({
            label: JSON.parse(t.label)
        }), t.money && this.setData({
            turnover: t.money
        }), 1 != this.data.page && wx.setNavigationBarTitle({
            title: "标签"
        })), this.getLabels();
    },
    onShow: function() {
        this.getLabels();
    },
    getLabels: function() {
        wx.getStorageSync("isMember") && this.setData({
            isMember: wx.getStorageSync("isMember")
        });
        var t = this;
        e.getLabels({
            success: function(e) {
                if (0 == e.data.status && null != e.data.data) {
                    var a = e.data.data;
                    for (var s in a) {
                        null != a[s].lebelContent && "" != a[s].lebelContent && (a[s].lebelIndex = -1, a[s].lebelContent = a[s].lebelContent.split(",")), 
                        "状态" == a[s].lebelName && ("" == a[s].lebelContent && (a[s].lebelContent = []), 
                        a[s].lebelContent.push("成交"), a[s].lebelContent.push("流失"));
                        for (var i in a[s].lebelContent) for (var l in t.data.label) t.data.label[l].lebelContent == a[s].lebelContent[i] && (a[s].lebelIndex = t.data.label[l].lebelIndex);
                    }
                    t.setData({
                        list: a
                    });
                }
            }
        });
    },
    inputKeyword: function(t) {
        t.detail.value && this.setData({
            keyword: t.detail.value
        });
    },
    goSearch: function() {
        if (this.data.keyword) {
            var t = getCurrentPages();
            t[t.length - 2].setData({
                keyword: this.data.keyword
            }), wx.navigateBack({
                delta: 1
            });
        } else wx.showToast({
            title: "请输入搜索条件"
        });
    },
    choiceLabel: function(t) {
        var e = t.target.dataset.index, a = this;
        switch (parseInt(t.target.dataset.type)) {
          case 1:
            this.setData({
                typeIndex: e
            });
            break;

          case 2:
            this.setData({
                levelIndex: e
            });
            break;

          case 3:
            3 != this.data.page && 2 != this.data.page || 3 != e ? this.data.turnover ? wx.showModal({
                title: "提示",
                content: "切换后将清除该客户的成单记录？",
                success: function(t) {
                    t.confirm && a.setData({
                        stateIndex: e,
                        turnover: ""
                    });
                }
            }) : this.setData({
                stateIndex: e
            }) : (this.showEditTarget(), this.setData({
                stateIndex: e
            }));
        }
    },
    inputExitName: function(t) {
        t.detail.value && this.setData({
            turnover: t.detail.value
        });
    },
    showEditTarget: function() {
        this.setData({
            isEdit: !1
        });
    },
    hideEdit: function() {
        this.setData({
            isEdit: !0
        });
    },
    doEdit: function() {
        this.data.turnover && "" != this.data.turnover && 0 != this.data.turnover ? this.hideEdit() : wx.showToast({
            title: "请输入成交金额"
        });
    },
    confirmLabel: function(t) {
        var e = [], a = "";
        for (var s in this.data.list) -1 != this.data.list[s].lebelIndex && void 0 != this.data.list[s].lebelIndex && (e.push({
            lebelId: this.data.list[s].lebelId,
            lebelIndex: this.data.list[s].lebelIndex,
            lebelContent: this.data.list[s].lebelContent[this.data.list[s].lebelIndex],
            lebelColor: this.data.list[s].lebelColor
        }), this.data.list[s].lebelContent[this.data.list[s].lebelIndex] && (a += this.data.list[s].lebelContent[this.data.list[s].lebelIndex] + ","));
        wx.setStorageSync("editLabel", e);
        var i = getCurrentPages(), l = (i[i.length - 1], i[i.length - 2]);
        2 == this.data.page ? (l.setData({
            isEdit: !0,
            money: this.data.turnover
        }), wx.navigateBack({
            delta: 1
        })) : 3 == this.data.page ? this.modifyUserInfo(t.detail.formId, e) : 1 == this.data.page && (a = a.substr(0, a.length - 1), 
        l.setData({
            label: a
        }), wx.navigateBack({
            delta: 1
        }));
    },
    modifyUserInfo: function(t, a) {
        var s = this, i = this, l = {};
        l.customUserLabel = JSON.stringify(a), l.relationShipId = i.data.relationId;
        var n = 0;
        console.log(this.data.list);
        for (var o in a) "成交" == a[o].lebelContent ? (n = 1, l.money = this.data.turnover) : "流失" == a[o].lebelContent && (n = -1);
        l.label = n, t && (l.formId = t);
        var d = getCurrentPages(), r = d[d.length - 2];
        e.modifyRelation({
            method: "post",
            data: l,
            success: function(t) {
                0 == t.data.status ? (r.setData({
                    label: s.data.state
                }), wx.navigateBack({
                    delta: 1
                })) : wx.showToast({
                    title: t.data.message
                });
            }
        });
    },
    goEditPage: function(t) {
        if (this.data.isEditLabel) {
            var e = t.currentTarget.dataset.index;
            wx.navigateTo({
                url: "/pages/customer/labelManager/labelManager?id=" + this.data.list[e].lebelId + "&name=" + this.data.list[e].lebelName
            });
        }
    },
    goEdit: function() {
        var t = this;
        if (this.data.isMember && getApp().globalData.teamId == wx.getStorageSync("member_info").userTeamId) wx.navigateTo({
            url: "/pages/customer/labelList/labelList"
        }); else {
            var e = getApp().globalData.teamId == wx.getStorageSync("member_info").userTeamId ? "请联系客服开通VIP专享功能权限" : "权限不足，请联系团队管理员进行操作";
            wx.showModal({
                title: "温馨提示",
                content: e,
                confirmText: "立即开通",
                success: function(e) {
                    e.confirm && t.callPhone();
                }
            });
        }
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
    choiceCustomLabel: function(e) {
        var a = e.currentTarget.dataset.i, s = this, i = e.currentTarget.dataset.index, l = "list[" + a + "].lebelIndex";
        this.setData(t({}, l, i)), console.log(this.data.list), "状态" == this.data.list[a].lebelName && ("成交" == this.data.list[a].lebelContent[i] ? this.showEditTarget() : "成交" != this.data.list[a].lebelContent[i] && this.data.turnover > 0 && wx.showModal({
            title: "提示",
            content: "切换后将清除该客户的成单记录？",
            success: function(t) {
                t.confirm && s.setData({
                    turnover: ""
                });
            }
        }));
    }
});