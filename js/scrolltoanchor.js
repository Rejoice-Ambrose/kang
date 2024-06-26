(function () {
  "use strict";

  function ScrollToAnchor(t) {
    var e = this;
    void 0 === t && (t = {});
    var n = t.offset;
    void 0 === n && (n = 0);
    var o = t.duration;
    void 0 === o && (o = 800), (this.offset = n), (this.duration = o);
    var r = function (t) {
        return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
      },
      i = Array.prototype.slice
        .call(document.getElementsByTagName("a"))
        .filter(function (t) {
          return (function (t) {
            return -1 != (t.href && t.href.indexOf("#"));
          })(t);
        }),
      a = i.filter(function (t) {
        return (function (t) {
          return (
            t.pathname == window.location.pathname ||
            ("/" + t.pathname == window.location.pathname &&
              t.search == location.search)
          );
        })(t);
      });
    document.addEventListener("click", function (t) {
      var i = a.filter(function (e) {
        return t.target === e;
      })[0];
      i &&
        (t.preventDefault(),
        (function (t) {
          var i = t.getAttribute("href"),
            a = document.querySelector(i),
            u = a.getAttribute("data-anchor-offset");
          n = u || e.offset;
          var c = (function (t) {
              return Math.floor(t.getBoundingClientRect().top);
            })(a),
            f = window.pageYOffset || document.documentElement.scrollTop,
            l = f,
            d = f + c - n,
            m = !1,
            s = null,
            h = function (t) {
              if (m) {
                return (
                  (document.documentElement.scrollTop = d),
                  a.focus(),
                  void window.history.pushState("", "", i)
                );
              }
              (l == d || t - s >= o) && (m = !0);
              var e = r((t - s) / o),
                n = l + (d - l) * e;
              (document.documentElement.scrollTop = n),
                requestAnimationFrame(h);
            };
          requestAnimationFrame(function (t) {
            (s = t), h(t);
          });
        })(i));
    });
  }

  var smoothScroll = new ScrollToAnchor({
    offset: 150,
    duration: 1000,
  });
})();
