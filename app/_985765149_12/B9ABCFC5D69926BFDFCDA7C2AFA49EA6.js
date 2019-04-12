var t = {
    ApiUrl: "https://ppt.yongsystem.cn/api",
    imgHead: "https://ppt.yongsystem.cn/img/"
};

module.exports = {
    formatDateYYYYMMDD: function(t) {
        var e = new Date(t);
        return e.getFullYear() + "-" + (e.getMonth() + 1) + "-" + e.getDate();
    },
    formatDateMMDDHM: function(t) {
        var e = new Date(t), n = e.getMonth() + 1, a = e.getDate(), o = e.getHours(), r = e.getMinutes();
        return 1 == r.toString().length && (r = "0" + r), n + "/" + a + " " + o + ":" + r;
    },
    formatDateMMDDHM2: function(t) {
        var e = new Date(t), n = "", a = e.getMonth() + 1, o = e.getDate(), r = e.getHours(), s = e.getMinutes();
        return 1 == s.toString().length && (s = "0" + s), e.toDateString() == new Date().toDateString() ? n = "-1" : o - new Date().getDate() == -1 ? n = "昨天" : o - new Date().getDate() == -2 && (n = "前天"), 
        "-1" == n ? r + ":" + s : n ? n + " " + r + ":" + s : n + " " + a + "-" + o + " " + r + ":" + s;
    },
    formatDateYYYYMMDDMMDDHM: function(t) {
        var e = new Date(t), n = e.getFullYear(), a = e.getMonth() + 1, o = e.getDate(), r = e.getHours(), s = e.getMinutes();
        return 1 == s.toString().length && (s = "0" + s), n + "-" + a + "-" + o + " " + r + ":" + s;
    },
    formatDateHM: function(t) {
        var e = new Date(t), n = e.getHours(), a = e.getMinutes();
        return 1 == a.toString().length && (a = "0" + a), n + ":" + a;
    },
    isPhone: function(t) {
        return /^1\d{10}$/.test(t);
    },
    isCode: function(t) {
        return /^\d{6}$/.test(t);
    },
    isPassword: function(t) {
        return /^[\w]{6,13}$/.test(t);
    },
    showToast: function(t) {
        wx.showToast({
            title: t
        });
    },
    isNum: function(t) {
        return !isNaN(t);
    },
    formatDate: function(t) {
        var e = new Date(t);
        return e.getFullYear() + "-" + (e.getMonth() + 1) + "-" + e.getDate() + " " + e.getHours() + ":" + e.getMinutes();
    },
    uploadHead: function(e, n) {
        wx.uploadFile({
            url: t.ApiUrl + "/file/upload",
            filePath: e,
            name: "file",
            success: function(t) {
                var e = JSON.parse(t.data);
                console.log(e), n(e.data.list);
            }
        });
    },
    doTrim: function(t, e) {
        var n;
        return n = t.replace(/(^\s+)|(\s+$)/g, ""), "g" == e.toLowerCase() && (n = n.replace(/\s/g, "")), 
        n;
    },
    callPhone: function(t) {
        t && wx.makePhoneCall({
            phoneNumber: t
        });
    },
    copyStr: function(t) {
        t && wx.setClipboardData({
            data: t,
            success: function(t) {
                wx.getClipboardData({
                    success: function(t) {
                        wx.showToast({
                            title: "复制成功"
                        });
                    }
                });
            }
        });
    },
    contantUs: function() {
        wx.showActionSheet({
            itemList: [ "复制加微信", "立即拨打" ],
            success: function(t) {
                0 == t.tapIndex ? wx.setClipboardData({
                    data: "17318989819",
                    success: function(t) {
                        wx.showToast({
                            title: "已复制"
                        });
                    }
                }) : 1 == t.tapIndex && wx.makePhoneCall({
                    phoneNumber: "17318989819"
                });
            },
            fail: function(t) {
                console.log(t.errMsg);
            }
        });
    },
    timeAgo: function(t) {
        var e = "", n = new Date().getTime() - t;
        if (!(n < 0)) {
            var a = n / 6e4, o = n / 36e5, r = n / 864e5, s = n / 6048e5, i = n / 2592e6;
            if (i >= 1 && i <= 3) e = " " + parseInt(i) + "月前"; else if (s >= 1 && s <= 3) e = " " + parseInt(s) + "周前"; else if (r >= 1 && r <= 6) e = " " + parseInt(r) + "天前"; else if (o >= 1 && o <= 24) e = " " + parseInt(o) + "小时前"; else if (a >= 1 && a <= 59) e = " " + parseInt(a) + "分钟前"; else if (n >= 0 && n <= 6e4) e = "刚刚"; else {
                var u = new Date();
                u.setTime(t);
                var g = u.getFullYear(), l = u.getMonth() + 1 < 10 ? "0" + (u.getMonth() + 1) : u.getMonth() + 1, c = u.getDate() < 10 ? "0" + u.getDate() : u.getDate();
                u.getHours(), u.getHours(), u.getMinutes(), u.getMinutes(), u.getSeconds(), u.getSeconds(), 
                e = g + "-" + l + "-" + c;
            }
            return e;
        }
    }
};