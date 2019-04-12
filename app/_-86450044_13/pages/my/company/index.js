var t = require("../../../api/api.js"), a = require("../../../utils/util.js");

Page({
    data: {
        type: 1,
        teamId: "",
        teamIcon: "",
        teamName: "",
        typeIndex: 0,
        productCount: "",
        dynamicsCount: 0,
        typeList: [],
        teamDetail: [],
        editImg: !1,
        edit: !1
    },
    onLoad: function(t) {
        t && (this.setData({
            type: t.type
        }), t.teamId && this.setData({
            teamId: t.teamId
        }), t.edit && (this.setData({
            edit: !0
        }), this.setEditDetails())), this.getTeamType();
    },
    setEditDetails: function() {
        wx.getStorageSync("companyInfo") && this.setData({
            teamDetail: wx.getStorageSync("companyInfo")
        });
    },
    setHeadImg: function(a) {
        a && this.setData({
            teamIcon: -1 == a.indexOf("qlogo") ? t.urlServer.imgHead + a : a
        });
    },
    getMyInfo: function() {
        t.getMyInfo({
            success: function(t) {
                0 == t.data.status ? wx.setStorageSync("member_info", t.data.data) : wx.showToast({
                    title: t.data.message
                });
            }
        });
    },
    getTeam: function() {
        if (null != this.data.teamId && "null" != this.data.teamId) {
            var a = this;
            t.getMyTeamInfo({
                data: {
                    teamId: this.data.teamId
                },
                success: function(t) {
                    0 == t.data.status && null != t.data.data && (a.setHeadImg(t.data.data.teamIcon), 
                    a.setData({
                        teamName: t.data.data.teamName,
                        typeIndex: null == t.data.data.tradeTypeId ? 0 : t.data.data.tradeTypeId - 1,
                        teamDetail: t.data.data.teamDetail,
                        productCount: t.data.data.productCount,
                        dynamicsCount: t.data.data.dynamicsCount
                    }), a.data.edit && a.setEditDetails());
                }
            });
        }
    },
    changeHead: function() {
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(t) {
                var a = t.tempFilePaths;
                wx.navigateTo({
                    url: "/pages/upload/upload?src=" + a + "&type=4"
                });
            }
        });
    },
    getTeamType: function() {
        var a = this;
        t.getTeamType({
            success: function(t) {
                if (0 == t.data.status) {
                    var e = t.data.data, i = [];
                    for (var d in e) i.push(e[d].typeName);
                    a.setData({
                        typeList: i
                    }), a.getTeam();
                }
            }
        });
    },
    inputTeamName: function(t) {
        t.detail.value && this.setData({
            teamName: t.detail.value
        });
    },
    bindTypeChange: function(t) {
        this.setData({
            typeIndex: t.detail.value
        });
    },
    saveModify: function(t) {
        if (!this.data.teamIcon) return wx.showToast({
            title: "请选择logo"
        }), !1;
        if (!this.data.teamName) return wx.showToast({
            title: "请输入公司名称"
        }), !1;
        var e = this, i = {
            teamName: e.data.teamName,
            typeId: parseInt(e.data.typeIndex) + 1,
            typeName: e.data.typeList[e.data.typeIndex],
            formId: t.detail.formId
        };
        "null" == this.data.teamId || null == this.data.teamId || this.data.teamId || "" == this.data.teamId || (i.teamId = e.data.teamId);
        var d = [], s = e.data.teamDetail;
        if (wx.showLoading({
            title: "信息保存中...",
            mask: !0
        }), e.data.editImg) a.uploadHead(e.data.teamIcon, function(t) {
            if (i.icon = t[0].filePath, e.data.edit && null != s) {
                if (0 == s.length) return i.detail = "", void e.modifyTeam(i);
                e.setDetail(s, d, function(t) {
                    0 != t.length && (i.detail = JSON.stringify(t), e.setData({
                        teamDetail: t
                    })), e.modifyTeam(i);
                });
            } else e.modifyTeam(i);
        }); else if (e.data.edit && null != s) {
            if (0 == s.length) return i.detail = "", void e.modifyTeam(i);
            e.setDetail(s, d, function(t) {
                0 != t.length && (i.detail = JSON.stringify(t), e.setData({
                    teamDetail: t
                })), e.modifyTeam(i);
            });
        } else e.modifyTeam(i);
    },
    modifyTeam: function(a) {
        var e = this, i = getCurrentPages(), d = (i[i.length - 1], i[i.length - 2]);
        t.modifyTeam({
            method: "post",
            data: a,
            success: function(t) {
                0 == t.data.status ? (e.getMyInfo(), wx.hideLoading(), 1 == e.data.type ? (null != t.data.data ? (d.setData({
                    "userInfo.userTeamId": t.data.data.teamId,
                    "userInfo.teamName": t.data.data.teamName
                }), wx.navigateBack({
                    delta: 1
                })) : wx.switchTab({
                    url: "/pages/my/index/index"
                }), wx.removeStorageSync("companyInfo"), wx.removeStorageSync("companyDetail")) : wx.getStorageSync("isFormAdd") ? (wx.showLoading({
                    title: "添加客户中..."
                }), e.addRelation(t.data.data.teamId)) : wx.switchTab({
                    url: "/pages/team/index/index"
                })) : (wx.showLoading({
                    title: t.data.message
                }), setTimeout(function() {
                    wx.hideLoading();
                }, 1500));
            },
            fail: function(t) {
                console.log("失败", t);
            }
        });
    },
    addRelation: function(e) {
        var i = wx.getStorageSync("isFormAdd");
        i.teamId = e, t.addCustomer({
            method: "post",
            data: i,
            success: function(t) {
                wx.hideLoading(), 0 == t.data.status ? (wx.showToast({
                    title: "客户添加成功"
                }), wx.switchTab({
                    url: "/pages/team/index/index"
                }), wx.removeStorageSync("isFormAdd")) : 1 == t.data.status ? wx.showModal({
                    title: "温馨提示",
                    content: " 管理客户数量已达上限，请联系客服开通VIP专享功能权限",
                    confirmText: "立即开通",
                    success: function(t) {
                        t.confirm && a.contantUs();
                    }
                }) : wx.showToast({
                    title: t.data.message
                });
            }
        });
    },
    creatTeam: function(a) {
        var e = this, i = getCurrentPages(), d = (i[i.length - 1], i[i.length - 2]);
        t.creatTeam({
            method: "post",
            data: a,
            success: function(t) {
                0 == t.data.status && (console.log(t.data.data), 1 == e.data.type ? (d.setData({
                    "userInfo.userTeamId": t.data.data.teamId,
                    "userInfo.teamName": t.data.data.teamName
                }), wx.navigateBack({
                    delta: 1
                })) : wx.switchTab({
                    url: "/pages/team/index/index"
                }));
            }
        });
    },
    setDetail: function(a, e, i) {
        var d = this, s = a[0];
        return a.length ? "2" != s.type || "2" == s.type && 40 == s.value.length ? (e.push(s), 
        a.shift(), d.setDetail(a, e, i), !1) : void wx.uploadFile({
            url: t.urlServer.ApiUrl + "/file/upload",
            filePath: s.value,
            name: "file",
            success: function(t) {
                var n = JSON.parse(t.data);
                s.value = n.data.list[0].filePath, e.push(s), a.shift(), d.setDetail(a, e, i);
            },
            fail: function(t) {
                console.log(t);
            }
        }) : (i(e), !1);
    },
    goDetail: function() {
        var t = "/pages/my/details/index?page=" + this.data.type;
        this.data.teamId && (t += "&id=" + this.data.teamId), this.data.teamDetail && wx.setStorageSync("companyDetail", this.data.teamDetail), 
        wx.navigateTo({
            url: t
        });
    }
});