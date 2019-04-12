var t = require("../../../A93C6C17D69926BFCF5A041083A49EA6.js");

require("../../../B9ABCFC5D69926BFDFCDA7C2AFA49EA6.js");

Page({
    data: {
        sellerId: "",
        teamId: "",
        userInfo: "",
        userName: "",
        userPhone: "",
        storeId: "",
        storeIdNumber: "",
        storeInfo: {},
        carList: [],
        addressInfo: "",
        distance: 0,
        multiIndex: [ 0, 0, 0 ],
        timeVal: "无",
        imgHead: "",
        totalMoney: 0,
        totalCount: 0,
        costAmount: 0,
        orderTotalAmount: 0,
        freightAmount: 0,
        money: 0,
        vipRemain: "",
        disabled: !0,
        orderId: 0,
        orderMark: "",
        addEdit: !1,
        isDisabled: !1,
        currentWay: 0,
        phone: "",
        goodsList: [],
        orderNum: "",
        freight: 0,
        address: "",
        teamIcon: "",
        teamName: "",
        userIn: "",
        prevpage: "",
        addrIndex: "",
        endMoney: ""
    },
    onLoad: function(a) {
        this.setData({
            imgHead: t.urlServer.imgHead
        }), a.edit ? this.setData({
            addEdit: a.edit
        }) : a.touchId && this.setData({
            touchId: a.touchId
        });
        var e = getCurrentPages(), s = e[e.length - 2].route;
        this.setData({
            prevpage: s
        }), this.setData({
            teamName: wx.getStorageSync("member_info").teamName,
            sellerId: wx.getStorageSync("cardId"),
            teamId: wx.getStorageSync("teamId"),
            goodsList: wx.getStorageSync("goodsList"),
            carList: wx.getStorageSync("carList"),
            teamIcon: wx.getStorageSync("teamIcon"),
            addrIndex: wx.getStorageSync("addrIndex")
        }), this.getList(), this.setTotalInfo(), this.amountCalc();
    },
    onShow: function() {
        this.setData({
            addrIndex: wx.getStorageSync("addrIndex")
        }), this.getList();
    },
    setTotalInfo: function() {
        var t = 0, a = 0;
        for (var e in this.data.carList) 1 == this.data.carList[e].itemSelect && (t += parseFloat(this.data.carList[e].kekeProduct.productPrice / 100) * parseFloat(this.data.carList[e].itemNumber / 1), 
        a += parseFloat(this.data.carList[e].itemNumber), 0), this.data.carList[e] && 0;
        0 == this.data.carList.length && (t = 1 * parseFloat(this.data.goodsList[0].productPrice / 100), 
        a = 1), this.data.totalCount = a, this.data.totalMoney = t, this.setData({
            totalMoney: this.data.totalMoney,
            totalCount: this.data.totalCount
        });
    },
    submitOrder: function(a) {
        a.currentTarget.dataset.type;
        var e = this;
        if (!this.data.address) return wx.showToast({
            title: "请先选择地址"
        }), !1;
        var s = [], d = {};
        for (var i in this.data.goodsList) d = {
            goodsId: this.data.goodsList[i].goodsId,
            itemNumber: this.data.goodsList[i].itemNumber
        }, s.push(d);
        0 == this.data.goodsList.length && (d = {
            goodsId: this.data.goodsList[0].productId,
            itemNumber: 1
        }, s.push(d)), t.addOrder({
            method: "post",
            data: {
                list: s,
                sellerId: this.data.sellerId,
                teamId: this.data.teamId,
                userAddrese: this.data.address,
                userName: this.data.userName,
                userPhone: this.data.userPhone
            },
            success: function(t) {
                0 == t.data.status && (e.setData({
                    orderNum: t.data.data
                }), e.goPay());
            }
        });
    },
    getList: function() {
        wx.showLoading({
            title: "加载中..."
        });
        var a = this, e = [], s = this.data.addrIndex;
        t.getAddrList({
            success: function(t) {
                if (0 == t.data.status && t.data.data.length > 0) if (e = t.data.data, "" != s) a.setData({
                    address: e[s].addressProvince + " " + e[s].addressCity + " " + e[s].addressCounty + " " + e[s].addressDetailed,
                    userName: e[s].addressName,
                    userPhone: e[s].addressPhone,
                    userInfo: e[s]
                }); else for (var d in e) 1 == e[d].addressDefalut && a.setData({
                    address: e[d].addressProvince + " " + e[d].addressCity + " " + e[d].addressCounty + " " + e[d].addressDetailed,
                    userName: e[d].addressName,
                    userPhone: e[d].addressPhone,
                    userInfo: e[d]
                });
                wx.hideLoading();
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    goPay: function() {
        wx.showLoading({
            title: "支付中"
        }), t.wxRequest({
            success: function(t) {
                if (0 == t.data.status) {
                    var a = t.data.data;
                    wx.requestPayment({
                        timeStamp: a.timeStamp,
                        nonceStr: a.nonceStr,
                        package: a._package,
                        signType: a.signType,
                        paySign: a.paySign,
                        success: function(t) {
                            wx.hideLoading(), wx.showToast({
                                title: "支付成功"
                            }), wx.navigateTo({
                                url: "/pages/product/orderlist/orderlist"
                            });
                        },
                        fail: function(t) {
                            wx.hideLoading(), wx.showToast({
                                title: "支付失败"
                            });
                        }
                    });
                } else wx.showToast({
                    title: t.data.message
                });
            }
        }, t.urlServer.ApiUrl + "/trade_api/order/pay/h5?orderId=" + this.data.orderNum);
    },
    confirmAddr: function() {
        wx.navigateTo({
            url: "/pages/product/addresslist/addresslist"
        });
    },
    amountCalc: function() {
        var a = this, e = [], s = "", d = this.data.totalMoney, i = "";
        if (0 == this.data.goodsList.length) for (var o in this.data.carList) e.push({
            goodsId: this.data.carList[o].goodsId,
            itemNumber: this.data.carList[o].itemNumber
        }); else 0 == this.data.carList.length && e.push({
            goodsId: this.data.goodsList[0].productId,
            itemNumber: 1
        });
        t.amountCalc({
            method: "post",
            data: {
                list: e,
                teamId: this.data.teamId
            },
            success: function(t) {
                if (0 == t.data.status) {
                    var e = t.data.data.list;
                    for (var o in e) 0 != e[o].frightPrice && (s += parseFloat(e[o].frightPrice / 100)), 
                    e[o].goodsPic = e[o].goodsPic.split(",");
                    i = 0 == s ? parseFloat(d) : parseFloat(d) + parseFloat(s), i = i.toFixed(2), a.setData({
                        goodsList: e,
                        freight: s,
                        endMoney: i
                    });
                }
            }
        });
    }
});