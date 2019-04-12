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
        return 1 == a.toString().length && (a = "0" + a), 1 == o.toString().length && (o = "0" + o), 
        1 == s.toString().length && (s = "0" + s), e.toDateString() == new Date().toDateString() ? n = "-1" : o - new Date().getDate() == -1 ? n = "昨天" : o - new Date().getDate() == -2 && (n = "前天"), 
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
                    data: "18515667629",
                    success: function(t) {
                        wx.showToast({
                            title: "已复制"
                        });
                    }
                }) : 1 == t.tapIndex && wx.makePhoneCall({
                    phoneNumber: "18515667629"
                });
            },
            fail: function(t) {
                console.log(t.errMsg);
            }
        });
    },
    setHeadImg: function(e) {
        return e ? -1 == e.indexOf("qlogo") ? t.imgHead + e : e : "../../../images/ic_head.png";
    },
    timeAgo: function(t) {
        var e = new Date().getTime();
        console.log(e);
        var n = "", a = e - t;
        if (!(a < 0)) {
            var o = a / 6e4, r = a / 36e5, s = a / 864e5, i = a / 6048e5, g = a / 2592e6;
            if (g >= 1 && g <= 3) n = " " + parseInt(g) + "月前"; else if (i >= 1 && i <= 3) n = " " + parseInt(i) + "周前"; else if (s >= 1 && s <= 6) n = " " + parseInt(s) + "天前"; else if (r >= 1 && r <= 24) n = " " + parseInt(r) + "小时前"; else if (o >= 1 && o <= 59) n = " " + parseInt(o) + "分钟前"; else if (a >= 0 && a <= 6e4) n = "刚刚"; else {
                var u = new Date();
                u.setTime(t);
                var l = u.getFullYear(), c = u.getMonth() + 1 < 10 ? "0" + (u.getMonth() + 1) : u.getMonth() + 1, f = u.getDate() < 10 ? "0" + u.getDate() : u.getDate();
                u.getHours(), u.getHours(), u.getMinutes(), u.getMinutes(), u.getSeconds(), u.getSeconds(), 
                n = l + "-" + c + "-" + f;
            }
            return n;
        }
    }
};