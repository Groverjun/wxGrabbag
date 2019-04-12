var e = require("../../../api/api.js"), t = require("../../../utils/util.js"), a = null, s = wx.getSystemInfoSync().windowHeight, a = null;

Page({
    data: {
        userId: "",
        userPhone: "",
        truePhoneNumber: "",
        memId: "",
        msg: "",
        userHead: "",
        memHead: "",
        imgHead: "",
        list: [],
        height: s + "px",
        sTop: "",
        pageId: 1,
        pageSize: 10,
        hasMore: !0,
        appId: getApp().globalData.cardAppid,
        isFirst: !0,
        sHeight: "",
        showOrHidden: !1,
        showModal: !1,
        hsMsg: "",
        hsMessages: "",
        id: ""
    },
    onLoad: function(t) {
        t.userId && this.setData({
            userId: t.userId,
            userHead: t.userHead
        }), this.setData({
            memHead: this.setHead(wx.getStorageSync("member_info").userHeadImg),
            memId: wx.getStorageSync("member_info").userId
        }), this.setData({
            imgHead: e.urlServer.imgHead
        }), this.getCard(), this.getList();
        var s = this;
        a = setInterval(function() {
            s.getList(1);
        }, 5e3);
    },
    onHide: function() {
        clearInterval(a);
    },
    onUnload: function() {
        clearInterval(a);
    },
    setScroll: function() {
        this.setData({
            sTop: s + 100
        });
    },
    upperLoad: function() {
        wx.startPullDownRefresh(), this.data.hasMore ? (this.setData({
            pageId: ++this.data.pageId
        }), this.getList()) : wx.stopPullDownRefresh();
    },
    goPage: function(e) {
        var t = e.currentTarget.dataset.id, a = "";
        a = 1 == t ? "pages/card/index/index" : 2 == t ? "pages/product/index/index" : "pages/network/index/index", 
        wx.switchTab({
            url: a
        });
    },
    getList: function(a) {
        var s = this, i = this, d = {
            type: 2,
            userId: this.data.userId,
            pageId: this.data.pageId,
            pageSize: this.data.pageSize
        };
        a && (d.state = 0, d.pageId = 1), e.getMessage({
            data: d,
            success: function(e) {
                if (0 == e.data.status) {
                    wx.stopPullDownRefresh();
                    var d = e.data.data.list;
                    if (d.length > 0) {
                        var n = e.data.data.totalNumber;
                        Math.ceil(n / s.data.pageSize) <= s.data.pageId && i.setData({
                            hasMore: !1
                        });
                        for (var o = null, r = d.length - 1; r >= 0; r--) d[r].messageContent = JSON.parse(d[r].messageContent), 
                        null == o || d[r].createTime - o > 3e5 ? (o = d[r].createTime, d[r].createTime = t.formatDateMMDDHM2(d[r].createTime)) : d[r].createTime = null;
                        void 0 != a || 1 != i.data.pageId ? void 0 == a ? (d = d.reverse(), i.setData({
                            list: d.concat(i.data.list)
                        })) : i.setData({
                            list: i.data.list.concat(d),
                            isFirst: !1
                        }) : i.setData({
                            list: d.reverse()
                        }), i.setQueryHeight(), i.data.isFirst && i.setScroll();
                    }
                }
            }
        });
    },
    getCard: function() {
        var t = this;
        e.getInfoUser({
            data: {
                userId: this.data.userId
            },
            success: function(e) {
                0 == e.data.status && t.setData({
                    userPhone: e.data.data.userPhone,
                    truePhoneNumber: null != e.data.data.truePhoneNumber ? e.data.data.truePhoneNumber : ""
                });
            }
        });
    },
    callPhone: function() {
        this.data.userPhone ? t.callPhone(this.data.userPhone) : wx.showToast({
            title: "客户未设置电话"
        });
    },
    copyPhone: function() {
        var e = this;
        this.data.truePhoneNumber ? wx.showActionSheet({
            itemList: [ "复制加微信", "立即拨打" ],
            success: function(a) {
                0 == a.tapIndex ? wx.setClipboardData({
                    data: e.data.truePhoneNumber,
                    success: function(e) {
                        wx.showToast({
                            title: "已复制"
                        });
                    }
                }) : 1 == a.tapIndex && t.callPhone(e.data.truePhoneNumber);
            },
            fail: function(e) {
                console.log(e.errMsg);
            }
        }) : wx.showToast({
            title: "客户无微信电话"
        });
    },
    setQueryHeight: function() {
        var e = this;
        wx.createSelectorQuery().select(".leave-wrap").boundingClientRect(function(t) {
            e.setData({
                sHeight: t.height + 100,
                sTop: t.height + 100
            });
        }).exec();
    },
    setHead: function(t) {
        return t ? -1 == t.indexOf("qlogo") ? e.urlServer.imgHead + t : t : "../../../images/ic_head.png";
    },
    inputMessage: function(e) {
        this.setData({
            msg: e.detail.value
        });
    },
    formSubmit: function(t) {
        var a = {}, s = this;
        if (a.messageType = 2, a.messageTo = this.data.userId, t) {
            if (!t.detail.value.messageInput) return void wx.showToast({
                title: "请输入留言"
            });
            a.messageContent = JSON.stringify({
                type: 3,
                text: t.detail.value.messageInput
            }), a.formId = t.detail.formId;
        }
        e.sendMessage({
            method: "post",
            data: a,
            success: function(e) {
                if (0 == e.data.status) {
                    var a = s.data.list;
                    a.push({
                        messageContent: {
                            type: 3,
                            text: t.detail.value.messageInput
                        },
                        messageTo: s.data.userId,
                        messageState: 0
                    }), s.setData({
                        list: a,
                        msg: ""
                    }), s.setData({
                        sTop: s.data.sHeight
                    });
                } else wx.showToast({
                    title: e.data.message
                });
            }
        });
    },
    onShareAppMessage: function() {},
    sysMessage: function(e) {
        this.setData({
            msg: e.currentTarget.dataset.text,
            showOrHidden: !1
        });
    },
    hskEdit: function() {
        1 == this.data.showOrHidden ? this.setData({
            showOrHidden: !1
        }) : (this.setData({
            showOrHidden: !0
        }), this.getHS());
    },
    addHS: function() {
        this.setData({
            showModal: !0
        });
    },
    onCancel: function() {
        this.setData({
            showModal: !1,
            hsMsg: "",
            id: ""
        });
    },
    hsMsgBlur: function(e) {
        console.log("---------hsMsg：" + e.detail.value + "----------"), this.setData({
            hsMsg: e.detail.value
        });
    },
    onConfirm: function(t) {
        var a = this;
        if (console.log("userId：" + this.data.userId + "-----id：" + this.data.id + "-----message：" + this.data.hsMsg), 
        null == this.data.hsMsg || 0 == this.data.hsMsg.length) return null;
        this.data.id ? (console.log("----------if->id：" + this.data.id + "------------"), 
        e.editHS({
            data: {
                userId: wx.getStorageSync("member_info").userId,
                id: this.data.id,
                message: this.data.hsMsg
            },
            success: function(e) {
                a.setData({
                    hsMessages: e.data,
                    hsMsg: "",
                    id: "",
                    showModal: !1
                });
            }
        })) : (console.log("----------else->id：" + this.data.id + "------------"), e.addHS({
            data: {
                userId: wx.getStorageSync("member_info").userId,
                message: this.data.hsMsg
            },
            success: function(e) {
                a.setData({
                    hsMessages: e.data,
                    hsMsg: "",
                    id: "",
                    showModal: !1
                });
            }
        }));
    },
    getHS: function() {
        var t = this;
        e.getHS({
            data: {
                userId: wx.getStorageSync("member_info").userId
            },
            success: function(e) {
                t.setData({
                    hsMessages: e.data
                });
            }
        });
    },
    delHS: function(t) {
        console.log("+++++++++++++++++id：" + t.currentTarget.dataset.id + "++++++++++++++++++++");
        var a = this;
        e.delHS({
            data: {
                userId: wx.getStorageSync("member_info").userId,
                id: t.currentTarget.dataset.id
            },
            success: function(e) {
                a.setData({
                    hsMessages: e.data
                });
            }
        });
    },
    editHS: function(e) {
        console.log("----------hsMsg：" + e.currentTarget.dataset.text + "----------"), this.setData({
            hsMsg: e.currentTarget.dataset.text,
            id: e.currentTarget.dataset.id,
            showModal: !0
        });
    }
});