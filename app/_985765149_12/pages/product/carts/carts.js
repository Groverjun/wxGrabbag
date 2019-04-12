var t = require("../../../A93C6C17D69926BFCF5A041083A49EA6.js");

require("../../../B9ABCFC5D69926BFDFCDA7C2AFA49EA6.js");

Page({
    data: function(t, a, s) {
        return a in t ? Object.defineProperty(t, a, {
            value: s,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[a] = s, t;
    }({
        id: "",
        allChecked: !0,
        ispay: !0,
        classlist: [],
        totalCount: "",
        totalMoney: "",
        cartlength: "",
        imgHead: "",
        userId: "",
        teamId: "",
        goodsId: []
    }, "totalCount", ""),
    onLoad: function(a) {
        this.setData({
            imgHead: t.urlServer.imgHead
        }), a.id && this.setData({
            id: a.id
        }), a.userId ? (this.setData({
            userId: a.userId,
            teamId: a.teamId
        }), wx.setStorageSync("cardId", a.userId), wx.setStorageSync("teamId", a.teamId)) : wx.getStorageSync("cardId") && this.setData({
            teamId: wx.getStorageSync("teamId"),
            userId: wx.getStorageSync("member_info").userId
        }), this.setData({
            teamId: wx.getStorageSync("teamId")
        }), wx.removeStorageSync("goodsList"), wx.removeStorageSync("carList"), this.getCar(), 
        this.setTotalInfo();
    },
    getCar: function() {
        wx.showLoading({
            title: "加载中..."
        });
        var a = this;
        t.getCar({
            data: {
                teamId: this.data.teamId
            },
            success: function(t) {
                if (t.data.data.length > 0) {
                    var s = t.data.data;
                    for (var e in s) s[e].kekeProduct.productPic = s[e].kekeProduct.productPic.split(",");
                    a.setData({
                        classlist: s,
                        cartlength: t.data.data.length
                    }), a.setTotalInfo();
                }
                wx.hideLoading();
            }
        });
    },
    manageGoods: function(t) {
        this.data.classlist;
        this.data.ispay = !this.data.ispay, this.setData({
            ispay: this.data.ispay
        });
    },
    deltgoods: function() {
        var a = this;
        wx.showLoading({
            icon: "loading",
            title: "加载中"
        });
        var s = "";
        if (1 == this.data.allChecked) t.emtCar({
            success: function(t) {
                0 == t.data.status && (wx.hideLoading(), a.data.classlist = [], a.setData({
                    classlist: a.data.classlist,
                    cartlength: 0,
                    totalMoney: 0
                }), a.getCar());
            }
        }); else {
            for (var e in this.data.classlist) console.log(this.data.classlist[e]), 1 == this.data.classlist[e].itemSelect && (s = this.data.classlist[e].cartItmeId);
            t.wxRequest({
                success: function(t) {
                    0 == t.data.status ? (wx.hideLoading(), a.getCar()) : wx.showToast({
                        title: "未选中要删除的商品"
                    });
                }
            }, t.urlServer.ApiUrl + "/trade_api/cart/shopCart/delGoods/" + s), this.setData({
                classlist: this.data.classlist
            });
        }
    },
    editNum: function(a) {
        var s = this, e = a.currentTarget.dataset.type, i = a.currentTarget.dataset.id, l = a.currentTarget.dataset.goodsindex, d = this.data.classlist, o = (d[l].itemSelect, 
        d[l].itemNumber);
        -1 == e && o <= 1 || (wx.showLoading({
            icon: "loading",
            title: "加载中"
        }), t.editCar({
            method: "post",
            data: {
                cartItmeId: i,
                itemNumber: o,
                itemSelect: 1
            },
            success: function(t) {
                if (0 == t.data.status) {
                    if (-1 == e) {
                        if (o <= 1) return !1;
                        o -= 1, d[l].itemNumber = o;
                    } else o += 1, d[l].itemNumber = o;
                    s.setData({
                        classlist: s.data.classlist
                    }), s.setTotalInfo(), wx.hideLoading();
                } else wx.showToast({
                    title: t.data.message
                });
            }
        }));
    },
    checkGoods: function(t) {
        var a = t.currentTarget.dataset.type, s = t.currentTarget.dataset.index;
        if ("all" == a) {
            this.setData({
                allChecked: !this.data.allChecked
            });
            for (var e in this.data.classlist) this.data.classlist[e] && (this.data.classlist[e].itemSelect = this.data.allChecked);
        } else this.data.classlist[s].itemSelect = !this.data.classlist[s].itemSelect;
        this.setTotalInfo(), this.setData({
            classlist: this.data.classlist
        });
    },
    getCard: function() {
        var a = this;
        t.getInfoUser({
            data: {
                userId: this.data.userId
            },
            success: function(t) {
                0 == t.data.status && (t.data.data.teamIcon = null != t.data.data.teamIcon && "" != t.data.data.teamIcon ? a.setHead(t.data.data.teamIcon) : "", 
                a.setData({
                    userInfo: t.data.data,
                    userPhone: t.data.data.userPhone
                }));
            }
        });
    },
    setTotalInfo: function() {
        var t = 0, a = 0, s = 0, e = 0;
        for (var i in this.data.classlist) 1 == this.data.classlist[i].itemSelect && (t += parseFloat(this.data.classlist[i].kekeProduct.productPrice / 100) * parseFloat(this.data.classlist[i].itemNumber / 1), 
        t = parseFloat(t), a += parseFloat(this.data.classlist[i].itemNumber), s++), this.data.classlist[i] && e++;
        this.data.totalCount = a, this.data.totalMoney = t, this.data.allChecked = s == e, 
        0 == this.data.classlist.length && (this.data.allChecked = !1), this.setData({
            allChecked: this.data.allChecked,
            totalMoney: this.data.totalMoney,
            totalCount: this.data.totalCount
        });
    },
    amountCalc: function() {
        var t = [], a = [], s = "", e = "";
        if (0 != this.data.classlist.length) {
            for (var i in this.data.classlist) if (console.log(this.data.classlist[i]), 1 == this.data.classlist[i].itemSelect) s = this.data.classlist[i].itemNumber, 
            e = this.data.classlist[i].goodsId, a.push(this.data.classlist[i]), t.push({
                goodsId: e,
                itemNumber: s
            }); else if (0 == this.data.totalCount) return void wx.showToast({
                title: "还没有选择商品呢"
            });
            wx.setStorageSync("carList", a), wx.navigateTo({
                url: "/pages/product/settlement/settlement"
            });
        } else wx.showToast({
            title: "还没有选择商品呢"
        });
    },
    addnum: function(t) {
        this.data.classlist[0].itemNumber;
        for (var a in this.data.classlist) {
            0;
            this.data.classlist[a].itemNumber;
            0;
        }
        this.setData({
            classlist: this.data.classlist
        });
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});