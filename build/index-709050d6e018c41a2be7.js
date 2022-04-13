(() => {
  'use strict';
  var e = {
      d: (t, r) => {
        for (var n in r)
          e.o(r, n) && !e.o(t, n) && Object.defineProperty(t, n, { enumerable: !0, get: r[n] });
      },
      o: (e, t) => Object.prototype.hasOwnProperty.call(e, t),
      r: (e) => {
        'undefined' != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
          Object.defineProperty(e, '__esModule', { value: !0 });
      },
      p: '/',
    },
    t = {};
  e.r(t), e.d(t, { Debounce: () => x, zip: () => D });
  var r = {};
  e.r(r),
    e.d(r, {
      Component: () => G,
      Fragment: () => u,
      Ref: () => K,
      VirtualElement: () => a,
      createElement: () => k,
      render: () => E,
      util: () => t,
    }),
    Symbol('component'),
    Symbol('virtualElement');
  var n = Symbol('handlers');
  function o(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
    return n;
  }
  function i(e, t) {
    for (var r = 0; r < t.length; r++) {
      var n = t[r];
      (n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        'value' in n && (n.writable = !0),
        Object.defineProperty(e, n.key, n);
    }
  }
  var a = (function () {
    function e(t, r, n, i, a) {
      var c,
        l = this;
      !(function (e, t) {
        if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
      })(this, e),
        (this.type = t),
        (this.props = r),
        (this.key = i),
        (this.children =
          (function (e) {
            if (Array.isArray(e)) return o(e);
          })((c = n)) ||
          (function (e) {
            if (
              ('undefined' != typeof Symbol && null != e[Symbol.iterator]) ||
              null != e['@@iterator']
            )
              return Array.from(e);
          })(c) ||
          (function (e, t) {
            if (e) {
              if ('string' == typeof e) return o(e, t);
              var r = Object.prototype.toString.call(e).slice(8, -1);
              return (
                'Object' === r && e.constructor && (r = e.constructor.name),
                'Map' === r || 'Set' === r
                  ? Array.from(e)
                  : 'Arguments' === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                  ? o(e, t)
                  : void 0
              );
            }
          })(c) ||
          (function () {
            throw new TypeError(
              'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
            );
          })()),
        (this.component = null),
        (this.parent = null),
        (this.pos = null),
        (this.ref = a),
        (this.domNode = null),
        this.children.forEach(function (t, r) {
          t instanceof e && ((t.parent = l), (t.pos = r));
        });
    }
    var t, r;
    return (
      (t = e),
      (r = [
        {
          key: 'destruct',
          value: function () {
            var e,
              t = this,
              r = null === (e = this.domNode) || void 0 === e ? void 0 : e[n];
            null == r ||
              r.forEach(function (e) {
                var r,
                  n = e.eventName,
                  o = e.handler,
                  i = e.useCapture;
                null === (r = t.domNode) || void 0 === r || r.removeEventListener(n, o, i);
              });
          },
        },
      ]) && i(t.prototype, r),
      Object.defineProperty(t, 'prototype', { writable: !1 }),
      e
    );
  })();
  function c(e, t) {
    for (var r = 0; r < t.length; r++) {
      var n = t[r];
      (n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        'value' in n && (n.writable = !0),
        Object.defineProperty(e, n.key, n);
    }
  }
  function l(e, t, r) {
    return (
      t && c(e.prototype, t),
      r && c(e, r),
      Object.defineProperty(e, 'prototype', { writable: !1 }),
      e
    );
  }
  var u = l(function e() {
    !(function (e, t) {
      if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
    })(this, e);
  });
  function s(e, t) {
    for (var r = 0; r < t.length; r++) {
      var n = t[r];
      (n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        'value' in n && (n.writable = !0),
        Object.defineProperty(e, n.key, n);
    }
  }
  var f = (function () {
    function e(t, r) {
      !(function (e, t) {
        if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
      })(this, e),
        (this.data = t),
        (this.domNode = null != r ? r : null);
    }
    var t, r;
    return (
      (t = e),
      (r = [
        {
          key: 'toString',
          value: function () {
            return this.data;
          },
        },
      ]) && s(t.prototype, r),
      Object.defineProperty(t, 'prototype', { writable: !1 }),
      e
    );
  })();
  function p(e, t) {
    var r = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var n = Object.getOwnPropertySymbols(e);
      t &&
        (n = n.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })),
        r.push.apply(r, n);
    }
    return r;
  }
  function y(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = null != arguments[t] ? arguments[t] : {};
      t % 2
        ? p(Object(r), !0).forEach(function (t) {
            d(e, t, r[t]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : p(Object(r)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
          });
    }
    return e;
  }
  function d(e, t, r) {
    return (
      t in e
        ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 })
        : (e[t] = r),
      e
    );
  }
  function b(e, t) {
    return (
      (function (e) {
        if (Array.isArray(e)) return e;
      })(e) ||
      (function (e, t) {
        var r =
          null == e
            ? null
            : ('undefined' != typeof Symbol && e[Symbol.iterator]) || e['@@iterator'];
        if (null != r) {
          var n,
            o,
            i = [],
            a = !0,
            c = !1;
          try {
            for (
              r = r.call(e);
              !(a = (n = r.next()).done) && (i.push(n.value), !t || i.length !== t);
              a = !0
            );
          } catch (e) {
            (c = !0), (o = e);
          } finally {
            try {
              a || null == r.return || r.return();
            } finally {
              if (c) throw o;
            }
          }
          return i;
        }
      })(e, t) ||
      (function (e, t) {
        if (e) {
          if ('string' == typeof e) return m(e, t);
          var r = Object.prototype.toString.call(e).slice(8, -1);
          return (
            'Object' === r && e.constructor && (r = e.constructor.name),
            'Map' === r || 'Set' === r
              ? Array.from(e)
              : 'Arguments' === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
              ? m(e, t)
              : void 0
          );
        }
      })(e, t) ||
      (function () {
        throw new TypeError(
          'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
        );
      })()
    );
  }
  function m(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
    return n;
  }
  var h = 'capture';
  function v(e) {
    return e.children.every(function (e) {
      return e instanceof a && null != e.key;
    });
  }
  function g(e) {
    var t = [],
      r = [],
      n = 0;
    for (
      e instanceof a ? (t.push(e), r.push(0)) : null == e || e.domNode.remove();
      t.length > 0;

    ) {
      var o = t[t.length - 1],
        i = r[r.length - 1],
        c = !0;
      if (n <= i)
        for (var l = o.children.length - 1; l >= 0; l -= 1) {
          var u = o.children[l];
          u instanceof a ? ((c = !1), t.push(u), r.push(i + 1)) : u.domNode.remove();
        }
      if (n > i || c) {
        var s,
          f = t.pop();
        r.pop(),
          f.component && (f.component.willUmount(), f.component.destruct()),
          f.destruct(),
          null === (s = f.domNode) || void 0 === s || s.remove();
      }
      n = i;
    }
  }
  function _(e, t, r) {
    var o = y(y({}, t), r);
    Object.keys(o).forEach(function (o) {
      !(function (e, t, r, o) {
        var i = t.toLowerCase();
        if (i.startsWith('on')) {
          var a = i.slice('on'.length),
            c = a.endsWith(h),
            l = c ? a.slice(0, a.length - h.length) : a;
          if (r !== o) {
            var u,
              s = e[n],
              f = null === (u = s.get(a)) || void 0 === u ? void 0 : u.handler;
            f && e.removeEventListener(l, f, c),
              s.delete(a),
              o &&
                (s.set(a, { eventName: l, handler: o, useCapture: c }),
                e.addEventListener(l, o, c));
          }
        } else if ('style' !== t) r !== o && (o ? e.setAttribute(t, o) : e.removeAttribute(t));
        else {
          var p = Object.entries(o)
            .filter(function (e) {
              return b(e, 1)[0];
            })
            .map(function (e) {
              var t = b(e, 2),
                r = t[0],
                n = t[1];
              return ''.concat(r, ': ').concat(n, ';');
            })
            .join(' ');
          p !== e.style.cssText && (e.style.cssText = p);
        }
      })(e, o, t[o], r[o]);
    });
  }
  function w(e) {
    var t = e.parentDomNode,
      r = e.leftSibling,
      o = e.oldVNode,
      i = e.newVNode,
      c = e.commitChangesStack,
      l = null;
    if (null != i)
      if (i instanceof a && 'function' == typeof i.type)
        if (i.type === u) {
          var s = [],
            p = r;
          o instanceof a && o.type === u ? (s = o.children) : g(o),
            s.forEach(function (e, r) {
              var n;
              p = w({
                parentDomNode: t,
                leftSibling: p,
                oldVNode: e,
                newVNode: null !== (n = i.children[r]) && void 0 !== n ? n : null,
                commitChangesStack: c,
              });
            }),
            i.children.slice(s.length).forEach(function (e) {
              p = w({
                parentDomNode: t,
                leftSibling: p,
                oldVNode: null,
                newVNode: e,
                commitChangesStack: c,
              });
            }),
            (l = p);
        } else {
          var d,
            b = o,
            m = !1;
          if (o instanceof a && null != o.component)
            if (((d = o.component), Object.getPrototypeOf(d).constructor === i.type)) {
              m = !0;
              var h = d.props;
              d.setProps(
                y(
                  y({}, i.props),
                  {},
                  { parentDomNode: t, leftSibling: r, vNode: i, children: i.children },
                ),
              );
              var O = d.makeSnapshot(h, d.state);
              c.push(function () {
                return d.didUpdate(O);
              });
            } else g(o), (b = null);
          m ||
            ((d = new i.type(
              y(
                y({}, i.props),
                {},
                { parentDomNode: t, leftSibling: r, vNode: i, children: i.children },
              ),
            )),
            c.push(function () {
              return d.didMount();
            })),
            (d.children = i.children);
          var E = d.renderAndCopy(),
            P = new a(u, {}, [E]);
          (P.component = d),
            (P.parent = i.parent),
            (P.pos = i.pos),
            (d.props.vNode = P),
            null != P.parent && null !== P.pos && (P.parent.children[P.pos] = P),
            (l = w({
              parentDomNode: t,
              leftSibling: r,
              newVNode: P,
              oldVNode: b,
              commitChangesStack: c,
            }));
        }
      else if (null == o) {
        var j,
          k = t;
        if (
          (i instanceof f
            ? ((j = document.createTextNode(i.data)), (i.domNode = j))
            : ((j = document.createElement(i.type)),
              (i.domNode = j),
              (j[n] = new Map()),
              null != i.ref && (i.ref.instance = i.domNode),
              _(i.domNode, {}, i.props),
              (k = j)),
          (function (e, t, r) {
            null == r
              ? e.prepend(t)
              : null == r.nextSibling
              ? e.append(t)
              : e.insertBefore(t, r.nextSibling);
          })(t, j, r),
          (l = j),
          i instanceof a)
        ) {
          var S = null;
          i.children.forEach(function (e) {
            S = w({
              parentDomNode: k,
              leftSibling: S,
              newVNode: e,
              oldVNode: null,
              commitChangesStack: c,
            });
          });
        }
      } else if (i instanceof f)
        o instanceof f && o.data === i.data
          ? ((i.domNode = o.domNode), (l = i.domNode))
          : (g(o),
            (l = w({
              parentDomNode: t,
              leftSibling: r,
              oldVNode: null,
              newVNode: i,
              commitChangesStack: c,
            })),
            (i.domNode = l));
      else if (o instanceof f || o.type !== i.type)
        g(o),
          (l = w({
            parentDomNode: t,
            leftSibling: r,
            oldVNode: null,
            newVNode: i,
            commitChangesStack: c,
          }));
      else {
        (l = o.domNode),
          (i.domNode = l),
          null != i.ref && (i.ref.instance = l),
          _(l, o.props, i.props);
        var R = null;
        if (v(o) && v(i)) {
          var T = 0;
          i.children.forEach(function (e) {
            var t,
              r = null !== (t = o.children[T]) && void 0 !== t ? t : null;
            r instanceof a && e instanceof a && e.key === r.key
              ? ((R = w({
                  parentDomNode: i.domNode,
                  leftSibling: R,
                  oldVNode: r,
                  newVNode: e,
                  commitChangesStack: c,
                })),
                (T += 1))
              : (R = w({
                  parentDomNode: i.domNode,
                  leftSibling: R,
                  oldVNode: null,
                  newVNode: e,
                  commitChangesStack: c,
                }));
          }),
            o.children.slice(T).forEach(function (e) {
              w({
                parentDomNode: i.domNode,
                leftSibling: R,
                oldVNode: e,
                newVNode: null,
                commitChangesStack: c,
              });
            });
        } else
          o.children.forEach(function (e, t) {
            var r;
            R = w({
              parentDomNode: i.domNode,
              leftSibling: R,
              oldVNode: e,
              newVNode: null !== (r = i.children[t]) && void 0 !== r ? r : null,
              commitChangesStack: c,
            });
          }),
            i.children.slice(o.children.length).forEach(function (e) {
              R = w({
                parentDomNode: i.domNode,
                leftSibling: R,
                oldVNode: null,
                newVNode: e,
                commitChangesStack: c,
              });
            });
      }
    else {
      if (null == o) throw Error('Can not patch Virtual Dom: new node and old node are both null');
      g(o);
    }
    return l;
  }
  function O(e) {
    var t = [];
    for (w(y(y({}, e), {}, { commitChangesStack: t })); t.length > 0; ) t.pop()();
  }
  function E(e, t) {
    (t.innerHTML = ''), O({ newVNode: e, oldVNode: null, parentDomNode: t, leftSibling: null });
  }
  var P = ['key', 'ref'];
  function j(e, t) {
    if (null == e) return {};
    var r,
      n,
      o = (function (e, t) {
        if (null == e) return {};
        var r,
          n,
          o = {},
          i = Object.keys(e);
        for (n = 0; n < i.length; n++) (r = i[n]), t.indexOf(r) >= 0 || (o[r] = e[r]);
        return o;
      })(e, t);
    if (Object.getOwnPropertySymbols) {
      var i = Object.getOwnPropertySymbols(e);
      for (n = 0; n < i.length; n++)
        (r = i[n]),
          t.indexOf(r) >= 0 || (Object.prototype.propertyIsEnumerable.call(e, r) && (o[r] = e[r]));
    }
    return o;
  }
  function k(e) {
    for (
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
        r = null != t ? t : {},
        n = r.key,
        o = r.ref,
        i = j(r, P),
        c = arguments.length,
        l = new Array(c > 2 ? c - 2 : 0),
        u = 2;
      u < c;
      u++
    )
      l[u - 2] = arguments[u];
    var s = l.flat().map(function (e) {
      return e instanceof a ? e : new f(e.toString());
    });
    return new a(e, i, s, n, o);
  }
  function S(e, t) {
    var r = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var n = Object.getOwnPropertySymbols(e);
      t &&
        (n = n.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })),
        r.push.apply(r, n);
    }
    return r;
  }
  function R(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = null != arguments[t] ? arguments[t] : {};
      t % 2
        ? S(Object(r), !0).forEach(function (t) {
            T(e, t, r[t]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : S(Object(r)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
          });
    }
    return e;
  }
  function T(e, t, r) {
    return (
      t in e
        ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 })
        : (e[t] = r),
      e
    );
  }
  function x(e) {
    var t = null;
    return function (r, n, o) {
      var i = o.value;
      return (
        (o.value = function () {
          for (var r = this, n = arguments.length, o = new Array(n), a = 0; a < n; a++)
            o[a] = arguments[a];
          null != t && clearTimeout(t),
            (t = setTimeout(function () {
              i.apply(r, o);
            }, e));
        }),
        o
      );
    };
  }
  var A,
    C,
    N,
    D = function () {
      for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++) t[r] = arguments[r];
      if (t.length <= 0) throw new Error('Nothing to merge');
      return t.reduce(function (e, t) {
        return R(R({}, t), e);
      }, {});
    };
  function I(e) {
    return new a(
      e.type,
      e.props,
      e.children.map(function (e) {
        return e instanceof f ? new f(e.data) : I(e);
      }),
      e.key,
      e.ref,
    );
  }
  function B(e, t) {
    var r = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var n = Object.getOwnPropertySymbols(e);
      t &&
        (n = n.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })),
        r.push.apply(r, n);
    }
    return r;
  }
  function L(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = null != arguments[t] ? arguments[t] : {};
      t % 2
        ? B(Object(r), !0).forEach(function (t) {
            U(e, t, r[t]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : B(Object(r)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
          });
    }
    return e;
  }
  function U(e, t, r) {
    return (
      t in e
        ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 })
        : (e[t] = r),
      e
    );
  }
  function M(e, t) {
    for (var r = 0; r < t.length; r++) {
      var n = t[r];
      (n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        'value' in n && (n.writable = !0),
        Object.defineProperty(e, n.key, n);
    }
  }
  function V(e, t) {
    return (function (e, t) {
      return t.get ? t.get.call(e) : t.value;
    })(e, z(e, t, 'get'));
  }
  function z(e, t, r) {
    if (!t.has(e)) throw new TypeError('attempted to ' + r + ' private field on non-instance');
    return t.get(e);
  }
  var F,
    W,
    H,
    q,
    $,
    Z,
    G =
      ((A = x(10)),
      (N = new WeakMap()),
      (C = (function () {
        function e(t) {
          !(function (e, t) {
            if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
          })(this, e),
            (function (e, t, r) {
              !(function (e, t) {
                if (t.has(e))
                  throw new TypeError(
                    'Cannot initialize the same private elements twice on an object',
                  );
              })(e, t),
                t.set(e, r);
            })(this, N, { writable: !0, value: void 0 }),
            (this.node = null),
            (this.children = []),
            this.setProps(t),
            (function (e, t, r) {
              (function (e, t, r) {
                if (t.set) t.set.call(e, r);
                else {
                  if (!t.writable) throw new TypeError('attempted to set read only private field');
                  t.value = r;
                }
              })(e, z(e, t, 'set'), r);
            })(this, N, []);
        }
        var t, r;
        return (
          (t = e),
          (r = [
            {
              key: 'destruct',
              value: function () {
                V(this, N).forEach(function (e) {
                  return e();
                }),
                  (V(this, N).length = 0);
              },
            },
            {
              key: 'setProps',
              value: function (e) {
                var t = e.ref;
                t && (t.instance = this);
                var r = Object.getPrototypeOf(this).constructor.contextType,
                  n = e.vNode;
                if (null != r) {
                  for (; n; ) {
                    if (
                      null != n.component &&
                      Object.getPrototypeOf(n.component).constructor === r.Provider
                    ) {
                      this.context = n.component.props.value;
                      break;
                    }
                    n = n.parent;
                  }
                  null == n && (this.context = r.defaultValue);
                }
                this.props = e;
              },
            },
            {
              key: 'renderAndCopy',
              value: function () {
                return I(this.render());
              },
            },
            { key: 'didMount', value: function () {} },
            { key: 'didUpdate', value: function (e) {} },
            { key: 'willUmount', value: function () {} },
            {
              key: 'makeSnapshot',
              value: function (e, t) {
                return null;
              },
            },
            {
              key: 'setState',
              value: function (e) {
                var t = this.state;
                (this.state = L(L({}, this.state), e)), this.enqueueUpdate(this.props, t);
              },
            },
            {
              key: 'enqueueUpdate',
              value: function (e, t) {
                var r = this.props,
                  n = this.state;
                null != e && (r = e), null != t && (n = t);
                var o = this.makeSnapshot(r, n),
                  i = this.renderAndCopy(),
                  a = this.props.vNode.children[0],
                  c = this.props,
                  l = c.parentDomNode,
                  u = c.leftSibling;
                (i.parent = this.props.vNode),
                  (i.pos = 0),
                  (this.props.vNode.children[0] = i),
                  O({ parentDomNode: l, leftSibling: u, newVNode: i, oldVNode: a }),
                  this.didUpdate(o);
              },
            },
          ]) && M(t.prototype, r),
          Object.defineProperty(t, 'prototype', { writable: !1 }),
          e
        );
      })()),
      (F = C.prototype),
      (W = 'enqueueUpdate'),
      (H = [A]),
      (q = Object.getOwnPropertyDescriptor(C.prototype, 'enqueueUpdate')),
      ($ = C.prototype),
      (Z = {}),
      Object.keys(q).forEach(function (e) {
        Z[e] = q[e];
      }),
      (Z.enumerable = !!Z.enumerable),
      (Z.configurable = !!Z.configurable),
      ('value' in Z || Z.initializer) && (Z.writable = !0),
      (Z = H.slice()
        .reverse()
        .reduce(function (e, t) {
          return t(F, W, e) || e;
        }, Z)),
      $ &&
        void 0 !== Z.initializer &&
        ((Z.value = Z.initializer ? Z.initializer.call($) : void 0), (Z.initializer = void 0)),
      void 0 === Z.initializer && (Object.defineProperty(F, W, Z), (Z = null)),
      C);
  function J(e, t) {
    for (var r = 0; r < t.length; r++) {
      var n = t[r];
      (n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        'value' in n && (n.writable = !0),
        Object.defineProperty(e, n.key, n);
    }
  }
  function Y(e, t, r) {
    return (
      t && J(e.prototype, t),
      r && J(e, r),
      Object.defineProperty(e, 'prototype', { writable: !1 }),
      e
    );
  }
  var K = Y(function e() {
    !(function (e, t) {
      if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
    })(this, e);
  });
  const X = r;
  function Q(e) {
    return (
      (Q =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                'function' == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? 'symbol'
                : typeof e;
            }),
      Q(e)
    );
  }
  function ee(e, t) {
    if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
  }
  function te(e, t) {
    return (
      (te =
        Object.setPrototypeOf ||
        function (e, t) {
          return (e.__proto__ = t), e;
        }),
      te(e, t)
    );
  }
  function re(e, t) {
    if (t && ('object' === Q(t) || 'function' == typeof t)) return t;
    if (void 0 !== t)
      throw new TypeError('Derived constructors may only return object or undefined');
    return ne(e);
  }
  function ne(e) {
    if (void 0 === e)
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e;
  }
  function oe(e) {
    return (
      (oe = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (e) {
            return e.__proto__ || Object.getPrototypeOf(e);
          }),
      oe(e)
    );
  }
  function ie(e, t, r) {
    return (
      t in e
        ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 })
        : (e[t] = r),
      e
    );
  }
  var ae = (function (e) {
    !(function (e, t) {
      if ('function' != typeof t && null !== t)
        throw new TypeError('Super expression must either be null or a function');
      (e.prototype = Object.create(t && t.prototype, {
        constructor: { value: e, writable: !0, configurable: !0 },
      })),
        Object.defineProperty(e, 'prototype', { writable: !1 }),
        t && te(e, t);
    })(i, e);
    var t,
      r,
      n,
      o =
        ((r = i),
        (n = (function () {
          if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ('function' == typeof Proxy) return !0;
          try {
            return (
              Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0
            );
          } catch (e) {
            return !1;
          }
        })()),
        function () {
          var e,
            t = oe(r);
          if (n) {
            var o = oe(this).constructor;
            e = Reflect.construct(t, arguments, o);
          } else e = t.apply(this, arguments);
          return re(this, e);
        });
    function i() {
      var e;
      ee(this, i);
      for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++) r[n] = arguments[n];
      return (
        ie(ne((e = o.call.apply(o, [this].concat(r)))), 'render', function () {
          return X.createElement(
            'li',
            { class: 'track-block' },
            X.createElement(
              'p',
              { class: 'text track-block__number' },
              e.props.order.toString().padStart(2, '0'),
            ),
            X.createElement('img', { class: 'track-block__icon', src: e.props.cover }),
            X.createElement(
              'div',
              { class: 'track-block__track-info' },
              X.createElement('p', { class: 'text track-info__title ' }, e.props.title),
              X.createElement('p', { class: 'text track-info__artist' }, e.props.artist),
            ),
          );
        }),
        e
      );
    }
    return (t = i), Object.defineProperty(t, 'prototype', { writable: !1 }), t;
  })(X.Component);
  function ce(e, t, r) {
    return (
      t in e
        ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 })
        : (e[t] = r),
      e
    );
  }
  function le(e, t) {
    for (var r = 0; r < t.length; r++) {
      var n = t[r];
      (n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        'value' in n && (n.writable = !0),
        Object.defineProperty(e, n.key, n);
    }
  }
  var ue = 'X-CSRF-TOKEN',
    se = 'http://localhost/',
    fe = (function () {
      function e() {
        !(function (e, t) {
          if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
        })(this, e);
      }
      var t, r;
      return (
        (t = e),
        (r = [
          {
            key: 'fullUrl',
            value: function (e) {
              return ''.concat('http://localhost:8080', '/').concat(e);
            },
          },
          {
            key: 'get',
            value: function (e) {
              var t = null;
              return fetch(this.fullUrl(e), {
                method: 'GET',
                headers: ce({}, ue, localStorage.getItem('csrf')),
              })
                .then(function (e) {
                  return (
                    e.headers.has(ue) && localStorage.setItem('csrf', e.headers.get(ue)),
                    (t = e.status),
                    e.json()
                  );
                })
                .then(function (e) {
                  return { status: t, body: e };
                });
            },
          },
          {
            key: 'post',
            value: function (e, t) {
              var r,
                n = null;
              return (
                console.log(JSON.stringify(t)),
                fetch(this.fullUrl(e), {
                  method: 'POST',
                  body: JSON.stringify(t),
                  headers:
                    ((r = {}),
                    ce(r, ue, localStorage.getItem('csrf')),
                    ce(r, 'Content-Type', 'application/json'),
                    r),
                })
                  .then(function (e) {
                    return (
                      (n = e.status),
                      e.json().catch(function () {
                        return null;
                      })
                    );
                  })
                  .then(function (e) {
                    return { status: n, body: e };
                  })
              );
            },
          },
          {
            key: 'put',
            value: function (e, t) {
              var r = null;
              return fetch(this.fullUrl(e), {
                method: 'PUT',
                body: t,
                headers: ce({}, ue, localStorage.getItem('csrf')),
              })
                .then(function (e) {
                  return (
                    (r = e.status),
                    e.json().catch(function () {
                      return null;
                    })
                  );
                })
                .then(function (e) {
                  return { status: r, body: e };
                });
            },
          },
        ]),
        null && le(t.prototype, null),
        r && le(t, r),
        Object.defineProperty(t, 'prototype', { writable: !1 }),
        e
      );
    })();
  function pe(e) {
    return (
      (pe =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                'function' == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? 'symbol'
                : typeof e;
            }),
      pe(e)
    );
  }
  function ye(e, t) {
    if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
  }
  function de(e, t) {
    return (
      (de =
        Object.setPrototypeOf ||
        function (e, t) {
          return (e.__proto__ = t), e;
        }),
      de(e, t)
    );
  }
  function be(e, t) {
    if (t && ('object' === pe(t) || 'function' == typeof t)) return t;
    if (void 0 !== t)
      throw new TypeError('Derived constructors may only return object or undefined');
    return me(e);
  }
  function me(e) {
    if (void 0 === e)
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e;
  }
  function he(e) {
    return (
      (he = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (e) {
            return e.__proto__ || Object.getPrototypeOf(e);
          }),
      he(e)
    );
  }
  function ve(e, t, r) {
    return (
      t in e
        ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 })
        : (e[t] = r),
      e
    );
  }
  var ge = (function (e) {
    !(function (e, t) {
      if ('function' != typeof t && null !== t)
        throw new TypeError('Super expression must either be null or a function');
      (e.prototype = Object.create(t && t.prototype, {
        constructor: { value: e, writable: !0, configurable: !0 },
      })),
        Object.defineProperty(e, 'prototype', { writable: !1 }),
        t && de(e, t);
    })(i, e);
    var t,
      r,
      n,
      o =
        ((r = i),
        (n = (function () {
          if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ('function' == typeof Proxy) return !0;
          try {
            return (
              Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0
            );
          } catch (e) {
            return !1;
          }
        })()),
        function () {
          var e,
            t = he(r);
          if (n) {
            var o = he(this).constructor;
            e = Reflect.construct(t, arguments, o);
          } else e = t.apply(this, arguments);
          return be(this, e);
        });
    function i() {
      var e;
      ye(this, i);
      for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++) r[n] = arguments[n];
      return (
        ve(me((e = o.call.apply(o, [this].concat(r)))), 'render', function () {
          var t = 1;
          return X.createElement(
            'ul',
            { class: 'sidebar__my-playlist' },
            e.props.playlist
              ? e.props.playlist.map(function (e) {
                  return X.createElement(ae, {
                    order: t++,
                    title: e.title,
                    cover: se + e.cover,
                    artist: e.artist,
                  });
                })
              : '',
          );
        }),
        e
      );
    }
    return (t = i), Object.defineProperty(t, 'prototype', { writable: !1 }), t;
  })(X.Component);
  const _e = e.p + 'images/logo_img-bf6fde7.png';
  function we(e) {
    return (
      (we =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                'function' == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? 'symbol'
                : typeof e;
            }),
      we(e)
    );
  }
  function Oe(e, t) {
    if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
  }
  function Ee(e, t) {
    return (
      (Ee =
        Object.setPrototypeOf ||
        function (e, t) {
          return (e.__proto__ = t), e;
        }),
      Ee(e, t)
    );
  }
  function Pe(e, t) {
    if (t && ('object' === we(t) || 'function' == typeof t)) return t;
    if (void 0 !== t)
      throw new TypeError('Derived constructors may only return object or undefined');
    return je(e);
  }
  function je(e) {
    if (void 0 === e)
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e;
  }
  function ke(e) {
    return (
      (ke = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (e) {
            return e.__proto__ || Object.getPrototypeOf(e);
          }),
      ke(e)
    );
  }
  function Se(e, t, r) {
    return (
      t in e
        ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 })
        : (e[t] = r),
      e
    );
  }
  var Re = (function (e) {
    !(function (e, t) {
      if ('function' != typeof t && null !== t)
        throw new TypeError('Super expression must either be null or a function');
      (e.prototype = Object.create(t && t.prototype, {
        constructor: { value: e, writable: !0, configurable: !0 },
      })),
        Object.defineProperty(e, 'prototype', { writable: !1 }),
        t && Ee(e, t);
    })(i, e);
    var t,
      r,
      n,
      o =
        ((r = i),
        (n = (function () {
          if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ('function' == typeof Proxy) return !0;
          try {
            return (
              Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0
            );
          } catch (e) {
            return !1;
          }
        })()),
        function () {
          var e,
            t = ke(r);
          if (n) {
            var o = ke(this).constructor;
            e = Reflect.construct(t, arguments, o);
          } else e = t.apply(this, arguments);
          return Pe(this, e);
        });
    function i() {
      var e;
      Oe(this, i);
      for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++) r[n] = arguments[n];
      return (
        Se(je((e = o.call.apply(o, [this].concat(r)))), 'render', function () {
          return X.createElement(
            'div',
            { class: 'nav-block' },
            X.createElement(
              'div',
              { class: 'nav-block__icon__wrapper' },
              X.createElement('div', { class: 'fa-brands fa-itunes-note icon__wrapper__icon-fa' }),
              X.createElement('div', { class: 'icon__wrapper__icon-default' }),
            ),
            X.createElement('p', { class: 'text nav-block__navigation-text' }, e.props.title),
          );
        }),
        e
      );
    }
    return (t = i), Object.defineProperty(t, 'prototype', { writable: !1 }), t;
  })(X.Component);
  function Te(e) {
    return (
      (Te =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                'function' == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? 'symbol'
                : typeof e;
            }),
      Te(e)
    );
  }
  function xe(e, t) {
    if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
  }
  function Ae(e, t) {
    return (
      (Ae =
        Object.setPrototypeOf ||
        function (e, t) {
          return (e.__proto__ = t), e;
        }),
      Ae(e, t)
    );
  }
  function Ce(e, t) {
    if (t && ('object' === Te(t) || 'function' == typeof t)) return t;
    if (void 0 !== t)
      throw new TypeError('Derived constructors may only return object or undefined');
    return Ne(e);
  }
  function Ne(e) {
    if (void 0 === e)
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e;
  }
  function De(e) {
    return (
      (De = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (e) {
            return e.__proto__ || Object.getPrototypeOf(e);
          }),
      De(e)
    );
  }
  function Ie(e, t, r) {
    return (
      t in e
        ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 })
        : (e[t] = r),
      e
    );
  }
  var Be = function (e) {
    var t = (function (e) {
      !(function (e, t) {
        if ('function' != typeof t && null !== t)
          throw new TypeError('Super expression must either be null or a function');
        (e.prototype = Object.create(t && t.prototype, {
          constructor: { value: e, writable: !0, configurable: !0 },
        })),
          Object.defineProperty(e, 'prototype', { writable: !1 }),
          t && Ae(e, t);
      })(i, e);
      var t,
        r,
        n,
        o =
          ((r = i),
          (n = (function () {
            if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ('function' == typeof Proxy) return !0;
            try {
              return (
                Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0
              );
            } catch (e) {
              return !1;
            }
          })()),
          function () {
            var e,
              t = De(r);
            if (n) {
              var o = De(this).constructor;
              e = Reflect.construct(t, arguments, o);
            } else e = t.apply(this, arguments);
            return Ce(this, e);
          });
      function i() {
        var e;
        xe(this, i);
        for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++) r[n] = arguments[n];
        return (
          Ie(Ne((e = o.call.apply(o, [this].concat(r)))), 'render', function () {
            return X.createElement(X.Fragment, null, e.props.children);
          }),
          e
        );
      }
      return (t = i), Object.defineProperty(t, 'prototype', { writable: !1 }), t;
    })(X.Component);
    return { Provider: t, defaultValue: e };
  };
  const Le = Be(null);
  function Ue(e) {
    return (
      (Ue =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                'function' == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? 'symbol'
                : typeof e;
            }),
      Ue(e)
    );
  }
  var Me = ['as'];
  function Ve() {
    return (
      (Ve =
        Object.assign ||
        function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
          }
          return e;
        }),
      Ve.apply(this, arguments)
    );
  }
  function ze(e, t) {
    for (var r = 0; r < t.length; r++) {
      var n = t[r];
      (n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        'value' in n && (n.writable = !0),
        Object.defineProperty(e, n.key, n);
    }
  }
  function Fe(e, t) {
    return (
      (Fe =
        Object.setPrototypeOf ||
        function (e, t) {
          return (e.__proto__ = t), e;
        }),
      Fe(e, t)
    );
  }
  function We(e, t) {
    if (t && ('object' === Ue(t) || 'function' == typeof t)) return t;
    if (void 0 !== t)
      throw new TypeError('Derived constructors may only return object or undefined');
    return He(e);
  }
  function He(e) {
    if (void 0 === e)
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e;
  }
  function qe(e) {
    return (
      (qe = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (e) {
            return e.__proto__ || Object.getPrototypeOf(e);
          }),
      qe(e)
    );
  }
  var $e,
    Ze,
    Ge,
    Je = (function (e) {
      !(function (e, t) {
        if ('function' != typeof t && null !== t)
          throw new TypeError('Super expression must either be null or a function');
        (e.prototype = Object.create(t && t.prototype, {
          constructor: { value: e, writable: !0, configurable: !0 },
        })),
          Object.defineProperty(e, 'prototype', { writable: !1 }),
          t && Fe(e, t);
      })(a, e);
      var t,
        r,
        n,
        o,
        i =
          ((n = a),
          (o = (function () {
            if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ('function' == typeof Proxy) return !0;
            try {
              return (
                Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0
              );
            } catch (e) {
              return !1;
            }
          })()),
          function () {
            var e,
              t = qe(n);
            if (o) {
              var r = qe(this).constructor;
              e = Reflect.construct(t, arguments, r);
            } else e = t.apply(this, arguments);
            return We(this, e);
          });
      function a(e) {
        var t;
        if (
          ((function (e, t) {
            if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
          })(this, a),
          ((t = i.call(this, e)).handleClick = t.handleClick.bind(He(t))),
          null == t.context)
        )
          throw Error('Router has not been found');
        return t;
      }
      return (
        (t = a),
        (r = [
          {
            key: 'handleClick',
            value: function (e) {
              e.preventDefault(), this.context.go(this.props.to);
            },
          },
          {
            key: 'render',
            value: function () {
              var e = this.props,
                t = e.as,
                r = (function (e, t) {
                  if (null == e) return {};
                  var r,
                    n,
                    o = (function (e, t) {
                      if (null == e) return {};
                      var r,
                        n,
                        o = {},
                        i = Object.keys(e);
                      for (n = 0; n < i.length; n++) (r = i[n]), t.indexOf(r) >= 0 || (o[r] = e[r]);
                      return o;
                    })(e, t);
                  if (Object.getOwnPropertySymbols) {
                    var i = Object.getOwnPropertySymbols(e);
                    for (n = 0; n < i.length; n++)
                      (r = i[n]),
                        t.indexOf(r) >= 0 ||
                          (Object.prototype.propertyIsEnumerable.call(e, r) && (o[r] = e[r]));
                  }
                  return o;
                })(e, Me),
                n = t;
              return (
                null == n && (n = 'a'),
                X.createElement(n, Ve({}, r, { onClick: this.handleClick }), this.props.children)
              );
            },
          },
        ]) && ze(t.prototype, r),
        Object.defineProperty(t, 'prototype', { writable: !1 }),
        a
      );
    })(X.Component);
  function Ye(e) {
    return (
      (Ye =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                'function' == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? 'symbol'
                : typeof e;
            }),
      Ye(e)
    );
  }
  function Ke(e, t) {
    if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
  }
  function Xe(e, t) {
    return (
      (Xe =
        Object.setPrototypeOf ||
        function (e, t) {
          return (e.__proto__ = t), e;
        }),
      Xe(e, t)
    );
  }
  function Qe(e, t) {
    if (t && ('object' === Ye(t) || 'function' == typeof t)) return t;
    if (void 0 !== t)
      throw new TypeError('Derived constructors may only return object or undefined');
    return et(e);
  }
  function et(e) {
    if (void 0 === e)
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e;
  }
  function tt(e) {
    return (
      (tt = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (e) {
            return e.__proto__ || Object.getPrototypeOf(e);
          }),
      tt(e)
    );
  }
  function rt(e, t, r) {
    return (
      t in e
        ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 })
        : (e[t] = r),
      e
    );
  }
  (Ge = Le),
    (Ze = 'contextType') in ($e = Je)
      ? Object.defineProperty($e, Ze, { value: Ge, enumerable: !0, configurable: !0, writable: !0 })
      : ($e[Ze] = Ge);
  var nt = (function (e) {
    !(function (e, t) {
      if ('function' != typeof t && null !== t)
        throw new TypeError('Super expression must either be null or a function');
      (e.prototype = Object.create(t && t.prototype, {
        constructor: { value: e, writable: !0, configurable: !0 },
      })),
        Object.defineProperty(e, 'prototype', { writable: !1 }),
        t && Xe(e, t);
    })(i, e);
    var t,
      r,
      n,
      o =
        ((r = i),
        (n = (function () {
          if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ('function' == typeof Proxy) return !0;
          try {
            return (
              Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0
            );
          } catch (e) {
            return !1;
          }
        })()),
        function () {
          var e,
            t = tt(r);
          if (n) {
            var o = tt(this).constructor;
            e = Reflect.construct(t, arguments, o);
          } else e = t.apply(this, arguments);
          return Qe(this, e);
        });
    function i() {
      var e;
      Ke(this, i);
      for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++) r[n] = arguments[n];
      return (
        rt(et((e = o.call.apply(o, [this].concat(r)))), 'render', function () {
          var t = e.props,
            r = t.isAuthorized,
            n = t.playlist,
            o = r
              ? X.createElement(
                  'div',
                  null,
                  X.createElement(Re, { title: 'My playlist' }),
                  X.createElement(Re, { title: 'Last listening' }),
                  X.createElement(Re, { title: 'Recommended' }),
                )
              : X.createElement(Re, { title: 'Listening in the world' });
          return X.createElement(
            'div',
            { class: 'sidebar' },
            X.createElement(
              'div',
              { class: 'sidebar__header' },
              X.createElement(
                Je,
                { to: '/' },
                X.createElement(
                  'div',
                  { class: 'header__logo' },
                  X.createElement('img', { class: 'logo__picture', src: _e, alt: 'logo.svg' }),
                ),
              ),
            ),
            o,
            X.createElement(ge, { playlist: n }),
          );
        }),
        e
      );
    }
    return (t = i), Object.defineProperty(t, 'prototype', { writable: !1 }), t;
  })(X.Component);
  const ot = e.p + 'images/player_marker-09b3d5c.png';
  function it(e, t) {
    if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
  }
  function at(e, t) {
    for (var r = 0; r < t.length; r++) {
      var n = t[r];
      (n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        'value' in n && (n.writable = !0),
        Object.defineProperty(e, n.key, n);
    }
  }
  function ct(e, t) {
    st(e, t), t.add(e);
  }
  function lt(e, t, r) {
    return (
      t in e
        ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 })
        : (e[t] = r),
      e
    );
  }
  function ut(e, t, r) {
    st(e, t), t.set(e, r);
  }
  function st(e, t) {
    if (t.has(e))
      throw new TypeError('Cannot initialize the same private elements twice on an object');
  }
  function ft(e, t, r) {
    if (!t.has(e)) throw new TypeError('attempted to get private field on non-instance');
    return r;
  }
  function pt(e, t) {
    return (function (e, t) {
      return t.get ? t.get.call(e) : t.value;
    })(e, dt(e, t, 'get'));
  }
  function yt(e, t, r) {
    return (
      (function (e, t, r) {
        if (t.set) t.set.call(e, r);
        else {
          if (!t.writable) throw new TypeError('attempted to set read only private field');
          t.value = r;
        }
      })(e, dt(e, t, 'set'), r),
      r
    );
  }
  function dt(e, t, r) {
    if (!t.has(e)) throw new TypeError('attempted to ' + r + ' private field on non-instance');
    return t.get(e);
  }
  var bt = new WeakMap(),
    mt = new WeakMap(),
    ht = new WeakMap(),
    vt = new WeakMap(),
    gt = new WeakMap(),
    _t = new WeakMap(),
    wt = new WeakSet(),
    Ot = new WeakSet(),
    Et = new WeakSet(),
    Pt = (function () {
      function e() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
          r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0.5;
        if (
          (it(this, e),
          ct(this, Et),
          ct(this, Ot),
          ct(this, wt),
          ut(this, bt, { writable: !0, value: void 0 }),
          ut(this, mt, { writable: !0, value: 0 }),
          ut(this, ht, { writable: !0, value: 0 }),
          ut(this, vt, { writable: !0, value: {} }),
          lt(this, 'isPlayRand', !1),
          ut(this, gt, { writable: !0, value: void 0 }),
          ut(this, _t, { writable: !0, value: void 0 }),
          console.log(t),
          t && 0 !== t.length)
        ) {
          yt(this, bt, t),
            (this.currentTrack = pt(this, bt)[pt(this, mt)]),
            (this.audio = new Audio(se + this.currentTrack.src)),
            (this.audio.preload = 'metadata'),
            (this.audio.volume = r),
            yt(this, gt, new AudioContext()),
            (this.analyser = pt(this, gt).createAnalyser()),
            (this.analyser.fftSize = 2048);
          var n = pt(this, gt).createMediaElementSource(this.audio);
          n.connect(this.analyser),
            this.analyser.connect(pt(this, gt).destination),
            ft(this, Et, St).call(this, this.currentTrack);
        }
      }
      var t, r;
      return (
        (t = e),
        (r = [
          {
            key: 'addTrack',
            value: function (e) {
              pt(this, bt).push(e);
            },
          },
          {
            key: 'popTrack',
            value: function () {
              pt(this, bt).pop();
            },
          },
          {
            key: 'play',
            value: function () {
              var e = this;
              pt(this, gt).resume(),
                this.audio.play().then(function () {
                  return ft(e, Ot, kt).call(e);
                });
            },
          },
          {
            key: 'stop',
            value: function () {
              this.audio.pause();
            },
          },
          {
            key: 'next',
            value: function () {
              if (!(pt(this, ht) > pt(this, bt).length - 1)) {
                if (this.isPlayRand) {
                  for (
                    var e = Math.trunc(Math.random() * pt(this, bt).length);
                    pt(this, vt).hasOwnProperty(e);

                  )
                    e = Math.trunc(Math.random() * pt(this, bt).length);
                  (pt(this, vt)[e] = pt(this, bt)[e]), yt(this, mt, e);
                } else yt(this, mt, pt(this, mt) + 1);
                yt(this, ht, pt(this, ht) + 1);
                var t = pt(this, bt)[pt(this, mt)];
                (this.audio.src = se + t.src),
                  (this.currentTrack = t),
                  ft(this, wt, jt).call(this, this.currentTrack);
              }
            },
          },
          {
            key: 'prev',
            value: function () {
              if (0 !== pt(this, mt)) {
                yt(this, mt, pt(this, mt) - 1);
                var e = pt(this, bt)[pt(this, mt)];
                (this.audio.src = se + e.src),
                  (this.currentTrack = e),
                  ft(this, wt, jt).call(this, this.currentTrack);
              }
            },
          },
        ]) && at(t.prototype, r),
        Object.defineProperty(t, 'prototype', { writable: !1 }),
        e
      );
    })();
  function jt(e) {
    'mediaSession' in navigator &&
      (navigator.mediaSession.metadata = new MediaMetadata({
        title: e.title,
        artist: e.artist,
        album: e.album,
        artwork: [{ src: e.cover }],
      }));
  }
  function kt() {
    'mediaSession' in navigator &&
      navigator.mediaSession.setPositionState({
        duration: this.audio.duration,
        playbackRate: this.audio.playbackRate,
        position: this.audio.currentTime,
      });
  }
  function St(e) {
    var t = this;
    'mediaSession' in navigator &&
      (ft(this, wt, jt).call(this, e),
      navigator.mediaSession.setActionHandler('play', function () {
        t.play();
      }),
      navigator.mediaSession.setActionHandler('pause', function () {
        t.stop();
      }),
      navigator.mediaSession.setActionHandler('previoustrack', function () {
        t.prev();
      }),
      navigator.mediaSession.setActionHandler('nexttrack', function () {
        t.next();
      }));
  }
  function Rt(e) {
    return (
      (Rt =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                'function' == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? 'symbol'
                : typeof e;
            }),
      Rt(e)
    );
  }
  function Tt(e, t) {
    for (var r = 0; r < t.length; r++) {
      var n = t[r];
      (n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        'value' in n && (n.writable = !0),
        Object.defineProperty(e, n.key, n);
    }
  }
  function xt(e, t) {
    return (
      (xt =
        Object.setPrototypeOf ||
        function (e, t) {
          return (e.__proto__ = t), e;
        }),
      xt(e, t)
    );
  }
  function At(e, t) {
    if (t && ('object' === Rt(t) || 'function' == typeof t)) return t;
    if (void 0 !== t)
      throw new TypeError('Derived constructors may only return object or undefined');
    return Ct(e);
  }
  function Ct(e) {
    if (void 0 === e)
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e;
  }
  function Nt(e) {
    return (
      (Nt = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (e) {
            return e.__proto__ || Object.getPrototypeOf(e);
          }),
      Nt(e)
    );
  }
  function Dt(e, t, r) {
    !(function (e, t) {
      if (t.has(e))
        throw new TypeError('Cannot initialize the same private elements twice on an object');
    })(e, t),
      t.set(e, r);
  }
  function It(e, t) {
    return (function (e, t) {
      return t.get ? t.get.call(e) : t.value;
    })(e, Bt(e, t, 'get'));
  }
  function Bt(e, t, r) {
    if (!t.has(e)) throw new TypeError('attempted to ' + r + ' private field on non-instance');
    return t.get(e);
  }
  var Lt = new WeakMap(),
    Ut = new WeakMap(),
    Mt = new WeakMap();
  const Vt = (function (e) {
    !(function (e, t) {
      if ('function' != typeof t && null !== t)
        throw new TypeError('Super expression must either be null or a function');
      (e.prototype = Object.create(t && t.prototype, {
        constructor: { value: e, writable: !0, configurable: !0 },
      })),
        Object.defineProperty(e, 'prototype', { writable: !1 }),
        t && xt(e, t);
    })(a, e);
    var t,
      r,
      n,
      o,
      i =
        ((n = a),
        (o = (function () {
          if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ('function' == typeof Proxy) return !0;
          try {
            return (
              Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0
            );
          } catch (e) {
            return !1;
          }
        })()),
        function () {
          var e,
            t = Nt(n);
          if (o) {
            var r = Nt(this).constructor;
            e = Reflect.construct(t, arguments, r);
          } else e = t.apply(this, arguments);
          return At(this, e);
        });
    function a(e) {
      var t;
      !(function (e, t) {
        if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
      })(this, a),
        Dt(Ct((t = i.call(this, e))), Lt, { writable: !0, value: void 0 }),
        Dt(Ct(t), Ut, {
          writable: !0,
          value: X.createElement('div', { class: 'fa-regular fa-circle-play' }),
        }),
        Dt(Ct(t), Mt, {
          writable: !0,
          value: X.createElement('div', { class: 'fa-regular fa-circle-pause' }),
        });
      var r = t.props.playlist;
      (function (e, t, r) {
        (function (e, t, r) {
          if (t.set) t.set.call(e, r);
          else {
            if (!t.writable) throw new TypeError('attempted to set read only private field');
            t.value = r;
          }
        })(e, Bt(e, t, 'set'), r);
      })(Ct(t), Lt, new Pt(r)),
        console.log(It(Ct(t), Lt));
      var n = It(Ct(t), Lt).analyser
          ? new Uint8Array(It(Ct(t), Lt).analyser.frequencyBinCount)
          : null,
        o = It(Ct(t), Lt).audio ? It(Ct(t), Lt).audio.volume : 0.5;
      return (
        (t.state = {
          playState: !1,
          trackTime: 0,
          trackFilled: 0,
          trackFetched: 0,
          trackBuffered: 0,
          trackVolume: 100 * o,
          playRand: !1,
          trackData: {
            title: It(Ct(t), Lt).currentTrack.title,
            author: It(Ct(t), Lt).currentTrack.artist,
            cover: se + It(Ct(t), Lt).currentTrack.cover,
          },
          freqArray: n,
          waveHeights: [0, 0, 0, 0],
        }),
        (t.loadTrackData = t.loadTrackData.bind(Ct(t))),
        (t.tooglePlay = t.tooglePlay.bind(Ct(t))),
        (t.checkPlay = t.checkPlay.bind(Ct(t))),
        (t.runNext = t.runNext.bind(Ct(t))),
        (t.runPrev = t.runPrev.bind(Ct(t))),
        (t.timeUpdater = t.timeUpdater.bind(Ct(t))),
        (t.updateWaveFront = t.updateWaveFront.bind(Ct(t))),
        (t.fetchedUpdater = t.fetchedUpdater.bind(Ct(t))),
        (t.setTime = t.setTime.bind(Ct(t))),
        (t.setVolume = t.setVolume.bind(Ct(t))),
        (t.toogleShuffle = t.toogleShuffle.bind(Ct(t))),
        (t.toogleMute = t.toogleMute.bind(Ct(t))),
        It(Ct(t), Lt).audio &&
          (It(Ct(t), Lt).audio.addEventListener('timeupdate', t.timeUpdater),
          It(Ct(t), Lt).audio.addEventListener('progress', t.fetchedUpdater),
          It(Ct(t), Lt).audio.addEventListener('loadedmetadata', t.fetchedUpdater),
          It(Ct(t), Lt).audio.addEventListener('durationchange', t.loadTrackData),
          It(Ct(t), Lt).audio.addEventListener('ended', t.runNext)),
        It(Ct(t), Lt).currentTrack && t.loadTrackData(),
        t
      );
    }
    return (
      (t = a),
      (r = [
        {
          key: 'loadTrackData',
          value: function () {
            this.setState({
              trackData: {
                title: It(this, Lt).currentTrack.title,
                author: It(this, Lt).currentTrack.artist,
                cover: se + It(this, Lt).currentTrack.cover,
              },
            });
          },
        },
        {
          key: 'checkPlay',
          value: function () {
            this.state.playState ? It(this, Lt).play() : It(this, Lt).stop();
          },
        },
        {
          key: 'tooglePlay',
          value: function () {
            this.setState({ playState: !this.state.playState }), this.checkPlay();
          },
        },
        {
          key: 'runNext',
          value: function () {
            this.setState({ trackFilled: 100, playState: !0 }),
              It(this, Lt).next(),
              this.checkPlay();
          },
        },
        {
          key: 'runPrev',
          value: function () {
            0 === It(this, Lt).audio.currentTime
              ? (It(this, Lt).prev(), this.checkPlay())
              : (It(this, Lt).audio.currentTime = 0);
          },
        },
        {
          key: 'timeUpdater',
          value: function (e) {
            this.fetchedUpdater(e), this.updateWaveFront();
            var t = (It(this, Lt).audio.currentTime / It(this, Lt).audio.duration) * 100;
            this.setState({ trackTime: It(this, Lt).audio.currentTime, trackFilled: t });
          },
        },
        {
          key: 'updateWaveFront',
          value: function () {
            var e = this.state.freqArray;
            if (e) {
              It(this, Lt).analyser.getByteFrequencyData(e);
              for (
                var t = [0, 0, 0, 0],
                  r = [
                    [100, 700],
                    [1e3, 3e3],
                    [4e3, 6e3],
                    [7e3, 1e4],
                  ],
                  n = 0;
                n < t.length;
                n += 1
              ) {
                var o = r[n],
                  i = Math.round(o[0] / 24),
                  a = Math.round(o[1] / 24),
                  c = 0,
                  l = 0;
                e.slice(i, a).forEach(function (e) {
                  (c += e), (l += 1);
                });
                var u = c / l;
                t[n] = (u / 256) * 100;
              }
              this.setState({ freqArray: e, waveHeights: t });
            }
          },
        },
        {
          key: 'fetchedUpdater',
          value: function () {
            var e = It(this, Lt).audio.buffered.end(It(this, Lt).audio.buffered.length - 1);
            this.setState({ trackBuffered: (e / It(this, Lt).audio.duration) * 100 });
          },
        },
        {
          key: 'setTime',
          value: function (e) {
            var t = this.getRelativePosition(e);
            It(this, Lt).audio.currentTime = t * It(this, Lt).audio.duration;
          },
        },
        {
          key: 'setVolume',
          value: function (e) {
            var t = this.getRelativePosition(e);
            this.setState({ trackVolume: 100 * t }), (It(this, Lt).audio.volume = t);
          },
        },
        {
          key: 'getRelativePosition',
          value: function (e) {
            e.preventDefault();
            var t = e.currentTarget.getBoundingClientRect(),
              r = (e.x - t.left) / (t.right - t.left);
            return r < 0 ? 0 : r;
          },
        },
        {
          key: 'toogleShuffle',
          value: function () {
            (It(this, Lt).isPlayRand = !It(this, Lt).isPlayRand),
              this.setState({ playRand: It(this, Lt).isPlayRand });
          },
        },
        {
          key: 'toogleMute',
          value: function () {
            (It(this, Lt).audio.volume = this.state.trackVolume > 0 ? 0 : 0.5),
              this.setState({ trackVolume: this.state.trackVolume > 0 ? 0 : 50 });
          },
        },
        {
          key: 'render',
          value: function () {
            var e,
              t = function (e) {
                var t = Math.trunc(e).toString();
                return e >= 10 ? t : '0'.concat(t);
              };
            switch (!0) {
              case 0 === this.state.trackVolume:
                e = 'fa-volume-xmark';
                break;
              case this.state.trackVolume < 25:
                e = 'fa-volume-off';
                break;
              case this.state.trackVolume < 60:
                e = 'fa-volume-low';
                break;
              default:
                e = 'fa-volume-high';
            }
            return X.createElement(
              'div',
              { class: 'player' },
              X.createElement(
                'div',
                { class: 'player__waves' },
                X.createElement('div', {
                  class: 'bar',
                  id: '1',
                  style: { height: ''.concat(this.state.waveHeights[0], '%') },
                }),
                X.createElement('div', {
                  class: 'bar',
                  id: '2',
                  style: { height: ''.concat(this.state.waveHeights[1], '%') },
                }),
                X.createElement('div', {
                  class: 'bar',
                  id: '3',
                  style: { height: ''.concat(this.state.waveHeights[2], '%') },
                }),
                X.createElement('div', {
                  class: 'bar',
                  id: '4',
                  style: { height: ''.concat(this.state.waveHeights[3], '%') },
                }),
              ),
              X.createElement(
                'div',
                { class: 'player__track' },
                X.createElement('img', {
                  class: 'track__picture',
                  src: this.state.trackData.cover,
                }),
                X.createElement(
                  'div',
                  { class: 'track__name' },
                  X.createElement(
                    'div',
                    { class: 'text track__name__title' },
                    this.state.trackData.title,
                  ),
                  X.createElement(
                    'div',
                    { class: 'text track__name__author' },
                    this.state.trackData.author,
                  ),
                ),
              ),
              X.createElement(
                'div',
                { class: 'player__control' },
                X.createElement(
                  'div',
                  { onclick: this.runPrev, class: 'control__prev' },
                  X.createElement('div', { class: 'fa-solid fa-backward-step' }),
                ),
                X.createElement(
                  'div',
                  { onclick: this.tooglePlay, class: 'control__play_pause' },
                  this.state.playState ? It(this, Mt) : It(this, Ut),
                ),
                X.createElement(
                  'div',
                  { onclick: this.runNext, class: 'control__next' },
                  X.createElement('div', { class: 'fa-solid fa-forward-step' }),
                ),
              ),
              X.createElement(
                'div',
                { class: 'player__progressbar' },
                X.createElement(
                  'div',
                  {
                    class: 'progressbar',
                    onclick: this.setTime,
                    ondrag: this.setTime,
                    ondragend: this.setTime,
                  },
                  X.createElement('div', {
                    class: 'progressbar__prefetched',
                    style: { width: ''.concat(this.state.trackBuffered.toString(), '%') },
                  }),
                  X.createElement(
                    'div',
                    { class: 'progressbar__state' },
                    X.createElement('div', {
                      class: 'progressbar__state__line',
                      style: { width: ''.concat(this.state.trackFilled.toString(), '%') },
                    }),
                    X.createElement('div', {
                      class: 'progressbar__state__marker',
                      style: { 'background-image': 'url("'.concat(ot, '")') },
                    }),
                  ),
                ),
                X.createElement(
                  'div',
                  { class: 'text player__progressbar__time' },
                  ' ',
                  ''.concat(t(this.state.trackTime / 60), ':').concat(t(this.state.trackTime % 60)),
                ),
              ),
              X.createElement(
                'div',
                { onclick: this.toogleShuffle, class: 'player__shuffle' },
                X.createElement('div', {
                  class: 'fa-solid fa-shuffle',
                  style: { color: this.state.playRand ? '#5D4099' : '#BEB7DF' },
                }),
              ),
              X.createElement(
                'div',
                { class: 'player__volume' },
                X.createElement('div', {
                  onclick: this.toogleMute,
                  class: 'fa-solid '.concat(e, ' volume__icon'),
                }),
                X.createElement(
                  'div',
                  {
                    class: 'volume__input',
                    onclick: this.setVolume,
                    ondrag: this.setVolume,
                    ondragend: this.setVolume,
                  },
                  X.createElement('div', {
                    class: 'volume__input__state',
                    style: { width: ''.concat(this.state.trackVolume.toString(), '%') },
                  }),
                ),
              ),
            );
          },
        },
      ]) && Tt(t.prototype, r),
      Object.defineProperty(t, 'prototype', { writable: !1 }),
      a
    );
  })(X.Component);
  function zt(e) {
    return (
      (zt =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                'function' == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? 'symbol'
                : typeof e;
            }),
      zt(e)
    );
  }
  function Ft() {
    return (
      (Ft =
        Object.assign ||
        function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
          }
          return e;
        }),
      Ft.apply(this, arguments)
    );
  }
  function Wt(e, t) {
    for (var r = 0; r < t.length; r++) {
      var n = t[r];
      (n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        'value' in n && (n.writable = !0),
        Object.defineProperty(e, n.key, n);
    }
  }
  function Ht(e, t) {
    return (
      (Ht =
        Object.setPrototypeOf ||
        function (e, t) {
          return (e.__proto__ = t), e;
        }),
      Ht(e, t)
    );
  }
  function qt(e, t) {
    if (t && ('object' === zt(t) || 'function' == typeof t)) return t;
    if (void 0 !== t)
      throw new TypeError('Derived constructors may only return object or undefined');
    return (function (e) {
      if (void 0 === e)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return e;
    })(e);
  }
  function $t(e) {
    return (
      ($t = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (e) {
            return e.__proto__ || Object.getPrototypeOf(e);
          }),
      $t(e)
    );
  }
  var Zt = Be(null);
  function Gt(e, t) {
    return function (r) {
      var n = (function (n) {
        !(function (e, t) {
          if ('function' != typeof t && null !== t)
            throw new TypeError('Super expression must either be null or a function');
          (e.prototype = Object.create(t && t.prototype, {
            constructor: { value: e, writable: !0, configurable: !0 },
          })),
            Object.defineProperty(e, 'prototype', { writable: !1 }),
            t && Ht(e, t);
        })(u, n);
        var o,
          i,
          a,
          c,
          l =
            ((a = u),
            (c = (function () {
              if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
              if (Reflect.construct.sham) return !1;
              if ('function' == typeof Proxy) return !0;
              try {
                return (
                  Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0
                );
              } catch (e) {
                return !1;
              }
            })()),
            function () {
              var e,
                t = $t(a);
              if (c) {
                var r = $t(this).constructor;
                e = Reflect.construct(t, arguments, r);
              } else e = t.apply(this, arguments);
              return qt(this, e);
            });
        function u(e) {
          var t;
          return (
            (function (e, t) {
              if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
            })(this, u),
            ((t = l.call(this, e)).state = t.context.getState()),
            t
          );
        }
        return (
          (o = u),
          (i = [
            {
              key: 'didMount',
              value: function () {
                var e = this;
                this.context.subscribe(function (t) {
                  e.setState(t);
                });
              },
            },
            {
              key: 'render',
              value: function () {
                var n,
                  o = this.context;
                return X.createElement(
                  r,
                  Ft(
                    {},
                    this.props,
                    e(o.getState()),
                    null !== (n = t(o.dispatch)) && void 0 !== n ? n : null,
                  ),
                  this.props.children,
                );
              },
            },
          ]),
          i && Wt(o.prototype, i),
          Object.defineProperty(o, 'prototype', { writable: !1 }),
          u
        );
      })(X.Component);
      return (
        (function (e, t, r) {
          t in e
            ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = r);
        })(n, 'contextType', Zt),
        n
      );
    };
  }
  function Jt(e, t) {
    for (var r = 0; r < t.length; r++) {
      var n = t[r];
      (n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        'value' in n && (n.writable = !0),
        Object.defineProperty(e, n.key, n);
    }
  }
  var Yt = (function () {
    function e() {
      !(function (e, t) {
        if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
      })(this, e);
    }
    var t, r;
    return (
      (t = e),
      (r = [
        {
          key: 'getPopular',
          value: function () {
            return fe.get('api/v1/tracks/popular').then(function (e) {
              return 200 !== e.status ? Promise.reject(e.body) : e.body.Result;
            });
          },
        },
      ]),
      null && Jt(t.prototype, null),
      r && Jt(t, r),
      Object.defineProperty(t, 'prototype', { writable: !1 }),
      e
    );
  })();
  function Kt(e) {
    Yt.getPopular().then(function (t) {
      e({ type: 'popular/track', payload: t });
    });
  }
  function Xt(e) {
    return (
      (Xt =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                'function' == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? 'symbol'
                : typeof e;
            }),
      Xt(e)
    );
  }
  function Qt(e, t) {
    for (var r = 0; r < t.length; r++) {
      var n = t[r];
      (n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        'value' in n && (n.writable = !0),
        Object.defineProperty(e, n.key, n);
    }
  }
  function er(e, t) {
    return (
      (er =
        Object.setPrototypeOf ||
        function (e, t) {
          return (e.__proto__ = t), e;
        }),
      er(e, t)
    );
  }
  function tr(e, t) {
    if (t && ('object' === Xt(t) || 'function' == typeof t)) return t;
    if (void 0 !== t)
      throw new TypeError('Derived constructors may only return object or undefined');
    return rr(e);
  }
  function rr(e) {
    if (void 0 === e)
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e;
  }
  function nr(e) {
    return (
      (nr = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (e) {
            return e.__proto__ || Object.getPrototypeOf(e);
          }),
      nr(e)
    );
  }
  var or = (function (e) {
    !(function (e, t) {
      if ('function' != typeof t && null !== t)
        throw new TypeError('Super expression must either be null or a function');
      (e.prototype = Object.create(t && t.prototype, {
        constructor: { value: e, writable: !0, configurable: !0 },
      })),
        Object.defineProperty(e, 'prototype', { writable: !1 }),
        t && er(e, t);
    })(a, e);
    var t,
      r,
      n,
      o,
      i =
        ((n = a),
        (o = (function () {
          if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ('function' == typeof Proxy) return !0;
          try {
            return (
              Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0
            );
          } catch (e) {
            return !1;
          }
        })()),
        function () {
          var e,
            t = nr(n);
          if (o) {
            var r = nr(this).constructor;
            e = Reflect.construct(t, arguments, r);
          } else e = t.apply(this, arguments);
          return tr(this, e);
        });
    function a(e) {
      var t;
      return (
        (function (e, t) {
          if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
        })(this, a),
        (function (e, t, r) {
          t in e
            ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = r);
        })(rr((t = i.call(this, e))), 'render', function () {
          var e = t.props,
            r = e.content,
            n = e.isAuthorized;
          return X.createElement(
            'div',
            { class: 'page', style: { height: ''.concat(t.state.contentHeight.toString(), 'px') } },
            X.createElement(nt, { playlist: t.props.playlist, isAuthorized: n }),
            X.createElement('div', { class: 'content' }, r),
            t.props.playlist ? X.createElement(Vt, { playlist: t.props.playlist }) : '',
          );
        }),
        t.props.getPlaylist(),
        (t.state = { contentHeight: 0 }),
        t
      );
    }
    return (
      (t = a),
      (r = [
        {
          key: 'didUpdate',
          value: function () {
            var e = this.props.content,
              t = document.getElementsByClassName('content')[0]
                ? document.getElementsByClassName('content')[0].clientHeight
                : 0;
            (this.state.contentHeight === t && e === this.state.content) ||
              this.setState({ contentHeight: t, content: e });
          },
        },
      ]) && Qt(t.prototype, r),
      Object.defineProperty(t, 'prototype', { writable: !1 }),
      a
    );
  })(X.Component);
  const ir = Gt(
      function (e) {
        return {
          playlist: e.tracksPopular ? e.tracksPopular.popular : null,
          something: e.tracksPopular,
        };
      },
      function (e) {
        return {
          getPlaylist: function () {
            e(Kt);
          },
        };
      },
    )(or),
    ar = e.p + 'images/avatar-9730d9d.jpeg';
  function cr(e) {
    return (
      (cr =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                'function' == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? 'symbol'
                : typeof e;
            }),
      cr(e)
    );
  }
  function lr(e, t) {
    return (
      (lr =
        Object.setPrototypeOf ||
        function (e, t) {
          return (e.__proto__ = t), e;
        }),
      lr(e, t)
    );
  }
  function ur(e, t) {
    if (t && ('object' === cr(t) || 'function' == typeof t)) return t;
    if (void 0 !== t)
      throw new TypeError('Derived constructors may only return object or undefined');
    return sr(e);
  }
  function sr(e) {
    if (void 0 === e)
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e;
  }
  function fr(e) {
    return (
      (fr = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (e) {
            return e.__proto__ || Object.getPrototypeOf(e);
          }),
      fr(e)
    );
  }
  function pr(e, t, r) {
    return (
      t in e
        ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 })
        : (e[t] = r),
      e
    );
  }
  var yr = (function (e) {
    !(function (e, t) {
      if ('function' != typeof t && null !== t)
        throw new TypeError('Super expression must either be null or a function');
      (e.prototype = Object.create(t && t.prototype, {
        constructor: { value: e, writable: !0, configurable: !0 },
      })),
        Object.defineProperty(e, 'prototype', { writable: !1 }),
        t && lr(e, t);
    })(i, e);
    var t,
      r,
      n,
      o =
        ((r = i),
        (n = (function () {
          if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ('function' == typeof Proxy) return !0;
          try {
            return (
              Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0
            );
          } catch (e) {
            return !1;
          }
        })()),
        function () {
          var e,
            t = fr(r);
          if (n) {
            var o = fr(this).constructor;
            e = Reflect.construct(t, arguments, o);
          } else e = t.apply(this, arguments);
          return ur(this, e);
        });
    function i(e) {
      var t;
      return (
        (function (e, t) {
          if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
        })(this, i),
        pr(sr((t = o.call(this, e))), 'logout', function () {
          t.setState({ isPopupShow: !t.state.isPopupShow });
        }),
        pr(sr(t), 'render', function () {
          var e = t.props.isAuthorized
            ? X.createElement(
                'div',
                { class: 'navbar__avatar' },
                X.createElement(
                  'div',
                  { class: 'navbar__avatar__wrapper' },
                  X.createElement('img', {
                    onClick: t.logout,
                    class: 'navbar__avatar__img_round',
                    src: ar,
                    alt: 'avatar.png',
                  }),
                  X.createElement(
                    'div',
                    { class: 'popup' },
                    X.createElement(
                      Je,
                      { to: '/settings' },
                      X.createElement('div', { class: 'text popup__text' }, 'Settings'),
                    ),
                    X.createElement(
                      Je,
                      { to: '/login' },
                      X.createElement(
                        'div',
                        { class: 'text popup__text popup__logout' },
                        'Log out',
                      ),
                    ),
                  ),
                ),
              )
            : X.createElement(
                'div',
                { class: 'navbar__menu navbar__auth__menu  ' },
                X.createElement(
                  'div',
                  { class: 'navbar__menu__button' },
                  X.createElement(
                    'a',
                    { class: 'navbar__link-new-page', href: '/login' },
                    X.createElement('div', { class: 'text button__text' }, 'LOG IN'),
                  ),
                ),
                X.createElement(
                  'div',
                  { class: 'navbar__menu__button' },
                  X.createElement(
                    'a',
                    { class: 'navbar__link-new-page', href: '/signup' },
                    X.createElement('div', { class: 'text button__text' }, 'SIGN UP'),
                  ),
                ),
              );
          return X.createElement(
            'div',
            { class: 'navbar main__top-chart__header' },
            X.createElement(
              'div',
              { class: 'navbar__menu' },
              X.createElement(
                'div',
                { class: 'navbar__menu__button' },
                X.createElement('div', { class: 'text button__text ' }, 'DISCOVER'),
              ),
              X.createElement(
                'div',
                { class: 'navbar__menu__button' },
                X.createElement('div', { class: 'text button__text' }, 'MY LIBRARY'),
              ),
              X.createElement(
                'div',
                { class: 'navbar__menu__button' },
                X.createElement('div', { class: 'text button__text' }, 'RADIO'),
              ),
            ),
            X.createElement(
              'div',
              { class: 'navbar__search' },
              X.createElement('input', {
                class: 'search__input',
                type: 'text',
                placeholder: 'Search artists, albums...',
              }),
              X.createElement('span', {
                class: 'fa-solid fa-magnifying-glass navbar__search__icon',
              }),
            ),
            e,
          );
        }),
        (t.state = { isPopupShow: !1 }),
        (t.logout = t.logout.bind(sr(t))),
        t
      );
    }
    return (t = i), Object.defineProperty(t, 'prototype', { writable: !1 }), t;
  })(G);
  function dr(e) {
    return (
      (dr =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                'function' == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? 'symbol'
                : typeof e;
            }),
      dr(e)
    );
  }
  function br(e, t) {
    if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
  }
  function mr(e, t) {
    return (
      (mr =
        Object.setPrototypeOf ||
        function (e, t) {
          return (e.__proto__ = t), e;
        }),
      mr(e, t)
    );
  }
  function hr(e, t) {
    if (t && ('object' === dr(t) || 'function' == typeof t)) return t;
    if (void 0 !== t)
      throw new TypeError('Derived constructors may only return object or undefined');
    return vr(e);
  }
  function vr(e) {
    if (void 0 === e)
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e;
  }
  function gr(e) {
    return (
      (gr = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (e) {
            return e.__proto__ || Object.getPrototypeOf(e);
          }),
      gr(e)
    );
  }
  function _r(e, t, r) {
    return (
      t in e
        ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 })
        : (e[t] = r),
      e
    );
  }
  var wr = (function (e) {
    !(function (e, t) {
      if ('function' != typeof t && null !== t)
        throw new TypeError('Super expression must either be null or a function');
      (e.prototype = Object.create(t && t.prototype, {
        constructor: { value: e, writable: !0, configurable: !0 },
      })),
        Object.defineProperty(e, 'prototype', { writable: !1 }),
        t && mr(e, t);
    })(i, e);
    var t,
      r,
      n,
      o =
        ((r = i),
        (n = (function () {
          if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ('function' == typeof Proxy) return !0;
          try {
            return (
              Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0
            );
          } catch (e) {
            return !1;
          }
        })()),
        function () {
          var e,
            t = gr(r);
          if (n) {
            var o = gr(this).constructor;
            e = Reflect.construct(t, arguments, o);
          } else e = t.apply(this, arguments);
          return hr(this, e);
        });
    function i() {
      var e;
      br(this, i);
      for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++) r[n] = arguments[n];
      return (
        _r(vr((e = o.call.apply(o, [this].concat(r)))), 'render', function () {
          return X.createElement('div', { class: 'carousel-row' }, e.children);
        }),
        e
      );
    }
    return (t = i), Object.defineProperty(t, 'prototype', { writable: !1 }), t;
  })(G);
  function Or(e) {
    return (
      (Or =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                'function' == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? 'symbol'
                : typeof e;
            }),
      Or(e)
    );
  }
  function Er(e, t) {
    return (
      (Er =
        Object.setPrototypeOf ||
        function (e, t) {
          return (e.__proto__ = t), e;
        }),
      Er(e, t)
    );
  }
  function Pr(e, t) {
    if (t && ('object' === Or(t) || 'function' == typeof t)) return t;
    if (void 0 !== t)
      throw new TypeError('Derived constructors may only return object or undefined');
    return jr(e);
  }
  function jr(e) {
    if (void 0 === e)
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e;
  }
  function kr(e) {
    return (
      (kr = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (e) {
            return e.__proto__ || Object.getPrototypeOf(e);
          }),
      kr(e)
    );
  }
  var Sr = (function (e) {
    !(function (e, t) {
      if ('function' != typeof t && null !== t)
        throw new TypeError('Super expression must either be null or a function');
      (e.prototype = Object.create(t && t.prototype, {
        constructor: { value: e, writable: !0, configurable: !0 },
      })),
        Object.defineProperty(e, 'prototype', { writable: !1 }),
        t && Er(e, t);
    })(i, e);
    var t,
      r,
      n,
      o =
        ((r = i),
        (n = (function () {
          if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ('function' == typeof Proxy) return !0;
          try {
            return (
              Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0
            );
          } catch (e) {
            return !1;
          }
        })()),
        function () {
          var e,
            t = kr(r);
          if (n) {
            var o = kr(this).constructor;
            e = Reflect.construct(t, arguments, o);
          } else e = t.apply(this, arguments);
          return Pr(this, e);
        });
    function i(e) {
      var t;
      return (
        (function (e, t) {
          if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
        })(this, i),
        (function (e, t, r) {
          t in e
            ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = r);
        })(jr((t = o.call(this, e))), 'render', function () {
          var e = t.props,
            r = e.cover,
            n = e.title,
            o = e.artist;
          return X.createElement(
            'div',
            { class: 'album' },
            X.createElement('img', { class: 'album__image', src: r }),
            X.createElement('div', { class: 'text album__title' }, n),
            X.createElement('div', { class: 'text album__artist' }, o),
          );
        }),
        (t.state = { cover: '', title: '', artist: '' }),
        t
      );
    }
    return (t = i), Object.defineProperty(t, 'prototype', { writable: !1 }), t;
  })(X.Component);
  function Rr(e) {
    return (
      (Rr =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                'function' == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? 'symbol'
                : typeof e;
            }),
      Rr(e)
    );
  }
  function Tr(e, t) {
    if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
  }
  function xr(e, t) {
    for (var r = 0; r < t.length; r++) {
      var n = t[r];
      (n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        'value' in n && (n.writable = !0),
        Object.defineProperty(e, n.key, n);
    }
  }
  function Ar(e, t) {
    return (
      (Ar =
        Object.setPrototypeOf ||
        function (e, t) {
          return (e.__proto__ = t), e;
        }),
      Ar(e, t)
    );
  }
  function Cr(e, t) {
    if (t && ('object' === Rr(t) || 'function' == typeof t)) return t;
    if (void 0 !== t)
      throw new TypeError('Derived constructors may only return object or undefined');
    return Nr(e);
  }
  function Nr(e) {
    if (void 0 === e)
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e;
  }
  function Dr(e) {
    return (
      (Dr = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (e) {
            return e.__proto__ || Object.getPrototypeOf(e);
          }),
      Dr(e)
    );
  }
  function Ir(e, t, r) {
    return (
      t in e
        ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 })
        : (e[t] = r),
      e
    );
  }
  var Br = (function (e) {
    !(function (e, t) {
      if ('function' != typeof t && null !== t)
        throw new TypeError('Super expression must either be null or a function');
      (e.prototype = Object.create(t && t.prototype, {
        constructor: { value: e, writable: !0, configurable: !0 },
      })),
        Object.defineProperty(e, 'prototype', { writable: !1 }),
        t && Ar(e, t);
    })(a, e);
    var t,
      r,
      n,
      o,
      i =
        ((n = a),
        (o = (function () {
          if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ('function' == typeof Proxy) return !0;
          try {
            return (
              Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0
            );
          } catch (e) {
            return !1;
          }
        })()),
        function () {
          var e,
            t = Dr(n);
          if (o) {
            var r = Dr(this).constructor;
            e = Reflect.construct(t, arguments, r);
          } else e = t.apply(this, arguments);
          return Cr(this, e);
        });
    function a() {
      var e;
      Tr(this, a);
      for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++) r[n] = arguments[n];
      return (
        Ir(Nr((e = i.call.apply(i, [this].concat(r)))), 'render', function () {
          var t = e.props,
            r = t.cover,
            n = t.name;
          return X.createElement(
            'div',
            { onclick: e.props.onClick, class: 'artist' },
            X.createElement('img', { class: 'artist__image', src: r }),
            X.createElement('div', { class: 'text artist__name' }, ' ', n),
          );
        }),
        e
      );
    }
    return (
      (t = a),
      (r = [
        {
          key: 'someHandler',
          value: function () {
            console.log('hui');
          },
        },
      ]) && xr(t.prototype, r),
      Object.defineProperty(t, 'prototype', { writable: !1 }),
      a
    );
  })(X.Component);
  function Lr(e, t) {
    for (var r = 0; r < t.length; r++) {
      var n = t[r];
      (n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        'value' in n && (n.writable = !0),
        Object.defineProperty(e, n.key, n);
    }
  }
  var Ur = (function () {
    function e() {
      !(function (e, t) {
        if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
      })(this, e);
    }
    var t, r;
    return (
      (t = e),
      (r = [
        {
          key: 'getPopular',
          value: function () {
            return fe.get('api/v1/albums/popular').then(function (e) {
              return 200 !== e.status ? Promise.reject(e.body) : e.body.Result;
            });
          },
        },
      ]),
      null && Lr(t.prototype, null),
      r && Lr(t, r),
      Object.defineProperty(t, 'prototype', { writable: !1 }),
      e
    );
  })();
  function Mr(e) {
    Ur.getPopular().then(function (t) {
      e({ type: 'popular/album', payload: t });
    });
  }
  const Vr = {
    popular: 'api/v1/artists/popular',
    artistID: 'api/v1/artists/',
    artistPopular: 'api/v1/artists/{id}/popular',
  };
  function zr(e, t) {
    for (var r = 0; r < t.length; r++) {
      var n = t[r];
      (n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        'value' in n && (n.writable = !0),
        Object.defineProperty(e, n.key, n);
    }
  }
  var Fr = (function () {
    function e() {
      !(function (e, t) {
        if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
      })(this, e);
    }
    var t, r;
    return (
      (t = e),
      (r = [
        {
          key: 'getPopular',
          value: function () {
            return fe.get(Vr.popular).then(function (e) {
              return 200 !== e.status ? Promise.reject(e.body) : e.body.Result;
            });
          },
        },
        {
          key: 'getArtistById',
          value: function (e) {
            return fe.get(Vr.artistID + e.toString()).then(function (t) {
              if (200 !== t.status) return Promise.reject(t.body);
              console.log('req id:', e);
              var r = {};
              return (r[e] = t.body.Result), r;
            });
          },
        },
        {
          key: 'getArtistPopularById',
          value: function (e) {
            var t = Vr.artistPopular.replace('{id}', e.toString());
            return fe.get(t).then(function (t) {
              if (200 !== t.status) return Promise.reject(t.body);
              console.log('req id:', e);
              var r = {};
              return (r[e] = t.body.Result), r;
            });
          },
        },
      ]),
      null && zr(t.prototype, null),
      r && zr(t, r),
      Object.defineProperty(t, 'prototype', { writable: !1 }),
      e
    );
  })();
  function Wr(e) {
    Fr.getPopular().then(function (t) {
      e({ type: 'popular/artist', payload: t });
    });
  }
  function Hr(e) {
    return (
      (Hr =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                'function' == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? 'symbol'
                : typeof e;
            }),
      Hr(e)
    );
  }
  function qr(e, t) {
    return (
      (qr =
        Object.setPrototypeOf ||
        function (e, t) {
          return (e.__proto__ = t), e;
        }),
      qr(e, t)
    );
  }
  function $r(e, t) {
    if (t && ('object' === Hr(t) || 'function' == typeof t)) return t;
    if (void 0 !== t)
      throw new TypeError('Derived constructors may only return object or undefined');
    return Zr(e);
  }
  function Zr(e) {
    if (void 0 === e)
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e;
  }
  function Gr(e) {
    return (
      (Gr = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (e) {
            return e.__proto__ || Object.getPrototypeOf(e);
          }),
      Gr(e)
    );
  }
  var Jr = (function (e) {
    !(function (e, t) {
      if ('function' != typeof t && null !== t)
        throw new TypeError('Super expression must either be null or a function');
      (e.prototype = Object.create(t && t.prototype, {
        constructor: { value: e, writable: !0, configurable: !0 },
      })),
        Object.defineProperty(e, 'prototype', { writable: !1 }),
        t && qr(e, t);
    })(i, e);
    var t,
      r,
      n,
      o =
        ((r = i),
        (n = (function () {
          if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ('function' == typeof Proxy) return !0;
          try {
            return (
              Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0
            );
          } catch (e) {
            return !1;
          }
        })()),
        function () {
          var e,
            t = Gr(r);
          if (n) {
            var o = Gr(this).constructor;
            e = Reflect.construct(t, arguments, o);
          } else e = t.apply(this, arguments);
          return $r(this, e);
        });
    function i(e) {
      var t;
      return (
        (function (e, t) {
          if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
        })(this, i),
        (function (e, t, r) {
          t in e
            ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = r);
        })(Zr((t = o.call(this, e))), 'render', function () {
          return X.createElement(
            'div',
            { class: 'main__popular' },
            X.createElement(
              'div',
              { class: 'main__popular__albums main__popular_slider-hidden' },
              X.createElement('div', { class: 'text main__popular__title' }, 'Popular albums'),
              X.createElement(
                wr,
                null,
                t.props.albums
                  ? t.props.albums.map(function (e) {
                      return X.createElement(Sr, {
                        cover: se + e.cover,
                        title: e.title,
                        artist: e.artist,
                      });
                    })
                  : '',
              ),
            ),
            X.createElement(
              'div',
              { class: 'main__popular__artists main__popular_slider-hidden' },
              X.createElement('div', { class: 'text main__popular__title' }, 'Popular artist'),
              X.createElement(
                wr,
                null,
                t.props.artists
                  ? t.props.artists.map(function (e) {
                      return X.createElement(Je, {
                        to: '/artist/'.concat(e.cover.split('_')[1].split('.')[0]),
                        as: Br,
                        cover: se + e.cover,
                        name: e.name,
                      });
                    })
                  : '',
              ),
            ),
          );
        }),
        t.props.getAlbums(),
        t.props.getArtist(),
        console.log(t.props),
        t
      );
    }
    return (t = i), Object.defineProperty(t, 'prototype', { writable: !1 }), t;
  })(X.Component);
  const Yr = Gt(
    function (e) {
      return {
        artists: e.artistPopular ? e.artistPopular.popular : null,
        albums: e.albumPopular ? e.albumPopular.popular : null,
      };
    },
    function (e) {
      return {
        getArtist: function () {
          e(Wr);
        },
        getAlbums: function () {
          e(Mr);
        },
      };
    },
  )(Jr);
  function Kr(e) {
    return (
      (Kr =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                'function' == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? 'symbol'
                : typeof e;
            }),
      Kr(e)
    );
  }
  function Xr(e, t) {
    if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
  }
  function Qr(e, t) {
    return (
      (Qr =
        Object.setPrototypeOf ||
        function (e, t) {
          return (e.__proto__ = t), e;
        }),
      Qr(e, t)
    );
  }
  function en(e, t) {
    if (t && ('object' === Kr(t) || 'function' == typeof t)) return t;
    if (void 0 !== t)
      throw new TypeError('Derived constructors may only return object or undefined');
    return tn(e);
  }
  function tn(e) {
    if (void 0 === e)
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e;
  }
  function rn(e) {
    return (
      (rn = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (e) {
            return e.__proto__ || Object.getPrototypeOf(e);
          }),
      rn(e)
    );
  }
  function nn(e, t, r) {
    return (
      t in e
        ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 })
        : (e[t] = r),
      e
    );
  }
  var on = (function (e) {
    !(function (e, t) {
      if ('function' != typeof t && null !== t)
        throw new TypeError('Super expression must either be null or a function');
      (e.prototype = Object.create(t && t.prototype, {
        constructor: { value: e, writable: !0, configurable: !0 },
      })),
        Object.defineProperty(e, 'prototype', { writable: !1 }),
        t && Qr(e, t);
    })(i, e);
    var t,
      r,
      n,
      o =
        ((r = i),
        (n = (function () {
          if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ('function' == typeof Proxy) return !0;
          try {
            return (
              Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0
            );
          } catch (e) {
            return !1;
          }
        })()),
        function () {
          var e,
            t = rn(r);
          if (n) {
            var o = rn(this).constructor;
            e = Reflect.construct(t, arguments, o);
          } else e = t.apply(this, arguments);
          return en(this, e);
        });
    function i() {
      var e;
      Xr(this, i);
      for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++) r[n] = arguments[n];
      return (
        nn(tn((e = o.call.apply(o, [this].concat(r)))), 'render', function () {
          var t = e.props.isAuthorized;
          return X.createElement(
            'div',
            { class: 'main__page' },
            X.createElement(yr, { isAuthorized: t }),
            X.createElement(
              'div',
              { class: 'main__top-chart__album' },
              X.createElement(
                'div',
                { class: 'main__top-chart__album__name' },
                X.createElement(
                  'div',
                  { class: 'text main__top-chart__album__name' },
                  'Flume: Skin',
                ),
                X.createElement(
                  'div',
                  { class: 'text main__top-chart__album__quote' },
                  'Flume walks us through his ‘weird’ new album, ‘Skin’. He has one goal: “I wanna make weird stuff.”',
                ),
              ),
              X.createElement(
                'div',
                { class: 'main__top-chart__album__controls' },
                X.createElement(
                  'div',
                  { class: 'button main__top-chart__album__btn_play' },
                  X.createElement('div', { class: 'text' }, 'Play'),
                ),
                X.createElement(
                  'div',
                  { class: 'button main__top-chart__album__btn_follow' },
                  X.createElement('div', { class: 'text' }, 'Follow'),
                ),
              ),
            ),
            X.createElement(Yr, null),
          );
        }),
        e
      );
    }
    return (t = i), Object.defineProperty(t, 'prototype', { writable: !1 }), t;
  })(G);
  function an(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
    return n;
  }
  function cn(e, t) {
    return (
      (function (e) {
        if (Array.isArray(e)) return e;
      })(e) ||
      (function (e, t) {
        var r =
          null == e
            ? null
            : ('undefined' != typeof Symbol && e[Symbol.iterator]) || e['@@iterator'];
        if (null != r) {
          var n,
            o,
            i = [],
            a = !0,
            c = !1;
          try {
            for (
              r = r.call(e);
              !(a = (n = r.next()).done) && (i.push(n.value), !t || i.length !== t);
              a = !0
            );
          } catch (e) {
            (c = !0), (o = e);
          } finally {
            try {
              a || null == r.return || r.return();
            } finally {
              if (c) throw o;
            }
          }
          return i;
        }
      })(e, t) ||
      (function (e, t) {
        if (e) {
          if ('string' == typeof e) return ln(e, t);
          var r = Object.prototype.toString.call(e).slice(8, -1);
          return (
            'Object' === r && e.constructor && (r = e.constructor.name),
            'Map' === r || 'Set' === r
              ? Array.from(e)
              : 'Arguments' === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
              ? ln(e, t)
              : void 0
          );
        }
      })(e, t) ||
      (function () {
        throw new TypeError(
          'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
        );
      })()
    );
  }
  function ln(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
    return n;
  }
  const un = (function (e) {
    return function (t, r) {
      return (
        Object.entries(e).map(function (e) {
          var n,
            o,
            i =
              ((o = 2),
              (function (e) {
                if (Array.isArray(e)) return e;
              })((n = e)) ||
                (function (e, t) {
                  var r =
                    null == e
                      ? null
                      : ('undefined' != typeof Symbol && e[Symbol.iterator]) || e['@@iterator'];
                  if (null != r) {
                    var n,
                      o,
                      i = [],
                      a = !0,
                      c = !1;
                    try {
                      for (
                        r = r.call(e);
                        !(a = (n = r.next()).done) && (i.push(n.value), !t || i.length !== t);
                        a = !0
                      );
                    } catch (e) {
                      (c = !0), (o = e);
                    } finally {
                      try {
                        a || null == r.return || r.return();
                      } finally {
                        if (c) throw o;
                      }
                    }
                    return i;
                  }
                })(n, o) ||
                (function (e, t) {
                  if (e) {
                    if ('string' == typeof e) return an(e, t);
                    var r = Object.prototype.toString.call(e).slice(8, -1);
                    return (
                      'Object' === r && e.constructor && (r = e.constructor.name),
                      'Map' === r || 'Set' === r
                        ? Array.from(e)
                        : 'Arguments' === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                        ? an(e, t)
                        : void 0
                    );
                  }
                })(n, o) ||
                (function () {
                  throw new TypeError(
                    'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                  );
                })()),
            a = i[0],
            c = i[1];
          t[a] || (t[a] = {}), c(t[a], r);
        }),
        t
      );
    };
  })({
    tracksPopular: function (e, t) {
      return 'popular/track' === t.type && (e.popular = t.payload), e;
    },
    albumPopular: function (e, t) {
      return 'popular/album' === t.type && (e.popular = t.payload), e;
    },
    artistPopular: function (e, t) {
      return 'popular/artist' === t.type && (e.popular = t.payload), e;
    },
    artist: function (e, t) {
      if ('get/artist' === t.type)
        for (var r = 0, n = Object.entries(t.payload); r < n.length; r++) {
          var o = cn(n[r], 2),
            i = o[0],
            a = o[1];
          e[i] = a;
        }
      return e;
    },
    artistPopularTracks: function (e, t) {
      if ('get/artist/popular' === t.type)
        for (var r = 0, n = Object.entries(t.payload); r < n.length; r++) {
          var o = cn(n[r], 2),
            i = o[0],
            a = o[1];
          console.log('key', i, a), (e[i] = a);
        }
      return e;
    },
    user: function (e, t) {
      switch (t.type) {
        case 'logout/user':
          return null;
        case 'self/user':
        case 'login/user':
        case 'signup/user':
          return t.payload;
        default:
          return e;
      }
    },
  });
  function sn(e, t) {
    if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
  }
  function fn(e, t) {
    for (var r = 0; r < t.length; r++) {
      var n = t[r];
      (n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        'value' in n && (n.writable = !0),
        Object.defineProperty(e, n.key, n);
    }
  }
  function pn(e, t, r) {
    !(function (e, t) {
      if (t.has(e))
        throw new TypeError('Cannot initialize the same private elements twice on an object');
    })(e, t),
      t.set(e, r);
  }
  function yn(e, t) {
    return (function (e, t) {
      return t.get ? t.get.call(e) : t.value;
    })(e, bn(e, t, 'get'));
  }
  function dn(e, t, r) {
    return (
      (function (e, t, r) {
        if (t.set) t.set.call(e, r);
        else {
          if (!t.writable) throw new TypeError('attempted to set read only private field');
          t.value = r;
        }
      })(e, bn(e, t, 'set'), r),
      r
    );
  }
  function bn(e, t, r) {
    if (!t.has(e)) throw new TypeError('attempted to ' + r + ' private field on non-instance');
    return t.get(e);
  }
  var mn = new WeakMap(),
    hn = new WeakMap(),
    vn = new WeakMap(),
    gn = new WeakMap(),
    _n = (function () {
      function e() {
        var t =
            arguments.length > 0 && void 0 !== arguments[0]
              ? arguments[0]
              : function (e) {
                  return e;
                },
          r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
          n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        sn(this, e),
          pn(this, mn, { writable: !0, value: void 0 }),
          pn(this, hn, { writable: !0, value: void 0 }),
          pn(this, vn, { writable: !0, value: void 0 }),
          pn(this, gn, { writable: !0, value: void 0 }),
          dn(this, mn, n),
          console.log('Middleware', r),
          (this.dispatch = this.dispatch.bind(this));
        for (var o = 0; o < r.length; o += 1) {
          var i = r[o];
          this.dispatch = i(this)(this.dispatch);
        }
        dn(this, gn, []), dn(this, vn, t), (this.subscribe = this.subscribe.bind(this));
      }
      var t, r;
      return (
        (t = e),
        (r = [
          {
            key: 'getState',
            value: function () {
              return yn(this, mn);
            },
          },
          {
            key: 'subscribe',
            value: function (e) {
              yn(this, gn).push(e);
            },
          },
          {
            key: 'dispatch',
            value: function (e) {
              var t = this;
              console.log('dispatch:', this),
                dn(this, mn, yn(this, vn).call(this, yn(this, mn), e)),
                yn(this, gn).forEach(function (e) {
                  e(yn(t, mn));
                });
            },
          },
        ]) && fn(t.prototype, r),
        Object.defineProperty(t, 'prototype', { writable: !1 }),
        e
      );
    })();
  function wn(e) {
    return (
      (wn =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                'function' == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? 'symbol'
                : typeof e;
            }),
      wn(e)
    );
  }
  function On(e, t) {
    if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
  }
  function En(e, t) {
    for (var r = 0; r < t.length; r++) {
      var n = t[r];
      (n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        'value' in n && (n.writable = !0),
        Object.defineProperty(e, n.key, n);
    }
  }
  function Pn(e, t) {
    return (
      (Pn =
        Object.setPrototypeOf ||
        function (e, t) {
          return (e.__proto__ = t), e;
        }),
      Pn(e, t)
    );
  }
  function jn(e, t) {
    if (t && ('object' === wn(t) || 'function' == typeof t)) return t;
    if (void 0 !== t)
      throw new TypeError('Derived constructors may only return object or undefined');
    return (function (e) {
      if (void 0 === e)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return e;
    })(e);
  }
  function kn(e) {
    return (
      (kn = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (e) {
            return e.__proto__ || Object.getPrototypeOf(e);
          }),
      kn(e)
    );
  }
  var Sn = (function (e) {
      !(function (e, t) {
        if ('function' != typeof t && null !== t)
          throw new TypeError('Super expression must either be null or a function');
        (e.prototype = Object.create(t && t.prototype, {
          constructor: { value: e, writable: !0, configurable: !0 },
        })),
          Object.defineProperty(e, 'prototype', { writable: !1 }),
          t && Pn(e, t);
      })(a, e);
      var t,
        r,
        n,
        o,
        i =
          ((n = a),
          (o = (function () {
            if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ('function' == typeof Proxy) return !0;
            try {
              return (
                Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0
              );
            } catch (e) {
              return !1;
            }
          })()),
          function () {
            var e,
              t = kn(n);
            if (o) {
              var r = kn(this).constructor;
              e = Reflect.construct(t, arguments, r);
            } else e = t.apply(this, arguments);
            return jn(this, e);
          });
      function a() {
        return On(this, a), i.apply(this, arguments);
      }
      return (
        (t = a),
        (r = [
          {
            key: 'render',
            value: function () {
              return X.createElement(X.Fragment, null, this.props.children);
            },
          },
        ]) && En(t.prototype, r),
        Object.defineProperty(t, 'prototype', { writable: !1 }),
        a
      );
    })(X.Component),
    Rn = /^(?:(?:\/:?[\w_~.-]+)*|\/)$/,
    Tn = /^(?:(?:\/[\w_~.-]+)*|\/)$/;
  function xn(e, t, r) {
    if (!e.match(Rn)) throw Error('Invalid route: '.concat(e));
    if (!t.match(Tn)) throw Error('Invalid path: '.concat(t));
    var n = e.split('/').filter(function (e) {
        return e;
      }),
      o = t.split('/').filter(function (e) {
        return e;
      }),
      i = {};
    if (n.length > o.length) return null;
    if (r && n.length !== o.length) return null;
    if (
      !n.every(function (e, t) {
        var r = o[t];
        return e.startsWith(':') ? ((i[e.slice(1)] = r), !0) : e === r;
      })
    )
      return null;
    var a = '/'.concat(o.slice(0, n.length).join('/')),
      c = '/'.concat(o.slice(n.length).join('/'));
    return { params: i, handled: a, rest: c };
  }
  function An(e) {
    return (
      (An =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                'function' == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? 'symbol'
                : typeof e;
            }),
      An(e)
    );
  }
  function Cn(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
    return n;
  }
  function Nn(e, t) {
    for (var r = 0; r < t.length; r++) {
      var n = t[r];
      (n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        'value' in n && (n.writable = !0),
        Object.defineProperty(e, n.key, n);
    }
  }
  function Dn(e, t) {
    return (
      (Dn =
        Object.setPrototypeOf ||
        function (e, t) {
          return (e.__proto__ = t), e;
        }),
      Dn(e, t)
    );
  }
  function In(e, t) {
    if (t && ('object' === An(t) || 'function' == typeof t)) return t;
    if (void 0 !== t)
      throw new TypeError('Derived constructors may only return object or undefined');
    return (function (e) {
      if (void 0 === e)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return e;
    })(e);
  }
  function Bn(e) {
    return (
      (Bn = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (e) {
            return e.__proto__ || Object.getPrototypeOf(e);
          }),
      Bn(e)
    );
  }
  var Ln = (function (e) {
    !(function (e, t) {
      if ('function' != typeof t && null !== t)
        throw new TypeError('Super expression must either be null or a function');
      (e.prototype = Object.create(t && t.prototype, {
        constructor: { value: e, writable: !0, configurable: !0 },
      })),
        Object.defineProperty(e, 'prototype', { writable: !1 }),
        t && Dn(e, t);
    })(a, e);
    var t,
      r,
      n,
      o,
      i =
        ((n = a),
        (o = (function () {
          if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ('function' == typeof Proxy) return !0;
          try {
            return (
              Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0
            );
          } catch (e) {
            return !1;
          }
        })()),
        function () {
          var e,
            t = Bn(n);
          if (o) {
            var r = Bn(this).constructor;
            e = Reflect.construct(t, arguments, r);
          } else e = t.apply(this, arguments);
          return In(this, e);
        });
    function a(e) {
      var t;
      if (
        ((function (e, t) {
          if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
        })(this, a),
        ((t = i.call(this, e)).toRenderIdx = null),
        null == t.context)
      )
        throw Error('Router has not been found');
      return t;
    }
    return (
      (t = a),
      (r = [
        {
          key: 'route',
          value: function () {
            var e = this.context;
            if (
              !this.children.every(function (e) {
                return e instanceof X.VirtualElement && e.type === Sn;
              })
            )
              throw Error('RouteSwitch have to contain only Route components');
            this.toRenderIdx = null;
            var t,
              r = 0,
              n = (function (e, t) {
                var r = ('undefined' != typeof Symbol && e[Symbol.iterator]) || e['@@iterator'];
                if (!r) {
                  if (
                    Array.isArray(e) ||
                    (r = (function (e, t) {
                      if (e) {
                        if ('string' == typeof e) return Cn(e, t);
                        var r = Object.prototype.toString.call(e).slice(8, -1);
                        return (
                          'Object' === r && e.constructor && (r = e.constructor.name),
                          'Map' === r || 'Set' === r
                            ? Array.from(e)
                            : 'Arguments' === r ||
                              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                            ? Cn(e, t)
                            : void 0
                        );
                      }
                    })(e)) ||
                    (t && e && 'number' == typeof e.length)
                  ) {
                    r && (e = r);
                    var n = 0,
                      o = function () {};
                    return {
                      s: o,
                      n: function () {
                        return n >= e.length ? { done: !0 } : { done: !1, value: e[n++] };
                      },
                      e: function (e) {
                        throw e;
                      },
                      f: o,
                    };
                  }
                  throw new TypeError(
                    'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                  );
                }
                var i,
                  a = !0,
                  c = !1;
                return {
                  s: function () {
                    r = r.call(e);
                  },
                  n: function () {
                    var e = r.next();
                    return (a = e.done), e;
                  },
                  e: function (e) {
                    (c = !0), (i = e);
                  },
                  f: function () {
                    try {
                      a || null == r.return || r.return();
                    } finally {
                      if (c) throw i;
                    }
                  },
                };
              })(this.children);
            try {
              for (n.s(); !(t = n.n()).done; ) {
                var o = t.value.props,
                  i = o.to,
                  a = o.exact,
                  c = xn(i, e.unhandledPath, a);
                if (c) {
                  var l = c.params,
                    u = c.handled,
                    s = c.rest;
                  (e.unhandledPath = s),
                    e.handledSwitchers.push({ path: u, switcher: this, params: l }),
                    (this.toRenderIdx = r);
                  break;
                }
                r += 1;
              }
            } catch (e) {
              n.e(e);
            } finally {
              n.f();
            }
          },
        },
        {
          key: 'render',
          value: function () {
            var e = this.context;
            if ((e.contains(this) || this.route(), null == this.toRenderIdx))
              throw (console.log(e), Error('RouteSwitch no match'));
            return X.createElement(
              Le.Provider,
              { value: e },
              this.props.children[this.toRenderIdx],
            );
          },
        },
      ]) && Nn(t.prototype, r),
      Object.defineProperty(t, 'prototype', { writable: !1 }),
      a
    );
  })(X.Component);
  function Un(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
    return n;
  }
  function Mn(e, t) {
    for (var r = 0; r < t.length; r++) {
      var n = t[r];
      (n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        'value' in n && (n.writable = !0),
        Object.defineProperty(e, n.key, n);
    }
  }
  !(function (e, t, r) {
    t in e
      ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = r);
  })(Ln, 'contextType', Le);
  var Vn = (function () {
    function e(t) {
      !(function (e, t) {
        if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
      })(this, e),
        (this.handledSwitchers = []),
        (this.unhandledPath = window.location.pathname),
        (this.router = t);
    }
    var t, r;
    return (
      (t = e),
      (r = [
        {
          key: 'params',
          get: function () {
            return D.apply(
              void 0,
              (function (e) {
                if (Array.isArray(e)) return Un(e);
              })(
                (e = this.handledSwitchers.map(function (e) {
                  return e.params;
                })),
              ) ||
                (function (e) {
                  if (
                    ('undefined' != typeof Symbol && null != e[Symbol.iterator]) ||
                    null != e['@@iterator']
                  )
                    return Array.from(e);
                })(e) ||
                (function (e, t) {
                  if (e) {
                    if ('string' == typeof e) return Un(e, t);
                    var r = Object.prototype.toString.call(e).slice(8, -1);
                    return (
                      'Object' === r && e.constructor && (r = e.constructor.name),
                      'Map' === r || 'Set' === r
                        ? Array.from(e)
                        : 'Arguments' === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                        ? Un(e, t)
                        : void 0
                    );
                  }
                })(e) ||
                (function () {
                  throw new TypeError(
                    'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                  );
                })(),
            );
            var e;
          },
        },
        {
          key: 'start',
          value: function () {
            var e = this;
            window.onpopstate = function (t) {
              t.preventDefault(), e.rerender(window.location.pathname);
            };
          },
        },
        {
          key: 'go',
          value: function (e) {
            e === window.location.pathname
              ? window.history.replaceState(null, '', e)
              : window.history.pushState(null, '', e),
              this.rerender(e);
          },
        },
        {
          key: 'contains',
          value: function (e) {
            return this.handledSwitchers.some(function (t) {
              return t.switcher === e;
            });
          },
        },
        {
          key: 'rerender',
          value: function (e) {
            (this.unhandledPath = e),
              (this.handledSwitchers.length = 0),
              this.router.enqueueUpdate();
          },
        },
      ]) && Mn(t.prototype, r),
      Object.defineProperty(t, 'prototype', { writable: !1 }),
      e
    );
  })();
  function zn(e) {
    return (
      (zn =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                'function' == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? 'symbol'
                : typeof e;
            }),
      zn(e)
    );
  }
  function Fn(e, t) {
    for (var r = 0; r < t.length; r++) {
      var n = t[r];
      (n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        'value' in n && (n.writable = !0),
        Object.defineProperty(e, n.key, n);
    }
  }
  function Wn(e, t) {
    return (
      (Wn =
        Object.setPrototypeOf ||
        function (e, t) {
          return (e.__proto__ = t), e;
        }),
      Wn(e, t)
    );
  }
  function Hn(e, t) {
    if (t && ('object' === zn(t) || 'function' == typeof t)) return t;
    if (void 0 !== t)
      throw new TypeError('Derived constructors may only return object or undefined');
    return qn(e);
  }
  function qn(e) {
    if (void 0 === e)
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e;
  }
  function $n(e) {
    return (
      ($n = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (e) {
            return e.__proto__ || Object.getPrototypeOf(e);
          }),
      $n(e)
    );
  }
  var Zn = (function (e) {
    !(function (e, t) {
      if ('function' != typeof t && null !== t)
        throw new TypeError('Super expression must either be null or a function');
      (e.prototype = Object.create(t && t.prototype, {
        constructor: { value: e, writable: !0, configurable: !0 },
      })),
        Object.defineProperty(e, 'prototype', { writable: !1 }),
        t && Wn(e, t);
    })(a, e);
    var t,
      r,
      n,
      o,
      i =
        ((n = a),
        (o = (function () {
          if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ('function' == typeof Proxy) return !0;
          try {
            return (
              Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0
            );
          } catch (e) {
            return !1;
          }
        })()),
        function () {
          var e,
            t = $n(n);
          if (o) {
            var r = $n(this).constructor;
            e = Reflect.construct(t, arguments, r);
          } else e = t.apply(this, arguments);
          return Hn(this, e);
        });
    function a(e) {
      var t;
      return (
        (function (e, t) {
          if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
        })(this, a),
        ((t = i.call(this, e)).navigator = new Vn(qn(t))),
        t.navigator.start(),
        t
      );
    }
    return (
      (t = a),
      (r = [
        {
          key: 'render',
          value: function () {
            return X.createElement(Le.Provider, { value: this.navigator }, this.props.children);
          },
        },
      ]) && Fn(t.prototype, r),
      Object.defineProperty(t, 'prototype', { writable: !1 }),
      a
    );
  })(X.Component);
  function Gn(e, t) {
    for (var r = 0; r < t.length; r++) {
      var n = t[r];
      (n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        'value' in n && (n.writable = !0),
        Object.defineProperty(e, n.key, n);
    }
  }
  var Jn,
    Yn,
    Kn = (function () {
      function e() {
        !(function (e, t) {
          if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
        })(this, e);
      }
      var t, r;
      return (
        (t = e),
        (r = [
          {
            key: 'getCSRFToken',
            value: function () {
              return fe.get('api/v1/get_csrf').then(function (e) {
                return console.log(e), e;
              });
            },
          },
          {
            key: 'getUser',
            value: function () {
              return fe.get('api/v1/users/self').then(function (e) {
                return 200 !== e.status ? Promise.reject(e.body) : e.body;
              });
            },
          },
          {
            key: 'logout',
            value: function () {
              var t = null;
              return fe
                .post('api/v1/logout', null)
                .then(function (r) {
                  return 200 !== r.status
                    ? Promise.reject(r.body)
                    : ((t = r.body), e.getCSRFToken());
                })
                .then(function () {
                  return t;
                });
            },
          },
          {
            key: 'login',
            value: function (e) {
              var t = e.email,
                r = e.username,
                n = e.password;
              return fe
                .post('api/v1/login', { email: t, username: r, password: n })
                .then(function (e) {
                  return 200 !== e.status ? Promise.reject(e.body) : e.body;
                });
            },
          },
          {
            key: 'signup',
            value: function (e) {
              return fe.post('api/v1/signup', e).then(function (e) {
                return 200 !== e.status ? Promise.reject(e.body) : e.body;
              });
            },
          },
          {
            key: 'updateUser',
            value: function (e) {
              return fe.put('api/v1/users/self', e).then(function (e) {
                return 200 !== e.status ? Promise.reject(e.body) : e.body;
              });
            },
          },
        ]),
        null && Gn(t.prototype, null),
        r && Gn(t, r),
        Object.defineProperty(t, 'prototype', { writable: !1 }),
        e
      );
    })();
  function Xn(e) {
    return /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/.test(
      String(e).toLowerCase(),
    );
  }
  function Qn(e) {
    return /^[a-z0-9_]{3,16}$/.test(String(e).toLowerCase());
  }
  function eo(e) {
    return (
      (eo =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                'function' == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? 'symbol'
                : typeof e;
            }),
      eo(e)
    );
  }
  function to(e, t) {
    for (var r = 0; r < t.length; r++) {
      var n = t[r];
      (n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        'value' in n && (n.writable = !0),
        Object.defineProperty(e, n.key, n);
    }
  }
  function ro(e, t) {
    return (
      (ro =
        Object.setPrototypeOf ||
        function (e, t) {
          return (e.__proto__ = t), e;
        }),
      ro(e, t)
    );
  }
  function no(e, t) {
    if (t && ('object' === eo(t) || 'function' == typeof t)) return t;
    if (void 0 !== t)
      throw new TypeError('Derived constructors may only return object or undefined');
    return oo(e);
  }
  function oo(e) {
    if (void 0 === e)
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e;
  }
  function io(e) {
    return (
      (io = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (e) {
            return e.__proto__ || Object.getPrototypeOf(e);
          }),
      io(e)
    );
  }
  var ao,
    co,
    lo,
    uo =
      ((Jn = X.util.Debounce(750)),
      (Yn = (function (e) {
        !(function (e, t) {
          if ('function' != typeof t && null !== t)
            throw new TypeError('Super expression must either be null or a function');
          (e.prototype = Object.create(t && t.prototype, {
            constructor: { value: e, writable: !0, configurable: !0 },
          })),
            Object.defineProperty(e, 'prototype', { writable: !1 }),
            t && ro(e, t);
        })(a, e);
        var t,
          r,
          n,
          o,
          i =
            ((n = a),
            (o = (function () {
              if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
              if (Reflect.construct.sham) return !1;
              if ('function' == typeof Proxy) return !0;
              try {
                return (
                  Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0
                );
              } catch (e) {
                return !1;
              }
            })()),
            function () {
              var e,
                t = io(n);
              if (o) {
                var r = io(this).constructor;
                e = Reflect.construct(t, arguments, r);
              } else e = t.apply(this, arguments);
              return no(this, e);
            });
        function a(e) {
          var t;
          return (
            (function (e, t) {
              if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
            })(this, a),
            ((t = i.call(this, e)).inputRef = new X.Ref()),
            (t.state = { isInvalid: !1 }),
            (t.inputHandler = t.inputHandler.bind(oo(t))),
            t
          );
        }
        return (
          (t = a),
          (r = [
            {
              key: 'validate',
              value: function (e) {
                this.setState({ isInvalid: !this.props.checker(e) });
              },
            },
            {
              key: 'inputHandler',
              value: function (e) {
                var t = this.props.onInput,
                  r = this.inputRef.instance;
                null != t && t(e), this.validate(r.value);
              },
            },
            {
              key: 'render',
              value: function () {
                var e = this.state.isInvalid,
                  t = this.props,
                  r = t.placeholder,
                  n = t.type,
                  o = t.errorMessage;
                return X.createElement(
                  X.Fragment,
                  null,
                  X.createElement('input', {
                    type: n,
                    placeholder: r,
                    className: 'input-line '.concat(e ? 'input__wrong' : ''),
                    ref: this.inputRef,
                    onInput: this.inputHandler,
                  }),
                  X.createElement(
                    'label',
                    { className: 'input-label tooltip_danger '.concat(e ? '' : 'invisible') },
                    o,
                  ),
                );
              },
            },
          ]) && to(t.prototype, r),
          Object.defineProperty(t, 'prototype', { writable: !1 }),
          a
        );
      })(X.Component)),
      (function (e, t, r, n, o) {
        var i = {};
        Object.keys(n).forEach(function (e) {
          i[e] = n[e];
        }),
          (i.enumerable = !!i.enumerable),
          (i.configurable = !!i.configurable),
          ('value' in i || i.initializer) && (i.writable = !0),
          (i = r
            .slice()
            .reverse()
            .reduce(function (r, n) {
              return n(e, t, r) || r;
            }, i)),
          o &&
            void 0 !== i.initializer &&
            ((i.value = i.initializer ? i.initializer.call(o) : void 0), (i.initializer = void 0)),
          void 0 === i.initializer && (Object.defineProperty(e, t, i), (i = null));
      })(
        Yn.prototype,
        'validate',
        [Jn],
        Object.getOwnPropertyDescriptor(Yn.prototype, 'validate'),
        Yn.prototype,
      ),
      Yn);
  function so(e) {
    return (
      (so =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                'function' == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? 'symbol'
                : typeof e;
            }),
      so(e)
    );
  }
  function fo(e, t) {
    for (var r = 0; r < t.length; r++) {
      var n = t[r];
      (n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        'value' in n && (n.writable = !0),
        Object.defineProperty(e, n.key, n);
    }
  }
  function po(e, t) {
    return (
      (po =
        Object.setPrototypeOf ||
        function (e, t) {
          return (e.__proto__ = t), e;
        }),
      po(e, t)
    );
  }
  function yo(e, t) {
    if (t && ('object' === so(t) || 'function' == typeof t)) return t;
    if (void 0 !== t)
      throw new TypeError('Derived constructors may only return object or undefined');
    return bo(e);
  }
  function bo(e) {
    if (void 0 === e)
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e;
  }
  function mo(e) {
    return (
      (mo = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (e) {
            return e.__proto__ || Object.getPrototypeOf(e);
          }),
      mo(e)
    );
  }
  function ho(e, t, r, n, o) {
    var i = {};
    return (
      Object.keys(n).forEach(function (e) {
        i[e] = n[e];
      }),
      (i.enumerable = !!i.enumerable),
      (i.configurable = !!i.configurable),
      ('value' in i || i.initializer) && (i.writable = !0),
      (i = r
        .slice()
        .reverse()
        .reduce(function (r, n) {
          return n(e, t, r) || r;
        }, i)),
      o &&
        void 0 !== i.initializer &&
        ((i.value = i.initializer ? i.initializer.call(o) : void 0), (i.initializer = void 0)),
      void 0 === i.initializer && (Object.defineProperty(e, t, i), (i = null)),
      i
    );
  }
  var vo =
    ((ao = X.util.Debounce(750)),
    (co = X.util.Debounce(750)),
    (lo = (function (e) {
      !(function (e, t) {
        if ('function' != typeof t && null !== t)
          throw new TypeError('Super expression must either be null or a function');
        (e.prototype = Object.create(t && t.prototype, {
          constructor: { value: e, writable: !0, configurable: !0 },
        })),
          Object.defineProperty(e, 'prototype', { writable: !1 }),
          t && po(e, t);
      })(a, e);
      var t,
        r,
        n,
        o,
        i =
          ((n = a),
          (o = (function () {
            if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ('function' == typeof Proxy) return !0;
            try {
              return (
                Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0
              );
            } catch (e) {
              return !1;
            }
          })()),
          function () {
            var e,
              t = mo(n);
            if (o) {
              var r = mo(this).constructor;
              e = Reflect.construct(t, arguments, r);
            } else e = t.apply(this, arguments);
            return yo(this, e);
          });
      function a(e) {
        var t;
        return (
          (function (e, t) {
            if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
          })(this, a),
          ((t = i.call(this, e)).state = {
            isSignUp: !1,
            username: '',
            password: '',
            confirmPassword: !1,
            email: '',
            usernameIsInvalid: !1,
            passwordIsInvalid: !1,
          }),
          (t.tooglePage = t.tooglePage.bind(bo(t))),
          (t.tryAcceptEmail = t.tryAcceptEmail.bind(bo(t))),
          (t.tryAcceptPassword = t.tryAcceptPassword.bind(bo(t))),
          (t.tryAcceptPasswordRepeat = t.tryAcceptPasswordRepeat.bind(bo(t))),
          (t.tryAcceptUName = t.tryAcceptUName.bind(bo(t))),
          (t.signUp = t.signUp.bind(bo(t))),
          (t.usernameInputRef = new X.Ref()),
          (t.passwordInputRef = new X.Ref()),
          (t.validateUsername = t.validateUsername.bind(bo(t))),
          (t.validatePassword = t.validatePassword.bind(bo(t))),
          t
        );
      }
      return (
        (t = a),
        (r = [
          {
            key: 'validateUsername',
            value: function (e) {
              var t = this.usernameInputRef.instance.value;
              this.setState({ usernameIsInvalid: !Qn(t) });
            },
          },
          {
            key: 'validatePassword',
            value: function (e) {
              var t = this.passwordInputRef.instance.value;
              this.setState({ passwordIsInvalid: !Xn(t) });
            },
          },
          {
            key: 'tooglePage',
            value: function () {
              this.setState({ isSignUp: !this.state.isSignUp });
            },
          },
          {
            key: 'didMount',
            value: function () {
              var e = this.props.isSignUp;
              'boolean' == typeof e && this.setState({ isSignUp: e });
            },
          },
          { key: 'didUpdate', value: function (e) {} },
          {
            key: 'login',
            value: function (e) {
              var t = { username: this.state.username, password: this.state.password };
              '' !== t.password && '' !== t.username && this.props.login(t);
            },
          },
          {
            key: 'signUp',
            value: function (e) {
              var t = {
                email: this.state.email,
                username: this.state.username,
                password: this.state.password,
              };
              this.state.confirmPassword &&
                '' !== t.email &&
                '' !== t.password &&
                '' !== t.username &&
                this.props.signup(t);
            },
          },
          {
            key: 'tryAcceptUName',
            value: function (e) {
              var t = e.target.value;
              if (!Qn(t))
                return (
                  e.target.classList.add('input__wrong'),
                  void document
                    .getElementById('login__username-label_danger')
                    .classList.remove('invisible')
                );
              this.setState({ username: t });
            },
          },
          {
            key: 'tryAcceptEmail',
            value: function (e) {
              var t = e.target.value;
              if (
                !(function (e) {
                  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                    String(e).toLowerCase(),
                  );
                })(t)
              )
                return (
                  e.target.classList.add('input__wrong'),
                  void document
                    .getElementById('login__email-label_danger')
                    .classList.remove('invisible')
                );
              this.setState({ email: t });
            },
          },
          {
            key: 'tryAcceptPassword',
            value: function (e) {
              var t = e.target.value;
              if (!Xn(t))
                return (
                  e.target.classList.add('input__wrong'),
                  void document
                    .getElementById('login__password-label_danger')
                    .classList.remove('invisible')
                );
              this.setState({ password: t });
            },
          },
          {
            key: 'tryAcceptPasswordRepeat',
            value: function (e) {
              if (e.target.value !== this.state.password)
                return (
                  e.target.classList.add('input__wrong'),
                  document
                    .getElementById('login__password-repeat-label_danger')
                    .classList.remove('invisible'),
                  void this.setState({ confirmPassword: !1 })
                );
              this.setState({ confirmPassword: !0 });
            },
          },
          {
            key: 'clearUName',
            value: function (e) {
              e.target.classList.remove('input__wrong'),
                document.getElementById('login__username-label_danger').classList.add('invisible');
            },
          },
          {
            key: 'clearEmail',
            value: function (e) {
              e.target.classList.remove('input__wrong'),
                document.getElementById('login__email-label_danger').classList.add('invisible');
            },
          },
          {
            key: 'clearPassword',
            value: function (e) {
              e.target.classList.remove('input__wrong'),
                document.getElementById('login__password-label_danger').classList.add('invisible');
            },
          },
          {
            key: 'clearPasswordRepeat',
            value: function (e) {
              e.target.classList.remove('input__wrong'),
                document
                  .getElementById('login__password-repeat-label_danger')
                  .classList.add('invisible');
            },
          },
          {
            key: 'render',
            value: function () {
              var e = this.state,
                t = (e.usernameIsInvalid, e.passwordIsInvalid),
                r = this.state.isSignUp
                  ? X.createElement(
                      'form',
                      { class: 'text login-form' },
                      X.createElement(
                        'a',
                        { class: 'main__button', href: '/' },
                        X.createElement('div', { class: 'logo login-form__logo' }),
                      ),
                      X.createElement(
                        'div',
                        { class: 'login-form_align' },
                        X.createElement(
                          'label',
                          { htmlFor: 'username', class: 'input-label login-form__input-label' },
                          'Username:',
                        ),
                        X.createElement(uo, {
                          type: 'text',
                          placeholder: 'Username',
                          checker: Qn,
                          errorMessage:
                            'Username have to contain at 3-16 characters (digits, letters or _)',
                        }),
                      ),
                      X.createElement(
                        'div',
                        { class: 'login-form_align' },
                        X.createElement(
                          'label',
                          { htmlFor: 'password', class: 'input-label login-form__input-label' },
                          'Password:',
                        ),
                        X.createElement('input', {
                          type: 'password',
                          value: this.state.password,
                          placeholder: 'Password',
                          class: 'input-line login-form__input-line '.concat(
                            t ? 'input__wrong' : '',
                          ),
                          id: 'password',
                          ref: this.passwordInputRef,
                          onInput: this.validatePassword,
                        }),
                        X.createElement(
                          'label',
                          {
                            id: 'login__password-label_danger',
                            class:
                              'input-label login-form__input-label login-from__tooltip_danger '.concat(
                                t ? '' : 'invisible',
                              ),
                          },
                          'Password have to contain at least 6 characters (digits and letters)',
                        ),
                      ),
                      X.createElement(
                        'div',
                        { class: 'login-form_align' },
                        X.createElement('input', {
                          onclick: this.login,
                          value: 'Log in',
                          class: 'button button_blue login-form__button',
                        }),
                        X.createElement(
                          'label',
                          {
                            id: 'login__submit-label_danger',
                            class:
                              'input-label login-form__input-label login-from__common-tooltip_danger invisible',
                          },
                          'placeholder',
                        ),
                      ),
                      X.createElement(
                        'div',
                        { class: 'menu-footer login-form_align' },
                        X.createElement('div', { class: 'menu-footer__line' }),
                        X.createElement(
                          'p',
                          { class: 'menu-footer__text' },
                          "Don't have an account?",
                        ),
                        X.createElement(
                          'div',
                          {
                            onclick: this.tooglePage,
                            class: 'button button_gray menu-footer__button',
                          },
                          X.createElement('span', null, 'Sign up'),
                        ),
                      ),
                    )
                  : X.createElement(
                      'form',
                      { class: 'text login-form' },
                      X.createElement(
                        'a',
                        { class: 'main__button', href: '/' },
                        X.createElement('div', { class: 'logo login-form__logo' }),
                      ),
                      X.createElement(
                        'div',
                        { class: 'login-form_align' },
                        X.createElement(
                          'label',
                          { htmlFor: 'username', class: 'input-label login-form__input-label' },
                          'Username:',
                        ),
                        X.createElement('input', {
                          onblur: this.tryAcceptUName,
                          onfocus: this.clearUName,
                          value: this.state.username,
                          type: 'text',
                          placeholder: 'Username',
                          class: 'input-line register-form__input-line',
                          id: 'username',
                        }),
                        X.createElement(
                          'label',
                          {
                            id: 'login__username-label_danger',
                            class:
                              'input-label login-form__input-label login-from__tooltip_danger invisible',
                          },
                          'Username have to contain at least 3 characters (digits, letters or «_»)',
                        ),
                      ),
                      X.createElement(
                        'div',
                        { class: 'login-form_align' },
                        X.createElement(
                          'label',
                          { htmlFor: 'email', class: 'input-label login-form__input-label' },
                          'Email:',
                        ),
                        X.createElement('input', {
                          onblur: this.tryAcceptEmail,
                          onfocus: this.clearEmail,
                          value: this.state.email,
                          type: 'text',
                          placeholder: 'Email',
                          class: 'input-line register-form__input-line',
                          id: 'email',
                        }),
                        X.createElement(
                          'label',
                          {
                            id: 'login__email-label_danger',
                            class:
                              'input-label login-form__input-label login-from__tooltip_danger invisible',
                          },
                          'Wrong email format',
                        ),
                      ),
                      X.createElement(
                        'div',
                        { class: 'login-form_align' },
                        X.createElement(
                          'label',
                          { htmlFor: 'password', class: 'input-label login-form__input-label' },
                          'Password:',
                        ),
                        X.createElement('input', {
                          onblur: this.tryAcceptPassword,
                          onfocus: this.clearPassword,
                          value: this.state.password,
                          type: 'password',
                          placeholder: 'Password',
                          class: 'input-line register-form__input-line',
                          id: 'password',
                        }),
                        X.createElement(
                          'label',
                          {
                            id: 'login__password-label_danger',
                            class:
                              'input-label login-form__input-label login-from__tooltip_danger invisible',
                          },
                          'Password have to contain at least 6 charecters (digits and letters)',
                        ),
                      ),
                      X.createElement(
                        'div',
                        { class: 'login-form_align' },
                        X.createElement(
                          'label',
                          {
                            htmlFor: 'confirmPassword',
                            class: 'input-label login-form__input-label',
                          },
                          'Confirm password:',
                        ),
                        X.createElement('input', {
                          type: 'password',
                          onblur: this.tryAcceptPasswordRepeat,
                          onfocus: this.clearPasswordRepeat,
                          placeholder: 'Confirm Password',
                          class: 'input-line register-form__input-line',
                          id: 'confirmPassword',
                        }),
                        X.createElement(
                          'label',
                          {
                            id: 'login__password-repeat-label_danger',
                            class:
                              'input-label login-form__input-label login-from__tooltip_danger invisible',
                          },
                          'Passwords mismatch',
                        ),
                      ),
                      X.createElement(
                        'div',
                        { class: 'login-form_align' },
                        X.createElement('input', {
                          onclick: this.signUp,
                          value: 'Sign up',
                          class: 'button button_blue register-form__button',
                        }),
                        X.createElement(
                          'label',
                          {
                            id: 'register__submit-label_danger',
                            class:
                              'input-label login-form__input-label login-from__common-tooltip_danger invisible',
                          },
                          'placeholder',
                        ),
                      ),
                      X.createElement(
                        'div',
                        { class: ' menu-footer login-form_align' },
                        X.createElement('div', { class: 'menu-footer__line' }),
                        X.createElement(
                          'p',
                          { class: 'menu-footer__text' },
                          'Already have an account?',
                        ),
                        X.createElement(
                          'div',
                          {
                            onclick: this.tooglePage,
                            class: 'button button_gray menu-footer__button',
                          },
                          X.createElement('span', null, 'Log in'),
                        ),
                      ),
                    );
              return X.createElement('div', { class: 'login-page' }, r);
            },
          },
        ]) && fo(t.prototype, r),
        Object.defineProperty(t, 'prototype', { writable: !1 }),
        a
      );
    })(X.Component)),
    ho(
      lo.prototype,
      'validateUsername',
      [ao],
      Object.getOwnPropertyDescriptor(lo.prototype, 'validateUsername'),
      lo.prototype,
    ),
    ho(
      lo.prototype,
      'validatePassword',
      [co],
      Object.getOwnPropertyDescriptor(lo.prototype, 'validatePassword'),
      lo.prototype,
    ),
    lo);
  const go = Gt(
    function (e) {
      return { user: e.Auth ? e.Auth.user : null };
    },
    function (e) {
      return {
        login: function (t) {
          var r,
            n = t.username,
            o = t.email,
            i = t.password;
          e(
            ((r = { username: n, email: o, password: i }),
            function (e) {
              Kn.login(r).then(function (t) {
                e({ type: 'logout/user', payload: t });
              });
            }),
          );
        },
        signup: function (t) {
          var r,
            n = t.username,
            o = t.email,
            i = t.password;
          e(
            ((r = { username: n, email: o, password: i }),
            function (e) {
              Kn.signup(r).then(function (t) {
                e({ type: 'signup/user', payload: t });
              });
            }),
          );
        },
      };
    },
  )(vo);
  function _o(e) {
    return (
      (_o =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                'function' == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? 'symbol'
                : typeof e;
            }),
      _o(e)
    );
  }
  function wo(e, t) {
    for (var r = 0; r < t.length; r++) {
      var n = t[r];
      (n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        'value' in n && (n.writable = !0),
        Object.defineProperty(e, n.key, n);
    }
  }
  function Oo(e, t) {
    return (
      (Oo =
        Object.setPrototypeOf ||
        function (e, t) {
          return (e.__proto__ = t), e;
        }),
      Oo(e, t)
    );
  }
  function Eo(e, t) {
    if (t && ('object' === _o(t) || 'function' == typeof t)) return t;
    if (void 0 !== t)
      throw new TypeError('Derived constructors may only return object or undefined');
    return Po(e);
  }
  function Po(e) {
    if (void 0 === e)
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e;
  }
  function jo(e) {
    return (
      (jo = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (e) {
            return e.__proto__ || Object.getPrototypeOf(e);
          }),
      jo(e)
    );
  }
  var ko = (function (e) {
    !(function (e, t) {
      if ('function' != typeof t && null !== t)
        throw new TypeError('Super expression must either be null or a function');
      (e.prototype = Object.create(t && t.prototype, {
        constructor: { value: e, writable: !0, configurable: !0 },
      })),
        Object.defineProperty(e, 'prototype', { writable: !1 }),
        t && Oo(e, t);
    })(a, e);
    var t,
      r,
      n,
      o,
      i =
        ((n = a),
        (o = (function () {
          if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ('function' == typeof Proxy) return !0;
          try {
            return (
              Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0
            );
          } catch (e) {
            return !1;
          }
        })()),
        function () {
          var e,
            t = jo(n);
          if (o) {
            var r = jo(this).constructor;
            e = Reflect.construct(t, arguments, r);
          } else e = t.apply(this, arguments);
          return Eo(this, e);
        });
    function a(e) {
      var t;
      return (
        (function (e, t) {
          if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
        })(this, a),
        (function (e, t, r) {
          t in e
            ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = r);
        })(Po((t = i.call(this, e))), 'render', function () {
          var e = t.props,
            r = e.num,
            n = e.cover,
            o = e.listenedCnt,
            i = e.name,
            a = e.duration,
            c = function (e) {
              var t = Math.trunc(e).toString();
              return e >= 10 ? t : '0'.concat(t);
            },
            l = t.state.isLiked ? 'fa-solid' : 'fa-regular';
          return X.createElement(
            'div',
            { class: 'text artist-track' },
            X.createElement(
              'div',
              { class: 'artist-track__info' },
              r,
              X.createElement('img', { class: 'artist-track__cover', src: n }),
              X.createElement('div', { class: 'artist-track__name' }, i),
            ),
            X.createElement(
              'div',
              { class: 'artist-track__meta' },
              X.createElement(
                'div',
                { class: 'artist-track__listened' },
                o,
                X.createElement('div', { class: 'listened__dot' }),
              ),
              X.createElement('div', {
                onclick: t.toogleLike,
                class: 'liked-icon '.concat(l, ' fa-heart'),
              }),
              X.createElement(
                'div',
                { class: 'artist-track__duration' },
                ''.concat(c(a / 60), ':').concat(c(a % 60)),
              ),
            ),
          );
        }),
        (t.state = { isLiked: !1 }),
        (t.toogleLike = t.toogleLike.bind(Po(t))),
        t
      );
    }
    return (
      (t = a),
      (r = [
        {
          key: 'toogleLike',
          value: function () {
            this.setState({ isLiked: !this.state.isLiked });
          },
        },
        {
          key: 'didMount',
          value: function () {
            var e = this.props.isLiked;
            this.setState({ isLiked: e });
          },
        },
      ]) && wo(t.prototype, r),
      Object.defineProperty(t, 'prototype', { writable: !1 }),
      a
    );
  })(G);
  function So(e) {
    return (
      (So =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                'function' == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? 'symbol'
                : typeof e;
            }),
      So(e)
    );
  }
  function Ro(e, t) {
    if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
  }
  function To(e, t) {
    return (
      (To =
        Object.setPrototypeOf ||
        function (e, t) {
          return (e.__proto__ = t), e;
        }),
      To(e, t)
    );
  }
  function xo(e, t) {
    if (t && ('object' === So(t) || 'function' == typeof t)) return t;
    if (void 0 !== t)
      throw new TypeError('Derived constructors may only return object or undefined');
    return Ao(e);
  }
  function Ao(e) {
    if (void 0 === e)
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e;
  }
  function Co(e) {
    return (
      (Co = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (e) {
            return e.__proto__ || Object.getPrototypeOf(e);
          }),
      Co(e)
    );
  }
  function No(e, t, r) {
    return (
      t in e
        ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 })
        : (e[t] = r),
      e
    );
  }
  var Do = (function (e) {
    !(function (e, t) {
      if ('function' != typeof t && null !== t)
        throw new TypeError('Super expression must either be null or a function');
      (e.prototype = Object.create(t && t.prototype, {
        constructor: { value: e, writable: !0, configurable: !0 },
      })),
        Object.defineProperty(e, 'prototype', { writable: !1 }),
        t && To(e, t);
    })(i, e);
    var t,
      r,
      n,
      o =
        ((r = i),
        (n = (function () {
          if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ('function' == typeof Proxy) return !0;
          try {
            return (
              Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0
            );
          } catch (e) {
            return !1;
          }
        })()),
        function () {
          var e,
            t = Co(r);
          if (n) {
            var o = Co(this).constructor;
            e = Reflect.construct(t, arguments, o);
          } else e = t.apply(this, arguments);
          return xo(this, e);
        });
    function i() {
      var e;
      Ro(this, i);
      for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++) r[n] = arguments[n];
      return (
        No(Ao((e = o.call.apply(o, [this].concat(r)))), 'render', function () {
          var t = e.props.playlist;
          console.log('playlist:', t);
          var r = 1;
          return X.createElement(
            'div',
            { class: 'artist-playlist' },
            t
              ? t.map(function (e) {
                  return X.createElement(ko, {
                    num: r++,
                    cover: se + e.cover,
                    name: e.title,
                    listenedCnt: e.listenings,
                    isLiked: !1,
                    duration: e.duration,
                  });
                })
              : '',
          );
        }),
        e
      );
    }
    return (t = i), Object.defineProperty(t, 'prototype', { writable: !1 }), t;
  })(G);
  function Io(e) {
    return (
      (Io =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                'function' == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? 'symbol'
                : typeof e;
            }),
      Io(e)
    );
  }
  function Bo(e, t) {
    for (var r = 0; r < t.length; r++) {
      var n = t[r];
      (n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        'value' in n && (n.writable = !0),
        Object.defineProperty(e, n.key, n);
    }
  }
  function Lo(e, t) {
    return (
      (Lo =
        Object.setPrototypeOf ||
        function (e, t) {
          return (e.__proto__ = t), e;
        }),
      Lo(e, t)
    );
  }
  function Uo(e, t) {
    if (t && ('object' === Io(t) || 'function' == typeof t)) return t;
    if (void 0 !== t)
      throw new TypeError('Derived constructors may only return object or undefined');
    return Mo(e);
  }
  function Mo(e) {
    if (void 0 === e)
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e;
  }
  function Vo(e) {
    return (
      (Vo = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (e) {
            return e.__proto__ || Object.getPrototypeOf(e);
          }),
      Vo(e)
    );
  }
  function zo(e, t, r) {
    return (
      t in e
        ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 })
        : (e[t] = r),
      e
    );
  }
  var Fo = (function (e) {
    !(function (e, t) {
      if ('function' != typeof t && null !== t)
        throw new TypeError('Super expression must either be null or a function');
      (e.prototype = Object.create(t && t.prototype, {
        constructor: { value: e, writable: !0, configurable: !0 },
      })),
        Object.defineProperty(e, 'prototype', { writable: !1 }),
        t && Lo(e, t);
    })(a, e);
    var t,
      r,
      n,
      o,
      i =
        ((n = a),
        (o = (function () {
          if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ('function' == typeof Proxy) return !0;
          try {
            return (
              Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0
            );
          } catch (e) {
            return !1;
          }
        })()),
        function () {
          var e,
            t = Vo(n);
          if (o) {
            var r = Vo(this).constructor;
            e = Reflect.construct(t, arguments, r);
          } else e = t.apply(this, arguments);
          return Uo(this, e);
        });
    function a(e) {
      var t;
      return (
        (function (e, t) {
          if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
        })(this, a),
        zo(Mo((t = i.call(this, e))), 'render', function () {
          var e = t.context.params.slug;
          if (!t.props.artist || !t.props.popularTracks)
            return X.createElement('div', { class: 'artist-page' });
          var r = t.props.artist[e] ? t.props.artist[e] : null,
            n = t.props.popularTracks[e] ? t.props.popularTracks[e] : null;
          return r && n
            ? X.createElement(
                'div',
                { class: 'artist-page' },
                X.createElement(
                  'div',
                  {
                    class: 'artist-page__main',
                    style: { 'background-image': 'url('.concat(se + r.cover, ')') },
                  },
                  X.createElement(yr, { isAuthorized: !0 }),
                  X.createElement(
                    'div',
                    { class: 'artist-page__artist' },
                    X.createElement(
                      'div',
                      { class: 'artist__related' },
                      X.createElement('div', { class: 'text related__title' }, 'Related artists:'),
                      X.createElement(
                        'span',
                        { class: 'text related__names' },
                        'Lana Del Rey, Moby',
                      ),
                    ),
                    X.createElement(
                      'div',
                      { class: 'text artist__main' },
                      'Artist',
                      X.createElement('div', { class: 'artist__name' }, r.name),
                      X.createElement(
                        'div',
                        { class: 'artist__controls' },
                        X.createElement(
                          'div',
                          { class: 'button controls__btn-play' },
                          X.createElement('div', { class: 'text' }, 'Play'),
                        ),
                        X.createElement(
                          'div',
                          { class: 'text controls__likes' },
                          X.createElement('div', {
                            onclick: t.setLikeToArtist,
                            class: ''.concat(
                              t.state.isLiked ? 'fa-solid' : 'fa-regular',
                              ' fa-heart likes__icon',
                            ),
                          }),
                          X.createElement('div', { class: 'likes__num' }, t.state.albumLikes),
                        ),
                      ),
                    ),
                  ),
                ),
                X.createElement(
                  'div',
                  { class: 'artist-page__popular' },
                  X.createElement('div', { class: 'text artist__title' }, 'Popular songs'),
                  X.createElement(Do, { playlist: n }),
                ),
                X.createElement(
                  'div',
                  { class: 'artist-page__albums' },
                  X.createElement('div', { class: 'text artist__title' }, 'Albums'),
                  X.createElement(
                    wr,
                    null,
                    r.albums
                      ? r.albums.map(function (e) {
                          return X.createElement(Sr, {
                            cover: se + e.cover,
                            title: e.title,
                            artist: e.artist,
                          });
                        })
                      : '',
                  ),
                ),
              )
            : X.createElement('div', { class: 'artist-page' });
        }),
        console.log(t.props),
        (t.getArtist = t.getArtist.bind(Mo(t))),
        (t.getTracks = t.getTracks.bind(Mo(t))),
        (t.state = { albumLikes: 12511, isLiked: !1 }),
        (t.setLikeToArtist = t.setLikeToArtist.bind(Mo(t))),
        t
      );
    }
    return (
      (t = a),
      (r = [
        {
          key: 'didMount',
          value: function () {
            this.getArtist(), this.getTracks();
          },
        },
        {
          key: 'didUpdate',
          value: function () {
            this.getArtist(), this.getTracks();
          },
        },
        {
          key: 'getArtist',
          value: function () {
            var e = this.context.params.slug;
            (this.props.artist && this.props.artist[e]) || this.props.getArtist(e);
          },
        },
        {
          key: 'getTracks',
          value: function () {
            var e = this.context.params.slug;
            (this.props.popularTracks && this.props.popularTracks[e]) ||
              this.props.getArtistPopularTracks(e);
          },
        },
        {
          key: 'setLikeToArtist',
          value: function () {
            var e = this.state.albumLikes;
            e = this.state.isLiked ? e - 1 : e + 1;
            var t = !this.state.isLiked;
            this.setState({ albumLikes: e, isLiked: t });
          },
        },
      ]) && Bo(t.prototype, r),
      Object.defineProperty(t, 'prototype', { writable: !1 }),
      a
    );
  })(X.Component);
  zo(Fo, 'contextType', Le);
  const Wo = Gt(
    function (e) {
      return {
        artist: e.artist ? e.artist : null,
        popularTracks: e.artistPopularTracks ? e.artistPopularTracks : null,
      };
    },
    function (e) {
      return {
        getArtist: function (t) {
          e(
            (function (e) {
              return function (t) {
                Fr.getArtistById(e).then(function (e) {
                  t({ type: 'get/artist', payload: e });
                });
              };
            })(t),
          );
        },
        getArtistPopularTracks: function (t) {
          e(
            (function (e) {
              return function (t) {
                Fr.getArtistPopularById(e).then(function (e) {
                  t({ type: 'get/artist/popular', payload: e });
                });
              };
            })(t),
          );
        },
      };
    },
  )(Fo);
  function Ho(e) {
    return (
      (Ho =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                'function' == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? 'symbol'
                : typeof e;
            }),
      Ho(e)
    );
  }
  function qo(e, t) {
    for (var r = 0; r < t.length; r++) {
      var n = t[r];
      (n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        'value' in n && (n.writable = !0),
        Object.defineProperty(e, n.key, n);
    }
  }
  function $o(e, t) {
    return (
      ($o =
        Object.setPrototypeOf ||
        function (e, t) {
          return (e.__proto__ = t), e;
        }),
      $o(e, t)
    );
  }
  function Zo(e, t) {
    if (t && ('object' === Ho(t) || 'function' == typeof t)) return t;
    if (void 0 !== t)
      throw new TypeError('Derived constructors may only return object or undefined');
    return Go(e);
  }
  function Go(e) {
    if (void 0 === e)
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e;
  }
  function Jo(e) {
    return (
      (Jo = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (e) {
            return e.__proto__ || Object.getPrototypeOf(e);
          }),
      Jo(e)
    );
  }
  var Yo = (function (e) {
    !(function (e, t) {
      if ('function' != typeof t && null !== t)
        throw new TypeError('Super expression must either be null or a function');
      (e.prototype = Object.create(t && t.prototype, {
        constructor: { value: e, writable: !0, configurable: !0 },
      })),
        Object.defineProperty(e, 'prototype', { writable: !1 }),
        t && $o(e, t);
    })(a, e);
    var t,
      r,
      n,
      o,
      i =
        ((n = a),
        (o = (function () {
          if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ('function' == typeof Proxy) return !0;
          try {
            return (
              Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0
            );
          } catch (e) {
            return !1;
          }
        })()),
        function () {
          var e,
            t = Jo(n);
          if (o) {
            var r = Jo(this).constructor;
            e = Reflect.construct(t, arguments, r);
          } else e = t.apply(this, arguments);
          return Zo(this, e);
        });
    function a(e) {
      var t;
      return (
        (function (e, t) {
          if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
        })(this, a),
        (function (e, t, r) {
          t in e
            ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = r);
        })(Go((t = i.call(this, e))), 'render', function () {
          return (
            t.props.isAuthorized,
            X.createElement(
              'div',
              { class: 'personal-page' },
              X.createElement(yr, { isAuthorized: !0 }),
              X.createElement(
                'form',
                { onsubmit: t.submitForm, class: 'text personal-page__settings-form' },
                X.createElement('div', { class: 'settings-form__title' }, 'Settings'),
                X.createElement(
                  'div',
                  { class: 'settings-form__form' },
                  X.createElement(
                    'label',
                    { htmlFor: 'username', class: 'input-label form__username-label' },
                    'New username:',
                  ),
                  X.createElement('input', {
                    onblur: t.tryAcceptUName,
                    value: t.state.username,
                    onfocus: t.clearUName,
                    type: 'text',
                    placeholder: 'Username',
                    class: 'input-line form__username-label',
                    id: 'username',
                  }),
                  X.createElement(
                    'label',
                    {
                      id: 'form__username-label_danger',
                      class: 'input-label from__tooltip_danger invisible',
                    },
                    'Username have to contain at least 3 charecters (digits, letters or «_»)',
                  ),
                ),
                X.createElement(
                  'div',
                  { class: 'settings-form__form' },
                  X.createElement(
                    'label',
                    { htmlFor: 'password', class: 'input-label form__password-label' },
                    'New password:',
                  ),
                  X.createElement('input', {
                    onblur: t.tryAcceptPassword,
                    value: t.state.password,
                    onfocus: t.clearPassword,
                    type: 'password',
                    placeholder: 'Password',
                    class: 'input-line form__password-input',
                    id: 'password',
                  }),
                  X.createElement(
                    'label',
                    {
                      id: 'form__password-label_danger',
                      class: 'input-label from__tooltip_danger invisible',
                    },
                    'Password have to contain at least 6 charecters (digits and letters)',
                  ),
                ),
                X.createElement(
                  'div',
                  { class: 'settings-form__form' },
                  X.createElement(
                    'label',
                    { htmlFor: 'confirm', class: 'input-label form__confirm-label' },
                    'Confirm password:',
                  ),
                  X.createElement('input', {
                    onblur: t.tryAcceptPasswordRepeat,
                    onfocus: t.clearPasswordRepeat,
                    type: 'password',
                    placeholder: 'Confirm',
                    class: 'input-line form__confirm-label',
                    id: 'confirm',
                  }),
                  X.createElement(
                    'label',
                    {
                      id: 'form__confirm-label_danger',
                      class: 'input-label from__tooltip_danger invisible',
                    },
                    'Passwords are different!',
                  ),
                ),
                X.createElement(
                  'div',
                  { class: 'settings-form__form' },
                  X.createElement(
                    'label',
                    { htmlFor: 'avatar', class: 'input-label form__avatar-label' },
                    'Load new avatar:',
                  ),
                  X.createElement(
                    'label',
                    {
                      class: 'form__upload',
                      style: { 'background-image': 'url('.concat(ar, ')') },
                    },
                    X.createElement('input', {
                      onchange: t.tryAcceptAvatar,
                      onfocus: t.clearAvatar,
                      type: 'file',
                      placeholder: 'Avatar',
                      class: 'input-line form__avatar-label',
                      id: 'avatar',
                    }),
                  ),
                  X.createElement(
                    'label',
                    {
                      id: 'form__avatar-label_danger',
                      class: 'input-label from__tooltip_danger invisible',
                    },
                    'It must be .png!',
                  ),
                ),
                X.createElement(
                  'div',
                  { class: 'settings-form__form' },
                  X.createElement('input', {
                    type: 'submit',
                    value: 'Submit',
                    class: 'text form__submit-button',
                  }),
                ),
              ),
            )
          );
        }),
        (t.state = {
          username: '',
          password: '',
          confirmPassword: !1,
          userNameChecked: !1,
          passwordChecked: !1,
          fileLoaded: !1,
        }),
        (t.tryAcceptPassword = t.tryAcceptPassword.bind(Go(t))),
        (t.tryAcceptPasswordRepeat = t.tryAcceptPasswordRepeat.bind(Go(t))),
        (t.tryAcceptUName = t.tryAcceptUName.bind(Go(t))),
        (t.tryAcceptAvatar = t.tryAcceptAvatar.bind(Go(t))),
        (t.submitForm = t.submitForm.bind(Go(t))),
        t
      );
    }
    return (
      (t = a),
      (r = [
        {
          key: 'submitForm',
          value: function (e) {
            if (
              (e.preventDefault(),
              this.state.confirmPassword &&
                this.state.userNameChecked &&
                this.state.passwordChecked &&
                this.state.fileLoaded)
            ) {
              var t = new FormData();
              t.append('username', e.target.username.value),
                t.append('password', e.target.password.value),
                t.append('avatar', e.target.avatar.files[0]),
                this.props.updateUser(t);
            }
          },
        },
        {
          key: 'tryAcceptUName',
          value: function (e) {
            var t = e.target.value;
            if (!Qn(t))
              return (
                e.target.classList.add('input__wrong'),
                document
                  .getElementById('form__username-label_danger')
                  .classList.remove('invisible'),
                void this.setState({ userNameChecked: !1, password })
              );
            this.setState({ userNameChecked: !0, username: t });
          },
        },
        {
          key: 'tryAcceptPassword',
          value: function (e) {
            var t = e.target.value;
            if (!Xn(t))
              return (
                e.target.classList.add('input__wrong'),
                document
                  .getElementById('form__password-label_danger')
                  .classList.remove('invisible'),
                void this.setState({ passwordChecked: !1, password: t })
              );
            this.setState({ passwordChecked: !0, password: t });
          },
        },
        {
          key: 'tryAcceptPasswordRepeat',
          value: function (e) {
            if (e.target.value !== this.state.password)
              return (
                e.target.classList.add('input__wrong'),
                document.getElementById('form__confirm-label_danger').classList.remove('invisible'),
                void this.setState({ confirmPassword: !1 })
              );
            this.setState({ confirmPassword: !0 });
          },
        },
        {
          key: 'tryAcceptAvatar',
          value: function (e) {
            var t = e.target.files[0];
            t &&
              ('image/png' !== t.type &&
                (e.target.classList.add('input__wrong'),
                document.getElementById('form__avatar-label_danger').classList.remove('invisible'),
                this.setState({ fileLoaded: !1 })),
              this.setState({ fileLoaded: !0 }));
          },
        },
        {
          key: 'clearUName',
          value: function (e) {
            e.target.classList.remove('input__wrong'),
              document.getElementById('form__username-label_danger').classList.add('invisible');
          },
        },
        {
          key: 'clearPassword',
          value: function (e) {
            e.target.classList.remove('input__wrong'),
              document.getElementById('form__password-label_danger').classList.add('invisible');
          },
        },
        {
          key: 'clearPasswordRepeat',
          value: function (e) {
            e.target.classList.remove('input__wrong'),
              document.getElementById('form__confirm-label_danger').classList.add('invisible');
          },
        },
        {
          key: 'clearAvatar',
          value: function (e) {
            e.target.classList.remove('input__wrong'),
              document.getElementById('form__avatar-label_danger').classList.add('invisible');
          },
        },
      ]) && qo(t.prototype, r),
      Object.defineProperty(t, 'prototype', { writable: !1 }),
      a
    );
  })(X.Component);
  const Ko = Gt(
    function (e) {
      return {};
    },
    function (e) {
      return {
        updateUser: function (t) {
          e(
            (function (e) {
              return function (t) {
                Kn.updateUser(e).then(function (e) {
                  t({ type: 'update/user', payload: e });
                });
              };
            })(t),
          );
        },
      };
    },
  )(Yo);
  function Xo(e) {
    return (
      (Xo =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                'function' == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? 'symbol'
                : typeof e;
            }),
      Xo(e)
    );
  }
  function Qo(e, t) {
    if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
  }
  function ei(e, t) {
    for (var r = 0; r < t.length; r++) {
      var n = t[r];
      (n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        'value' in n && (n.writable = !0),
        Object.defineProperty(e, n.key, n);
    }
  }
  function ti(e, t) {
    return (
      (ti =
        Object.setPrototypeOf ||
        function (e, t) {
          return (e.__proto__ = t), e;
        }),
      ti(e, t)
    );
  }
  function ri(e, t) {
    if (t && ('object' === Xo(t) || 'function' == typeof t)) return t;
    if (void 0 !== t)
      throw new TypeError('Derived constructors may only return object or undefined');
    return (function (e) {
      if (void 0 === e)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return e;
    })(e);
  }
  function ni(e) {
    return (
      (ni = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (e) {
            return e.__proto__ || Object.getPrototypeOf(e);
          }),
      ni(e)
    );
  }
  var oi = new _n(
      un,
      [
        function (e) {
          return function (t) {
            return function (r) {
              console.log('action', r), t(r), console.log('state', e.getState());
            };
          };
        },
        function (e) {
          return function (t) {
            return function (r) {
              return 'function' == typeof r ? r(t, e.getState()) : t(r);
            };
          };
        },
      ],
      {},
    ),
    ii = (function (e) {
      !(function (e, t) {
        if ('function' != typeof t && null !== t)
          throw new TypeError('Super expression must either be null or a function');
        (e.prototype = Object.create(t && t.prototype, {
          constructor: { value: e, writable: !0, configurable: !0 },
        })),
          Object.defineProperty(e, 'prototype', { writable: !1 }),
          t && ti(e, t);
      })(a, e);
      var t,
        r,
        n,
        o,
        i =
          ((n = a),
          (o = (function () {
            if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ('function' == typeof Proxy) return !0;
            try {
              return (
                Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0
              );
            } catch (e) {
              return !1;
            }
          })()),
          function () {
            var e,
              t = ni(n);
            if (o) {
              var r = ni(this).constructor;
              e = Reflect.construct(t, arguments, r);
            } else e = t.apply(this, arguments);
            return ri(this, e);
          });
      function a() {
        return Qo(this, a), i.apply(this, arguments);
      }
      return (
        (t = a),
        (r = [
          {
            key: 'render',
            value: function () {
              return X.createElement(
                Zn,
                null,
                X.createElement(
                  Zt.Provider,
                  { value: oi },
                  X.createElement(
                    Ln,
                    null,
                    X.createElement(
                      Sn,
                      { exact: !0, to: '/login' },
                      X.createElement(go, { isSignup: !1 }),
                    ),
                    X.createElement(
                      Sn,
                      { exact: !0, to: '/signup' },
                      X.createElement(go, { isSignup: !0 }),
                    ),
                    X.createElement(
                      Sn,
                      { to: '/' },
                      X.createElement(ir, {
                        isAuthorized: !0,
                        content: X.createElement(
                          Ln,
                          null,
                          X.createElement(
                            Sn,
                            { to: '', exact: !0 },
                            X.createElement(on, { isAuthorized: !0 }),
                          ),
                          X.createElement(
                            Sn,
                            { to: '/artist/:slug' },
                            X.createElement(Wo, { isAuthorized: !0 }),
                          ),
                          X.createElement(Sn, { to: '/settings' }, X.createElement(Ko, null)),
                        ),
                      }),
                    ),
                  ),
                ),
              );
            },
          },
        ]) && ei(t.prototype, r),
        Object.defineProperty(t, 'prototype', { writable: !1 }),
        a
      );
    })(X.Component);
  Kn.getCSRFToken().then(function () {
    X.render(X.createElement(ii, null), document.getElementById('root'));
  });
})();
