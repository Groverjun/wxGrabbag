var a = require("../../../api/api.js");

Page({
    data: {
        teamId: "",
        info: {},
        isOld: !1,
        imgHead: "",
        list: [],
        hadAuth: !1
    },
    onLoad: function(t) {
        this.setData({
            imgHead: a.urlServer.imgHead
        }), t.teamId && this.setData({
            teamId: t.teamId
        }), this.getTeam();
    },
    getTeam: function() {
        this.setData({
            hadAuth: parseInt(getApp().globalData.teamId) == parseInt(this.data.teamId)
        });
        var t = this;
        a.getTeamInfoV1({
            data: {
                teamId: this.data.teamId
            },
            success: function(a) {
                0 == a.data.status && (t.setData({
                    info: a.data.data
                }), null != a.data.data.teamDetail && t.setDetails());
            },
            fail: function(a) {
                console.log(a);
            }
        });
    },
    setDetails: function() {
        var a = this.data.info.teamDetail;
        "string" == typeof a && (a = JSON.parse(a));
        for (var t in a) if (2 == a[t].type) 40 == a[t].value.length && (a[t].value = this.data.imgHead + a[t].value); else if (4 == a[t].type) for (var e in a[t].value) 40 == a[t].value[e].length && (a[t].value[e] = this.data.imgHead + a[t].value[e]);
        this.setData({
            list: a
        });
    },
    goDetail: function() {
        var a = "/pages/my/details/index?id=" + this.data.teamId + "&page=2";
        this.data.list && wx.setStorageSync("companyDetail", JSON.stringify(this.data.list)), 
        wx.navigateTo({
            url: a
        });
    }
});