var e = require("../../../api/api.js"), t = require("../../../utils/util.js"), a = getApp().globalData, s = getApp();

Page({
    data: {
        selectIndex: 1,
        list: [],
        page: 1,
        pageSize: 10,
        custType: [],
        custLevel: [],
        custState: [],
        keyword: "",
        hasMoreData: !0,
        userTeamId: "",
        teamId: "",
        label: "",
        userId: "",
        searchText: "",
        showLogin: !1,
        totalCount: 0
    },
    onLoad: function(t) {
        this.setData({
            custType: e.customer.custType,
            custLevel: e.customer.custLevel,
            custState: e.customer.custState
        }), new s.LoginPannel(), this.judgingLogin(), this.getValidity();
    },
    judgingLogin: function() {
        wx.getStorageSync("member_info") ? (wx.getStorageSync("member_info").currentTeamId ? a.teamId = wx.getStorageSync("member_info").currentTeamId : a.teamId = wx.getStorageSync("member_info").userTeamId, 
        this.getMyInfomation()) : this.openLoginPannel(), console.log(a.teamId), console.log(this.data.teamId);
    },
    openLoginPannel: function() {
        this.loginPannel.show({
            loginBack: this.onLogin
        });
    },
    onLogin: function() {
        this.setData({
            "__lgpanel__.isHide": !0
        }), this.getMyInfomation();
    },
    onShow: function() {
        a.teamId || this.setData({
            list: []
        }), this.getUserInfo();
    },
    getMyInfomation: function() {
        var t = this;
        e.getMyInfo({
            success: function(e) {
                0 == e.data.status ? (wx.setStorageSync("member_info", e.data.data), e.data.data.currentTeamId ? a.teamId = e.data.data.currentTeamId : a.teamId = e.data.data.userTeamId, 
                t.getUserInfo(), null != e.data.data.userTeamId && null != e.data.data.vipLevel ? wx.setStorageSync("isMember", !0) : wx.setStorageSync("isMember", !1)) : wx.showToast({
                    title: e.data.message
                });
            }
        });
    },
    getUserInfo: function() {
        wx.getStorageSync("member_info") && (this.setData({
            userId: wx.getStorageSync("member_info").userId,
            userTeamId: wx.getStorageSync("member_info").userTeamId,
            teamId: getApp().globalData.teamId
        }), this.getList());
    },
    setCurrent: function(e) {
        this.setData({
            selectIndex: e.currentTarget.dataset.id,
            page: 1,
            keyword: "",
            label: "",
            searchText: ""
        }), this.getList();
    },
    getList: function() {
        if (a.teamId) {
            var s = this, o = {
                type: this.data.selectIndex,
                teamId: a.teamId,
                pageId: this.data.page,
                pageSize: this.data.pageSize
            };
            this.data.keyword && (o.key = this.data.keyword), this.data.label && (o.labelKey = this.data.label), 
            e.getCustomerList({
                data: o,
                success: function(e) {
                    if (0 == e.data.status) {
                        wx.stopPullDownRefresh();
                        var a = s.data.list, o = e.data.data.list;
                        if (s.setData({
                            totalCount: e.data.data.totalNumber
                        }), 1 == s.data.page && (a = []), o.length > 0) {
                            for (var n in o) o[n].customHeadText = o[n].customName.substring(o[n].customName.length - 2), 
                            null != o[n].customTime && (o[n].customTime = t.formatDateMMDDHM2(o[n].customTime)), 
                            null != o[n].kekeFollow.followId && (o[n].kekeFollow.followModifyTime = t.formatDateMMDDHM(o[n].kekeFollow.followModifyTime)), 
                            3 == s.data.selectIndex && 1 == o[n].shareState && (o[n].shareName = s.data.userId == o[n].userId ? "自己独占" : o[n].userName.substring(o[n].userName.length - 2) + "独占"), 
                            null != o[n].customUserLabel && (o[n].customUserLabel = JSON.parse(o[n].customUserLabel));
                            o.length < s.data.totalNumber ? s.setData({
                                list: a.concat(o),
                                hasMoreData: !1
                            }) : s.setData({
                                list: a.concat(o),
                                hasMoreData: !0
                            });
                        } else 1 == s.data.page && s.setData({
                            list: [],
                            hasMoreData: !1
                        });
                    } else -1 == e.data.status && getApp().getCode();
                }
            });
        }
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
        var e = this;
        e.setData({
            page: 1
        }), e.getList(), e.getMyInfomation();
    },
    onReachBottom: function() {
        var e = this;
        e.data.hasMoreData && (e.setData({
            page: e.data.page + 1
        }), e.getList());
    },
    addInfo: function() {
        wx.showActionSheet({
            itemList: [ "添加客户", "添加拜访记录" ],
            success: function(e) {
                if (0 == e.tapIndex) {
                    if (!a.teamId || null == a.teamId) return void wx.showModal({
                        title: "温馨提示",
                        content: "你还没有自己的团队，请先去创建哦",
                        confirmText: "去创建",
                        success: function(e) {
                            e.confirm && wx.navigateTo({
                                url: "/pages/my/company/index"
                            });
                        }
                    });
                    wx.navigateTo({
                        url: "/pages/customer/add/add"
                    });
                } else 1 == e.tapIndex && wx.navigateTo({
                    url: "/pages/customer/editRecord/editRecord?editTag=2"
                });
            },
            fail: function(e) {
                console.log(e.errMsg);
            }
        });
    },
    getHeadText: function() {
        return 1;
    },
    goSearch: function() {
        this.setData({
            searchText: ""
        }), wx.navigateTo({
            url: "/pages/customer/search/search?type=1&page=1"
        });
    },
    getValidity: function() {
        wx.getStorageSync("member_info") && null != wx.getStorageSync("member_info").vipEndTime && wx.getStorageSync("member_info").vipEndTime - new Date().getTime() <= 0 && wx.showModal({
            title: "温馨提示",
            content: "亲，配配通CRM有效期已结束啦，请联系客服人员进行开通哦!",
            showCancel: !1,
            confirmText: "立即拨打",
            success: function(e) {
                wx.makePhoneCall({
                    phoneNumber: "4006670650"
                });
            }
        });
    }
});