var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

!function(e, n) {
    "object" === ("undefined" == typeof exports ? "undefined" : t(exports)) && "undefined" != typeof module ? module.exports = n() : "function" == typeof define && define.amd ? define(n) : e.moment = n();
}(void 0, function() {
    function e() {
        return te.apply(null, arguments);
    }
    function n(t) {
        return "[object Array]" === Object.prototype.toString.call(t);
    }
    function i(t) {
        return t instanceof Date || "[object Date]" === Object.prototype.toString.call(t);
    }
    function r(t, e) {
        var n, i = [];
        for (n = 0; n < t.length; ++n) i.push(e(t[n], n));
        return i;
    }
    function s(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
    }
    function o(t, e) {
        for (var n in e) s(e, n) && (t[n] = e[n]);
        return s(e, "toString") && (t.toString = e.toString), s(e, "valueOf") && (t.valueOf = e.valueOf), 
        t;
    }
    function a(t, e, n, i) {
        return pt(t, e, n, i, !0).utc();
    }
    function u() {
        return {
            empty: !1,
            unusedTokens: [],
            unusedInput: [],
            overflow: -2,
            charsLeftOver: 0,
            nullInput: !1,
            invalidMonth: null,
            invalidFormat: !1,
            userInvalidated: !1,
            iso: !1
        };
    }
    function d(t) {
        return null == t._pf && (t._pf = u()), t._pf;
    }
    function l(t) {
        if (null == t._isValid) {
            var e = d(t);
            t._isValid = !(isNaN(t._d.getTime()) || !(e.overflow < 0) || e.empty || e.invalidMonth || e.invalidWeekday || e.nullInput || e.invalidFormat || e.userInvalidated), 
            t._strict && (t._isValid = t._isValid && 0 === e.charsLeftOver && 0 === e.unusedTokens.length && void 0 === e.bigHour);
        }
        return t._isValid;
    }
    function c(t) {
        var e = a(NaN);
        return null != t ? o(d(e), t) : d(e).userInvalidated = !0, e;
    }
    function h(t, e) {
        var n, i, r;
        if (void 0 !== e._isAMomentObject && (t._isAMomentObject = e._isAMomentObject), 
        void 0 !== e._i && (t._i = e._i), void 0 !== e._f && (t._f = e._f), void 0 !== e._l && (t._l = e._l), 
        void 0 !== e._strict && (t._strict = e._strict), void 0 !== e._tzm && (t._tzm = e._tzm), 
        void 0 !== e._isUTC && (t._isUTC = e._isUTC), void 0 !== e._offset && (t._offset = e._offset), 
        void 0 !== e._pf && (t._pf = d(e)), void 0 !== e._locale && (t._locale = e._locale), 
        ne.length > 0) for (n in ne) void 0 !== (r = e[i = ne[n]]) && (t[i] = r);
        return t;
    }
    function f(t) {
        h(this, t), this._d = new Date(null != t._d ? t._d.getTime() : NaN), !1 === ie && (ie = !0, 
        e.updateOffset(this), ie = !1);
    }
    function m(t) {
        return t instanceof f || null != t && null != t._isAMomentObject;
    }
    function _(t) {
        return t < 0 ? Math.ceil(t) : Math.floor(t);
    }
    function y(t) {
        var e = +t, n = 0;
        return 0 !== e && isFinite(e) && (n = _(e)), n;
    }
    function p(t, e, n) {
        var i, r = Math.min(t.length, e.length), s = Math.abs(t.length - e.length), o = 0;
        for (i = 0; i < r; i++) (n && t[i] !== e[i] || !n && y(t[i]) !== y(e[i])) && o++;
        return o + s;
    }
    function D() {}
    function v(t) {
        return t ? t.toLowerCase().replace("_", "-") : t;
    }
    function M(t) {
        for (var e, n, i, r, s = 0; s < t.length; ) {
            for (e = (r = v(t[s]).split("-")).length, n = (n = v(t[s + 1])) ? n.split("-") : null; e > 0; ) {
                if (i = g(r.slice(0, e).join("-"))) return i;
                if (n && n.length >= e && p(r, n, !0) >= e - 1) break;
                e--;
            }
            s++;
        }
        return null;
    }
    function g(t) {
        var e = null;
        if (!re[t] && "undefined" != typeof module && module && module.exports) try {
            e = ee._abbr, require("./locale/" + t), Y(e);
        } catch (t) {}
        return re[t];
    }
    function Y(t, e) {
        var n;
        return t && (n = void 0 === e ? S(t) : w(t, e)) && (ee = n), ee._abbr;
    }
    function w(t, e) {
        return null !== e ? (e.abbr = t, re[t] = re[t] || new D(), re[t].set(e), Y(t), re[t]) : (delete re[t], 
        null);
    }
    function S(t) {
        var e;
        if (t && t._locale && t._locale._abbr && (t = t._locale._abbr), !t) return ee;
        if (!n(t)) {
            if (e = g(t)) return e;
            t = [ t ];
        }
        return M(t);
    }
    function k(t, e) {
        var n = t.toLowerCase();
        se[n] = se[n + "s"] = se[e] = t;
    }
    function T(t) {
        return "string" == typeof t ? se[t] || se[t.toLowerCase()] : void 0;
    }
    function b(t) {
        var e, n, i = {};
        for (n in t) s(t, n) && (e = T(n)) && (i[e] = t[n]);
        return i;
    }
    function O(t, n) {
        return function(i) {
            return null != i ? (W(this, t, i), e.updateOffset(this, n), this) : U(this, t);
        };
    }
    function U(t, e) {
        return t._d["get" + (t._isUTC ? "UTC" : "") + e]();
    }
    function W(t, e, n) {
        return t._d["set" + (t._isUTC ? "UTC" : "") + e](n);
    }
    function L(e, n) {
        var i;
        if ("object" === (void 0 === e ? "undefined" : t(e))) for (i in e) this.set(i, e[i]); else if (e = T(e), 
        "function" == typeof this[e]) return this[e](n);
        return this;
    }
    function C(t, e, n) {
        var i = "" + Math.abs(t), r = e - i.length;
        return (t >= 0 ? n ? "+" : "" : "-") + Math.pow(10, Math.max(0, r)).toString().substr(1) + i;
    }
    function G(t, e, n, i) {
        var r = i;
        "string" == typeof i && (r = function() {
            return this[i]();
        }), t && (de[t] = r), e && (de[e[0]] = function() {
            return C(r.apply(this, arguments), e[1], e[2]);
        }), n && (de[n] = function() {
            return this.localeData().ordinal(r.apply(this, arguments), t);
        });
    }
    function F(t) {
        return t.match(/\[[\s\S]/) ? t.replace(/^\[|\]$/g, "") : t.replace(/\\/g, "");
    }
    function P(t) {
        var e, n, i = t.match(oe);
        for (e = 0, n = i.length; e < n; e++) de[i[e]] ? i[e] = de[i[e]] : i[e] = F(i[e]);
        return function(r) {
            var s = "";
            for (e = 0; e < n; e++) s += "function" == typeof i[e] ? i[e].call(r, t) : i[e];
            return s;
        };
    }
    function x(t, e) {
        return t.isValid() ? (e = A(e, t.localeData()), ue[e] = ue[e] || P(e), ue[e](t)) : t.localeData().invalidDate();
    }
    function A(t, e) {
        var n = 5;
        for (ae.lastIndex = 0; n >= 0 && ae.test(t); ) t = t.replace(ae, function(t) {
            return e.longDateFormat(t) || t;
        }), ae.lastIndex = 0, n -= 1;
        return t;
    }
    function H(t) {
        return "function" == typeof t && "[object Function]" === Object.prototype.toString.call(t);
    }
    function I(t, e, n) {
        Se[t] = H(e) ? e : function(t) {
            return t && n ? n : e;
        };
    }
    function z(t, e) {
        return s(Se, t) ? Se[t](e._strict, e._locale) : new RegExp(N(t));
    }
    function N(t) {
        return t.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(t, e, n, i, r) {
            return e || n || i || r;
        }).replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
    }
    function Z(t, e) {
        var n, i = e;
        for ("string" == typeof t && (t = [ t ]), "number" == typeof e && (i = function(t, n) {
            n[e] = y(t);
        }), n = 0; n < t.length; n++) ke[t[n]] = i;
    }
    function E(t, e) {
        Z(t, function(t, n, i, r) {
            i._w = i._w || {}, e(t, i._w, i, r);
        });
    }
    function j(t, e, n) {
        null != e && s(ke, t) && ke[t](e, n._a, n, t);
    }
    function V(t, e) {
        return new Date(Date.UTC(t, e + 1, 0)).getUTCDate();
    }
    function q(t, e) {
        var n;
        return "string" == typeof e && "number" != typeof (e = t.localeData().monthsParse(e)) ? t : (n = Math.min(t.date(), V(t.year(), e)), 
        t._d["set" + (t._isUTC ? "UTC" : "") + "Month"](e, n), t);
    }
    function J(t) {
        return null != t ? (q(this, t), e.updateOffset(this, !0), this) : U(this, "Month");
    }
    function $(t) {
        var e, n = t._a;
        return n && -2 === d(t).overflow && (e = n[be] < 0 || n[be] > 11 ? be : n[Oe] < 1 || n[Oe] > V(n[Te], n[be]) ? Oe : n[Ue] < 0 || n[Ue] > 24 || 24 === n[Ue] && (0 !== n[We] || 0 !== n[Le] || 0 !== n[Ce]) ? Ue : n[We] < 0 || n[We] > 59 ? We : n[Le] < 0 || n[Le] > 59 ? Le : n[Ce] < 0 || n[Ce] > 999 ? Ce : -1, 
        d(t)._overflowDayOfYear && (e < Te || e > Oe) && (e = Oe), d(t).overflow = e), t;
    }
    function R(t) {
        !1 === e.suppressDeprecationWarnings && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + t);
    }
    function B(t, e) {
        var n = !0;
        return o(function() {
            return n && (R(t + "\n" + new Error().stack), n = !1), e.apply(this, arguments);
        }, e);
    }
    function Q(t, e) {
        Pe[t] || (R(e), Pe[t] = !0);
    }
    function X(t) {
        var e, n, i = t._i, r = xe.exec(i);
        if (r) {
            for (d(t).iso = !0, e = 0, n = Ae.length; e < n; e++) if (Ae[e][1].exec(i)) {
                t._f = Ae[e][0];
                break;
            }
            for (e = 0, n = He.length; e < n; e++) if (He[e][1].exec(i)) {
                t._f += (r[6] || " ") + He[e][0];
                break;
            }
            i.match(ge) && (t._f += "Z"), lt(t);
        } else t._isValid = !1;
    }
    function K(t) {
        var n = Ie.exec(t._i);
        null === n ? (X(t), !1 === t._isValid && (delete t._isValid, e.createFromInputFallback(t))) : t._d = new Date(+n[1]);
    }
    function tt(t, e, n, i, r, s, o) {
        var a = new Date(t, e, n, i, r, s, o);
        return t < 1970 && a.setFullYear(t), a;
    }
    function et(t) {
        var e = new Date(Date.UTC.apply(null, arguments));
        return t < 1970 && e.setUTCFullYear(t), e;
    }
    function nt(t) {
        return it(t) ? 366 : 365;
    }
    function it(t) {
        return t % 4 == 0 && t % 100 != 0 || t % 400 == 0;
    }
    function rt(t, e, n) {
        var i, r = n - e, s = n - t.day();
        return s > r && (s -= 7), s < r - 7 && (s += 7), i = Dt(t).add(s, "d"), {
            week: Math.ceil(i.dayOfYear() / 7),
            year: i.year()
        };
    }
    function st(t, e, n, i, r) {
        var s, o = 6 + r - i, a = et(t, 0, 1 + o).getUTCDay();
        return a < r && (a += 7), n = null != n ? 1 * n : r, s = 1 + o + 7 * (e - 1) - a + n, 
        {
            year: s > 0 ? t : t - 1,
            dayOfYear: s > 0 ? s : nt(t - 1) + s
        };
    }
    function ot(t, e, n) {
        return null != t ? t : null != e ? e : n;
    }
    function at(t) {
        var e = new Date();
        return t._useUTC ? [ e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate() ] : [ e.getFullYear(), e.getMonth(), e.getDate() ];
    }
    function ut(t) {
        var e, n, i, r, s = [];
        if (!t._d) {
            for (i = at(t), t._w && null == t._a[Oe] && null == t._a[be] && dt(t), t._dayOfYear && (r = ot(t._a[Te], i[Te]), 
            t._dayOfYear > nt(r) && (d(t)._overflowDayOfYear = !0), n = et(r, 0, t._dayOfYear), 
            t._a[be] = n.getUTCMonth(), t._a[Oe] = n.getUTCDate()), e = 0; e < 3 && null == t._a[e]; ++e) t._a[e] = s[e] = i[e];
            for (;e < 7; e++) t._a[e] = s[e] = null == t._a[e] ? 2 === e ? 1 : 0 : t._a[e];
            24 === t._a[Ue] && 0 === t._a[We] && 0 === t._a[Le] && 0 === t._a[Ce] && (t._nextDay = !0, 
            t._a[Ue] = 0), t._d = (t._useUTC ? et : tt).apply(null, s), null != t._tzm && t._d.setUTCMinutes(t._d.getUTCMinutes() - t._tzm), 
            t._nextDay && (t._a[Ue] = 24);
        }
    }
    function dt(t) {
        var e, n, i, r, s, o, a;
        null != (e = t._w).GG || null != e.W || null != e.E ? (s = 1, o = 4, n = ot(e.GG, t._a[Te], rt(Dt(), 1, 4).year), 
        i = ot(e.W, 1), r = ot(e.E, 1)) : (s = t._locale._week.dow, o = t._locale._week.doy, 
        n = ot(e.gg, t._a[Te], rt(Dt(), s, o).year), i = ot(e.w, 1), null != e.d ? (r = e.d) < s && ++i : r = null != e.e ? e.e + s : s), 
        a = st(n, i, r, o, s), t._a[Te] = a.year, t._dayOfYear = a.dayOfYear;
    }
    function lt(t) {
        if (t._f !== e.ISO_8601) {
            t._a = [], d(t).empty = !0;
            var n, i, r, s, o, a = "" + t._i, u = a.length, l = 0;
            for (r = A(t._f, t._locale).match(oe) || [], n = 0; n < r.length; n++) s = r[n], 
            (i = (a.match(z(s, t)) || [])[0]) && ((o = a.substr(0, a.indexOf(i))).length > 0 && d(t).unusedInput.push(o), 
            a = a.slice(a.indexOf(i) + i.length), l += i.length), de[s] ? (i ? d(t).empty = !1 : d(t).unusedTokens.push(s), 
            j(s, i, t)) : t._strict && !i && d(t).unusedTokens.push(s);
            d(t).charsLeftOver = u - l, a.length > 0 && d(t).unusedInput.push(a), !0 === d(t).bigHour && t._a[Ue] <= 12 && t._a[Ue] > 0 && (d(t).bigHour = void 0), 
            t._a[Ue] = ct(t._locale, t._a[Ue], t._meridiem), ut(t), $(t);
        } else X(t);
    }
    function ct(t, e, n) {
        var i;
        return null == n ? e : null != t.meridiemHour ? t.meridiemHour(e, n) : null != t.isPM ? ((i = t.isPM(n)) && e < 12 && (e += 12), 
        i || 12 !== e || (e = 0), e) : e;
    }
    function ht(t) {
        var e, n, i, r, s;
        if (0 === t._f.length) return d(t).invalidFormat = !0, void (t._d = new Date(NaN));
        for (r = 0; r < t._f.length; r++) s = 0, e = h({}, t), null != t._useUTC && (e._useUTC = t._useUTC), 
        e._f = t._f[r], lt(e), l(e) && (s += d(e).charsLeftOver, s += 10 * d(e).unusedTokens.length, 
        d(e).score = s, (null == i || s < i) && (i = s, n = e));
        o(t, n || e);
    }
    function ft(t) {
        if (!t._d) {
            var e = b(t._i);
            t._a = [ e.year, e.month, e.day || e.date, e.hour, e.minute, e.second, e.millisecond ], 
            ut(t);
        }
    }
    function mt(t) {
        var e = new f($(_t(t)));
        return e._nextDay && (e.add(1, "d"), e._nextDay = void 0), e;
    }
    function _t(t) {
        var e = t._i, r = t._f;
        return t._locale = t._locale || S(t._l), null === e || void 0 === r && "" === e ? c({
            nullInput: !0
        }) : ("string" == typeof e && (t._i = e = t._locale.preparse(e)), m(e) ? new f($(e)) : (n(r) ? ht(t) : r ? lt(t) : i(e) ? t._d = e : yt(t), 
        t));
    }
    function yt(s) {
        var o = s._i;
        void 0 === o ? s._d = new Date() : i(o) ? s._d = new Date(+o) : "string" == typeof o ? K(s) : n(o) ? (s._a = r(o.slice(0), function(t) {
            return parseInt(t, 10);
        }), ut(s)) : "object" === (void 0 === o ? "undefined" : t(o)) ? ft(s) : "number" == typeof o ? s._d = new Date(o) : e.createFromInputFallback(s);
    }
    function pt(t, e, n, i, r) {
        var s = {};
        return "boolean" == typeof n && (i = n, n = void 0), s._isAMomentObject = !0, s._useUTC = s._isUTC = r, 
        s._l = n, s._i = t, s._f = e, s._strict = i, mt(s);
    }
    function Dt(t, e, n, i) {
        return pt(t, e, n, i, !1);
    }
    function vt(t, e) {
        var i, r;
        if (1 === e.length && n(e[0]) && (e = e[0]), !e.length) return Dt();
        for (i = e[0], r = 1; r < e.length; ++r) e[r].isValid() && !e[r][t](i) || (i = e[r]);
        return i;
    }
    function Mt(t) {
        var e = b(t), n = e.year || 0, i = e.quarter || 0, r = e.month || 0, s = e.week || 0, o = e.day || 0, a = e.hour || 0, u = e.minute || 0, d = e.second || 0, l = e.millisecond || 0;
        this._milliseconds = +l + 1e3 * d + 6e4 * u + 36e5 * a, this._days = +o + 7 * s, 
        this._months = +r + 3 * i + 12 * n, this._data = {}, this._locale = S(), this._bubble();
    }
    function gt(t) {
        return t instanceof Mt;
    }
    function Yt(t, e) {
        G(t, 0, 0, function() {
            var t = this.utcOffset(), n = "+";
            return t < 0 && (t = -t, n = "-"), n + C(~~(t / 60), 2) + e + C(~~t % 60, 2);
        });
    }
    function wt(t) {
        var e = (t || "").match(ge) || [], n = ((e[e.length - 1] || []) + "").match(je) || [ "-", 0, 0 ], i = 60 * n[1] + y(n[2]);
        return "+" === n[0] ? i : -i;
    }
    function St(t, n) {
        var r, s;
        return n._isUTC ? (r = n.clone(), s = (m(t) || i(t) ? +t : +Dt(t)) - +r, r._d.setTime(+r._d + s), 
        e.updateOffset(r, !1), r) : Dt(t).local();
    }
    function kt(t) {
        return 15 * -Math.round(t._d.getTimezoneOffset() / 15);
    }
    function Tt() {
        return this._isUTC && 0 === this._offset;
    }
    function bt(e, n) {
        var i, r, o, a = e, u = null;
        return gt(e) ? a = {
            ms: e._milliseconds,
            d: e._days,
            M: e._months
        } : "number" == typeof e ? (a = {}, n ? a[n] = e : a.milliseconds = e) : (u = Ve.exec(e)) ? (i = "-" === u[1] ? -1 : 1, 
        a = {
            y: 0,
            d: y(u[Oe]) * i,
            h: y(u[Ue]) * i,
            m: y(u[We]) * i,
            s: y(u[Le]) * i,
            ms: y(u[Ce]) * i
        }) : (u = qe.exec(e)) ? (i = "-" === u[1] ? -1 : 1, a = {
            y: Ot(u[2], i),
            M: Ot(u[3], i),
            d: Ot(u[4], i),
            h: Ot(u[5], i),
            m: Ot(u[6], i),
            s: Ot(u[7], i),
            w: Ot(u[8], i)
        }) : null == a ? a = {} : "object" === (void 0 === a ? "undefined" : t(a)) && ("from" in a || "to" in a) && (o = Wt(Dt(a.from), Dt(a.to)), 
        (a = {}).ms = o.milliseconds, a.M = o.months), r = new Mt(a), gt(e) && s(e, "_locale") && (r._locale = e._locale), 
        r;
    }
    function Ot(t, e) {
        var n = t && parseFloat(t.replace(",", "."));
        return (isNaN(n) ? 0 : n) * e;
    }
    function Ut(t, e) {
        var n = {
            milliseconds: 0,
            months: 0
        };
        return n.months = e.month() - t.month() + 12 * (e.year() - t.year()), t.clone().add(n.months, "M").isAfter(e) && --n.months, 
        n.milliseconds = +e - +t.clone().add(n.months, "M"), n;
    }
    function Wt(t, e) {
        var n;
        return e = St(e, t), t.isBefore(e) ? n = Ut(t, e) : ((n = Ut(e, t)).milliseconds = -n.milliseconds, 
        n.months = -n.months), n;
    }
    function Lt(t, e) {
        return function(n, i) {
            var r, s;
            return null === i || isNaN(+i) || (Q(e, "moment()." + e + "(period, number) is deprecated. Please use moment()." + e + "(number, period)."), 
            s = n, n = i, i = s), n = "string" == typeof n ? +n : n, r = bt(n, i), Ct(this, r, t), 
            this;
        };
    }
    function Ct(t, n, i, r) {
        var s = n._milliseconds, o = n._days, a = n._months;
        r = null == r || r, s && t._d.setTime(+t._d + s * i), o && W(t, "Date", U(t, "Date") + o * i), 
        a && q(t, U(t, "Month") + a * i), r && e.updateOffset(t, o || a);
    }
    function Gt(t, e) {
        var n, i = 12 * (e.year() - t.year()) + (e.month() - t.month()), r = t.clone().add(i, "months");
        return n = e - r < 0 ? (e - r) / (r - t.clone().add(i - 1, "months")) : (e - r) / (t.clone().add(i + 1, "months") - r), 
        -(i + n);
    }
    function Ft() {
        var t = this.clone().utc();
        return 0 < t.year() && t.year() <= 9999 ? "function" == typeof Date.prototype.toISOString ? this.toDate().toISOString() : x(t, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]") : x(t, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]");
    }
    function Pt(t) {
        var e;
        return void 0 === t ? this._locale._abbr : (null != (e = S(t)) && (this._locale = e), 
        this);
    }
    function xt() {
        return this._locale;
    }
    function At(t, e) {
        G(0, [ t, t.length ], 0, e);
    }
    function Ht(t, e, n) {
        return rt(Dt([ t, 11, 31 + e - n ]), e, n).week;
    }
    function It(t, e) {
        return "string" != typeof t ? t : isNaN(t) ? "number" == typeof (t = e.weekdaysParse(t)) ? t : null : parseInt(t, 10);
    }
    function zt(t, e) {
        G(t, 0, 0, function() {
            return this.localeData().meridiem(this.hours(), this.minutes(), e);
        });
    }
    function Nt(t, e) {
        return e._meridiemParse;
    }
    function Zt(t) {
        return t;
    }
    function Et(t, e, n, i) {
        var r = S(), s = a().set(i, e);
        return r[n](s, t);
    }
    function jt(t, e, n, i, r) {
        if ("number" == typeof t && (e = t, t = void 0), t = t || "", null != e) return Et(t, e, n, r);
        var s, o = [];
        for (s = 0; s < i; s++) o[s] = Et(t, s, n, r);
        return o;
    }
    function Vt(t, e, n, i) {
        var r = bt(e, n);
        return t._milliseconds += i * r._milliseconds, t._days += i * r._days, t._months += i * r._months, 
        t._bubble();
    }
    function qt(t) {
        return t < 0 ? Math.floor(t) : Math.ceil(t);
    }
    function Jt(t) {
        return 4800 * t / 146097;
    }
    function $t(t) {
        return 146097 * t / 4800;
    }
    function Rt(t) {
        return function() {
            return this.as(t);
        };
    }
    function Bt(t) {
        return function() {
            return this._data[t];
        };
    }
    function Qt(t, e, n, i, r) {
        return r.relativeTime(e || 1, !!n, t, i);
    }
    function Xt(t, e, n) {
        var i = bt(t).abs(), r = Wn(i.as("s")), s = Wn(i.as("m")), o = Wn(i.as("h")), a = Wn(i.as("d")), u = Wn(i.as("M")), d = Wn(i.as("y")), l = r < Ln.s && [ "s", r ] || 1 === s && [ "m" ] || s < Ln.m && [ "mm", s ] || 1 === o && [ "h" ] || o < Ln.h && [ "hh", o ] || 1 === a && [ "d" ] || a < Ln.d && [ "dd", a ] || 1 === u && [ "M" ] || u < Ln.M && [ "MM", u ] || 1 === d && [ "y" ] || [ "yy", d ];
        return l[2] = e, l[3] = +t > 0, l[4] = n, Qt.apply(null, l);
    }
    function Kt() {
        var t, e, n, i = Cn(this._milliseconds) / 1e3, r = Cn(this._days), s = Cn(this._months);
        e = _((t = _(i / 60)) / 60), i %= 60, t %= 60;
        var o = n = _(s / 12), a = s %= 12, u = r, d = e, l = t, c = i, h = this.asSeconds();
        return h ? (h < 0 ? "-" : "") + "P" + (o ? o + "Y" : "") + (a ? a + "M" : "") + (u ? u + "D" : "") + (d || l || c ? "T" : "") + (d ? d + "H" : "") + (l ? l + "M" : "") + (c ? c + "S" : "") : "P0D";
    }
    var te, ee, ne = e.momentProperties = [], ie = !1, re = {}, se = {}, oe = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, ae = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, ue = {}, de = {}, le = /\d/, ce = /\d\d/, he = /\d{3}/, fe = /\d{4}/, me = /[+-]?\d{6}/, _e = /\d\d?/, ye = /\d{1,3}/, pe = /\d{1,4}/, De = /[+-]?\d{1,6}/, ve = /\d+/, Me = /[+-]?\d+/, ge = /Z|[+-]\d\d:?\d\d/gi, Ye = /[+-]?\d+(\.\d{1,3})?/, we = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, Se = {}, ke = {}, Te = 0, be = 1, Oe = 2, Ue = 3, We = 4, Le = 5, Ce = 6;
    G("M", [ "MM", 2 ], "Mo", function() {
        return this.month() + 1;
    }), G("MMM", 0, 0, function(t) {
        return this.localeData().monthsShort(this, t);
    }), G("MMMM", 0, 0, function(t) {
        return this.localeData().months(this, t);
    }), k("month", "M"), I("M", _e), I("MM", _e, ce), I("MMM", we), I("MMMM", we), Z([ "M", "MM" ], function(t, e) {
        e[be] = y(t) - 1;
    }), Z([ "MMM", "MMMM" ], function(t, e, n, i) {
        var r = n._locale.monthsParse(t, i, n._strict);
        null != r ? e[be] = r : d(n).invalidMonth = t;
    });
    var Ge = "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), Fe = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), Pe = {};
    e.suppressDeprecationWarnings = !1;
    var xe = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/, Ae = [ [ "YYYYYY-MM-DD", /[+-]\d{6}-\d{2}-\d{2}/ ], [ "YYYY-MM-DD", /\d{4}-\d{2}-\d{2}/ ], [ "GGGG-[W]WW-E", /\d{4}-W\d{2}-\d/ ], [ "GGGG-[W]WW", /\d{4}-W\d{2}/ ], [ "YYYY-DDD", /\d{4}-\d{3}/ ] ], He = [ [ "HH:mm:ss.SSSS", /(T| )\d\d:\d\d:\d\d\.\d+/ ], [ "HH:mm:ss", /(T| )\d\d:\d\d:\d\d/ ], [ "HH:mm", /(T| )\d\d:\d\d/ ], [ "HH", /(T| )\d\d/ ] ], Ie = /^\/?Date\((\-?\d+)/i;
    e.createFromInputFallback = B("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.", function(t) {
        t._d = new Date(t._i + (t._useUTC ? " UTC" : ""));
    }), G(0, [ "YY", 2 ], 0, function() {
        return this.year() % 100;
    }), G(0, [ "YYYY", 4 ], 0, "year"), G(0, [ "YYYYY", 5 ], 0, "year"), G(0, [ "YYYYYY", 6, !0 ], 0, "year"), 
    k("year", "y"), I("Y", Me), I("YY", _e, ce), I("YYYY", pe, fe), I("YYYYY", De, me), 
    I("YYYYYY", De, me), Z([ "YYYYY", "YYYYYY" ], Te), Z("YYYY", function(t, n) {
        n[Te] = 2 === t.length ? e.parseTwoDigitYear(t) : y(t);
    }), Z("YY", function(t, n) {
        n[Te] = e.parseTwoDigitYear(t);
    }), e.parseTwoDigitYear = function(t) {
        return y(t) + (y(t) > 68 ? 1900 : 2e3);
    };
    var ze = O("FullYear", !1);
    G("w", [ "ww", 2 ], "wo", "week"), G("W", [ "WW", 2 ], "Wo", "isoWeek"), k("week", "w"), 
    k("isoWeek", "W"), I("w", _e), I("ww", _e, ce), I("W", _e), I("WW", _e, ce), E([ "w", "ww", "W", "WW" ], function(t, e, n, i) {
        e[i.substr(0, 1)] = y(t);
    });
    var Ne = {
        dow: 0,
        doy: 6
    };
    G("DDD", [ "DDDD", 3 ], "DDDo", "dayOfYear"), k("dayOfYear", "DDD"), I("DDD", ye), 
    I("DDDD", he), Z([ "DDD", "DDDD" ], function(t, e, n) {
        n._dayOfYear = y(t);
    }), e.ISO_8601 = function() {};
    var Ze = B("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548", function() {
        var t = Dt.apply(null, arguments);
        return t < this ? this : t;
    }), Ee = B("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548", function() {
        var t = Dt.apply(null, arguments);
        return t > this ? this : t;
    });
    Yt("Z", ":"), Yt("ZZ", ""), I("Z", ge), I("ZZ", ge), Z([ "Z", "ZZ" ], function(t, e, n) {
        n._useUTC = !0, n._tzm = wt(t);
    });
    var je = /([\+\-]|\d\d)/gi;
    e.updateOffset = function() {};
    var Ve = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/, qe = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/;
    bt.fn = Mt.prototype;
    var Je = Lt(1, "add"), $e = Lt(-1, "subtract");
    e.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
    var Re = B("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function(t) {
        return void 0 === t ? this.localeData() : this.locale(t);
    });
    G(0, [ "gg", 2 ], 0, function() {
        return this.weekYear() % 100;
    }), G(0, [ "GG", 2 ], 0, function() {
        return this.isoWeekYear() % 100;
    }), At("gggg", "weekYear"), At("ggggg", "weekYear"), At("GGGG", "isoWeekYear"), 
    At("GGGGG", "isoWeekYear"), k("weekYear", "gg"), k("isoWeekYear", "GG"), I("G", Me), 
    I("g", Me), I("GG", _e, ce), I("gg", _e, ce), I("GGGG", pe, fe), I("gggg", pe, fe), 
    I("GGGGG", De, me), I("ggggg", De, me), E([ "gggg", "ggggg", "GGGG", "GGGGG" ], function(t, e, n, i) {
        e[i.substr(0, 2)] = y(t);
    }), E([ "gg", "GG" ], function(t, n, i, r) {
        n[r] = e.parseTwoDigitYear(t);
    }), G("Q", 0, 0, "quarter"), k("quarter", "Q"), I("Q", le), Z("Q", function(t, e) {
        e[be] = 3 * (y(t) - 1);
    }), G("D", [ "DD", 2 ], "Do", "date"), k("date", "D"), I("D", _e), I("DD", _e, ce), 
    I("Do", function(t, e) {
        return t ? e._ordinalParse : e._ordinalParseLenient;
    }), Z([ "D", "DD" ], Oe), Z("Do", function(t, e) {
        e[Oe] = y(t.match(_e)[0], 10);
    });
    var Be = O("Date", !0);
    G("d", 0, "do", "day"), G("dd", 0, 0, function(t) {
        return this.localeData().weekdaysMin(this, t);
    }), G("ddd", 0, 0, function(t) {
        return this.localeData().weekdaysShort(this, t);
    }), G("dddd", 0, 0, function(t) {
        return this.localeData().weekdays(this, t);
    }), G("e", 0, 0, "weekday"), G("E", 0, 0, "isoWeekday"), k("day", "d"), k("weekday", "e"), 
    k("isoWeekday", "E"), I("d", _e), I("e", _e), I("E", _e), I("dd", we), I("ddd", we), 
    I("dddd", we), E([ "dd", "ddd", "dddd" ], function(t, e, n) {
        var i = n._locale.weekdaysParse(t);
        null != i ? e.d = i : d(n).invalidWeekday = t;
    }), E([ "d", "e", "E" ], function(t, e, n, i) {
        e[i] = y(t);
    });
    var Qe = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), Xe = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), Ke = "Su_Mo_Tu_We_Th_Fr_Sa".split("_");
    G("H", [ "HH", 2 ], 0, "hour"), G("h", [ "hh", 2 ], 0, function() {
        return this.hours() % 12 || 12;
    }), zt("a", !0), zt("A", !1), k("hour", "h"), I("a", Nt), I("A", Nt), I("H", _e), 
    I("h", _e), I("HH", _e, ce), I("hh", _e, ce), Z([ "H", "HH" ], Ue), Z([ "a", "A" ], function(t, e, n) {
        n._isPm = n._locale.isPM(t), n._meridiem = t;
    }), Z([ "h", "hh" ], function(t, e, n) {
        e[Ue] = y(t), d(n).bigHour = !0;
    });
    var tn = /[ap]\.?m?\.?/i, en = O("Hours", !0);
    G("m", [ "mm", 2 ], 0, "minute"), k("minute", "m"), I("m", _e), I("mm", _e, ce), 
    Z([ "m", "mm" ], We);
    var nn = O("Minutes", !1);
    G("s", [ "ss", 2 ], 0, "second"), k("second", "s"), I("s", _e), I("ss", _e, ce), 
    Z([ "s", "ss" ], Le);
    var rn = O("Seconds", !1);
    G("S", 0, 0, function() {
        return ~~(this.millisecond() / 100);
    }), G(0, [ "SS", 2 ], 0, function() {
        return ~~(this.millisecond() / 10);
    }), G(0, [ "SSS", 3 ], 0, "millisecond"), G(0, [ "SSSS", 4 ], 0, function() {
        return 10 * this.millisecond();
    }), G(0, [ "SSSSS", 5 ], 0, function() {
        return 100 * this.millisecond();
    }), G(0, [ "SSSSSS", 6 ], 0, function() {
        return 1e3 * this.millisecond();
    }), G(0, [ "SSSSSSS", 7 ], 0, function() {
        return 1e4 * this.millisecond();
    }), G(0, [ "SSSSSSSS", 8 ], 0, function() {
        return 1e5 * this.millisecond();
    }), G(0, [ "SSSSSSSSS", 9 ], 0, function() {
        return 1e6 * this.millisecond();
    }), k("millisecond", "ms"), I("S", ye, le), I("SS", ye, ce), I("SSS", ye, he);
    var sn;
    for (sn = "SSSS"; sn.length <= 9; sn += "S") I(sn, ve);
    for (sn = "S"; sn.length <= 9; sn += "S") Z(sn, function(t, e) {
        e[Ce] = y(1e3 * ("0." + t));
    });
    var on = O("Milliseconds", !1);
    G("z", 0, 0, "zoneAbbr"), G("zz", 0, 0, "zoneName");
    var an = f.prototype;
    an.add = Je, an.calendar = function(t, e) {
        var n = t || Dt(), i = St(n, this).startOf("day"), r = this.diff(i, "days", !0), s = r < -6 ? "sameElse" : r < -1 ? "lastWeek" : r < 0 ? "lastDay" : r < 1 ? "sameDay" : r < 2 ? "nextDay" : r < 7 ? "nextWeek" : "sameElse";
        return this.format(e && e[s] || this.localeData().calendar(s, this, Dt(n)));
    }, an.clone = function() {
        return new f(this);
    }, an.diff = function(t, e, n) {
        var i, r, s = St(t, this), o = 6e4 * (s.utcOffset() - this.utcOffset());
        return "year" === (e = T(e)) || "month" === e || "quarter" === e ? (r = Gt(this, s), 
        "quarter" === e ? r /= 3 : "year" === e && (r /= 12)) : (i = this - s, r = "second" === e ? i / 1e3 : "minute" === e ? i / 6e4 : "hour" === e ? i / 36e5 : "day" === e ? (i - o) / 864e5 : "week" === e ? (i - o) / 6048e5 : i), 
        n ? r : _(r);
    }, an.endOf = function(t) {
        return void 0 === (t = T(t)) || "millisecond" === t ? this : this.startOf(t).add(1, "isoWeek" === t ? "week" : t).subtract(1, "ms");
    }, an.format = function(t) {
        var n = x(this, t || e.defaultFormat);
        return this.localeData().postformat(n);
    }, an.from = function(t, e) {
        return this.isValid() ? bt({
            to: this,
            from: t
        }).locale(this.locale()).humanize(!e) : this.localeData().invalidDate();
    }, an.fromNow = function(t) {
        return this.from(Dt(), t);
    }, an.to = function(t, e) {
        return this.isValid() ? bt({
            from: this,
            to: t
        }).locale(this.locale()).humanize(!e) : this.localeData().invalidDate();
    }, an.toNow = function(t) {
        return this.to(Dt(), t);
    }, an.get = L, an.invalidAt = function() {
        return d(this).overflow;
    }, an.isAfter = function(t, e) {
        return "millisecond" === (e = T(void 0 !== e ? e : "millisecond")) ? (t = m(t) ? t : Dt(t), 
        +this > +t) : (m(t) ? +t : +Dt(t)) < +this.clone().startOf(e);
    }, an.isBefore = function(t, e) {
        var n;
        return "millisecond" === (e = T(void 0 !== e ? e : "millisecond")) ? (t = m(t) ? t : Dt(t), 
        +this < +t) : (n = m(t) ? +t : +Dt(t), +this.clone().endOf(e) < n);
    }, an.isBetween = function(t, e, n) {
        return this.isAfter(t, n) && this.isBefore(e, n);
    }, an.isSame = function(t, e) {
        var n;
        return "millisecond" === (e = T(e || "millisecond")) ? (t = m(t) ? t : Dt(t), +this == +t) : (n = +Dt(t), 
        +this.clone().startOf(e) <= n && n <= +this.clone().endOf(e));
    }, an.isValid = function() {
        return l(this);
    }, an.lang = Re, an.locale = Pt, an.localeData = xt, an.max = Ee, an.min = Ze, an.parsingFlags = function() {
        return o({}, d(this));
    }, an.set = L, an.startOf = function(t) {
        switch (t = T(t)) {
          case "year":
            this.month(0);

          case "quarter":
          case "month":
            this.date(1);

          case "week":
          case "isoWeek":
          case "day":
            this.hours(0);

          case "hour":
            this.minutes(0);

          case "minute":
            this.seconds(0);

          case "second":
            this.milliseconds(0);
        }
        return "week" === t && this.weekday(0), "isoWeek" === t && this.isoWeekday(1), "quarter" === t && this.month(3 * Math.floor(this.month() / 3)), 
        this;
    }, an.subtract = $e, an.toArray = function() {
        var t = this;
        return [ t.year(), t.month(), t.date(), t.hour(), t.minute(), t.second(), t.millisecond() ];
    }, an.toObject = function() {
        var t = this;
        return {
            years: t.year(),
            months: t.month(),
            date: t.date(),
            hours: t.hours(),
            minutes: t.minutes(),
            seconds: t.seconds(),
            milliseconds: t.milliseconds()
        };
    }, an.toDate = function() {
        return this._offset ? new Date(+this) : this._d;
    }, an.toISOString = Ft, an.toJSON = Ft, an.toString = function() {
        return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
    }, an.unix = function() {
        return Math.floor(+this / 1e3);
    }, an.valueOf = function() {
        return +this._d - 6e4 * (this._offset || 0);
    }, an.year = ze, an.isLeapYear = function() {
        return it(this.year());
    }, an.weekYear = function(t) {
        var e = rt(this, this.localeData()._week.dow, this.localeData()._week.doy).year;
        return null == t ? e : this.add(t - e, "y");
    }, an.isoWeekYear = function(t) {
        var e = rt(this, 1, 4).year;
        return null == t ? e : this.add(t - e, "y");
    }, an.quarter = an.quarters = function(t) {
        return null == t ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (t - 1) + this.month() % 3);
    }, an.month = J, an.daysInMonth = function() {
        return V(this.year(), this.month());
    }, an.week = an.weeks = function(t) {
        var e = this.localeData().week(this);
        return null == t ? e : this.add(7 * (t - e), "d");
    }, an.isoWeek = an.isoWeeks = function(t) {
        var e = rt(this, 1, 4).week;
        return null == t ? e : this.add(7 * (t - e), "d");
    }, an.weeksInYear = function() {
        var t = this.localeData()._week;
        return Ht(this.year(), t.dow, t.doy);
    }, an.isoWeeksInYear = function() {
        return Ht(this.year(), 1, 4);
    }, an.date = Be, an.day = an.days = function(t) {
        var e = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        return null != t ? (t = It(t, this.localeData()), this.add(t - e, "d")) : e;
    }, an.weekday = function(t) {
        var e = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return null == t ? e : this.add(t - e, "d");
    }, an.isoWeekday = function(t) {
        return null == t ? this.day() || 7 : this.day(this.day() % 7 ? t : t - 7);
    }, an.dayOfYear = function(t) {
        var e = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
        return null == t ? e : this.add(t - e, "d");
    }, an.hour = an.hours = en, an.minute = an.minutes = nn, an.second = an.seconds = rn, 
    an.millisecond = an.milliseconds = on, an.utcOffset = function(t, n) {
        var i, r = this._offset || 0;
        return null != t ? ("string" == typeof t && (t = wt(t)), Math.abs(t) < 16 && (t *= 60), 
        !this._isUTC && n && (i = kt(this)), this._offset = t, this._isUTC = !0, null != i && this.add(i, "m"), 
        r !== t && (!n || this._changeInProgress ? Ct(this, bt(t - r, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, 
        e.updateOffset(this, !0), this._changeInProgress = null)), this) : this._isUTC ? r : kt(this);
    }, an.utc = function(t) {
        return this.utcOffset(0, t);
    }, an.local = function(t) {
        return this._isUTC && (this.utcOffset(0, t), this._isUTC = !1, t && this.subtract(kt(this), "m")), 
        this;
    }, an.parseZone = function() {
        return this._tzm ? this.utcOffset(this._tzm) : "string" == typeof this._i && this.utcOffset(wt(this._i)), 
        this;
    }, an.hasAlignedHourOffset = function(t) {
        return t = t ? Dt(t).utcOffset() : 0, (this.utcOffset() - t) % 60 == 0;
    }, an.isDST = function() {
        return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
    }, an.isDSTShifted = function() {
        if (void 0 !== this._isDSTShifted) return this._isDSTShifted;
        var t = {};
        if (h(t, this), (t = _t(t))._a) {
            var e = t._isUTC ? a(t._a) : Dt(t._a);
            this._isDSTShifted = this.isValid() && p(t._a, e.toArray()) > 0;
        } else this._isDSTShifted = !1;
        return this._isDSTShifted;
    }, an.isLocal = function() {
        return !this._isUTC;
    }, an.isUtcOffset = function() {
        return this._isUTC;
    }, an.isUtc = Tt, an.isUTC = Tt, an.zoneAbbr = function() {
        return this._isUTC ? "UTC" : "";
    }, an.zoneName = function() {
        return this._isUTC ? "Coordinated Universal Time" : "";
    }, an.dates = B("dates accessor is deprecated. Use date instead.", Be), an.months = B("months accessor is deprecated. Use month instead", J), 
    an.years = B("years accessor is deprecated. Use year instead", ze), an.zone = B("moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779", function(t, e) {
        return null != t ? ("string" != typeof t && (t = -t), this.utcOffset(t, e), this) : -this.utcOffset();
    });
    var un = an, dn = {
        sameDay: "[Today at] LT",
        nextDay: "[Tomorrow at] LT",
        nextWeek: "dddd [at] LT",
        lastDay: "[Yesterday at] LT",
        lastWeek: "[Last] dddd [at] LT",
        sameElse: "L"
    }, ln = {
        LTS: "h:mm:ss A",
        LT: "h:mm A",
        L: "MM/DD/YYYY",
        LL: "MMMM D, YYYY",
        LLL: "MMMM D, YYYY h:mm A",
        LLLL: "dddd, MMMM D, YYYY h:mm A"
    }, cn = /\d{1,2}/, hn = {
        future: "in %s",
        past: "%s ago",
        s: "a few seconds",
        m: "a minute",
        mm: "%d minutes",
        h: "an hour",
        hh: "%d hours",
        d: "a day",
        dd: "%d days",
        M: "a month",
        MM: "%d months",
        y: "a year",
        yy: "%d years"
    }, fn = D.prototype;
    fn._calendar = dn, fn.calendar = function(t, e, n) {
        var i = this._calendar[t];
        return "function" == typeof i ? i.call(e, n) : i;
    }, fn._longDateFormat = ln, fn.longDateFormat = function(t) {
        var e = this._longDateFormat[t], n = this._longDateFormat[t.toUpperCase()];
        return e || !n ? e : (this._longDateFormat[t] = n.replace(/MMMM|MM|DD|dddd/g, function(t) {
            return t.slice(1);
        }), this._longDateFormat[t]);
    }, fn._invalidDate = "Invalid date", fn.invalidDate = function() {
        return this._invalidDate;
    }, fn._ordinal = "%d", fn.ordinal = function(t) {
        return this._ordinal.replace("%d", t);
    }, fn._ordinalParse = cn, fn.preparse = Zt, fn.postformat = Zt, fn._relativeTime = hn, 
    fn.relativeTime = function(t, e, n, i) {
        var r = this._relativeTime[n];
        return "function" == typeof r ? r(t, e, n, i) : r.replace(/%d/i, t);
    }, fn.pastFuture = function(t, e) {
        var n = this._relativeTime[t > 0 ? "future" : "past"];
        return "function" == typeof n ? n(e) : n.replace(/%s/i, e);
    }, fn.set = function(t) {
        var e, n;
        for (n in t) "function" == typeof (e = t[n]) ? this[n] = e : this["_" + n] = e;
        this._ordinalParseLenient = new RegExp(this._ordinalParse.source + "|" + /\d{1,2}/.source);
    }, fn.months = function(t) {
        return this._months[t.month()];
    }, fn._months = Ge, fn.monthsShort = function(t) {
        return this._monthsShort[t.month()];
    }, fn._monthsShort = Fe, fn.monthsParse = function(t, e, n) {
        var i, r, s;
        for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), 
        i = 0; i < 12; i++) {
            if (r = a([ 2e3, i ]), n && !this._longMonthsParse[i] && (this._longMonthsParse[i] = new RegExp("^" + this.months(r, "").replace(".", "") + "$", "i"), 
            this._shortMonthsParse[i] = new RegExp("^" + this.monthsShort(r, "").replace(".", "") + "$", "i")), 
            n || this._monthsParse[i] || (s = "^" + this.months(r, "") + "|^" + this.monthsShort(r, ""), 
            this._monthsParse[i] = new RegExp(s.replace(".", ""), "i")), n && "MMMM" === e && this._longMonthsParse[i].test(t)) return i;
            if (n && "MMM" === e && this._shortMonthsParse[i].test(t)) return i;
            if (!n && this._monthsParse[i].test(t)) return i;
        }
    }, fn.week = function(t) {
        return rt(t, this._week.dow, this._week.doy).week;
    }, fn._week = Ne, fn.firstDayOfYear = function() {
        return this._week.doy;
    }, fn.firstDayOfWeek = function() {
        return this._week.dow;
    }, fn.weekdays = function(t) {
        return this._weekdays[t.day()];
    }, fn._weekdays = Qe, fn.weekdaysMin = function(t) {
        return this._weekdaysMin[t.day()];
    }, fn._weekdaysMin = Ke, fn.weekdaysShort = function(t) {
        return this._weekdaysShort[t.day()];
    }, fn._weekdaysShort = Xe, fn.weekdaysParse = function(t) {
        var e, n, i;
        for (this._weekdaysParse = this._weekdaysParse || [], e = 0; e < 7; e++) if (this._weekdaysParse[e] || (n = Dt([ 2e3, 1 ]).day(e), 
        i = "^" + this.weekdays(n, "") + "|^" + this.weekdaysShort(n, "") + "|^" + this.weekdaysMin(n, ""), 
        this._weekdaysParse[e] = new RegExp(i.replace(".", ""), "i")), this._weekdaysParse[e].test(t)) return e;
    }, fn.isPM = function(t) {
        return "p" === (t + "").toLowerCase().charAt(0);
    }, fn._meridiemParse = tn, fn.meridiem = function(t, e, n) {
        return t > 11 ? n ? "pm" : "PM" : n ? "am" : "AM";
    }, Y("en", {
        ordinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal: function(t) {
            var e = t % 10;
            return t + (1 === y(t % 100 / 10) ? "th" : 1 === e ? "st" : 2 === e ? "nd" : 3 === e ? "rd" : "th");
        }
    }), e.lang = B("moment.lang is deprecated. Use moment.locale instead.", Y), e.langData = B("moment.langData is deprecated. Use moment.localeData instead.", S);
    var mn = Math.abs, _n = Rt("ms"), yn = Rt("s"), pn = Rt("m"), Dn = Rt("h"), vn = Rt("d"), Mn = Rt("w"), gn = Rt("M"), Yn = Rt("y"), wn = Bt("milliseconds"), Sn = Bt("seconds"), kn = Bt("minutes"), Tn = Bt("hours"), bn = Bt("days"), On = Bt("months"), Un = Bt("years"), Wn = Math.round, Ln = {
        s: 45,
        m: 45,
        h: 22,
        d: 26,
        M: 11
    }, Cn = Math.abs, Gn = Mt.prototype;
    Gn.abs = function() {
        var t = this._data;
        return this._milliseconds = mn(this._milliseconds), this._days = mn(this._days), 
        this._months = mn(this._months), t.milliseconds = mn(t.milliseconds), t.seconds = mn(t.seconds), 
        t.minutes = mn(t.minutes), t.hours = mn(t.hours), t.months = mn(t.months), t.years = mn(t.years), 
        this;
    }, Gn.add = function(t, e) {
        return Vt(this, t, e, 1);
    }, Gn.subtract = function(t, e) {
        return Vt(this, t, e, -1);
    }, Gn.as = function(t) {
        var e, n, i = this._milliseconds;
        if ("month" === (t = T(t)) || "year" === t) return e = this._days + i / 864e5, n = this._months + Jt(e), 
        "month" === t ? n : n / 12;
        switch (e = this._days + Math.round($t(this._months)), t) {
          case "week":
            return e / 7 + i / 6048e5;

          case "day":
            return e + i / 864e5;

          case "hour":
            return 24 * e + i / 36e5;

          case "minute":
            return 1440 * e + i / 6e4;

          case "second":
            return 86400 * e + i / 1e3;

          case "millisecond":
            return Math.floor(864e5 * e) + i;

          default:
            throw new Error("Unknown unit " + t);
        }
    }, Gn.asMilliseconds = _n, Gn.asSeconds = yn, Gn.asMinutes = pn, Gn.asHours = Dn, 
    Gn.asDays = vn, Gn.asWeeks = Mn, Gn.asMonths = gn, Gn.asYears = Yn, Gn.valueOf = function() {
        return this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * y(this._months / 12);
    }, Gn._bubble = function() {
        var t, e, n, i, r, s = this._milliseconds, o = this._days, a = this._months, u = this._data;
        return s >= 0 && o >= 0 && a >= 0 || s <= 0 && o <= 0 && a <= 0 || (s += 864e5 * qt($t(a) + o), 
        o = 0, a = 0), u.milliseconds = s % 1e3, t = _(s / 1e3), u.seconds = t % 60, e = _(t / 60), 
        u.minutes = e % 60, n = _(e / 60), u.hours = n % 24, o += _(n / 24), r = _(Jt(o)), 
        a += r, o -= qt($t(r)), i = _(a / 12), a %= 12, u.days = o, u.months = a, u.years = i, 
        this;
    }, Gn.get = function(t) {
        return t = T(t), this[t + "s"]();
    }, Gn.milliseconds = wn, Gn.seconds = Sn, Gn.minutes = kn, Gn.hours = Tn, Gn.days = bn, 
    Gn.weeks = function() {
        return _(this.days() / 7);
    }, Gn.months = On, Gn.years = Un, Gn.humanize = function(t) {
        var e = this.localeData(), n = Xt(this, !t, e);
        return t && (n = e.pastFuture(+this, n)), e.postformat(n);
    }, Gn.toISOString = Kt, Gn.toString = Kt, Gn.toJSON = Kt, Gn.locale = Pt, Gn.localeData = xt, 
    Gn.toIsoString = B("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", Kt), 
    Gn.lang = Re, G("X", 0, 0, "unix"), G("x", 0, 0, "valueOf"), I("x", Me), I("X", Ye), 
    Z("X", function(t, e, n) {
        n._d = new Date(1e3 * parseFloat(t, 10));
    }), Z("x", function(t, e, n) {
        n._d = new Date(y(t));
    }), e.version = "2.10.6", function(t) {
        te = t;
    }(Dt), e.fn = un, e.min = function() {
        return vt("isBefore", [].slice.call(arguments, 0));
    }, e.max = function() {
        return vt("isAfter", [].slice.call(arguments, 0));
    }, e.utc = a, e.unix = function(t) {
        return Dt(1e3 * t);
    }, e.months = function(t, e) {
        return jt(t, e, "months", 12, "month");
    }, e.isDate = i, e.locale = Y, e.invalid = c, e.duration = bt, e.isMoment = m, e.weekdays = function(t, e) {
        return jt(t, e, "weekdays", 7, "day");
    }, e.parseZone = function() {
        return Dt.apply(null, arguments).parseZone();
    }, e.localeData = S, e.isDuration = gt, e.monthsShort = function(t, e) {
        return jt(t, e, "monthsShort", 12, "month");
    }, e.weekdaysMin = function(t, e) {
        return jt(t, e, "weekdaysMin", 7, "day");
    }, e.defineLocale = w, e.weekdaysShort = function(t, e) {
        return jt(t, e, "weekdaysShort", 7, "day");
    }, e.normalizeUnits = T, e.relativeTimeThreshold = function(t, e) {
        return void 0 !== Ln[t] && (void 0 === e ? Ln[t] : (Ln[t] = e, !0));
    };
    var Fn = e;
    return Fn.defineLocale("zh-cn", {
        months: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),
        monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
        weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),
        weekdaysShort: "周日_周一_周二_周三_周四_周五_周六".split("_"),
        weekdaysMin: "日_一_二_三_四_五_六".split("_"),
        longDateFormat: {
            LT: "Ah点mm分",
            LTS: "Ah点m分s秒",
            L: "YYYY-MM-DD",
            LL: "YYYY年MMMD日",
            LLL: "YYYY年MMMD日Ah点mm分",
            LLLL: "YYYY年MMMD日ddddAh点mm分",
            l: "YYYY-MM-DD",
            ll: "YYYY年MMMD日",
            lll: "YYYY年MMMD日Ah点mm分",
            llll: "YYYY年MMMD日ddddAh点mm分"
        },
        meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
        meridiemHour: function(t, e) {
            return 12 === t && (t = 0), "凌晨" === e || "早上" === e || "上午" === e ? t : "下午" === e || "晚上" === e ? t + 12 : t >= 11 ? t : t + 12;
        },
        meridiem: function(t, e, n) {
            var i = 100 * t + e;
            return i < 600 ? "凌晨" : i < 900 ? "早上" : i < 1130 ? "上午" : i < 1230 ? "中午" : i < 1800 ? "下午" : "晚上";
        },
        calendar: {
            sameDay: function() {
                return 0 === this.minutes() ? "[今天]Ah[点整]" : "[今天]LT";
            },
            nextDay: function() {
                return 0 === this.minutes() ? "[明天]Ah[点整]" : "[明天]LT";
            },
            lastDay: function() {
                return 0 === this.minutes() ? "[昨天]Ah[点整]" : "[昨天]LT";
            },
            nextWeek: function() {
                var t, e;
                return t = moment().startOf("week"), e = this.unix() - t.unix() >= 604800 ? "[下]" : "[本]", 
                0 === this.minutes() ? e + "dddAh点整" : e + "dddAh点mm";
            },
            lastWeek: function() {
                var t, e;
                return t = moment().startOf("week"), e = this.unix() < t.unix() ? "[上]" : "[本]", 
                0 === this.minutes() ? e + "dddAh点整" : e + "dddAh点mm";
            },
            sameElse: "LL"
        },
        ordinalParse: /\d{1,2}(日|月|周)/,
        ordinal: function(t, e) {
            switch (e) {
              case "d":
              case "D":
              case "DDD":
                return t + "日";

              case "M":
                return t + "月";

              case "w":
              case "W":
                return t + "周";

              default:
                return t;
            }
        },
        relativeTime: {
            future: "%s内",
            past: "%s前",
            s: "几秒",
            m: "1 分钟",
            mm: "%d 分钟",
            h: "1 小时",
            hh: "%d 小时",
            d: "1 天",
            dd: "%d 天",
            M: "1 个月",
            MM: "%d 个月",
            y: "1 年",
            yy: "%d 年"
        },
        week: {
            dow: 1,
            doy: 4
        }
    }), Fn;
});