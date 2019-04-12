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
    flowList: function(e) {
        return r(e, t.ApiUrl + "/relation/flowList");
    },
    writeLog: function(e) {
        return r(e, t.ApiUrl + "/relation/writeLog");
    },
    joinTeam: function(e) {
        return r(e, t.ApiUrl + "/user/joinTeam");
    },
    getRelationDetail: function(e) {
        return r(e, t.ApiUrl + "/relation/getRelationDetail");
    },
    getFollowList: function(e) {
        return r(e, t.ApiUrl + "/relation/getFollowList");
    },
    getUserInfo: function(e) {
        return r(e, t.ApiUrl + "/user/infoUser");
    },
    modifyRelation: function(e) {
        return r(e, t.ApiUrl + "/relation/modifyRelation");
    },
    exitTeam: function(e) {
        return r(e, t.ApiUrl + "/user/exitTeam");
    },
    relaseTeam: function(e) {
        return r(e, t.ApiUrl + "/team/release");
    },
    giveThumbs: function(e) {
        return r(e, t.ApiUrl + "/user/thub");
    },
    saveUser: function(e) {
        return r(e, t.ApiUrl + "/relation/saveUser");
    },
    modifyAim: function(e) {
        return r(e, t.ApiUrl + "/team/modifyAim");
    },
    addLabels: function(e) {
        return r(e, t.ApiUrl + "/vip/addLabel");
    },
    getLabels: function(e) {
        return r(e, t.ApiUrl + "/vip/getLabels");
    },
    deleteLabel: function(e) {
        return r(e, t.ApiUrl + "/vip/deleteLabel");
    },
    modifyLabel: function(e) {
        return r(e, t.ApiUrl + "/vip/modifyLabel");
    },
    getfield: function(e) {
        return r(e, t.ApiUrl + "/vip/getfield");
    },
    modifyFild: function(e) {
        return r(e, t.ApiUrl + "/vip/modifyFild");
    },
    checkCanInvite: function(e) {
        return r(e, t.ApiUrl + "/user/checkCanInvite");
    },
    getGoodsList: function(e) {
        return r(e, t.ApiUrl + "/product/get/products");
    },
    addGoods: function(e) {
        return r(e, t.ApiUrl + "/product/add/product");
    },
    modifyGoods: function(e) {
        return r(e, t.ApiUrl + "/product/modify/product");
    },
    delGoods: function(e) {
        return r(e, t.ApiUrl + "/product/delete/product");
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
    getMessageList: function(e) {
        return r(e, t.ApiUrl + "/message/get/messages");
    },
    getCardPic: function(e) {
        return r(e, t.ApiUrl + "/common/getCardPic");
    },
    getLogs: function(e) {
        return r(e, t.ApiUrl + "/log/getLogs");
    },
    getPredict: function(e) {
        return r(e, t.ApiUrl + "/log/getPredict");
    },
    getTopLog: function(e) {
        return r(e, t.ApiUrl + "/log/getTopLog");
    },
    getPre: function(e) {
        return r(e, t.ApiUrl + "/log/getPre");
    },
    setPhoneNumber: function(e) {
        return r(e, t.ApiUrl + "/user/get/phoneNumber");
    },
    getInfoUser: function(e) {
        return r(e, t.ApiUrl + "/user/infoUser");
    },
    setFormId: function(e) {
        return r(e, t.ApiUrl + "/user/formId");
    },
    modifymostRelation: function(e) {
        return r(e, t.ApiUrl + "/team/modifymostRelation");
    },
    getWatchPic: function(e) {
        return r(e, t.ApiUrl + "/user/getWatchPic");
    },
    getMyteamInfoStatic: function(e) {
        return r(e, t.ApiUrl + "/team/getMyteamInfoStatic");
    },
    getPersonalData: function(e) {
        return r(e, t.ApiUrl + "/team/xcxgetMyInfo");
    },
    getIntelligent: function(e) {
        return r(e, t.ApiUrl + "/team/intelligentTracking");
    },
    getStaByMonth: function(e) {
        return r(e, t.ApiUrl + "/team/xcxGetStatistic");
    },
    saveCustomerCount: function(e) {
        return r(e, t.ApiUrl + "/user/savePhone");
    },
    getSpreadStatistics: function(e) {
        return r(e, t.ApiUrl + "/team/spreadStatistics");
    },
    getDynamicsList: function(e) {
        return r(e, t.ApiUrl + "/dynamics/ownerGetDynamicsList");
    },
    addDynamics: function(e) {
        return r(e, t.ApiUrl + "/dynamics/putDynamics");
    },
    delDynamics: function(e) {
        return r(e, t.ApiUrl + "/dynamics/deleteDynamicsList");
    },
    getDynamicsById: function(e) {
        return r(e, t.ApiUrl + "/dynamics/getSingleDynimic");
    },
    getGoodsTypeList: function(e) {
        return r(e, t.ApiUrl + "/trade_api/goodstype/get/typeList");
    },
    addClassify: function(e) {
        return r(e, t.ApiUrl + "/trade_api/goodstype/add/type");
    },
    modifyType: function(e) {
        return r(e, t.ApiUrl + "/trade_api/goodstype/update/type");
    },
    updateGoodsType: function(e) {
        return r(e, t.ApiUrl + "/trade_api/goodstype/update/sort");
    },
    getOrder: function(e) {
        return r(e, t.ApiUrl + "/trade_api/getOrder/company/list");
    },
    getStatistics: function(e) {
        return r(e, t.ApiUrl + "/trade_api/statistics/getOnlineStream");
    },
    getOrderById: function(e) {
        return r(e, t.ApiUrl + "/trade_api/getOrder/singgleOrder");
    },
    getTotalData: function(e) {
        return r(e, t.ApiUrl + "/trade_api/statistics/getIncomeStatisctics");
    },
    getOrderStatistics: function(e) {
        return r(e, t.ApiUrl + "/trade_api/statistics/getStatisticsOrder");
    },
    get7daysStatistics: function(e) {
        return r(e, t.ApiUrl + "/trade_api/statistics/get7daysStatistics");
    },
    getSpacialByMonthId: function(e) {
        return r(e, t.ApiUrl + "/trade_api/statistics/getSpacialByMonthId");
    },
    getOrdetCount: function(e) {
        return r(e, t.ApiUrl + "/trade_api/getOrder/usergetOrderCount");
    },
    addHS: function(e) {
        return r(e, t.ApiUrl + "/talkLibrary/addMessage");
    },
    getHS: function(e) {
        return r(e, t.ApiUrl + "/talkLibrary/getTalkLibrary");
    },
    delHS: function(e) {
        return r(e, t.ApiUrl + "/talkLibrary/deleteTalkLibrary");
    },
    editHS: function(e) {
        return r(e, t.ApiUrl + "/talkLibrary/editTalkLibrary");
    },
    modifySign: function(e) {
        return r(e, t.ApiUrl + "/team/modifySign");
    }
};