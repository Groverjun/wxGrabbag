function t(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var a = getApp(), e = require("../../../api/api.js"), i = require("../../../utils/util.js"), s = getApp().globalData, n = getApp();

Page({
    data: {
        scopeIndex: 0,
        scope: [ "自己独占", "团队共享" ],
        label: "",
        state: "",
        relationId: 0,
        customerInfo: {},
        list: [],
        labelList: [],
        fromCard: !1,
        userId: "",
        money: "",
        isEdit: !1,
        isEditFiled: !1,
        isMember: !1,
        teamId: "",
        isRequired: !1
    },
    onLoad: function(t) {
        this.setData({
            relationId: t.relationId,
            userId: t.userId,
            "customerInfo.customName": t.name,
            "customerInfo.customPhone": t.phone
        }), t.name && this.setData({
            fromCard: !0
        }), t.teamId ? this.setData({
            teamId: t.teamId
        }) : this.setData({
            teamId: s.teamId
        }), this.data.relationId > 0 && (wx.setNavigationBarTitle({
            title: "编辑客户信息"
        }), this.getCoustomer()), new n.LoginPannel(), this.judgingLogin();
    },
    byteToString: function(t) {
        return String.fromCharCode.apply(String, t);
    },
    UnicodeToUtf8: function(t) {
        for (var a = "0123456789abcdef", e = new Array(t.length / 2), i = 0; i < t.length; i += 2) {
            var s = a.indexOf(t.charAt(i)) << 4 | a.indexOf(t.charAt(i + 1));
            e[i / 2] = s;
        }
        return console.log(e.length), e;
    },
    judgingLogin: function() {
        wx.getStorageSync("member_info") ? (this.getField(), this.initValidate()) : this.openLoginPannel();
    },
    openLoginPannel: function() {
        this.loginPannel.show({
            loginBack: this.onLogin
        });
    },
    onLogin: function() {
        this.setData({
            "__lgpanel__.isHide": !0
        }), this.getField(), this.initValidate();
    },
    onShow: function() {
        this.data.isEdit && this.setlabels(), this.data.isEditFiled && this.getField();
    },
    setlabels: function() {
        wx.getStorageSync("editLabel") && this.setData({
            labelList: wx.getStorageSync("editLabel")
        });
    },
    getField: function() {
        wx.getStorageSync("isMember") && this.setData({
            isMember: wx.getStorageSync("isMember")
        });
        var t = this;
        e.getfield({
            data: {
                teamId: this.data.teamId
            },
            success: function(a) {
                0 == a.data.status && t.setData({
                    list: JSON.parse(a.data.data.idText),
                    isRequired: !!(!0 & a.data.data.state)
                });
            }
        });
    },
    getCoustomer: function() {
        var t = this, a = {
            relationShipId: t.data.relationId
        };
        e.getRelationDetail({
            data: a,
            success: function(a) {
                if (0 == a.data.status) {
                    if (t.setData({
                        customerInfo: a.data.data,
                        scopeIndex: parseInt(a.data.data.shareState) - 1,
                        labelList: JSON.parse(a.data.data.customUserLabel)
                    }), null != a.data.data.customInfo) {
                        var e = JSON.parse(a.data.data.customInfo);
                        for (var i in e) for (var s in t.data.list) e[i].name == t.data.list[s].name && (t.data.list[s].value = e[i].value);
                        t.setData({
                            list: t.data.list
                        });
                    }
                } else wx.showToast({
                    title: a.data.message
                });
            }
        });
    },
    initValidate: function() {
        this.WxValidate = a.wxValidate({
            customName: {
                required: !0,
                minlength: 2
            },
            customPhone: {
                required: !0,
                minlength: 8,
                maxlength: 11
            }
        }, {
            customName: {
                required: "请填写姓名"
            },
            customPhone: {
                required: "请输入号码"
            }
        });
    },
    inputField: function(a) {
        var e = "list[" + a.currentTarget.dataset.index + "].value";
        this.setData(t({}, e, a.detail.value));
    },
    formSubmit: function(t) {
        var a = this;
        if (!this.WxValidate.checkForm(t)) {
            var s = this.WxValidate.errorList[0];
            return wx.showToast({
                title: s.msg,
                duration: 2e3
            }), !1;
        }
        for (var n in this.data.list) if (this.data.list[n].required && !this.data.list[n].value) return wx.showToast({
            title: "请输入" + this.data.list[n].name
        }), !1;
        if (this.data.isRequired && !t.detail.value.weChat) return wx.showToast({
            title: "请输入微信号"
        }), !1;
        if (this.data.labelList.length <= 0) return wx.showToast({
            title: "请选择标签"
        }), !1;
        var o = {
            name: t.detail.value.customName,
            state: parseInt(a.data.scopeIndex) + 1,
            teamId: this.data.teamId,
            formId: t.detail.formId,
            customUserLabel: JSON.stringify(this.data.labelList)
        };
        if (t.detail.value.weChat && (o.weChat = t.detail.value.weChat), this.data.list.length > 0) {
            var d = [];
            for (var n in this.data.list) this.data.list[n].value && d.push({
                required: this.data.list[n].required,
                name: this.data.list[n].name,
                value: this.data.list[n].value
            });
            o.customInfo = JSON.stringify(d);
        }
        var l = 0;
        for (var n in this.data.labelList) "成交" == this.data.labelList[n].lebelContent ? l = 1 : "流失" == this.data.labelList[n].lebelContent && (l = -1);
        if (o.label = l, !this.data.teamId || null == this.data.teamId || "" == this.data.teamId) return o.phone = t.detail.value.customPhone, 
        console.log(o), void wx.showModal({
            title: "温馨提示",
            content: "你还没有自己的团队，请先去创建哦",
            confirmText: "去创建",
            success: function(t) {
                t.confirm && (wx.setStorageSync("isFormAdd", o), wx.navigateTo({
                    url: "/pages/my/company/index"
                }));
            }
        });
        a.data.relationId > 0 ? (o.relationShipId = a.data.relationId, t.detail.value.customPhone != a.data.customerInfo.customPhone && (o.phone = i.doTrim(t.detail.value.customPhone, "g")), 
        e.modifyRelation({
            method: "post",
            data: o,
            success: function(t) {
                0 == t.data.status ? (wx.showToast({
                    title: "修改成功"
                }), wx.navigateTo({
                    url: "/pages/customer/info/info?relationId=" + a.data.relationId
                })) : wx.showToast({
                    title: t.data.message
                });
            }
        })) : (o.phone = i.doTrim(t.detail.value.customPhone, "g"), e.addCustomer({
            method: "post",
            data: o,
            success: function(t) {
                0 == t.data.status ? (wx.showToast({
                    title: "添加成功"
                }), wx.switchTab({
                    url: "/pages/customer/index/index"
                })) : -16 == t.data.status ? wx.showModal({
                    title: "温馨提示",
                    content: " 管理客户数量已达上限，请联系客服开通VIP专享功能权限",
                    confirmText: "立即开通",
                    success: function(t) {
                        t.confirm && i.contantUs();
                    }
                }) : -102 == t.data.status ? wx.showModal({
                    title: "温馨提示",
                    showCancel: !1,
                    content: "独占客户已达到最大数量，请将部分独占客户共享后，再进行添加",
                    success: function(t) {}
                }) : wx.showToast({
                    title: t.data.message
                });
            }
        }));
    },
    saveUsersCount: function() {
        e.saveUser({
            data: {
                userId: this.data.userId
            },
            success: function(t) {}
        });
    },
    bindScopeChange: function(t) {
        this.setData({
            scopeIndex: t.detail.value
        });
    },
    goEditLabel: function() {
        wx.navigateTo({
            url: "/pages/customer/search/search?type=2&page=2&label=" + JSON.stringify(this.data.labelList)
        });
    },
    goManager: function() {
        var t = this;
        if (this.data.isMember && this.data.teamId == wx.getStorageSync("member_info").userTeamId) wx.navigateTo({
            url: "/pages/customer/fieldManager/fieldManager"
        }); else {
            var a = this.data.teamId == wx.getStorageSync("member_info").userTeamId ? "请联系客服开通VIP专享功能权限" : "权限不足，请联系团队管理员进行操作";
            wx.showModal({
                title: "温馨提示",
                content: a,
                confirmText: "立即开通",
                success: function(a) {
                    a.confirm && t.callPhone();
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
    }
});