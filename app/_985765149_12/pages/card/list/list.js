var e = require("../../../A93C6C17D69926BFCF5A041083A49EA6.js"), a = require("../../../B9ABCFC5D69926BFDFCDA7C2AFA49EA6.js"), t = getApp(), s = null, n = "", i = {
    speed: .013,
    t: 0
}, r = null;

Page({
    data: {
        userId: 7,
        imgHead: "",
        myCard: "",
        isLogin: !0,
        defaultCard: "",
        list: [],
        hasTrueNum: !0,
        appId: getApp().globalData.crmAppid,
        messageCount: 0
    },
    onLoad: function(a) {
        this.setData({
            imgHead: e.urlServer.imgHead
        }), new t.LoginPannel(), this.judgingLogin(), s = wx.createCanvasContext("canvas_wi");
    },
    judgingLogin: function() {
        wx.getStorageSync("member_info") ? (null == wx.getStorageSync("member_info").truePhoneNumber && this.setData({
            hasTrueNum: !1
        }), this.getDefaultUser(), this.getMyInfomation(), this.getList()) : (this.setData({
            isLogin: !1
        }), this.openLoginPannel(), this.getDefaultUser());
    },
    setHead: function(a) {
        return a ? -1 == a.indexOf("qlogo") ? e.urlServer.imgHead + a : a : "../../../images/ic_head.png";
    },
    openLoginPannel: function() {
        this.loginPannel.show({
            loginBack: this.onLogin
        });
    },
    onLogin: function() {
        this.setData({
            "__lgpanel__.isHide": !0,
            isLogin: !0
        }), null == wx.getStorageSync("member_info").truePhoneNumber && this.setData({
            hasTrueNum: !1
        }), this.getMyInfomation(), this.getList();
    },
    onPullDownRefresh: function() {
        this.getList();
    },
    getMyInfomation: function() {
        var a = this;
        e.getMyInfo({
            success: function(e) {
                0 == e.data.status ? (wx.setStorageSync("member_info", e.data.data), e.data.data.userHeadImg = a.setHead(e.data.data.userHeadImg), 
                a.setData({
                    myCard: e.data.data
                })) : wx.showToast({
                    title: e.data.message
                });
            }
        });
    },
    getDefaultUser: function() {
        var a = this;
        e.getInfoUser({
            data: {
                userId: this.data.userId
            },
            success: function(e) {
                0 == e.data.status && (e.data.data.userHeadImg = a.setHead(e.data.data.userHeadImg), 
                a.setData({
                    defaultCard: e.data.data
                }));
            }
        });
    },
    getList: function() {
        wx.showLoading({
            title: "加载中"
        });
        var t = this;
        e.getCardList({
            success: function(e) {
                if (0 == e.data.status) {
                    wx.stopPullDownRefresh();
                    var s = e.data.data.list;
                    for (var n in s) s[n].userHeadImg = t.setHead(s[n].userHeadImg), s[n].createTime = a.formatDate(s[n].createTime);
                    t.setData({
                        list: s,
                        messageCount: e.data.data.messageCount
                    });
                } else wx.showToast({
                    title: e.data.message
                });
                wx.hideLoading();
            }
        });
    },
    goDetail: function(a) {
        this.setFormId(a.detail.formId), a.detail.encryptedData ? e.setPhoneNumber({
            method: "post",
            data: {
                encryptedData: a.detail.encryptedData,
                iv: a.detail.iv
            },
            success: function(e) {
                if (console.log("--------res.data--------" + e.data), 0 == e.data.status) {
                    var t = wx.getStorageSync("member_info");
                    t.truePhoneNumber = e.data.data, wx.setStorageSync("member_info", t);
                }
                wx.setStorageSync("teamId", a.currentTarget.dataset.tid), wx.setStorageSync("cardId", a.currentTarget.dataset.id), 
                wx.switchTab({
                    url: "/pages/card/index/index"
                });
            }
        }) : (wx.setStorageSync("teamId", a.currentTarget.dataset.tid), wx.setStorageSync("cardId", a.currentTarget.dataset.id), 
        wx.switchTab({
            url: "/pages/card/index/index"
        }));
    },
    setFormId: function(a) {
        a && e.setFormId({
            data: {
                type: 1,
                formId: a
            },
            success: function(e) {
                console.log(e);
            }
        });
    },
    onShareAppMessage: function() {},
    updateFromId: function(a) {
        var t = this;
        a.detail.formId && e.setFormId({
            data: {
                type: 1,
                formId: a.detail.formId
            },
            success: function(e) {
                t.setData({
                    messageCount: ++t.data.messageCount
                });
            }
        }), n = Math.floor(6 * Math.random() + 1), this.drawImage([ [ {
            x: 30,
            y: 50
        }, {
            x: 70,
            y: 40
        }, {
            x: 0,
            y: 25
        }, {
            x: 30,
            y: 0
        } ], [ {
            x: 30,
            y: 50
        }, {
            x: 30,
            y: 40
        }, {
            x: 80,
            y: 25
        }, {
            x: 30,
            y: 0
        } ], [ {
            x: 30,
            y: 50
        }, {
            x: 0,
            y: 15
        }, {
            x: 80,
            y: 20
        }, {
            x: 30,
            y: 0
        } ] ]);
    },
    drawImage: function(e) {
        var a = this, t = e[0][0], d = e[0][1], o = e[0][2], g = e[0][3], u = e[1][0], c = e[1][1], m = e[1][2], x = e[1][3], y = e[2][0], l = e[2][1], f = e[2][2], h = e[2][3], p = i.t, w = 2 * (d.x - t.x), I = 2 * (o.x - d.x) - w, S = g.x - t.x - w - I, D = 2 * (d.y - t.y), b = 2 * (o.y - d.y) - D, L = g.y - t.y - D - b, v = S * (p * p * p) + I * (p * p) + w * p + t.x, H = L * (p * p * p) + b * (p * p) + D * p + t.y, T = 2 * (c.x - u.x), C = 2 * (m.x - c.x) - T, _ = x.x - u.x - T - C, P = 2 * (c.y - u.y), M = 2 * (m.y - c.y) - P, N = x.y - u.y - P - M, k = _ * (p * p * p) + C * (p * p) + T * p + u.x, F = N * (p * p * p) + M * (p * p) + P * p + u.y, j = 2 * (l.x - y.x), A = 2 * (f.x - l.x) - j, U = h.x - y.x - j - A, q = 2 * (l.y - y.y), R = 2 * (f.y - l.y) - q, B = h.y - y.y - q - R, O = U * (p * p * p) + A * (p * p) + j * p + y.x, z = B * (p * p * p) + R * (p * p) + q * p + y.y;
        switch (i.t += i.speed, n) {
          case 1:
            s.drawImage("../../../images/spec1.png", v, H, 30, 30);
            break;

          case 2:
            s.drawImage("../../../images/spec2.png", k, F, 30, 30);
            break;

          case 3:
            s.drawImage("../../../images/spec3.png", O, z, 30, 30);
            break;

          case 4:
            s.drawImage("../../../images/spec4.png", v, H, 30, 30);
            break;

          case 5:
            s.drawImage("../../../images/spec5.png", k, F, 30, 30);
            break;

          case 6:
            s.drawImage("../../../images/spec6.png", O, z, 30, 30);
        }
        s.draw(), i.t > 1 ? (i.t = 0, clearTimeout(r), s.draw()) : r = setTimeout(function() {
            a.drawImage([ [ {
                x: 30,
                y: 50
            }, {
                x: 70,
                y: 40
            }, {
                x: 0,
                y: 25
            }, {
                x: 30,
                y: 0
            } ], [ {
                x: 30,
                y: 50
            }, {
                x: 30,
                y: 40
            }, {
                x: 80,
                y: 25
            }, {
                x: 30,
                y: 0
            } ], [ {
                x: 30,
                y: 50
            }, {
                x: 0,
                y: 15
            }, {
                x: 80,
                y: 20
            }, {
                x: 30,
                y: 0
            } ] ]);
        }, 10);
    }
});