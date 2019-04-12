var t = require("../../../api/api.js"), e = require("../../../utils/util.js");

Page({
    data: {
        relationId: 0,
        followList: {},
        userName: "",
        userConpany: "",
        userLabel: 0,
        custType: [],
        custLevel: [],
        custState: [],
        customHead: ""
    },
    onLoad: function(e) {
        console.log(e.relationId), this.setData({
            custType: t.customer.custType,
            custLevel: t.customer.custLevel,
            custState: t.customer.custState,
            relationId: e.relationId,
            userName: e.customName,
            customHead: e.customHead,
            userConpany: e.customCompany,
            userLabel: e.customLabel
        }), this.getFollowList();
    },
    getFollowList: function() {
        var a = this, s = {
            relationId: a.data.relationId
        };
        t.getFollowList({
            data: s,
            success: function(t) {
                if (0 == t.data.status) {
                    for (var s = t.data.data, o = 0; o < s.length; o++) s[o].followModifyTime = e.formatDateMMDDHM(s[o].followModifyTime);
                    a.setData({
                        followList: s
                    });
                } else wx.showToast({
                    title: t.data.message
                });
            }
        });
    },
    editNote: function() {
        wx.navigateTo({
            url: "/pages/customer/editRecord/editRecord?relationId=" + this.data.relationId + "&customLabel=" + this.data.userLabel + "&customCompany=" + this.data.userConpany + "&customName=" + this.data.userName + "&editTag=1"
        });
    }
});