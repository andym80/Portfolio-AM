!(function (e, t, h) {
  function a(e, t, a) {
    (this.callback = a || c.callback),
      (this.errors = []),
      (this.fields = {}),
      (this.form = this._formByNameOrNode(e) || {}),
      (this.messages = {}),
      (this.handlers = {}),
      (this.conditionals = {});
    for (var n = 0, s = t.length; n < s; n++) {
      var i = t[n];
      if ((i.name || i.names) && i.rules)
        if (i.names)
          for (var r = 0, l = i.names.length; r < l; r++)
            this._addField(i, i.names[r]);
        else this._addField(i, i.name);
      else
        console.warn(
          "validate.js: The following field is being skipped due to a misconfiguration:"
        ),
          console.warn(i),
          console.warn(
            "Check to ensure you have properly configured a name and rules for this field"
          );
    }
    var u,
      o = this.form.onsubmit;
    this.form.onsubmit =
      ((u = this),
      function (e) {
        try {
          return u._validateForm(e) && (o === h || o());
        } catch (e) {}
      });
  }
  function s(e, t) {
    var a;
    if (!(0 < e.length) || ("radio" !== e[0].type && "checkbox" !== e[0].type))
      return e[t];
    for (a = 0, elementLength = e.length; a < elementLength; a++)
      if (e[a].checked) return e[a][t];
  }
  var c = {
      messages: {
        required: "The %s field is required.",
        matches: "The %s field does not match the %s field.",
        default: "The %s field is still set to default, please change.",
        valid_email: "The %s field must contain a valid email address.",
        valid_emails: "The %s field must contain all valid email addresses.",
        min_length: "The %s field must be at least %s characters in length.",
        max_length: "The %s field must not exceed %s characters in length.",
        exact_length: "The %s field must be exactly %s characters in length.",
        greater_than: "The %s field must contain a number greater than %s.",
        less_than: "The %s field must contain a number less than %s.",
        alpha: "The %s field must only contain alphabetical characters.",
        alpha_numeric:
          "The %s field must only contain alpha-numeric characters.",
        alpha_dash:
          "The %s field must only contain alpha-numeric characters, underscores, and dashes.",
        numeric: "The %s field must contain only numbers.",
        integer: "The %s field must contain an integer.",
        decimal: "The %s field must contain a decimal number.",
        is_natural: "The %s field must contain only positive numbers.",
        is_natural_no_zero:
          "The %s field must contain a number greater than zero.",
        valid_ip: "The %s field must contain a valid IP.",
        valid_base64: "The %s field must contain a base64 string.",
        valid_credit_card:
          "The %s field must contain a valid credit card number.",
        is_file_type: "The %s field must contain only %s files.",
        valid_url: "The %s field must contain a valid URL.",
        greater_than_date:
          "The %s field must contain a more recent date than %s.",
        less_than_date: "The %s field must contain an older date than %s.",
        greater_than_or_equal_date:
          "The %s field must contain a date that's at least as recent as %s.",
        less_than_or_equal_date:
          "The %s field must contain a date that's %s or older.",
      },
      callback: function (e) {},
    },
    f = /^(.+?)\[(.+)\]$/,
    n = /^[0-9]+$/,
    i = /^\-?[0-9]+$/,
    r = /^\-?[0-9]*\.?[0-9]+$/,
    l =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    u = /^[a-z]+$/i,
    o = /^[a-z0-9]+$/i,
    d = /^[a-z0-9_\-]+$/i,
    m = /^[0-9]+$/i,
    p = /^[1-9][0-9]*$/i,
    _ =
      /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/i,
    v = /[^a-zA-Z0-9\/\+=]/i,
    g = /^[\d\-\s]+$/,
    y =
      /^((http|https):\/\/(\w+:{0,1}\w*@)?(\S+)|)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,
    b = /\d{4}-\d{1,2}-\d{1,2}/;
  (a.prototype.setMessage = function (e, t) {
    return (this.messages[e] = t), this;
  }),
    (a.prototype.registerCallback = function (e, t) {
      return (
        e &&
          "string" == typeof e &&
          t &&
          "function" == typeof t &&
          (this.handlers[e] = t),
        this
      );
    }),
    (a.prototype.registerConditional = function (e, t) {
      return (
        e &&
          "string" == typeof e &&
          t &&
          "function" == typeof t &&
          (this.conditionals[e] = t),
        this
      );
    }),
    (a.prototype._formByNameOrNode = function (e) {
      return "object" == typeof e ? e : t.forms[e];
    }),
    (a.prototype._addField = function (e, t) {
      this.fields[t] = {
        name: t,
        display: e.display || t,
        rules: e.rules,
        depends: e.depends,
        id: null,
        element: null,
        type: null,
        value: null,
        checked: null,
      };
    }),
    (a.prototype._validateForm = function (e) {
      for (var t in ((this.errors = []), this.fields)) {
        var a, n;
        this.fields.hasOwnProperty(t) &&
          ((a = this.fields[t] || {}),
          (n = this.form[a.name]) &&
            n !== h &&
            ((a.id = s(n, "id")),
            (a.element = n),
            (a.type = (0 < n.length ? n[0] : n).type),
            (a.value = s(n, "value")),
            (a.checked = s(n, "checked")),
            a.depends && "function" == typeof a.depends
              ? a.depends.call(this, a) && this._validateField(a)
              : (a.depends &&
                  "string" == typeof a.depends &&
                  this.conditionals[a.depends] &&
                  !this.conditionals[a.depends].call(this, a)) ||
                this._validateField(a)));
      }
      return (
        "function" == typeof this.callback && this.callback(this.errors, e),
        0 < this.errors.length &&
          (e && e.preventDefault
            ? e.preventDefault()
            : event && (event.returnValue = !1)),
        !0
      );
    }),
    (a.prototype._validateField = function (e) {
      var t,
        a = e.rules.split("|"),
        n = e.rules.indexOf("required"),
        s = !e.value || "" === e.value || e.value === h,
        i = 0;
      for (ruleLength = a.length; i < ruleLength; i++) {
        var r = a[i],
          l = null,
          u = !1,
          o = f.exec(r);
        if (
          (-1 !== n || -1 !== r.indexOf("!callback_") || !s) &&
          (o && ((r = o[1]), (l = o[2])),
          "!" === r.charAt(0) && (r = r.substring(1, r.length)),
          "function" == typeof this._hooks[r]
            ? this._hooks[r].apply(this, [e, l]) || (u = !0)
            : "callback_" === r.substring(0, 9) &&
              ((r = r.substring(9, r.length)),
              "function" == typeof this.handlers[r] &&
                !1 === this.handlers[r].apply(this, [e.value, l, e]) &&
                (u = !0)),
          u)
        ) {
          var d,
            o =
              this.messages[e.name + "." + r] ||
              this.messages[r] ||
              c.messages[r],
            u = "An error has occurred with the " + e.display + " field.";
          for (
            o &&
              ((u = o.replace("%s", e.display)),
              l &&
                (u = u.replace(
                  "%s",
                  this.fields[l] ? this.fields[l].display : l
                ))),
              t = 0;
            t < this.errors.length;
            t += 1
          )
            e.id === this.errors[t].id && (d = this.errors[t]);
          r = d || {
            id: e.id,
            display: e.display,
            element: e.element,
            name: e.name,
            message: u,
            messages: [],
            rule: r,
          };
          r.messages.push(u), d || this.errors.push(r);
        }
      }
    }),
    (a.prototype._getValidDate = function (e) {
      if (!e.match("today") && !e.match(b)) return !1;
      var t = new Date();
      return (
        e.match("today") ||
          ((e = e.split("-")),
          t.setFullYear(e[0]),
          t.setMonth(e[1] - 1),
          t.setDate(e[2])),
        t
      );
    }),
    (a.prototype._hooks = {
      required: function (e) {
        var t = e.value;
        return "checkbox" === e.type || "radio" === e.type
          ? !0 === e.checked
          : null !== t && "" !== t;
      },
      default: function (e, t) {
        return e.value !== t;
      },
      matches: function (e, t) {
        t = this.form[t];
        return !!t && e.value === t.value;
      },
      valid_email: function (e) {
        return l.test(e.value);
      },
      valid_emails: function (e) {
        for (var t = e.value.split(/\s*,\s*/g), a = 0, n = t.length; a < n; a++)
          if (!l.test(t[a])) return !1;
        return !0;
      },
      min_length: function (e, t) {
        return !!n.test(t) && e.value.length >= parseInt(t, 10);
      },
      max_length: function (e, t) {
        return !!n.test(t) && e.value.length <= parseInt(t, 10);
      },
      exact_length: function (e, t) {
        return !!n.test(t) && e.value.length === parseInt(t, 10);
      },
      greater_than: function (e, t) {
        return !!r.test(e.value) && parseFloat(e.value) > parseFloat(t);
      },
      less_than: function (e, t) {
        return !!r.test(e.value) && parseFloat(e.value) < parseFloat(t);
      },
      alpha: function (e) {
        return u.test(e.value);
      },
      alpha_numeric: function (e) {
        return o.test(e.value);
      },
      alpha_dash: function (e) {
        return d.test(e.value);
      },
      numeric: function (e) {
        return n.test(e.value);
      },
      integer: function (e) {
        return i.test(e.value);
      },
      decimal: function (e) {
        return r.test(e.value);
      },
      is_natural: function (e) {
        return m.test(e.value);
      },
      is_natural_no_zero: function (e) {
        return p.test(e.value);
      },
      valid_ip: function (e) {
        return _.test(e.value);
      },
      valid_base64: function (e) {
        return v.test(e.value);
      },
      valid_url: function (e) {
        return y.test(e.value);
      },
      valid_credit_card: function (e) {
        if (!g.test(e.value)) return !1;
        for (
          var t = 0,
            a = 0,
            n = !1,
            s = e.value.replace(/\D/g, ""),
            i = s.length - 1;
          0 <= i;
          i--
        ) {
          var r = s.charAt(i),
            a = parseInt(r, 10);
          n && 9 < (a *= 2) && (a -= 9), (t += a), (n = !n);
        }
        return t % 10 == 0;
      },
      is_file_type: function (e, t) {
        if ("file" !== e.type) return !0;
        for (
          var a = e.value.substr(e.value.lastIndexOf(".") + 1),
            n = t.split(","),
            s = !1,
            i = 0,
            r = n.length;
          i < r;
          i++
        )
          a.toUpperCase() == n[i].toUpperCase() && (s = !0);
        return s;
      },
      greater_than_date: function (e, t) {
        (e = this._getValidDate(e.value)), (t = this._getValidDate(t));
        return !(!t || !e) && t < e;
      },
      less_than_date: function (e, t) {
        (e = this._getValidDate(e.value)), (t = this._getValidDate(t));
        return !(!t || !e) && e < t;
      },
      greater_than_or_equal_date: function (e, t) {
        (e = this._getValidDate(e.value)), (t = this._getValidDate(t));
        return !(!t || !e) && t <= e;
      },
      less_than_or_equal_date: function (e, t) {
        (e = this._getValidDate(e.value)), (t = this._getValidDate(t));
        return !(!t || !e) && e <= t;
      },
    }),
    (e.FormValidator = a);
})(window, document),
  "undefined" != typeof module &&
    module.exports &&
    (module.exports = FormValidator);
