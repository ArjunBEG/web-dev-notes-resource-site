try {
  !(function (a, t) {
    var e = { id: "129" };
    (utag.o[t].sender[129] = e), void 0 === utag.ut && (utag.ut = {});
    var d = /ut\d\.(\d*)\..*/.exec(utag.cfg.v);
    void 0 === utag.ut.loader || !d || parseInt(d[1]) < 41
      ? (e.loader = function (a, t, e, d, r, n) {
          for (r in (utag.DB(a),
          (t = document),
          "iframe" == a.type
            ? ((e =
                (n = t.getElementById(a.id)) && "IFRAME" == n.tagName
                  ? n
                  : t.createElement("iframe")),
              (a.attrs = a.attrs || {}),
              utag.ut.merge(
                a.attrs,
                { height: "1", width: "1", style: "display:none" },
                0
              ))
            : "img" == a.type
            ? (utag.DB("Attach img: " + a.src), (e = new Image()))
            : (((e = t.createElement("script")).language = "javascript"),
              (e.type = "text/javascript"),
              (e.async = 1),
              (e.charset = "utf-8")),
          a.id && (e.id = a.id),
          utag.loader.GV(a.attrs)))
            e.setAttribute(r, a.attrs[r]);
          e.setAttribute("src", a.src),
            "function" == typeof a.cb &&
              (e.addEventListener
                ? e.addEventListener(
                    "load",
                    function () {
                      a.cb();
                    },
                    !1
                  )
                : (e.onreadystatechange = function () {
                    ("complete" != this.readyState &&
                      "loaded" != this.readyState) ||
                      ((this.onreadystatechange = null), a.cb());
                  })),
            "img" == a.type ||
              n ||
              ((r = a.loc || "head"),
              (d = t.getElementsByTagName(r)[0]) &&
                (utag.DB("Attach to " + r + ": " + a.src),
                "script" == r
                  ? d.parentNode.insertBefore(e, d)
                  : d.appendChild(e)));
        })
      : (e.loader = utag.ut.loader),
      void 0 === utag.ut.typeOf
        ? (e.typeOf = function (a) {
            return {}.toString
              .call(a)
              .match(/\s([a-zA-Z]+)/)[1]
              .toLowerCase();
          })
        : (e.typeOf = utag.ut.typeOf),
      (e.ev = { view: 1, link: 1 }),
      (e.hasgtagjs = function () {
        if (
          ((window.gtagRename = window.gtagRename || "gtag"),
          utag.ut.gtagAdwordsScriptRequested)
        )
          return !0;
        var a,
          t = document.getElementsByTagName("script");
        for (a = 0; a < t.length; a++)
          if (t[a].src && t[a].src.indexOf("gtag-adwords") >= 0) return !0;
        return (
          (window.dataLayer = window.dataLayer || []),
          "function" != typeof window[window.gtagRename] &&
            ((window[window.gtagRename] = function () {
              dataLayer.push(arguments);
            }),
            window[window.gtagRename]("js", new Date())),
          !1
        );
      }),
      (e.scriptrequested = e.hasgtagjs()),
      (e.o = window[window.gtagRename]),
      (e.map_func = function (a, t, d) {
        var r = a.shift();
        (t[r] = t[r] || {}), a.length > 0 ? e.map_func(a, t[r], d) : (t[r] = d);
      }),
      (e.toBoolean = function (a) {
        return (
          !0 === (a = a || "") ||
          "true" === a.toLowerCase() ||
          "on" === a.toLowerCase()
        );
      }),
      (e.clearEmptyKeys = function (a) {
        for (var t in a) ("" !== a[t] && void 0 !== a[t]) || delete a[t];
        return a;
      }),
      (e.isEmptyObject = function (a, t) {
        for (t in a) if (utag.ut.hasOwn(a, t)) return !1;
        return !0;
      }),
      (e.sites = {
        ecomm: {
          required: ["prodid"],
          params: [
            "prodid",
            "pagetype",
            "totalvalue",
            "category",
            "pvalue",
            "quantity",
          ],
          valuerules: ["product", "cart", "purchase"],
        },
        hotel: {
          required: ["hotelid"],
          params: ["hotelid", "pagetype", "checkoutdate", "totalvalue"],
          valuerules: ["cart", "purchase"],
        },
        edu: { required: ["pid"], params: ["pid", "plocid", "pagetype"] },
        flight: {
          required: ["originid", "destid"],
          params: [
            "originid",
            "destid",
            "pagetype",
            "totalvalue",
            "startdate",
            "enddate",
          ],
          valuerules: ["cart", "purchase"],
        },
        hrental: {
          required: ["id"],
          params: ["id", "pagetype", "startdate", "enddate", "totalvalue"],
          valuerules: ["conversionintent", "conversion"],
        },
        job: {
          required: ["id"],
          params: ["id", "locid", "pagetype", "totalvalue"],
          valuerules: ["conversionintent", "conversion"],
        },
        local: {
          required: ["id"],
          params: ["id", "pagetype", "totalvalue"],
          valuerules: ["conversionintent", "conversion"],
        },
        listing: {
          required: ["id"],
          params: ["id", "pagetype", "totalvalue"],
          valuerules: ["conversionintent", "conversion"],
        },
        travel: {
          required: ["destid"],
          params: [
            "destid",
            "originid",
            "pagetype",
            "startdate",
            "enddate",
            "totalvalue",
          ],
          valuerules: ["conversionintent", "conversion"],
        },
        dynx: {
          required: ["itemid"],
          params: ["itemid", "itemid2", "pagetype", "totalvalue"],
          valuerules: ["conversionintent"],
        },
      }),
      (e.checkRequired = function (a, t) {
        var d,
          r = !1;
        if (!e.data[a]) return r;
        for (d = 0; d < t.required.length; d++) r = !!e.data[a][t.required[d]];
        return r;
      }),
      (e.getValue = function (a, t, d) {
        var r;
        for (r = 0; r < d.valuerules.length; r++)
          if (e.data.pagetype && e.data.pagetype === d.valuerules[r])
            return e.data[t][a] || e.data.order_subtotal;
      }),
      (e.getParams = function () {
        var a,
          t,
          d = {};
        for (a in e.sites) {
          var r = e.sites[a];
          if (e.data[a] && e.checkRequired(a, r))
            for (t = 0; t < r.params.length; t++)
              "totalvalue" === r.params[t]
                ? (d[a + "_" + r.params[t]] = e.getValue(r.params[t], a, r))
                : "pagetype" === r.params[t]
                ? (d[a + "_" + r.params[t]] = e.data.pagetype)
                : (d[a + "_" + r.params[t]] = e.data[a][r.params[t]]);
        }
        return e.clearEmptyKeys(d);
      }),
      (e.getItems = function (a) {
        var t,
          d = {},
          r = [];
        for (a = a || e.data.product_id.length, t = 0; t < a; t++)
          ((d = {}).id = e.data.product_id[t]),
            (d.price = e.data.product_unit_price[t]
              ? e.data.product_unit_price[t]
              : ""),
            (d.quantity = e.data.product_quantity[t]
              ? e.data.product_quantity[t]
              : ""),
            r.push(d);
        return r;
      }),
      (e.map = {
        googleAllowAdPersonalizationSignals:
          "config.allow_ad_personalization_signals",
      }),
      (e.extend = []),
      (e.send = function (a, t) {
        if (e.ev[a] || void 0 !== e.ev.all) {
          var d, r, n, o, i, c;
          for (d in (utag.DB("send:129"),
          utag.DB(t),
          (e.data = {
            base_url:
              "https://platform.linkedin.com/litms/vendor/google/gtag-adwords.js",
            conversion_id: "979305453",
            conversion_label: "Tb4MCPXRjbkBEO2H_NID",
            conversion_value: "",
            pagetype: "conversion",
            remarketing: "false",
            product_id: [],
            product_category: [],
            product_quantity: [],
            product_unit_price: [],
            product_discount: [],
            config: {},
            event_data: {},
            event: [],
            custom: {},
          }),
          utag.DB("send:129:EXTENSIONS"),
          utag.DB(t),
          [],
          utag.loader.GV(e.map)))
            if (void 0 !== t[d] && "" !== t[d])
              for (r = e.map[d].split(","), n = 0; n < r.length; n++)
                e.map_func(r[n].split("."), e.data, t[d]);
            else
              2 === (o = d.split(":")).length &&
                t[o[0]] === o[1] &&
                e.map[d] &&
                (e.data.event = e.data.event.concat(e.map[d].split(",")));
          if (
            (utag.DB("send:129:MAPPINGS"),
            utag.DB(e.data),
            (e.data.order_id = e.data.order_id || t._corder || ""),
            (e.data.order_subtotal =
              e.data.conversion_value ||
              e.data.order_subtotal ||
              t._csubtotal ||
              ""),
            (e.data.order_currency =
              e.data.conversion_currency ||
              e.data.order_currency ||
              t._ccurrency ||
              ""),
            0 === e.data.product_id.length &&
              void 0 !== t._cprod &&
              (e.data.product_id = t._cprod.slice(0)),
            0 === e.data.product_category.length &&
              void 0 !== t._ccat &&
              (e.data.product_category = t._ccat.slice(0)),
            0 === e.data.product_quantity.length &&
              void 0 !== t._cquan &&
              (e.data.product_quantity = t._cquan.slice(0)),
            0 === e.data.product_unit_price.length &&
              void 0 !== t._cprice &&
              (e.data.product_unit_price = t._cprice.slice(0)),
            0 === e.data.product_discount.length &&
              void 0 !== t._cpdisc &&
              (e.data.product_discount = t._cpdisc.slice(0)),
            0 === e.data.event.length &&
              void 0 !== t._cevent &&
              (e.data.event =
                "array" === e.typeOf(t._cevent)
                  ? t._cevent.slice(0)
                  : [t._cevent]),
            "string" == typeof e.data.conversion_id &&
              "" !== e.data.conversion_id &&
              (e.data.conversion_id = e.data.conversion_id
                .replace(/\s/g, "")
                .split(",")),
            "string" == typeof e.data.conversion_label &&
              "" !== e.data.conversion_label &&
              (e.data.conversion_label = e.data.conversion_label
                .replace(/\s/g, "")
                .split(",")),
            "string" == typeof e.data.conversion_cookie_prefix &&
              "" !== e.data.conversion_cookie_prefix &&
              (e.data.conversion_cookie_prefix = e.data.conversion_cookie_prefix
                .replace(/\s/g, "")
                .split(",")),
            e.data.order_currency !== e.data.order_currency.toUpperCase() &&
              ((e.data.order_currency = e.data.order_currency.toUpperCase()),
              utag.DB(
                "Currency not supplied in uppercase - automatically converting"
              )),
            !e.data.conversion_id)
          )
            return void utag.DB(
              e.id + ": Tag not fired: Required attribute not populated"
            );
          for (i = 0; i < e.data.conversion_id.length; i++)
            /^[a-zA-Z]{2}-/.test(e.data.conversion_id[i]) ||
              (e.data.conversion_id[i] = "AW-" + e.data.conversion_id[i]);
          for (
            e.data.base_url += "?id=" + e.data.conversion_id[0], i = 0;
            i < e.data.conversion_id.length;
            i++
          )
            e.data.conversion_cookie_prefix &&
              e.data.conversion_cookie_prefix[i] &&
              (e.data.config.conversion_cookie_prefix =
                e.data.conversion_cookie_prefix[i]),
              e.o("config", e.data.conversion_id[i], e.data.config);
          if (
            (e.data.product_id.length > 0 &&
              ((e.data.ecomm = e.data.ecomm || {}),
              void 0 === e.data.ecomm.prodid &&
                (e.data.ecomm.prodid = e.data.product_id),
              e.data.product_category.length > 0 &&
                void 0 === e.data.ecomm.category &&
                (e.data.ecomm.category = e.data.product_category),
              e.data.product_quantity.length > 0 &&
                void 0 === e.data.ecomm.quantity &&
                (e.data.ecomm.quantity = e.data.product_quantity),
              e.data.product_unit_price.length > 0 &&
                void 0 === e.data.ecomm.pvalue &&
                (e.data.ecomm.pvalue = e.data.product_unit_price)),
            (e.data.event_data = e.getParams()),
            utag.ut.merge(e.data.event_data, e.data.custom, 1),
            e.data.conversion_label)
          ) {
            for (
              e.data.event_data.send_to = [], i = 0;
              i < e.data.conversion_id.length;
              i++
            )
              e.data.event_data.send_to.push(
                e.data.conversion_id[i] +
                  "/" +
                  (e.data.conversion_label[i] || e.data.conversion_label[0])
              );
            for (
              e.data.order_subtotal &&
                ((e.data.event_data.value = e.data.order_subtotal),
                (e.data.event_data.currency = e.data.order_currency),
                (e.data.event_data.transaction_id = e.data.order_id)),
                e.data.event_data.items = e.getItems(),
                e.data.event_data.aw_merchant_id = e.data.aw_merchant_id,
                e.data.event_data.aw_feed_country = e.data.aw_feed_country,
                e.data.event_data.aw_feed_language = e.data.aw_feed_language,
                e.data.event_data.discount = 0,
                c = 0;
              c < e.data.product_discount.length;
              c++
            )
              e.data.event_data.discount += isNaN(
                parseFloat(e.data.product_discount[c])
              )
                ? 0
                : parseFloat(e.data.product_discount[c]);
            var u = !1;
            for (i = 0; i < e.data.event.length; i++)
              ("conversion" !== e.data.event[i] &&
                "purchase" !== e.data.event[i]) ||
                (u = !0);
            u || e.data.event.length || e.data.event.push("conversion");
          }
          for (
            e.toBoolean(e.data.remarketing) &&
              (e.data.event.length ||
                ((e.data.event_data.send_to = e.data.conversion_id),
                e.data.event.push("page_view"))),
              i = 0;
            i < e.data.event.length;
            i++
          )
            e.o("event", e.data.event[i], e.clearEmptyKeys(e.data.event_data));
          e.hasgtagjs() ||
            ((e.scriptrequested = !0),
            (utag.ut.gtagAdwordsScriptRequested = !0),
            e.loader({
              type: "script",
              src: e.data.base_url,
              cb: null,
              loc: "script",
              id: "utag_129",
              attrs: {},
            })),
            utag.DB("send:129:COMPLETE");
        }
      }),
      utag.o[t].loader.LOAD("129");
  })(0, "linkedin.voyager-web-feed");
} catch (a) {
  utag.DB(a);
}