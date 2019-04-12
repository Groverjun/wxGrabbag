var t = wx.getRecorderManager(), a = wx.createInnerAudioContext(), e = "", o = {
    duration: 6e4,
    sampleRate: 44100,
    numberOfChannels: 1,
    encodeBitRate: 192e3,
    format: "mp3",
    frameSize: 50
}, n = require("../../../api/api.js");

Page({
    data: {
        isStart: !0,
        text: "",
        isSpeaking: !1,
        timer: "",
        count: 0,
        voice: ""
    },
    onLoad: function(o) {
        this.getInfo();
        var n = this;
        a.onPlay(function() {
            console.log("录音播放中");
        }), a.onStop(function() {
            console.log("录音播放停止");
        }), t.onStart(function() {
            console.log("recorder start");
        }), t.onPause(function() {
            console.log("recorder pause");
        }), t.onStop(function(t) {
            console.log("recorder stop"), console.log(t.tempFilePath), e = t.tempFilePath, n.saveIntroduction();
        }), t.onFrameRecorded(function(t) {
            var a = t.frameBuffer;
            console.log("frameBuffer.byteLength", a.byteLength);
        });
    },
    getInfo: function() {
        var t = this;
        n.getMyInfo({
            success: function(e) {
                if (0 == e.data.status && "" != e.data.data.summary && null != e.data.data.summary) {
                    var o = JSON.parse(e.data.data.summary);
                    t.setData({
                        text: o.text,
                        voice: n.urlServer.voiceUrl + o.mp3
                    }), a.src = t.data.voice;
                }
            }
        });
    },
    inputText: function(t) {
        this.setData({
            text: t.detail.value
        });
    },
    startTalk: function() {
        var a = this;
        this.setData({
            isSpeaking: !0,
            isStart: !1,
            count: 0
        }), this.data.timer = setInterval(function() {
            var t = ++a.data.count;
            a.setData({
                count: t
            });
        }, 1e3), this.setData({
            timer: this.data.timer
        }), t.start(o);
    },
    stopTalk: function() {
        this.setData({
            isSpeaking: !1
        }), t.stop(), console.log(e), console.log("停止"), clearInterval(this.data.timer);
    },
    saveIntroduction: function() {
        var t = this;
        this.data.count > 0 && wx.uploadFile({
            url: n.urlServer.ApiUrl + "/file/upload",
            filePath: e,
            name: "file",
            success: function(e) {
                var o = JSON.parse(e.data);
                a.src = n.urlServer.voiceUrl + o.data.list[0].filePath, t.setData({
                    voice: o.data.list[0].filePath
                });
            }
        });
    },
    modifyInfo: function(t) {
        var a = {}, e = this.data.voice;
        if (e ? (e.indexOf("/mp3/") > 0 && (e = e.substr(e.indexOf("/mp3/") + 5)), a = this.data.text ? {
            text: this.data.text,
            mp3: e,
            count: this.data.count
        } : {
            text: "",
            mp3: e,
            count: this.data.count
        }) : this.data.text && (a = {
            text: this.data.text,
            mp3: ""
        }), !a) return wx.showToast({
            title: "无修改"
        }), !1;
        console.log(a), n.modifyMyInfo({
            method: "post",
            data: {
                summary: JSON.stringify(a)
            },
            success: function(t) {
                0 == t.data.status ? (wx.showToast({
                    title: "修改成功"
                }), wx.navigateBack()) : wx.showToast({
                    title: t.data.message
                });
            }
        });
    },
    audioPlay: function() {
        a.src && a.play();
    },
    onShareAppMessage: function() {}
});