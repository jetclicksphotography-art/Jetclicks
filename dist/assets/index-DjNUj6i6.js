(function () {
  const s = document.createElement("link").relList;
  if (s && s.supports && s.supports("modulepreload")) return;
  for (const c of document.querySelectorAll('link[rel="modulepreload"]')) f(c);
  new MutationObserver((c) => {
    for (const h of c)
      if (h.type === "childList")
        for (const y of h.addedNodes)
          y.tagName === "LINK" && y.rel === "modulepreload" && f(y);
  }).observe(document, { childList: !0, subtree: !0 });
  function u(c) {
    const h = {};
    return (
      c.integrity && (h.integrity = c.integrity),
      c.referrerPolicy && (h.referrerPolicy = c.referrerPolicy),
      c.crossOrigin === "use-credentials"
        ? (h.credentials = "include")
        : c.crossOrigin === "anonymous"
          ? (h.credentials = "omit")
          : (h.credentials = "same-origin"),
      h
    );
  }
  function f(c) {
    if (c.ep) return;
    c.ep = !0;
    const h = u(c);
    fetch(c.href, h);
  }
})();
var Xi = { exports: {} },
  zr = {},
  Ji = { exports: {} },
  b = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var dc;
function tp() {
  if (dc) return b;
  dc = 1;
  var i = Symbol.for("react.element"),
    s = Symbol.for("react.portal"),
    u = Symbol.for("react.fragment"),
    f = Symbol.for("react.strict_mode"),
    c = Symbol.for("react.profiler"),
    h = Symbol.for("react.provider"),
    y = Symbol.for("react.context"),
    E = Symbol.for("react.forward_ref"),
    k = Symbol.for("react.suspense"),
    R = Symbol.for("react.memo"),
    N = Symbol.for("react.lazy"),
    j = Symbol.iterator;
  function D(g) {
    return g === null || typeof g != "object"
      ? null
      : ((g = (j && g[j]) || g["@@iterator"]),
        typeof g == "function" ? g : null);
  }
  var V = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    Q = Object.assign,
    O = {};
  function M(g, _, Z) {
    ((this.props = g),
      (this.context = _),
      (this.refs = O),
      (this.updater = Z || V));
  }
  ((M.prototype.isReactComponent = {}),
    (M.prototype.setState = function (g, _) {
      if (typeof g != "object" && typeof g != "function" && g != null)
        throw Error(
          "setState(...): takes an object of state variables to update or a function which returns an object of state variables.",
        );
      this.updater.enqueueSetState(this, g, _, "setState");
    }),
    (M.prototype.forceUpdate = function (g) {
      this.updater.enqueueForceUpdate(this, g, "forceUpdate");
    }));
  function U() {}
  U.prototype = M.prototype;
  function X(g, _, Z) {
    ((this.props = g),
      (this.context = _),
      (this.refs = O),
      (this.updater = Z || V));
  }
  var J = (X.prototype = new U());
  ((J.constructor = X), Q(J, M.prototype), (J.isPureReactComponent = !0));
  var ne = Array.isArray,
    ie = Object.prototype.hasOwnProperty,
    se = { current: null },
    ve = { key: !0, ref: !0, __self: !0, __source: !0 };
  function Re(g, _, Z) {
    var ee,
      re = {},
      le = null,
      ce = null;
    if (_ != null)
      for (ee in (_.ref !== void 0 && (ce = _.ref),
      _.key !== void 0 && (le = "" + _.key),
      _))
        ie.call(_, ee) && !ve.hasOwnProperty(ee) && (re[ee] = _[ee]);
    var ue = arguments.length - 2;
    if (ue === 1) re.children = Z;
    else if (1 < ue) {
      for (var he = Array(ue), Ze = 0; Ze < ue; Ze++)
        he[Ze] = arguments[Ze + 2];
      re.children = he;
    }
    if (g && g.defaultProps)
      for (ee in ((ue = g.defaultProps), ue))
        re[ee] === void 0 && (re[ee] = ue[ee]);
    return {
      $$typeof: i,
      type: g,
      key: le,
      ref: ce,
      props: re,
      _owner: se.current,
    };
  }
  function Be(g, _) {
    return {
      $$typeof: i,
      type: g.type,
      key: _,
      ref: g.ref,
      props: g.props,
      _owner: g._owner,
    };
  }
  function Je(g) {
    return typeof g == "object" && g !== null && g.$$typeof === i;
  }
  function Rt(g) {
    var _ = { "=": "=0", ":": "=2" };
    return (
      "$" +
      g.replace(/[=:]/g, function (Z) {
        return _[Z];
      })
    );
  }
  var rt = /\/+/g;
  function Oe(g, _) {
    return typeof g == "object" && g !== null && g.key != null
      ? Rt("" + g.key)
      : _.toString(36);
  }
  function He(g, _, Z, ee, re) {
    var le = typeof g;
    (le === "undefined" || le === "boolean") && (g = null);
    var ce = !1;
    if (g === null) ce = !0;
    else
      switch (le) {
        case "string":
        case "number":
          ce = !0;
          break;
        case "object":
          switch (g.$$typeof) {
            case i:
            case s:
              ce = !0;
          }
      }
    if (ce)
      return (
        (ce = g),
        (re = re(ce)),
        (g = ee === "" ? "." + Oe(ce, 0) : ee),
        ne(re)
          ? ((Z = ""),
            g != null && (Z = g.replace(rt, "$&/") + "/"),
            He(re, _, Z, "", function (Ze) {
              return Ze;
            }))
          : re != null &&
            (Je(re) &&
              (re = Be(
                re,
                Z +
                  (!re.key || (ce && ce.key === re.key)
                    ? ""
                    : ("" + re.key).replace(rt, "$&/") + "/") +
                  g,
              )),
            _.push(re)),
        1
      );
    if (((ce = 0), (ee = ee === "" ? "." : ee + ":"), ne(g)))
      for (var ue = 0; ue < g.length; ue++) {
        le = g[ue];
        var he = ee + Oe(le, ue);
        ce += He(le, _, Z, he, re);
      }
    else if (((he = D(g)), typeof he == "function"))
      for (g = he.call(g), ue = 0; !(le = g.next()).done; )
        ((le = le.value),
          (he = ee + Oe(le, ue++)),
          (ce += He(le, _, Z, he, re)));
    else if (le === "object")
      throw (
        (_ = String(g)),
        Error(
          "Objects are not valid as a React child (found: " +
            (_ === "[object Object]"
              ? "object with keys {" + Object.keys(g).join(", ") + "}"
              : _) +
            "). If you meant to render a collection of children, use an array instead.",
        )
      );
    return ce;
  }
  function je(g, _, Z) {
    if (g == null) return g;
    var ee = [],
      re = 0;
    return (
      He(g, ee, "", "", function (le) {
        return _.call(Z, le, re++);
      }),
      ee
    );
  }
  function Ve(g) {
    if (g._status === -1) {
      var _ = g._result;
      ((_ = _()),
        _.then(
          function (Z) {
            (g._status === 0 || g._status === -1) &&
              ((g._status = 1), (g._result = Z));
          },
          function (Z) {
            (g._status === 0 || g._status === -1) &&
              ((g._status = 2), (g._result = Z));
          },
        ),
        g._status === -1 && ((g._status = 0), (g._result = _)));
    }
    if (g._status === 1) return g._result.default;
    throw g._result;
  }
  var xe = { current: null },
    I = { transition: null },
    q = {
      ReactCurrentDispatcher: xe,
      ReactCurrentBatchConfig: I,
      ReactCurrentOwner: se,
    };
  function $() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return (
    (b.Children = {
      map: je,
      forEach: function (g, _, Z) {
        je(
          g,
          function () {
            _.apply(this, arguments);
          },
          Z,
        );
      },
      count: function (g) {
        var _ = 0;
        return (
          je(g, function () {
            _++;
          }),
          _
        );
      },
      toArray: function (g) {
        return (
          je(g, function (_) {
            return _;
          }) || []
        );
      },
      only: function (g) {
        if (!Je(g))
          throw Error(
            "React.Children.only expected to receive a single React element child.",
          );
        return g;
      },
    }),
    (b.Component = M),
    (b.Fragment = u),
    (b.Profiler = c),
    (b.PureComponent = X),
    (b.StrictMode = f),
    (b.Suspense = k),
    (b.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = q),
    (b.act = $),
    (b.cloneElement = function (g, _, Z) {
      if (g == null)
        throw Error(
          "React.cloneElement(...): The argument must be a React element, but you passed " +
            g +
            ".",
        );
      var ee = Q({}, g.props),
        re = g.key,
        le = g.ref,
        ce = g._owner;
      if (_ != null) {
        if (
          (_.ref !== void 0 && ((le = _.ref), (ce = se.current)),
          _.key !== void 0 && (re = "" + _.key),
          g.type && g.type.defaultProps)
        )
          var ue = g.type.defaultProps;
        for (he in _)
          ie.call(_, he) &&
            !ve.hasOwnProperty(he) &&
            (ee[he] = _[he] === void 0 && ue !== void 0 ? ue[he] : _[he]);
      }
      var he = arguments.length - 2;
      if (he === 1) ee.children = Z;
      else if (1 < he) {
        ue = Array(he);
        for (var Ze = 0; Ze < he; Ze++) ue[Ze] = arguments[Ze + 2];
        ee.children = ue;
      }
      return {
        $$typeof: i,
        type: g.type,
        key: re,
        ref: le,
        props: ee,
        _owner: ce,
      };
    }),
    (b.createContext = function (g) {
      return (
        (g = {
          $$typeof: y,
          _currentValue: g,
          _currentValue2: g,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
          _defaultValue: null,
          _globalName: null,
        }),
        (g.Provider = { $$typeof: h, _context: g }),
        (g.Consumer = g)
      );
    }),
    (b.createElement = Re),
    (b.createFactory = function (g) {
      var _ = Re.bind(null, g);
      return ((_.type = g), _);
    }),
    (b.createRef = function () {
      return { current: null };
    }),
    (b.forwardRef = function (g) {
      return { $$typeof: E, render: g };
    }),
    (b.isValidElement = Je),
    (b.lazy = function (g) {
      return { $$typeof: N, _payload: { _status: -1, _result: g }, _init: Ve };
    }),
    (b.memo = function (g, _) {
      return { $$typeof: R, type: g, compare: _ === void 0 ? null : _ };
    }),
    (b.startTransition = function (g) {
      var _ = I.transition;
      I.transition = {};
      try {
        g();
      } finally {
        I.transition = _;
      }
    }),
    (b.unstable_act = $),
    (b.useCallback = function (g, _) {
      return xe.current.useCallback(g, _);
    }),
    (b.useContext = function (g) {
      return xe.current.useContext(g);
    }),
    (b.useDebugValue = function () {}),
    (b.useDeferredValue = function (g) {
      return xe.current.useDeferredValue(g);
    }),
    (b.useEffect = function (g, _) {
      return xe.current.useEffect(g, _);
    }),
    (b.useId = function () {
      return xe.current.useId();
    }),
    (b.useImperativeHandle = function (g, _, Z) {
      return xe.current.useImperativeHandle(g, _, Z);
    }),
    (b.useInsertionEffect = function (g, _) {
      return xe.current.useInsertionEffect(g, _);
    }),
    (b.useLayoutEffect = function (g, _) {
      return xe.current.useLayoutEffect(g, _);
    }),
    (b.useMemo = function (g, _) {
      return xe.current.useMemo(g, _);
    }),
    (b.useReducer = function (g, _, Z) {
      return xe.current.useReducer(g, _, Z);
    }),
    (b.useRef = function (g) {
      return xe.current.useRef(g);
    }),
    (b.useState = function (g) {
      return xe.current.useState(g);
    }),
    (b.useSyncExternalStore = function (g, _, Z) {
      return xe.current.useSyncExternalStore(g, _, Z);
    }),
    (b.useTransition = function () {
      return xe.current.useTransition();
    }),
    (b.version = "18.3.1"),
    b
  );
}
var pc;
function su() {
  return (pc || ((pc = 1), (Ji.exports = tp())), Ji.exports);
}
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var hc;
function np() {
  if (hc) return zr;
  hc = 1;
  var i = su(),
    s = Symbol.for("react.element"),
    u = Symbol.for("react.fragment"),
    f = Object.prototype.hasOwnProperty,
    c = i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    h = { key: !0, ref: !0, __self: !0, __source: !0 };
  function y(E, k, R) {
    var N,
      j = {},
      D = null,
      V = null;
    (R !== void 0 && (D = "" + R),
      k.key !== void 0 && (D = "" + k.key),
      k.ref !== void 0 && (V = k.ref));
    for (N in k) f.call(k, N) && !h.hasOwnProperty(N) && (j[N] = k[N]);
    if (E && E.defaultProps)
      for (N in ((k = E.defaultProps), k)) j[N] === void 0 && (j[N] = k[N]);
    return {
      $$typeof: s,
      type: E,
      key: D,
      ref: V,
      props: j,
      _owner: c.current,
    };
  }
  return ((zr.Fragment = u), (zr.jsx = y), (zr.jsxs = y), zr);
}
var mc;
function rp() {
  return (mc || ((mc = 1), (Xi.exports = np())), Xi.exports);
}
var d = rp(),
  C = su(),
  ql = {},
  Zi = { exports: {} },
  Xe = {},
  bi = { exports: {} },
  eu = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var vc;
function lp() {
  return (
    vc ||
      ((vc = 1),
      (function (i) {
        function s(I, q) {
          var $ = I.length;
          I.push(q);
          e: for (; 0 < $; ) {
            var g = ($ - 1) >>> 1,
              _ = I[g];
            if (0 < c(_, q)) ((I[g] = q), (I[$] = _), ($ = g));
            else break e;
          }
        }
        function u(I) {
          return I.length === 0 ? null : I[0];
        }
        function f(I) {
          if (I.length === 0) return null;
          var q = I[0],
            $ = I.pop();
          if ($ !== q) {
            I[0] = $;
            e: for (var g = 0, _ = I.length, Z = _ >>> 1; g < Z; ) {
              var ee = 2 * (g + 1) - 1,
                re = I[ee],
                le = ee + 1,
                ce = I[le];
              if (0 > c(re, $))
                le < _ && 0 > c(ce, re)
                  ? ((I[g] = ce), (I[le] = $), (g = le))
                  : ((I[g] = re), (I[ee] = $), (g = ee));
              else if (le < _ && 0 > c(ce, $))
                ((I[g] = ce), (I[le] = $), (g = le));
              else break e;
            }
          }
          return q;
        }
        function c(I, q) {
          var $ = I.sortIndex - q.sortIndex;
          return $ !== 0 ? $ : I.id - q.id;
        }
        if (
          typeof performance == "object" &&
          typeof performance.now == "function"
        ) {
          var h = performance;
          i.unstable_now = function () {
            return h.now();
          };
        } else {
          var y = Date,
            E = y.now();
          i.unstable_now = function () {
            return y.now() - E;
          };
        }
        var k = [],
          R = [],
          N = 1,
          j = null,
          D = 3,
          V = !1,
          Q = !1,
          O = !1,
          M = typeof setTimeout == "function" ? setTimeout : null,
          U = typeof clearTimeout == "function" ? clearTimeout : null,
          X = typeof setImmediate < "u" ? setImmediate : null;
        typeof navigator < "u" &&
          navigator.scheduling !== void 0 &&
          navigator.scheduling.isInputPending !== void 0 &&
          navigator.scheduling.isInputPending.bind(navigator.scheduling);
        function J(I) {
          for (var q = u(R); q !== null; ) {
            if (q.callback === null) f(R);
            else if (q.startTime <= I)
              (f(R), (q.sortIndex = q.expirationTime), s(k, q));
            else break;
            q = u(R);
          }
        }
        function ne(I) {
          if (((O = !1), J(I), !Q))
            if (u(k) !== null) ((Q = !0), Ve(ie));
            else {
              var q = u(R);
              q !== null && xe(ne, q.startTime - I);
            }
        }
        function ie(I, q) {
          ((Q = !1), O && ((O = !1), U(Re), (Re = -1)), (V = !0));
          var $ = D;
          try {
            for (
              J(q), j = u(k);
              j !== null && (!(j.expirationTime > q) || (I && !Rt()));
            ) {
              var g = j.callback;
              if (typeof g == "function") {
                ((j.callback = null), (D = j.priorityLevel));
                var _ = g(j.expirationTime <= q);
                ((q = i.unstable_now()),
                  typeof _ == "function"
                    ? (j.callback = _)
                    : j === u(k) && f(k),
                  J(q));
              } else f(k);
              j = u(k);
            }
            if (j !== null) var Z = !0;
            else {
              var ee = u(R);
              (ee !== null && xe(ne, ee.startTime - q), (Z = !1));
            }
            return Z;
          } finally {
            ((j = null), (D = $), (V = !1));
          }
        }
        var se = !1,
          ve = null,
          Re = -1,
          Be = 5,
          Je = -1;
        function Rt() {
          return !(i.unstable_now() - Je < Be);
        }
        function rt() {
          if (ve !== null) {
            var I = i.unstable_now();
            Je = I;
            var q = !0;
            try {
              q = ve(!0, I);
            } finally {
              q ? Oe() : ((se = !1), (ve = null));
            }
          } else se = !1;
        }
        var Oe;
        if (typeof X == "function")
          Oe = function () {
            X(rt);
          };
        else if (typeof MessageChannel < "u") {
          var He = new MessageChannel(),
            je = He.port2;
          ((He.port1.onmessage = rt),
            (Oe = function () {
              je.postMessage(null);
            }));
        } else
          Oe = function () {
            M(rt, 0);
          };
        function Ve(I) {
          ((ve = I), se || ((se = !0), Oe()));
        }
        function xe(I, q) {
          Re = M(function () {
            I(i.unstable_now());
          }, q);
        }
        ((i.unstable_IdlePriority = 5),
          (i.unstable_ImmediatePriority = 1),
          (i.unstable_LowPriority = 4),
          (i.unstable_NormalPriority = 3),
          (i.unstable_Profiling = null),
          (i.unstable_UserBlockingPriority = 2),
          (i.unstable_cancelCallback = function (I) {
            I.callback = null;
          }),
          (i.unstable_continueExecution = function () {
            Q || V || ((Q = !0), Ve(ie));
          }),
          (i.unstable_forceFrameRate = function (I) {
            0 > I || 125 < I
              ? console.error(
                  "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
                )
              : (Be = 0 < I ? Math.floor(1e3 / I) : 5);
          }),
          (i.unstable_getCurrentPriorityLevel = function () {
            return D;
          }),
          (i.unstable_getFirstCallbackNode = function () {
            return u(k);
          }),
          (i.unstable_next = function (I) {
            switch (D) {
              case 1:
              case 2:
              case 3:
                var q = 3;
                break;
              default:
                q = D;
            }
            var $ = D;
            D = q;
            try {
              return I();
            } finally {
              D = $;
            }
          }),
          (i.unstable_pauseExecution = function () {}),
          (i.unstable_requestPaint = function () {}),
          (i.unstable_runWithPriority = function (I, q) {
            switch (I) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                I = 3;
            }
            var $ = D;
            D = I;
            try {
              return q();
            } finally {
              D = $;
            }
          }),
          (i.unstable_scheduleCallback = function (I, q, $) {
            var g = i.unstable_now();
            switch (
              (typeof $ == "object" && $ !== null
                ? (($ = $.delay),
                  ($ = typeof $ == "number" && 0 < $ ? g + $ : g))
                : ($ = g),
              I)
            ) {
              case 1:
                var _ = -1;
                break;
              case 2:
                _ = 250;
                break;
              case 5:
                _ = 1073741823;
                break;
              case 4:
                _ = 1e4;
                break;
              default:
                _ = 5e3;
            }
            return (
              (_ = $ + _),
              (I = {
                id: N++,
                callback: q,
                priorityLevel: I,
                startTime: $,
                expirationTime: _,
                sortIndex: -1,
              }),
              $ > g
                ? ((I.sortIndex = $),
                  s(R, I),
                  u(k) === null &&
                    I === u(R) &&
                    (O ? (U(Re), (Re = -1)) : (O = !0), xe(ne, $ - g)))
                : ((I.sortIndex = _), s(k, I), Q || V || ((Q = !0), Ve(ie))),
              I
            );
          }),
          (i.unstable_shouldYield = Rt),
          (i.unstable_wrapCallback = function (I) {
            var q = D;
            return function () {
              var $ = D;
              D = q;
              try {
                return I.apply(this, arguments);
              } finally {
                D = $;
              }
            };
          }));
      })(eu)),
    eu
  );
}
var yc;
function op() {
  return (yc || ((yc = 1), (bi.exports = lp())), bi.exports);
}
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var gc;
function ip() {
  if (gc) return Xe;
  gc = 1;
  var i = su(),
    s = op();
  function u(e) {
    for (
      var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e,
        n = 1;
      n < arguments.length;
      n++
    )
      t += "&args[]=" + encodeURIComponent(arguments[n]);
    return (
      "Minified React error #" +
      e +
      "; visit " +
      t +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  var f = new Set(),
    c = {};
  function h(e, t) {
    (y(e, t), y(e + "Capture", t));
  }
  function y(e, t) {
    for (c[e] = t, e = 0; e < t.length; e++) f.add(t[e]);
  }
  var E = !(
      typeof window > "u" ||
      typeof window.document > "u" ||
      typeof window.document.createElement > "u"
    ),
    k = Object.prototype.hasOwnProperty,
    R =
      /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
    N = {},
    j = {};
  function D(e) {
    return k.call(j, e)
      ? !0
      : k.call(N, e)
        ? !1
        : R.test(e)
          ? (j[e] = !0)
          : ((N[e] = !0), !1);
  }
  function V(e, t, n, r) {
    if (n !== null && n.type === 0) return !1;
    switch (typeof t) {
      case "function":
      case "symbol":
        return !0;
      case "boolean":
        return r
          ? !1
          : n !== null
            ? !n.acceptsBooleans
            : ((e = e.toLowerCase().slice(0, 5)),
              e !== "data-" && e !== "aria-");
      default:
        return !1;
    }
  }
  function Q(e, t, n, r) {
    if (t === null || typeof t > "u" || V(e, t, n, r)) return !0;
    if (r) return !1;
    if (n !== null)
      switch (n.type) {
        case 3:
          return !t;
        case 4:
          return t === !1;
        case 5:
          return isNaN(t);
        case 6:
          return isNaN(t) || 1 > t;
      }
    return !1;
  }
  function O(e, t, n, r, l, o, a) {
    ((this.acceptsBooleans = t === 2 || t === 3 || t === 4),
      (this.attributeName = r),
      (this.attributeNamespace = l),
      (this.mustUseProperty = n),
      (this.propertyName = e),
      (this.type = t),
      (this.sanitizeURL = o),
      (this.removeEmptyString = a));
  }
  var M = {};
  ("children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
    .split(" ")
    .forEach(function (e) {
      M[e] = new O(e, 0, !1, e, null, !1, !1);
    }),
    [
      ["acceptCharset", "accept-charset"],
      ["className", "class"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
    ].forEach(function (e) {
      var t = e[0];
      M[t] = new O(t, 1, !1, e[1], null, !1, !1);
    }),
    ["contentEditable", "draggable", "spellCheck", "value"].forEach(
      function (e) {
        M[e] = new O(e, 2, !1, e.toLowerCase(), null, !1, !1);
      },
    ),
    [
      "autoReverse",
      "externalResourcesRequired",
      "focusable",
      "preserveAlpha",
    ].forEach(function (e) {
      M[e] = new O(e, 2, !1, e, null, !1, !1);
    }),
    "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
      .split(" ")
      .forEach(function (e) {
        M[e] = new O(e, 3, !1, e.toLowerCase(), null, !1, !1);
      }),
    ["checked", "multiple", "muted", "selected"].forEach(function (e) {
      M[e] = new O(e, 3, !0, e, null, !1, !1);
    }),
    ["capture", "download"].forEach(function (e) {
      M[e] = new O(e, 4, !1, e, null, !1, !1);
    }),
    ["cols", "rows", "size", "span"].forEach(function (e) {
      M[e] = new O(e, 6, !1, e, null, !1, !1);
    }),
    ["rowSpan", "start"].forEach(function (e) {
      M[e] = new O(e, 5, !1, e.toLowerCase(), null, !1, !1);
    }));
  var U = /[\-:]([a-z])/g;
  function X(e) {
    return e[1].toUpperCase();
  }
  ("accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
    .split(" ")
    .forEach(function (e) {
      var t = e.replace(U, X);
      M[t] = new O(t, 1, !1, e, null, !1, !1);
    }),
    "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
      .split(" ")
      .forEach(function (e) {
        var t = e.replace(U, X);
        M[t] = new O(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
      }),
    ["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
      var t = e.replace(U, X);
      M[t] = new O(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
    }),
    ["tabIndex", "crossOrigin"].forEach(function (e) {
      M[e] = new O(e, 1, !1, e.toLowerCase(), null, !1, !1);
    }),
    (M.xlinkHref = new O(
      "xlinkHref",
      1,
      !1,
      "xlink:href",
      "http://www.w3.org/1999/xlink",
      !0,
      !1,
    )),
    ["src", "href", "action", "formAction"].forEach(function (e) {
      M[e] = new O(e, 1, !1, e.toLowerCase(), null, !0, !0);
    }));
  function J(e, t, n, r) {
    var l = M.hasOwnProperty(t) ? M[t] : null;
    (l !== null
      ? l.type !== 0
      : r ||
        !(2 < t.length) ||
        (t[0] !== "o" && t[0] !== "O") ||
        (t[1] !== "n" && t[1] !== "N")) &&
      (Q(t, n, l, r) && (n = null),
      r || l === null
        ? D(t) &&
          (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
        : l.mustUseProperty
          ? (e[l.propertyName] = n === null ? (l.type === 3 ? !1 : "") : n)
          : ((t = l.attributeName),
            (r = l.attributeNamespace),
            n === null
              ? e.removeAttribute(t)
              : ((l = l.type),
                (n = l === 3 || (l === 4 && n === !0) ? "" : "" + n),
                r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
  }
  var ne = i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
    ie = Symbol.for("react.element"),
    se = Symbol.for("react.portal"),
    ve = Symbol.for("react.fragment"),
    Re = Symbol.for("react.strict_mode"),
    Be = Symbol.for("react.profiler"),
    Je = Symbol.for("react.provider"),
    Rt = Symbol.for("react.context"),
    rt = Symbol.for("react.forward_ref"),
    Oe = Symbol.for("react.suspense"),
    He = Symbol.for("react.suspense_list"),
    je = Symbol.for("react.memo"),
    Ve = Symbol.for("react.lazy"),
    xe = Symbol.for("react.offscreen"),
    I = Symbol.iterator;
  function q(e) {
    return e === null || typeof e != "object"
      ? null
      : ((e = (I && e[I]) || e["@@iterator"]),
        typeof e == "function" ? e : null);
  }
  var $ = Object.assign,
    g;
  function _(e) {
    if (g === void 0)
      try {
        throw Error();
      } catch (n) {
        var t = n.stack.trim().match(/\n( *(at )?)/);
        g = (t && t[1]) || "";
      }
    return (
      `
` +
      g +
      e
    );
  }
  var Z = !1;
  function ee(e, t) {
    if (!e || Z) return "";
    Z = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (t)
        if (
          ((t = function () {
            throw Error();
          }),
          Object.defineProperty(t.prototype, "props", {
            set: function () {
              throw Error();
            },
          }),
          typeof Reflect == "object" && Reflect.construct)
        ) {
          try {
            Reflect.construct(t, []);
          } catch (S) {
            var r = S;
          }
          Reflect.construct(e, [], t);
        } else {
          try {
            t.call();
          } catch (S) {
            r = S;
          }
          e.call(t.prototype);
        }
      else {
        try {
          throw Error();
        } catch (S) {
          r = S;
        }
        e();
      }
    } catch (S) {
      if (S && r && typeof S.stack == "string") {
        for (
          var l = S.stack.split(`
`),
            o = r.stack.split(`
`),
            a = l.length - 1,
            p = o.length - 1;
          1 <= a && 0 <= p && l[a] !== o[p];
        )
          p--;
        for (; 1 <= a && 0 <= p; a--, p--)
          if (l[a] !== o[p]) {
            if (a !== 1 || p !== 1)
              do
                if ((a--, p--, 0 > p || l[a] !== o[p])) {
                  var m =
                    `
` + l[a].replace(" at new ", " at ");
                  return (
                    e.displayName &&
                      m.includes("<anonymous>") &&
                      (m = m.replace("<anonymous>", e.displayName)),
                    m
                  );
                }
              while (1 <= a && 0 <= p);
            break;
          }
      }
    } finally {
      ((Z = !1), (Error.prepareStackTrace = n));
    }
    return (e = e ? e.displayName || e.name : "") ? _(e) : "";
  }
  function re(e) {
    switch (e.tag) {
      case 5:
        return _(e.type);
      case 16:
        return _("Lazy");
      case 13:
        return _("Suspense");
      case 19:
        return _("SuspenseList");
      case 0:
      case 2:
      case 15:
        return ((e = ee(e.type, !1)), e);
      case 11:
        return ((e = ee(e.type.render, !1)), e);
      case 1:
        return ((e = ee(e.type, !0)), e);
      default:
        return "";
    }
  }
  function le(e) {
    if (e == null) return null;
    if (typeof e == "function") return e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case ve:
        return "Fragment";
      case se:
        return "Portal";
      case Be:
        return "Profiler";
      case Re:
        return "StrictMode";
      case Oe:
        return "Suspense";
      case He:
        return "SuspenseList";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case Rt:
          return (e.displayName || "Context") + ".Consumer";
        case Je:
          return (e._context.displayName || "Context") + ".Provider";
        case rt:
          var t = e.render;
          return (
            (e = e.displayName),
            e ||
              ((e = t.displayName || t.name || ""),
              (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
            e
          );
        case je:
          return (
            (t = e.displayName || null),
            t !== null ? t : le(e.type) || "Memo"
          );
        case Ve:
          ((t = e._payload), (e = e._init));
          try {
            return le(e(t));
          } catch {}
      }
    return null;
  }
  function ce(e) {
    var t = e.type;
    switch (e.tag) {
      case 24:
        return "Cache";
      case 9:
        return (t.displayName || "Context") + ".Consumer";
      case 10:
        return (t._context.displayName || "Context") + ".Provider";
      case 18:
        return "DehydratedFragment";
      case 11:
        return (
          (e = t.render),
          (e = e.displayName || e.name || ""),
          t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")
        );
      case 7:
        return "Fragment";
      case 5:
        return t;
      case 4:
        return "Portal";
      case 3:
        return "Root";
      case 6:
        return "Text";
      case 16:
        return le(t);
      case 8:
        return t === Re ? "StrictMode" : "Mode";
      case 22:
        return "Offscreen";
      case 12:
        return "Profiler";
      case 21:
        return "Scope";
      case 13:
        return "Suspense";
      case 19:
        return "SuspenseList";
      case 25:
        return "TracingMarker";
      case 1:
      case 0:
      case 17:
      case 2:
      case 14:
      case 15:
        if (typeof t == "function") return t.displayName || t.name || null;
        if (typeof t == "string") return t;
    }
    return null;
  }
  function ue(e) {
    switch (typeof e) {
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return e;
      default:
        return "";
    }
  }
  function he(e) {
    var t = e.type;
    return (
      (e = e.nodeName) &&
      e.toLowerCase() === "input" &&
      (t === "checkbox" || t === "radio")
    );
  }
  function Ze(e) {
    var t = he(e) ? "checked" : "value",
      n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
      r = "" + e[t];
    if (
      !e.hasOwnProperty(t) &&
      typeof n < "u" &&
      typeof n.get == "function" &&
      typeof n.set == "function"
    ) {
      var l = n.get,
        o = n.set;
      return (
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function () {
            return l.call(this);
          },
          set: function (a) {
            ((r = "" + a), o.call(this, a));
          },
        }),
        Object.defineProperty(e, t, { enumerable: n.enumerable }),
        {
          getValue: function () {
            return r;
          },
          setValue: function (a) {
            r = "" + a;
          },
          stopTracking: function () {
            ((e._valueTracker = null), delete e[t]);
          },
        }
      );
    }
  }
  function Ur(e) {
    e._valueTracker || (e._valueTracker = Ze(e));
  }
  function gu(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(),
      r = "";
    return (
      e && (r = he(e) ? (e.checked ? "true" : "false") : e.value),
      (e = r),
      e !== n ? (t.setValue(e), !0) : !1
    );
  }
  function Ar(e) {
    if (
      ((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u")
    )
      return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  function no(e, t) {
    var n = t.checked;
    return $({}, t, {
      defaultChecked: void 0,
      defaultValue: void 0,
      value: void 0,
      checked: n ?? e._wrapperState.initialChecked,
    });
  }
  function wu(e, t) {
    var n = t.defaultValue == null ? "" : t.defaultValue,
      r = t.checked != null ? t.checked : t.defaultChecked;
    ((n = ue(t.value != null ? t.value : n)),
      (e._wrapperState = {
        initialChecked: r,
        initialValue: n,
        controlled:
          t.type === "checkbox" || t.type === "radio"
            ? t.checked != null
            : t.value != null,
      }));
  }
  function xu(e, t) {
    ((t = t.checked), t != null && J(e, "checked", t, !1));
  }
  function ro(e, t) {
    xu(e, t);
    var n = ue(t.value),
      r = t.type;
    if (n != null)
      r === "number"
        ? ((n === 0 && e.value === "") || e.value != n) && (e.value = "" + n)
        : e.value !== "" + n && (e.value = "" + n);
    else if (r === "submit" || r === "reset") {
      e.removeAttribute("value");
      return;
    }
    (t.hasOwnProperty("value")
      ? lo(e, t.type, n)
      : t.hasOwnProperty("defaultValue") && lo(e, t.type, ue(t.defaultValue)),
      t.checked == null &&
        t.defaultChecked != null &&
        (e.defaultChecked = !!t.defaultChecked));
  }
  function ku(e, t, n) {
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
      var r = t.type;
      if (
        !(
          (r !== "submit" && r !== "reset") ||
          (t.value !== void 0 && t.value !== null)
        )
      )
        return;
      ((t = "" + e._wrapperState.initialValue),
        n || t === e.value || (e.value = t),
        (e.defaultValue = t));
    }
    ((n = e.name),
      n !== "" && (e.name = ""),
      (e.defaultChecked = !!e._wrapperState.initialChecked),
      n !== "" && (e.name = n));
  }
  function lo(e, t, n) {
    (t !== "number" || Ar(e.ownerDocument) !== e) &&
      (n == null
        ? (e.defaultValue = "" + e._wrapperState.initialValue)
        : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
  }
  var Yn = Array.isArray;
  function gn(e, t, n, r) {
    if (((e = e.options), t)) {
      t = {};
      for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;
      for (n = 0; n < e.length; n++)
        ((l = t.hasOwnProperty("$" + e[n].value)),
          e[n].selected !== l && (e[n].selected = l),
          l && r && (e[n].defaultSelected = !0));
    } else {
      for (n = "" + ue(n), t = null, l = 0; l < e.length; l++) {
        if (e[l].value === n) {
          ((e[l].selected = !0), r && (e[l].defaultSelected = !0));
          return;
        }
        t !== null || e[l].disabled || (t = e[l]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function oo(e, t) {
    if (t.dangerouslySetInnerHTML != null) throw Error(u(91));
    return $({}, t, {
      value: void 0,
      defaultValue: void 0,
      children: "" + e._wrapperState.initialValue,
    });
  }
  function Su(e, t) {
    var n = t.value;
    if (n == null) {
      if (((n = t.children), (t = t.defaultValue), n != null)) {
        if (t != null) throw Error(u(92));
        if (Yn(n)) {
          if (1 < n.length) throw Error(u(93));
          n = n[0];
        }
        t = n;
      }
      (t == null && (t = ""), (n = t));
    }
    e._wrapperState = { initialValue: ue(n) };
  }
  function Eu(e, t) {
    var n = ue(t.value),
      r = ue(t.defaultValue);
    (n != null &&
      ((n = "" + n),
      n !== e.value && (e.value = n),
      t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
      r != null && (e.defaultValue = "" + r));
  }
  function Cu(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue &&
      t !== "" &&
      t !== null &&
      (e.value = t);
  }
  function Ru(e) {
    switch (e) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function io(e, t) {
    return e == null || e === "http://www.w3.org/1999/xhtml"
      ? Ru(t)
      : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
        ? "http://www.w3.org/1999/xhtml"
        : e;
  }
  var $r,
    ju = (function (e) {
      return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
        ? function (t, n, r, l) {
            MSApp.execUnsafeLocalFunction(function () {
              return e(t, n, r, l);
            });
          }
        : e;
    })(function (e, t) {
      if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
        e.innerHTML = t;
      else {
        for (
          $r = $r || document.createElement("div"),
            $r.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
            t = $r.firstChild;
          e.firstChild;
        )
          e.removeChild(e.firstChild);
        for (; t.firstChild; ) e.appendChild(t.firstChild);
      }
    });
  function qn(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === 3) {
        n.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var Gn = {
      animationIterationCount: !0,
      aspectRatio: !0,
      borderImageOutset: !0,
      borderImageSlice: !0,
      borderImageWidth: !0,
      boxFlex: !0,
      boxFlexGroup: !0,
      boxOrdinalGroup: !0,
      columnCount: !0,
      columns: !0,
      flex: !0,
      flexGrow: !0,
      flexPositive: !0,
      flexShrink: !0,
      flexNegative: !0,
      flexOrder: !0,
      gridArea: !0,
      gridRow: !0,
      gridRowEnd: !0,
      gridRowSpan: !0,
      gridRowStart: !0,
      gridColumn: !0,
      gridColumnEnd: !0,
      gridColumnSpan: !0,
      gridColumnStart: !0,
      fontWeight: !0,
      lineClamp: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      tabSize: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0,
      fillOpacity: !0,
      floodOpacity: !0,
      stopOpacity: !0,
      strokeDasharray: !0,
      strokeDashoffset: !0,
      strokeMiterlimit: !0,
      strokeOpacity: !0,
      strokeWidth: !0,
    },
    lf = ["Webkit", "ms", "Moz", "O"];
  Object.keys(Gn).forEach(function (e) {
    lf.forEach(function (t) {
      ((t = t + e.charAt(0).toUpperCase() + e.substring(1)), (Gn[t] = Gn[e]));
    });
  });
  function Nu(e, t, n) {
    return t == null || typeof t == "boolean" || t === ""
      ? ""
      : n || typeof t != "number" || t === 0 || (Gn.hasOwnProperty(e) && Gn[e])
        ? ("" + t).trim()
        : t + "px";
  }
  function Pu(e, t) {
    e = e.style;
    for (var n in t)
      if (t.hasOwnProperty(n)) {
        var r = n.indexOf("--") === 0,
          l = Nu(n, t[n], r);
        (n === "float" && (n = "cssFloat"),
          r ? e.setProperty(n, l) : (e[n] = l));
      }
  }
  var of = $(
    { menuitem: !0 },
    {
      area: !0,
      base: !0,
      br: !0,
      col: !0,
      embed: !0,
      hr: !0,
      img: !0,
      input: !0,
      keygen: !0,
      link: !0,
      meta: !0,
      param: !0,
      source: !0,
      track: !0,
      wbr: !0,
    },
  );
  function uo(e, t) {
    if (t) {
      if (of[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
        throw Error(u(137, e));
      if (t.dangerouslySetInnerHTML != null) {
        if (t.children != null) throw Error(u(60));
        if (
          typeof t.dangerouslySetInnerHTML != "object" ||
          !("__html" in t.dangerouslySetInnerHTML)
        )
          throw Error(u(61));
      }
      if (t.style != null && typeof t.style != "object") throw Error(u(62));
    }
  }
  function ao(e, t) {
    if (e.indexOf("-") === -1) return typeof t.is == "string";
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var so = null;
  function co(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    );
  }
  var fo = null,
    wn = null,
    xn = null;
  function _u(e) {
    if ((e = yr(e))) {
      if (typeof fo != "function") throw Error(u(280));
      var t = e.stateNode;
      t && ((t = sl(t)), fo(e.stateNode, e.type, t));
    }
  }
  function Lu(e) {
    wn ? (xn ? xn.push(e) : (xn = [e])) : (wn = e);
  }
  function Tu() {
    if (wn) {
      var e = wn,
        t = xn;
      if (((xn = wn = null), _u(e), t)) for (e = 0; e < t.length; e++) _u(t[e]);
    }
  }
  function zu(e, t) {
    return e(t);
  }
  function Du() {}
  var po = !1;
  function Mu(e, t, n) {
    if (po) return e(t, n);
    po = !0;
    try {
      return zu(e, t, n);
    } finally {
      ((po = !1), (wn !== null || xn !== null) && (Du(), Tu()));
    }
  }
  function Xn(e, t) {
    var n = e.stateNode;
    if (n === null) return null;
    var r = sl(n);
    if (r === null) return null;
    n = r[t];
    e: switch (t) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        ((r = !r.disabled) ||
          ((e = e.type),
          (r = !(
            e === "button" ||
            e === "input" ||
            e === "select" ||
            e === "textarea"
          ))),
          (e = !r));
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (n && typeof n != "function") throw Error(u(231, t, typeof n));
    return n;
  }
  var ho = !1;
  if (E)
    try {
      var Jn = {};
      (Object.defineProperty(Jn, "passive", {
        get: function () {
          ho = !0;
        },
      }),
        window.addEventListener("test", Jn, Jn),
        window.removeEventListener("test", Jn, Jn));
    } catch {
      ho = !1;
    }
  function uf(e, t, n, r, l, o, a, p, m) {
    var S = Array.prototype.slice.call(arguments, 3);
    try {
      t.apply(n, S);
    } catch (L) {
      this.onError(L);
    }
  }
  var Zn = !1,
    Wr = null,
    Br = !1,
    mo = null,
    af = {
      onError: function (e) {
        ((Zn = !0), (Wr = e));
      },
    };
  function sf(e, t, n, r, l, o, a, p, m) {
    ((Zn = !1), (Wr = null), uf.apply(af, arguments));
  }
  function cf(e, t, n, r, l, o, a, p, m) {
    if ((sf.apply(this, arguments), Zn)) {
      if (Zn) {
        var S = Wr;
        ((Zn = !1), (Wr = null));
      } else throw Error(u(198));
      Br || ((Br = !0), (mo = S));
    }
  }
  function rn(e) {
    var t = e,
      n = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do ((t = e), (t.flags & 4098) !== 0 && (n = t.return), (e = t.return));
      while (e);
    }
    return t.tag === 3 ? n : null;
  }
  function Ou(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (
        (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
        t !== null)
      )
        return t.dehydrated;
    }
    return null;
  }
  function Iu(e) {
    if (rn(e) !== e) throw Error(u(188));
  }
  function ff(e) {
    var t = e.alternate;
    if (!t) {
      if (((t = rn(e)), t === null)) throw Error(u(188));
      return t !== e ? null : e;
    }
    for (var n = e, r = t; ; ) {
      var l = n.return;
      if (l === null) break;
      var o = l.alternate;
      if (o === null) {
        if (((r = l.return), r !== null)) {
          n = r;
          continue;
        }
        break;
      }
      if (l.child === o.child) {
        for (o = l.child; o; ) {
          if (o === n) return (Iu(l), e);
          if (o === r) return (Iu(l), t);
          o = o.sibling;
        }
        throw Error(u(188));
      }
      if (n.return !== r.return) ((n = l), (r = o));
      else {
        for (var a = !1, p = l.child; p; ) {
          if (p === n) {
            ((a = !0), (n = l), (r = o));
            break;
          }
          if (p === r) {
            ((a = !0), (r = l), (n = o));
            break;
          }
          p = p.sibling;
        }
        if (!a) {
          for (p = o.child; p; ) {
            if (p === n) {
              ((a = !0), (n = o), (r = l));
              break;
            }
            if (p === r) {
              ((a = !0), (r = o), (n = l));
              break;
            }
            p = p.sibling;
          }
          if (!a) throw Error(u(189));
        }
      }
      if (n.alternate !== r) throw Error(u(190));
    }
    if (n.tag !== 3) throw Error(u(188));
    return n.stateNode.current === n ? e : t;
  }
  function Fu(e) {
    return ((e = ff(e)), e !== null ? Uu(e) : null);
  }
  function Uu(e) {
    if (e.tag === 5 || e.tag === 6) return e;
    for (e = e.child; e !== null; ) {
      var t = Uu(e);
      if (t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var Au = s.unstable_scheduleCallback,
    $u = s.unstable_cancelCallback,
    df = s.unstable_shouldYield,
    pf = s.unstable_requestPaint,
    Se = s.unstable_now,
    hf = s.unstable_getCurrentPriorityLevel,
    vo = s.unstable_ImmediatePriority,
    Wu = s.unstable_UserBlockingPriority,
    Hr = s.unstable_NormalPriority,
    mf = s.unstable_LowPriority,
    Bu = s.unstable_IdlePriority,
    Vr = null,
    wt = null;
  function vf(e) {
    if (wt && typeof wt.onCommitFiberRoot == "function")
      try {
        wt.onCommitFiberRoot(Vr, e, void 0, (e.current.flags & 128) === 128);
      } catch {}
  }
  var ft = Math.clz32 ? Math.clz32 : wf,
    yf = Math.log,
    gf = Math.LN2;
  function wf(e) {
    return ((e >>>= 0), e === 0 ? 32 : (31 - ((yf(e) / gf) | 0)) | 0);
  }
  var Qr = 64,
    Kr = 4194304;
  function bn(e) {
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 4194240;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return e & 130023424;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 1073741824;
      default:
        return e;
    }
  }
  function Yr(e, t) {
    var n = e.pendingLanes;
    if (n === 0) return 0;
    var r = 0,
      l = e.suspendedLanes,
      o = e.pingedLanes,
      a = n & 268435455;
    if (a !== 0) {
      var p = a & ~l;
      p !== 0 ? (r = bn(p)) : ((o &= a), o !== 0 && (r = bn(o)));
    } else ((a = n & ~l), a !== 0 ? (r = bn(a)) : o !== 0 && (r = bn(o)));
    if (r === 0) return 0;
    if (
      t !== 0 &&
      t !== r &&
      (t & l) === 0 &&
      ((l = r & -r), (o = t & -t), l >= o || (l === 16 && (o & 4194240) !== 0))
    )
      return t;
    if (((r & 4) !== 0 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
      for (e = e.entanglements, t &= r; 0 < t; )
        ((n = 31 - ft(t)), (l = 1 << n), (r |= e[n]), (t &= ~l));
    return r;
  }
  function xf(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
        return t + 250;
      case 8:
      case 16:
      case 32:
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return -1;
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function kf(e, t) {
    for (
      var n = e.suspendedLanes,
        r = e.pingedLanes,
        l = e.expirationTimes,
        o = e.pendingLanes;
      0 < o;
    ) {
      var a = 31 - ft(o),
        p = 1 << a,
        m = l[a];
      (m === -1
        ? ((p & n) === 0 || (p & r) !== 0) && (l[a] = xf(p, t))
        : m <= t && (e.expiredLanes |= p),
        (o &= ~p));
    }
  }
  function yo(e) {
    return (
      (e = e.pendingLanes & -1073741825),
      e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
    );
  }
  function Hu() {
    var e = Qr;
    return ((Qr <<= 1), (Qr & 4194240) === 0 && (Qr = 64), e);
  }
  function go(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t;
  }
  function er(e, t, n) {
    ((e.pendingLanes |= t),
      t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
      (e = e.eventTimes),
      (t = 31 - ft(t)),
      (e[t] = n));
  }
  function Sf(e, t) {
    var n = e.pendingLanes & ~t;
    ((e.pendingLanes = t),
      (e.suspendedLanes = 0),
      (e.pingedLanes = 0),
      (e.expiredLanes &= t),
      (e.mutableReadLanes &= t),
      (e.entangledLanes &= t),
      (t = e.entanglements));
    var r = e.eventTimes;
    for (e = e.expirationTimes; 0 < n; ) {
      var l = 31 - ft(n),
        o = 1 << l;
      ((t[l] = 0), (r[l] = -1), (e[l] = -1), (n &= ~o));
    }
  }
  function wo(e, t) {
    var n = (e.entangledLanes |= t);
    for (e = e.entanglements; n; ) {
      var r = 31 - ft(n),
        l = 1 << r;
      ((l & t) | (e[r] & t) && (e[r] |= t), (n &= ~l));
    }
  }
  var ae = 0;
  function Vu(e) {
    return (
      (e &= -e),
      1 < e ? (4 < e ? ((e & 268435455) !== 0 ? 16 : 536870912) : 4) : 1
    );
  }
  var Qu,
    xo,
    Ku,
    Yu,
    qu,
    ko = !1,
    qr = [],
    Ft = null,
    Ut = null,
    At = null,
    tr = new Map(),
    nr = new Map(),
    $t = [],
    Ef =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
        " ",
      );
  function Gu(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        Ft = null;
        break;
      case "dragenter":
      case "dragleave":
        Ut = null;
        break;
      case "mouseover":
      case "mouseout":
        At = null;
        break;
      case "pointerover":
      case "pointerout":
        tr.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        nr.delete(t.pointerId);
    }
  }
  function rr(e, t, n, r, l, o) {
    return e === null || e.nativeEvent !== o
      ? ((e = {
          blockedOn: t,
          domEventName: n,
          eventSystemFlags: r,
          nativeEvent: o,
          targetContainers: [l],
        }),
        t !== null && ((t = yr(t)), t !== null && xo(t)),
        e)
      : ((e.eventSystemFlags |= r),
        (t = e.targetContainers),
        l !== null && t.indexOf(l) === -1 && t.push(l),
        e);
  }
  function Cf(e, t, n, r, l) {
    switch (t) {
      case "focusin":
        return ((Ft = rr(Ft, e, t, n, r, l)), !0);
      case "dragenter":
        return ((Ut = rr(Ut, e, t, n, r, l)), !0);
      case "mouseover":
        return ((At = rr(At, e, t, n, r, l)), !0);
      case "pointerover":
        var o = l.pointerId;
        return (tr.set(o, rr(tr.get(o) || null, e, t, n, r, l)), !0);
      case "gotpointercapture":
        return (
          (o = l.pointerId),
          nr.set(o, rr(nr.get(o) || null, e, t, n, r, l)),
          !0
        );
    }
    return !1;
  }
  function Xu(e) {
    var t = ln(e.target);
    if (t !== null) {
      var n = rn(t);
      if (n !== null) {
        if (((t = n.tag), t === 13)) {
          if (((t = Ou(n)), t !== null)) {
            ((e.blockedOn = t),
              qu(e.priority, function () {
                Ku(n);
              }));
            return;
          }
        } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function Gr(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var n = Eo(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
      if (n === null) {
        n = e.nativeEvent;
        var r = new n.constructor(n.type, n);
        ((so = r), n.target.dispatchEvent(r), (so = null));
      } else return ((t = yr(n)), t !== null && xo(t), (e.blockedOn = n), !1);
      t.shift();
    }
    return !0;
  }
  function Ju(e, t, n) {
    Gr(e) && n.delete(t);
  }
  function Rf() {
    ((ko = !1),
      Ft !== null && Gr(Ft) && (Ft = null),
      Ut !== null && Gr(Ut) && (Ut = null),
      At !== null && Gr(At) && (At = null),
      tr.forEach(Ju),
      nr.forEach(Ju));
  }
  function lr(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null),
      ko ||
        ((ko = !0),
        s.unstable_scheduleCallback(s.unstable_NormalPriority, Rf)));
  }
  function or(e) {
    function t(l) {
      return lr(l, e);
    }
    if (0 < qr.length) {
      lr(qr[0], e);
      for (var n = 1; n < qr.length; n++) {
        var r = qr[n];
        r.blockedOn === e && (r.blockedOn = null);
      }
    }
    for (
      Ft !== null && lr(Ft, e),
        Ut !== null && lr(Ut, e),
        At !== null && lr(At, e),
        tr.forEach(t),
        nr.forEach(t),
        n = 0;
      n < $t.length;
      n++
    )
      ((r = $t[n]), r.blockedOn === e && (r.blockedOn = null));
    for (; 0 < $t.length && ((n = $t[0]), n.blockedOn === null); )
      (Xu(n), n.blockedOn === null && $t.shift());
  }
  var kn = ne.ReactCurrentBatchConfig,
    Xr = !0;
  function jf(e, t, n, r) {
    var l = ae,
      o = kn.transition;
    kn.transition = null;
    try {
      ((ae = 1), So(e, t, n, r));
    } finally {
      ((ae = l), (kn.transition = o));
    }
  }
  function Nf(e, t, n, r) {
    var l = ae,
      o = kn.transition;
    kn.transition = null;
    try {
      ((ae = 4), So(e, t, n, r));
    } finally {
      ((ae = l), (kn.transition = o));
    }
  }
  function So(e, t, n, r) {
    if (Xr) {
      var l = Eo(e, t, n, r);
      if (l === null) ($o(e, t, r, Jr, n), Gu(e, r));
      else if (Cf(l, e, t, n, r)) r.stopPropagation();
      else if ((Gu(e, r), t & 4 && -1 < Ef.indexOf(e))) {
        for (; l !== null; ) {
          var o = yr(l);
          if (
            (o !== null && Qu(o),
            (o = Eo(e, t, n, r)),
            o === null && $o(e, t, r, Jr, n),
            o === l)
          )
            break;
          l = o;
        }
        l !== null && r.stopPropagation();
      } else $o(e, t, r, null, n);
    }
  }
  var Jr = null;
  function Eo(e, t, n, r) {
    if (((Jr = null), (e = co(r)), (e = ln(e)), e !== null))
      if (((t = rn(e)), t === null)) e = null;
      else if (((n = t.tag), n === 13)) {
        if (((e = Ou(t)), e !== null)) return e;
        e = null;
      } else if (n === 3) {
        if (t.stateNode.current.memoizedState.isDehydrated)
          return t.tag === 3 ? t.stateNode.containerInfo : null;
        e = null;
      } else t !== e && (e = null);
    return ((Jr = e), null);
  }
  function Zu(e) {
    switch (e) {
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 1;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "toggle":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 4;
      case "message":
        switch (hf()) {
          case vo:
            return 1;
          case Wu:
            return 4;
          case Hr:
          case mf:
            return 16;
          case Bu:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var Wt = null,
    Co = null,
    Zr = null;
  function bu() {
    if (Zr) return Zr;
    var e,
      t = Co,
      n = t.length,
      r,
      l = "value" in Wt ? Wt.value : Wt.textContent,
      o = l.length;
    for (e = 0; e < n && t[e] === l[e]; e++);
    var a = n - e;
    for (r = 1; r <= a && t[n - r] === l[o - r]; r++);
    return (Zr = l.slice(e, 1 < r ? 1 - r : void 0));
  }
  function br(e) {
    var t = e.keyCode;
    return (
      "charCode" in e
        ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
        : (e = t),
      e === 10 && (e = 13),
      32 <= e || e === 13 ? e : 0
    );
  }
  function el() {
    return !0;
  }
  function ea() {
    return !1;
  }
  function be(e) {
    function t(n, r, l, o, a) {
      ((this._reactName = n),
        (this._targetInst = l),
        (this.type = r),
        (this.nativeEvent = o),
        (this.target = a),
        (this.currentTarget = null));
      for (var p in e)
        e.hasOwnProperty(p) && ((n = e[p]), (this[p] = n ? n(o) : o[p]));
      return (
        (this.isDefaultPrevented = (
          o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1
        )
          ? el
          : ea),
        (this.isPropagationStopped = ea),
        this
      );
    }
    return (
      $(t.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var n = this.nativeEvent;
          n &&
            (n.preventDefault
              ? n.preventDefault()
              : typeof n.returnValue != "unknown" && (n.returnValue = !1),
            (this.isDefaultPrevented = el));
        },
        stopPropagation: function () {
          var n = this.nativeEvent;
          n &&
            (n.stopPropagation
              ? n.stopPropagation()
              : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
            (this.isPropagationStopped = el));
        },
        persist: function () {},
        isPersistent: el,
      }),
      t
    );
  }
  var Sn = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    Ro = be(Sn),
    ir = $({}, Sn, { view: 0, detail: 0 }),
    Pf = be(ir),
    jo,
    No,
    ur,
    tl = $({}, ir, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: _o,
      button: 0,
      buttons: 0,
      relatedTarget: function (e) {
        return e.relatedTarget === void 0
          ? e.fromElement === e.srcElement
            ? e.toElement
            : e.fromElement
          : e.relatedTarget;
      },
      movementX: function (e) {
        return "movementX" in e
          ? e.movementX
          : (e !== ur &&
              (ur && e.type === "mousemove"
                ? ((jo = e.screenX - ur.screenX), (No = e.screenY - ur.screenY))
                : (No = jo = 0),
              (ur = e)),
            jo);
      },
      movementY: function (e) {
        return "movementY" in e ? e.movementY : No;
      },
    }),
    ta = be(tl),
    _f = $({}, tl, { dataTransfer: 0 }),
    Lf = be(_f),
    Tf = $({}, ir, { relatedTarget: 0 }),
    Po = be(Tf),
    zf = $({}, Sn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Df = be(zf),
    Mf = $({}, Sn, {
      clipboardData: function (e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      },
    }),
    Of = be(Mf),
    If = $({}, Sn, { data: 0 }),
    na = be(If),
    Ff = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified",
    },
    Uf = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta",
    },
    Af = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey",
    };
  function $f(e) {
    var t = this.nativeEvent;
    return t.getModifierState
      ? t.getModifierState(e)
      : (e = Af[e])
        ? !!t[e]
        : !1;
  }
  function _o() {
    return $f;
  }
  var Wf = $({}, ir, {
      key: function (e) {
        if (e.key) {
          var t = Ff[e.key] || e.key;
          if (t !== "Unidentified") return t;
        }
        return e.type === "keypress"
          ? ((e = br(e)), e === 13 ? "Enter" : String.fromCharCode(e))
          : e.type === "keydown" || e.type === "keyup"
            ? Uf[e.keyCode] || "Unidentified"
            : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: _o,
      charCode: function (e) {
        return e.type === "keypress" ? br(e) : 0;
      },
      keyCode: function (e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function (e) {
        return e.type === "keypress"
          ? br(e)
          : e.type === "keydown" || e.type === "keyup"
            ? e.keyCode
            : 0;
      },
    }),
    Bf = be(Wf),
    Hf = $({}, tl, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    ra = be(Hf),
    Vf = $({}, ir, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: _o,
    }),
    Qf = be(Vf),
    Kf = $({}, Sn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Yf = be(Kf),
    qf = $({}, tl, {
      deltaX: function (e) {
        return "deltaX" in e
          ? e.deltaX
          : "wheelDeltaX" in e
            ? -e.wheelDeltaX
            : 0;
      },
      deltaY: function (e) {
        return "deltaY" in e
          ? e.deltaY
          : "wheelDeltaY" in e
            ? -e.wheelDeltaY
            : "wheelDelta" in e
              ? -e.wheelDelta
              : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    Gf = be(qf),
    Xf = [9, 13, 27, 32],
    Lo = E && "CompositionEvent" in window,
    ar = null;
  E && "documentMode" in document && (ar = document.documentMode);
  var Jf = E && "TextEvent" in window && !ar,
    la = E && (!Lo || (ar && 8 < ar && 11 >= ar)),
    oa = " ",
    ia = !1;
  function ua(e, t) {
    switch (e) {
      case "keyup":
        return Xf.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function aa(e) {
    return (
      (e = e.detail),
      typeof e == "object" && "data" in e ? e.data : null
    );
  }
  var En = !1;
  function Zf(e, t) {
    switch (e) {
      case "compositionend":
        return aa(t);
      case "keypress":
        return t.which !== 32 ? null : ((ia = !0), oa);
      case "textInput":
        return ((e = t.data), e === oa && ia ? null : e);
      default:
        return null;
    }
  }
  function bf(e, t) {
    if (En)
      return e === "compositionend" || (!Lo && ua(e, t))
        ? ((e = bu()), (Zr = Co = Wt = null), (En = !1), e)
        : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
          if (t.char && 1 < t.char.length) return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return la && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var ed = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  };
  function sa(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!ed[e.type] : t === "textarea";
  }
  function ca(e, t, n, r) {
    (Lu(r),
      (t = il(t, "onChange")),
      0 < t.length &&
        ((n = new Ro("onChange", "change", null, n, r)),
        e.push({ event: n, listeners: t })));
  }
  var sr = null,
    cr = null;
  function td(e) {
    Pa(e, 0);
  }
  function nl(e) {
    var t = Pn(e);
    if (gu(t)) return e;
  }
  function nd(e, t) {
    if (e === "change") return t;
  }
  var fa = !1;
  if (E) {
    var To;
    if (E) {
      var zo = "oninput" in document;
      if (!zo) {
        var da = document.createElement("div");
        (da.setAttribute("oninput", "return;"),
          (zo = typeof da.oninput == "function"));
      }
      To = zo;
    } else To = !1;
    fa = To && (!document.documentMode || 9 < document.documentMode);
  }
  function pa() {
    sr && (sr.detachEvent("onpropertychange", ha), (cr = sr = null));
  }
  function ha(e) {
    if (e.propertyName === "value" && nl(cr)) {
      var t = [];
      (ca(t, cr, e, co(e)), Mu(td, t));
    }
  }
  function rd(e, t, n) {
    e === "focusin"
      ? (pa(), (sr = t), (cr = n), sr.attachEvent("onpropertychange", ha))
      : e === "focusout" && pa();
  }
  function ld(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return nl(cr);
  }
  function od(e, t) {
    if (e === "click") return nl(t);
  }
  function id(e, t) {
    if (e === "input" || e === "change") return nl(t);
  }
  function ud(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
  }
  var dt = typeof Object.is == "function" ? Object.is : ud;
  function fr(e, t) {
    if (dt(e, t)) return !0;
    if (
      typeof e != "object" ||
      e === null ||
      typeof t != "object" ||
      t === null
    )
      return !1;
    var n = Object.keys(e),
      r = Object.keys(t);
    if (n.length !== r.length) return !1;
    for (r = 0; r < n.length; r++) {
      var l = n[r];
      if (!k.call(t, l) || !dt(e[l], t[l])) return !1;
    }
    return !0;
  }
  function ma(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function va(e, t) {
    var n = ma(e);
    e = 0;
    for (var r; n; ) {
      if (n.nodeType === 3) {
        if (((r = e + n.textContent.length), e <= t && r >= t))
          return { node: n, offset: t - e };
        e = r;
      }
      e: {
        for (; n; ) {
          if (n.nextSibling) {
            n = n.nextSibling;
            break e;
          }
          n = n.parentNode;
        }
        n = void 0;
      }
      n = ma(n);
    }
  }
  function ya(e, t) {
    return e && t
      ? e === t
        ? !0
        : e && e.nodeType === 3
          ? !1
          : t && t.nodeType === 3
            ? ya(e, t.parentNode)
            : "contains" in e
              ? e.contains(t)
              : e.compareDocumentPosition
                ? !!(e.compareDocumentPosition(t) & 16)
                : !1
      : !1;
  }
  function ga() {
    for (var e = window, t = Ar(); t instanceof e.HTMLIFrameElement; ) {
      try {
        var n = typeof t.contentWindow.location.href == "string";
      } catch {
        n = !1;
      }
      if (n) e = t.contentWindow;
      else break;
      t = Ar(e.document);
    }
    return t;
  }
  function Do(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return (
      t &&
      ((t === "input" &&
        (e.type === "text" ||
          e.type === "search" ||
          e.type === "tel" ||
          e.type === "url" ||
          e.type === "password")) ||
        t === "textarea" ||
        e.contentEditable === "true")
    );
  }
  function ad(e) {
    var t = ga(),
      n = e.focusedElem,
      r = e.selectionRange;
    if (
      t !== n &&
      n &&
      n.ownerDocument &&
      ya(n.ownerDocument.documentElement, n)
    ) {
      if (r !== null && Do(n)) {
        if (
          ((t = r.start),
          (e = r.end),
          e === void 0 && (e = t),
          "selectionStart" in n)
        )
          ((n.selectionStart = t),
            (n.selectionEnd = Math.min(e, n.value.length)));
        else if (
          ((e = ((t = n.ownerDocument || document) && t.defaultView) || window),
          e.getSelection)
        ) {
          e = e.getSelection();
          var l = n.textContent.length,
            o = Math.min(r.start, l);
          ((r = r.end === void 0 ? o : Math.min(r.end, l)),
            !e.extend && o > r && ((l = r), (r = o), (o = l)),
            (l = va(n, o)));
          var a = va(n, r);
          l &&
            a &&
            (e.rangeCount !== 1 ||
              e.anchorNode !== l.node ||
              e.anchorOffset !== l.offset ||
              e.focusNode !== a.node ||
              e.focusOffset !== a.offset) &&
            ((t = t.createRange()),
            t.setStart(l.node, l.offset),
            e.removeAllRanges(),
            o > r
              ? (e.addRange(t), e.extend(a.node, a.offset))
              : (t.setEnd(a.node, a.offset), e.addRange(t)));
        }
      }
      for (t = [], e = n; (e = e.parentNode); )
        e.nodeType === 1 &&
          t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
      for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++)
        ((e = t[n]),
          (e.element.scrollLeft = e.left),
          (e.element.scrollTop = e.top));
    }
  }
  var sd = E && "documentMode" in document && 11 >= document.documentMode,
    Cn = null,
    Mo = null,
    dr = null,
    Oo = !1;
  function wa(e, t, n) {
    var r =
      n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    Oo ||
      Cn == null ||
      Cn !== Ar(r) ||
      ((r = Cn),
      "selectionStart" in r && Do(r)
        ? (r = { start: r.selectionStart, end: r.selectionEnd })
        : ((r = (
            (r.ownerDocument && r.ownerDocument.defaultView) ||
            window
          ).getSelection()),
          (r = {
            anchorNode: r.anchorNode,
            anchorOffset: r.anchorOffset,
            focusNode: r.focusNode,
            focusOffset: r.focusOffset,
          })),
      (dr && fr(dr, r)) ||
        ((dr = r),
        (r = il(Mo, "onSelect")),
        0 < r.length &&
          ((t = new Ro("onSelect", "select", null, t, n)),
          e.push({ event: t, listeners: r }),
          (t.target = Cn))));
  }
  function rl(e, t) {
    var n = {};
    return (
      (n[e.toLowerCase()] = t.toLowerCase()),
      (n["Webkit" + e] = "webkit" + t),
      (n["Moz" + e] = "moz" + t),
      n
    );
  }
  var Rn = {
      animationend: rl("Animation", "AnimationEnd"),
      animationiteration: rl("Animation", "AnimationIteration"),
      animationstart: rl("Animation", "AnimationStart"),
      transitionend: rl("Transition", "TransitionEnd"),
    },
    Io = {},
    xa = {};
  E &&
    ((xa = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete Rn.animationend.animation,
      delete Rn.animationiteration.animation,
      delete Rn.animationstart.animation),
    "TransitionEvent" in window || delete Rn.transitionend.transition);
  function ll(e) {
    if (Io[e]) return Io[e];
    if (!Rn[e]) return e;
    var t = Rn[e],
      n;
    for (n in t) if (t.hasOwnProperty(n) && n in xa) return (Io[e] = t[n]);
    return e;
  }
  var ka = ll("animationend"),
    Sa = ll("animationiteration"),
    Ea = ll("animationstart"),
    Ca = ll("transitionend"),
    Ra = new Map(),
    ja =
      "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " ",
      );
  function Bt(e, t) {
    (Ra.set(e, t), h(t, [e]));
  }
  for (var Fo = 0; Fo < ja.length; Fo++) {
    var Uo = ja[Fo],
      cd = Uo.toLowerCase(),
      fd = Uo[0].toUpperCase() + Uo.slice(1);
    Bt(cd, "on" + fd);
  }
  (Bt(ka, "onAnimationEnd"),
    Bt(Sa, "onAnimationIteration"),
    Bt(Ea, "onAnimationStart"),
    Bt("dblclick", "onDoubleClick"),
    Bt("focusin", "onFocus"),
    Bt("focusout", "onBlur"),
    Bt(Ca, "onTransitionEnd"),
    y("onMouseEnter", ["mouseout", "mouseover"]),
    y("onMouseLeave", ["mouseout", "mouseover"]),
    y("onPointerEnter", ["pointerout", "pointerover"]),
    y("onPointerLeave", ["pointerout", "pointerover"]),
    h(
      "onChange",
      "change click focusin focusout input keydown keyup selectionchange".split(
        " ",
      ),
    ),
    h(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " ",
      ),
    ),
    h("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
    h(
      "onCompositionEnd",
      "compositionend focusout keydown keypress keyup mousedown".split(" "),
    ),
    h(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" "),
    ),
    h(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" "),
    ));
  var pr =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " ",
      ),
    dd = new Set(
      "cancel close invalid load scroll toggle".split(" ").concat(pr),
    );
  function Na(e, t, n) {
    var r = e.type || "unknown-event";
    ((e.currentTarget = n), cf(r, t, void 0, e), (e.currentTarget = null));
  }
  function Pa(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
      var r = e[n],
        l = r.event;
      r = r.listeners;
      e: {
        var o = void 0;
        if (t)
          for (var a = r.length - 1; 0 <= a; a--) {
            var p = r[a],
              m = p.instance,
              S = p.currentTarget;
            if (((p = p.listener), m !== o && l.isPropagationStopped()))
              break e;
            (Na(l, p, S), (o = m));
          }
        else
          for (a = 0; a < r.length; a++) {
            if (
              ((p = r[a]),
              (m = p.instance),
              (S = p.currentTarget),
              (p = p.listener),
              m !== o && l.isPropagationStopped())
            )
              break e;
            (Na(l, p, S), (o = m));
          }
      }
    }
    if (Br) throw ((e = mo), (Br = !1), (mo = null), e);
  }
  function de(e, t) {
    var n = t[Ko];
    n === void 0 && (n = t[Ko] = new Set());
    var r = e + "__bubble";
    n.has(r) || (_a(t, e, 2, !1), n.add(r));
  }
  function Ao(e, t, n) {
    var r = 0;
    (t && (r |= 4), _a(n, e, r, t));
  }
  var ol = "_reactListening" + Math.random().toString(36).slice(2);
  function hr(e) {
    if (!e[ol]) {
      ((e[ol] = !0),
        f.forEach(function (n) {
          n !== "selectionchange" && (dd.has(n) || Ao(n, !1, e), Ao(n, !0, e));
        }));
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[ol] || ((t[ol] = !0), Ao("selectionchange", !1, t));
    }
  }
  function _a(e, t, n, r) {
    switch (Zu(t)) {
      case 1:
        var l = jf;
        break;
      case 4:
        l = Nf;
        break;
      default:
        l = So;
    }
    ((n = l.bind(null, t, n, e)),
      (l = void 0),
      !ho ||
        (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
        (l = !0),
      r
        ? l !== void 0
          ? e.addEventListener(t, n, { capture: !0, passive: l })
          : e.addEventListener(t, n, !0)
        : l !== void 0
          ? e.addEventListener(t, n, { passive: l })
          : e.addEventListener(t, n, !1));
  }
  function $o(e, t, n, r, l) {
    var o = r;
    if ((t & 1) === 0 && (t & 2) === 0 && r !== null)
      e: for (;;) {
        if (r === null) return;
        var a = r.tag;
        if (a === 3 || a === 4) {
          var p = r.stateNode.containerInfo;
          if (p === l || (p.nodeType === 8 && p.parentNode === l)) break;
          if (a === 4)
            for (a = r.return; a !== null; ) {
              var m = a.tag;
              if (
                (m === 3 || m === 4) &&
                ((m = a.stateNode.containerInfo),
                m === l || (m.nodeType === 8 && m.parentNode === l))
              )
                return;
              a = a.return;
            }
          for (; p !== null; ) {
            if (((a = ln(p)), a === null)) return;
            if (((m = a.tag), m === 5 || m === 6)) {
              r = o = a;
              continue e;
            }
            p = p.parentNode;
          }
        }
        r = r.return;
      }
    Mu(function () {
      var S = o,
        L = co(n),
        T = [];
      e: {
        var P = Ra.get(e);
        if (P !== void 0) {
          var F = Ro,
            W = e;
          switch (e) {
            case "keypress":
              if (br(n) === 0) break e;
            case "keydown":
            case "keyup":
              F = Bf;
              break;
            case "focusin":
              ((W = "focus"), (F = Po));
              break;
            case "focusout":
              ((W = "blur"), (F = Po));
              break;
            case "beforeblur":
            case "afterblur":
              F = Po;
              break;
            case "click":
              if (n.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              F = ta;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              F = Lf;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              F = Qf;
              break;
            case ka:
            case Sa:
            case Ea:
              F = Df;
              break;
            case Ca:
              F = Yf;
              break;
            case "scroll":
              F = Pf;
              break;
            case "wheel":
              F = Gf;
              break;
            case "copy":
            case "cut":
            case "paste":
              F = Of;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              F = ra;
          }
          var B = (t & 4) !== 0,
            Ee = !B && e === "scroll",
            w = B ? (P !== null ? P + "Capture" : null) : P;
          B = [];
          for (var v = S, x; v !== null; ) {
            x = v;
            var z = x.stateNode;
            if (
              (x.tag === 5 &&
                z !== null &&
                ((x = z),
                w !== null &&
                  ((z = Xn(v, w)), z != null && B.push(mr(v, z, x)))),
              Ee)
            )
              break;
            v = v.return;
          }
          0 < B.length &&
            ((P = new F(P, W, null, n, L)), T.push({ event: P, listeners: B }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (
            ((P = e === "mouseover" || e === "pointerover"),
            (F = e === "mouseout" || e === "pointerout"),
            P &&
              n !== so &&
              (W = n.relatedTarget || n.fromElement) &&
              (ln(W) || W[jt]))
          )
            break e;
          if (
            (F || P) &&
            ((P =
              L.window === L
                ? L
                : (P = L.ownerDocument)
                  ? P.defaultView || P.parentWindow
                  : window),
            F
              ? ((W = n.relatedTarget || n.toElement),
                (F = S),
                (W = W ? ln(W) : null),
                W !== null &&
                  ((Ee = rn(W)), W !== Ee || (W.tag !== 5 && W.tag !== 6)) &&
                  (W = null))
              : ((F = null), (W = S)),
            F !== W)
          ) {
            if (
              ((B = ta),
              (z = "onMouseLeave"),
              (w = "onMouseEnter"),
              (v = "mouse"),
              (e === "pointerout" || e === "pointerover") &&
                ((B = ra),
                (z = "onPointerLeave"),
                (w = "onPointerEnter"),
                (v = "pointer")),
              (Ee = F == null ? P : Pn(F)),
              (x = W == null ? P : Pn(W)),
              (P = new B(z, v + "leave", F, n, L)),
              (P.target = Ee),
              (P.relatedTarget = x),
              (z = null),
              ln(L) === S &&
                ((B = new B(w, v + "enter", W, n, L)),
                (B.target = x),
                (B.relatedTarget = Ee),
                (z = B)),
              (Ee = z),
              F && W)
            )
              t: {
                for (B = F, w = W, v = 0, x = B; x; x = jn(x)) v++;
                for (x = 0, z = w; z; z = jn(z)) x++;
                for (; 0 < v - x; ) ((B = jn(B)), v--);
                for (; 0 < x - v; ) ((w = jn(w)), x--);
                for (; v--; ) {
                  if (B === w || (w !== null && B === w.alternate)) break t;
                  ((B = jn(B)), (w = jn(w)));
                }
                B = null;
              }
            else B = null;
            (F !== null && La(T, P, F, B, !1),
              W !== null && Ee !== null && La(T, Ee, W, B, !0));
          }
        }
        e: {
          if (
            ((P = S ? Pn(S) : window),
            (F = P.nodeName && P.nodeName.toLowerCase()),
            F === "select" || (F === "input" && P.type === "file"))
          )
            var H = nd;
          else if (sa(P))
            if (fa) H = id;
            else {
              H = ld;
              var K = rd;
            }
          else
            (F = P.nodeName) &&
              F.toLowerCase() === "input" &&
              (P.type === "checkbox" || P.type === "radio") &&
              (H = od);
          if (H && (H = H(e, S))) {
            ca(T, H, n, L);
            break e;
          }
          (K && K(e, P, S),
            e === "focusout" &&
              (K = P._wrapperState) &&
              K.controlled &&
              P.type === "number" &&
              lo(P, "number", P.value));
        }
        switch (((K = S ? Pn(S) : window), e)) {
          case "focusin":
            (sa(K) || K.contentEditable === "true") &&
              ((Cn = K), (Mo = S), (dr = null));
            break;
          case "focusout":
            dr = Mo = Cn = null;
            break;
          case "mousedown":
            Oo = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            ((Oo = !1), wa(T, n, L));
            break;
          case "selectionchange":
            if (sd) break;
          case "keydown":
          case "keyup":
            wa(T, n, L);
        }
        var Y;
        if (Lo)
          e: {
            switch (e) {
              case "compositionstart":
                var G = "onCompositionStart";
                break e;
              case "compositionend":
                G = "onCompositionEnd";
                break e;
              case "compositionupdate":
                G = "onCompositionUpdate";
                break e;
            }
            G = void 0;
          }
        else
          En
            ? ua(e, n) && (G = "onCompositionEnd")
            : e === "keydown" &&
              n.keyCode === 229 &&
              (G = "onCompositionStart");
        (G &&
          (la &&
            n.locale !== "ko" &&
            (En || G !== "onCompositionStart"
              ? G === "onCompositionEnd" && En && (Y = bu())
              : ((Wt = L),
                (Co = "value" in Wt ? Wt.value : Wt.textContent),
                (En = !0))),
          (K = il(S, G)),
          0 < K.length &&
            ((G = new na(G, e, null, n, L)),
            T.push({ event: G, listeners: K }),
            Y ? (G.data = Y) : ((Y = aa(n)), Y !== null && (G.data = Y)))),
          (Y = Jf ? Zf(e, n) : bf(e, n)) &&
            ((S = il(S, "onBeforeInput")),
            0 < S.length &&
              ((L = new na("onBeforeInput", "beforeinput", null, n, L)),
              T.push({ event: L, listeners: S }),
              (L.data = Y))));
      }
      Pa(T, t);
    });
  }
  function mr(e, t, n) {
    return { instance: e, listener: t, currentTarget: n };
  }
  function il(e, t) {
    for (var n = t + "Capture", r = []; e !== null; ) {
      var l = e,
        o = l.stateNode;
      (l.tag === 5 &&
        o !== null &&
        ((l = o),
        (o = Xn(e, n)),
        o != null && r.unshift(mr(e, o, l)),
        (o = Xn(e, t)),
        o != null && r.push(mr(e, o, l))),
        (e = e.return));
    }
    return r;
  }
  function jn(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5);
    return e || null;
  }
  function La(e, t, n, r, l) {
    for (var o = t._reactName, a = []; n !== null && n !== r; ) {
      var p = n,
        m = p.alternate,
        S = p.stateNode;
      if (m !== null && m === r) break;
      (p.tag === 5 &&
        S !== null &&
        ((p = S),
        l
          ? ((m = Xn(n, o)), m != null && a.unshift(mr(n, m, p)))
          : l || ((m = Xn(n, o)), m != null && a.push(mr(n, m, p)))),
        (n = n.return));
    }
    a.length !== 0 && e.push({ event: t, listeners: a });
  }
  var pd = /\r\n?/g,
    hd = /\u0000|\uFFFD/g;
  function Ta(e) {
    return (typeof e == "string" ? e : "" + e)
      .replace(
        pd,
        `
`,
      )
      .replace(hd, "");
  }
  function ul(e, t, n) {
    if (((t = Ta(t)), Ta(e) !== t && n)) throw Error(u(425));
  }
  function al() {}
  var Wo = null,
    Bo = null;
  function Ho(e, t) {
    return (
      e === "textarea" ||
      e === "noscript" ||
      typeof t.children == "string" ||
      typeof t.children == "number" ||
      (typeof t.dangerouslySetInnerHTML == "object" &&
        t.dangerouslySetInnerHTML !== null &&
        t.dangerouslySetInnerHTML.__html != null)
    );
  }
  var Vo = typeof setTimeout == "function" ? setTimeout : void 0,
    md = typeof clearTimeout == "function" ? clearTimeout : void 0,
    za = typeof Promise == "function" ? Promise : void 0,
    vd =
      typeof queueMicrotask == "function"
        ? queueMicrotask
        : typeof za < "u"
          ? function (e) {
              return za.resolve(null).then(e).catch(yd);
            }
          : Vo;
  function yd(e) {
    setTimeout(function () {
      throw e;
    });
  }
  function Qo(e, t) {
    var n = t,
      r = 0;
    do {
      var l = n.nextSibling;
      if ((e.removeChild(n), l && l.nodeType === 8))
        if (((n = l.data), n === "/$")) {
          if (r === 0) {
            (e.removeChild(l), or(t));
            return;
          }
          r--;
        } else (n !== "$" && n !== "$?" && n !== "$!") || r++;
      n = l;
    } while (n);
    or(t);
  }
  function Ht(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (((t = e.data), t === "$" || t === "$!" || t === "$?")) break;
        if (t === "/$") return null;
      }
    }
    return e;
  }
  function Da(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var n = e.data;
        if (n === "$" || n === "$!" || n === "$?") {
          if (t === 0) return e;
          t--;
        } else n === "/$" && t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  var Nn = Math.random().toString(36).slice(2),
    xt = "__reactFiber$" + Nn,
    vr = "__reactProps$" + Nn,
    jt = "__reactContainer$" + Nn,
    Ko = "__reactEvents$" + Nn,
    gd = "__reactListeners$" + Nn,
    wd = "__reactHandles$" + Nn;
  function ln(e) {
    var t = e[xt];
    if (t) return t;
    for (var n = e.parentNode; n; ) {
      if ((t = n[jt] || n[xt])) {
        if (
          ((n = t.alternate),
          t.child !== null || (n !== null && n.child !== null))
        )
          for (e = Da(e); e !== null; ) {
            if ((n = e[xt])) return n;
            e = Da(e);
          }
        return t;
      }
      ((e = n), (n = e.parentNode));
    }
    return null;
  }
  function yr(e) {
    return (
      (e = e[xt] || e[jt]),
      !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3)
        ? null
        : e
    );
  }
  function Pn(e) {
    if (e.tag === 5 || e.tag === 6) return e.stateNode;
    throw Error(u(33));
  }
  function sl(e) {
    return e[vr] || null;
  }
  var Yo = [],
    _n = -1;
  function Vt(e) {
    return { current: e };
  }
  function pe(e) {
    0 > _n || ((e.current = Yo[_n]), (Yo[_n] = null), _n--);
  }
  function fe(e, t) {
    (_n++, (Yo[_n] = e.current), (e.current = t));
  }
  var Qt = {},
    Ie = Vt(Qt),
    Qe = Vt(!1),
    on = Qt;
  function Ln(e, t) {
    var n = e.type.contextTypes;
    if (!n) return Qt;
    var r = e.stateNode;
    if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
      return r.__reactInternalMemoizedMaskedChildContext;
    var l = {},
      o;
    for (o in n) l[o] = t[o];
    return (
      r &&
        ((e = e.stateNode),
        (e.__reactInternalMemoizedUnmaskedChildContext = t),
        (e.__reactInternalMemoizedMaskedChildContext = l)),
      l
    );
  }
  function Ke(e) {
    return ((e = e.childContextTypes), e != null);
  }
  function cl() {
    (pe(Qe), pe(Ie));
  }
  function Ma(e, t, n) {
    if (Ie.current !== Qt) throw Error(u(168));
    (fe(Ie, t), fe(Qe, n));
  }
  function Oa(e, t, n) {
    var r = e.stateNode;
    if (((t = t.childContextTypes), typeof r.getChildContext != "function"))
      return n;
    r = r.getChildContext();
    for (var l in r) if (!(l in t)) throw Error(u(108, ce(e) || "Unknown", l));
    return $({}, n, r);
  }
  function fl(e) {
    return (
      (e =
        ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) ||
        Qt),
      (on = Ie.current),
      fe(Ie, e),
      fe(Qe, Qe.current),
      !0
    );
  }
  function Ia(e, t, n) {
    var r = e.stateNode;
    if (!r) throw Error(u(169));
    (n
      ? ((e = Oa(e, t, on)),
        (r.__reactInternalMemoizedMergedChildContext = e),
        pe(Qe),
        pe(Ie),
        fe(Ie, e))
      : pe(Qe),
      fe(Qe, n));
  }
  var Nt = null,
    dl = !1,
    qo = !1;
  function Fa(e) {
    Nt === null ? (Nt = [e]) : Nt.push(e);
  }
  function xd(e) {
    ((dl = !0), Fa(e));
  }
  function Kt() {
    if (!qo && Nt !== null) {
      qo = !0;
      var e = 0,
        t = ae;
      try {
        var n = Nt;
        for (ae = 1; e < n.length; e++) {
          var r = n[e];
          do r = r(!0);
          while (r !== null);
        }
        ((Nt = null), (dl = !1));
      } catch (l) {
        throw (Nt !== null && (Nt = Nt.slice(e + 1)), Au(vo, Kt), l);
      } finally {
        ((ae = t), (qo = !1));
      }
    }
    return null;
  }
  var Tn = [],
    zn = 0,
    pl = null,
    hl = 0,
    lt = [],
    ot = 0,
    un = null,
    Pt = 1,
    _t = "";
  function an(e, t) {
    ((Tn[zn++] = hl), (Tn[zn++] = pl), (pl = e), (hl = t));
  }
  function Ua(e, t, n) {
    ((lt[ot++] = Pt), (lt[ot++] = _t), (lt[ot++] = un), (un = e));
    var r = Pt;
    e = _t;
    var l = 32 - ft(r) - 1;
    ((r &= ~(1 << l)), (n += 1));
    var o = 32 - ft(t) + l;
    if (30 < o) {
      var a = l - (l % 5);
      ((o = (r & ((1 << a) - 1)).toString(32)),
        (r >>= a),
        (l -= a),
        (Pt = (1 << (32 - ft(t) + l)) | (n << l) | r),
        (_t = o + e));
    } else ((Pt = (1 << o) | (n << l) | r), (_t = e));
  }
  function Go(e) {
    e.return !== null && (an(e, 1), Ua(e, 1, 0));
  }
  function Xo(e) {
    for (; e === pl; )
      ((pl = Tn[--zn]), (Tn[zn] = null), (hl = Tn[--zn]), (Tn[zn] = null));
    for (; e === un; )
      ((un = lt[--ot]),
        (lt[ot] = null),
        (_t = lt[--ot]),
        (lt[ot] = null),
        (Pt = lt[--ot]),
        (lt[ot] = null));
  }
  var et = null,
    tt = null,
    me = !1,
    pt = null;
  function Aa(e, t) {
    var n = st(5, null, null, 0);
    ((n.elementType = "DELETED"),
      (n.stateNode = t),
      (n.return = e),
      (t = e.deletions),
      t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n));
  }
  function $a(e, t) {
    switch (e.tag) {
      case 5:
        var n = e.type;
        return (
          (t =
            t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase()
              ? null
              : t),
          t !== null
            ? ((e.stateNode = t), (et = e), (tt = Ht(t.firstChild)), !0)
            : !1
        );
      case 6:
        return (
          (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
          t !== null ? ((e.stateNode = t), (et = e), (tt = null), !0) : !1
        );
      case 13:
        return (
          (t = t.nodeType !== 8 ? null : t),
          t !== null
            ? ((n = un !== null ? { id: Pt, overflow: _t } : null),
              (e.memoizedState = {
                dehydrated: t,
                treeContext: n,
                retryLane: 1073741824,
              }),
              (n = st(18, null, null, 0)),
              (n.stateNode = t),
              (n.return = e),
              (e.child = n),
              (et = e),
              (tt = null),
              !0)
            : !1
        );
      default:
        return !1;
    }
  }
  function Jo(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
  }
  function Zo(e) {
    if (me) {
      var t = tt;
      if (t) {
        var n = t;
        if (!$a(e, t)) {
          if (Jo(e)) throw Error(u(418));
          t = Ht(n.nextSibling);
          var r = et;
          t && $a(e, t)
            ? Aa(r, n)
            : ((e.flags = (e.flags & -4097) | 2), (me = !1), (et = e));
        }
      } else {
        if (Jo(e)) throw Error(u(418));
        ((e.flags = (e.flags & -4097) | 2), (me = !1), (et = e));
      }
    }
  }
  function Wa(e) {
    for (
      e = e.return;
      e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13;
    )
      e = e.return;
    et = e;
  }
  function ml(e) {
    if (e !== et) return !1;
    if (!me) return (Wa(e), (me = !0), !1);
    var t;
    if (
      ((t = e.tag !== 3) &&
        !(t = e.tag !== 5) &&
        ((t = e.type),
        (t = t !== "head" && t !== "body" && !Ho(e.type, e.memoizedProps))),
      t && (t = tt))
    ) {
      if (Jo(e)) throw (Ba(), Error(u(418)));
      for (; t; ) (Aa(e, t), (t = Ht(t.nextSibling)));
    }
    if ((Wa(e), e.tag === 13)) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
        throw Error(u(317));
      e: {
        for (e = e.nextSibling, t = 0; e; ) {
          if (e.nodeType === 8) {
            var n = e.data;
            if (n === "/$") {
              if (t === 0) {
                tt = Ht(e.nextSibling);
                break e;
              }
              t--;
            } else (n !== "$" && n !== "$!" && n !== "$?") || t++;
          }
          e = e.nextSibling;
        }
        tt = null;
      }
    } else tt = et ? Ht(e.stateNode.nextSibling) : null;
    return !0;
  }
  function Ba() {
    for (var e = tt; e; ) e = Ht(e.nextSibling);
  }
  function Dn() {
    ((tt = et = null), (me = !1));
  }
  function bo(e) {
    pt === null ? (pt = [e]) : pt.push(e);
  }
  var kd = ne.ReactCurrentBatchConfig;
  function gr(e, t, n) {
    if (
      ((e = n.ref),
      e !== null && typeof e != "function" && typeof e != "object")
    ) {
      if (n._owner) {
        if (((n = n._owner), n)) {
          if (n.tag !== 1) throw Error(u(309));
          var r = n.stateNode;
        }
        if (!r) throw Error(u(147, e));
        var l = r,
          o = "" + e;
        return t !== null &&
          t.ref !== null &&
          typeof t.ref == "function" &&
          t.ref._stringRef === o
          ? t.ref
          : ((t = function (a) {
              var p = l.refs;
              a === null ? delete p[o] : (p[o] = a);
            }),
            (t._stringRef = o),
            t);
      }
      if (typeof e != "string") throw Error(u(284));
      if (!n._owner) throw Error(u(290, e));
    }
    return e;
  }
  function vl(e, t) {
    throw (
      (e = Object.prototype.toString.call(t)),
      Error(
        u(
          31,
          e === "[object Object]"
            ? "object with keys {" + Object.keys(t).join(", ") + "}"
            : e,
        ),
      )
    );
  }
  function Ha(e) {
    var t = e._init;
    return t(e._payload);
  }
  function Va(e) {
    function t(w, v) {
      if (e) {
        var x = w.deletions;
        x === null ? ((w.deletions = [v]), (w.flags |= 16)) : x.push(v);
      }
    }
    function n(w, v) {
      if (!e) return null;
      for (; v !== null; ) (t(w, v), (v = v.sibling));
      return null;
    }
    function r(w, v) {
      for (w = new Map(); v !== null; )
        (v.key !== null ? w.set(v.key, v) : w.set(v.index, v), (v = v.sibling));
      return w;
    }
    function l(w, v) {
      return ((w = en(w, v)), (w.index = 0), (w.sibling = null), w);
    }
    function o(w, v, x) {
      return (
        (w.index = x),
        e
          ? ((x = w.alternate),
            x !== null
              ? ((x = x.index), x < v ? ((w.flags |= 2), v) : x)
              : ((w.flags |= 2), v))
          : ((w.flags |= 1048576), v)
      );
    }
    function a(w) {
      return (e && w.alternate === null && (w.flags |= 2), w);
    }
    function p(w, v, x, z) {
      return v === null || v.tag !== 6
        ? ((v = Vi(x, w.mode, z)), (v.return = w), v)
        : ((v = l(v, x)), (v.return = w), v);
    }
    function m(w, v, x, z) {
      var H = x.type;
      return H === ve
        ? L(w, v, x.props.children, z, x.key)
        : v !== null &&
            (v.elementType === H ||
              (typeof H == "object" &&
                H !== null &&
                H.$$typeof === Ve &&
                Ha(H) === v.type))
          ? ((z = l(v, x.props)), (z.ref = gr(w, v, x)), (z.return = w), z)
          : ((z = $l(x.type, x.key, x.props, null, w.mode, z)),
            (z.ref = gr(w, v, x)),
            (z.return = w),
            z);
    }
    function S(w, v, x, z) {
      return v === null ||
        v.tag !== 4 ||
        v.stateNode.containerInfo !== x.containerInfo ||
        v.stateNode.implementation !== x.implementation
        ? ((v = Qi(x, w.mode, z)), (v.return = w), v)
        : ((v = l(v, x.children || [])), (v.return = w), v);
    }
    function L(w, v, x, z, H) {
      return v === null || v.tag !== 7
        ? ((v = vn(x, w.mode, z, H)), (v.return = w), v)
        : ((v = l(v, x)), (v.return = w), v);
    }
    function T(w, v, x) {
      if ((typeof v == "string" && v !== "") || typeof v == "number")
        return ((v = Vi("" + v, w.mode, x)), (v.return = w), v);
      if (typeof v == "object" && v !== null) {
        switch (v.$$typeof) {
          case ie:
            return (
              (x = $l(v.type, v.key, v.props, null, w.mode, x)),
              (x.ref = gr(w, null, v)),
              (x.return = w),
              x
            );
          case se:
            return ((v = Qi(v, w.mode, x)), (v.return = w), v);
          case Ve:
            var z = v._init;
            return T(w, z(v._payload), x);
        }
        if (Yn(v) || q(v))
          return ((v = vn(v, w.mode, x, null)), (v.return = w), v);
        vl(w, v);
      }
      return null;
    }
    function P(w, v, x, z) {
      var H = v !== null ? v.key : null;
      if ((typeof x == "string" && x !== "") || typeof x == "number")
        return H !== null ? null : p(w, v, "" + x, z);
      if (typeof x == "object" && x !== null) {
        switch (x.$$typeof) {
          case ie:
            return x.key === H ? m(w, v, x, z) : null;
          case se:
            return x.key === H ? S(w, v, x, z) : null;
          case Ve:
            return ((H = x._init), P(w, v, H(x._payload), z));
        }
        if (Yn(x) || q(x)) return H !== null ? null : L(w, v, x, z, null);
        vl(w, x);
      }
      return null;
    }
    function F(w, v, x, z, H) {
      if ((typeof z == "string" && z !== "") || typeof z == "number")
        return ((w = w.get(x) || null), p(v, w, "" + z, H));
      if (typeof z == "object" && z !== null) {
        switch (z.$$typeof) {
          case ie:
            return (
              (w = w.get(z.key === null ? x : z.key) || null),
              m(v, w, z, H)
            );
          case se:
            return (
              (w = w.get(z.key === null ? x : z.key) || null),
              S(v, w, z, H)
            );
          case Ve:
            var K = z._init;
            return F(w, v, x, K(z._payload), H);
        }
        if (Yn(z) || q(z)) return ((w = w.get(x) || null), L(v, w, z, H, null));
        vl(v, z);
      }
      return null;
    }
    function W(w, v, x, z) {
      for (
        var H = null, K = null, Y = v, G = (v = 0), Te = null;
        Y !== null && G < x.length;
        G++
      ) {
        Y.index > G ? ((Te = Y), (Y = null)) : (Te = Y.sibling);
        var oe = P(w, Y, x[G], z);
        if (oe === null) {
          Y === null && (Y = Te);
          break;
        }
        (e && Y && oe.alternate === null && t(w, Y),
          (v = o(oe, v, G)),
          K === null ? (H = oe) : (K.sibling = oe),
          (K = oe),
          (Y = Te));
      }
      if (G === x.length) return (n(w, Y), me && an(w, G), H);
      if (Y === null) {
        for (; G < x.length; G++)
          ((Y = T(w, x[G], z)),
            Y !== null &&
              ((v = o(Y, v, G)),
              K === null ? (H = Y) : (K.sibling = Y),
              (K = Y)));
        return (me && an(w, G), H);
      }
      for (Y = r(w, Y); G < x.length; G++)
        ((Te = F(Y, w, G, x[G], z)),
          Te !== null &&
            (e &&
              Te.alternate !== null &&
              Y.delete(Te.key === null ? G : Te.key),
            (v = o(Te, v, G)),
            K === null ? (H = Te) : (K.sibling = Te),
            (K = Te)));
      return (
        e &&
          Y.forEach(function (tn) {
            return t(w, tn);
          }),
        me && an(w, G),
        H
      );
    }
    function B(w, v, x, z) {
      var H = q(x);
      if (typeof H != "function") throw Error(u(150));
      if (((x = H.call(x)), x == null)) throw Error(u(151));
      for (
        var K = (H = null), Y = v, G = (v = 0), Te = null, oe = x.next();
        Y !== null && !oe.done;
        G++, oe = x.next()
      ) {
        Y.index > G ? ((Te = Y), (Y = null)) : (Te = Y.sibling);
        var tn = P(w, Y, oe.value, z);
        if (tn === null) {
          Y === null && (Y = Te);
          break;
        }
        (e && Y && tn.alternate === null && t(w, Y),
          (v = o(tn, v, G)),
          K === null ? (H = tn) : (K.sibling = tn),
          (K = tn),
          (Y = Te));
      }
      if (oe.done) return (n(w, Y), me && an(w, G), H);
      if (Y === null) {
        for (; !oe.done; G++, oe = x.next())
          ((oe = T(w, oe.value, z)),
            oe !== null &&
              ((v = o(oe, v, G)),
              K === null ? (H = oe) : (K.sibling = oe),
              (K = oe)));
        return (me && an(w, G), H);
      }
      for (Y = r(w, Y); !oe.done; G++, oe = x.next())
        ((oe = F(Y, w, G, oe.value, z)),
          oe !== null &&
            (e &&
              oe.alternate !== null &&
              Y.delete(oe.key === null ? G : oe.key),
            (v = o(oe, v, G)),
            K === null ? (H = oe) : (K.sibling = oe),
            (K = oe)));
      return (
        e &&
          Y.forEach(function (ep) {
            return t(w, ep);
          }),
        me && an(w, G),
        H
      );
    }
    function Ee(w, v, x, z) {
      if (
        (typeof x == "object" &&
          x !== null &&
          x.type === ve &&
          x.key === null &&
          (x = x.props.children),
        typeof x == "object" && x !== null)
      ) {
        switch (x.$$typeof) {
          case ie:
            e: {
              for (var H = x.key, K = v; K !== null; ) {
                if (K.key === H) {
                  if (((H = x.type), H === ve)) {
                    if (K.tag === 7) {
                      (n(w, K.sibling),
                        (v = l(K, x.props.children)),
                        (v.return = w),
                        (w = v));
                      break e;
                    }
                  } else if (
                    K.elementType === H ||
                    (typeof H == "object" &&
                      H !== null &&
                      H.$$typeof === Ve &&
                      Ha(H) === K.type)
                  ) {
                    (n(w, K.sibling),
                      (v = l(K, x.props)),
                      (v.ref = gr(w, K, x)),
                      (v.return = w),
                      (w = v));
                    break e;
                  }
                  n(w, K);
                  break;
                } else t(w, K);
                K = K.sibling;
              }
              x.type === ve
                ? ((v = vn(x.props.children, w.mode, z, x.key)),
                  (v.return = w),
                  (w = v))
                : ((z = $l(x.type, x.key, x.props, null, w.mode, z)),
                  (z.ref = gr(w, v, x)),
                  (z.return = w),
                  (w = z));
            }
            return a(w);
          case se:
            e: {
              for (K = x.key; v !== null; ) {
                if (v.key === K)
                  if (
                    v.tag === 4 &&
                    v.stateNode.containerInfo === x.containerInfo &&
                    v.stateNode.implementation === x.implementation
                  ) {
                    (n(w, v.sibling),
                      (v = l(v, x.children || [])),
                      (v.return = w),
                      (w = v));
                    break e;
                  } else {
                    n(w, v);
                    break;
                  }
                else t(w, v);
                v = v.sibling;
              }
              ((v = Qi(x, w.mode, z)), (v.return = w), (w = v));
            }
            return a(w);
          case Ve:
            return ((K = x._init), Ee(w, v, K(x._payload), z));
        }
        if (Yn(x)) return W(w, v, x, z);
        if (q(x)) return B(w, v, x, z);
        vl(w, x);
      }
      return (typeof x == "string" && x !== "") || typeof x == "number"
        ? ((x = "" + x),
          v !== null && v.tag === 6
            ? (n(w, v.sibling), (v = l(v, x)), (v.return = w), (w = v))
            : (n(w, v), (v = Vi(x, w.mode, z)), (v.return = w), (w = v)),
          a(w))
        : n(w, v);
    }
    return Ee;
  }
  var Mn = Va(!0),
    Qa = Va(!1),
    yl = Vt(null),
    gl = null,
    On = null,
    ei = null;
  function ti() {
    ei = On = gl = null;
  }
  function ni(e) {
    var t = yl.current;
    (pe(yl), (e._currentValue = t));
  }
  function ri(e, t, n) {
    for (; e !== null; ) {
      var r = e.alternate;
      if (
        ((e.childLanes & t) !== t
          ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
          : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
        e === n)
      )
        break;
      e = e.return;
    }
  }
  function In(e, t) {
    ((gl = e),
      (ei = On = null),
      (e = e.dependencies),
      e !== null &&
        e.firstContext !== null &&
        ((e.lanes & t) !== 0 && (Ye = !0), (e.firstContext = null)));
  }
  function it(e) {
    var t = e._currentValue;
    if (ei !== e)
      if (((e = { context: e, memoizedValue: t, next: null }), On === null)) {
        if (gl === null) throw Error(u(308));
        ((On = e), (gl.dependencies = { lanes: 0, firstContext: e }));
      } else On = On.next = e;
    return t;
  }
  var sn = null;
  function li(e) {
    sn === null ? (sn = [e]) : sn.push(e);
  }
  function Ka(e, t, n, r) {
    var l = t.interleaved;
    return (
      l === null ? ((n.next = n), li(t)) : ((n.next = l.next), (l.next = n)),
      (t.interleaved = n),
      Lt(e, r)
    );
  }
  function Lt(e, t) {
    e.lanes |= t;
    var n = e.alternate;
    for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
      ((e.childLanes |= t),
        (n = e.alternate),
        n !== null && (n.childLanes |= t),
        (n = e),
        (e = e.return));
    return n.tag === 3 ? n.stateNode : null;
  }
  var Yt = !1;
  function oi(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, interleaved: null, lanes: 0 },
      effects: null,
    };
  }
  function Ya(e, t) {
    ((e = e.updateQueue),
      t.updateQueue === e &&
        (t.updateQueue = {
          baseState: e.baseState,
          firstBaseUpdate: e.firstBaseUpdate,
          lastBaseUpdate: e.lastBaseUpdate,
          shared: e.shared,
          effects: e.effects,
        }));
  }
  function Tt(e, t) {
    return {
      eventTime: e,
      lane: t,
      tag: 0,
      payload: null,
      callback: null,
      next: null,
    };
  }
  function qt(e, t, n) {
    var r = e.updateQueue;
    if (r === null) return null;
    if (((r = r.shared), (te & 2) !== 0)) {
      var l = r.pending;
      return (
        l === null ? (t.next = t) : ((t.next = l.next), (l.next = t)),
        (r.pending = t),
        Lt(e, n)
      );
    }
    return (
      (l = r.interleaved),
      l === null ? ((t.next = t), li(r)) : ((t.next = l.next), (l.next = t)),
      (r.interleaved = t),
      Lt(e, n)
    );
  }
  function wl(e, t, n) {
    if (
      ((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))
    ) {
      var r = t.lanes;
      ((r &= e.pendingLanes), (n |= r), (t.lanes = n), wo(e, n));
    }
  }
  function qa(e, t) {
    var n = e.updateQueue,
      r = e.alternate;
    if (r !== null && ((r = r.updateQueue), n === r)) {
      var l = null,
        o = null;
      if (((n = n.firstBaseUpdate), n !== null)) {
        do {
          var a = {
            eventTime: n.eventTime,
            lane: n.lane,
            tag: n.tag,
            payload: n.payload,
            callback: n.callback,
            next: null,
          };
          (o === null ? (l = o = a) : (o = o.next = a), (n = n.next));
        } while (n !== null);
        o === null ? (l = o = t) : (o = o.next = t);
      } else l = o = t;
      ((n = {
        baseState: r.baseState,
        firstBaseUpdate: l,
        lastBaseUpdate: o,
        shared: r.shared,
        effects: r.effects,
      }),
        (e.updateQueue = n));
      return;
    }
    ((e = n.lastBaseUpdate),
      e === null ? (n.firstBaseUpdate = t) : (e.next = t),
      (n.lastBaseUpdate = t));
  }
  function xl(e, t, n, r) {
    var l = e.updateQueue;
    Yt = !1;
    var o = l.firstBaseUpdate,
      a = l.lastBaseUpdate,
      p = l.shared.pending;
    if (p !== null) {
      l.shared.pending = null;
      var m = p,
        S = m.next;
      ((m.next = null), a === null ? (o = S) : (a.next = S), (a = m));
      var L = e.alternate;
      L !== null &&
        ((L = L.updateQueue),
        (p = L.lastBaseUpdate),
        p !== a &&
          (p === null ? (L.firstBaseUpdate = S) : (p.next = S),
          (L.lastBaseUpdate = m)));
    }
    if (o !== null) {
      var T = l.baseState;
      ((a = 0), (L = S = m = null), (p = o));
      do {
        var P = p.lane,
          F = p.eventTime;
        if ((r & P) === P) {
          L !== null &&
            (L = L.next =
              {
                eventTime: F,
                lane: 0,
                tag: p.tag,
                payload: p.payload,
                callback: p.callback,
                next: null,
              });
          e: {
            var W = e,
              B = p;
            switch (((P = t), (F = n), B.tag)) {
              case 1:
                if (((W = B.payload), typeof W == "function")) {
                  T = W.call(F, T, P);
                  break e;
                }
                T = W;
                break e;
              case 3:
                W.flags = (W.flags & -65537) | 128;
              case 0:
                if (
                  ((W = B.payload),
                  (P = typeof W == "function" ? W.call(F, T, P) : W),
                  P == null)
                )
                  break e;
                T = $({}, T, P);
                break e;
              case 2:
                Yt = !0;
            }
          }
          p.callback !== null &&
            p.lane !== 0 &&
            ((e.flags |= 64),
            (P = l.effects),
            P === null ? (l.effects = [p]) : P.push(p));
        } else
          ((F = {
            eventTime: F,
            lane: P,
            tag: p.tag,
            payload: p.payload,
            callback: p.callback,
            next: null,
          }),
            L === null ? ((S = L = F), (m = T)) : (L = L.next = F),
            (a |= P));
        if (((p = p.next), p === null)) {
          if (((p = l.shared.pending), p === null)) break;
          ((P = p),
            (p = P.next),
            (P.next = null),
            (l.lastBaseUpdate = P),
            (l.shared.pending = null));
        }
      } while (!0);
      if (
        (L === null && (m = T),
        (l.baseState = m),
        (l.firstBaseUpdate = S),
        (l.lastBaseUpdate = L),
        (t = l.shared.interleaved),
        t !== null)
      ) {
        l = t;
        do ((a |= l.lane), (l = l.next));
        while (l !== t);
      } else o === null && (l.shared.lanes = 0);
      ((dn |= a), (e.lanes = a), (e.memoizedState = T));
    }
  }
  function Ga(e, t, n) {
    if (((e = t.effects), (t.effects = null), e !== null))
      for (t = 0; t < e.length; t++) {
        var r = e[t],
          l = r.callback;
        if (l !== null) {
          if (((r.callback = null), (r = n), typeof l != "function"))
            throw Error(u(191, l));
          l.call(r);
        }
      }
  }
  var wr = {},
    kt = Vt(wr),
    xr = Vt(wr),
    kr = Vt(wr);
  function cn(e) {
    if (e === wr) throw Error(u(174));
    return e;
  }
  function ii(e, t) {
    switch ((fe(kr, t), fe(xr, e), fe(kt, wr), (e = t.nodeType), e)) {
      case 9:
      case 11:
        t = (t = t.documentElement) ? t.namespaceURI : io(null, "");
        break;
      default:
        ((e = e === 8 ? t.parentNode : t),
          (t = e.namespaceURI || null),
          (e = e.tagName),
          (t = io(t, e)));
    }
    (pe(kt), fe(kt, t));
  }
  function Fn() {
    (pe(kt), pe(xr), pe(kr));
  }
  function Xa(e) {
    cn(kr.current);
    var t = cn(kt.current),
      n = io(t, e.type);
    t !== n && (fe(xr, e), fe(kt, n));
  }
  function ui(e) {
    xr.current === e && (pe(kt), pe(xr));
  }
  var ye = Vt(0);
  function kl(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var n = t.memoizedState;
        if (
          n !== null &&
          ((n = n.dehydrated), n === null || n.data === "$?" || n.data === "$!")
        )
          return t;
      } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        ((t.child.return = t), (t = t.child));
        continue;
      }
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return null;
        t = t.return;
      }
      ((t.sibling.return = t.return), (t = t.sibling));
    }
    return null;
  }
  var ai = [];
  function si() {
    for (var e = 0; e < ai.length; e++)
      ai[e]._workInProgressVersionPrimary = null;
    ai.length = 0;
  }
  var Sl = ne.ReactCurrentDispatcher,
    ci = ne.ReactCurrentBatchConfig,
    fn = 0,
    ge = null,
    Ne = null,
    _e = null,
    El = !1,
    Sr = !1,
    Er = 0,
    Sd = 0;
  function Fe() {
    throw Error(u(321));
  }
  function fi(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++)
      if (!dt(e[n], t[n])) return !1;
    return !0;
  }
  function di(e, t, n, r, l, o) {
    if (
      ((fn = o),
      (ge = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (Sl.current = e === null || e.memoizedState === null ? jd : Nd),
      (e = n(r, l)),
      Sr)
    ) {
      o = 0;
      do {
        if (((Sr = !1), (Er = 0), 25 <= o)) throw Error(u(301));
        ((o += 1),
          (_e = Ne = null),
          (t.updateQueue = null),
          (Sl.current = Pd),
          (e = n(r, l)));
      } while (Sr);
    }
    if (
      ((Sl.current = jl),
      (t = Ne !== null && Ne.next !== null),
      (fn = 0),
      (_e = Ne = ge = null),
      (El = !1),
      t)
    )
      throw Error(u(300));
    return e;
  }
  function pi() {
    var e = Er !== 0;
    return ((Er = 0), e);
  }
  function St() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    };
    return (_e === null ? (ge.memoizedState = _e = e) : (_e = _e.next = e), _e);
  }
  function ut() {
    if (Ne === null) {
      var e = ge.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Ne.next;
    var t = _e === null ? ge.memoizedState : _e.next;
    if (t !== null) ((_e = t), (Ne = e));
    else {
      if (e === null) throw Error(u(310));
      ((Ne = e),
        (e = {
          memoizedState: Ne.memoizedState,
          baseState: Ne.baseState,
          baseQueue: Ne.baseQueue,
          queue: Ne.queue,
          next: null,
        }),
        _e === null ? (ge.memoizedState = _e = e) : (_e = _e.next = e));
    }
    return _e;
  }
  function Cr(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function hi(e) {
    var t = ut(),
      n = t.queue;
    if (n === null) throw Error(u(311));
    n.lastRenderedReducer = e;
    var r = Ne,
      l = r.baseQueue,
      o = n.pending;
    if (o !== null) {
      if (l !== null) {
        var a = l.next;
        ((l.next = o.next), (o.next = a));
      }
      ((r.baseQueue = l = o), (n.pending = null));
    }
    if (l !== null) {
      ((o = l.next), (r = r.baseState));
      var p = (a = null),
        m = null,
        S = o;
      do {
        var L = S.lane;
        if ((fn & L) === L)
          (m !== null &&
            (m = m.next =
              {
                lane: 0,
                action: S.action,
                hasEagerState: S.hasEagerState,
                eagerState: S.eagerState,
                next: null,
              }),
            (r = S.hasEagerState ? S.eagerState : e(r, S.action)));
        else {
          var T = {
            lane: L,
            action: S.action,
            hasEagerState: S.hasEagerState,
            eagerState: S.eagerState,
            next: null,
          };
          (m === null ? ((p = m = T), (a = r)) : (m = m.next = T),
            (ge.lanes |= L),
            (dn |= L));
        }
        S = S.next;
      } while (S !== null && S !== o);
      (m === null ? (a = r) : (m.next = p),
        dt(r, t.memoizedState) || (Ye = !0),
        (t.memoizedState = r),
        (t.baseState = a),
        (t.baseQueue = m),
        (n.lastRenderedState = r));
    }
    if (((e = n.interleaved), e !== null)) {
      l = e;
      do ((o = l.lane), (ge.lanes |= o), (dn |= o), (l = l.next));
      while (l !== e);
    } else l === null && (n.lanes = 0);
    return [t.memoizedState, n.dispatch];
  }
  function mi(e) {
    var t = ut(),
      n = t.queue;
    if (n === null) throw Error(u(311));
    n.lastRenderedReducer = e;
    var r = n.dispatch,
      l = n.pending,
      o = t.memoizedState;
    if (l !== null) {
      n.pending = null;
      var a = (l = l.next);
      do ((o = e(o, a.action)), (a = a.next));
      while (a !== l);
      (dt(o, t.memoizedState) || (Ye = !0),
        (t.memoizedState = o),
        t.baseQueue === null && (t.baseState = o),
        (n.lastRenderedState = o));
    }
    return [o, r];
  }
  function Ja() {}
  function Za(e, t) {
    var n = ge,
      r = ut(),
      l = t(),
      o = !dt(r.memoizedState, l);
    if (
      (o && ((r.memoizedState = l), (Ye = !0)),
      (r = r.queue),
      vi(ts.bind(null, n, r, e), [e]),
      r.getSnapshot !== t || o || (_e !== null && _e.memoizedState.tag & 1))
    ) {
      if (
        ((n.flags |= 2048),
        Rr(9, es.bind(null, n, r, l, t), void 0, null),
        Le === null)
      )
        throw Error(u(349));
      (fn & 30) !== 0 || ba(n, t, l);
    }
    return l;
  }
  function ba(e, t, n) {
    ((e.flags |= 16384),
      (e = { getSnapshot: t, value: n }),
      (t = ge.updateQueue),
      t === null
        ? ((t = { lastEffect: null, stores: null }),
          (ge.updateQueue = t),
          (t.stores = [e]))
        : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e)));
  }
  function es(e, t, n, r) {
    ((t.value = n), (t.getSnapshot = r), ns(t) && rs(e));
  }
  function ts(e, t, n) {
    return n(function () {
      ns(t) && rs(e);
    });
  }
  function ns(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var n = t();
      return !dt(e, n);
    } catch {
      return !0;
    }
  }
  function rs(e) {
    var t = Lt(e, 1);
    t !== null && yt(t, e, 1, -1);
  }
  function ls(e) {
    var t = St();
    return (
      typeof e == "function" && (e = e()),
      (t.memoizedState = t.baseState = e),
      (e = {
        pending: null,
        interleaved: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Cr,
        lastRenderedState: e,
      }),
      (t.queue = e),
      (e = e.dispatch = Rd.bind(null, ge, e)),
      [t.memoizedState, e]
    );
  }
  function Rr(e, t, n, r) {
    return (
      (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
      (t = ge.updateQueue),
      t === null
        ? ((t = { lastEffect: null, stores: null }),
          (ge.updateQueue = t),
          (t.lastEffect = e.next = e))
        : ((n = t.lastEffect),
          n === null
            ? (t.lastEffect = e.next = e)
            : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
      e
    );
  }
  function os() {
    return ut().memoizedState;
  }
  function Cl(e, t, n, r) {
    var l = St();
    ((ge.flags |= e),
      (l.memoizedState = Rr(1 | t, n, void 0, r === void 0 ? null : r)));
  }
  function Rl(e, t, n, r) {
    var l = ut();
    r = r === void 0 ? null : r;
    var o = void 0;
    if (Ne !== null) {
      var a = Ne.memoizedState;
      if (((o = a.destroy), r !== null && fi(r, a.deps))) {
        l.memoizedState = Rr(t, n, o, r);
        return;
      }
    }
    ((ge.flags |= e), (l.memoizedState = Rr(1 | t, n, o, r)));
  }
  function is(e, t) {
    return Cl(8390656, 8, e, t);
  }
  function vi(e, t) {
    return Rl(2048, 8, e, t);
  }
  function us(e, t) {
    return Rl(4, 2, e, t);
  }
  function as(e, t) {
    return Rl(4, 4, e, t);
  }
  function ss(e, t) {
    if (typeof t == "function")
      return (
        (e = e()),
        t(e),
        function () {
          t(null);
        }
      );
    if (t != null)
      return (
        (e = e()),
        (t.current = e),
        function () {
          t.current = null;
        }
      );
  }
  function cs(e, t, n) {
    return (
      (n = n != null ? n.concat([e]) : null),
      Rl(4, 4, ss.bind(null, t, e), n)
    );
  }
  function yi() {}
  function fs(e, t) {
    var n = ut();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && fi(t, r[1])
      ? r[0]
      : ((n.memoizedState = [e, t]), e);
  }
  function ds(e, t) {
    var n = ut();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && fi(t, r[1])
      ? r[0]
      : ((e = e()), (n.memoizedState = [e, t]), e);
  }
  function ps(e, t, n) {
    return (fn & 21) === 0
      ? (e.baseState && ((e.baseState = !1), (Ye = !0)), (e.memoizedState = n))
      : (dt(n, t) ||
          ((n = Hu()), (ge.lanes |= n), (dn |= n), (e.baseState = !0)),
        t);
  }
  function Ed(e, t) {
    var n = ae;
    ((ae = n !== 0 && 4 > n ? n : 4), e(!0));
    var r = ci.transition;
    ci.transition = {};
    try {
      (e(!1), t());
    } finally {
      ((ae = n), (ci.transition = r));
    }
  }
  function hs() {
    return ut().memoizedState;
  }
  function Cd(e, t, n) {
    var r = Zt(e);
    if (
      ((n = {
        lane: r,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      ms(e))
    )
      vs(t, n);
    else if (((n = Ka(e, t, n, r)), n !== null)) {
      var l = We();
      (yt(n, e, r, l), ys(n, t, r));
    }
  }
  function Rd(e, t, n) {
    var r = Zt(e),
      l = {
        lane: r,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      };
    if (ms(e)) vs(t, l);
    else {
      var o = e.alternate;
      if (
        e.lanes === 0 &&
        (o === null || o.lanes === 0) &&
        ((o = t.lastRenderedReducer), o !== null)
      )
        try {
          var a = t.lastRenderedState,
            p = o(a, n);
          if (((l.hasEagerState = !0), (l.eagerState = p), dt(p, a))) {
            var m = t.interleaved;
            (m === null
              ? ((l.next = l), li(t))
              : ((l.next = m.next), (m.next = l)),
              (t.interleaved = l));
            return;
          }
        } catch {
        } finally {
        }
      ((n = Ka(e, t, l, r)),
        n !== null && ((l = We()), yt(n, e, r, l), ys(n, t, r)));
    }
  }
  function ms(e) {
    var t = e.alternate;
    return e === ge || (t !== null && t === ge);
  }
  function vs(e, t) {
    Sr = El = !0;
    var n = e.pending;
    (n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
      (e.pending = t));
  }
  function ys(e, t, n) {
    if ((n & 4194240) !== 0) {
      var r = t.lanes;
      ((r &= e.pendingLanes), (n |= r), (t.lanes = n), wo(e, n));
    }
  }
  var jl = {
      readContext: it,
      useCallback: Fe,
      useContext: Fe,
      useEffect: Fe,
      useImperativeHandle: Fe,
      useInsertionEffect: Fe,
      useLayoutEffect: Fe,
      useMemo: Fe,
      useReducer: Fe,
      useRef: Fe,
      useState: Fe,
      useDebugValue: Fe,
      useDeferredValue: Fe,
      useTransition: Fe,
      useMutableSource: Fe,
      useSyncExternalStore: Fe,
      useId: Fe,
      unstable_isNewReconciler: !1,
    },
    jd = {
      readContext: it,
      useCallback: function (e, t) {
        return ((St().memoizedState = [e, t === void 0 ? null : t]), e);
      },
      useContext: it,
      useEffect: is,
      useImperativeHandle: function (e, t, n) {
        return (
          (n = n != null ? n.concat([e]) : null),
          Cl(4194308, 4, ss.bind(null, t, e), n)
        );
      },
      useLayoutEffect: function (e, t) {
        return Cl(4194308, 4, e, t);
      },
      useInsertionEffect: function (e, t) {
        return Cl(4, 2, e, t);
      },
      useMemo: function (e, t) {
        var n = St();
        return (
          (t = t === void 0 ? null : t),
          (e = e()),
          (n.memoizedState = [e, t]),
          e
        );
      },
      useReducer: function (e, t, n) {
        var r = St();
        return (
          (t = n !== void 0 ? n(t) : t),
          (r.memoizedState = r.baseState = t),
          (e = {
            pending: null,
            interleaved: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: e,
            lastRenderedState: t,
          }),
          (r.queue = e),
          (e = e.dispatch = Cd.bind(null, ge, e)),
          [r.memoizedState, e]
        );
      },
      useRef: function (e) {
        var t = St();
        return ((e = { current: e }), (t.memoizedState = e));
      },
      useState: ls,
      useDebugValue: yi,
      useDeferredValue: function (e) {
        return (St().memoizedState = e);
      },
      useTransition: function () {
        var e = ls(!1),
          t = e[0];
        return ((e = Ed.bind(null, e[1])), (St().memoizedState = e), [t, e]);
      },
      useMutableSource: function () {},
      useSyncExternalStore: function (e, t, n) {
        var r = ge,
          l = St();
        if (me) {
          if (n === void 0) throw Error(u(407));
          n = n();
        } else {
          if (((n = t()), Le === null)) throw Error(u(349));
          (fn & 30) !== 0 || ba(r, t, n);
        }
        l.memoizedState = n;
        var o = { value: n, getSnapshot: t };
        return (
          (l.queue = o),
          is(ts.bind(null, r, o, e), [e]),
          (r.flags |= 2048),
          Rr(9, es.bind(null, r, o, n, t), void 0, null),
          n
        );
      },
      useId: function () {
        var e = St(),
          t = Le.identifierPrefix;
        if (me) {
          var n = _t,
            r = Pt;
          ((n = (r & ~(1 << (32 - ft(r) - 1))).toString(32) + n),
            (t = ":" + t + "R" + n),
            (n = Er++),
            0 < n && (t += "H" + n.toString(32)),
            (t += ":"));
        } else ((n = Sd++), (t = ":" + t + "r" + n.toString(32) + ":"));
        return (e.memoizedState = t);
      },
      unstable_isNewReconciler: !1,
    },
    Nd = {
      readContext: it,
      useCallback: fs,
      useContext: it,
      useEffect: vi,
      useImperativeHandle: cs,
      useInsertionEffect: us,
      useLayoutEffect: as,
      useMemo: ds,
      useReducer: hi,
      useRef: os,
      useState: function () {
        return hi(Cr);
      },
      useDebugValue: yi,
      useDeferredValue: function (e) {
        var t = ut();
        return ps(t, Ne.memoizedState, e);
      },
      useTransition: function () {
        var e = hi(Cr)[0],
          t = ut().memoizedState;
        return [e, t];
      },
      useMutableSource: Ja,
      useSyncExternalStore: Za,
      useId: hs,
      unstable_isNewReconciler: !1,
    },
    Pd = {
      readContext: it,
      useCallback: fs,
      useContext: it,
      useEffect: vi,
      useImperativeHandle: cs,
      useInsertionEffect: us,
      useLayoutEffect: as,
      useMemo: ds,
      useReducer: mi,
      useRef: os,
      useState: function () {
        return mi(Cr);
      },
      useDebugValue: yi,
      useDeferredValue: function (e) {
        var t = ut();
        return Ne === null ? (t.memoizedState = e) : ps(t, Ne.memoizedState, e);
      },
      useTransition: function () {
        var e = mi(Cr)[0],
          t = ut().memoizedState;
        return [e, t];
      },
      useMutableSource: Ja,
      useSyncExternalStore: Za,
      useId: hs,
      unstable_isNewReconciler: !1,
    };
  function ht(e, t) {
    if (e && e.defaultProps) {
      ((t = $({}, t)), (e = e.defaultProps));
      for (var n in e) t[n] === void 0 && (t[n] = e[n]);
      return t;
    }
    return t;
  }
  function gi(e, t, n, r) {
    ((t = e.memoizedState),
      (n = n(r, t)),
      (n = n == null ? t : $({}, t, n)),
      (e.memoizedState = n),
      e.lanes === 0 && (e.updateQueue.baseState = n));
  }
  var Nl = {
    isMounted: function (e) {
      return (e = e._reactInternals) ? rn(e) === e : !1;
    },
    enqueueSetState: function (e, t, n) {
      e = e._reactInternals;
      var r = We(),
        l = Zt(e),
        o = Tt(r, l);
      ((o.payload = t),
        n != null && (o.callback = n),
        (t = qt(e, o, l)),
        t !== null && (yt(t, e, l, r), wl(t, e, l)));
    },
    enqueueReplaceState: function (e, t, n) {
      e = e._reactInternals;
      var r = We(),
        l = Zt(e),
        o = Tt(r, l);
      ((o.tag = 1),
        (o.payload = t),
        n != null && (o.callback = n),
        (t = qt(e, o, l)),
        t !== null && (yt(t, e, l, r), wl(t, e, l)));
    },
    enqueueForceUpdate: function (e, t) {
      e = e._reactInternals;
      var n = We(),
        r = Zt(e),
        l = Tt(n, r);
      ((l.tag = 2),
        t != null && (l.callback = t),
        (t = qt(e, l, r)),
        t !== null && (yt(t, e, r, n), wl(t, e, r)));
    },
  };
  function gs(e, t, n, r, l, o, a) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == "function"
        ? e.shouldComponentUpdate(r, o, a)
        : t.prototype && t.prototype.isPureReactComponent
          ? !fr(n, r) || !fr(l, o)
          : !0
    );
  }
  function ws(e, t, n) {
    var r = !1,
      l = Qt,
      o = t.contextType;
    return (
      typeof o == "object" && o !== null
        ? (o = it(o))
        : ((l = Ke(t) ? on : Ie.current),
          (r = t.contextTypes),
          (o = (r = r != null) ? Ln(e, l) : Qt)),
      (t = new t(n, o)),
      (e.memoizedState =
        t.state !== null && t.state !== void 0 ? t.state : null),
      (t.updater = Nl),
      (e.stateNode = t),
      (t._reactInternals = e),
      r &&
        ((e = e.stateNode),
        (e.__reactInternalMemoizedUnmaskedChildContext = l),
        (e.__reactInternalMemoizedMaskedChildContext = o)),
      t
    );
  }
  function xs(e, t, n, r) {
    ((e = t.state),
      typeof t.componentWillReceiveProps == "function" &&
        t.componentWillReceiveProps(n, r),
      typeof t.UNSAFE_componentWillReceiveProps == "function" &&
        t.UNSAFE_componentWillReceiveProps(n, r),
      t.state !== e && Nl.enqueueReplaceState(t, t.state, null));
  }
  function wi(e, t, n, r) {
    var l = e.stateNode;
    ((l.props = n), (l.state = e.memoizedState), (l.refs = {}), oi(e));
    var o = t.contextType;
    (typeof o == "object" && o !== null
      ? (l.context = it(o))
      : ((o = Ke(t) ? on : Ie.current), (l.context = Ln(e, o))),
      (l.state = e.memoizedState),
      (o = t.getDerivedStateFromProps),
      typeof o == "function" && (gi(e, t, o, n), (l.state = e.memoizedState)),
      typeof t.getDerivedStateFromProps == "function" ||
        typeof l.getSnapshotBeforeUpdate == "function" ||
        (typeof l.UNSAFE_componentWillMount != "function" &&
          typeof l.componentWillMount != "function") ||
        ((t = l.state),
        typeof l.componentWillMount == "function" && l.componentWillMount(),
        typeof l.UNSAFE_componentWillMount == "function" &&
          l.UNSAFE_componentWillMount(),
        t !== l.state && Nl.enqueueReplaceState(l, l.state, null),
        xl(e, n, l, r),
        (l.state = e.memoizedState)),
      typeof l.componentDidMount == "function" && (e.flags |= 4194308));
  }
  function Un(e, t) {
    try {
      var n = "",
        r = t;
      do ((n += re(r)), (r = r.return));
      while (r);
      var l = n;
    } catch (o) {
      l =
        `
Error generating stack: ` +
        o.message +
        `
` +
        o.stack;
    }
    return { value: e, source: t, stack: l, digest: null };
  }
  function xi(e, t, n) {
    return { value: e, source: null, stack: n ?? null, digest: t ?? null };
  }
  function ki(e, t) {
    try {
      console.error(t.value);
    } catch (n) {
      setTimeout(function () {
        throw n;
      });
    }
  }
  var _d = typeof WeakMap == "function" ? WeakMap : Map;
  function ks(e, t, n) {
    ((n = Tt(-1, n)), (n.tag = 3), (n.payload = { element: null }));
    var r = t.value;
    return (
      (n.callback = function () {
        (Ml || ((Ml = !0), (Ii = r)), ki(e, t));
      }),
      n
    );
  }
  function Ss(e, t, n) {
    ((n = Tt(-1, n)), (n.tag = 3));
    var r = e.type.getDerivedStateFromError;
    if (typeof r == "function") {
      var l = t.value;
      ((n.payload = function () {
        return r(l);
      }),
        (n.callback = function () {
          ki(e, t);
        }));
    }
    var o = e.stateNode;
    return (
      o !== null &&
        typeof o.componentDidCatch == "function" &&
        (n.callback = function () {
          (ki(e, t),
            typeof r != "function" &&
              (Xt === null ? (Xt = new Set([this])) : Xt.add(this)));
          var a = t.stack;
          this.componentDidCatch(t.value, {
            componentStack: a !== null ? a : "",
          });
        }),
      n
    );
  }
  function Es(e, t, n) {
    var r = e.pingCache;
    if (r === null) {
      r = e.pingCache = new _d();
      var l = new Set();
      r.set(t, l);
    } else ((l = r.get(t)), l === void 0 && ((l = new Set()), r.set(t, l)));
    l.has(n) || (l.add(n), (e = Hd.bind(null, e, t, n)), t.then(e, e));
  }
  function Cs(e) {
    do {
      var t;
      if (
        ((t = e.tag === 13) &&
          ((t = e.memoizedState),
          (t = t !== null ? t.dehydrated !== null : !0)),
        t)
      )
        return e;
      e = e.return;
    } while (e !== null);
    return null;
  }
  function Rs(e, t, n, r, l) {
    return (e.mode & 1) === 0
      ? (e === t
          ? (e.flags |= 65536)
          : ((e.flags |= 128),
            (n.flags |= 131072),
            (n.flags &= -52805),
            n.tag === 1 &&
              (n.alternate === null
                ? (n.tag = 17)
                : ((t = Tt(-1, 1)), (t.tag = 2), qt(n, t, 1))),
            (n.lanes |= 1)),
        e)
      : ((e.flags |= 65536), (e.lanes = l), e);
  }
  var Ld = ne.ReactCurrentOwner,
    Ye = !1;
  function $e(e, t, n, r) {
    t.child = e === null ? Qa(t, null, n, r) : Mn(t, e.child, n, r);
  }
  function js(e, t, n, r, l) {
    n = n.render;
    var o = t.ref;
    return (
      In(t, l),
      (r = di(e, t, n, r, o, l)),
      (n = pi()),
      e !== null && !Ye
        ? ((t.updateQueue = e.updateQueue),
          (t.flags &= -2053),
          (e.lanes &= ~l),
          zt(e, t, l))
        : (me && n && Go(t), (t.flags |= 1), $e(e, t, r, l), t.child)
    );
  }
  function Ns(e, t, n, r, l) {
    if (e === null) {
      var o = n.type;
      return typeof o == "function" &&
        !Hi(o) &&
        o.defaultProps === void 0 &&
        n.compare === null &&
        n.defaultProps === void 0
        ? ((t.tag = 15), (t.type = o), Ps(e, t, o, r, l))
        : ((e = $l(n.type, null, r, t, t.mode, l)),
          (e.ref = t.ref),
          (e.return = t),
          (t.child = e));
    }
    if (((o = e.child), (e.lanes & l) === 0)) {
      var a = o.memoizedProps;
      if (
        ((n = n.compare), (n = n !== null ? n : fr), n(a, r) && e.ref === t.ref)
      )
        return zt(e, t, l);
    }
    return (
      (t.flags |= 1),
      (e = en(o, r)),
      (e.ref = t.ref),
      (e.return = t),
      (t.child = e)
    );
  }
  function Ps(e, t, n, r, l) {
    if (e !== null) {
      var o = e.memoizedProps;
      if (fr(o, r) && e.ref === t.ref)
        if (((Ye = !1), (t.pendingProps = r = o), (e.lanes & l) !== 0))
          (e.flags & 131072) !== 0 && (Ye = !0);
        else return ((t.lanes = e.lanes), zt(e, t, l));
    }
    return Si(e, t, n, r, l);
  }
  function _s(e, t, n) {
    var r = t.pendingProps,
      l = r.children,
      o = e !== null ? e.memoizedState : null;
    if (r.mode === "hidden")
      if ((t.mode & 1) === 0)
        ((t.memoizedState = {
          baseLanes: 0,
          cachePool: null,
          transitions: null,
        }),
          fe($n, nt),
          (nt |= n));
      else {
        if ((n & 1073741824) === 0)
          return (
            (e = o !== null ? o.baseLanes | n : n),
            (t.lanes = t.childLanes = 1073741824),
            (t.memoizedState = {
              baseLanes: e,
              cachePool: null,
              transitions: null,
            }),
            (t.updateQueue = null),
            fe($n, nt),
            (nt |= e),
            null
          );
        ((t.memoizedState = {
          baseLanes: 0,
          cachePool: null,
          transitions: null,
        }),
          (r = o !== null ? o.baseLanes : n),
          fe($n, nt),
          (nt |= r));
      }
    else
      (o !== null ? ((r = o.baseLanes | n), (t.memoizedState = null)) : (r = n),
        fe($n, nt),
        (nt |= r));
    return ($e(e, t, l, n), t.child);
  }
  function Ls(e, t) {
    var n = t.ref;
    ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
      ((t.flags |= 512), (t.flags |= 2097152));
  }
  function Si(e, t, n, r, l) {
    var o = Ke(n) ? on : Ie.current;
    return (
      (o = Ln(t, o)),
      In(t, l),
      (n = di(e, t, n, r, o, l)),
      (r = pi()),
      e !== null && !Ye
        ? ((t.updateQueue = e.updateQueue),
          (t.flags &= -2053),
          (e.lanes &= ~l),
          zt(e, t, l))
        : (me && r && Go(t), (t.flags |= 1), $e(e, t, n, l), t.child)
    );
  }
  function Ts(e, t, n, r, l) {
    if (Ke(n)) {
      var o = !0;
      fl(t);
    } else o = !1;
    if ((In(t, l), t.stateNode === null))
      (_l(e, t), ws(t, n, r), wi(t, n, r, l), (r = !0));
    else if (e === null) {
      var a = t.stateNode,
        p = t.memoizedProps;
      a.props = p;
      var m = a.context,
        S = n.contextType;
      typeof S == "object" && S !== null
        ? (S = it(S))
        : ((S = Ke(n) ? on : Ie.current), (S = Ln(t, S)));
      var L = n.getDerivedStateFromProps,
        T =
          typeof L == "function" ||
          typeof a.getSnapshotBeforeUpdate == "function";
      (T ||
        (typeof a.UNSAFE_componentWillReceiveProps != "function" &&
          typeof a.componentWillReceiveProps != "function") ||
        ((p !== r || m !== S) && xs(t, a, r, S)),
        (Yt = !1));
      var P = t.memoizedState;
      ((a.state = P),
        xl(t, r, a, l),
        (m = t.memoizedState),
        p !== r || P !== m || Qe.current || Yt
          ? (typeof L == "function" && (gi(t, n, L, r), (m = t.memoizedState)),
            (p = Yt || gs(t, n, p, r, P, m, S))
              ? (T ||
                  (typeof a.UNSAFE_componentWillMount != "function" &&
                    typeof a.componentWillMount != "function") ||
                  (typeof a.componentWillMount == "function" &&
                    a.componentWillMount(),
                  typeof a.UNSAFE_componentWillMount == "function" &&
                    a.UNSAFE_componentWillMount()),
                typeof a.componentDidMount == "function" &&
                  (t.flags |= 4194308))
              : (typeof a.componentDidMount == "function" &&
                  (t.flags |= 4194308),
                (t.memoizedProps = r),
                (t.memoizedState = m)),
            (a.props = r),
            (a.state = m),
            (a.context = S),
            (r = p))
          : (typeof a.componentDidMount == "function" && (t.flags |= 4194308),
            (r = !1)));
    } else {
      ((a = t.stateNode),
        Ya(e, t),
        (p = t.memoizedProps),
        (S = t.type === t.elementType ? p : ht(t.type, p)),
        (a.props = S),
        (T = t.pendingProps),
        (P = a.context),
        (m = n.contextType),
        typeof m == "object" && m !== null
          ? (m = it(m))
          : ((m = Ke(n) ? on : Ie.current), (m = Ln(t, m))));
      var F = n.getDerivedStateFromProps;
      ((L =
        typeof F == "function" ||
        typeof a.getSnapshotBeforeUpdate == "function") ||
        (typeof a.UNSAFE_componentWillReceiveProps != "function" &&
          typeof a.componentWillReceiveProps != "function") ||
        ((p !== T || P !== m) && xs(t, a, r, m)),
        (Yt = !1),
        (P = t.memoizedState),
        (a.state = P),
        xl(t, r, a, l));
      var W = t.memoizedState;
      p !== T || P !== W || Qe.current || Yt
        ? (typeof F == "function" && (gi(t, n, F, r), (W = t.memoizedState)),
          (S = Yt || gs(t, n, S, r, P, W, m) || !1)
            ? (L ||
                (typeof a.UNSAFE_componentWillUpdate != "function" &&
                  typeof a.componentWillUpdate != "function") ||
                (typeof a.componentWillUpdate == "function" &&
                  a.componentWillUpdate(r, W, m),
                typeof a.UNSAFE_componentWillUpdate == "function" &&
                  a.UNSAFE_componentWillUpdate(r, W, m)),
              typeof a.componentDidUpdate == "function" && (t.flags |= 4),
              typeof a.getSnapshotBeforeUpdate == "function" &&
                (t.flags |= 1024))
            : (typeof a.componentDidUpdate != "function" ||
                (p === e.memoizedProps && P === e.memoizedState) ||
                (t.flags |= 4),
              typeof a.getSnapshotBeforeUpdate != "function" ||
                (p === e.memoizedProps && P === e.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = r),
              (t.memoizedState = W)),
          (a.props = r),
          (a.state = W),
          (a.context = m),
          (r = S))
        : (typeof a.componentDidUpdate != "function" ||
            (p === e.memoizedProps && P === e.memoizedState) ||
            (t.flags |= 4),
          typeof a.getSnapshotBeforeUpdate != "function" ||
            (p === e.memoizedProps && P === e.memoizedState) ||
            (t.flags |= 1024),
          (r = !1));
    }
    return Ei(e, t, n, r, o, l);
  }
  function Ei(e, t, n, r, l, o) {
    Ls(e, t);
    var a = (t.flags & 128) !== 0;
    if (!r && !a) return (l && Ia(t, n, !1), zt(e, t, o));
    ((r = t.stateNode), (Ld.current = t));
    var p =
      a && typeof n.getDerivedStateFromError != "function" ? null : r.render();
    return (
      (t.flags |= 1),
      e !== null && a
        ? ((t.child = Mn(t, e.child, null, o)), (t.child = Mn(t, null, p, o)))
        : $e(e, t, p, o),
      (t.memoizedState = r.state),
      l && Ia(t, n, !0),
      t.child
    );
  }
  function zs(e) {
    var t = e.stateNode;
    (t.pendingContext
      ? Ma(e, t.pendingContext, t.pendingContext !== t.context)
      : t.context && Ma(e, t.context, !1),
      ii(e, t.containerInfo));
  }
  function Ds(e, t, n, r, l) {
    return (Dn(), bo(l), (t.flags |= 256), $e(e, t, n, r), t.child);
  }
  var Ci = { dehydrated: null, treeContext: null, retryLane: 0 };
  function Ri(e) {
    return { baseLanes: e, cachePool: null, transitions: null };
  }
  function Ms(e, t, n) {
    var r = t.pendingProps,
      l = ye.current,
      o = !1,
      a = (t.flags & 128) !== 0,
      p;
    if (
      ((p = a) ||
        (p = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0),
      p
        ? ((o = !0), (t.flags &= -129))
        : (e === null || e.memoizedState !== null) && (l |= 1),
      fe(ye, l & 1),
      e === null)
    )
      return (
        Zo(t),
        (e = t.memoizedState),
        e !== null && ((e = e.dehydrated), e !== null)
          ? ((t.mode & 1) === 0
              ? (t.lanes = 1)
              : e.data === "$!"
                ? (t.lanes = 8)
                : (t.lanes = 1073741824),
            null)
          : ((a = r.children),
            (e = r.fallback),
            o
              ? ((r = t.mode),
                (o = t.child),
                (a = { mode: "hidden", children: a }),
                (r & 1) === 0 && o !== null
                  ? ((o.childLanes = 0), (o.pendingProps = a))
                  : (o = Wl(a, r, 0, null)),
                (e = vn(e, r, n, null)),
                (o.return = t),
                (e.return = t),
                (o.sibling = e),
                (t.child = o),
                (t.child.memoizedState = Ri(n)),
                (t.memoizedState = Ci),
                e)
              : ji(t, a))
      );
    if (((l = e.memoizedState), l !== null && ((p = l.dehydrated), p !== null)))
      return Td(e, t, a, r, p, l, n);
    if (o) {
      ((o = r.fallback), (a = t.mode), (l = e.child), (p = l.sibling));
      var m = { mode: "hidden", children: r.children };
      return (
        (a & 1) === 0 && t.child !== l
          ? ((r = t.child),
            (r.childLanes = 0),
            (r.pendingProps = m),
            (t.deletions = null))
          : ((r = en(l, m)), (r.subtreeFlags = l.subtreeFlags & 14680064)),
        p !== null ? (o = en(p, o)) : ((o = vn(o, a, n, null)), (o.flags |= 2)),
        (o.return = t),
        (r.return = t),
        (r.sibling = o),
        (t.child = r),
        (r = o),
        (o = t.child),
        (a = e.child.memoizedState),
        (a =
          a === null
            ? Ri(n)
            : {
                baseLanes: a.baseLanes | n,
                cachePool: null,
                transitions: a.transitions,
              }),
        (o.memoizedState = a),
        (o.childLanes = e.childLanes & ~n),
        (t.memoizedState = Ci),
        r
      );
    }
    return (
      (o = e.child),
      (e = o.sibling),
      (r = en(o, { mode: "visible", children: r.children })),
      (t.mode & 1) === 0 && (r.lanes = n),
      (r.return = t),
      (r.sibling = null),
      e !== null &&
        ((n = t.deletions),
        n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
      (t.child = r),
      (t.memoizedState = null),
      r
    );
  }
  function ji(e, t) {
    return (
      (t = Wl({ mode: "visible", children: t }, e.mode, 0, null)),
      (t.return = e),
      (e.child = t)
    );
  }
  function Pl(e, t, n, r) {
    return (
      r !== null && bo(r),
      Mn(t, e.child, null, n),
      (e = ji(t, t.pendingProps.children)),
      (e.flags |= 2),
      (t.memoizedState = null),
      e
    );
  }
  function Td(e, t, n, r, l, o, a) {
    if (n)
      return t.flags & 256
        ? ((t.flags &= -257), (r = xi(Error(u(422)))), Pl(e, t, a, r))
        : t.memoizedState !== null
          ? ((t.child = e.child), (t.flags |= 128), null)
          : ((o = r.fallback),
            (l = t.mode),
            (r = Wl({ mode: "visible", children: r.children }, l, 0, null)),
            (o = vn(o, l, a, null)),
            (o.flags |= 2),
            (r.return = t),
            (o.return = t),
            (r.sibling = o),
            (t.child = r),
            (t.mode & 1) !== 0 && Mn(t, e.child, null, a),
            (t.child.memoizedState = Ri(a)),
            (t.memoizedState = Ci),
            o);
    if ((t.mode & 1) === 0) return Pl(e, t, a, null);
    if (l.data === "$!") {
      if (((r = l.nextSibling && l.nextSibling.dataset), r)) var p = r.dgst;
      return (
        (r = p),
        (o = Error(u(419))),
        (r = xi(o, r, void 0)),
        Pl(e, t, a, r)
      );
    }
    if (((p = (a & e.childLanes) !== 0), Ye || p)) {
      if (((r = Le), r !== null)) {
        switch (a & -a) {
          case 4:
            l = 2;
            break;
          case 16:
            l = 8;
            break;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            l = 32;
            break;
          case 536870912:
            l = 268435456;
            break;
          default:
            l = 0;
        }
        ((l = (l & (r.suspendedLanes | a)) !== 0 ? 0 : l),
          l !== 0 &&
            l !== o.retryLane &&
            ((o.retryLane = l), Lt(e, l), yt(r, e, l, -1)));
      }
      return (Bi(), (r = xi(Error(u(421)))), Pl(e, t, a, r));
    }
    return l.data === "$?"
      ? ((t.flags |= 128),
        (t.child = e.child),
        (t = Vd.bind(null, e)),
        (l._reactRetry = t),
        null)
      : ((e = o.treeContext),
        (tt = Ht(l.nextSibling)),
        (et = t),
        (me = !0),
        (pt = null),
        e !== null &&
          ((lt[ot++] = Pt),
          (lt[ot++] = _t),
          (lt[ot++] = un),
          (Pt = e.id),
          (_t = e.overflow),
          (un = t)),
        (t = ji(t, r.children)),
        (t.flags |= 4096),
        t);
  }
  function Os(e, t, n) {
    e.lanes |= t;
    var r = e.alternate;
    (r !== null && (r.lanes |= t), ri(e.return, t, n));
  }
  function Ni(e, t, n, r, l) {
    var o = e.memoizedState;
    o === null
      ? (e.memoizedState = {
          isBackwards: t,
          rendering: null,
          renderingStartTime: 0,
          last: r,
          tail: n,
          tailMode: l,
        })
      : ((o.isBackwards = t),
        (o.rendering = null),
        (o.renderingStartTime = 0),
        (o.last = r),
        (o.tail = n),
        (o.tailMode = l));
  }
  function Is(e, t, n) {
    var r = t.pendingProps,
      l = r.revealOrder,
      o = r.tail;
    if (($e(e, t, r.children, n), (r = ye.current), (r & 2) !== 0))
      ((r = (r & 1) | 2), (t.flags |= 128));
    else {
      if (e !== null && (e.flags & 128) !== 0)
        e: for (e = t.child; e !== null; ) {
          if (e.tag === 13) e.memoizedState !== null && Os(e, n, t);
          else if (e.tag === 19) Os(e, n, t);
          else if (e.child !== null) {
            ((e.child.return = e), (e = e.child));
            continue;
          }
          if (e === t) break e;
          for (; e.sibling === null; ) {
            if (e.return === null || e.return === t) break e;
            e = e.return;
          }
          ((e.sibling.return = e.return), (e = e.sibling));
        }
      r &= 1;
    }
    if ((fe(ye, r), (t.mode & 1) === 0)) t.memoizedState = null;
    else
      switch (l) {
        case "forwards":
          for (n = t.child, l = null; n !== null; )
            ((e = n.alternate),
              e !== null && kl(e) === null && (l = n),
              (n = n.sibling));
          ((n = l),
            n === null
              ? ((l = t.child), (t.child = null))
              : ((l = n.sibling), (n.sibling = null)),
            Ni(t, !1, l, n, o));
          break;
        case "backwards":
          for (n = null, l = t.child, t.child = null; l !== null; ) {
            if (((e = l.alternate), e !== null && kl(e) === null)) {
              t.child = l;
              break;
            }
            ((e = l.sibling), (l.sibling = n), (n = l), (l = e));
          }
          Ni(t, !0, n, null, o);
          break;
        case "together":
          Ni(t, !1, null, null, void 0);
          break;
        default:
          t.memoizedState = null;
      }
    return t.child;
  }
  function _l(e, t) {
    (t.mode & 1) === 0 &&
      e !== null &&
      ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
  }
  function zt(e, t, n) {
    if (
      (e !== null && (t.dependencies = e.dependencies),
      (dn |= t.lanes),
      (n & t.childLanes) === 0)
    )
      return null;
    if (e !== null && t.child !== e.child) throw Error(u(153));
    if (t.child !== null) {
      for (
        e = t.child, n = en(e, e.pendingProps), t.child = n, n.return = t;
        e.sibling !== null;
      )
        ((e = e.sibling),
          (n = n.sibling = en(e, e.pendingProps)),
          (n.return = t));
      n.sibling = null;
    }
    return t.child;
  }
  function zd(e, t, n) {
    switch (t.tag) {
      case 3:
        (zs(t), Dn());
        break;
      case 5:
        Xa(t);
        break;
      case 1:
        Ke(t.type) && fl(t);
        break;
      case 4:
        ii(t, t.stateNode.containerInfo);
        break;
      case 10:
        var r = t.type._context,
          l = t.memoizedProps.value;
        (fe(yl, r._currentValue), (r._currentValue = l));
        break;
      case 13:
        if (((r = t.memoizedState), r !== null))
          return r.dehydrated !== null
            ? (fe(ye, ye.current & 1), (t.flags |= 128), null)
            : (n & t.child.childLanes) !== 0
              ? Ms(e, t, n)
              : (fe(ye, ye.current & 1),
                (e = zt(e, t, n)),
                e !== null ? e.sibling : null);
        fe(ye, ye.current & 1);
        break;
      case 19:
        if (((r = (n & t.childLanes) !== 0), (e.flags & 128) !== 0)) {
          if (r) return Is(e, t, n);
          t.flags |= 128;
        }
        if (
          ((l = t.memoizedState),
          l !== null &&
            ((l.rendering = null), (l.tail = null), (l.lastEffect = null)),
          fe(ye, ye.current),
          r)
        )
          break;
        return null;
      case 22:
      case 23:
        return ((t.lanes = 0), _s(e, t, n));
    }
    return zt(e, t, n);
  }
  var Fs, Pi, Us, As;
  ((Fs = function (e, t) {
    for (var n = t.child; n !== null; ) {
      if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
      else if (n.tag !== 4 && n.child !== null) {
        ((n.child.return = n), (n = n.child));
        continue;
      }
      if (n === t) break;
      for (; n.sibling === null; ) {
        if (n.return === null || n.return === t) return;
        n = n.return;
      }
      ((n.sibling.return = n.return), (n = n.sibling));
    }
  }),
    (Pi = function () {}),
    (Us = function (e, t, n, r) {
      var l = e.memoizedProps;
      if (l !== r) {
        ((e = t.stateNode), cn(kt.current));
        var o = null;
        switch (n) {
          case "input":
            ((l = no(e, l)), (r = no(e, r)), (o = []));
            break;
          case "select":
            ((l = $({}, l, { value: void 0 })),
              (r = $({}, r, { value: void 0 })),
              (o = []));
            break;
          case "textarea":
            ((l = oo(e, l)), (r = oo(e, r)), (o = []));
            break;
          default:
            typeof l.onClick != "function" &&
              typeof r.onClick == "function" &&
              (e.onclick = al);
        }
        uo(n, r);
        var a;
        n = null;
        for (S in l)
          if (!r.hasOwnProperty(S) && l.hasOwnProperty(S) && l[S] != null)
            if (S === "style") {
              var p = l[S];
              for (a in p) p.hasOwnProperty(a) && (n || (n = {}), (n[a] = ""));
            } else
              S !== "dangerouslySetInnerHTML" &&
                S !== "children" &&
                S !== "suppressContentEditableWarning" &&
                S !== "suppressHydrationWarning" &&
                S !== "autoFocus" &&
                (c.hasOwnProperty(S)
                  ? o || (o = [])
                  : (o = o || []).push(S, null));
        for (S in r) {
          var m = r[S];
          if (
            ((p = l != null ? l[S] : void 0),
            r.hasOwnProperty(S) && m !== p && (m != null || p != null))
          )
            if (S === "style")
              if (p) {
                for (a in p)
                  !p.hasOwnProperty(a) ||
                    (m && m.hasOwnProperty(a)) ||
                    (n || (n = {}), (n[a] = ""));
                for (a in m)
                  m.hasOwnProperty(a) &&
                    p[a] !== m[a] &&
                    (n || (n = {}), (n[a] = m[a]));
              } else (n || (o || (o = []), o.push(S, n)), (n = m));
            else
              S === "dangerouslySetInnerHTML"
                ? ((m = m ? m.__html : void 0),
                  (p = p ? p.__html : void 0),
                  m != null && p !== m && (o = o || []).push(S, m))
                : S === "children"
                  ? (typeof m != "string" && typeof m != "number") ||
                    (o = o || []).push(S, "" + m)
                  : S !== "suppressContentEditableWarning" &&
                    S !== "suppressHydrationWarning" &&
                    (c.hasOwnProperty(S)
                      ? (m != null && S === "onScroll" && de("scroll", e),
                        o || p === m || (o = []))
                      : (o = o || []).push(S, m));
        }
        n && (o = o || []).push("style", n);
        var S = o;
        (t.updateQueue = S) && (t.flags |= 4);
      }
    }),
    (As = function (e, t, n, r) {
      n !== r && (t.flags |= 4);
    }));
  function jr(e, t) {
    if (!me)
      switch (e.tailMode) {
        case "hidden":
          t = e.tail;
          for (var n = null; t !== null; )
            (t.alternate !== null && (n = t), (t = t.sibling));
          n === null ? (e.tail = null) : (n.sibling = null);
          break;
        case "collapsed":
          n = e.tail;
          for (var r = null; n !== null; )
            (n.alternate !== null && (r = n), (n = n.sibling));
          r === null
            ? t || e.tail === null
              ? (e.tail = null)
              : (e.tail.sibling = null)
            : (r.sibling = null);
      }
  }
  function Ue(e) {
    var t = e.alternate !== null && e.alternate.child === e.child,
      n = 0,
      r = 0;
    if (t)
      for (var l = e.child; l !== null; )
        ((n |= l.lanes | l.childLanes),
          (r |= l.subtreeFlags & 14680064),
          (r |= l.flags & 14680064),
          (l.return = e),
          (l = l.sibling));
    else
      for (l = e.child; l !== null; )
        ((n |= l.lanes | l.childLanes),
          (r |= l.subtreeFlags),
          (r |= l.flags),
          (l.return = e),
          (l = l.sibling));
    return ((e.subtreeFlags |= r), (e.childLanes = n), t);
  }
  function Dd(e, t, n) {
    var r = t.pendingProps;
    switch ((Xo(t), t.tag)) {
      case 2:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return (Ue(t), null);
      case 1:
        return (Ke(t.type) && cl(), Ue(t), null);
      case 3:
        return (
          (r = t.stateNode),
          Fn(),
          pe(Qe),
          pe(Ie),
          si(),
          r.pendingContext &&
            ((r.context = r.pendingContext), (r.pendingContext = null)),
          (e === null || e.child === null) &&
            (ml(t)
              ? (t.flags |= 4)
              : e === null ||
                (e.memoizedState.isDehydrated && (t.flags & 256) === 0) ||
                ((t.flags |= 1024), pt !== null && (Ai(pt), (pt = null)))),
          Pi(e, t),
          Ue(t),
          null
        );
      case 5:
        ui(t);
        var l = cn(kr.current);
        if (((n = t.type), e !== null && t.stateNode != null))
          (Us(e, t, n, r, l),
            e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152)));
        else {
          if (!r) {
            if (t.stateNode === null) throw Error(u(166));
            return (Ue(t), null);
          }
          if (((e = cn(kt.current)), ml(t))) {
            ((r = t.stateNode), (n = t.type));
            var o = t.memoizedProps;
            switch (((r[xt] = t), (r[vr] = o), (e = (t.mode & 1) !== 0), n)) {
              case "dialog":
                (de("cancel", r), de("close", r));
                break;
              case "iframe":
              case "object":
              case "embed":
                de("load", r);
                break;
              case "video":
              case "audio":
                for (l = 0; l < pr.length; l++) de(pr[l], r);
                break;
              case "source":
                de("error", r);
                break;
              case "img":
              case "image":
              case "link":
                (de("error", r), de("load", r));
                break;
              case "details":
                de("toggle", r);
                break;
              case "input":
                (wu(r, o), de("invalid", r));
                break;
              case "select":
                ((r._wrapperState = { wasMultiple: !!o.multiple }),
                  de("invalid", r));
                break;
              case "textarea":
                (Su(r, o), de("invalid", r));
            }
            (uo(n, o), (l = null));
            for (var a in o)
              if (o.hasOwnProperty(a)) {
                var p = o[a];
                a === "children"
                  ? typeof p == "string"
                    ? r.textContent !== p &&
                      (o.suppressHydrationWarning !== !0 &&
                        ul(r.textContent, p, e),
                      (l = ["children", p]))
                    : typeof p == "number" &&
                      r.textContent !== "" + p &&
                      (o.suppressHydrationWarning !== !0 &&
                        ul(r.textContent, p, e),
                      (l = ["children", "" + p]))
                  : c.hasOwnProperty(a) &&
                    p != null &&
                    a === "onScroll" &&
                    de("scroll", r);
              }
            switch (n) {
              case "input":
                (Ur(r), ku(r, o, !0));
                break;
              case "textarea":
                (Ur(r), Cu(r));
                break;
              case "select":
              case "option":
                break;
              default:
                typeof o.onClick == "function" && (r.onclick = al);
            }
            ((r = l), (t.updateQueue = r), r !== null && (t.flags |= 4));
          } else {
            ((a = l.nodeType === 9 ? l : l.ownerDocument),
              e === "http://www.w3.org/1999/xhtml" && (e = Ru(n)),
              e === "http://www.w3.org/1999/xhtml"
                ? n === "script"
                  ? ((e = a.createElement("div")),
                    (e.innerHTML = "<script><\/script>"),
                    (e = e.removeChild(e.firstChild)))
                  : typeof r.is == "string"
                    ? (e = a.createElement(n, { is: r.is }))
                    : ((e = a.createElement(n)),
                      n === "select" &&
                        ((a = e),
                        r.multiple
                          ? (a.multiple = !0)
                          : r.size && (a.size = r.size)))
                : (e = a.createElementNS(e, n)),
              (e[xt] = t),
              (e[vr] = r),
              Fs(e, t, !1, !1),
              (t.stateNode = e));
            e: {
              switch (((a = ao(n, r)), n)) {
                case "dialog":
                  (de("cancel", e), de("close", e), (l = r));
                  break;
                case "iframe":
                case "object":
                case "embed":
                  (de("load", e), (l = r));
                  break;
                case "video":
                case "audio":
                  for (l = 0; l < pr.length; l++) de(pr[l], e);
                  l = r;
                  break;
                case "source":
                  (de("error", e), (l = r));
                  break;
                case "img":
                case "image":
                case "link":
                  (de("error", e), de("load", e), (l = r));
                  break;
                case "details":
                  (de("toggle", e), (l = r));
                  break;
                case "input":
                  (wu(e, r), (l = no(e, r)), de("invalid", e));
                  break;
                case "option":
                  l = r;
                  break;
                case "select":
                  ((e._wrapperState = { wasMultiple: !!r.multiple }),
                    (l = $({}, r, { value: void 0 })),
                    de("invalid", e));
                  break;
                case "textarea":
                  (Su(e, r), (l = oo(e, r)), de("invalid", e));
                  break;
                default:
                  l = r;
              }
              (uo(n, l), (p = l));
              for (o in p)
                if (p.hasOwnProperty(o)) {
                  var m = p[o];
                  o === "style"
                    ? Pu(e, m)
                    : o === "dangerouslySetInnerHTML"
                      ? ((m = m ? m.__html : void 0), m != null && ju(e, m))
                      : o === "children"
                        ? typeof m == "string"
                          ? (n !== "textarea" || m !== "") && qn(e, m)
                          : typeof m == "number" && qn(e, "" + m)
                        : o !== "suppressContentEditableWarning" &&
                          o !== "suppressHydrationWarning" &&
                          o !== "autoFocus" &&
                          (c.hasOwnProperty(o)
                            ? m != null && o === "onScroll" && de("scroll", e)
                            : m != null && J(e, o, m, a));
                }
              switch (n) {
                case "input":
                  (Ur(e), ku(e, r, !1));
                  break;
                case "textarea":
                  (Ur(e), Cu(e));
                  break;
                case "option":
                  r.value != null && e.setAttribute("value", "" + ue(r.value));
                  break;
                case "select":
                  ((e.multiple = !!r.multiple),
                    (o = r.value),
                    o != null
                      ? gn(e, !!r.multiple, o, !1)
                      : r.defaultValue != null &&
                        gn(e, !!r.multiple, r.defaultValue, !0));
                  break;
                default:
                  typeof l.onClick == "function" && (e.onclick = al);
              }
              switch (n) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  r = !!r.autoFocus;
                  break e;
                case "img":
                  r = !0;
                  break e;
                default:
                  r = !1;
              }
            }
            r && (t.flags |= 4);
          }
          t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
        }
        return (Ue(t), null);
      case 6:
        if (e && t.stateNode != null) As(e, t, e.memoizedProps, r);
        else {
          if (typeof r != "string" && t.stateNode === null) throw Error(u(166));
          if (((n = cn(kr.current)), cn(kt.current), ml(t))) {
            if (
              ((r = t.stateNode),
              (n = t.memoizedProps),
              (r[xt] = t),
              (o = r.nodeValue !== n) && ((e = et), e !== null))
            )
              switch (e.tag) {
                case 3:
                  ul(r.nodeValue, n, (e.mode & 1) !== 0);
                  break;
                case 5:
                  e.memoizedProps.suppressHydrationWarning !== !0 &&
                    ul(r.nodeValue, n, (e.mode & 1) !== 0);
              }
            o && (t.flags |= 4);
          } else
            ((r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)),
              (r[xt] = t),
              (t.stateNode = r));
        }
        return (Ue(t), null);
      case 13:
        if (
          (pe(ye),
          (r = t.memoizedState),
          e === null ||
            (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
        ) {
          if (me && tt !== null && (t.mode & 1) !== 0 && (t.flags & 128) === 0)
            (Ba(), Dn(), (t.flags |= 98560), (o = !1));
          else if (((o = ml(t)), r !== null && r.dehydrated !== null)) {
            if (e === null) {
              if (!o) throw Error(u(318));
              if (
                ((o = t.memoizedState),
                (o = o !== null ? o.dehydrated : null),
                !o)
              )
                throw Error(u(317));
              o[xt] = t;
            } else
              (Dn(),
                (t.flags & 128) === 0 && (t.memoizedState = null),
                (t.flags |= 4));
            (Ue(t), (o = !1));
          } else (pt !== null && (Ai(pt), (pt = null)), (o = !0));
          if (!o) return t.flags & 65536 ? t : null;
        }
        return (t.flags & 128) !== 0
          ? ((t.lanes = n), t)
          : ((r = r !== null),
            r !== (e !== null && e.memoizedState !== null) &&
              r &&
              ((t.child.flags |= 8192),
              (t.mode & 1) !== 0 &&
                (e === null || (ye.current & 1) !== 0
                  ? Pe === 0 && (Pe = 3)
                  : Bi())),
            t.updateQueue !== null && (t.flags |= 4),
            Ue(t),
            null);
      case 4:
        return (
          Fn(),
          Pi(e, t),
          e === null && hr(t.stateNode.containerInfo),
          Ue(t),
          null
        );
      case 10:
        return (ni(t.type._context), Ue(t), null);
      case 17:
        return (Ke(t.type) && cl(), Ue(t), null);
      case 19:
        if ((pe(ye), (o = t.memoizedState), o === null)) return (Ue(t), null);
        if (((r = (t.flags & 128) !== 0), (a = o.rendering), a === null))
          if (r) jr(o, !1);
          else {
            if (Pe !== 0 || (e !== null && (e.flags & 128) !== 0))
              for (e = t.child; e !== null; ) {
                if (((a = kl(e)), a !== null)) {
                  for (
                    t.flags |= 128,
                      jr(o, !1),
                      r = a.updateQueue,
                      r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                      t.subtreeFlags = 0,
                      r = n,
                      n = t.child;
                    n !== null;
                  )
                    ((o = n),
                      (e = r),
                      (o.flags &= 14680066),
                      (a = o.alternate),
                      a === null
                        ? ((o.childLanes = 0),
                          (o.lanes = e),
                          (o.child = null),
                          (o.subtreeFlags = 0),
                          (o.memoizedProps = null),
                          (o.memoizedState = null),
                          (o.updateQueue = null),
                          (o.dependencies = null),
                          (o.stateNode = null))
                        : ((o.childLanes = a.childLanes),
                          (o.lanes = a.lanes),
                          (o.child = a.child),
                          (o.subtreeFlags = 0),
                          (o.deletions = null),
                          (o.memoizedProps = a.memoizedProps),
                          (o.memoizedState = a.memoizedState),
                          (o.updateQueue = a.updateQueue),
                          (o.type = a.type),
                          (e = a.dependencies),
                          (o.dependencies =
                            e === null
                              ? null
                              : {
                                  lanes: e.lanes,
                                  firstContext: e.firstContext,
                                })),
                      (n = n.sibling));
                  return (fe(ye, (ye.current & 1) | 2), t.child);
                }
                e = e.sibling;
              }
            o.tail !== null &&
              Se() > Wn &&
              ((t.flags |= 128), (r = !0), jr(o, !1), (t.lanes = 4194304));
          }
        else {
          if (!r)
            if (((e = kl(a)), e !== null)) {
              if (
                ((t.flags |= 128),
                (r = !0),
                (n = e.updateQueue),
                n !== null && ((t.updateQueue = n), (t.flags |= 4)),
                jr(o, !0),
                o.tail === null &&
                  o.tailMode === "hidden" &&
                  !a.alternate &&
                  !me)
              )
                return (Ue(t), null);
            } else
              2 * Se() - o.renderingStartTime > Wn &&
                n !== 1073741824 &&
                ((t.flags |= 128), (r = !0), jr(o, !1), (t.lanes = 4194304));
          o.isBackwards
            ? ((a.sibling = t.child), (t.child = a))
            : ((n = o.last),
              n !== null ? (n.sibling = a) : (t.child = a),
              (o.last = a));
        }
        return o.tail !== null
          ? ((t = o.tail),
            (o.rendering = t),
            (o.tail = t.sibling),
            (o.renderingStartTime = Se()),
            (t.sibling = null),
            (n = ye.current),
            fe(ye, r ? (n & 1) | 2 : n & 1),
            t)
          : (Ue(t), null);
      case 22:
      case 23:
        return (
          Wi(),
          (r = t.memoizedState !== null),
          e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
          r && (t.mode & 1) !== 0
            ? (nt & 1073741824) !== 0 &&
              (Ue(t), t.subtreeFlags & 6 && (t.flags |= 8192))
            : Ue(t),
          null
        );
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(u(156, t.tag));
  }
  function Md(e, t) {
    switch ((Xo(t), t.tag)) {
      case 1:
        return (
          Ke(t.type) && cl(),
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 3:
        return (
          Fn(),
          pe(Qe),
          pe(Ie),
          si(),
          (e = t.flags),
          (e & 65536) !== 0 && (e & 128) === 0
            ? ((t.flags = (e & -65537) | 128), t)
            : null
        );
      case 5:
        return (ui(t), null);
      case 13:
        if (
          (pe(ye), (e = t.memoizedState), e !== null && e.dehydrated !== null)
        ) {
          if (t.alternate === null) throw Error(u(340));
          Dn();
        }
        return (
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 19:
        return (pe(ye), null);
      case 4:
        return (Fn(), null);
      case 10:
        return (ni(t.type._context), null);
      case 22:
      case 23:
        return (Wi(), null);
      case 24:
        return null;
      default:
        return null;
    }
  }
  var Ll = !1,
    Ae = !1,
    Od = typeof WeakSet == "function" ? WeakSet : Set,
    A = null;
  function An(e, t) {
    var n = e.ref;
    if (n !== null)
      if (typeof n == "function")
        try {
          n(null);
        } catch (r) {
          ke(e, t, r);
        }
      else n.current = null;
  }
  function _i(e, t, n) {
    try {
      n();
    } catch (r) {
      ke(e, t, r);
    }
  }
  var $s = !1;
  function Id(e, t) {
    if (((Wo = Xr), (e = ga()), Do(e))) {
      if ("selectionStart" in e)
        var n = { start: e.selectionStart, end: e.selectionEnd };
      else
        e: {
          n = ((n = e.ownerDocument) && n.defaultView) || window;
          var r = n.getSelection && n.getSelection();
          if (r && r.rangeCount !== 0) {
            n = r.anchorNode;
            var l = r.anchorOffset,
              o = r.focusNode;
            r = r.focusOffset;
            try {
              (n.nodeType, o.nodeType);
            } catch {
              n = null;
              break e;
            }
            var a = 0,
              p = -1,
              m = -1,
              S = 0,
              L = 0,
              T = e,
              P = null;
            t: for (;;) {
              for (
                var F;
                T !== n || (l !== 0 && T.nodeType !== 3) || (p = a + l),
                  T !== o || (r !== 0 && T.nodeType !== 3) || (m = a + r),
                  T.nodeType === 3 && (a += T.nodeValue.length),
                  (F = T.firstChild) !== null;
              )
                ((P = T), (T = F));
              for (;;) {
                if (T === e) break t;
                if (
                  (P === n && ++S === l && (p = a),
                  P === o && ++L === r && (m = a),
                  (F = T.nextSibling) !== null)
                )
                  break;
                ((T = P), (P = T.parentNode));
              }
              T = F;
            }
            n = p === -1 || m === -1 ? null : { start: p, end: m };
          } else n = null;
        }
      n = n || { start: 0, end: 0 };
    } else n = null;
    for (
      Bo = { focusedElem: e, selectionRange: n }, Xr = !1, A = t;
      A !== null;
    )
      if (((t = A), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
        ((e.return = t), (A = e));
      else
        for (; A !== null; ) {
          t = A;
          try {
            var W = t.alternate;
            if ((t.flags & 1024) !== 0)
              switch (t.tag) {
                case 0:
                case 11:
                case 15:
                  break;
                case 1:
                  if (W !== null) {
                    var B = W.memoizedProps,
                      Ee = W.memoizedState,
                      w = t.stateNode,
                      v = w.getSnapshotBeforeUpdate(
                        t.elementType === t.type ? B : ht(t.type, B),
                        Ee,
                      );
                    w.__reactInternalSnapshotBeforeUpdate = v;
                  }
                  break;
                case 3:
                  var x = t.stateNode.containerInfo;
                  x.nodeType === 1
                    ? (x.textContent = "")
                    : x.nodeType === 9 &&
                      x.documentElement &&
                      x.removeChild(x.documentElement);
                  break;
                case 5:
                case 6:
                case 4:
                case 17:
                  break;
                default:
                  throw Error(u(163));
              }
          } catch (z) {
            ke(t, t.return, z);
          }
          if (((e = t.sibling), e !== null)) {
            ((e.return = t.return), (A = e));
            break;
          }
          A = t.return;
        }
    return ((W = $s), ($s = !1), W);
  }
  function Nr(e, t, n) {
    var r = t.updateQueue;
    if (((r = r !== null ? r.lastEffect : null), r !== null)) {
      var l = (r = r.next);
      do {
        if ((l.tag & e) === e) {
          var o = l.destroy;
          ((l.destroy = void 0), o !== void 0 && _i(t, n, o));
        }
        l = l.next;
      } while (l !== r);
    }
  }
  function Tl(e, t) {
    if (
      ((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)
    ) {
      var n = (t = t.next);
      do {
        if ((n.tag & e) === e) {
          var r = n.create;
          n.destroy = r();
        }
        n = n.next;
      } while (n !== t);
    }
  }
  function Li(e) {
    var t = e.ref;
    if (t !== null) {
      var n = e.stateNode;
      switch (e.tag) {
        case 5:
          e = n;
          break;
        default:
          e = n;
      }
      typeof t == "function" ? t(e) : (t.current = e);
    }
  }
  function Ws(e) {
    var t = e.alternate;
    (t !== null && ((e.alternate = null), Ws(t)),
      (e.child = null),
      (e.deletions = null),
      (e.sibling = null),
      e.tag === 5 &&
        ((t = e.stateNode),
        t !== null &&
          (delete t[xt],
          delete t[vr],
          delete t[Ko],
          delete t[gd],
          delete t[wd])),
      (e.stateNode = null),
      (e.return = null),
      (e.dependencies = null),
      (e.memoizedProps = null),
      (e.memoizedState = null),
      (e.pendingProps = null),
      (e.stateNode = null),
      (e.updateQueue = null));
  }
  function Bs(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4;
  }
  function Hs(e) {
    e: for (;;) {
      for (; e.sibling === null; ) {
        if (e.return === null || Bs(e.return)) return null;
        e = e.return;
      }
      for (
        e.sibling.return = e.return, e = e.sibling;
        e.tag !== 5 && e.tag !== 6 && e.tag !== 18;
      ) {
        if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
        ((e.child.return = e), (e = e.child));
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Ti(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6)
      ((e = e.stateNode),
        t
          ? n.nodeType === 8
            ? n.parentNode.insertBefore(e, t)
            : n.insertBefore(e, t)
          : (n.nodeType === 8
              ? ((t = n.parentNode), t.insertBefore(e, n))
              : ((t = n), t.appendChild(e)),
            (n = n._reactRootContainer),
            n != null || t.onclick !== null || (t.onclick = al)));
    else if (r !== 4 && ((e = e.child), e !== null))
      for (Ti(e, t, n), e = e.sibling; e !== null; )
        (Ti(e, t, n), (e = e.sibling));
  }
  function zi(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6)
      ((e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e));
    else if (r !== 4 && ((e = e.child), e !== null))
      for (zi(e, t, n), e = e.sibling; e !== null; )
        (zi(e, t, n), (e = e.sibling));
  }
  var ze = null,
    mt = !1;
  function Gt(e, t, n) {
    for (n = n.child; n !== null; ) (Vs(e, t, n), (n = n.sibling));
  }
  function Vs(e, t, n) {
    if (wt && typeof wt.onCommitFiberUnmount == "function")
      try {
        wt.onCommitFiberUnmount(Vr, n);
      } catch {}
    switch (n.tag) {
      case 5:
        Ae || An(n, t);
      case 6:
        var r = ze,
          l = mt;
        ((ze = null),
          Gt(e, t, n),
          (ze = r),
          (mt = l),
          ze !== null &&
            (mt
              ? ((e = ze),
                (n = n.stateNode),
                e.nodeType === 8
                  ? e.parentNode.removeChild(n)
                  : e.removeChild(n))
              : ze.removeChild(n.stateNode)));
        break;
      case 18:
        ze !== null &&
          (mt
            ? ((e = ze),
              (n = n.stateNode),
              e.nodeType === 8
                ? Qo(e.parentNode, n)
                : e.nodeType === 1 && Qo(e, n),
              or(e))
            : Qo(ze, n.stateNode));
        break;
      case 4:
        ((r = ze),
          (l = mt),
          (ze = n.stateNode.containerInfo),
          (mt = !0),
          Gt(e, t, n),
          (ze = r),
          (mt = l));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (
          !Ae &&
          ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))
        ) {
          l = r = r.next;
          do {
            var o = l,
              a = o.destroy;
            ((o = o.tag),
              a !== void 0 && ((o & 2) !== 0 || (o & 4) !== 0) && _i(n, t, a),
              (l = l.next));
          } while (l !== r);
        }
        Gt(e, t, n);
        break;
      case 1:
        if (
          !Ae &&
          (An(n, t),
          (r = n.stateNode),
          typeof r.componentWillUnmount == "function")
        )
          try {
            ((r.props = n.memoizedProps),
              (r.state = n.memoizedState),
              r.componentWillUnmount());
          } catch (p) {
            ke(n, t, p);
          }
        Gt(e, t, n);
        break;
      case 21:
        Gt(e, t, n);
        break;
      case 22:
        n.mode & 1
          ? ((Ae = (r = Ae) || n.memoizedState !== null), Gt(e, t, n), (Ae = r))
          : Gt(e, t, n);
        break;
      default:
        Gt(e, t, n);
    }
  }
  function Qs(e) {
    var t = e.updateQueue;
    if (t !== null) {
      e.updateQueue = null;
      var n = e.stateNode;
      (n === null && (n = e.stateNode = new Od()),
        t.forEach(function (r) {
          var l = Qd.bind(null, e, r);
          n.has(r) || (n.add(r), r.then(l, l));
        }));
    }
  }
  function vt(e, t) {
    var n = t.deletions;
    if (n !== null)
      for (var r = 0; r < n.length; r++) {
        var l = n[r];
        try {
          var o = e,
            a = t,
            p = a;
          e: for (; p !== null; ) {
            switch (p.tag) {
              case 5:
                ((ze = p.stateNode), (mt = !1));
                break e;
              case 3:
                ((ze = p.stateNode.containerInfo), (mt = !0));
                break e;
              case 4:
                ((ze = p.stateNode.containerInfo), (mt = !0));
                break e;
            }
            p = p.return;
          }
          if (ze === null) throw Error(u(160));
          (Vs(o, a, l), (ze = null), (mt = !1));
          var m = l.alternate;
          (m !== null && (m.return = null), (l.return = null));
        } catch (S) {
          ke(l, t, S);
        }
      }
    if (t.subtreeFlags & 12854)
      for (t = t.child; t !== null; ) (Ks(t, e), (t = t.sibling));
  }
  function Ks(e, t) {
    var n = e.alternate,
      r = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if ((vt(t, e), Et(e), r & 4)) {
          try {
            (Nr(3, e, e.return), Tl(3, e));
          } catch (B) {
            ke(e, e.return, B);
          }
          try {
            Nr(5, e, e.return);
          } catch (B) {
            ke(e, e.return, B);
          }
        }
        break;
      case 1:
        (vt(t, e), Et(e), r & 512 && n !== null && An(n, n.return));
        break;
      case 5:
        if (
          (vt(t, e),
          Et(e),
          r & 512 && n !== null && An(n, n.return),
          e.flags & 32)
        ) {
          var l = e.stateNode;
          try {
            qn(l, "");
          } catch (B) {
            ke(e, e.return, B);
          }
        }
        if (r & 4 && ((l = e.stateNode), l != null)) {
          var o = e.memoizedProps,
            a = n !== null ? n.memoizedProps : o,
            p = e.type,
            m = e.updateQueue;
          if (((e.updateQueue = null), m !== null))
            try {
              (p === "input" &&
                o.type === "radio" &&
                o.name != null &&
                xu(l, o),
                ao(p, a));
              var S = ao(p, o);
              for (a = 0; a < m.length; a += 2) {
                var L = m[a],
                  T = m[a + 1];
                L === "style"
                  ? Pu(l, T)
                  : L === "dangerouslySetInnerHTML"
                    ? ju(l, T)
                    : L === "children"
                      ? qn(l, T)
                      : J(l, L, T, S);
              }
              switch (p) {
                case "input":
                  ro(l, o);
                  break;
                case "textarea":
                  Eu(l, o);
                  break;
                case "select":
                  var P = l._wrapperState.wasMultiple;
                  l._wrapperState.wasMultiple = !!o.multiple;
                  var F = o.value;
                  F != null
                    ? gn(l, !!o.multiple, F, !1)
                    : P !== !!o.multiple &&
                      (o.defaultValue != null
                        ? gn(l, !!o.multiple, o.defaultValue, !0)
                        : gn(l, !!o.multiple, o.multiple ? [] : "", !1));
              }
              l[vr] = o;
            } catch (B) {
              ke(e, e.return, B);
            }
        }
        break;
      case 6:
        if ((vt(t, e), Et(e), r & 4)) {
          if (e.stateNode === null) throw Error(u(162));
          ((l = e.stateNode), (o = e.memoizedProps));
          try {
            l.nodeValue = o;
          } catch (B) {
            ke(e, e.return, B);
          }
        }
        break;
      case 3:
        if (
          (vt(t, e), Et(e), r & 4 && n !== null && n.memoizedState.isDehydrated)
        )
          try {
            or(t.containerInfo);
          } catch (B) {
            ke(e, e.return, B);
          }
        break;
      case 4:
        (vt(t, e), Et(e));
        break;
      case 13:
        (vt(t, e),
          Et(e),
          (l = e.child),
          l.flags & 8192 &&
            ((o = l.memoizedState !== null),
            (l.stateNode.isHidden = o),
            !o ||
              (l.alternate !== null && l.alternate.memoizedState !== null) ||
              (Oi = Se())),
          r & 4 && Qs(e));
        break;
      case 22:
        if (
          ((L = n !== null && n.memoizedState !== null),
          e.mode & 1 ? ((Ae = (S = Ae) || L), vt(t, e), (Ae = S)) : vt(t, e),
          Et(e),
          r & 8192)
        ) {
          if (
            ((S = e.memoizedState !== null),
            (e.stateNode.isHidden = S) && !L && (e.mode & 1) !== 0)
          )
            for (A = e, L = e.child; L !== null; ) {
              for (T = A = L; A !== null; ) {
                switch (((P = A), (F = P.child), P.tag)) {
                  case 0:
                  case 11:
                  case 14:
                  case 15:
                    Nr(4, P, P.return);
                    break;
                  case 1:
                    An(P, P.return);
                    var W = P.stateNode;
                    if (typeof W.componentWillUnmount == "function") {
                      ((r = P), (n = P.return));
                      try {
                        ((t = r),
                          (W.props = t.memoizedProps),
                          (W.state = t.memoizedState),
                          W.componentWillUnmount());
                      } catch (B) {
                        ke(r, n, B);
                      }
                    }
                    break;
                  case 5:
                    An(P, P.return);
                    break;
                  case 22:
                    if (P.memoizedState !== null) {
                      Gs(T);
                      continue;
                    }
                }
                F !== null ? ((F.return = P), (A = F)) : Gs(T);
              }
              L = L.sibling;
            }
          e: for (L = null, T = e; ; ) {
            if (T.tag === 5) {
              if (L === null) {
                L = T;
                try {
                  ((l = T.stateNode),
                    S
                      ? ((o = l.style),
                        typeof o.setProperty == "function"
                          ? o.setProperty("display", "none", "important")
                          : (o.display = "none"))
                      : ((p = T.stateNode),
                        (m = T.memoizedProps.style),
                        (a =
                          m != null && m.hasOwnProperty("display")
                            ? m.display
                            : null),
                        (p.style.display = Nu("display", a))));
                } catch (B) {
                  ke(e, e.return, B);
                }
              }
            } else if (T.tag === 6) {
              if (L === null)
                try {
                  T.stateNode.nodeValue = S ? "" : T.memoizedProps;
                } catch (B) {
                  ke(e, e.return, B);
                }
            } else if (
              ((T.tag !== 22 && T.tag !== 23) ||
                T.memoizedState === null ||
                T === e) &&
              T.child !== null
            ) {
              ((T.child.return = T), (T = T.child));
              continue;
            }
            if (T === e) break e;
            for (; T.sibling === null; ) {
              if (T.return === null || T.return === e) break e;
              (L === T && (L = null), (T = T.return));
            }
            (L === T && (L = null),
              (T.sibling.return = T.return),
              (T = T.sibling));
          }
        }
        break;
      case 19:
        (vt(t, e), Et(e), r & 4 && Qs(e));
        break;
      case 21:
        break;
      default:
        (vt(t, e), Et(e));
    }
  }
  function Et(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        e: {
          for (var n = e.return; n !== null; ) {
            if (Bs(n)) {
              var r = n;
              break e;
            }
            n = n.return;
          }
          throw Error(u(160));
        }
        switch (r.tag) {
          case 5:
            var l = r.stateNode;
            r.flags & 32 && (qn(l, ""), (r.flags &= -33));
            var o = Hs(e);
            zi(e, o, l);
            break;
          case 3:
          case 4:
            var a = r.stateNode.containerInfo,
              p = Hs(e);
            Ti(e, p, a);
            break;
          default:
            throw Error(u(161));
        }
      } catch (m) {
        ke(e, e.return, m);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function Fd(e, t, n) {
    ((A = e), Ys(e));
  }
  function Ys(e, t, n) {
    for (var r = (e.mode & 1) !== 0; A !== null; ) {
      var l = A,
        o = l.child;
      if (l.tag === 22 && r) {
        var a = l.memoizedState !== null || Ll;
        if (!a) {
          var p = l.alternate,
            m = (p !== null && p.memoizedState !== null) || Ae;
          p = Ll;
          var S = Ae;
          if (((Ll = a), (Ae = m) && !S))
            for (A = l; A !== null; )
              ((a = A),
                (m = a.child),
                a.tag === 22 && a.memoizedState !== null
                  ? Xs(l)
                  : m !== null
                    ? ((m.return = a), (A = m))
                    : Xs(l));
          for (; o !== null; ) ((A = o), Ys(o), (o = o.sibling));
          ((A = l), (Ll = p), (Ae = S));
        }
        qs(e);
      } else
        (l.subtreeFlags & 8772) !== 0 && o !== null
          ? ((o.return = l), (A = o))
          : qs(e);
    }
  }
  function qs(e) {
    for (; A !== null; ) {
      var t = A;
      if ((t.flags & 8772) !== 0) {
        var n = t.alternate;
        try {
          if ((t.flags & 8772) !== 0)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                Ae || Tl(5, t);
                break;
              case 1:
                var r = t.stateNode;
                if (t.flags & 4 && !Ae)
                  if (n === null) r.componentDidMount();
                  else {
                    var l =
                      t.elementType === t.type
                        ? n.memoizedProps
                        : ht(t.type, n.memoizedProps);
                    r.componentDidUpdate(
                      l,
                      n.memoizedState,
                      r.__reactInternalSnapshotBeforeUpdate,
                    );
                  }
                var o = t.updateQueue;
                o !== null && Ga(t, o, r);
                break;
              case 3:
                var a = t.updateQueue;
                if (a !== null) {
                  if (((n = null), t.child !== null))
                    switch (t.child.tag) {
                      case 5:
                        n = t.child.stateNode;
                        break;
                      case 1:
                        n = t.child.stateNode;
                    }
                  Ga(t, a, n);
                }
                break;
              case 5:
                var p = t.stateNode;
                if (n === null && t.flags & 4) {
                  n = p;
                  var m = t.memoizedProps;
                  switch (t.type) {
                    case "button":
                    case "input":
                    case "select":
                    case "textarea":
                      m.autoFocus && n.focus();
                      break;
                    case "img":
                      m.src && (n.src = m.src);
                  }
                }
                break;
              case 6:
                break;
              case 4:
                break;
              case 12:
                break;
              case 13:
                if (t.memoizedState === null) {
                  var S = t.alternate;
                  if (S !== null) {
                    var L = S.memoizedState;
                    if (L !== null) {
                      var T = L.dehydrated;
                      T !== null && or(T);
                    }
                  }
                }
                break;
              case 19:
              case 17:
              case 21:
              case 22:
              case 23:
              case 25:
                break;
              default:
                throw Error(u(163));
            }
          Ae || (t.flags & 512 && Li(t));
        } catch (P) {
          ke(t, t.return, P);
        }
      }
      if (t === e) {
        A = null;
        break;
      }
      if (((n = t.sibling), n !== null)) {
        ((n.return = t.return), (A = n));
        break;
      }
      A = t.return;
    }
  }
  function Gs(e) {
    for (; A !== null; ) {
      var t = A;
      if (t === e) {
        A = null;
        break;
      }
      var n = t.sibling;
      if (n !== null) {
        ((n.return = t.return), (A = n));
        break;
      }
      A = t.return;
    }
  }
  function Xs(e) {
    for (; A !== null; ) {
      var t = A;
      try {
        switch (t.tag) {
          case 0:
          case 11:
          case 15:
            var n = t.return;
            try {
              Tl(4, t);
            } catch (m) {
              ke(t, n, m);
            }
            break;
          case 1:
            var r = t.stateNode;
            if (typeof r.componentDidMount == "function") {
              var l = t.return;
              try {
                r.componentDidMount();
              } catch (m) {
                ke(t, l, m);
              }
            }
            var o = t.return;
            try {
              Li(t);
            } catch (m) {
              ke(t, o, m);
            }
            break;
          case 5:
            var a = t.return;
            try {
              Li(t);
            } catch (m) {
              ke(t, a, m);
            }
        }
      } catch (m) {
        ke(t, t.return, m);
      }
      if (t === e) {
        A = null;
        break;
      }
      var p = t.sibling;
      if (p !== null) {
        ((p.return = t.return), (A = p));
        break;
      }
      A = t.return;
    }
  }
  var Ud = Math.ceil,
    zl = ne.ReactCurrentDispatcher,
    Di = ne.ReactCurrentOwner,
    at = ne.ReactCurrentBatchConfig,
    te = 0,
    Le = null,
    Ce = null,
    De = 0,
    nt = 0,
    $n = Vt(0),
    Pe = 0,
    Pr = null,
    dn = 0,
    Dl = 0,
    Mi = 0,
    _r = null,
    qe = null,
    Oi = 0,
    Wn = 1 / 0,
    Dt = null,
    Ml = !1,
    Ii = null,
    Xt = null,
    Ol = !1,
    Jt = null,
    Il = 0,
    Lr = 0,
    Fi = null,
    Fl = -1,
    Ul = 0;
  function We() {
    return (te & 6) !== 0 ? Se() : Fl !== -1 ? Fl : (Fl = Se());
  }
  function Zt(e) {
    return (e.mode & 1) === 0
      ? 1
      : (te & 2) !== 0 && De !== 0
        ? De & -De
        : kd.transition !== null
          ? (Ul === 0 && (Ul = Hu()), Ul)
          : ((e = ae),
            e !== 0 ||
              ((e = window.event), (e = e === void 0 ? 16 : Zu(e.type))),
            e);
  }
  function yt(e, t, n, r) {
    if (50 < Lr) throw ((Lr = 0), (Fi = null), Error(u(185)));
    (er(e, n, r),
      ((te & 2) === 0 || e !== Le) &&
        (e === Le && ((te & 2) === 0 && (Dl |= n), Pe === 4 && bt(e, De)),
        Ge(e, r),
        n === 1 &&
          te === 0 &&
          (t.mode & 1) === 0 &&
          ((Wn = Se() + 500), dl && Kt())));
  }
  function Ge(e, t) {
    var n = e.callbackNode;
    kf(e, t);
    var r = Yr(e, e === Le ? De : 0);
    if (r === 0)
      (n !== null && $u(n), (e.callbackNode = null), (e.callbackPriority = 0));
    else if (((t = r & -r), e.callbackPriority !== t)) {
      if ((n != null && $u(n), t === 1))
        (e.tag === 0 ? xd(Zs.bind(null, e)) : Fa(Zs.bind(null, e)),
          vd(function () {
            (te & 6) === 0 && Kt();
          }),
          (n = null));
      else {
        switch (Vu(r)) {
          case 1:
            n = vo;
            break;
          case 4:
            n = Wu;
            break;
          case 16:
            n = Hr;
            break;
          case 536870912:
            n = Bu;
            break;
          default:
            n = Hr;
        }
        n = ic(n, Js.bind(null, e));
      }
      ((e.callbackPriority = t), (e.callbackNode = n));
    }
  }
  function Js(e, t) {
    if (((Fl = -1), (Ul = 0), (te & 6) !== 0)) throw Error(u(327));
    var n = e.callbackNode;
    if (Bn() && e.callbackNode !== n) return null;
    var r = Yr(e, e === Le ? De : 0);
    if (r === 0) return null;
    if ((r & 30) !== 0 || (r & e.expiredLanes) !== 0 || t) t = Al(e, r);
    else {
      t = r;
      var l = te;
      te |= 2;
      var o = ec();
      (Le !== e || De !== t) && ((Dt = null), (Wn = Se() + 500), hn(e, t));
      do
        try {
          Wd();
          break;
        } catch (p) {
          bs(e, p);
        }
      while (!0);
      (ti(),
        (zl.current = o),
        (te = l),
        Ce !== null ? (t = 0) : ((Le = null), (De = 0), (t = Pe)));
    }
    if (t !== 0) {
      if (
        (t === 2 && ((l = yo(e)), l !== 0 && ((r = l), (t = Ui(e, l)))),
        t === 1)
      )
        throw ((n = Pr), hn(e, 0), bt(e, r), Ge(e, Se()), n);
      if (t === 6) bt(e, r);
      else {
        if (
          ((l = e.current.alternate),
          (r & 30) === 0 &&
            !Ad(l) &&
            ((t = Al(e, r)),
            t === 2 && ((o = yo(e)), o !== 0 && ((r = o), (t = Ui(e, o)))),
            t === 1))
        )
          throw ((n = Pr), hn(e, 0), bt(e, r), Ge(e, Se()), n);
        switch (((e.finishedWork = l), (e.finishedLanes = r), t)) {
          case 0:
          case 1:
            throw Error(u(345));
          case 2:
            mn(e, qe, Dt);
            break;
          case 3:
            if (
              (bt(e, r),
              (r & 130023424) === r && ((t = Oi + 500 - Se()), 10 < t))
            ) {
              if (Yr(e, 0) !== 0) break;
              if (((l = e.suspendedLanes), (l & r) !== r)) {
                (We(), (e.pingedLanes |= e.suspendedLanes & l));
                break;
              }
              e.timeoutHandle = Vo(mn.bind(null, e, qe, Dt), t);
              break;
            }
            mn(e, qe, Dt);
            break;
          case 4:
            if ((bt(e, r), (r & 4194240) === r)) break;
            for (t = e.eventTimes, l = -1; 0 < r; ) {
              var a = 31 - ft(r);
              ((o = 1 << a), (a = t[a]), a > l && (l = a), (r &= ~o));
            }
            if (
              ((r = l),
              (r = Se() - r),
              (r =
                (120 > r
                  ? 120
                  : 480 > r
                    ? 480
                    : 1080 > r
                      ? 1080
                      : 1920 > r
                        ? 1920
                        : 3e3 > r
                          ? 3e3
                          : 4320 > r
                            ? 4320
                            : 1960 * Ud(r / 1960)) - r),
              10 < r)
            ) {
              e.timeoutHandle = Vo(mn.bind(null, e, qe, Dt), r);
              break;
            }
            mn(e, qe, Dt);
            break;
          case 5:
            mn(e, qe, Dt);
            break;
          default:
            throw Error(u(329));
        }
      }
    }
    return (Ge(e, Se()), e.callbackNode === n ? Js.bind(null, e) : null);
  }
  function Ui(e, t) {
    var n = _r;
    return (
      e.current.memoizedState.isDehydrated && (hn(e, t).flags |= 256),
      (e = Al(e, t)),
      e !== 2 && ((t = qe), (qe = n), t !== null && Ai(t)),
      e
    );
  }
  function Ai(e) {
    qe === null ? (qe = e) : qe.push.apply(qe, e);
  }
  function Ad(e) {
    for (var t = e; ; ) {
      if (t.flags & 16384) {
        var n = t.updateQueue;
        if (n !== null && ((n = n.stores), n !== null))
          for (var r = 0; r < n.length; r++) {
            var l = n[r],
              o = l.getSnapshot;
            l = l.value;
            try {
              if (!dt(o(), l)) return !1;
            } catch {
              return !1;
            }
          }
      }
      if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
        ((n.return = t), (t = n));
      else {
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return !0;
          t = t.return;
        }
        ((t.sibling.return = t.return), (t = t.sibling));
      }
    }
    return !0;
  }
  function bt(e, t) {
    for (
      t &= ~Mi,
        t &= ~Dl,
        e.suspendedLanes |= t,
        e.pingedLanes &= ~t,
        e = e.expirationTimes;
      0 < t;
    ) {
      var n = 31 - ft(t),
        r = 1 << n;
      ((e[n] = -1), (t &= ~r));
    }
  }
  function Zs(e) {
    if ((te & 6) !== 0) throw Error(u(327));
    Bn();
    var t = Yr(e, 0);
    if ((t & 1) === 0) return (Ge(e, Se()), null);
    var n = Al(e, t);
    if (e.tag !== 0 && n === 2) {
      var r = yo(e);
      r !== 0 && ((t = r), (n = Ui(e, r)));
    }
    if (n === 1) throw ((n = Pr), hn(e, 0), bt(e, t), Ge(e, Se()), n);
    if (n === 6) throw Error(u(345));
    return (
      (e.finishedWork = e.current.alternate),
      (e.finishedLanes = t),
      mn(e, qe, Dt),
      Ge(e, Se()),
      null
    );
  }
  function $i(e, t) {
    var n = te;
    te |= 1;
    try {
      return e(t);
    } finally {
      ((te = n), te === 0 && ((Wn = Se() + 500), dl && Kt()));
    }
  }
  function pn(e) {
    Jt !== null && Jt.tag === 0 && (te & 6) === 0 && Bn();
    var t = te;
    te |= 1;
    var n = at.transition,
      r = ae;
    try {
      if (((at.transition = null), (ae = 1), e)) return e();
    } finally {
      ((ae = r), (at.transition = n), (te = t), (te & 6) === 0 && Kt());
    }
  }
  function Wi() {
    ((nt = $n.current), pe($n));
  }
  function hn(e, t) {
    ((e.finishedWork = null), (e.finishedLanes = 0));
    var n = e.timeoutHandle;
    if ((n !== -1 && ((e.timeoutHandle = -1), md(n)), Ce !== null))
      for (n = Ce.return; n !== null; ) {
        var r = n;
        switch ((Xo(r), r.tag)) {
          case 1:
            ((r = r.type.childContextTypes), r != null && cl());
            break;
          case 3:
            (Fn(), pe(Qe), pe(Ie), si());
            break;
          case 5:
            ui(r);
            break;
          case 4:
            Fn();
            break;
          case 13:
            pe(ye);
            break;
          case 19:
            pe(ye);
            break;
          case 10:
            ni(r.type._context);
            break;
          case 22:
          case 23:
            Wi();
        }
        n = n.return;
      }
    if (
      ((Le = e),
      (Ce = e = en(e.current, null)),
      (De = nt = t),
      (Pe = 0),
      (Pr = null),
      (Mi = Dl = dn = 0),
      (qe = _r = null),
      sn !== null)
    ) {
      for (t = 0; t < sn.length; t++)
        if (((n = sn[t]), (r = n.interleaved), r !== null)) {
          n.interleaved = null;
          var l = r.next,
            o = n.pending;
          if (o !== null) {
            var a = o.next;
            ((o.next = l), (r.next = a));
          }
          n.pending = r;
        }
      sn = null;
    }
    return e;
  }
  function bs(e, t) {
    do {
      var n = Ce;
      try {
        if ((ti(), (Sl.current = jl), El)) {
          for (var r = ge.memoizedState; r !== null; ) {
            var l = r.queue;
            (l !== null && (l.pending = null), (r = r.next));
          }
          El = !1;
        }
        if (
          ((fn = 0),
          (_e = Ne = ge = null),
          (Sr = !1),
          (Er = 0),
          (Di.current = null),
          n === null || n.return === null)
        ) {
          ((Pe = 1), (Pr = t), (Ce = null));
          break;
        }
        e: {
          var o = e,
            a = n.return,
            p = n,
            m = t;
          if (
            ((t = De),
            (p.flags |= 32768),
            m !== null && typeof m == "object" && typeof m.then == "function")
          ) {
            var S = m,
              L = p,
              T = L.tag;
            if ((L.mode & 1) === 0 && (T === 0 || T === 11 || T === 15)) {
              var P = L.alternate;
              P
                ? ((L.updateQueue = P.updateQueue),
                  (L.memoizedState = P.memoizedState),
                  (L.lanes = P.lanes))
                : ((L.updateQueue = null), (L.memoizedState = null));
            }
            var F = Cs(a);
            if (F !== null) {
              ((F.flags &= -257),
                Rs(F, a, p, o, t),
                F.mode & 1 && Es(o, S, t),
                (t = F),
                (m = S));
              var W = t.updateQueue;
              if (W === null) {
                var B = new Set();
                (B.add(m), (t.updateQueue = B));
              } else W.add(m);
              break e;
            } else {
              if ((t & 1) === 0) {
                (Es(o, S, t), Bi());
                break e;
              }
              m = Error(u(426));
            }
          } else if (me && p.mode & 1) {
            var Ee = Cs(a);
            if (Ee !== null) {
              ((Ee.flags & 65536) === 0 && (Ee.flags |= 256),
                Rs(Ee, a, p, o, t),
                bo(Un(m, p)));
              break e;
            }
          }
          ((o = m = Un(m, p)),
            Pe !== 4 && (Pe = 2),
            _r === null ? (_r = [o]) : _r.push(o),
            (o = a));
          do {
            switch (o.tag) {
              case 3:
                ((o.flags |= 65536), (t &= -t), (o.lanes |= t));
                var w = ks(o, m, t);
                qa(o, w);
                break e;
              case 1:
                p = m;
                var v = o.type,
                  x = o.stateNode;
                if (
                  (o.flags & 128) === 0 &&
                  (typeof v.getDerivedStateFromError == "function" ||
                    (x !== null &&
                      typeof x.componentDidCatch == "function" &&
                      (Xt === null || !Xt.has(x))))
                ) {
                  ((o.flags |= 65536), (t &= -t), (o.lanes |= t));
                  var z = Ss(o, p, t);
                  qa(o, z);
                  break e;
                }
            }
            o = o.return;
          } while (o !== null);
        }
        nc(n);
      } catch (H) {
        ((t = H), Ce === n && n !== null && (Ce = n = n.return));
        continue;
      }
      break;
    } while (!0);
  }
  function ec() {
    var e = zl.current;
    return ((zl.current = jl), e === null ? jl : e);
  }
  function Bi() {
    ((Pe === 0 || Pe === 3 || Pe === 2) && (Pe = 4),
      Le === null ||
        ((dn & 268435455) === 0 && (Dl & 268435455) === 0) ||
        bt(Le, De));
  }
  function Al(e, t) {
    var n = te;
    te |= 2;
    var r = ec();
    (Le !== e || De !== t) && ((Dt = null), hn(e, t));
    do
      try {
        $d();
        break;
      } catch (l) {
        bs(e, l);
      }
    while (!0);
    if ((ti(), (te = n), (zl.current = r), Ce !== null)) throw Error(u(261));
    return ((Le = null), (De = 0), Pe);
  }
  function $d() {
    for (; Ce !== null; ) tc(Ce);
  }
  function Wd() {
    for (; Ce !== null && !df(); ) tc(Ce);
  }
  function tc(e) {
    var t = oc(e.alternate, e, nt);
    ((e.memoizedProps = e.pendingProps),
      t === null ? nc(e) : (Ce = t),
      (Di.current = null));
  }
  function nc(e) {
    var t = e;
    do {
      var n = t.alternate;
      if (((e = t.return), (t.flags & 32768) === 0)) {
        if (((n = Dd(n, t, nt)), n !== null)) {
          Ce = n;
          return;
        }
      } else {
        if (((n = Md(n, t)), n !== null)) {
          ((n.flags &= 32767), (Ce = n));
          return;
        }
        if (e !== null)
          ((e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null));
        else {
          ((Pe = 6), (Ce = null));
          return;
        }
      }
      if (((t = t.sibling), t !== null)) {
        Ce = t;
        return;
      }
      Ce = t = e;
    } while (t !== null);
    Pe === 0 && (Pe = 5);
  }
  function mn(e, t, n) {
    var r = ae,
      l = at.transition;
    try {
      ((at.transition = null), (ae = 1), Bd(e, t, n, r));
    } finally {
      ((at.transition = l), (ae = r));
    }
    return null;
  }
  function Bd(e, t, n, r) {
    do Bn();
    while (Jt !== null);
    if ((te & 6) !== 0) throw Error(u(327));
    n = e.finishedWork;
    var l = e.finishedLanes;
    if (n === null) return null;
    if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
      throw Error(u(177));
    ((e.callbackNode = null), (e.callbackPriority = 0));
    var o = n.lanes | n.childLanes;
    if (
      (Sf(e, o),
      e === Le && ((Ce = Le = null), (De = 0)),
      ((n.subtreeFlags & 2064) === 0 && (n.flags & 2064) === 0) ||
        Ol ||
        ((Ol = !0),
        ic(Hr, function () {
          return (Bn(), null);
        })),
      (o = (n.flags & 15990) !== 0),
      (n.subtreeFlags & 15990) !== 0 || o)
    ) {
      ((o = at.transition), (at.transition = null));
      var a = ae;
      ae = 1;
      var p = te;
      ((te |= 4),
        (Di.current = null),
        Id(e, n),
        Ks(n, e),
        ad(Bo),
        (Xr = !!Wo),
        (Bo = Wo = null),
        (e.current = n),
        Fd(n),
        pf(),
        (te = p),
        (ae = a),
        (at.transition = o));
    } else e.current = n;
    if (
      (Ol && ((Ol = !1), (Jt = e), (Il = l)),
      (o = e.pendingLanes),
      o === 0 && (Xt = null),
      vf(n.stateNode),
      Ge(e, Se()),
      t !== null)
    )
      for (r = e.onRecoverableError, n = 0; n < t.length; n++)
        ((l = t[n]), r(l.value, { componentStack: l.stack, digest: l.digest }));
    if (Ml) throw ((Ml = !1), (e = Ii), (Ii = null), e);
    return (
      (Il & 1) !== 0 && e.tag !== 0 && Bn(),
      (o = e.pendingLanes),
      (o & 1) !== 0 ? (e === Fi ? Lr++ : ((Lr = 0), (Fi = e))) : (Lr = 0),
      Kt(),
      null
    );
  }
  function Bn() {
    if (Jt !== null) {
      var e = Vu(Il),
        t = at.transition,
        n = ae;
      try {
        if (((at.transition = null), (ae = 16 > e ? 16 : e), Jt === null))
          var r = !1;
        else {
          if (((e = Jt), (Jt = null), (Il = 0), (te & 6) !== 0))
            throw Error(u(331));
          var l = te;
          for (te |= 4, A = e.current; A !== null; ) {
            var o = A,
              a = o.child;
            if ((A.flags & 16) !== 0) {
              var p = o.deletions;
              if (p !== null) {
                for (var m = 0; m < p.length; m++) {
                  var S = p[m];
                  for (A = S; A !== null; ) {
                    var L = A;
                    switch (L.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Nr(8, L, o);
                    }
                    var T = L.child;
                    if (T !== null) ((T.return = L), (A = T));
                    else
                      for (; A !== null; ) {
                        L = A;
                        var P = L.sibling,
                          F = L.return;
                        if ((Ws(L), L === S)) {
                          A = null;
                          break;
                        }
                        if (P !== null) {
                          ((P.return = F), (A = P));
                          break;
                        }
                        A = F;
                      }
                  }
                }
                var W = o.alternate;
                if (W !== null) {
                  var B = W.child;
                  if (B !== null) {
                    W.child = null;
                    do {
                      var Ee = B.sibling;
                      ((B.sibling = null), (B = Ee));
                    } while (B !== null);
                  }
                }
                A = o;
              }
            }
            if ((o.subtreeFlags & 2064) !== 0 && a !== null)
              ((a.return = o), (A = a));
            else
              e: for (; A !== null; ) {
                if (((o = A), (o.flags & 2048) !== 0))
                  switch (o.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Nr(9, o, o.return);
                  }
                var w = o.sibling;
                if (w !== null) {
                  ((w.return = o.return), (A = w));
                  break e;
                }
                A = o.return;
              }
          }
          var v = e.current;
          for (A = v; A !== null; ) {
            a = A;
            var x = a.child;
            if ((a.subtreeFlags & 2064) !== 0 && x !== null)
              ((x.return = a), (A = x));
            else
              e: for (a = v; A !== null; ) {
                if (((p = A), (p.flags & 2048) !== 0))
                  try {
                    switch (p.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Tl(9, p);
                    }
                  } catch (H) {
                    ke(p, p.return, H);
                  }
                if (p === a) {
                  A = null;
                  break e;
                }
                var z = p.sibling;
                if (z !== null) {
                  ((z.return = p.return), (A = z));
                  break e;
                }
                A = p.return;
              }
          }
          if (
            ((te = l),
            Kt(),
            wt && typeof wt.onPostCommitFiberRoot == "function")
          )
            try {
              wt.onPostCommitFiberRoot(Vr, e);
            } catch {}
          r = !0;
        }
        return r;
      } finally {
        ((ae = n), (at.transition = t));
      }
    }
    return !1;
  }
  function rc(e, t, n) {
    ((t = Un(n, t)),
      (t = ks(e, t, 1)),
      (e = qt(e, t, 1)),
      (t = We()),
      e !== null && (er(e, 1, t), Ge(e, t)));
  }
  function ke(e, t, n) {
    if (e.tag === 3) rc(e, e, n);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          rc(t, e, n);
          break;
        } else if (t.tag === 1) {
          var r = t.stateNode;
          if (
            typeof t.type.getDerivedStateFromError == "function" ||
            (typeof r.componentDidCatch == "function" &&
              (Xt === null || !Xt.has(r)))
          ) {
            ((e = Un(n, e)),
              (e = Ss(t, e, 1)),
              (t = qt(t, e, 1)),
              (e = We()),
              t !== null && (er(t, 1, e), Ge(t, e)));
            break;
          }
        }
        t = t.return;
      }
  }
  function Hd(e, t, n) {
    var r = e.pingCache;
    (r !== null && r.delete(t),
      (t = We()),
      (e.pingedLanes |= e.suspendedLanes & n),
      Le === e &&
        (De & n) === n &&
        (Pe === 4 || (Pe === 3 && (De & 130023424) === De && 500 > Se() - Oi)
          ? hn(e, 0)
          : (Mi |= n)),
      Ge(e, t));
  }
  function lc(e, t) {
    t === 0 &&
      ((e.mode & 1) === 0
        ? (t = 1)
        : ((t = Kr), (Kr <<= 1), (Kr & 130023424) === 0 && (Kr = 4194304)));
    var n = We();
    ((e = Lt(e, t)), e !== null && (er(e, t, n), Ge(e, n)));
  }
  function Vd(e) {
    var t = e.memoizedState,
      n = 0;
    (t !== null && (n = t.retryLane), lc(e, n));
  }
  function Qd(e, t) {
    var n = 0;
    switch (e.tag) {
      case 13:
        var r = e.stateNode,
          l = e.memoizedState;
        l !== null && (n = l.retryLane);
        break;
      case 19:
        r = e.stateNode;
        break;
      default:
        throw Error(u(314));
    }
    (r !== null && r.delete(t), lc(e, n));
  }
  var oc;
  oc = function (e, t, n) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps || Qe.current) Ye = !0;
      else {
        if ((e.lanes & n) === 0 && (t.flags & 128) === 0)
          return ((Ye = !1), zd(e, t, n));
        Ye = (e.flags & 131072) !== 0;
      }
    else ((Ye = !1), me && (t.flags & 1048576) !== 0 && Ua(t, hl, t.index));
    switch (((t.lanes = 0), t.tag)) {
      case 2:
        var r = t.type;
        (_l(e, t), (e = t.pendingProps));
        var l = Ln(t, Ie.current);
        (In(t, n), (l = di(null, t, r, e, l, n)));
        var o = pi();
        return (
          (t.flags |= 1),
          typeof l == "object" &&
          l !== null &&
          typeof l.render == "function" &&
          l.$$typeof === void 0
            ? ((t.tag = 1),
              (t.memoizedState = null),
              (t.updateQueue = null),
              Ke(r) ? ((o = !0), fl(t)) : (o = !1),
              (t.memoizedState =
                l.state !== null && l.state !== void 0 ? l.state : null),
              oi(t),
              (l.updater = Nl),
              (t.stateNode = l),
              (l._reactInternals = t),
              wi(t, r, e, n),
              (t = Ei(null, t, r, !0, o, n)))
            : ((t.tag = 0), me && o && Go(t), $e(null, t, l, n), (t = t.child)),
          t
        );
      case 16:
        r = t.elementType;
        e: {
          switch (
            (_l(e, t),
            (e = t.pendingProps),
            (l = r._init),
            (r = l(r._payload)),
            (t.type = r),
            (l = t.tag = Yd(r)),
            (e = ht(r, e)),
            l)
          ) {
            case 0:
              t = Si(null, t, r, e, n);
              break e;
            case 1:
              t = Ts(null, t, r, e, n);
              break e;
            case 11:
              t = js(null, t, r, e, n);
              break e;
            case 14:
              t = Ns(null, t, r, ht(r.type, e), n);
              break e;
          }
          throw Error(u(306, r, ""));
        }
        return t;
      case 0:
        return (
          (r = t.type),
          (l = t.pendingProps),
          (l = t.elementType === r ? l : ht(r, l)),
          Si(e, t, r, l, n)
        );
      case 1:
        return (
          (r = t.type),
          (l = t.pendingProps),
          (l = t.elementType === r ? l : ht(r, l)),
          Ts(e, t, r, l, n)
        );
      case 3:
        e: {
          if ((zs(t), e === null)) throw Error(u(387));
          ((r = t.pendingProps),
            (o = t.memoizedState),
            (l = o.element),
            Ya(e, t),
            xl(t, r, null, n));
          var a = t.memoizedState;
          if (((r = a.element), o.isDehydrated))
            if (
              ((o = {
                element: r,
                isDehydrated: !1,
                cache: a.cache,
                pendingSuspenseBoundaries: a.pendingSuspenseBoundaries,
                transitions: a.transitions,
              }),
              (t.updateQueue.baseState = o),
              (t.memoizedState = o),
              t.flags & 256)
            ) {
              ((l = Un(Error(u(423)), t)), (t = Ds(e, t, r, n, l)));
              break e;
            } else if (r !== l) {
              ((l = Un(Error(u(424)), t)), (t = Ds(e, t, r, n, l)));
              break e;
            } else
              for (
                tt = Ht(t.stateNode.containerInfo.firstChild),
                  et = t,
                  me = !0,
                  pt = null,
                  n = Qa(t, null, r, n),
                  t.child = n;
                n;
              )
                ((n.flags = (n.flags & -3) | 4096), (n = n.sibling));
          else {
            if ((Dn(), r === l)) {
              t = zt(e, t, n);
              break e;
            }
            $e(e, t, r, n);
          }
          t = t.child;
        }
        return t;
      case 5:
        return (
          Xa(t),
          e === null && Zo(t),
          (r = t.type),
          (l = t.pendingProps),
          (o = e !== null ? e.memoizedProps : null),
          (a = l.children),
          Ho(r, l) ? (a = null) : o !== null && Ho(r, o) && (t.flags |= 32),
          Ls(e, t),
          $e(e, t, a, n),
          t.child
        );
      case 6:
        return (e === null && Zo(t), null);
      case 13:
        return Ms(e, t, n);
      case 4:
        return (
          ii(t, t.stateNode.containerInfo),
          (r = t.pendingProps),
          e === null ? (t.child = Mn(t, null, r, n)) : $e(e, t, r, n),
          t.child
        );
      case 11:
        return (
          (r = t.type),
          (l = t.pendingProps),
          (l = t.elementType === r ? l : ht(r, l)),
          js(e, t, r, l, n)
        );
      case 7:
        return ($e(e, t, t.pendingProps, n), t.child);
      case 8:
        return ($e(e, t, t.pendingProps.children, n), t.child);
      case 12:
        return ($e(e, t, t.pendingProps.children, n), t.child);
      case 10:
        e: {
          if (
            ((r = t.type._context),
            (l = t.pendingProps),
            (o = t.memoizedProps),
            (a = l.value),
            fe(yl, r._currentValue),
            (r._currentValue = a),
            o !== null)
          )
            if (dt(o.value, a)) {
              if (o.children === l.children && !Qe.current) {
                t = zt(e, t, n);
                break e;
              }
            } else
              for (o = t.child, o !== null && (o.return = t); o !== null; ) {
                var p = o.dependencies;
                if (p !== null) {
                  a = o.child;
                  for (var m = p.firstContext; m !== null; ) {
                    if (m.context === r) {
                      if (o.tag === 1) {
                        ((m = Tt(-1, n & -n)), (m.tag = 2));
                        var S = o.updateQueue;
                        if (S !== null) {
                          S = S.shared;
                          var L = S.pending;
                          (L === null
                            ? (m.next = m)
                            : ((m.next = L.next), (L.next = m)),
                            (S.pending = m));
                        }
                      }
                      ((o.lanes |= n),
                        (m = o.alternate),
                        m !== null && (m.lanes |= n),
                        ri(o.return, n, t),
                        (p.lanes |= n));
                      break;
                    }
                    m = m.next;
                  }
                } else if (o.tag === 10) a = o.type === t.type ? null : o.child;
                else if (o.tag === 18) {
                  if (((a = o.return), a === null)) throw Error(u(341));
                  ((a.lanes |= n),
                    (p = a.alternate),
                    p !== null && (p.lanes |= n),
                    ri(a, n, t),
                    (a = o.sibling));
                } else a = o.child;
                if (a !== null) a.return = o;
                else
                  for (a = o; a !== null; ) {
                    if (a === t) {
                      a = null;
                      break;
                    }
                    if (((o = a.sibling), o !== null)) {
                      ((o.return = a.return), (a = o));
                      break;
                    }
                    a = a.return;
                  }
                o = a;
              }
          ($e(e, t, l.children, n), (t = t.child));
        }
        return t;
      case 9:
        return (
          (l = t.type),
          (r = t.pendingProps.children),
          In(t, n),
          (l = it(l)),
          (r = r(l)),
          (t.flags |= 1),
          $e(e, t, r, n),
          t.child
        );
      case 14:
        return (
          (r = t.type),
          (l = ht(r, t.pendingProps)),
          (l = ht(r.type, l)),
          Ns(e, t, r, l, n)
        );
      case 15:
        return Ps(e, t, t.type, t.pendingProps, n);
      case 17:
        return (
          (r = t.type),
          (l = t.pendingProps),
          (l = t.elementType === r ? l : ht(r, l)),
          _l(e, t),
          (t.tag = 1),
          Ke(r) ? ((e = !0), fl(t)) : (e = !1),
          In(t, n),
          ws(t, r, l),
          wi(t, r, l, n),
          Ei(null, t, r, !0, e, n)
        );
      case 19:
        return Is(e, t, n);
      case 22:
        return _s(e, t, n);
    }
    throw Error(u(156, t.tag));
  };
  function ic(e, t) {
    return Au(e, t);
  }
  function Kd(e, t, n, r) {
    ((this.tag = e),
      (this.key = n),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.ref = null),
      (this.pendingProps = t),
      (this.dependencies =
        this.memoizedState =
        this.updateQueue =
        this.memoizedProps =
          null),
      (this.mode = r),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null));
  }
  function st(e, t, n, r) {
    return new Kd(e, t, n, r);
  }
  function Hi(e) {
    return ((e = e.prototype), !(!e || !e.isReactComponent));
  }
  function Yd(e) {
    if (typeof e == "function") return Hi(e) ? 1 : 0;
    if (e != null) {
      if (((e = e.$$typeof), e === rt)) return 11;
      if (e === je) return 14;
    }
    return 2;
  }
  function en(e, t) {
    var n = e.alternate;
    return (
      n === null
        ? ((n = st(e.tag, t, e.key, e.mode)),
          (n.elementType = e.elementType),
          (n.type = e.type),
          (n.stateNode = e.stateNode),
          (n.alternate = e),
          (e.alternate = n))
        : ((n.pendingProps = t),
          (n.type = e.type),
          (n.flags = 0),
          (n.subtreeFlags = 0),
          (n.deletions = null)),
      (n.flags = e.flags & 14680064),
      (n.childLanes = e.childLanes),
      (n.lanes = e.lanes),
      (n.child = e.child),
      (n.memoizedProps = e.memoizedProps),
      (n.memoizedState = e.memoizedState),
      (n.updateQueue = e.updateQueue),
      (t = e.dependencies),
      (n.dependencies =
        t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
      (n.sibling = e.sibling),
      (n.index = e.index),
      (n.ref = e.ref),
      n
    );
  }
  function $l(e, t, n, r, l, o) {
    var a = 2;
    if (((r = e), typeof e == "function")) Hi(e) && (a = 1);
    else if (typeof e == "string") a = 5;
    else
      e: switch (e) {
        case ve:
          return vn(n.children, l, o, t);
        case Re:
          ((a = 8), (l |= 8));
          break;
        case Be:
          return (
            (e = st(12, n, t, l | 2)),
            (e.elementType = Be),
            (e.lanes = o),
            e
          );
        case Oe:
          return (
            (e = st(13, n, t, l)),
            (e.elementType = Oe),
            (e.lanes = o),
            e
          );
        case He:
          return (
            (e = st(19, n, t, l)),
            (e.elementType = He),
            (e.lanes = o),
            e
          );
        case xe:
          return Wl(n, l, o, t);
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case Je:
                a = 10;
                break e;
              case Rt:
                a = 9;
                break e;
              case rt:
                a = 11;
                break e;
              case je:
                a = 14;
                break e;
              case Ve:
                ((a = 16), (r = null));
                break e;
            }
          throw Error(u(130, e == null ? e : typeof e, ""));
      }
    return (
      (t = st(a, n, t, l)),
      (t.elementType = e),
      (t.type = r),
      (t.lanes = o),
      t
    );
  }
  function vn(e, t, n, r) {
    return ((e = st(7, e, r, t)), (e.lanes = n), e);
  }
  function Wl(e, t, n, r) {
    return (
      (e = st(22, e, r, t)),
      (e.elementType = xe),
      (e.lanes = n),
      (e.stateNode = { isHidden: !1 }),
      e
    );
  }
  function Vi(e, t, n) {
    return ((e = st(6, e, null, t)), (e.lanes = n), e);
  }
  function Qi(e, t, n) {
    return (
      (t = st(4, e.children !== null ? e.children : [], e.key, t)),
      (t.lanes = n),
      (t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation,
      }),
      t
    );
  }
  function qd(e, t, n, r, l) {
    ((this.tag = t),
      (this.containerInfo = e),
      (this.finishedWork =
        this.pingCache =
        this.current =
        this.pendingChildren =
          null),
      (this.timeoutHandle = -1),
      (this.callbackNode = this.pendingContext = this.context = null),
      (this.callbackPriority = 0),
      (this.eventTimes = go(0)),
      (this.expirationTimes = go(-1)),
      (this.entangledLanes =
        this.finishedLanes =
        this.mutableReadLanes =
        this.expiredLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = go(0)),
      (this.identifierPrefix = r),
      (this.onRecoverableError = l),
      (this.mutableSourceEagerHydrationData = null));
  }
  function Ki(e, t, n, r, l, o, a, p, m) {
    return (
      (e = new qd(e, t, n, p, m)),
      t === 1 ? ((t = 1), o === !0 && (t |= 8)) : (t = 0),
      (o = st(3, null, null, t)),
      (e.current = o),
      (o.stateNode = e),
      (o.memoizedState = {
        element: r,
        isDehydrated: n,
        cache: null,
        transitions: null,
        pendingSuspenseBoundaries: null,
      }),
      oi(o),
      e
    );
  }
  function Gd(e, t, n) {
    var r =
      3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: se,
      key: r == null ? null : "" + r,
      children: e,
      containerInfo: t,
      implementation: n,
    };
  }
  function uc(e) {
    if (!e) return Qt;
    e = e._reactInternals;
    e: {
      if (rn(e) !== e || e.tag !== 1) throw Error(u(170));
      var t = e;
      do {
        switch (t.tag) {
          case 3:
            t = t.stateNode.context;
            break e;
          case 1:
            if (Ke(t.type)) {
              t = t.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
        }
        t = t.return;
      } while (t !== null);
      throw Error(u(171));
    }
    if (e.tag === 1) {
      var n = e.type;
      if (Ke(n)) return Oa(e, n, t);
    }
    return t;
  }
  function ac(e, t, n, r, l, o, a, p, m) {
    return (
      (e = Ki(n, r, !0, e, l, o, a, p, m)),
      (e.context = uc(null)),
      (n = e.current),
      (r = We()),
      (l = Zt(n)),
      (o = Tt(r, l)),
      (o.callback = t ?? null),
      qt(n, o, l),
      (e.current.lanes = l),
      er(e, l, r),
      Ge(e, r),
      e
    );
  }
  function Bl(e, t, n, r) {
    var l = t.current,
      o = We(),
      a = Zt(l);
    return (
      (n = uc(n)),
      t.context === null ? (t.context = n) : (t.pendingContext = n),
      (t = Tt(o, a)),
      (t.payload = { element: e }),
      (r = r === void 0 ? null : r),
      r !== null && (t.callback = r),
      (e = qt(l, t, a)),
      e !== null && (yt(e, l, a, o), wl(e, l, a)),
      a
    );
  }
  function Hl(e) {
    if (((e = e.current), !e.child)) return null;
    switch (e.child.tag) {
      case 5:
        return e.child.stateNode;
      default:
        return e.child.stateNode;
    }
  }
  function sc(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      var n = e.retryLane;
      e.retryLane = n !== 0 && n < t ? n : t;
    }
  }
  function Yi(e, t) {
    (sc(e, t), (e = e.alternate) && sc(e, t));
  }
  function Xd() {
    return null;
  }
  var cc =
    typeof reportError == "function"
      ? reportError
      : function (e) {
          console.error(e);
        };
  function qi(e) {
    this._internalRoot = e;
  }
  ((Vl.prototype.render = qi.prototype.render =
    function (e) {
      var t = this._internalRoot;
      if (t === null) throw Error(u(409));
      Bl(e, t, null, null);
    }),
    (Vl.prototype.unmount = qi.prototype.unmount =
      function () {
        var e = this._internalRoot;
        if (e !== null) {
          this._internalRoot = null;
          var t = e.containerInfo;
          (pn(function () {
            Bl(null, e, null, null);
          }),
            (t[jt] = null));
        }
      }));
  function Vl(e) {
    this._internalRoot = e;
  }
  Vl.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var t = Yu();
      e = { blockedOn: null, target: e, priority: t };
      for (var n = 0; n < $t.length && t !== 0 && t < $t[n].priority; n++);
      ($t.splice(n, 0, e), n === 0 && Xu(e));
    }
  };
  function Gi(e) {
    return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
  }
  function Ql(e) {
    return !(
      !e ||
      (e.nodeType !== 1 &&
        e.nodeType !== 9 &&
        e.nodeType !== 11 &&
        (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
    );
  }
  function fc() {}
  function Jd(e, t, n, r, l) {
    if (l) {
      if (typeof r == "function") {
        var o = r;
        r = function () {
          var S = Hl(a);
          o.call(S);
        };
      }
      var a = ac(t, r, e, 0, null, !1, !1, "", fc);
      return (
        (e._reactRootContainer = a),
        (e[jt] = a.current),
        hr(e.nodeType === 8 ? e.parentNode : e),
        pn(),
        a
      );
    }
    for (; (l = e.lastChild); ) e.removeChild(l);
    if (typeof r == "function") {
      var p = r;
      r = function () {
        var S = Hl(m);
        p.call(S);
      };
    }
    var m = Ki(e, 0, !1, null, null, !1, !1, "", fc);
    return (
      (e._reactRootContainer = m),
      (e[jt] = m.current),
      hr(e.nodeType === 8 ? e.parentNode : e),
      pn(function () {
        Bl(t, m, n, r);
      }),
      m
    );
  }
  function Kl(e, t, n, r, l) {
    var o = n._reactRootContainer;
    if (o) {
      var a = o;
      if (typeof l == "function") {
        var p = l;
        l = function () {
          var m = Hl(a);
          p.call(m);
        };
      }
      Bl(t, a, e, l);
    } else a = Jd(n, t, e, l, r);
    return Hl(a);
  }
  ((Qu = function (e) {
    switch (e.tag) {
      case 3:
        var t = e.stateNode;
        if (t.current.memoizedState.isDehydrated) {
          var n = bn(t.pendingLanes);
          n !== 0 &&
            (wo(t, n | 1),
            Ge(t, Se()),
            (te & 6) === 0 && ((Wn = Se() + 500), Kt()));
        }
        break;
      case 13:
        (pn(function () {
          var r = Lt(e, 1);
          if (r !== null) {
            var l = We();
            yt(r, e, 1, l);
          }
        }),
          Yi(e, 1));
    }
  }),
    (xo = function (e) {
      if (e.tag === 13) {
        var t = Lt(e, 134217728);
        if (t !== null) {
          var n = We();
          yt(t, e, 134217728, n);
        }
        Yi(e, 134217728);
      }
    }),
    (Ku = function (e) {
      if (e.tag === 13) {
        var t = Zt(e),
          n = Lt(e, t);
        if (n !== null) {
          var r = We();
          yt(n, e, t, r);
        }
        Yi(e, t);
      }
    }),
    (Yu = function () {
      return ae;
    }),
    (qu = function (e, t) {
      var n = ae;
      try {
        return ((ae = e), t());
      } finally {
        ae = n;
      }
    }),
    (fo = function (e, t, n) {
      switch (t) {
        case "input":
          if ((ro(e, n), (t = n.name), n.type === "radio" && t != null)) {
            for (n = e; n.parentNode; ) n = n.parentNode;
            for (
              n = n.querySelectorAll(
                "input[name=" + JSON.stringify("" + t) + '][type="radio"]',
              ),
                t = 0;
              t < n.length;
              t++
            ) {
              var r = n[t];
              if (r !== e && r.form === e.form) {
                var l = sl(r);
                if (!l) throw Error(u(90));
                (gu(r), ro(r, l));
              }
            }
          }
          break;
        case "textarea":
          Eu(e, n);
          break;
        case "select":
          ((t = n.value), t != null && gn(e, !!n.multiple, t, !1));
      }
    }),
    (zu = $i),
    (Du = pn));
  var Zd = { usingClientEntryPoint: !1, Events: [yr, Pn, sl, Lu, Tu, $i] },
    Tr = {
      findFiberByHostInstance: ln,
      bundleType: 0,
      version: "18.3.1",
      rendererPackageName: "react-dom",
    },
    bd = {
      bundleType: Tr.bundleType,
      version: Tr.version,
      rendererPackageName: Tr.rendererPackageName,
      rendererConfig: Tr.rendererConfig,
      overrideHookState: null,
      overrideHookStateDeletePath: null,
      overrideHookStateRenamePath: null,
      overrideProps: null,
      overridePropsDeletePath: null,
      overridePropsRenamePath: null,
      setErrorHandler: null,
      setSuspenseHandler: null,
      scheduleUpdate: null,
      currentDispatcherRef: ne.ReactCurrentDispatcher,
      findHostInstanceByFiber: function (e) {
        return ((e = Fu(e)), e === null ? null : e.stateNode);
      },
      findFiberByHostInstance: Tr.findFiberByHostInstance || Xd,
      findHostInstancesForRefresh: null,
      scheduleRefresh: null,
      scheduleRoot: null,
      setRefreshHandler: null,
      getCurrentFiber: null,
      reconcilerVersion: "18.3.1-next-f1338f8080-20240426",
    };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Yl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Yl.isDisabled && Yl.supportsFiber)
      try {
        ((Vr = Yl.inject(bd)), (wt = Yl));
      } catch {}
  }
  return (
    (Xe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Zd),
    (Xe.createPortal = function (e, t) {
      var n =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!Gi(t)) throw Error(u(200));
      return Gd(e, t, null, n);
    }),
    (Xe.createRoot = function (e, t) {
      if (!Gi(e)) throw Error(u(299));
      var n = !1,
        r = "",
        l = cc;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (n = !0),
          t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
          t.onRecoverableError !== void 0 && (l = t.onRecoverableError)),
        (t = Ki(e, 1, !1, null, null, n, !1, r, l)),
        (e[jt] = t.current),
        hr(e.nodeType === 8 ? e.parentNode : e),
        new qi(t)
      );
    }),
    (Xe.findDOMNode = function (e) {
      if (e == null) return null;
      if (e.nodeType === 1) return e;
      var t = e._reactInternals;
      if (t === void 0)
        throw typeof e.render == "function"
          ? Error(u(188))
          : ((e = Object.keys(e).join(",")), Error(u(268, e)));
      return ((e = Fu(t)), (e = e === null ? null : e.stateNode), e);
    }),
    (Xe.flushSync = function (e) {
      return pn(e);
    }),
    (Xe.hydrate = function (e, t, n) {
      if (!Ql(t)) throw Error(u(200));
      return Kl(null, e, t, !0, n);
    }),
    (Xe.hydrateRoot = function (e, t, n) {
      if (!Gi(e)) throw Error(u(405));
      var r = (n != null && n.hydratedSources) || null,
        l = !1,
        o = "",
        a = cc;
      if (
        (n != null &&
          (n.unstable_strictMode === !0 && (l = !0),
          n.identifierPrefix !== void 0 && (o = n.identifierPrefix),
          n.onRecoverableError !== void 0 && (a = n.onRecoverableError)),
        (t = ac(t, null, e, 1, n ?? null, l, !1, o, a)),
        (e[jt] = t.current),
        hr(e),
        r)
      )
        for (e = 0; e < r.length; e++)
          ((n = r[e]),
            (l = n._getVersion),
            (l = l(n._source)),
            t.mutableSourceEagerHydrationData == null
              ? (t.mutableSourceEagerHydrationData = [n, l])
              : t.mutableSourceEagerHydrationData.push(n, l));
      return new Vl(t);
    }),
    (Xe.render = function (e, t, n) {
      if (!Ql(t)) throw Error(u(200));
      return Kl(null, e, t, !1, n);
    }),
    (Xe.unmountComponentAtNode = function (e) {
      if (!Ql(e)) throw Error(u(40));
      return e._reactRootContainer
        ? (pn(function () {
            Kl(null, null, e, !1, function () {
              ((e._reactRootContainer = null), (e[jt] = null));
            });
          }),
          !0)
        : !1;
    }),
    (Xe.unstable_batchedUpdates = $i),
    (Xe.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
      if (!Ql(n)) throw Error(u(200));
      if (e == null || e._reactInternals === void 0) throw Error(u(38));
      return Kl(e, t, n, !1, r);
    }),
    (Xe.version = "18.3.1-next-f1338f8080-20240426"),
    Xe
  );
}
var wc;
function up() {
  if (wc) return Zi.exports;
  wc = 1;
  function i() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(i);
      } catch (s) {
        console.error(s);
      }
  }
  return (i(), (Zi.exports = ip()), Zi.exports);
}
var xc;
function ap() {
  if (xc) return ql;
  xc = 1;
  var i = up();
  return ((ql.createRoot = i.createRoot), (ql.hydrateRoot = i.hydrateRoot), ql);
}
var sp = ap();
/**
 * react-router v7.18.4
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ var cu = /^(?:[a-z][a-z0-9+.-]*:|[\\/]{2})/i,
  Lc = /^[\\/]{2}/;
function cp(i, s) {
  return s + i.replace(/\\/g, "/");
}
var kc = "popstate";
function Sc(i) {
  return (
    typeof i == "object" &&
    i != null &&
    "pathname" in i &&
    "search" in i &&
    "hash" in i &&
    "state" in i &&
    "key" in i
  );
}
function fp(i = {}) {
  function s(f, c) {
    var R;
    let h = (R = c.state) == null ? void 0 : R.masked,
      { pathname: y, search: E, hash: k } = h || f.location;
    return ou(
      "",
      { pathname: y, search: E, hash: k },
      (c.state && c.state.usr) || null,
      (c.state && c.state.key) || "default",
      h
        ? {
            pathname: f.location.pathname,
            search: f.location.search,
            hash: f.location.hash,
          }
        : void 0,
    );
  }
  function u(f, c) {
    return typeof c == "string" ? c : Hn(c);
  }
  return pp(s, u, null, i);
}
function we(i, s) {
  if (i === !1 || i === null || typeof i > "u") throw new Error(s);
}
function Ct(i, s) {
  if (!i) {
    typeof console < "u" && console.warn(s);
    try {
      throw new Error(s);
    } catch {}
  }
}
function dp() {
  return Math.random().toString(36).substring(2, 10);
}
function Ec(i, s) {
  return {
    usr: i.state,
    key: i.key,
    idx: s,
    masked: i.mask
      ? { pathname: i.pathname, search: i.search, hash: i.hash }
      : void 0,
  };
}
function ou(i, s, u = null, f, c) {
  return {
    pathname: typeof i == "string" ? i : i.pathname,
    search: "",
    hash: "",
    ...(typeof s == "string" ? Qn(s) : s),
    state: u,
    key: (s && s.key) || f || dp(),
    mask: c,
  };
}
function Hn({ pathname: i = "/", search: s = "", hash: u = "" }) {
  return (
    s && s !== "?" && (i += s.charAt(0) === "?" ? s : "?" + s),
    u && u !== "#" && (i += u.charAt(0) === "#" ? u : "#" + u),
    i
  );
}
function Qn(i) {
  let s = {};
  if (i) {
    let u = i.indexOf("#");
    u >= 0 && ((s.hash = i.substring(u)), (i = i.substring(0, u)));
    let f = i.indexOf("?");
    (f >= 0 && ((s.search = i.substring(f)), (i = i.substring(0, f))),
      i && (s.pathname = i));
  }
  return s;
}
function pp(i, s, u, f = {}) {
  let { window: c = document.defaultView, v5Compat: h = !1 } = f,
    y = c.history,
    E = "POP",
    k = null,
    R = N();
  R == null && ((R = 0), y.replaceState({ ...y.state, idx: R }, ""));
  function N() {
    return (y.state || { idx: null }).idx;
  }
  function j() {
    E = "POP";
    let M = N(),
      U = M == null ? null : M - R;
    ((R = M), k && k({ action: E, location: O.location, delta: U }));
  }
  function D(M, U) {
    E = "PUSH";
    let X = Sc(M) ? M : ou(O.location, M, U);
    R = N() + 1;
    let J = Ec(X, R),
      ne = O.createHref(X.mask || X);
    try {
      y.pushState(J, "", ne);
    } catch (ie) {
      if (ie instanceof DOMException && ie.name === "DataCloneError") throw ie;
      c.location.assign(ne);
    }
    h && k && k({ action: E, location: O.location, delta: 1 });
  }
  function V(M, U) {
    E = "REPLACE";
    let X = Sc(M) ? M : ou(O.location, M, U);
    R = N();
    let J = Ec(X, R),
      ne = O.createHref(X.mask || X);
    (y.replaceState(J, "", ne),
      h && k && k({ action: E, location: O.location, delta: 0 }));
  }
  function Q(M) {
    return hp(c, M);
  }
  let O = {
    get action() {
      return E;
    },
    get location() {
      return i(c, y);
    },
    listen(M) {
      if (k) throw new Error("A history only accepts one active listener");
      return (
        c.addEventListener(kc, j),
        (k = M),
        () => {
          (c.removeEventListener(kc, j), (k = null));
        }
      );
    },
    createHref(M) {
      return s(c, M);
    },
    createURL: Q,
    encodeLocation(M) {
      let U = Q(M);
      return { pathname: U.pathname, search: U.search, hash: U.hash };
    },
    push: D,
    replace: V,
    go(M) {
      return y.go(M);
    },
  };
  return O;
}
function hp(i, s, u = !1) {
  let f = "http://localhost";
  (i &&
    (f = i.location.origin !== "null" ? i.location.origin : i.location.href),
    we(f, "No window.location.(origin|href) available to create URL"));
  let c = typeof s == "string" ? s : Hn(s);
  return (
    (c = c.replace(/ $/, "%20")),
    !u && Lc.test(c) && (c = f + c),
    new URL(c, f)
  );
}
function Tc(i, s, u = "/") {
  return mp(i, s, u, !1);
}
function mp(i, s, u, f, c) {
  let h = typeof s == "string" ? Qn(s) : s,
    y = Mt(h.pathname || "/", u);
  if (y == null) return null;
  let E = vp(i),
    k = null,
    R = Np(y);
  for (let N = 0; k == null && N < E.length; ++N) k = jp(E[N], R, f);
  return k;
}
function vp(i) {
  let s = zc(i);
  return (yp(s), s);
}
function zc(i, s = [], u = [], f = "", c = !1) {
  let h = (y, E, k = c, R) => {
    let N = {
      relativePath: R === void 0 ? y.path || "" : R,
      caseSensitive: y.caseSensitive === !0,
      childrenIndex: E,
      route: y,
    };
    if (N.relativePath.startsWith("/")) {
      if (!N.relativePath.startsWith(f) && k) return;
      (we(
        N.relativePath.startsWith(f),
        `Absolute route path "${N.relativePath}" nested under path "${f}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`,
      ),
        (N.relativePath = N.relativePath.slice(f.length)));
    }
    let j = gt([f, N.relativePath]),
      D = u.concat(N);
    (y.children &&
      y.children.length > 0 &&
      (we(
        y.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${j}".`,
      ),
      zc(y.children, s, D, j, k)),
      !(y.path == null && !y.index) &&
        s.push({
          path: j,
          score: Cp(j, y.index),
          routesMeta: D.map((V, Q) => {
            let [O, M] = Oc(
              V.relativePath,
              V.caseSensitive,
              Q === D.length - 1,
            );
            return { ...V, matcher: O, compiledParams: M };
          }),
        }));
  };
  return (
    i.forEach((y, E) => {
      var k;
      if (y.path === "" || !((k = y.path) != null && k.includes("?"))) h(y, E);
      else for (let R of Dc(y.path)) h(y, E, !0, R);
    }),
    s
  );
}
function Dc(i) {
  let s = i.split("/");
  if (s.length === 0) return [];
  let [u, ...f] = s,
    c = u.endsWith("?"),
    h = u.replace(/\?$/, "");
  if (f.length === 0) return c ? [h, ""] : [h];
  let y = Dc(f.join("/")),
    E = [];
  return (
    E.push(...y.map((k) => (k === "" ? h : [h, k].join("/")))),
    c && E.push(...y),
    E.map((k) => (i.startsWith("/") && k === "" ? "/" : k))
  );
}
function yp(i) {
  i.sort((s, u) =>
    s.score !== u.score
      ? u.score - s.score
      : Rp(
          s.routesMeta.map((f) => f.childrenIndex),
          u.routesMeta.map((f) => f.childrenIndex),
        ),
  );
}
var gp = /^:[\w-]+$/,
  wp = 3,
  xp = 2,
  kp = 1,
  Sp = 10,
  Ep = -2,
  Cc = (i) => i === "*";
function Cp(i, s) {
  let u = i.split("/"),
    f = u.length;
  return (
    u.some(Cc) && (f += Ep),
    s && (f += xp),
    u
      .filter((c) => !Cc(c))
      .reduce((c, h) => c + (gp.test(h) ? wp : h === "" ? kp : Sp), f)
  );
}
function Rp(i, s) {
  return i.length === s.length && i.slice(0, -1).every((f, c) => f === s[c])
    ? i[i.length - 1] - s[s.length - 1]
    : 0;
}
function jp(i, s, u = !1) {
  let { routesMeta: f } = i,
    c = {},
    h = "/",
    y = [];
  for (let E = 0; E < f.length; ++E) {
    let k = f[E],
      R = E === f.length - 1,
      N = h === "/" ? s : s.slice(h.length) || "/",
      j = { path: k.relativePath, caseSensitive: k.caseSensitive, end: R },
      D =
        k.matcher && k.compiledParams
          ? Mc(j, N, k.matcher, k.compiledParams)
          : Zl(j, N),
      V = k.route;
    if (
      (!D &&
        R &&
        u &&
        !f[f.length - 1].route.index &&
        (D = Zl(
          { path: k.relativePath, caseSensitive: k.caseSensitive, end: !1 },
          N,
        )),
      !D)
    )
      return null;
    (Object.assign(c, D.params),
      y.push({
        params: c,
        pathname: gt([h, D.pathname]),
        pathnameBase: Lp(gt([h, D.pathnameBase])),
        route: V,
      }),
      D.pathnameBase !== "/" && (h = gt([h, D.pathnameBase])));
  }
  return y;
}
function Zl(i, s) {
  typeof i == "string" && (i = { path: i, caseSensitive: !1, end: !0 });
  let [u, f] = Oc(i.path, i.caseSensitive, i.end);
  return Mc(i, s, u, f);
}
function Mc(i, s, u, f) {
  let c = s.match(u);
  if (!c) return null;
  let h = c[0],
    y = Vn(h, 1),
    E = c.slice(1);
  return {
    params: f.reduce((R, { paramName: N, isOptional: j }, D) => {
      if (N === "*") {
        let Q = E[D] || "";
        y = Vn(h.slice(0, h.length - Q.length), 1);
      }
      const V = E[D];
      return (
        j && !V ? (R[N] = void 0) : (R[N] = (V || "").replace(/%2F/g, "/")),
        R
      );
    }, {}),
    pathname: h,
    pathnameBase: y,
    pattern: i,
  };
}
function Oc(i, s = !1, u = !0) {
  Ct(
    i === "*" || !i.endsWith("*") || i.endsWith("/*"),
    `Route path "${i}" will be treated as if it were "${i.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${i.replace(/\*$/, "/*")}".`,
  );
  let f = [],
    c =
      "^" +
      i
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
        .replace(/\/:([\w-]+)(\?)?/g, (y, E, k, R, N) => {
          if ((f.push({ paramName: E, isOptional: k != null }), k)) {
            let j = N.charAt(R + y.length);
            return j && j !== "/" ? "/([^\\/]*)" : "(?:/([^\\/]*))?";
          }
          return "/([^\\/]+)";
        })
        .replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
  return (
    i.endsWith("*")
      ? (f.push({ paramName: "*" }),
        (c += i === "*" || i === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : u
        ? (c += "\\/*$")
        : i !== "" && i !== "/" && (c += "(?:(?=\\/|$))"),
    [new RegExp(c, s ? void 0 : "i"), f]
  );
}
function Np(i) {
  try {
    return i
      .split("/")
      .map((s) => decodeURIComponent(s).replace(/\//g, "%2F"))
      .join("/");
  } catch (s) {
    return (
      Ct(
        !1,
        `The URL path "${i}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${s}).`,
      ),
      i
    );
  }
}
function Mt(i, s) {
  if (s === "/") return i;
  if (!i.toLowerCase().startsWith(s.toLowerCase())) return null;
  let u = s.endsWith("/") ? s.length - 1 : s.length,
    f = i.charAt(u);
  return f && f !== "/" ? null : i.slice(u) || "/";
}
function Pp(i, s = "/") {
  let {
      pathname: u,
      search: f = "",
      hash: c = "",
    } = typeof i == "string" ? Qn(i) : i,
    h;
  return (
    u
      ? ((u = Fc(u)),
        u.startsWith("/") || u.startsWith("\\")
          ? (h = Rc(u.substring(1), "/"))
          : (h = Rc(u, s)))
      : (h = s),
    { pathname: h, search: Tp(f), hash: zp(c) }
  );
}
function Rc(i, s) {
  let u = Vn(s).split("/");
  return (
    i.split("/").forEach((c) => {
      c === ".." ? u.length > 1 && u.pop() : c !== "." && u.push(c);
    }),
    u.length > 1 ? u.join("/") : "/"
  );
}
function tu(i, s, u, f) {
  return `Cannot include a '${i}' character in a manually specified \`to.${s}\` field [${JSON.stringify(f)}].  Please separate it out to the \`to.${u}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function _p(i) {
  return i.filter(
    (s, u) => u === 0 || (s.route.path && s.route.path.length > 0),
  );
}
function Ic(i) {
  let s = _p(i);
  return s.map((u, f) => (f === s.length - 1 ? u.pathname : u.pathnameBase));
}
function fu(i, s, u, f = !1) {
  let c;
  typeof i == "string"
    ? (c = Qn(i))
    : ((c = { ...i }),
      we(
        !c.pathname || !c.pathname.includes("?"),
        tu("?", "pathname", "search", c),
      ),
      we(
        !c.pathname || !c.pathname.includes("#"),
        tu("#", "pathname", "hash", c),
      ),
      we(!c.search || !c.search.includes("#"), tu("#", "search", "hash", c)));
  let h = i === "" || c.pathname === "",
    y = h ? "/" : c.pathname,
    E;
  if (y == null) E = u;
  else {
    let j = s.length - 1;
    if (!f && y.startsWith("..")) {
      let D = y.split("/");
      for (; D[0] === ".."; ) (D.shift(), (j -= 1));
      c.pathname = D.join("/");
    }
    E = j >= 0 ? s[j] : "/";
  }
  let k = Pp(c, E),
    R = y && y !== "/" && y.endsWith("/"),
    N = (h || y === ".") && u.endsWith("/");
  return (!k.pathname.endsWith("/") && (R || N) && (k.pathname += "/"), k);
}
var Fc = (i) => i.replace(/[\\/]{2,}/g, "/"),
  gt = (i) => Fc(i.join("/"));
function Vn(i, s = 0) {
  let u = i.length;
  for (; u > s && i.charCodeAt(u - 1) === 47; ) u--;
  return u === i.length ? i : i.slice(0, u);
}
var Lp = (i) => Vn(i).replace(/^\/*/, "/"),
  Tp = (i) => (!i || i === "?" ? "" : i.startsWith("?") ? i : "?" + i),
  zp = (i) => (!i || i === "#" ? "" : i.startsWith("#") ? i : "#" + i),
  Dp = class {
    constructor(i, s, u, f = !1) {
      ((this.status = i),
        (this.statusText = s || ""),
        (this.internal = f),
        u instanceof Error
          ? ((this.data = u.toString()), (this.error = u))
          : (this.data = u));
    }
  };
function Mp(i) {
  return (
    i != null &&
    typeof i.status == "number" &&
    typeof i.statusText == "string" &&
    typeof i.internal == "boolean" &&
    "data" in i
  );
}
function Op(i) {
  let s = i.map((u) => u.route.path).filter(Boolean);
  return gt(s) || "/";
}
var Uc =
  typeof window < "u" &&
  typeof window.document < "u" &&
  typeof window.document.createElement < "u";
function Ac(i, s) {
  let u = i;
  if (typeof u != "string" || !cu.test(u))
    return { absoluteURL: void 0, isExternal: !1, to: u };
  let f = u,
    c = !1;
  if (Uc)
    try {
      let h = new URL(window.location.href),
        y = Lc.test(u) ? new URL(cp(u, h.protocol)) : new URL(u),
        E = Mt(y.pathname, s);
      y.origin === h.origin && E != null
        ? (u = E + y.search + y.hash)
        : (c = !0);
    } catch {
      Ct(
        !1,
        `<Link to="${u}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`,
      );
    }
  return { absoluteURL: f, isExternal: c, to: u };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
var jc = new URL("http://localhost");
function $c(i) {
  if (i.createURL) return i.createURL("/");
  try {
    return new URL(i.createHref("/"), jc);
  } catch {
    return jc;
  }
}
function nu(i, s) {
  return (
    i.origin === s.origin &&
    (i.origin !== "null" || (i.protocol === s.protocol && i.host === s.host))
  );
}
function Ip(i, s) {
  if (i.startsWith("//")) return !0;
  let u = s.protocol.toLowerCase();
  return i.toLowerCase().startsWith(u)
    ? s.host === "" || i.slice(u.length).startsWith("//")
    : !1;
}
function Wc(i, s, u, f) {
  let c = null;
  try {
    c = i == null ? null : new URL(i, u);
  } catch {}
  let h = new URL(s, u),
    y = c != null && !nu(c, u),
    E = !nu(h, u);
  if (f === "reject") {
    if (y || E) throw new Error("External navigation is not allowed");
  } else if (E && (c == null || !Ip(i, c) || !nu(c, h)))
    throw new Error("External navigation is not allowed");
}
var Bc = ["POST", "PUT", "PATCH", "DELETE"];
new Set(Bc);
var Fp = ["GET", ...Bc];
new Set(Fp);
var Up = [
  "about:",
  "blob:",
  "chrome:",
  "chrome-untrusted:",
  "content:",
  "data:",
  "devtools:",
  "file:",
  "filesystem:",
  "javascript:",
];
function Ap(i) {
  try {
    return Up.includes(new URL(i).protocol);
  } catch {
    return !1;
  }
}
var Kn = C.createContext(null);
Kn.displayName = "DataRouter";
var bl = C.createContext(null);
bl.displayName = "DataRouterState";
var Hc = C.createContext(!1);
function $p() {
  return C.useContext(Hc);
}
var Vc = C.createContext({ isTransitioning: !1 });
Vc.displayName = "ViewTransition";
var Wp = C.createContext(new Map());
Wp.displayName = "Fetchers";
var Bp = C.createContext(null);
Bp.displayName = "Await";
var ct = C.createContext(null);
ct.displayName = "Navigation";
var Or = C.createContext(null);
Or.displayName = "Location";
var Ot = C.createContext({ outlet: null, matches: [], isDataRoute: !1 });
Ot.displayName = "Route";
var du = C.createContext(null);
du.displayName = "RouteError";
var Qc = "REACT_ROUTER_ERROR",
  Hp = "REDIRECT",
  Vp = "ROUTE_ERROR_RESPONSE";
function Qp(i) {
  if (i.startsWith(`${Qc}:${Hp}:{`))
    try {
      let s = JSON.parse(i.slice(28));
      if (
        typeof s == "object" &&
        s &&
        typeof s.status == "number" &&
        typeof s.statusText == "string" &&
        typeof s.location == "string" &&
        typeof s.reloadDocument == "boolean" &&
        typeof s.replace == "boolean"
      )
        return s;
    } catch {}
}
function Kp(i) {
  if (i.startsWith(`${Qc}:${Vp}:{`))
    try {
      let s = JSON.parse(i.slice(40));
      if (
        typeof s == "object" &&
        s &&
        typeof s.status == "number" &&
        typeof s.statusText == "string"
      )
        return new Dp(s.status, s.statusText, s.data);
    } catch {}
}
function Yp(i, { relative: s } = {}) {
  we(
    Ir(),
    "useHref() may be used only in the context of a <Router> component.",
  );
  let { basename: u, navigator: f } = C.useContext(ct),
    { hash: c, pathname: h, search: y } = Fr(i, { relative: s }),
    E = h;
  return (
    u !== "/" && (E = h === "/" ? u : gt([u, h])),
    f.createHref({ pathname: E, search: y, hash: c })
  );
}
function Ir() {
  return C.useContext(Or) != null;
}
function It() {
  return (
    we(
      Ir(),
      "useLocation() may be used only in the context of a <Router> component.",
    ),
    C.useContext(Or).location
  );
}
var Kc =
  "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function Yc(i) {
  C.useContext(ct).static || C.useLayoutEffect(i);
}
function qp() {
  let { isDataRoute: i } = C.useContext(Ot);
  return i ? uh() : Gp();
}
function Gp() {
  we(
    Ir(),
    "useNavigate() may be used only in the context of a <Router> component.",
  );
  let i = C.useContext(Kn),
    { basename: s, navigator: u } = C.useContext(ct),
    { matches: f } = C.useContext(Ot),
    { pathname: c } = It(),
    h = JSON.stringify(Ic(f)),
    y = C.useRef(!1);
  return (
    Yc(() => {
      y.current = !0;
    }),
    C.useCallback(
      (k, R = {}) => {
        if ((Ct(y.current, Kc), !y.current)) return;
        if (typeof k == "number") {
          u.go(k);
          return;
        }
        let N = fu(k, JSON.parse(h), c, R.relative === "path");
        (i == null &&
          s !== "/" &&
          (N.pathname = N.pathname === "/" ? s : gt([s, N.pathname])),
          Wc(
            typeof k == "string" ? k : Hn(k),
            u.createHref(N),
            $c(u),
            "reject",
          ),
          (R.replace ? u.replace : u.push)(N, R.state, R));
      },
      [s, u, h, c, i],
    )
  );
}
C.createContext(null);
function Fr(i, { relative: s } = {}) {
  let { matches: u } = C.useContext(Ot),
    { pathname: f } = It(),
    c = JSON.stringify(Ic(u));
  return C.useMemo(() => fu(i, JSON.parse(c), f, s === "path"), [i, c, f, s]);
}
function Xp(i, s) {
  return qc(i, s);
}
function qc(i, s, u) {
  var M;
  we(
    Ir(),
    "useRoutes() may be used only in the context of a <Router> component.",
  );
  let { navigator: f } = C.useContext(ct),
    { matches: c } = C.useContext(Ot),
    h = c[c.length - 1],
    y = h ? h.params : {},
    E = h ? h.pathname : "/",
    k = h ? h.pathnameBase : "/",
    R = h && h.route;
  {
    let U = (R && R.path) || "";
    Xc(
      E,
      !R || U.endsWith("*") || U.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${E}" (under <Route path="${U}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${U}"> to <Route path="${U === "/" ? "*" : `${U}/*`}">.`,
    );
  }
  let N = It(),
    j;
  if (s) {
    let U = typeof s == "string" ? Qn(s) : s;
    (we(
      k === "/" || ((M = U.pathname) == null ? void 0 : M.startsWith(k)),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${k}" but pathname "${U.pathname}" was given in the \`location\` prop.`,
    ),
      (j = U));
  } else j = N;
  let D = j.pathname || "/",
    V = D;
  if (k !== "/") {
    let U = k.replace(/^\//, "").split("/");
    V = "/" + D.replace(/^\//, "").split("/").slice(U.length).join("/");
  }
  let Q =
    u && u.state.matches.length
      ? u.state.matches.map((U) =>
          Object.assign(U, { route: u.manifest[U.route.id] || U.route }),
        )
      : Tc(i, { pathname: V });
  (Ct(
    R || Q != null,
    `No routes matched location "${j.pathname}${j.search}${j.hash}" `,
  ),
    Ct(
      Q == null ||
        Q[Q.length - 1].route.element !== void 0 ||
        Q[Q.length - 1].route.Component !== void 0 ||
        Q[Q.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${j.pathname}${j.search}${j.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`,
    ));
  let O = th(
    Q &&
      Q.map((U) =>
        Object.assign({}, U, {
          params: Object.assign({}, y, U.params),
          pathname: gt([
            k,
            f.encodeLocation
              ? f.encodeLocation(
                  U.pathname
                    .replace(/%/g, "%25")
                    .replace(/\?/g, "%3F")
                    .replace(/#/g, "%23"),
                ).pathname
              : U.pathname,
          ]),
          pathnameBase:
            U.pathnameBase === "/"
              ? k
              : gt([
                  k,
                  f.encodeLocation
                    ? f.encodeLocation(
                        U.pathnameBase
                          .replace(/%/g, "%25")
                          .replace(/\?/g, "%3F")
                          .replace(/#/g, "%23"),
                      ).pathname
                    : U.pathnameBase,
                ]),
        }),
      ),
    c,
    u,
  );
  return s && O
    ? C.createElement(
        Or.Provider,
        {
          value: {
            location: {
              pathname: "/",
              search: "",
              hash: "",
              state: null,
              key: "default",
              mask: void 0,
              ...j,
            },
            navigationType: "POP",
          },
        },
        O,
      )
    : O;
}
function Jp() {
  let i = ih(),
    s = Mp(i)
      ? `${i.status} ${i.statusText}`
      : i instanceof Error
        ? i.message
        : JSON.stringify(i),
    u = i instanceof Error ? i.stack : null,
    f = "rgba(200,200,200, 0.5)",
    c = { padding: "0.5rem", backgroundColor: f },
    h = { padding: "2px 4px", backgroundColor: f },
    y = null;
  return (
    console.error("Error handled by React Router default ErrorBoundary:", i),
    (y = C.createElement(
      C.Fragment,
      null,
      C.createElement("p", null, "💿 Hey developer 👋"),
      C.createElement(
        "p",
        null,
        "You can provide a way better UX than this when your app throws errors by providing your own ",
        C.createElement("code", { style: h }, "ErrorBoundary"),
        " or",
        " ",
        C.createElement("code", { style: h }, "errorElement"),
        " prop on your route.",
      ),
    )),
    C.createElement(
      C.Fragment,
      null,
      C.createElement("h2", null, "Unexpected Application Error!"),
      C.createElement("h3", { style: { fontStyle: "italic" } }, s),
      u ? C.createElement("pre", { style: c }, u) : null,
      y,
    )
  );
}
var Zp = C.createElement(Jp, null),
  Gc = class extends C.Component {
    constructor(i) {
      (super(i),
        (this.state = {
          location: i.location,
          revalidation: i.revalidation,
          error: i.error,
        }));
    }
    static getDerivedStateFromError(i) {
      return { error: i };
    }
    static getDerivedStateFromProps(i, s) {
      return s.location !== i.location ||
        (s.revalidation !== "idle" && i.revalidation === "idle")
        ? { error: i.error, location: i.location, revalidation: i.revalidation }
        : {
            error: i.error !== void 0 ? i.error : s.error,
            location: s.location,
            revalidation: i.revalidation || s.revalidation,
          };
    }
    componentDidCatch(i, s) {
      this.props.onError
        ? this.props.onError(i, s)
        : console.error(
            "React Router caught the following error during render",
            i,
          );
    }
    render() {
      let i = this.state.error;
      if (
        this.context &&
        typeof i == "object" &&
        i &&
        "digest" in i &&
        typeof i.digest == "string"
      ) {
        const u = Kp(i.digest);
        u && (i = u);
      }
      let s =
        i !== void 0
          ? C.createElement(
              Ot.Provider,
              { value: this.props.routeContext },
              C.createElement(du.Provider, {
                value: i,
                children: this.props.component,
              }),
            )
          : this.props.children;
      return this.context ? C.createElement(bp, { error: i }, s) : s;
    }
  };
Gc.contextType = Hc;
var ru = new WeakMap();
function bp({ children: i, error: s }) {
  let { basename: u, navigator: f } = C.useContext(ct);
  if (
    typeof s == "object" &&
    s &&
    "digest" in s &&
    typeof s.digest == "string"
  ) {
    let c = Qp(s.digest);
    if (c) {
      let h = ru.get(s);
      if (h) throw h;
      let y = Ac(c.location, u),
        E = y.absoluteURL || y.to;
      if ((Wc(c.location, E, $c(f), "allow-explicit"), Ap(E)))
        throw new Error("Invalid redirect location");
      if (Uc && !ru.get(s))
        if (y.isExternal || c.reloadDocument) window.location.href = E;
        else {
          const k = Promise.resolve().then(() =>
            window.__reactRouterDataRouter.navigate(y.to, {
              replace: c.replace,
            }),
          );
          throw (ru.set(s, k), k);
        }
      return C.createElement("meta", {
        httpEquiv: "refresh",
        content: `0;url=${E}`,
      });
    }
  }
  return i;
}
function eh({ routeContext: i, match: s, children: u }) {
  let f = C.useContext(Kn);
  return (
    f &&
      f.static &&
      f.staticContext &&
      (s.route.errorElement || s.route.ErrorBoundary) &&
      (f.staticContext._deepestRenderedBoundaryId = s.route.id),
    C.createElement(Ot.Provider, { value: i }, u)
  );
}
function th(i, s = [], u) {
  let f = u == null ? void 0 : u.state;
  if (i == null) {
    if (!f) return null;
    if (f.errors) i = f.matches;
    else if (s.length === 0 && !f.initialized && f.matches.length > 0)
      i = f.matches;
    else return null;
  }
  let c = i,
    h = f == null ? void 0 : f.errors;
  if (h != null) {
    let N = c.findIndex(
      (j) => j.route.id && (h == null ? void 0 : h[j.route.id]) !== void 0,
    );
    (we(
      N >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(h).join(",")}`,
    ),
      (c = c.slice(0, Math.min(c.length, N + 1))));
  }
  let y = !1,
    E = -1;
  if (u && f) {
    y = f.renderFallback;
    for (let N = 0; N < c.length; N++) {
      let j = c[N];
      if (
        ((j.route.HydrateFallback || j.route.hydrateFallbackElement) && (E = N),
        j.route.id)
      ) {
        let { loaderData: D, errors: V } = f,
          Q =
            j.route.loader &&
            !D.hasOwnProperty(j.route.id) &&
            (!V || V[j.route.id] === void 0);
        if (j.route.lazy || Q) {
          (u.isStatic && (y = !0),
            E >= 0 ? (c = c.slice(0, E + 1)) : (c = [c[0]]));
          break;
        }
      }
    }
  }
  let k = u == null ? void 0 : u.onError,
    R =
      f && k
        ? (N, j) => {
            var D, V;
            k(N, {
              location: f.location,
              params:
                ((V = (D = f.matches) == null ? void 0 : D[0]) == null
                  ? void 0
                  : V.params) ?? {},
              pattern: Op(f.matches),
              errorInfo: j,
            });
          }
        : void 0;
  return c.reduceRight((N, j, D) => {
    let V,
      Q = !1,
      O = null,
      M = null;
    f &&
      ((V = h && j.route.id ? h[j.route.id] : void 0),
      (O = j.route.errorElement || Zp),
      y &&
        (E < 0 && D === 0
          ? (Xc(
              "route-fallback",
              !1,
              "No `HydrateFallback` element provided to render during initial hydration",
            ),
            (Q = !0),
            (M = null))
          : E === D &&
            ((Q = !0), (M = j.route.hydrateFallbackElement || null))));
    let U = s.concat(c.slice(0, D + 1)),
      X = () => {
        let J;
        return (
          V
            ? (J = O)
            : Q
              ? (J = M)
              : j.route.Component
                ? (J = C.createElement(j.route.Component, null))
                : j.route.element
                  ? (J = j.route.element)
                  : (J = N),
          C.createElement(eh, {
            match: j,
            routeContext: { outlet: N, matches: U, isDataRoute: f != null },
            children: J,
          })
        );
      };
    return f && (j.route.ErrorBoundary || j.route.errorElement || D === 0)
      ? C.createElement(Gc, {
          location: f.location,
          revalidation: f.revalidation,
          component: O,
          error: V,
          children: X(),
          routeContext: { outlet: null, matches: U, isDataRoute: !0 },
          onError: R,
        })
      : X();
  }, null);
}
function pu(i) {
  return `${i} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function nh(i) {
  let s = C.useContext(Kn);
  return (we(s, pu(i)), s);
}
function rh(i) {
  let s = C.useContext(bl);
  return (we(s, pu(i)), s);
}
function lh(i) {
  let s = C.useContext(Ot);
  return (we(s, pu(i)), s);
}
function hu(i) {
  let s = lh(i),
    u = s.matches[s.matches.length - 1];
  return (
    we(
      u.route.id,
      `${i} can only be used on routes that contain a unique "id"`,
    ),
    u.route.id
  );
}
function oh() {
  return hu("useRouteId");
}
function ih() {
  var f;
  let i = C.useContext(du),
    s = rh("useRouteError"),
    u = hu("useRouteError");
  return i !== void 0 ? i : (f = s.errors) == null ? void 0 : f[u];
}
function uh() {
  let { router: i } = nh("useNavigate"),
    s = hu("useNavigate"),
    u = C.useRef(!1);
  return (
    Yc(() => {
      u.current = !0;
    }),
    C.useCallback(
      async (c, h = {}) => {
        (Ct(u.current, Kc),
          u.current &&
            (typeof c == "number"
              ? await i.navigate(c)
              : await i.navigate(c, { fromRouteId: s, ...h })));
      },
      [i, s],
    )
  );
}
var Nc = {};
function Xc(i, s, u) {
  !s && !Nc[i] && ((Nc[i] = !0), Ct(!1, u));
}
C.memo(ah);
function ah({
  routes: i,
  manifest: s,
  future: u,
  state: f,
  isStatic: c,
  onError: h,
}) {
  return qc(i, void 0, { manifest: s, state: f, isStatic: c, onError: h });
}
function yn(i) {
  we(
    !1,
    "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.",
  );
}
function sh({
  basename: i = "/",
  children: s = null,
  location: u,
  navigationType: f = "POP",
  navigator: c,
  static: h = !1,
  useTransitions: y,
}) {
  we(
    !Ir(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.",
  );
  let E = i.replace(/^\/*/, "/"),
    k = C.useMemo(
      () => ({
        basename: E,
        navigator: c,
        static: h,
        useTransitions: y,
        future: {},
      }),
      [E, c, h, y],
    );
  typeof u == "string" && (u = Qn(u));
  let {
      pathname: R = "/",
      search: N = "",
      hash: j = "",
      state: D = null,
      key: V = "default",
      mask: Q,
    } = u,
    O = C.useMemo(() => {
      let M = Mt(R, E);
      return M == null
        ? null
        : {
            location: {
              pathname: M,
              search: N,
              hash: j,
              state: D,
              key: V,
              mask: Q,
            },
            navigationType: f,
          };
    }, [E, R, N, j, D, V, f, Q]);
  return (
    Ct(
      O != null,
      `<Router basename="${E}"> is not able to match the URL "${R}${N}${j}" because it does not start with the basename, so the <Router> won't render anything.`,
    ),
    O == null
      ? null
      : C.createElement(
          ct.Provider,
          { value: k },
          C.createElement(Or.Provider, { children: s, value: O }),
        )
  );
}
function ch({ children: i, location: s }) {
  return Xp(iu(i), s);
}
function iu(i, s = []) {
  let u = [];
  return (
    C.Children.forEach(i, (f, c) => {
      if (!C.isValidElement(f)) return;
      let h = [...s, c];
      if (f.type === C.Fragment) {
        u.push.apply(u, iu(f.props.children, h));
        return;
      }
      (we(
        f.type === yn,
        `[${typeof f.type == "string" ? f.type : f.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`,
      ),
        we(
          !f.props.index || !f.props.children,
          "An index route cannot have child routes.",
        ));
      let y = {
        id: f.props.id || h.join("-"),
        caseSensitive: f.props.caseSensitive,
        element: f.props.element,
        Component: f.props.Component,
        index: f.props.index,
        path: f.props.path,
        middleware: f.props.middleware,
        loader: f.props.loader,
        action: f.props.action,
        hydrateFallbackElement: f.props.hydrateFallbackElement,
        HydrateFallback: f.props.HydrateFallback,
        errorElement: f.props.errorElement,
        ErrorBoundary: f.props.ErrorBoundary,
        hasErrorBoundary:
          f.props.hasErrorBoundary === !0 ||
          f.props.ErrorBoundary != null ||
          f.props.errorElement != null,
        shouldRevalidate: f.props.shouldRevalidate,
        handle: f.props.handle,
        lazy: f.props.lazy,
      };
      (f.props.children && (y.children = iu(f.props.children, h)), u.push(y));
    }),
    u
  );
}
var Xl = "get",
  Jl = "application/x-www-form-urlencoded";
function eo(i) {
  return typeof HTMLElement < "u" && i instanceof HTMLElement;
}
function fh(i) {
  return eo(i) && i.tagName.toLowerCase() === "button";
}
function dh(i) {
  return eo(i) && i.tagName.toLowerCase() === "form";
}
function ph(i) {
  return eo(i) && i.tagName.toLowerCase() === "input";
}
function hh(i) {
  return !!(i.metaKey || i.altKey || i.ctrlKey || i.shiftKey);
}
function mh(i, s) {
  return i.button === 0 && (!s || s === "_self") && !hh(i);
}
var Gl = null;
function vh() {
  if (Gl === null)
    try {
      (new FormData(document.createElement("form"), 0), (Gl = !1));
    } catch {
      Gl = !0;
    }
  return Gl;
}
var yh = new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain",
]);
function lu(i) {
  return i != null && !yh.has(i)
    ? (Ct(
        !1,
        `"${i}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Jl}"`,
      ),
      null)
    : i;
}
function gh(i, s) {
  let u, f, c, h, y;
  if (dh(i)) {
    let E = i.getAttribute("action");
    ((f = E ? Mt(E, s) : null),
      (u = i.getAttribute("method") || Xl),
      (c = lu(i.getAttribute("enctype")) || Jl),
      (h = new FormData(i)));
  } else if (fh(i) || (ph(i) && (i.type === "submit" || i.type === "image"))) {
    let E = i.form;
    if (E == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>',
      );
    let k = i.getAttribute("formaction") || E.getAttribute("action");
    if (
      ((f = k ? Mt(k, s) : null),
      (u = i.getAttribute("formmethod") || E.getAttribute("method") || Xl),
      (c =
        lu(i.getAttribute("formenctype")) ||
        lu(E.getAttribute("enctype")) ||
        Jl),
      (h = new FormData(E, i)),
      !vh())
    ) {
      let { name: R, type: N, value: j } = i;
      if (N === "image") {
        let D = R ? `${R}.` : "";
        (h.append(`${D}x`, "0"), h.append(`${D}y`, "0"));
      } else R && h.append(R, j);
    }
  } else {
    if (eo(i))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">',
      );
    ((u = Xl), (f = null), (c = Jl), (y = i));
  }
  return (
    h && c === "text/plain" && ((y = h), (h = void 0)),
    { action: f, method: u.toLowerCase(), encType: c, formData: h, body: y }
  );
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function mu(i, s) {
  if (i === !1 || i === null || typeof i > "u") throw new Error(s);
}
function Jc(i, s, u, f) {
  let c =
    typeof i == "string"
      ? new URL(
          i,
          typeof window > "u"
            ? "server://singlefetch/"
            : window.location.origin,
        )
      : i;
  return (
    u
      ? c.pathname.endsWith("/")
        ? (c.pathname = `${c.pathname}_.${f}`)
        : (c.pathname = `${c.pathname}.${f}`)
      : c.pathname === "/"
        ? (c.pathname = `_root.${f}`)
        : s && Mt(c.pathname, s) === "/"
          ? (c.pathname = `${Vn(s)}/_root.${f}`)
          : (c.pathname = `${Vn(c.pathname)}.${f}`),
    c
  );
}
async function wh(i, s) {
  if (i.id in s) return s[i.id];
  try {
    let u = await import(i.module);
    return ((s[i.id] = u), u);
  } catch (u) {
    return (
      console.error(
        `Error loading route module \`${i.module}\`, reloading page...`,
      ),
      console.error(u),
      window.__reactRouterContext && window.__reactRouterContext.isSpaMode,
      window.location.reload(),
      new Promise(() => {})
    );
  }
}
function xh(i) {
  return i == null
    ? !1
    : i.href == null
      ? i.rel === "preload" &&
        typeof i.imageSrcSet == "string" &&
        typeof i.imageSizes == "string"
      : typeof i.rel == "string" && typeof i.href == "string";
}
async function kh(i, s, u) {
  let f = await Promise.all(
    i.map(async (c) => {
      let h = s.routes[c.route.id];
      if (h) {
        let y = await wh(h, u);
        return y.links ? y.links() : [];
      }
      return [];
    }),
  );
  return Rh(
    f
      .flat(1)
      .filter(xh)
      .filter((c) => c.rel === "stylesheet" || c.rel === "preload")
      .map((c) =>
        c.rel === "stylesheet"
          ? { ...c, rel: "prefetch", as: "style" }
          : { ...c, rel: "prefetch" },
      ),
  );
}
function Pc(i, s, u, f, c, h) {
  let y = (k, R) => (u[R] ? k.route.id !== u[R].route.id : !0),
    E = (k, R) => {
      var N;
      return (
        u[R].pathname !== k.pathname ||
        (((N = u[R].route.path) == null ? void 0 : N.endsWith("*")) &&
          u[R].params["*"] !== k.params["*"])
      );
    };
  return h === "assets"
    ? s.filter((k, R) => y(k, R) || E(k, R))
    : h === "data"
      ? s.filter((k, R) => {
          var j;
          let N = f.routes[k.route.id];
          if (!N || !N.hasLoader) return !1;
          if (y(k, R) || E(k, R)) return !0;
          if (k.route.shouldRevalidate) {
            let D = k.route.shouldRevalidate({
              currentUrl: new URL(
                c.pathname + c.search + c.hash,
                window.origin,
              ),
              currentParams: ((j = u[0]) == null ? void 0 : j.params) || {},
              nextUrl: new URL(i, window.origin),
              nextParams: k.params,
              defaultShouldRevalidate: !0,
            });
            if (typeof D == "boolean") return D;
          }
          return !0;
        })
      : [];
}
function Sh(i, s, { includeHydrateFallback: u } = {}) {
  return Eh(
    i
      .map((f) => {
        let c = s.routes[f.route.id];
        if (!c) return [];
        let h = [c.module];
        return (
          c.clientActionModule && (h = h.concat(c.clientActionModule)),
          c.clientLoaderModule && (h = h.concat(c.clientLoaderModule)),
          u &&
            c.hydrateFallbackModule &&
            (h = h.concat(c.hydrateFallbackModule)),
          c.imports && (h = h.concat(c.imports)),
          h
        );
      })
      .flat(1),
  );
}
function Eh(i) {
  return [...new Set(i)];
}
function Ch(i) {
  let s = {},
    u = Object.keys(i).sort();
  for (let f of u) s[f] = i[f];
  return s;
}
function Rh(i, s) {
  let u = new Set();
  return (
    new Set(s),
    i.reduce((f, c) => {
      let h = JSON.stringify(Ch(c));
      return (u.has(h) || (u.add(h), f.push({ key: h, link: c })), f);
    }, [])
  );
}
function vu() {
  let i = C.useContext(Kn);
  return (
    mu(
      i,
      "You must render this element inside a <DataRouterContext.Provider> element",
    ),
    i
  );
}
function jh() {
  let i = C.useContext(bl);
  return (
    mu(
      i,
      "You must render this element inside a <DataRouterStateContext.Provider> element",
    ),
    i
  );
}
var yu = C.createContext(void 0);
yu.displayName = "FrameworkContext";
function to() {
  let i = C.useContext(yu);
  return (
    mu(i, "You must render this element inside a <HydratedRouter> element"),
    i
  );
}
function Nh(i, s) {
  let u = C.useContext(yu),
    [f, c] = C.useState(!1),
    [h, y] = C.useState(!1),
    {
      onFocus: E,
      onBlur: k,
      onMouseEnter: R,
      onMouseLeave: N,
      onTouchStart: j,
    } = s,
    D = C.useRef(null);
  (C.useEffect(() => {
    if ((i === "render" && y(!0), i === "viewport")) {
      let O = (U) => {
          U.forEach((X) => {
            y(X.isIntersecting);
          });
        },
        M = new IntersectionObserver(O, { threshold: 0.5 });
      return (
        D.current && M.observe(D.current),
        () => {
          M.disconnect();
        }
      );
    }
  }, [i]),
    C.useEffect(() => {
      if (f) {
        let O = setTimeout(() => {
          y(!0);
        }, 100);
        return () => {
          clearTimeout(O);
        };
      }
    }, [f]));
  let V = () => {
      c(!0);
    },
    Q = () => {
      (c(!1), y(!1));
    };
  return u
    ? i !== "intent"
      ? [h, D, {}]
      : [
          h,
          D,
          {
            onFocus: Dr(E, V),
            onBlur: Dr(k, Q),
            onMouseEnter: Dr(R, V),
            onMouseLeave: Dr(N, Q),
            onTouchStart: Dr(j, V),
          },
        ]
    : [!1, D, {}];
}
function Dr(i, s) {
  return (u) => {
    (i && i(u), u.defaultPrevented || s(u));
  };
}
function Ph({ page: i, ...s }) {
  let u = $p(),
    { nonce: f } = to(),
    { router: c } = vu(),
    h = C.useMemo(() => Tc(c.routes, i, c.basename), [c.routes, i, c.basename]);
  return h
    ? (s.nonce == null && f && (s = { ...s, nonce: f }),
      u
        ? C.createElement(Lh, { page: i, matches: h, ...s })
        : C.createElement(Th, { page: i, matches: h, ...s }))
    : null;
}
function _h(i) {
  let { manifest: s, routeModules: u } = to(),
    [f, c] = C.useState([]);
  return (
    C.useEffect(() => {
      let h = !1;
      return (
        kh(i, s, u).then((y) => {
          h || c(y);
        }),
        () => {
          h = !0;
        }
      );
    }, [i, s, u]),
    f
  );
}
function Lh({ page: i, matches: s, ...u }) {
  let f = It(),
    { future: c } = to(),
    { basename: h } = vu(),
    y = C.useMemo(() => {
      if (i === f.pathname + f.search + f.hash) return [];
      let E = Jc(i, h, c.v8_trailingSlashAwareDataRequests, "rsc"),
        k = !1,
        R = [];
      for (let N of s)
        typeof N.route.shouldRevalidate == "function"
          ? (k = !0)
          : R.push(N.route.id);
      return (
        k && R.length > 0 && E.searchParams.set("_routes", R.join(",")),
        [E.pathname + E.search]
      );
    }, [h, c.v8_trailingSlashAwareDataRequests, i, f, s]);
  return C.createElement(
    C.Fragment,
    null,
    y.map((E) =>
      C.createElement("link", {
        key: E,
        rel: "prefetch",
        as: "fetch",
        href: E,
        ...u,
      }),
    ),
  );
}
function Th({ page: i, matches: s, ...u }) {
  let f = It(),
    { future: c, manifest: h, routeModules: y } = to(),
    { basename: E } = vu(),
    { loaderData: k, matches: R } = jh(),
    N = C.useMemo(() => Pc(i, s, R, h, f, "data"), [i, s, R, h, f]),
    j = C.useMemo(() => Pc(i, s, R, h, f, "assets"), [i, s, R, h, f]),
    D = C.useMemo(() => {
      if (i === f.pathname + f.search + f.hash) return [];
      let O = new Set(),
        M = !1;
      if (
        (s.forEach((X) => {
          var ne;
          let J = h.routes[X.route.id];
          !J ||
            !J.hasLoader ||
            ((!N.some((ie) => ie.route.id === X.route.id) &&
              X.route.id in k &&
              (ne = y[X.route.id]) != null &&
              ne.shouldRevalidate) ||
            J.hasClientLoader
              ? (M = !0)
              : O.add(X.route.id));
        }),
        O.size === 0)
      )
        return [];
      let U = Jc(i, E, c.v8_trailingSlashAwareDataRequests, "data");
      return (
        M &&
          O.size > 0 &&
          U.searchParams.set(
            "_routes",
            s
              .filter((X) => O.has(X.route.id))
              .map((X) => X.route.id)
              .join(","),
          ),
        [U.pathname + U.search]
      );
    }, [E, c.v8_trailingSlashAwareDataRequests, k, f, h, N, s, i, y]),
    V = C.useMemo(() => Sh(j, h), [j, h]),
    Q = _h(j);
  return C.createElement(
    C.Fragment,
    null,
    D.map((O) =>
      C.createElement("link", {
        key: O,
        rel: "prefetch",
        as: "fetch",
        href: O,
        ...u,
      }),
    ),
    V.map((O) =>
      C.createElement("link", { key: O, rel: "modulepreload", href: O, ...u }),
    ),
    Q.map(({ key: O, link: M }) =>
      C.createElement("link", {
        key: O,
        nonce: u.nonce,
        ...M,
        crossOrigin: M.crossOrigin ?? u.crossOrigin,
      }),
    ),
  );
}
function zh(...i) {
  return (s) => {
    i.forEach((u) => {
      typeof u == "function" ? u(s) : u != null && (u.current = s);
    });
  };
}
var Dh =
  typeof window < "u" &&
  typeof window.document < "u" &&
  typeof window.document.createElement < "u";
try {
  Dh && (window.__reactRouterVersion = "7.18.4");
} catch {}
function Mh({ basename: i, children: s, useTransitions: u, window: f }) {
  let c = C.useRef();
  c.current == null && (c.current = fp({ window: f, v5Compat: !0 }));
  let h = c.current,
    [y, E] = C.useState({ action: h.action, location: h.location }),
    k = C.useCallback(
      (R) => {
        u === !1 ? E(R) : C.startTransition(() => E(R));
      },
      [u],
    );
  return (
    C.useLayoutEffect(() => h.listen(k), [h, k]),
    C.createElement(sh, {
      basename: i,
      children: s,
      location: y.location,
      navigationType: y.action,
      navigator: h,
      useTransitions: u,
    })
  );
}
var Me = C.forwardRef(function (
  {
    onClick: s,
    discover: u = "render",
    prefetch: f = "none",
    relative: c,
    reloadDocument: h,
    replace: y,
    mask: E,
    state: k,
    target: R,
    to: N,
    preventScrollReset: j,
    viewTransition: D,
    defaultShouldRevalidate: V,
    ...Q
  },
  O,
) {
  let { basename: M, navigator: U, useTransitions: X } = C.useContext(ct),
    J = typeof N == "string" && cu.test(N),
    ne = Ac(N, M);
  N = ne.to;
  let ie = Yp(N, { relative: c }),
    se = It(),
    ve = null;
  if (E) {
    let je = fu(E, [], se.mask ? se.mask.pathname : "/", !0);
    (M !== "/" &&
      (je.pathname = je.pathname === "/" ? M : gt([M, je.pathname])),
      (ve = U.createHref(je)));
  }
  let [Re, Be, Je] = Nh(f, Q),
    Rt = Fh(N, {
      replace: y,
      mask: E,
      state: k,
      target: R,
      preventScrollReset: j,
      relative: c,
      viewTransition: D,
      defaultShouldRevalidate: V,
      useTransitions: X,
    });
  function rt(je) {
    (s && s(je), je.defaultPrevented || Rt(je));
  }
  let Oe = !(ne.isExternal || h),
    He = C.createElement("a", {
      ...Q,
      ...Je,
      href: (Oe ? ve : void 0) || ne.absoluteURL || ie,
      onClick: Oe ? rt : s,
      ref: zh(O, Be),
      target: R,
      "data-discover": !J && u === "render" ? "true" : void 0,
    });
  return Re && !J
    ? C.createElement(C.Fragment, null, He, C.createElement(Ph, { page: ie }))
    : He;
});
Me.displayName = "Link";
var Zc = C.forwardRef(function (
  {
    "aria-current": s = "page",
    caseSensitive: u = !1,
    className: f = "",
    end: c = !1,
    style: h,
    to: y,
    viewTransition: E,
    children: k,
    ...R
  },
  N,
) {
  let j = Fr(y, { relative: R.relative }),
    D = It(),
    V = C.useContext(bl),
    { navigator: Q, basename: O } = C.useContext(ct),
    M = V != null && Bh(j) && E === !0,
    U = Q.encodeLocation ? Q.encodeLocation(j).pathname : j.pathname,
    X = D.pathname,
    J =
      V && V.navigation && V.navigation.location
        ? V.navigation.location.pathname
        : null;
  (u ||
    ((X = X.toLowerCase()),
    (J = J ? J.toLowerCase() : null),
    (U = U.toLowerCase())),
    J && O && (J = Mt(J, O) || J));
  const ne = U !== "/" && U.endsWith("/") ? U.length - 1 : U.length;
  let ie = X === U || (!c && X.startsWith(U) && X.charAt(ne) === "/"),
    se =
      J != null &&
      (J === U || (!c && J.startsWith(U) && J.charAt(U.length) === "/")),
    ve = { isActive: ie, isPending: se, isTransitioning: M },
    Re = ie ? s : void 0,
    Be;
  typeof f == "function"
    ? (Be = f(ve))
    : (Be = [
        f,
        ie ? "active" : null,
        se ? "pending" : null,
        M ? "transitioning" : null,
      ]
        .filter(Boolean)
        .join(" "));
  let Je = typeof h == "function" ? h(ve) : h;
  return C.createElement(
    Me,
    {
      ...R,
      "aria-current": Re,
      className: Be,
      ref: N,
      style: Je,
      to: y,
      viewTransition: E,
    },
    typeof k == "function" ? k(ve) : k,
  );
});
Zc.displayName = "NavLink";
var Oh = C.forwardRef(
  (
    {
      discover: i = "render",
      fetcherKey: s,
      navigate: u,
      reloadDocument: f,
      replace: c,
      state: h,
      method: y = Xl,
      action: E,
      onSubmit: k,
      relative: R,
      preventScrollReset: N,
      viewTransition: j,
      defaultShouldRevalidate: D,
      ...V
    },
    Q,
  ) => {
    let { useTransitions: O } = C.useContext(ct),
      M = $h(),
      U = Wh(E, { relative: R }),
      X = y.toLowerCase() === "get" ? "get" : "post",
      J = typeof E == "string" && cu.test(E),
      ne = (ie) => {
        if ((k && k(ie), ie.defaultPrevented)) return;
        ie.preventDefault();
        let se = ie.nativeEvent.submitter,
          ve = (se == null ? void 0 : se.getAttribute("formmethod")) || y,
          Re = () =>
            M(se || ie.currentTarget, {
              fetcherKey: s,
              method: ve,
              navigate: u,
              replace: c,
              state: h,
              relative: R,
              preventScrollReset: N,
              viewTransition: j,
              defaultShouldRevalidate: D,
            });
        O && u !== !1 ? C.startTransition(() => Re()) : Re();
      };
    return C.createElement("form", {
      ref: Q,
      method: X,
      action: U,
      onSubmit: f ? k : ne,
      ...V,
      "data-discover": !J && i === "render" ? "true" : void 0,
    });
  },
);
Oh.displayName = "Form";
function Ih(i) {
  return `${i} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function bc(i) {
  let s = C.useContext(Kn);
  return (we(s, Ih(i)), s);
}
function Fh(
  i,
  {
    target: s,
    replace: u,
    mask: f,
    state: c,
    preventScrollReset: h,
    relative: y,
    viewTransition: E,
    defaultShouldRevalidate: k,
    useTransitions: R,
  } = {},
) {
  let N = qp(),
    j = It(),
    D = Fr(i, { relative: y });
  return C.useCallback(
    (V) => {
      if (mh(V, s)) {
        V.preventDefault();
        let Q = u !== void 0 ? u : Hn(j) === Hn(D),
          O = () =>
            N(i, {
              replace: Q,
              mask: f,
              state: c,
              preventScrollReset: h,
              relative: y,
              viewTransition: E,
              defaultShouldRevalidate: k,
            });
        R ? C.startTransition(() => O()) : O();
      }
    },
    [j, N, D, u, f, c, s, i, h, y, E, k, R],
  );
}
var Uh = 0,
  Ah = () => `__${String(++Uh)}__`;
function $h() {
  let { router: i } = bc("useSubmit"),
    { basename: s } = C.useContext(ct),
    u = oh(),
    f = i.fetch,
    c = i.navigate;
  return C.useCallback(
    async (h, y = {}) => {
      let { action: E, method: k, encType: R, formData: N, body: j } = gh(h, s);
      if (y.navigate === !1) {
        let D = y.fetcherKey || Ah();
        await f(D, u, y.action || E, {
          defaultShouldRevalidate: y.defaultShouldRevalidate,
          preventScrollReset: y.preventScrollReset,
          formData: N,
          body: j,
          formMethod: y.method || k,
          formEncType: y.encType || R,
          flushSync: y.flushSync,
        });
      } else
        await c(y.action || E, {
          defaultShouldRevalidate: y.defaultShouldRevalidate,
          preventScrollReset: y.preventScrollReset,
          formData: N,
          body: j,
          formMethod: y.method || k,
          formEncType: y.encType || R,
          replace: y.replace,
          state: y.state,
          fromRouteId: u,
          flushSync: y.flushSync,
          viewTransition: y.viewTransition,
        });
    },
    [f, c, s, u],
  );
}
function Wh(i, { relative: s } = {}) {
  let { basename: u } = C.useContext(ct),
    f = C.useContext(Ot);
  we(f, "useFormAction must be used inside a RouteContext");
  let [c] = f.matches.slice(-1),
    h = { ...Fr(i || ".", { relative: s }) },
    y = It();
  if (i == null) {
    h.search = y.search;
    let E = new URLSearchParams(h.search),
      k = E.getAll("index");
    if (k.some((N) => N === "")) {
      (E.delete("index"),
        k.filter((j) => j).forEach((j) => E.append("index", j)));
      let N = E.toString();
      h.search = N ? `?${N}` : "";
    }
  }
  return (
    (!i || i === ".") &&
      c.route.index &&
      (h.search = h.search ? h.search.replace(/^\?/, "?index&") : "?index"),
    u !== "/" && (h.pathname = h.pathname === "/" ? u : gt([u, h.pathname])),
    Hn(h)
  );
}
function Bh(i, { relative: s } = {}) {
  let u = C.useContext(Vc);
  we(
    u != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?",
  );
  let { basename: f } = bc("useViewTransitionState"),
    c = Fr(i, { relative: s });
  if (!u.isTransitioning) return !1;
  let h = Mt(u.currentLocation.pathname, f) || u.currentLocation.pathname,
    y = Mt(u.nextLocation.pathname, f) || u.nextLocation.pathname;
  return Zl(c.pathname, y) != null || Zl(c.pathname, h) != null;
}
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Hh = (i) => i.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
  ef = (...i) =>
    i
      .filter((s, u, f) => !!s && s.trim() !== "" && f.indexOf(s) === u)
      .join(" ")
      .trim();
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var Vh = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Qh = C.forwardRef(
  (
    {
      color: i = "currentColor",
      size: s = 24,
      strokeWidth: u = 2,
      absoluteStrokeWidth: f,
      className: c = "",
      children: h,
      iconNode: y,
      ...E
    },
    k,
  ) =>
    C.createElement(
      "svg",
      {
        ref: k,
        ...Vh,
        width: s,
        height: s,
        stroke: i,
        strokeWidth: f ? (Number(u) * 24) / Number(s) : u,
        className: ef("lucide", c),
        ...E,
      },
      [
        ...y.map(([R, N]) => C.createElement(R, N)),
        ...(Array.isArray(h) ? h : [h]),
      ],
    ),
);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const nn = (i, s) => {
  const u = C.forwardRef(({ className: f, ...c }, h) =>
    C.createElement(Qh, {
      ref: h,
      iconNode: s,
      className: ef(`lucide-${Hh(i)}`, f),
      ...c,
    }),
  );
  return ((u.displayName = `${i}`), u);
};
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const uu = nn("ArrowUpRight", [
  ["path", { d: "M7 7h10v10", key: "1tivn9" }],
  ["path", { d: "M7 17 17 7", key: "1vkiza" }],
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Kh = nn("ChevronLeft", [
  ["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }],
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Yh = nn("ChevronRight", [
  ["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }],
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const qh = nn("Mail", [
  [
    "rect",
    { width: "20", height: "16", x: "2", y: "4", rx: "2", key: "18n3k1" },
  ],
  ["path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7", key: "1ocrg3" }],
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Gh = nn("MapPin", [
  [
    "path",
    {
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z",
    },
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }],
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Xh = nn("Menu", [
  ["line", { x1: "4", x2: "20", y1: "12", y2: "12", key: "1e0a9i" }],
  ["line", { x1: "4", x2: "20", y1: "6", y2: "6", key: "1owob3" }],
  ["line", { x1: "4", x2: "20", y1: "18", y2: "18", key: "yk5zj1" }],
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Jh = nn("Phone", [
  [
    "path",
    {
      d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",
      key: "foiqr5",
    },
  ],
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const tf = nn("X", [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }],
]);
function Zh() {
  const [i, s] = C.useState(!1),
    u = [
      ["/", "Home"],
      ["/portfolio", "Portfolio"],
      ["/services", "Services"],
      ["/about", "About"],
      ["/contact", "Contact"],
    ];
  return d.jsx("header", {
    className: "site-header",
    children: d.jsxs("div", {
      className: "nav-wrap",
      children: [
        d.jsxs(Me, {
          to: "/",
          className: "brand",
          onClick: () => s(!1),
          children: [
            d.jsx("span", { children: "JetClicks" }),
            d.jsx("small", { children: "PHOTOGRAPHY STUDIO" }),
          ],
        }),
        d.jsxs("nav", {
          className: `desktop-nav ${i ? "mobile-open" : ""}`,
          children: [
            u.map(([f, c]) =>
              d.jsx(Zc, { to: f, onClick: () => s(!1), children: c }, f),
            ),
            d.jsx(Me, {
              className: "nav-cta",
              to: "/booking",
              onClick: () => s(!1),
              children: "Start an inquiry",
            }),
          ],
        }),
        d.jsx("button", {
          className: "menu-button",
          "aria-label": "Toggle navigation",
          onClick: () => s(!i),
          children: i ? d.jsx(tf, { size: 22 }) : d.jsx(Xh, { size: 22 }),
        }),
      ],
    }),
  });
}
function bh() {
  return d.jsxs("footer", {
    className: "footer",
    children: [
      d.jsxs("div", {
        className: "footer-grid",
        children: [
          d.jsxs("div", {
            children: [
              d.jsx("div", { className: "footer-brand", children: "JetClicks" }),
              d.jsx("p", {
                children:
                  "Photography for weddings, people, events, and brands.",
              }),
            ],
          }),
          d.jsxs("div", {
            children: [
              d.jsx("span", { className: "footer-label", children: "Explore" }),
              d.jsx(Me, { to: "/portfolio", children: "Portfolio" }),
              d.jsx(Me, { to: "/services", children: "Services" }),
              d.jsx(Me, { to: "/about", children: "About" }),
            ],
          }),
          d.jsxs("div", {
            children: [
              d.jsx("span", {
                className: "footer-label",
                children: "Start here",
              }),
              d.jsx(Me, { to: "/booking", children: "Make an inquiry" }),
              d.jsx(Me, { to: "/contact", children: "Contact the studio" }),
            ],
          }),
        ],
      }),
      d.jsxs("div", {
        className: "footer-bottom",
        children: [
          d.jsxs("span", {
            children: ["© ", new Date().getFullYear(), " Atelier Photography"],
          }),
          d.jsx("span", {
            children: "Designed for real conversations, not complicated forms.",
          }),
        ],
      }),
    ],
  });
}
function Mr({
  to: i,
  variant: s = "solid",
  className: u = "",
  children: f,
  ...c
}) {
  const h = `button button-${s} ${u}`;
  return i
    ? d.jsx(Me, { className: h, to: i, children: f })
    : d.jsx("button", { className: h, ...c, children: f });
}
const em = ["Wedding", "Debut", "Portraits", "Events", "Corporate", "Product"],
  au = [
    {
      id: "w1",
      category: "Wedding",
      title: "Quiet vows",
      location: "Palawan",
      image:
        "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=85",
      alt: "Wedding couple outdoors",
    },
    {
      id: "w2",
      category: "Wedding",
      title: "After the ceremony",
      location: "Manila",
      image:
        "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1400&q=85",
      alt: "Wedding couple embracing",
    },
    {
      id: "w3",
      category: "Wedding",
      title: "The celebration",
      location: "Cebu",
      image:
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1400&q=85",
      alt: "Wedding celebration",
    },
    {
      id: "w4",
      category: "Wedding",
      title: "Golden hour",
      location: "Batangas",
      image:
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1400&q=85",
      alt: "Wedding portrait at sunset",
    },
    {
      id: "d1",
      category: "Debut",
      title: "Eighteen",
      location: "Manila",
      image:
        "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1400&q=85",
      alt: "Birthday celebration",
    },
    {
      id: "d2",
      category: "Debut",
      title: "The entrance",
      location: "Quezon City",
      image:
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=85",
      alt: "Event entrance",
    },
    {
      id: "p1",
      category: "Portraits",
      title: "Natural light",
      location: "Makati",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1400&q=85",
      alt: "Portrait in natural light",
    },
    {
      id: "p2",
      category: "Portraits",
      title: "Studio study",
      location: "Manila",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1400&q=85",
      alt: "Studio portrait",
    },
    {
      id: "e1",
      category: "Events",
      title: "On the floor",
      location: "Manila",
      image:
        "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1400&q=85",
      alt: "Conference event",
    },
    {
      id: "c1",
      category: "Corporate",
      title: "People at work",
      location: "Makati",
      image:
        "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1400&q=85",
      alt: "Corporate team",
    },
    {
      id: "pr1",
      category: "Product",
      title: "Object study",
      location: "Studio",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1400&q=85",
      alt: "Product photography",
    },
  ],
  _c = au.slice(0, 4);
function nf({ item: i, onClick: s, large: u = !1 }) {
  return d.jsxs("button", {
    className: `portfolio-card ${u ? "portfolio-card-large" : ""}`,
    onClick: s,
    children: [
      d.jsx("img", { src: i.image, alt: i.alt, loading: "lazy" }),
      d.jsxs("span", {
        className: "portfolio-overlay",
        children: [
          d.jsx("small", { children: i.category }),
          d.jsx("strong", { children: i.title }),
          d.jsx("em", { children: i.location }),
        ],
      }),
    ],
  });
}
function rf({ items: i, index: s, onClose: u, onChange: f }) {
  const c = i[s];
  return (
    C.useEffect(() => {
      const h = (y) => {
        (y.key === "Escape" && u(),
          y.key === "ArrowRight" && f((s + 1) % i.length),
          y.key === "ArrowLeft" && f((s - 1 + i.length) % i.length));
      };
      return (
        window.addEventListener("keydown", h),
        (document.body.style.overflow = "hidden"),
        () => {
          (window.removeEventListener("keydown", h),
            (document.body.style.overflow = ""));
        }
      );
    }, [s, i.length, f, u]),
    d.jsxs("div", {
      className: "modal-backdrop",
      role: "dialog",
      "aria-modal": "true",
      children: [
        d.jsx("button", {
          className: "modal-close",
          onClick: u,
          "aria-label": "Close",
          children: d.jsx(tf, {}),
        }),
        d.jsx("button", {
          className: "gallery-arrow left",
          onClick: () => f((s - 1 + i.length) % i.length),
          "aria-label": "Previous",
          children: d.jsx(Kh, {}),
        }),
        d.jsxs("div", {
          className: "modal-content",
          children: [
            d.jsx("img", { src: c.image, alt: c.alt }),
            d.jsxs("div", {
              className: "modal-caption",
              children: [
                d.jsx("span", { children: c.category }),
                d.jsx("h2", { children: c.title }),
                d.jsxs("p", {
                  children: [c.location, " · ", s + 1, " / ", i.length],
                }),
              ],
            }),
          ],
        }),
        d.jsx("button", {
          className: "gallery-arrow right",
          onClick: () => f((s + 1) % i.length),
          "aria-label": "Next",
          children: d.jsx(Yh, {}),
        }),
      ],
    })
  );
}
function tm() {
  const [i, s] = C.useState(null);
  return d.jsxs("main", {
    children: [
      d.jsxs("section", {
        className: "hero",
        children: [
          d.jsxs("div", {
            className: "hero-copy",
            children: [
              d.jsx("span", {
                className: "eyebrow",
                children: "Photography studio · Philippines",
              }),
              d.jsxs("h1", {
                children: [
                  "Images that hold onto ",
                  d.jsx("i", { children: "the feeling." }),
                ],
              }),
              d.jsx("p", {
                children:
                  "Honest, considered photography for weddings, people, events, and brands. We focus on the moments you'll want to remember—not just the ones that look good on a screen.",
              }),
              d.jsxs("div", {
                className: "hero-actions",
                children: [
                  d.jsx(Mr, { to: "/portfolio", children: "Explore the work" }),
                  d.jsxs(Mr, {
                    to: "/booking",
                    variant: "outline",
                    children: ["Start an inquiry ", d.jsx(uu, { size: 17 })],
                  }),
                ],
              }),
            ],
          }),
          d.jsxs("div", {
            className: "hero-image",
            children: [
              d.jsx("img", {
                src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=90",
                alt: "Wedding couple in an editorial photograph",
              }),
              d.jsx("span", {
                className: "image-note",
                children: "01 / FEATURED STORY",
              }),
            ],
          }),
        ],
      }),
      d.jsxs("section", {
        className: "intro section",
        children: [
          d.jsx("div", { className: "section-kicker", children: "The studio" }),
          d.jsxs("div", {
            className: "intro-copy",
            children: [
              d.jsx("h2", { children: "We photograph people, not poses." }),
              d.jsx("p", {
                children:
                  "From a quiet portrait session to a packed wedding reception, our approach stays the same: observe carefully, direct when needed, and leave room for the moments that happen naturally.",
              }),
              d.jsx(Me, {
                className: "text-link",
                to: "/about",
                children: "More about the studio →",
              }),
            ],
          }),
        ],
      }),
      d.jsxs("section", {
        className: "section featured-section",
        children: [
          d.jsxs("div", {
            className: "section-heading",
            children: [
              d.jsxs("div", {
                children: [
                  d.jsx("span", {
                    className: "eyebrow",
                    children: "Selected work",
                  }),
                  d.jsx("h2", {
                    children: "A few stories we've photographed.",
                  }),
                ],
              }),
              d.jsx(Me, {
                className: "text-link",
                to: "/portfolio",
                children: "View all work →",
              }),
            ],
          }),
          d.jsx("div", {
            className: "featured-grid",
            children: _c.map((u, f) =>
              d.jsx(nf, { item: u, large: f === 0, onClick: () => s(f) }, u.id),
            ),
          }),
        ],
      }),
      d.jsxs("section", {
        className: "services-strip",
        children: [
          d.jsxs("div", {
            children: [
              d.jsx("span", {
                className: "eyebrow",
                children: "What we photograph",
              }),
              d.jsx("h2", { children: "Built around your occasion." }),
            ],
          }),
          d.jsx("div", {
            className: "service-links",
            children: [
              "Wedding",
              "Debut",
              "Portraits",
              "Events",
              "Corporate",
              "Product",
            ].map((u) =>
              d.jsxs(
                Me,
                { to: "/portfolio", children: [u, d.jsx(uu, { size: 16 })] },
                u,
              ),
            ),
          }),
        ],
      }),
      d.jsxs("section", {
        className: "process section",
        children: [
          d.jsx("span", { className: "eyebrow", children: "Simple from here" }),
          d.jsx("h2", { children: "From first message to final gallery." }),
          d.jsx("div", {
            className: "process-grid",
            children: [
              [
                "01",
                "Tell us what you're planning",
                "Share your date, location, and what matters to you.",
              ],
              [
                "02",
                "We shape the coverage",
                "We'll discuss the right approach, timing, and package.",
              ],
              [
                "03",
                "We photograph it",
                "You enjoy the day. We stay attentive to the details.",
              ],
              [
                "04",
                "Your gallery arrives",
                "Your images are edited and delivered as a considered collection.",
              ],
            ].map(([u, f, c]) =>
              d.jsxs(
                "div",
                {
                  className: "process-item",
                  children: [
                    d.jsx("span", { children: u }),
                    d.jsx("h3", { children: f }),
                    d.jsx("p", { children: c }),
                  ],
                },
                u,
              ),
            ),
          }),
        ],
      }),
      d.jsxs("section", {
        className: "cta",
        children: [
          d.jsx("span", {
            className: "eyebrow",
            children: "Have something in mind?",
          }),
          d.jsx("h2", { children: "Let's talk about what you're planning." }),
          d.jsx(Mr, { to: "/booking", children: "Start an inquiry" }),
        ],
      }),
      i !== null &&
        d.jsx(rf, { items: _c, index: i, onClose: () => s(null), onChange: s }),
    ],
  });
}
function nm({ initialCategory: i }) {
  const [s, u] = C.useState(i ?? "All"),
    [f, c] = C.useState(null),
    h = C.useMemo(
      () => (s === "All" ? au : au.filter((y) => y.category === s)),
      [s],
    );
  return d.jsxs("section", {
    className: "gallery-section",
    children: [
      d.jsxs("div", {
        className: "filter-row",
        children: [
          d.jsx("button", {
            className: s === "All" ? "filter active" : "filter",
            onClick: () => u("All"),
            children: "All work",
          }),
          em.map((y) =>
            d.jsx(
              "button",
              {
                className: s === y ? "filter active" : "filter",
                onClick: () => u(y),
                children: y,
              },
              y,
            ),
          ),
        ],
      }),
      d.jsx("div", {
        className: "gallery-grid",
        children: h.map((y, E) =>
          d.jsx(nf, { item: y, large: E === 0, onClick: () => c(E) }, y.id),
        ),
      }),
      f !== null &&
        d.jsx(rf, { items: h, index: f, onClose: () => c(null), onChange: c }),
    ],
  });
}
function rm() {
  return d.jsxs("main", {
    children: [
      d.jsxs("section", {
        className: "page-hero",
        children: [
          d.jsx("span", { className: "eyebrow", children: "Selected work" }),
          d.jsxs("h1", {
            children: [
              "Stories, people,",
              d.jsx("br", {}),
              d.jsx("i", { children: "in between." }),
            ],
          }),
          d.jsx("p", {
            children:
              "Browse the studio's work by photography type. Select an image to open the full gallery view.",
          }),
        ],
      }),
      d.jsx(nm, {}),
    ],
  });
}
const lm = [
  {
    name: "Wedding",
    description:
      "Full-day storytelling, ceremony coverage, portraits, and a curated gallery.",
    details: "From intimate ceremonies to full celebrations.",
  },
  {
    name: "Portraits",
    description:
      "Relaxed portrait sessions built around natural expressions and clean direction.",
    details: "Individual, couple, family, and editorial sessions.",
  },
  {
    name: "Debut & Events",
    description:
      "Thoughtful event coverage focused on people, details, and the moments between.",
    details: "Debuts, birthdays, conferences, and private events.",
  },
  {
    name: "Corporate & Product",
    description:
      "Polished visual content for teams, brands, products, and campaigns.",
    details: "Studio and on-location production.",
  },
];
function om() {
  return d.jsxs("main", {
    children: [
      d.jsxs("section", {
        className: "page-hero",
        children: [
          d.jsx("span", { className: "eyebrow", children: "Services" }),
          d.jsxs("h1", {
            children: [
              "Coverage that fits",
              d.jsx("br", {}),
              d.jsx("i", { children: "the occasion." }),
            ],
          }),
          d.jsx("p", {
            children:
              "Every project starts with a conversation. These are the ways we most often work with clients.",
          }),
        ],
      }),
      d.jsx("section", {
        className: "services-list",
        children: lm.map((i, s) =>
          d.jsxs(
            "article",
            {
              className: "service-row",
              children: [
                d.jsxs("span", { children: ["0", s + 1] }),
                d.jsxs("div", {
                  children: [
                    d.jsx("h2", { children: i.name }),
                    d.jsx("p", { children: i.description }),
                    d.jsx("small", { children: i.details }),
                  ],
                }),
                d.jsx(Me, {
                  to: "/booking",
                  "aria-label": `Inquire about ${i.name}`,
                  children: d.jsx(uu, {}),
                }),
              ],
            },
            i.name,
          ),
        ),
      }),
      d.jsxs("section", {
        className: "note-section",
        children: [
          d.jsx("span", {
            className: "eyebrow",
            children: "Not sure what you need?",
          }),
          d.jsx("h2", { children: "That's completely fine." }),
          d.jsx("p", {
            children:
              "Tell us what you're planning, your date, and what you want photographed. We'll help shape the coverage from there.",
          }),
          d.jsx(Me, {
            className: "text-link",
            to: "/booking",
            children: "Talk to the studio →",
          }),
        ],
      }),
    ],
  });
}
const im = {
  service: "Wedding",
  date: "",
  location: "",
  coverage: "6 hours",
  guests: "",
  name: "",
  email: "",
  phone: "",
  message: "",
};
function um() {
  const [i, s] = C.useState(im),
    [u, f] = C.useState(!1),
    c = (h, y) => s((E) => ({ ...E, [h]: y }));
  return u
    ? d.jsxs("div", {
        className: "success-box",
        children: [
          d.jsx("span", { className: "eyebrow", children: "Inquiry received" }),
          d.jsxs("h2", { children: ["Thank you, ", i.name || "there", "."] }),
          d.jsx("p", {
            children:
              "Your details are ready for the studio. This demo form is frontend-only; connect it to your preferred email, Firebase, Supabase, or API endpoint before launch.",
          }),
          d.jsx(Mr, { to: "/", children: "Return home" }),
        ],
      })
    : d.jsxs("form", {
        className: "inquiry-form",
        onSubmit: (h) => {
          (h.preventDefault(), f(!0));
        },
        children: [
          d.jsxs("div", {
            className: "form-section",
            children: [
              d.jsx("span", { className: "form-number", children: "01" }),
              d.jsxs("div", {
                children: [
                  d.jsx("h3", { children: "Tell us what you're planning" }),
                  d.jsx("p", {
                    children:
                      "Start with the essentials. We'll ask only what we need.",
                  }),
                ],
              }),
            ],
          }),
          d.jsxs("div", {
            className: "form-grid",
            children: [
              d.jsxs("label", {
                children: [
                  "Photography type",
                  d.jsx("select", {
                    value: i.service,
                    onChange: (h) => c("service", h.target.value),
                    children: [
                      "Wedding",
                      "Debut",
                      "Portraits",
                      "Events",
                      "Corporate",
                      "Product",
                      "Other",
                    ].map((h) => d.jsx("option", { children: h }, h)),
                  }),
                ],
              }),
              d.jsxs("label", {
                children: [
                  "Preferred date",
                  d.jsx("input", {
                    required: !0,
                    type: "date",
                    value: i.date,
                    onChange: (h) => c("date", h.target.value),
                  }),
                ],
              }),
              d.jsxs("label", {
                children: [
                  "Location",
                  d.jsx("input", {
                    required: !0,
                    placeholder: "City or venue",
                    value: i.location,
                    onChange: (h) => c("location", h.target.value),
                  }),
                ],
              }),
              d.jsxs("label", {
                children: [
                  "Coverage",
                  d.jsx("select", {
                    value: i.coverage,
                    onChange: (h) => c("coverage", h.target.value),
                    children: [
                      "2 hours",
                      "4 hours",
                      "6 hours",
                      "8 hours",
                      "Full day",
                      "Not sure yet",
                    ].map((h) => d.jsx("option", { children: h }, h)),
                  }),
                ],
              }),
              d.jsxs("label", {
                children: [
                  "Expected guests",
                  d.jsx("input", {
                    placeholder: "e.g. 120",
                    value: i.guests,
                    onChange: (h) => c("guests", h.target.value),
                  }),
                ],
              }),
            ],
          }),
          d.jsxs("div", {
            className: "form-section",
            children: [
              d.jsx("span", { className: "form-number", children: "02" }),
              d.jsxs("div", {
                children: [
                  d.jsx("h3", { children: "How can we reach you?" }),
                  d.jsx("p", {
                    children:
                      "We'll use these details only to respond to your inquiry.",
                  }),
                ],
              }),
            ],
          }),
          d.jsxs("div", {
            className: "form-grid",
            children: [
              d.jsxs("label", {
                children: [
                  "Full name",
                  d.jsx("input", {
                    required: !0,
                    value: i.name,
                    onChange: (h) => c("name", h.target.value),
                  }),
                ],
              }),
              d.jsxs("label", {
                children: [
                  "Email",
                  d.jsx("input", {
                    required: !0,
                    type: "email",
                    value: i.email,
                    onChange: (h) => c("email", h.target.value),
                  }),
                ],
              }),
              d.jsxs("label", {
                children: [
                  "Phone number",
                  d.jsx("input", {
                    value: i.phone,
                    onChange: (h) => c("phone", h.target.value),
                  }),
                ],
              }),
            ],
          }),
          d.jsxs("label", {
            children: [
              "Tell us more",
              d.jsx("textarea", {
                rows: 5,
                placeholder:
                  "Venue, schedule, style, questions, or anything else...",
                value: i.message,
                onChange: (h) => c("message", h.target.value),
              }),
            ],
          }),
          d.jsxs("div", {
            className: "form-submit",
            children: [
              d.jsx("p", {
                children:
                  "We'll review your inquiry and reply with availability and next steps.",
              }),
              d.jsx(Mr, { type: "submit", children: "Send inquiry" }),
            ],
          }),
        ],
      });
}
function am() {
  return d.jsxs("main", {
    children: [
      d.jsxs("section", {
        className: "booking-header",
        children: [
          d.jsxs("div", {
            children: [
              d.jsx("span", {
                className: "eyebrow",
                children: "Online inquiry",
              }),
              d.jsxs("h1", {
                children: [
                  "Tell us about",
                  d.jsx("br", {}),
                  d.jsx("i", { children: "your plans." }),
                ],
              }),
            ],
          }),
          d.jsx("p", {
            children:
              "No deposit or payment is taken here. This first step simply helps us understand your project and check availability.",
          }),
        ],
      }),
      d.jsxs("section", {
        className: "booking-layout",
        children: [
          d.jsxs("div", {
            className: "booking-side",
            children: [
              d.jsx("span", {
                className: "eyebrow",
                children: "Before you begin",
              }),
              d.jsx("h2", { children: "What we'll need" }),
              d.jsxs("ul", {
                children: [
                  d.jsx("li", { children: "Your preferred date" }),
                  d.jsx("li", {
                    children: "Where the shoot or event will happen",
                  }),
                  d.jsx("li", {
                    children: "The kind of photography you're looking for",
                  }),
                  d.jsx("li", { children: "A little context about the day" }),
                ],
              }),
              d.jsx("p", {
                className: "muted",
                children:
                  "You don't need to have everything figured out. If you're unsure, just say so.",
              }),
            ],
          }),
          d.jsx(um, {}),
        ],
      }),
    ],
  });
}
function sm() {
  return d.jsxs("main", {
    children: [
      d.jsxs("section", {
        className: "page-hero",
        children: [
          d.jsx("span", { className: "eyebrow", children: "About the studio" }),
          d.jsxs("h1", {
            children: [
              "Quiet direction.",
              d.jsx("br", {}),
              d.jsx("i", { children: "Real moments." }),
            ],
          }),
          d.jsx("p", {
            children:
              "Atelier is an independent photography studio built around thoughtful observation and photographs that feel like the people in them.",
          }),
        ],
      }),
      d.jsxs("section", {
        className: "about-grid",
        children: [
          d.jsx("img", {
            src: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1200&q=85",
            alt: "Photographer working at an event",
          }),
          d.jsxs("div", {
            children: [
              d.jsx("span", { className: "eyebrow", children: "Our approach" }),
              d.jsx("h2", { children: "Present without getting in the way." }),
              d.jsx("p", {
                children:
                  "We believe the best photographs often happen just before or after the moment everyone expects. Our work balances gentle direction with enough space for real interactions to happen.",
              }),
              d.jsx("p", {
                children:
                  "Whether we're covering a wedding, a portrait session, or a brand shoot, the goal remains simple: make photographs that still mean something years from now.",
              }),
              d.jsx(Me, {
                className: "text-link",
                to: "/booking",
                children: "Work with us →",
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
function cm() {
  return d.jsxs("main", {
    children: [
      d.jsxs("section", {
        className: "page-hero",
        children: [
          d.jsx("span", { className: "eyebrow", children: "Contact" }),
          d.jsxs("h1", {
            children: [
              "Have a question?",
              d.jsx("br", {}),
              d.jsx("i", { children: "Let's talk." }),
            ],
          }),
          d.jsx("p", {
            children:
              "For availability, packages, collaborations, or anything else, send a message and we'll get back to you.",
          }),
        ],
      }),
      d.jsxs("section", {
        className: "contact-grid",
        children: [
          d.jsxs("div", {
            children: [
              d.jsx("span", {
                className: "contact-icon",
                children: d.jsx(qh, {}),
              }),
              d.jsx("span", { className: "eyebrow", children: "Email" }),
              d.jsx("h3", { children: "jetclicks@gmail.com" }),
            ],
          }),
          d.jsxs("div", {
            children: [
              d.jsx("span", {
                className: "contact-icon",
                children: d.jsx(Jh, {}),
              }),
              d.jsx("span", { className: "eyebrow", children: "Phone" }),
              d.jsx("h3", { children: "+63 900 000 0000" }),
            ],
          }),
          d.jsxs("div", {
            children: [
              d.jsx("span", {
                className: "contact-icon",
                children: d.jsx(Gh, {}),
              }),
              d.jsx("span", { className: "eyebrow", children: "Based in" }),
              d.jsx("h3", { children: "Philippines · Available nationwide" }),
            ],
          }),
        ],
      }),
      d.jsxs("section", {
        className: "cta compact",
        children: [
          d.jsx("span", { className: "eyebrow", children: "Ready?" }),
          d.jsx("h2", { children: "Start with an inquiry." }),
          d.jsx(Me, {
            className: "button button-solid",
            to: "/booking",
            children: "Start an inquiry",
          }),
        ],
      }),
    ],
  });
}
function fm() {
  return d.jsxs(ch, {
    children: [
      d.jsx(yn, { path: "/", element: d.jsx(tm, {}) }),
      d.jsx(yn, { path: "/portfolio", element: d.jsx(rm, {}) }),
      d.jsx(yn, { path: "/services", element: d.jsx(om, {}) }),
      d.jsx(yn, { path: "/booking", element: d.jsx(am, {}) }),
      d.jsx(yn, { path: "/about", element: d.jsx(sm, {}) }),
      d.jsx(yn, { path: "/contact", element: d.jsx(cm, {}) }),
    ],
  });
}
function dm() {
  return d.jsxs(d.Fragment, {
    children: [d.jsx(Zh, {}), d.jsx(fm, {}), d.jsx(bh, {})],
  });
}
sp.createRoot(document.getElementById("root")).render(
  d.jsx(C.StrictMode, { children: d.jsx(Mh, { children: d.jsx(dm, {}) }) }),
);
