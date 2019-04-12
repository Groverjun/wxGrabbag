var e = null, a = "", t = {
    speed: .013,
    t: 0
}, s = null, n = require("../../../api/api.js"), i = require("../../../utils/util.js");

Page({
    data: {
        imgHead: "",
        topInfo: {
            formIdCount: 0
        },
        list: [],
        isTap: !1
    },
    onLoad: function(a) {
        this.setData({
            imgHead: n.urlServer.imgHead
        }), e = wx.createCanvasContext("canvas_wi");
    },
    onShow: function() {
        var e = this;
        this.getList(function(a) {
            e.getAnalysis(a);
        });
    },
    onPullDownRefresh: function() {
        var e = this;
        this.getList(function(a) {
            e.getAnalysis(a);
        });
    },
    setHead: function(e) {
        return e ? -1 == e.indexOf("qlogo") ? n.urlServer.imgHead + e : e : "../../../images/ic_head.png";
    },
    getList: function(e) {
        var a = this;
        n.getMessageList({
            data: {
                type: 1
            },
            success: function(t) {
                if (0 == t.data.status) {
                    wx.stopPullDownRefresh();
                    var s = t.data.data, n = 0;
                    for (var r in s) s[r].createTime = i.formatDateMMDDHM2(s[r].createTime), s[r].content && (s[r].content = JSON.parse(s[r].content)), 
                    s[r].userHeadImg = a.setHead(s[r].userHeadImg), n += s[r].message_count / 1;
                    a.setData({
                        list: s
                    }), e(n);
                }
            }
        });
    },
    getAnalysis: function(e) {
        var a = this;
        n.getTopLog({
            success: function(t) {
                if (0 == t.data.status) {
                    var s = t.data.data;
                    null != s && (s.create_time && (s.create_time = i.formatDateMMDDHM2(s.create_time)), 
                    a.setData({
                        topInfo: s
                    }), e > 0 || s.count > 0 ? wx.setTabBarBadge({
                        index: 2,
                        text: (e + s.count).toString()
                    }) : wx.removeTabBarBadge({
                        index: 2
                    }));
                }
            }
        });
    },
    updateFromId: function(e) {
        var t = this;
        e.detail.formId && n.setFormId({
            data: {
                type: 2,
                formId: e.detail.formId
            },
            success: function(e) {
                t.setData({
                    "topInfo.formIdCount": ++t.data.topInfo.formIdCount
                });
            }
        }), a = Math.floor(6 * Math.random() + 1), this.drawImage([ [ {
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
    drawImage: function(n) {
        console.log(1111);
        var i = this, r = n[0][0], o = n[0][1], x = n[0][2], c = n[0][3], d = n[1][0], y = n[1][1], g = n[1][2], u = n[1][3], m = n[2][0], f = n[2][1], p = n[2][2], l = n[2][3], I = t.t, w = 2 * (o.x - r.x), h = 2 * (x.x - o.x) - w, v = c.x - r.x - w - h, D = 2 * (o.y - r.y), H = 2 * (x.y - o.y) - D, M = c.y - r.y - D - H, T = v * (I * I * I) + h * (I * I) + w * I + r.x, b = M * (I * I * I) + H * (I * I) + D * I + r.y, L = 2 * (y.x - d.x), _ = 2 * (g.x - y.x) - L, k = u.x - d.x - L - _, C = 2 * (y.y - d.y), S = 2 * (g.y - y.y) - C, B = u.y - d.y - C - S, q = k * (I * I * I) + _ * (I * I) + L * I + d.x, A = B * (I * I * I) + S * (I * I) + C * I + d.y, P = 2 * (f.x - m.x), j = 2 * (p.x - f.x) - P, F = l.x - m.x - P - j, O = 2 * (f.y - m.y), R = 2 * (p.y - f.y) - O, J = l.y - m.y - O - R, N = F * (I * I * I) + j * (I * I) + P * I + m.x, z = J * (I * I * I) + R * (I * I) + O * I + m.y;
        switch (t.t += t.speed, a) {
          case 1:
            e.drawImage("../../../images/spec1.png", T, b, 30, 30);
            break;

          case 2:
            e.drawImage("../../../images/spec2.png", q, A, 30, 30);
            break;

          case 3:
            e.drawImage("../../../images/spec3.png", N, z, 30, 30);
            break;

          case 4:
            e.drawImage("../../../images/spec4.png", T, b, 30, 30);
            break;

          case 5:
            e.drawImage("../../../images/spec5.png", q, A, 30, 30);
            break;

          case 6:
            e.drawImage("../../../images/spec6.png", N, z, 30, 30);
        }
        e.draw(), t.t > 1 ? (t.t = 0, clearTimeout(s), e.draw()) : s = setTimeout(function() {
            i.drawImage([ [ {
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