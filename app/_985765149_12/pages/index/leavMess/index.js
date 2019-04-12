var e = require("../../../A93C6C17D69926BFCF5A041083A49EA6.js"), t = require("../../../B9ABCFC5D69926BFDFCDA7C2AFA49EA6.js"), a = wx.getSystemInfoSync().windowHeight, s = null;

Page({
    data: {
        truePhoneNumber: "",
        userPhone: "",
        userId: "",
        memId: "",
        productId: "",
        msg: "",
        userHead: "",
        memHead: "",
        imgHead: "",
        top: "",
        height: a + 50 + "px",
        sTop: "",
        pageId: 1,
        pageSize: 10,
        hasMore: !0,
        isFirst: !0,
        hasTrueNum: !0,
        sHeight: ""
    },
    onLoad: function(t) {
        t.userId ? this.setData({
            userId: t.userId,
            memHead: this.setHead(wx.getStorageSync("member_info").userHeadImg),
            memId: wx.getStorageSync("member_info").userId
        }) : wx.getStorageSync("cardId") && this.setData({
            userId: wx.getStorageSync("cardId"),
            memHead: this.setHead(wx.getStorageSync("member_info").userHeadImg),
            memId: wx.getStorageSync("member_info").userId
        }), t.productId && (this.setData({
            productId: t.productId
        }), this.formSubmit()), null == wx.getStorageSync("member_info").truePhoneNumber && this.setData({
            hasTrueNum: !1
        }), this.setData({
            imgHead: e.urlServer.imgHead
        }), this.getCard(), this.getList();
        var a = this;
        s = setInterval(function() {
            a.getList(1);
        }, 5e3);
    },
    onHide: function() {
        clearInterval(s);
    },
    onUnload: function() {
        clearInterval(s);
    },
    setScroll: function() {
        this.setData({
            sTop: a + 100
        });
    },
    upperLoad: function() {
        wx.startPullDownRefresh(), this.data.hasMore ? (this.setData({
            pageId: ++this.data.pageId
        }), this.getList()) : wx.stopPullDownRefresh();
    },
    goPage: function(e) {
        this.formId(e.target.formId);
        var t = e.currentTarget.dataset.id, a = "";
        a = 1 == t ? "/pages/card/index/index" : 2 == t ? "/pages/product/index/index" : "/pages/network/index/index", 
        wx.switchTab({
            url: a
        });
    },
    setFormId: function(t) {
        t && e.setFormId({
            data: {
                type: 1,
                formId: t
            },
            success: function(e) {
                console.log(e);
            }
        });
    },
    getList: function(a) {
        var s = this, i = this, r = {
            userId: this.data.userId,
            pageId: this.data.pageId,
            pageSize: this.data.pageSize
        };
        a && (r.state = 0, r.pageId = 1), 1 == this.data.isFirst && (r.isCord = 1), e.getMessage({
            data: r,
            success: function(e) {
                if (0 == e.data.status) {
                    wx.stopPullDownRefresh();
                    var r = e.data.data.list;
                    if (r.length > 0) {
                        var n = e.data.data.totalNumber;
                        Math.ceil(n / s.data.pageSize) <= s.data.pageId && i.setData({
                            hasMore: !1
                        });
                        for (var d = null, o = r.length - 1; o >= 0; o--) r[o].messageContent = JSON.parse(r[o].messageContent), 
                        null == d || r[o].createTime - d > 3e5 ? (d = r[o].createTime, r[o].createTime = t.formatDateMMDDHM2(r[o].createTime)) : r[o].createTime = null;
                        void 0 != a || 1 != i.data.pageId ? void 0 == a ? (r = r.reverse(), i.setData({
                            list: r.concat(i.data.list)
                        })) : (i.setData({
                            list: i.data.list.concat(r)
                        }), console.log(1111111111)) : i.setData({
                            list: r.reverse(),
                            isFirst: !1
                        }), i.setQueryHeight(), i.data.isFirst && i.setScroll();
                    }
                }
            }
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
    goCard: function() {
        wx.setStorageSync("cardId", this.data.memId), wx.switchTab({
            url: "/pages/card/index/index"
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
                    userHead: null != e.data.data.userHeadImg && "" != e.data.data.userHeadImg ? t.setHead(e.data.data.userHeadImg) : "",
                    truePhoneNumber: null != e.data.data.truePhoneNumber ? e.data.data.truePhoneNumber : ""
                });
            }
        });
    },
    callPhone: function(a) {
        var s = this;
        a.detail.encryptedData ? e.setPhoneNumber({
            method: "post",
            data: {
                encryptedData: a.detail.encryptedData,
                iv: a.detail.iv
            },
            success: function(e) {
                if (0 == e.data.status) {
                    var a = wx.getStorageSync("member_info");
                    a.truePhoneNumber = e.data.data, wx.setStorageSync("member_info", a);
                }
                s.data.userPhone ? t.callPhone(s.data.userPhone) : wx.showToast({
                    title: "用户未设置电话"
                });
            }
        }) : this.data.userPhone ? t.callPhone(this.data.userPhone) : wx.showToast({
            title: "用户未设置电话"
        });
    },
    copyPhone: function(a) {
        var s = this;
        this.data.truePhoneNumber ? a.detail.encryptedData ? e.setPhoneNumber({
            method: "post",
            data: {
                encryptedData: a.detail.encryptedData,
                iv: a.detail.iv
            },
            success: function(e) {
                if (0 == e.data.status) {
                    var a = wx.getStorageSync("member_info");
                    a.truePhoneNumber = e.data.data, wx.setStorageSync("member_info", a);
                }
                wx.showActionSheet({
                    itemList: [ "复制加微信", "立即拨打" ],
                    success: function(e) {
                        0 == e.tapIndex ? wx.setClipboardData({
                            data: s.data.truePhoneNumber,
                            success: function(e) {
                                wx.showToast({
                                    title: "已复制"
                                });
                            }
                        }) : 1 == e.tapIndex && t.callPhone(s.data.truePhoneNumber);
                    },
                    fail: function(e) {
                        console.log(e.errMsg);
                    }
                });
            }
        }) : wx.showActionSheet({
            itemList: [ "复制加微信", "立即拨打" ],
            success: function(e) {
                0 == e.tapIndex ? wx.setClipboardData({
                    data: s.data.truePhoneNumber,
                    success: function(e) {
                        wx.showToast({
                            title: "已复制"
                        });
                    }
                }) : 1 == e.tapIndex && t.callPhone(s.data.truePhoneNumber);
            },
            fail: function(e) {
                console.log(e.errMsg);
            }
        }) : wx.showToast({
            title: "用户无微信电话"
        });
    },
    inputMessage: function(e) {
        this.setData({
            msg: e.detail.value
        });
    },
    formSubmit: function(t) {
        var a = {}, s = this, i = t;
        if (a.messageType = 1, a.messageTo = this.data.userId, t) {
            if (!t.detail.value.messageInput) return void wx.showToast({
                title: "请输入留言"
            });
            a.messageContent = JSON.stringify({
                type: 3,
                text: t.detail.value.messageInput
            }), a.formId = t.detail.formId;
        } else a.productId = parseInt(this.data.productId);
        e.sendMessage({
            method: "post",
            data: a,
            success: function(e) {
                0 == e.data.status ? (s.data.list.push({
                    messageContent: {
                        type: 3,
                        text: i.detail.value.messageInput
                    },
                    messageTo: s.data.userId,
                    messageState: 0
                }), s.setData({
                    list: s.data.list,
                    msg: ""
                }), s.setData({
                    sTop: s.data.sHeight
                })) : wx.showToast({
                    title: e.data.message
                });
            }
        });
    },
    inputFocus: function() {
        this.setData({
            top: "45%"
        });
    },
    inputBlur: function() {
        this.setData({
            top: 0
        });
    },
    onShareAppMessage: function() {}
});