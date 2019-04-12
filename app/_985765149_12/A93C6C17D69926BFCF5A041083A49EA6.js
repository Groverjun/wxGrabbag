var t = {
    ApiUrl: "https://ppt.yongsystem.cn/api",
    imgHead: "https://ppt.yongsystem.cn/img/",
    voiceUrl: "https://ppt.yongsystem.cn/mp3/"
}, e = {
    custType: [ "小客户", "大客户", "经销商" ],
    custLevel: [ "一般", "重要", "核心" ],
    custState: [ "潜在", "意向", "洽谈", "成交", "流失" ]
}, r = function(t, e) {
    (t.isshow || !1) && wx.showToast({
        title: "加载中...",
        icon: "loading",
        mask: !0
    }), wx.request({
        url: e,
        method: t.method || "GET",
        data: t.data || {},
        header: {
            "Content-Type": "application/json",
            token: wx.getStorageSync("token")
        },
        success: function(e) {
            t.success && t.success(e);
        },
        fail: function(e) {
            t.fail && t.fail(e);
        },
        complete: function(e) {
            t.complete && t.complete(e);
        }
    });
}, n = function(t, e) {
    (t.isshow || !1) && wx.showToast({
        title: "加载中...",
        icon: "loading",
        mask: !0
    }), wx.request({
        url: e,
        method: t.method || "GET",
        data: t.data || {},
        header: {
            "Content-Type": "application/json"
        },
        success: function(e) {
            t.success && t.success(e);
        },
        fail: function(e) {
            t.fail && t.fail(e);
        },
        complete: function(e) {
            t.complete && t.complete(e);
        }
    });
};

module.exports = {
    urlServer: t,
    customer: e,
    wxRequest: r,
    testToken: function(e) {
        return n(e, t.ApiUrl + "/test/token");
    },
    loginUser: function(e) {
        return n(e, t.ApiUrl + "/user/login/wechat");
    },
    getMyInfo: function(e) {
        return r(e, t.ApiUrl + "/user/getMyinfo");
    },
    modifyMyInfo: function(e) {
        return r(e, t.ApiUrl + "/user/modifyMyInfo");
    },
    creatTeam: function(e) {
        return r(e, t.ApiUrl + "/team/creatTeam");
    },
    getTeamType: function(e) {
        return r(e, t.ApiUrl + "/team/getTeamType");
    },
    modifyTeam: function(e) {
        return r(e, t.ApiUrl + "/team/modifyTeam");
    },
    getCustomerList: function(e) {
        return r(e, t.ApiUrl + "/relation/getRelationShipList");
    },
    addCustomer: function(e) {
        return r(e, t.ApiUrl + "/relation/addRelationship");
    },
    getTeamList: function(e) {
        return r(e, t.ApiUrl + "/team/getTeamList");
    },
    getTeamInfo: function(e) {
        return r(e, t.ApiUrl + "/team/getTeamInfo");
    },
    getTeamInfoV1: function(e) {
        return r(e, t.ApiUrl + "/team/getTeamInfoV1");
    },
    getMyTeamInfo: function(e) {
        return r(e, t.ApiUrl + "/team/getMyTeamInfo");
    },
    giveThumbs: function(e) {
        return r(e, t.ApiUrl + "/user/thub");
    },
    getCardList: function(e) {
        return r(e, t.ApiUrl + "/user/cardList");
    },
    getInfoUser: function(e) {
        return r(e, t.ApiUrl + "/user/infoUser");
    },
    getGoodsList: function(e) {
        return r(e, t.ApiUrl + "/product/get/products");
    },
    addCard: function(e) {
        return r(e, t.ApiUrl + "/user/addCard");
    },
    getMessage: function(e) {
        return r(e, t.ApiUrl + "/message/getChanel/messages");
    },
    sendMessage: function(e) {
        return r(e, t.ApiUrl + "/message/put/message");
    },
    setPhoneNumber: function(e) {
        return r(e, t.ApiUrl + "/user/get/phoneNumber");
    },
    setFormId: function(e) {
        return r(e, t.ApiUrl + "/user/formId");
    },
    addLog: function(e) {
        return r(e, t.ApiUrl + "/log/addLog");
    },
    getWatchPic: function(e) {
        return r(e, t.ApiUrl + "/user/getWatchPic");
    },
    getDynamicsList: function(e) {
        return r(e, t.ApiUrl + "/dynamics/lookerGetDynamicsList");
    },
    goThumbUp: function(e) {
        return r(e, t.ApiUrl + "/dynamics/thumbUp");
    },
    goCancelThumbUp: function(e) {
        return r(e, t.ApiUrl + "/dynamics/cancelThumbUp");
    },
    addComment: function(e) {
        return r(e, t.ApiUrl + "/dynamics/addComment");
    },
    getDynamicsById: function(e) {
        return r(e, t.ApiUrl + "/dynamics/getSingleDynimic");
    },
    getGoodsTypeList: function(e) {
        return r(e, t.ApiUrl + "/trade_api/goodstype/get/typeList");
    },
    deltGoods: function(e) {
        return r(e, t.ApiUrl + "/trade_api/cart/shopCart/delGoods/");
    },
    getCar: function(e) {
        return r(e, t.ApiUrl + "/trade_api/cart/getMyCart");
    },
    addCar: function(e) {
        return r(e, t.ApiUrl + "/trade_api/cart/addcart");
    },
    emtCar: function(e) {
        return r(e, t.ApiUrl + "/trade_api/cart/shopCart/delAllGoods");
    },
    editCar: function(e) {
        return r(e, t.ApiUrl + "/trade_api/cart/shopCart/modifyCart");
    },
    amountCalc: function(e) {
        return r(e, t.ApiUrl + "/trade_api/order/amountCalc");
    },
    addOrder: function(e) {
        return r(e, t.ApiUrl + "/trade_api/order/add");
    },
    payOrder: function(e) {
        return r(e, t.ApiUrl + "/trade_api/order/pay/h5");
    },
    getAddrList: function(e) {
        return r(e, t.ApiUrl + "/trade_api/address/list");
    },
    mofifyAddr: function(e) {
        return r(e, t.ApiUrl + "/trade_api/address/modify");
    },
    getOrderList: function(e) {
        return r(e, t.ApiUrl + "/trade_api/getOrder/user/list");
    },
    getOrderCount: function(e) {
        return r(e, t.ApiUrl + "/trade_api/getOrder/usergetOrderCount");
    },
    getcartNumber: function(e) {
        return r(e, t.ApiUrl + "/trade_api/cart/getMyCartGoodsNumber");
    }
};