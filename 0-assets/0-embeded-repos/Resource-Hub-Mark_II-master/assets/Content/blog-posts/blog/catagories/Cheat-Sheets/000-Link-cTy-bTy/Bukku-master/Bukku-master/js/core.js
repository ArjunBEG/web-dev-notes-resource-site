/*! formstone v0.5.3 [core.js] 2015-04-17 | MIT License | formstone.it */

var Formstone = (this.Formstone = (function (a, b, c) {
  "use strict";
  function d(a, b, c, d) {
    var e,
      f = { raw: {} };
    d = d || {};
    for (e in d)
      d.hasOwnProperty(e) &&
        ("classes" === a
          ? ((f.raw[d[e]] = b + "-" + d[e]), (f[d[e]] = "." + b + "-" + d[e]))
          : ((f.raw[e] = d[e]), (f[e] = d[e] + "." + b)));
    for (e in c)
      c.hasOwnProperty(e) &&
        ("classes" === a
          ? ((f.raw[e] = c[e].replace(/{ns}/g, b)),
            (f[e] = c[e].replace(/{ns}/g, "." + b)))
          : ((f.raw[e] = c[e].replace(/.{ns}/g, "")),
            (f[e] = c[e].replace(/{ns}/g, b))));
    return f;
  }
  function e() {
    var a,
      b = {
        transition: "transitionend",
        MozTransition: "transitionend",
        OTransition: "otransitionend",
        WebkitTransition: "webkitTransitionEnd",
      },
      d = ["transition", "-webkit-transition"],
      e = {
        transform: "transform",
        MozTransform: "-moz-transform",
        OTransform: "-o-transform",
        msTransform: "-ms-transform",
        webkitTransform: "-webkit-transform",
      },
      f = "transitionend",
      g = "",
      h = "",
      i = c.createElement("div");
    for (a in b)
      if (b.hasOwnProperty(a) && a in i.style) {
        (f = b[a]), (k.support.transition = !0);
        break;
      }
    m.transitionEnd = f + ".{ns}";
    for (a in d)
      if (d.hasOwnProperty(a) && d[a] in i.style) {
        g = d[a];
        break;
      }
    k.transition = g;
    for (a in e)
      if (e.hasOwnProperty(a) && e[a] in i.style) {
        (k.support.transform = !0), (h = e[a]);
        break;
      }
    k.transform = h;
  }
  function f() {
    (k.windowWidth = k.$window.width()),
      (k.windowHeight = k.$window.height()),
      (n = j.startTimer(n, o, g));
  }
  function g() {
    for (var a in k.ResizeHandlers)
      k.ResizeHandlers.hasOwnProperty(a) &&
        k.ResizeHandlers[a].callback.call(b, k.windowWidth, k.windowHeight);
  }
  function h(a, b) {
    return parseInt(a.priority) - parseInt(b.priority);
  }
  var i = function () {
      (this.Plugins = {}),
        (this.ResizeHandlers = []),
        (this.window = b),
        (this.$window = a(b)),
        (this.document = c),
        (this.$document = a(c)),
        (this.$body = null),
        (this.windowWidth = 0),
        (this.windowHeight = 0),
        (this.userAgent =
          b.navigator.userAgent || b.navigator.vendor || b.opera),
        (this.isFirefox = /Firefox/i.test(this.userAgent)),
        (this.isChrome = /Chrome/i.test(this.userAgent)),
        (this.isSafari = /Safari/i.test(this.userAgent) && !this.isChrome),
        (this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(
          this.userAgent
        )),
        (this.isFirefoxMobile = this.isFirefox && this.isMobile),
        (this.transform = null),
        (this.transition = null),
        (this.support = {
          file: !!(b.File && b.FileList && b.FileReader),
          history: !!(
            b.history &&
            b.history.pushState &&
            b.history.replaceState
          ),
          matchMedia: !(!b.matchMedia && !b.msMatchMedia),
          raf: !(!b.requestAnimationFrame || !b.cancelAnimationFrame),
          touch: !!(
            "ontouchstart" in b ||
            (b.DocumentTouch && c instanceof b.DocumentTouch)
          ),
          transition: !1,
          transform: !1,
        });
    },
    j = {
      killEvent: function (a, b) {
        try {
          a.preventDefault(),
            a.stopPropagation(),
            b && a.stopImmediatePropagation();
        } catch (c) {}
      },
      startTimer: function (a, b, c, d) {
        return j.clearTimer(a), d ? setInterval(c, b) : setTimeout(c, b);
      },
      clearTimer: function (a, b) {
        a && (b ? clearInterval(a) : clearTimeout(a), (a = null));
      },
      sortAsc: function (a, b) {
        return parseInt(b) - parseInt(a);
      },
      sortDesc: function (a, b) {
        return parseInt(b) - parseInt(a);
      },
    },
    k = new i(),
    l = { base: "{ns}", element: "{ns}-element" },
    m = {
      namespace: ".{ns}",
      blur: "blur.{ns}",
      change: "change.{ns}",
      click: "click.{ns}",
      dblClick: "dblclick.{ns}",
      drag: "drag.{ns}",
      dragEnd: "dragend.{ns}",
      dragEnter: "dragenter.{ns}",
      dragLeave: "dragleave.{ns}",
      dragOver: "dragover.{ns}",
      dragStart: "dragstart.{ns}",
      drop: "drop.{ns}",
      error: "error.{ns}",
      focus: "focus.{ns}",
      focusIn: "focusin.{ns}",
      focusOut: "focusout.{ns}",
      input: "input.{ns}",
      keyDown: "keydown.{ns}",
      keyPress: "keypress.{ns}",
      keyUp: "keyup.{ns}",
      load: "load.{ns}",
      mouseDown: "mousedown.{ns}",
      mouseEnter: "mouseenter.{ns}",
      mouseLeave: "mouseleave.{ns}",
      mouseMove: "mousemove.{ns}",
      mouseOut: "mouseout.{ns}",
      mouseOver: "mouseover.{ns}",
      mouseUp: "mouseup.{ns}",
      resize: "resize.{ns}",
      scroll: "scroll.{ns}",
      select: "select.{ns}",
      touchCancel: "touchcancel.{ns}",
      touchEnd: "touchend.{ns}",
      touchLeave: "touchleave.{ns}",
      touchMove: "touchmove.{ns}",
      touchStart: "touchstart.{ns}",
    };
  i.prototype.Plugin = function (c, e) {
    return (
      (k.Plugins[c] = (function (c, e) {
        function f(b) {
          var d = "object" === a.type(b);
          b = a.extend(!0, {}, e.defaults || {}, d ? b : {});
          for (var f = this, g = 0, h = f.length; h > g; g++) {
            var j = f.eq(g);
            if (!i(j)) {
              var k = j.data(c + "-options"),
                l = a.extend(
                  !0,
                  { $el: j },
                  b,
                  "object" === a.type(k) ? k : {}
                );
              j.addClass(e.classes.raw.element).data(r, l),
                e.methods._construct.apply(
                  j,
                  [l].concat(Array.prototype.slice.call(arguments, d ? 1 : 0))
                );
            }
          }
          return f;
        }
        function g() {
          e.functions.iterate.apply(
            this,
            [e.methods._destruct].concat(
              Array.prototype.slice.call(arguments, 1)
            )
          ),
            this.removeClass(e.classes.raw.element).removeData(r);
        }
        function i(a) {
          return a.data(r);
        }
        function n(b) {
          if (this instanceof a) {
            var c = e.methods[b];
            return "object" !== a.type(b) && b
              ? c && 0 !== b.indexOf("_")
                ? e.functions.iterate.apply(
                    this,
                    [c].concat(Array.prototype.slice.call(arguments, 1))
                  )
                : this
              : f.apply(this, arguments);
          }
        }
        function o(c) {
          var d = e.utilities[c] || e.utilities._initialize || !1;
          return d
            ? d.apply(
                b,
                Array.prototype.slice.call(
                  arguments,
                  "object" === a.type(c) ? 0 : 1
                )
              )
            : void 0;
        }
        function p(b) {
          e.defaults = a.extend(!0, e.defaults, b || {});
        }
        function q(b) {
          for (var c = this, d = 0, e = c.length; e > d; d++) {
            var f = c.eq(d),
              g = i(f) || {};
            "undefined" !== a.type(g.$el) &&
              b.apply(f, [g].concat(Array.prototype.slice.call(arguments, 1)));
          }
          return c;
        }
        var r = "fs-" + c;
        return (
          (e.initialized = !1),
          (e.priority = e.priority || 10),
          (e.classes = d("classes", r, l, e.classes)),
          (e.events = d("events", c, m, e.events)),
          (e.functions = a.extend({ getData: i, iterate: q }, j, e.functions)),
          (e.methods = a.extend(
            !0,
            {
              _setup: a.noop,
              _construct: a.noop,
              _destruct: a.noop,
              _resize: !1,
              destroy: g,
            },
            e.methods
          )),
          (e.utilities = a.extend(
            !0,
            { _initialize: !1, _delegate: !1, defaults: p },
            e.utilities
          )),
          e.widget && (a.fn[c] = n),
          (a[c] = e.utilities._delegate || o),
          (e.namespace = c),
          e.methods._resize &&
            (k.ResizeHandlers.push({
              namespace: c,
              priority: e.priority,
              callback: e.methods._resize,
            }),
            k.ResizeHandlers.sort(h)),
          e
        );
      })(c, e)),
      k.Plugins[c]
    );
  };
  var n = null,
    o = 20;
  return (
    k.$window.on("resize.fs", f),
    f(),
    a(function () {
      k.$body = a("body");
      for (var b in k.Plugins)
        k.Plugins.hasOwnProperty(b) &&
          !k.Plugins[b].initialized &&
          (k.Plugins[b].methods._setup.call(c),
          (k.Plugins[b].initialized = !0));
    }),
    (m.clickTouchStart = m.click + " " + m.touchStart),
    e(),
    k
  );
})(jQuery, this, document));
