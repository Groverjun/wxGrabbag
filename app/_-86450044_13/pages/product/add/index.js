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
}, s = require("../../../api/api.js"), o = require("../../../utils/util.js"), i = wx.getSystemInfoSync().windowWidth;

Page((a = {
    data: {
        swiperNow: 0,
        swiperIndex: 0,
        goodsId: "",
        productName: "",
        details: "",
        imgUrls: [],
        list: [ {
            packageCostPrice: "",
            packageName: ""
        } ],
        imgHead: "",
        edit: "",
        screenheight: i,
        editImg: !1,
        productCount: "",
        productPrice: "",
        transportAmount: "",
        teamId: "",
        className: "",
        isHideClass: !0,
        isHideAdd: !0,
        canBuy: !1,
        typeId: "",
        items: [],
        typeName: "",
        supportBuy: 0
    },
    onLoad: function(t) {
        this.data.isInit = !1, wx.removeStorageSync("goodsDetails"), this.setData({
            imgHead: s.urlServer.imgHead,
            teamId: getApp().globalData.teamId
        }), t.supportBuy && this.setData({
            supportBuy: t.supportBuy
        }), this.data.teamId || this.setData({
            teamId: wx.getStorageSync("member_info").currentTeamId
        }), this.getList();
        var a = t.avatar;
        if (a && (this.getNowPageStore(), this.getStorageImg(), this.data.imgUrls.push(a), 
        this.setData({
            imgUrls: this.data.imgUrls,
            editImg: !0
        }), this.setStorageImg()), t.id && t.edit) return this.setData({
            goodsId: t.id
        }), this.getNowPageStore(), this.getStorageImg(), void this.getDetails();
        t.id && (this.setData({
            goodsId: t.id
        }), this.getGoodsInfo()), t.edit && (this.getNowPageStore(), this.getStorageImg(), 
        this.getDetails());
    },
    onShow: function() {
        this.data.edit && (this.getNowPageStore(), this.getStorageImg(), this.getDetails());
    },
    getGoodsInfo: function() {
        var t = this;
        s.getGoodsList({
            data: {
                productId: this.data.goodsId,
                teamId: this.data.teamId
            },
            success: function(a) {
                if (0 == a.data.status) {
                    var e = a.data.data[0];
                    if (t.setData({
                        productName: e.productName,
                        productPrice: e.productPrice / 100,
                        productCount: e.productCount,
                        canBuy: 1 == e.canBuy
                    }), 0 != e.transportAmount && t.setData({
                        transportAmount: e.transportAmount / 100
                    }), null != e.typeId && t.setData({
                        typeId: e.typeId
                    }), t.data.editImg) t.getStorageImg(); else if (null != e.productPic) {
                        var s = e.productPic.split(",");
                        for (var o in s) t.data.imgUrls.push(t.data.imgHead + s[o]);
                    }
                    t.setData({
                        imgUrls: t.data.imgUrls
                    }), null != e.productDetail && t.setData({
                        details: e.productDetail
                    });
                } else wx.showToast({
                    title: a.message
                });
            }
        });
    },
    getList: function() {
        var t = this;
        s.getGoodsTypeList({
            data: {
                teamId: this.data.teamId
            },
            success: function(a) {
                if (0 == a.data.status) {
                    for (var e = a.data.data, s = [], o = "", i = 0; i < e.length; i++) o = {
                        id: e[i].typeId,
                        value: e[i].typeName,
                        color: "red",
                        checked: !1
                    }, t.data.typeId == e[i].typeId && (o.checked = !0, t.setData({
                        typeName: e[i].typeName
                    })), s.push(o);
                    t.setData({
                        items: s
                    });
                } else wx.showToast({
                    title: a.data.message
                });
            }
        });
    },
    getDetails: function() {
        wx.getStorageSync("goodsDetails") && this.setData({
            details: wx.getStorageSync("goodsDetails")
        });
    },
    getStorageImg: function() {
        wx.getStorageSync("imgUrls") && this.setData({
            imgUrls: wx.getStorageSync("imgUrls")
        });
    },
    setStorageImg: function() {
        wx.setStorageSync("imgUrls", this.data.imgUrls), console.log(this.data.imgUrls);
    },
    swiperChange: function(t) {
        this.setData({
            swiperIndex: t.detail.current,
            swiperNow: t.detail.current
        });
    },
    delLogo: function(t) {
        var a = this.data.swiperIndex;
        this.data.imgUrls.splice(a, 1), 0 != a && this.setData({
            swiperIndex: parseInt(a) - 1
        }), this.setData({
            imgUrls: this.data.imgUrls
        }), this.setStorageImg();
    },
    chooseLogo: function() {
        var t = this;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(a) {
                var e = a.tempFilePaths[0];
                t.setNowPageStore(), t.setStorageImg(), t.data.goodsId ? wx.navigateTo({
                    url: "/pages/upload/upload?src=" + e + "&type=2&goodsId=" + t.data.goodsId + "&supportBuy=" + t.data.supportBuy
                }) : wx.navigateTo({
                    url: "/pages/upload/upload?src=" + e + "&type=2&supportBuy=" + t.data.supportBuy
                });
            }
        });
    },
    goDetailsPage: function() {
        this.setNowPageStore(), this.setStorageImg(), this.data.goodsId ? (wx.navigateTo({
            url: "/pages/product/details/index?id=" + this.data.goodsId
        }), wx.setStorageSync("editDetails", this.data.details)) : wx.navigateTo({
            url: "/pages/product/details/index"
        });
    },
    setNowPageStore: function() {
        var t = this.data, a = {
            productName: t.productName,
            productPrice: t.productPrice,
            productCount: t.productCount,
            transportAmount: t.transportAmount,
            typeId: t.typeId,
            typeName: t.typeName,
            details: t.details,
            canBuy: t.canBuy
        };
        wx.setStorageSync("addGoods", a);
    }
}, t(a, "swiperChange", function(t) {
    this.setData({
        swiperIndex: t.detail.current
    });
}), t(a, "getNowPageStore", function() {
    if (wx.getStorageSync("addGoods")) {
        var t = wx.getStorageSync("addGoods");
        this.setData({
            productName: t.productName,
            productPrice: t.productPrice,
            productCount: t.productCount,
            transportAmount: t.transportAmount,
            typeId: t.typeId,
            typeName: t.typeName,
            details: t.details,
            canBuy: t.canBuy
        });
    }
}), t(a, "inputGoodsName", function(t) {
    t.detail.value && this.setData({
        productName: t.detail.value
    });
}), t(a, "changeCount", function(t) {
    var a = t.detail.value;
    this.setData({
        productCount: a
    });
}), t(a, "changePrice", function(t) {
    var a = t.detail.value;
    this.setData({
        productPrice: a
    });
}), t(a, "changeAmount", function(t) {
    var a = t.detail.value;
    this.setData({
        transportAmount: a
    });
}), t(a, "formSubmit", function(t) {
    var a = t.detail.value;
    return this.data.imgUrls.length <= 0 ? (wx.showToast({
        title: "请选择商品图片"
    }), !1) : a.productName.length <= 0 ? (wx.showToast({
        title: "请输入商品名称"
    }), !1) : a.productPrice.length <= 0 ? (wx.showToast({
        title: "请输入商品价格"
    }), !1) : void this.goAddGoods();
}), t(a, "error", function(t) {
    var a = "";
    switch (t) {
      case "packageCostPrice":
        a = "价格有误";
        break;

      case "packageName":
        a = "型号为空";
    }
    wx.showToast({
        title: a
    });
}), t(a, "checkpackageCostPrice", function(t) {
    return !!(t > 0 && o.isNum(t)) || t > 0;
}), t(a, "checkpackageName", function(t) {
    return 1 == this.data.list.length && 0 == this.data.hasStock || !(t.length <= 0);
}), t(a, "goAddGoods", function(t, a, e) {
    this.data;
    var s = {
        productName: this.data.productName,
        productPrice: 100 * this.data.productPrice
    };
    this.data.productCount && (s.productCount = this.data.productCount), s.canBuy = this.data.canBuy ? 1 : 0, 
    this.data.typeId ? (s.typeId = parseInt(this.data.typeId), this.data.transportAmount && (s.transportAmount = 100 * this.data.transportAmount), 
    this.setSaveData(s)) : wx.showToast({
        title: "请选择商品分类"
    });
}), t(a, "uploadImg", function(t, a, e) {
    var o = this, i = t[0];
    if (t.length) return i.indexOf("/img/") > -1 ? (t.shift(), a.push(i), void o.uploadImg(t, a, e)) : void wx.uploadFile({
        url: s.urlServer.ApiUrl + "/file/upload",
        filePath: i,
        name: "file",
        success: function(s) {
            var i = JSON.parse(s.data);
            console.log(i), a.push(i.data.list[0].filePath), t.shift(), o.uploadImg(t, a, e);
        }
    });
    e(a);
}), t(a, "setDetail", function(t, a, e) {
    var o = this, i = t[0];
    return t.length ? "2" != i.type || "2" == i.type && (40 == i.value.length || i.value.indexOf("/img/") > -1) ? (i.value.indexOf("/img/") > -1 ? (i.value = i.value.substr(i.value.indexOf("/img/") + 5), 
    a.push(i)) : a.push(i), t.shift(), o.setDetail(t, a, e), !1) : void wx.uploadFile({
        url: s.urlServer.ApiUrl + "/file/upload",
        filePath: i.value,
        name: "file",
        success: function(s) {
            var d = JSON.parse(s.data);
            i.value = d.data.list[0].filePath, a.push(i), t.shift(), o.setDetail(t, a, e);
        }
    }) : (e(a), !1);
}), t(a, "setSaveData", function(t) {
    var a = this, s = a.data.imgUrls, o = [];
    wx.showLoading({
        title: "图片上传中...",
        mask: !0
    }), a.uploadImg(s, o, function(s) {
        var o = s;
        for (var i in o) o[i].length > 40 && (o[i] = o[i].substr(o[i].lastIndexOf("/") + 1));
        var d = a.data.details;
        d ? "object" != (void 0 === d ? "undefined" : e(d)) && (d = JSON.parse(d)) : d = [];
        var r = [];
        a.setDetail(d, r, function(e) {
            if (wx.hideLoading(), o.length > 0) {
                var s = o;
                t.productPic = s.join(",");
            }
            0 != e.length && (t.productDetail = e, a.setData({
                details: e
            })), wx.showLoading({
                title: "商品信息保存中...",
                mask: !0
            }), a.data.goodsId ? (t.productId = a.data.goodsId, a.data.productCount && (t.productCount = a.data.productCount), 
            a.modifyGoods(t)) : a.saveGoods(t);
        });
    });
}), t(a, "saveGoods", function(t) {
    s.addGoods({
        method: "post",
        data: t,
        success: function(t) {
            0 == t.data.status ? (wx.showToast({
                title: "添加成功"
            }), wx.removeStorageSync("imgUrls"), wx.removeStorageSync("addGoods"), wx.removeStorageSync("goodsDetails"), 
            wx.removeStorageSync("editDetails"), wx.redirectTo({
                url: "/pages/product/list/list"
            })) : wx.showToast({
                title: t.data.message
            });
        }
    });
}), t(a, "modifyGoods", function(t) {
    s.modifyGoods({
        method: "post",
        data: t,
        success: function(t) {
            0 == t.data.status ? (wx.showToast({
                title: "修改成功"
            }), wx.removeStorageSync("imgUrls"), wx.removeStorageSync("addGoods"), wx.removeStorageSync("goodsDetails"), 
            wx.removeStorageSync("editDetails"), wx.redirectTo({
                url: "/pages/product/list/list"
            })) : wx.showToast({
                title: t.data.message
            });
        }
    });
}), t(a, "switchClass", function(t) {
    var a = t.currentTarget.dataset.type;
    a = 1 == t.currentTarget.dataset.type, this.setData({
        isHideClass: a
    });
}), t(a, "switchAdd", function() {
    this.setData({
        isHideAdd: !0,
        isHideClass: !1
    });
}), t(a, "switchBox", function() {
    this.setData({
        isHideClass: !0,
        isHideAdd: !1,
        className: ""
    });
}), t(a, "hideBox", function() {
    this.setData({
        isHideClass: !0,
        isHideAdd: !0
    });
}), t(a, "radioChange", function(t) {
    var a = t.detail.value.split("#");
    this.setData({
        typeId: a[0],
        typeName: a[1]
    });
}), t(a, "inputName", function(t) {
    t.detail.value && this.setData({
        className: t.detail.value
    });
}), t(a, "addClassify", function() {
    var t = this;
    t.data.className.length >= 2 && t.data.className.length <= 6 ? s.addClassify({
        method: "post",
        data: {
            teamId: this.data.teamId,
            typeName: this.data.className
        },
        success: function(a) {
            0 == a.data.status ? (t.getList(), t.setData({
                className: "",
                isHideClass: !1,
                isHideAdd: !0
            })) : wx.showToast({
                title: a.data.message
            });
        }
    }) : wx.showToast({
        title: "分类名有误"
    });
}), t(a, "changeSupportBuy", function(t) {
    this.setData({
        canBuy: !this.data.canBuy
    });
}), a));