(() => {
  'use strict';
  var t = {
      d: (e, r) => {
        for (var n in r)
          t.o(r, n) && !t.o(e, n) && Object.defineProperty(e, n, { enumerable: !0, get: r[n] });
      },
      o: (t, e) => Object.prototype.hasOwnProperty.call(t, e),
      r: (t) => {
        'undefined' != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
          Object.defineProperty(t, '__esModule', { value: !0 });
      },
      p: '/',
    },
    e = {};
  t.r(e), t.d(e, { Debounce: () => x, zip: () => D });
  var r = {};
  t.r(r),
    t.d(r, {
      Component: () => J,
      Fragment: () => l,
      Ref: () => K,
      VirtualElement: () => a,
      createElement: () => k,
      render: () => E,
      util: () => e,
    }),
    Symbol('component'),
    Symbol('virtualElement');
  var n = Symbol('handlers');
  function o(t, e) {
    (null == e || e > t.length) && (e = t.length);
    for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
    return n;
  }
  function i(t, e) {
    for (var r = 0; r < e.length; r++) {
      var n = e[r];
      (n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        'value' in n && (n.writable = !0),
        Object.defineProperty(t, n.key, n);
    }
  }
  var a = (function () {
    function t(e, r, n, i, a) {
      var c,
        u = this;
      !(function (t, e) {
        if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
      })(this, t),
        (this.type = e),
        (this.props = r),
        (this.key = i),
        (this.children =
          (function (t) {
            if (Array.isArray(t)) return o(t);
          })((c = n)) ||
          (function (t) {
            if (
              ('undefined' != typeof Symbol && null != t[Symbol.iterator]) ||
              null != t['@@iterator']
            )
              return Array.from(t);
          })(c) ||
          (function (t, e) {
            if (t) {
              if ('string' == typeof t) return o(t, e);
              var r = Object.prototype.toString.call(t).slice(8, -1);
              return (
                'Object' === r && t.constructor && (r = t.constructor.name),
                'Map' === r || 'Set' === r
                  ? Array.from(t)
                  : 'Arguments' === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                  ? o(t, e)
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
        this.children.forEach(function (e, r) {
          e instanceof t && ((e.parent = u), (e.pos = r));
        });
    }
    var e, r;
    return (
      (e = t),
      (r = [
        {
          key: 'destruct',
          value: function () {
            var t,
              e = this,
              r = null === (t = this.domNode) || void 0 === t ? void 0 : t[n];
            null == r ||
              r.forEach(function (t) {
                var r,
                  n = t.eventName,
                  o = t.handler,
                  i = t.useCapture;
                null === (r = e.domNode) || void 0 === r || r.removeEventListener(n, o, i);
              });
          },
        },
      ]) && i(e.prototype, r),
      Object.defineProperty(e, 'prototype', { writable: !1 }),
      t
    );
  })();
  function c(t, e) {
    for (var r = 0; r < e.length; r++) {
      var n = e[r];
      (n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        'value' in n && (n.writable = !0),
        Object.defineProperty(t, n.key, n);
    }
  }
  function u(t, e, r) {
    return (
      e && c(t.prototype, e),
      r && c(t, r),
      Object.defineProperty(t, 'prototype', { writable: !1 }),
      t
    );
  }
  var l = u(function t() {
    !(function (t, e) {
      if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
    })(this, t);
  });
  function s(t, e) {
    for (var r = 0; r < e.length; r++) {
      var n = e[r];
      (n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        'value' in n && (n.writable = !0),
        Object.defineProperty(t, n.key, n);
    }
  }
  var f = (function () {
    function t(e, r) {
      !(function (t, e) {
        if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
      })(this, t),
        (this.data = e),
        (this.domNode = null != r ? r : null);
    }
    var e, r;
    return (
      (e = t),
      (r = [
        {
          key: 'toString',
          value: function () {
            return this.data;
          },
        },
      ]) && s(e.prototype, r),
      Object.defineProperty(e, 'prototype', { writable: !1 }),
      t
    );
  })();
  function p(t, e) {
    var r = Object.keys(t);
    if (Object.getOwnPropertySymbols) {
      var n = Object.getOwnPropertySymbols(t);
      e &&
        (n = n.filter(function (e) {
          return Object.getOwnPropertyDescriptor(t, e).enumerable;
        })),
        r.push.apply(r, n);
    }
    return r;
  }
  function y(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = null != arguments[e] ? arguments[e] : {};
      e % 2
        ? p(Object(r), !0).forEach(function (e) {
            d(t, e, r[e]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r))
        : p(Object(r)).forEach(function (e) {
            Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(r, e));
          });
    }
    return t;
  }
  function d(t, e, r) {
    return (
      e in t
        ? Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 })
        : (t[e] = r),
      t
    );
  }
  function b(t, e) {
    return (
      (function (t) {
        if (Array.isArray(t)) return t;
      })(t) ||
      (function (t, e) {
        var r =
          null == t
            ? null
            : ('undefined' != typeof Symbol && t[Symbol.iterator]) || t['@@iterator'];
        if (null != r) {
          var n,
            o,
            i = [],
            a = !0,
            c = !1;
          try {
            for (
              r = r.call(t);
              !(a = (n = r.next()).done) && (i.push(n.value), !e || i.length !== e);
              a = !0
            );
          } catch (t) {
            (c = !0), (o = t);
          } finally {
            try {
              a || null == r.return || r.return();
            } finally {
              if (c) throw o;
            }
          }
          return i;
        }
      })(t, e) ||
      (function (t, e) {
        if (t) {
          if ('string' == typeof t) return h(t, e);
          var r = Object.prototype.toString.call(t).slice(8, -1);
          return (
            'Object' === r && t.constructor && (r = t.constructor.name),
            'Map' === r || 'Set' === r
              ? Array.from(t)
              : 'Arguments' === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
              ? h(t, e)
              : void 0
          );
        }
      })(t, e) ||
      (function () {
        throw new TypeError(
          'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
        );
      })()
    );
  }
  function h(t, e) {
    (null == e || e > t.length) && (e = t.length);
    for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
    return n;
  }
  var m = 'capture';
  function v(t) {
    return t.children.every(function (t) {
      return t instanceof a && null != t.key;
    });
  }
  function g(t) {
    var e = [],
      r = [],
      n = 0;
    for (
      t instanceof a ? (e.push(t), r.push(0)) : null == t || t.domNode.remove();
      e.length > 0;

    ) {
      var o = e[e.length - 1],
        i = r[r.length - 1],
        c = !0;
      if (n <= i)
        for (var u = o.children.length - 1; u >= 0; u -= 1) {
          var l = o.children[u];
          l instanceof a ? ((c = !1), e.push(l), r.push(i + 1)) : l.domNode.remove();
        }
      if (n > i || c) {
        var s,
          f = e.pop();
        r.pop(),
          f.component && (f.component.willUmount(), f.component.destruct()),
          f.destruct(),
          null === (s = f.domNode) || void 0 === s || s.remove();
      }
      n = i;
    }
  }
  function w(t, e, r) {
    var o = y(y({}, e), r);
    Object.keys(o).forEach(function (o) {
      !(function (t, e, r, o) {
        var i = e.toLowerCase();
        if (i.startsWith('on')) {
          var a = i.slice('on'.length),
            c = a.endsWith(m),
            u = c ? a.slice(0, a.length - m.length) : a;
          if (r !== o) {
            var l,
              s = t[n],
              f = null === (l = s.get(a)) || void 0 === l ? void 0 : l.handler;
            f && t.removeEventListener(u, f, c),
              s.delete(a),
              o &&
                (s.set(a, { eventName: u, handler: o, useCapture: c }),
                t.addEventListener(u, o, c));
          }
        } else if ('style' !== e) r !== o && (o ? t.setAttribute(e, o) : t.removeAttribute(e));
        else {
          var p = Object.entries(o)
            .filter(function (t) {
              return b(t, 1)[0];
            })
            .map(function (t) {
              var e = b(t, 2),
                r = e[0],
                n = e[1];
              return ''.concat(r, ': ').concat(n, ';');
            })
            .join(' ');
          p !== t.style.cssText && (t.style.cssText = p);
        }
      })(t, o, e[o], r[o]);
    });
  }
  function _(t) {
    var e = t.parentDomNode,
      r = t.leftSibling,
      o = t.oldVNode,
      i = t.newVNode,
      c = t.commitChangesStack,
      u = null;
    if (null != i)
      if (i instanceof a && 'function' == typeof i.type)
        if (i.type === l) {
          var s = [],
            p = r;
          o instanceof a && o.type === l ? (s = o.children) : g(o),
            s.forEach(function (t, r) {
              var n;
              p = _({
                parentDomNode: e,
                leftSibling: p,
                oldVNode: t,
                newVNode: null !== (n = i.children[r]) && void 0 !== n ? n : null,
                commitChangesStack: c,
              });
            }),
            i.children.slice(s.length).forEach(function (t) {
              p = _({
                parentDomNode: e,
                leftSibling: p,
                oldVNode: null,
                newVNode: t,
                commitChangesStack: c,
              });
            }),
            (u = p);
        } else {
          var d,
            b = o,
            h = !1;
          if (o instanceof a && null != o.component)
            if (((d = o.component), Object.getPrototypeOf(d).constructor === i.type)) {
              h = !0;
              var m = d.props;
              d.setProps(
                y(
                  y({}, i.props),
                  {},
                  { ref: i.ref, parentDomNode: e, leftSibling: r, vNode: i, children: i.children },
                ),
              );
              var O = d.makeSnapshot(m, d.state);
              c.push(function () {
                return d.didUpdate(O);
              });
            } else g(o), (b = null);
          h ||
            ((d = new i.type(
              y(
                y({}, i.props),
                {},
                { ref: i.ref, parentDomNode: e, leftSibling: r, vNode: i, children: i.children },
              ),
            )),
            c.push(function () {
              return d.didMount();
            })),
            (d.children = i.children);
          var E = d.renderAndCopy(),
            j = new a(l, {}, [E]);
          (j.component = d),
            (j.parent = i.parent),
            (j.pos = i.pos),
            (d.props.vNode = j),
            null != j.parent && null !== j.pos && (j.parent.children[j.pos] = j),
            (u = _({
              parentDomNode: e,
              leftSibling: r,
              newVNode: j,
              oldVNode: b,
              commitChangesStack: c,
            }));
        }
      else if (null == o) {
        var P,
          k = e;
        if (
          (i instanceof f
            ? ((P = document.createTextNode(i.data)), (i.domNode = P))
            : ((P = document.createElement(i.type)),
              (i.domNode = P),
              (P[n] = new Map()),
              null != i.ref && (i.ref.instance = i.domNode),
              w(i.domNode, {}, i.props),
              (k = P)),
          (function (t, e, r) {
            null == r
              ? t.prepend(e)
              : null == r.nextSibling
              ? t.append(e)
              : t.insertBefore(e, r.nextSibling);
          })(e, P, r),
          (u = P),
          i instanceof a)
        ) {
          var S = null;
          i.children.forEach(function (t) {
            S = _({
              parentDomNode: k,
              leftSibling: S,
              newVNode: t,
              oldVNode: null,
              commitChangesStack: c,
            });
          });
        }
      } else if (i instanceof f)
        o instanceof f && o.data === i.data
          ? ((i.domNode = o.domNode), (u = i.domNode))
          : (g(o),
            (u = _({
              parentDomNode: e,
              leftSibling: r,
              oldVNode: null,
              newVNode: i,
              commitChangesStack: c,
            })),
            (i.domNode = u));
      else if (o instanceof f || o.type !== i.type)
        g(o),
          (u = _({
            parentDomNode: e,
            leftSibling: r,
            oldVNode: null,
            newVNode: i,
            commitChangesStack: c,
          }));
      else {
        (u = o.domNode),
          (i.domNode = u),
          null != i.ref && (i.ref.instance = u),
          w(u, o.props, i.props);
        var R = null;
        if (v(o) && v(i)) {
          var T = 0;
          i.children.forEach(function (t) {
            var e,
              r = null !== (e = o.children[T]) && void 0 !== e ? e : null;
            r instanceof a && t instanceof a && t.key === r.key
              ? ((R = _({
                  parentDomNode: i.domNode,
                  leftSibling: R,
                  oldVNode: r,
                  newVNode: t,
                  commitChangesStack: c,
                })),
                (T += 1))
              : (R = _({
                  parentDomNode: i.domNode,
                  leftSibling: R,
                  oldVNode: null,
                  newVNode: t,
                  commitChangesStack: c,
                }));
          }),
            o.children.slice(T).forEach(function (t) {
              _({
                parentDomNode: i.domNode,
                leftSibling: R,
                oldVNode: t,
                newVNode: null,
                commitChangesStack: c,
              });
            });
        } else
          o.children.forEach(function (t, e) {
            var r;
            R = _({
              parentDomNode: i.domNode,
              leftSibling: R,
              oldVNode: t,
              newVNode: null !== (r = i.children[e]) && void 0 !== r ? r : null,
              commitChangesStack: c,
            });
          }),
            i.children.slice(o.children.length).forEach(function (t) {
              R = _({
                parentDomNode: i.domNode,
                leftSibling: R,
                oldVNode: null,
                newVNode: t,
                commitChangesStack: c,
              });
            });
      }
    else {
      if (null == o) throw Error('Can not patch Virtual Dom: new node and old node are both null');
      g(o);
    }
    return u;
  }
  function O(t) {
    var e = [];
    for (_(y(y({}, t), {}, { commitChangesStack: e })); e.length > 0; ) e.pop()();
  }
  function E(t, e) {
    (e.innerHTML = ''), O({ newVNode: t, oldVNode: null, parentDomNode: e, leftSibling: null });
  }
  var j = ['key', 'ref'];
  function P(t, e) {
    if (null == t) return {};
    var r,
      n,
      o = (function (t, e) {
        if (null == t) return {};
        var r,
          n,
          o = {},
          i = Object.keys(t);
        for (n = 0; n < i.length; n++) (r = i[n]), e.indexOf(r) >= 0 || (o[r] = t[r]);
        return o;
      })(t, e);
    if (Object.getOwnPropertySymbols) {
      var i = Object.getOwnPropertySymbols(t);
      for (n = 0; n < i.length; n++)
        (r = i[n]),
          e.indexOf(r) >= 0 || (Object.prototype.propertyIsEnumerable.call(t, r) && (o[r] = t[r]));
    }
    return o;
  }
  function k(t) {
    for (
      var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
        r = null != e ? e : {},
        n = r.key,
        o = r.ref,
        i = P(r, j),
        c = arguments.length,
        u = new Array(c > 2 ? c - 2 : 0),
        l = 2;
      l < c;
      l++
    )
      u[l - 2] = arguments[l];
    var s = u.flat().map(function (t) {
      return t instanceof a ? t : new f(t.toString());
    });
    return new a(t, i, s, n, o);
  }
  function S(t, e) {
    var r = Object.keys(t);
    if (Object.getOwnPropertySymbols) {
      var n = Object.getOwnPropertySymbols(t);
      e &&
        (n = n.filter(function (e) {
          return Object.getOwnPropertyDescriptor(t, e).enumerable;
        })),
        r.push.apply(r, n);
    }
    return r;
  }
  function R(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = null != arguments[e] ? arguments[e] : {};
      e % 2
        ? S(Object(r), !0).forEach(function (e) {
            T(t, e, r[e]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r))
        : S(Object(r)).forEach(function (e) {
            Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(r, e));
          });
    }
    return t;
  }
  function T(t, e, r) {
    return (
      e in t
        ? Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 })
        : (t[e] = r),
      t
    );
  }
  function x(t) {
    return function (e, r, n) {
      var o = n.value;
      return (
        (n.value = function e() {
          for (var r = this, i = arguments.length, a = new Array(i), c = 0; c < i; c++)
            a[c] = arguments[c];
          null != e.timeoutID && clearTimeout(n.value.timeoutID),
            (o.timeoutID = setTimeout(function () {
              o.apply(r, a), (o.timeoutID = null);
            }, t));
        }),
        (o.timeoutID = null),
        n
      );
    };
  }
  var A,
    C,
    N,
    D = function () {
      for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++) e[r] = arguments[r];
      if (e.length <= 0) throw new Error('Nothing to merge');
      return e.reduce(function (t, e) {
        return R(R({}, e), t);
      }, {});
    };
  function B(t) {
    return new a(
      t.type,
      t.props,
      t.children.map(function (t) {
        return t instanceof f ? new f(t.data) : B(t);
      }),
      t.key,
      t.ref,
    );
  }
  function I(t, e) {
    var r = Object.keys(t);
    if (Object.getOwnPropertySymbols) {
      var n = Object.getOwnPropertySymbols(t);
      e &&
        (n = n.filter(function (e) {
          return Object.getOwnPropertyDescriptor(t, e).enumerable;
        })),
        r.push.apply(r, n);
    }
    return r;
  }
  function L(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = null != arguments[e] ? arguments[e] : {};
      e % 2
        ? I(Object(r), !0).forEach(function (e) {
            M(t, e, r[e]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r))
        : I(Object(r)).forEach(function (e) {
            Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(r, e));
          });
    }
    return t;
  }
  function M(t, e, r) {
    return (
      e in t
        ? Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 })
        : (t[e] = r),
      t
    );
  }
  function U(t, e) {
    for (var r = 0; r < e.length; r++) {
      var n = e[r];
      (n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        'value' in n && (n.writable = !0),
        Object.defineProperty(t, n.key, n);
    }
  }
  function V(t, e) {
    return (function (t, e) {
      return e.get ? e.get.call(t) : e.value;
    })(t, z(t, e, 'get'));
  }
  function z(t, e, r) {
    if (!e.has(t)) throw new TypeError('attempted to ' + r + ' private field on non-instance');
    return e.get(t);
  }
  var F,
    W,
    H,
    q,
    $,
    G,
    J =
      ((A = x(10)),
      (N = new WeakMap()),
      (C = (function () {
        function t(e) {
          !(function (t, e) {
            if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
          })(this, t),
            (function (t, e, r) {
              !(function (t, e) {
                if (e.has(t))
                  throw new TypeError(
                    'Cannot initialize the same private elements twice on an object',
                  );
              })(t, e),
                e.set(t, r);
            })(this, N, { writable: !0, value: void 0 }),
            (this.node = null),
            (this.children = []),
            this.setProps(e),
            (function (t, e, r) {
              (function (t, e, r) {
                if (e.set) e.set.call(t, r);
                else {
                  if (!e.writable) throw new TypeError('attempted to set read only private field');
                  e.value = r;
                }
              })(t, z(t, e, 'set'), r);
            })(this, N, []);
        }
        var e, r;
        return (
          (e = t),
          (r = [
            {
              key: 'destruct',
              value: function () {
                V(this, N).forEach(function (t) {
                  return t();
                }),
                  (V(this, N).length = 0);
              },
            },
            {
              key: 'setProps',
              value: function (t) {
                var e = t.ref;
                e && (e.instance = this);
                var r = Object.getPrototypeOf(this).constructor.contextType,
                  n = t.vNode;
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
                this.props = t;
              },
            },
            {
              key: 'renderAndCopy',
              value: function () {
                return B(this.render());
              },
            },
            { key: 'didMount', value: function () {} },
            { key: 'didUpdate', value: function (t) {} },
            { key: 'willUmount', value: function () {} },
            {
              key: 'makeSnapshot',
              value: function (t, e) {
                return null;
              },
            },
            {
              key: 'setState',
              value: function (t) {
                var e = this.state;
                (this.state = L(L({}, this.state), t)), this.enqueueUpdate(this.props, e);
              },
            },
            {
              key: 'enqueueUpdate',
              value: function (t, e) {
                var r = this.props,
                  n = this.state;
                null != t && (r = t), null != e && (n = e);
                var o = this.makeSnapshot(r, n),
                  i = this.renderAndCopy(),
                  a = this.props.vNode.children[0],
                  c = this.props,
                  u = c.parentDomNode,
                  l = c.leftSibling;
                (i.parent = this.props.vNode),
                  (i.pos = 0),
                  (this.props.vNode.children[0] = i),
                  O({ parentDomNode: u, leftSibling: l, newVNode: i, oldVNode: a }),
                  this.didUpdate(o);
              },
            },
          ]) && U(e.prototype, r),
          Object.defineProperty(e, 'prototype', { writable: !1 }),
          t
        );
      })()),
      (F = C.prototype),
      (W = 'enqueueUpdate'),
      (H = [A]),
      (q = Object.getOwnPropertyDescriptor(C.prototype, 'enqueueUpdate')),
      ($ = C.prototype),
      (G = {}),
      Object.keys(q).forEach(function (t) {
        G[t] = q[t];
      }),
      (G.enumerable = !!G.enumerable),
      (G.configurable = !!G.configurable),
      ('value' in G || G.initializer) && (G.writable = !0),
      (G = H.slice()
        .reverse()
        .reduce(function (t, e) {
          return e(F, W, t) || t;
        }, G)),
      $ &&
        void 0 !== G.initializer &&
        ((G.value = G.initializer ? G.initializer.call($) : void 0), (G.initializer = void 0)),
      void 0 === G.initializer && (Object.defineProperty(F, W, G), (G = null)),
      C);
  function Y(t, e) {
    for (var r = 0; r < e.length; r++) {
      var n = e[r];
      (n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        'value' in n && (n.writable = !0),
        Object.defineProperty(t, n.key, n);
    }
  }
  function Z(t, e, r) {
    return (
      e && Y(t.prototype, e),
      r && Y(t, r),
      Object.defineProperty(t, 'prototype', { writable: !1 }),
      t
    );
  }
  var K = Z(function t() {
    !(function (t, e) {
      if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
    })(this, t);
  });
  const X = r;
  function Q(t) {
    return (
      (Q =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (t) {
              return typeof t;
            }
          : function (t) {
              return t &&
                'function' == typeof Symbol &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? 'symbol'
                : typeof t;
            }),
      Q(t)
    );
  }
  function tt(t, e) {
    if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
  }
  function et(t, e) {
    return (
      (et =
        Object.setPrototypeOf ||
        function (t, e) {
          return (t.__proto__ = e), t;
        }),
      et(t, e)
    );
  }
  function rt(t, e) {
    if (e && ('object' === Q(e) || 'function' == typeof e)) return e;
    if (void 0 !== e)
      throw new TypeError('Derived constructors may only return object or undefined');
    return nt(t);
  }
  function nt(t) {
    if (void 0 === t)
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return t;
  }
  function ot(t) {
    return (
      (ot = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t);
          }),
      ot(t)
    );
  }
  function it(t, e, r) {
    return (
      e in t
        ? Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 })
        : (t[e] = r),
      t
    );
  }
  var at = (function (t) {
    !(function (t, e) {
      if ('function' != typeof e && null !== e)
        throw new TypeError('Super expression must either be null or a function');
      (t.prototype = Object.create(e && e.prototype, {
        constructor: { value: t, writable: !0, configurable: !0 },
      })),
        Object.defineProperty(t, 'prototype', { writable: !1 }),
        e && et(t, e);
    })(i, t);
    var e,
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
          } catch (t) {
            return !1;
          }
        })()),
        function () {
          var t,
            e = ot(r);
          if (n) {
            var o = ot(this).constructor;
            t = Reflect.construct(e, arguments, o);
          } else t = e.apply(this, arguments);
          return rt(this, t);
        });
    function i() {
      var t;
      tt(this, i);
      for (var e = arguments.length, r = new Array(e), n = 0; n < e; n++) r[n] = arguments[n];
      return (
        it(nt((t = o.call.apply(o, [this].concat(r)))), 'render', function () {
          return X.createElement(
            'li',
            { class: 'track-block' },
            X.createElement(
              'p',
              { class: 'text track-block__number' },
              t.props.order.toString().padStart(2, '0'),
            ),
            X.createElement('img', { class: 'track-block__icon', src: t.props.cover }),
            X.createElement(
              'div',
              { class: 'track-block__track-info' },
              X.createElement('p', { class: 'text track-info__title ' }, t.props.title),
              X.createElement('p', { class: 'text track-info__artist' }, t.props.artist),
            ),
          );
        }),
        t
      );
    }
    return (e = i), Object.defineProperty(e, 'prototype', { writable: !1 }), e;
  })(X.Component);
  function ct(t, e, r) {
    return (
      e in t
        ? Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 })
        : (t[e] = r),
      t
    );
  }
  function ut(t, e) {
    for (var r = 0; r < e.length; r++) {
      var n = e[r];
      (n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        'value' in n && (n.writable = !0),
        Object.defineProperty(t, n.key, n);
    }
  }
  var lt = 'X-CSRF-TOKEN',
    st = 'http://localhost/',
    ft = (function () {
      function t() {
        !(function (t, e) {
          if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
        })(this, t);
      }
      var e, r;
      return (
        (e = t),
        (r = [
          {
            key: 'fullUrl',
            value: function (t) {
              return ''.concat('http://localhost:8080', '/').concat(t);
            },
          },
          {
            key: 'get',
            value: function (t) {
              var e = null;
              return fetch(this.fullUrl(t), {
                method: 'GET',
                headers: ct({}, lt, localStorage.getItem('csrf')),
              })
                .then(function (t) {
                  return (
                    t.headers.has(lt) && localStorage.setItem('csrf', t.headers.get(lt)),
                    (e = t.status),
                    t.json()
                  );
                })
                .then(function (t) {
                  return { status: e, body: t };
                });
            },
          },
          {
            key: 'post',
            value: function (t, e) {
              var r,
                n = null;
              return (
                console.log(JSON.stringify(e)),
                fetch(this.fullUrl(t), {
                  method: 'POST',
                  body: JSON.stringify(e),
                  headers:
                    ((r = {}),
                    ct(r, lt, localStorage.getItem('csrf')),
                    ct(r, 'Content-Type', 'application/json'),
                    r),
                })
                  .then(function (t) {
                    return (
                      (n = t.status),
                      t.json().catch(function () {
                        return null;
                      })
                    );
                  })
                  .then(function (t) {
                    return { status: n, body: t };
                  })
              );
            },
          },
          {
            key: 'put',
            value: function (t, e) {
              var r = null;
              return fetch(this.fullUrl(t), {
                method: 'PUT',
                body: e,
                headers: ct({}, lt, localStorage.getItem('csrf')),
              })
                .then(function (t) {
                  return (
                    (r = t.status),
                    t.json().catch(function () {
                      return null;
                    })
                  );
                })
                .then(function (t) {
                  return { status: r, body: t };
                });
            },
          },
        ]),
        null && ut(e.prototype, null),
        r && ut(e, r),
        Object.defineProperty(e, 'prototype', { writable: !1 }),
        t
      );
    })();
  function pt(t) {
    return (
      (pt =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (t) {
              return typeof t;
            }
          : function (t) {
              return t &&
                'function' == typeof Symbol &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? 'symbol'
                : typeof t;
            }),
      pt(t)
    );
  }
  function yt(t, e) {
    if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
  }
  function dt(t, e) {
    return (
      (dt =
        Object.setPrototypeOf ||
        function (t, e) {
          return (t.__proto__ = e), t;
        }),
      dt(t, e)
    );
  }
  function bt(t, e) {
    if (e && ('object' === pt(e) || 'function' == typeof e)) return e;
    if (void 0 !== e)
      throw new TypeError('Derived constructors may only return object or undefined');
    return ht(t);
  }
  function ht(t) {
    if (void 0 === t)
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return t;
  }
  function mt(t) {
    return (
      (mt = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t);
          }),
      mt(t)
    );
  }
  function vt(t, e, r) {
    return (
      e in t
        ? Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 })
        : (t[e] = r),
      t
    );
  }
  var gt = (function (t) {
    !(function (t, e) {
      if ('function' != typeof e && null !== e)
        throw new TypeError('Super expression must either be null or a function');
      (t.prototype = Object.create(e && e.prototype, {
        constructor: { value: t, writable: !0, configurable: !0 },
      })),
        Object.defineProperty(t, 'prototype', { writable: !1 }),
        e && dt(t, e);
    })(i, t);
    var e,
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
          } catch (t) {
            return !1;
          }
        })()),
        function () {
          var t,
            e = mt(r);
          if (n) {
            var o = mt(this).constructor;
            t = Reflect.construct(e, arguments, o);
          } else t = e.apply(this, arguments);
          return bt(this, t);
        });
    function i() {
      var t;
      yt(this, i);
      for (var e = arguments.length, r = new Array(e), n = 0; n < e; n++) r[n] = arguments[n];
      return (
        vt(ht((t = o.call.apply(o, [this].concat(r)))), 'render', function () {
          var e = 1;
          return X.createElement(
            'ul',
            { class: 'sidebar__my-playlist' },
            t.props.playlist
              ? t.props.playlist.map(function (t) {
                  return X.createElement(at, {
                    order: e++,
                    title: t.title,
                    cover: st + t.cover,
                    artist: t.artist,
                  });
                })
              : '',
          );
        }),
        t
      );
    }
    return (e = i), Object.defineProperty(e, 'prototype', { writable: !1 }), e;
  })(X.Component);
  const wt = t.p + 'images/logo_img-bf6fde7.png';
  function _t(t) {
    return (
      (_t =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (t) {
              return typeof t;
            }
          : function (t) {
              return t &&
                'function' == typeof Symbol &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? 'symbol'
                : typeof t;
            }),
      _t(t)
    );
  }
  function Ot(t, e) {
    if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
  }
  function Et(t, e) {
    return (
      (Et =
        Object.setPrototypeOf ||
        function (t, e) {
          return (t.__proto__ = e), t;
        }),
      Et(t, e)
    );
  }
  function jt(t, e) {
    if (e && ('object' === _t(e) || 'function' == typeof e)) return e;
    if (void 0 !== e)
      throw new TypeError('Derived constructors may only return object or undefined');
    return Pt(t);
  }
  function Pt(t) {
    if (void 0 === t)
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return t;
  }
  function kt(t) {
    return (
      (kt = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t);
          }),
      kt(t)
    );
  }
  function St(t, e, r) {
    return (
      e in t
        ? Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 })
        : (t[e] = r),
      t
    );
  }
  var Rt = (function (t) {
    !(function (t, e) {
      if ('function' != typeof e && null !== e)
        throw new TypeError('Super expression must either be null or a function');
      (t.prototype = Object.create(e && e.prototype, {
        constructor: { value: t, writable: !0, configurable: !0 },
      })),
        Object.defineProperty(t, 'prototype', { writable: !1 }),
        e && Et(t, e);
    })(i, t);
    var e,
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
          } catch (t) {
            return !1;
          }
        })()),
        function () {
          var t,
            e = kt(r);
          if (n) {
            var o = kt(this).constructor;
            t = Reflect.construct(e, arguments, o);
          } else t = e.apply(this, arguments);
          return jt(this, t);
        });
    function i() {
      var t;
      Ot(this, i);
      for (var e = arguments.length, r = new Array(e), n = 0; n < e; n++) r[n] = arguments[n];
      return (
        St(Pt((t = o.call.apply(o, [this].concat(r)))), 'render', function () {
          return X.createElement(
            'div',
            { class: 'nav-block' },
            X.createElement(
              'div',
              { class: 'nav-block__icon__wrapper' },
              X.createElement('div', { class: 'fa-brands fa-itunes-note icon__wrapper__icon-fa' }),
              X.createElement('div', { class: 'icon__wrapper__icon-default' }),
            ),
            X.createElement('p', { class: 'text nav-block__navigation-text' }, t.props.title),
          );
        }),
        t
      );
    }
    return (e = i), Object.defineProperty(e, 'prototype', { writable: !1 }), e;
  })(X.Component);
  function Tt(t) {
    return (
      (Tt =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (t) {
              return typeof t;
            }
          : function (t) {
              return t &&
                'function' == typeof Symbol &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? 'symbol'
                : typeof t;
            }),
      Tt(t)
    );
  }
  function xt(t, e) {
    if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
  }
  function At(t, e) {
    return (
      (At =
        Object.setPrototypeOf ||
        function (t, e) {
          return (t.__proto__ = e), t;
        }),
      At(t, e)
    );
  }
  function Ct(t, e) {
    if (e && ('object' === Tt(e) || 'function' == typeof e)) return e;
    if (void 0 !== e)
      throw new TypeError('Derived constructors may only return object or undefined');
    return Nt(t);
  }
  function Nt(t) {
    if (void 0 === t)
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return t;
  }
  function Dt(t) {
    return (
      (Dt = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t);
          }),
      Dt(t)
    );
  }
  function Bt(t, e, r) {
    return (
      e in t
        ? Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 })
        : (t[e] = r),
      t
    );
  }
  var It = function (t) {
    var e = (function (t) {
      !(function (t, e) {
        if ('function' != typeof e && null !== e)
          throw new TypeError('Super expression must either be null or a function');
        (t.prototype = Object.create(e && e.prototype, {
          constructor: { value: t, writable: !0, configurable: !0 },
        })),
          Object.defineProperty(t, 'prototype', { writable: !1 }),
          e && At(t, e);
      })(i, t);
      var e,
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
            } catch (t) {
              return !1;
            }
          })()),
          function () {
            var t,
              e = Dt(r);
            if (n) {
              var o = Dt(this).constructor;
              t = Reflect.construct(e, arguments, o);
            } else t = e.apply(this, arguments);
            return Ct(this, t);
          });
      function i() {
        var t;
        xt(this, i);
        for (var e = arguments.length, r = new Array(e), n = 0; n < e; n++) r[n] = arguments[n];
        return (
          Bt(Nt((t = o.call.apply(o, [this].concat(r)))), 'render', function () {
            return X.createElement(X.Fragment, null, t.props.children);
          }),
          t
        );
      }
      return (e = i), Object.defineProperty(e, 'prototype', { writable: !1 }), e;
    })(X.Component);
    return { Provider: e, defaultValue: t };
  };
  const Lt = It(null);
  function Mt(t) {
    return (
      (Mt =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (t) {
              return typeof t;
            }
          : function (t) {
              return t &&
                'function' == typeof Symbol &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? 'symbol'
                : typeof t;
            }),
      Mt(t)
    );
  }
  var Ut = ['as'];
  function Vt() {
    return (
      (Vt =
        Object.assign ||
        function (t) {
          for (var e = 1; e < arguments.length; e++) {
            var r = arguments[e];
            for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
          }
          return t;
        }),
      Vt.apply(this, arguments)
    );
  }
  function zt(t, e) {
    for (var r = 0; r < e.length; r++) {
      var n = e[r];
      (n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        'value' in n && (n.writable = !0),
        Object.defineProperty(t, n.key, n);
    }
  }
  function Ft(t, e) {
    return (
      (Ft =
        Object.setPrototypeOf ||
        function (t, e) {
          return (t.__proto__ = e), t;
        }),
      Ft(t, e)
    );
  }
  function Wt(t, e) {
    if (e && ('object' === Mt(e) || 'function' == typeof e)) return e;
    if (void 0 !== e)
      throw new TypeError('Derived constructors may only return object or undefined');
    return Ht(t);
  }
  function Ht(t) {
    if (void 0 === t)
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return t;
  }
  function qt(t) {
    return (
      (qt = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t);
          }),
      qt(t)
    );
  }
  var $t,
    Gt,
    Jt,
    Yt = (function (t) {
      !(function (t, e) {
        if ('function' != typeof e && null !== e)
          throw new TypeError('Super expression must either be null or a function');
        (t.prototype = Object.create(e && e.prototype, {
          constructor: { value: t, writable: !0, configurable: !0 },
        })),
          Object.defineProperty(t, 'prototype', { writable: !1 }),
          e && Ft(t, e);
      })(a, t);
      var e,
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
            } catch (t) {
              return !1;
            }
          })()),
          function () {
            var t,
              e = qt(n);
            if (o) {
              var r = qt(this).constructor;
              t = Reflect.construct(e, arguments, r);
            } else t = e.apply(this, arguments);
            return Wt(this, t);
          });
      function a(t) {
        var e;
        if (
          ((function (t, e) {
            if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
          })(this, a),
          ((e = i.call(this, t)).handleClick = e.handleClick.bind(Ht(e))),
          null == e.context)
        )
          throw Error('Router has not been found');
        return e;
      }
      return (
        (e = a),
        (r = [
          {
            key: 'handleClick',
            value: function (t) {
              t.preventDefault(), this.context.go(this.props.to);
            },
          },
          {
            key: 'render',
            value: function () {
              var t = this.props,
                e = t.as,
                r = (function (t, e) {
                  if (null == t) return {};
                  var r,
                    n,
                    o = (function (t, e) {
                      if (null == t) return {};
                      var r,
                        n,
                        o = {},
                        i = Object.keys(t);
                      for (n = 0; n < i.length; n++) (r = i[n]), e.indexOf(r) >= 0 || (o[r] = t[r]);
                      return o;
                    })(t, e);
                  if (Object.getOwnPropertySymbols) {
                    var i = Object.getOwnPropertySymbols(t);
                    for (n = 0; n < i.length; n++)
                      (r = i[n]),
                        e.indexOf(r) >= 0 ||
                          (Object.prototype.propertyIsEnumerable.call(t, r) && (o[r] = t[r]));
                  }
                  return o;
                })(t, Ut),
                n = e;
              return (
                null == n && (n = 'a'),
                X.createElement(n, Vt({}, r, { onClick: this.handleClick }), this.props.children)
              );
            },
          },
        ]) && zt(e.prototype, r),
        Object.defineProperty(e, 'prototype', { writable: !1 }),
        a
      );
    })(X.Component);
  function Zt(t) {
    return (
      (Zt =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (t) {
              return typeof t;
            }
          : function (t) {
              return t &&
                'function' == typeof Symbol &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? 'symbol'
                : typeof t;
            }),
      Zt(t)
    );
  }
  function Kt(t, e) {
    if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
  }
  function Xt(t, e) {
    return (
      (Xt =
        Object.setPrototypeOf ||
        function (t, e) {
          return (t.__proto__ = e), t;
        }),
      Xt(t, e)
    );
  }
  function Qt(t, e) {
    if (e && ('object' === Zt(e) || 'function' == typeof e)) return e;
    if (void 0 !== e)
      throw new TypeError('Derived constructors may only return object or undefined');
    return te(t);
  }
  function te(t) {
    if (void 0 === t)
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return t;
  }
  function ee(t) {
    return (
      (ee = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t);
          }),
      ee(t)
    );
  }
  function re(t, e, r) {
    return (
      e in t
        ? Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 })
        : (t[e] = r),
      t
    );
  }
  (Jt = Lt),
    (Gt = 'contextType') in ($t = Yt)
      ? Object.defineProperty($t, Gt, { value: Jt, enumerable: !0, configurable: !0, writable: !0 })
      : ($t[Gt] = Jt);
  var ne = (function (t) {
    !(function (t, e) {
      if ('function' != typeof e && null !== e)
        throw new TypeError('Super expression must either be null or a function');
      (t.prototype = Object.create(e && e.prototype, {
        constructor: { value: t, writable: !0, configurable: !0 },
      })),
        Object.defineProperty(t, 'prototype', { writable: !1 }),
        e && Xt(t, e);
    })(i, t);
    var e,
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
          } catch (t) {
            return !1;
          }
        })()),
        function () {
          var t,
            e = ee(r);
          if (n) {
            var o = ee(this).constructor;
            t = Reflect.construct(e, arguments, o);
          } else t = e.apply(this, arguments);
          return Qt(this, t);
        });
    function i() {
      var t;
      Kt(this, i);
      for (var e = arguments.length, r = new Array(e), n = 0; n < e; n++) r[n] = arguments[n];
      return (
        re(te((t = o.call.apply(o, [this].concat(r)))), 'render', function () {
          var e = t.props,
            r = e.isAuthorized,
            n = e.playlist,
            o = r
              ? X.createElement(
                  'div',
                  null,
                  X.createElement(Rt, { title: 'My playlist' }),
                  X.createElement(Rt, { title: 'Last listening' }),
                  X.createElement(Rt, { title: 'Recommended' }),
                )
              : X.createElement(Rt, { title: 'Listening in the world' });
          return X.createElement(
            'div',
            { class: 'sidebar' },
            X.createElement(
              'div',
              { class: 'sidebar__header' },
              X.createElement(
                Yt,
                { to: '/' },
                X.createElement(
                  'div',
                  { class: 'header__logo' },
                  X.createElement('img', { class: 'logo__picture', src: wt, alt: 'logo.svg' }),
                ),
              ),
            ),
            o,
            X.createElement(gt, { playlist: n }),
          );
        }),
        t
      );
    }
    return (e = i), Object.defineProperty(e, 'prototype', { writable: !1 }), e;
  })(X.Component);
  const oe = t.p + 'images/player_marker-09b3d5c.png';
  function ie(t, e) {
    if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
  }
  function ae(t, e) {
    for (var r = 0; r < e.length; r++) {
      var n = e[r];
      (n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        'value' in n && (n.writable = !0),
        Object.defineProperty(t, n.key, n);
    }
  }
  function ce(t, e) {
    se(t, e), e.add(t);
  }
  function ue(t, e, r) {
    return (
      e in t
        ? Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 })
        : (t[e] = r),
      t
    );
  }
  function le(t, e, r) {
    se(t, e), e.set(t, r);
  }
  function se(t, e) {
    if (e.has(t))
      throw new TypeError('Cannot initialize the same private elements twice on an object');
  }
  function fe(t, e, r) {
    if (!e.has(t)) throw new TypeError('attempted to get private field on non-instance');
    return r;
  }
  function pe(t, e) {
    return (function (t, e) {
      return e.get ? e.get.call(t) : e.value;
    })(t, de(t, e, 'get'));
  }
  function ye(t, e, r) {
    return (
      (function (t, e, r) {
        if (e.set) e.set.call(t, r);
        else {
          if (!e.writable) throw new TypeError('attempted to set read only private field');
          e.value = r;
        }
      })(t, de(t, e, 'set'), r),
      r
    );
  }
  function de(t, e, r) {
    if (!e.has(t)) throw new TypeError('attempted to ' + r + ' private field on non-instance');
    return e.get(t);
  }
  var be = new WeakMap(),
    he = new WeakMap(),
    me = new WeakMap(),
    ve = new WeakMap(),
    ge = new WeakMap(),
    we = new WeakMap(),
    _e = new WeakSet(),
    Oe = new WeakSet(),
    Ee = new WeakSet(),
    je = (function () {
      function t() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
          r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0.5;
        if (
          (ie(this, t),
          ce(this, Ee),
          ce(this, Oe),
          ce(this, _e),
          le(this, be, { writable: !0, value: void 0 }),
          le(this, he, { writable: !0, value: 0 }),
          le(this, me, { writable: !0, value: 0 }),
          le(this, ve, { writable: !0, value: {} }),
          ue(this, 'isPlayRand', !1),
          le(this, ge, { writable: !0, value: void 0 }),
          le(this, we, { writable: !0, value: void 0 }),
          console.log(e),
          e && 0 !== e.length)
        ) {
          ye(this, be, e),
            (this.currentTrack = pe(this, be)[pe(this, he)]),
            (this.audio = new Audio(st + this.currentTrack.src)),
            (this.audio.preload = 'metadata'),
            (this.audio.volume = r),
            ye(this, ge, new AudioContext()),
            (this.analyser = pe(this, ge).createAnalyser()),
            (this.analyser.fftSize = 2048);
          var n = pe(this, ge).createMediaElementSource(this.audio);
          n.connect(this.analyser),
            this.analyser.connect(pe(this, ge).destination),
            fe(this, Ee, Se).call(this, this.currentTrack);
        }
      }
      var e, r;
      return (
        (e = t),
        (r = [
          {
            key: 'addTrack',
            value: function (t) {
              pe(this, be).push(t);
            },
          },
          {
            key: 'popTrack',
            value: function () {
              pe(this, be).pop();
            },
          },
          {
            key: 'play',
            value: function () {
              var t = this;
              pe(this, ge).resume(),
                this.audio.play().then(function () {
                  return fe(t, Oe, ke).call(t);
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
              if (!(pe(this, me) > pe(this, be).length - 1)) {
                if (this.isPlayRand) {
                  for (
                    var t = Math.trunc(Math.random() * pe(this, be).length);
                    pe(this, ve).hasOwnProperty(t);

                  )
                    t = Math.trunc(Math.random() * pe(this, be).length);
                  (pe(this, ve)[t] = pe(this, be)[t]), ye(this, he, t);
                } else ye(this, he, pe(this, he) + 1);
                ye(this, me, pe(this, me) + 1);
                var e = pe(this, be)[pe(this, he)];
                (this.audio.src = st + e.src),
                  (this.currentTrack = e),
                  fe(this, _e, Pe).call(this, this.currentTrack);
              }
            },
          },
          {
            key: 'prev',
            value: function () {
              if (0 !== pe(this, he)) {
                ye(this, he, pe(this, he) - 1);
                var t = pe(this, be)[pe(this, he)];
                (this.audio.src = st + t.src),
                  (this.currentTrack = t),
                  fe(this, _e, Pe).call(this, this.currentTrack);
              }
            },
          },
        ]) && ae(e.prototype, r),
        Object.defineProperty(e, 'prototype', { writable: !1 }),
        t
      );
    })();
  function Pe(t) {
    'mediaSession' in navigator &&
      (navigator.mediaSession.metadata = new MediaMetadata({
        title: t.title,
        artist: t.artist,
        album: t.album,
        artwork: [{ src: t.cover }],
      }));
  }
  function ke() {
    'mediaSession' in navigator &&
      navigator.mediaSession.setPositionState({
        duration: this.audio.duration,
        playbackRate: this.audio.playbackRate,
        position: this.audio.currentTime,
      });
  }
  function Se(t) {
    var e = this;
    'mediaSession' in navigator &&
      (fe(this, _e, Pe).call(this, t),
      navigator.mediaSession.setActionHandler('play', function () {
        e.play();
      }),
      navigator.mediaSession.setActionHandler('pause', function () {
        e.stop();
      }),
      navigator.mediaSession.setActionHandler('previoustrack', function () {
        e.prev();
      }),
      navigator.mediaSession.setActionHandler('nexttrack', function () {
        e.next();
      }));
  }
  function Re(t) {
    return (
      (Re =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (t) {
              return typeof t;
            }
          : function (t) {
              return t &&
                'function' == typeof Symbol &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? 'symbol'
                : typeof t;
            }),
      Re(t)
    );
  }
  function Te(t, e) {
    for (var r = 0; r < e.length; r++) {
      var n = e[r];
      (n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        'value' in n && (n.writable = !0),
        Object.defineProperty(t, n.key, n);
    }
  }
  function xe(t, e) {
    return (
      (xe =
        Object.setPrototypeOf ||
        function (t, e) {
          return (t.__proto__ = e), t;
        }),
      xe(t, e)
    );
  }
  function Ae(t, e) {
    if (e && ('object' === Re(e) || 'function' == typeof e)) return e;
    if (void 0 !== e)
      throw new TypeError('Derived constructors may only return object or undefined');
    return Ce(t);
  }
  function Ce(t) {
    if (void 0 === t)
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return t;
  }
  function Ne(t) {
    return (
      (Ne = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t);
          }),
      Ne(t)
    );
  }
  function De(t, e, r) {
    !(function (t, e) {
      if (e.has(t))
        throw new TypeError('Cannot initialize the same private elements twice on an object');
    })(t, e),
      e.set(t, r);
  }
  function Be(t, e) {
    return (function (t, e) {
      return e.get ? e.get.call(t) : e.value;
    })(t, Ie(t, e, 'get'));
  }
  function Ie(t, e, r) {
    if (!e.has(t)) throw new TypeError('attempted to ' + r + ' private field on non-instance');
    return e.get(t);
  }
  var Le = new WeakMap(),
    Me = new WeakMap(),
    Ue = new WeakMap();
  const Ve = (function (t) {
    !(function (t, e) {
      if ('function' != typeof e && null !== e)
        throw new TypeError('Super expression must either be null or a function');
      (t.prototype = Object.create(e && e.prototype, {
        constructor: { value: t, writable: !0, configurable: !0 },
      })),
        Object.defineProperty(t, 'prototype', { writable: !1 }),
        e && xe(t, e);
    })(a, t);
    var e,
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
          } catch (t) {
            return !1;
          }
        })()),
        function () {
          var t,
            e = Ne(n);
          if (o) {
            var r = Ne(this).constructor;
            t = Reflect.construct(e, arguments, r);
          } else t = e.apply(this, arguments);
          return Ae(this, t);
        });
    function a(t) {
      var e;
      !(function (t, e) {
        if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
      })(this, a),
        De(Ce((e = i.call(this, t))), Le, { writable: !0, value: void 0 }),
        De(Ce(e), Me, {
          writable: !0,
          value: X.createElement('div', { class: 'fa-regular fa-circle-play' }),
        }),
        De(Ce(e), Ue, {
          writable: !0,
          value: X.createElement('div', { class: 'fa-regular fa-circle-pause' }),
        });
      var r = e.props.playlist;
      (function (t, e, r) {
        (function (t, e, r) {
          if (e.set) e.set.call(t, r);
          else {
            if (!e.writable) throw new TypeError('attempted to set read only private field');
            e.value = r;
          }
        })(t, Ie(t, e, 'set'), r);
      })(Ce(e), Le, new je(r)),
        console.log(Be(Ce(e), Le));
      var n = Be(Ce(e), Le).analyser
          ? new Uint8Array(Be(Ce(e), Le).analyser.frequencyBinCount)
          : null,
        o = Be(Ce(e), Le).audio ? Be(Ce(e), Le).audio.volume : 0.5;
      return (
        (e.state = {
          playState: !1,
          trackTime: 0,
          trackFilled: 0,
          trackFetched: 0,
          trackBuffered: 0,
          trackVolume: 100 * o,
          playRand: !1,
          trackData: {
            title: Be(Ce(e), Le).currentTrack.title,
            author: Be(Ce(e), Le).currentTrack.artist,
            cover: st + Be(Ce(e), Le).currentTrack.cover,
          },
          freqArray: n,
          waveHeights: [0, 0, 0, 0],
        }),
        (e.loadTrackData = e.loadTrackData.bind(Ce(e))),
        (e.tooglePlay = e.tooglePlay.bind(Ce(e))),
        (e.checkPlay = e.checkPlay.bind(Ce(e))),
        (e.runNext = e.runNext.bind(Ce(e))),
        (e.runPrev = e.runPrev.bind(Ce(e))),
        (e.timeUpdater = e.timeUpdater.bind(Ce(e))),
        (e.updateWaveFront = e.updateWaveFront.bind(Ce(e))),
        (e.fetchedUpdater = e.fetchedUpdater.bind(Ce(e))),
        (e.setTime = e.setTime.bind(Ce(e))),
        (e.setVolume = e.setVolume.bind(Ce(e))),
        (e.toogleShuffle = e.toogleShuffle.bind(Ce(e))),
        (e.toogleMute = e.toogleMute.bind(Ce(e))),
        Be(Ce(e), Le).audio &&
          (Be(Ce(e), Le).audio.addEventListener('timeupdate', e.timeUpdater),
          Be(Ce(e), Le).audio.addEventListener('progress', e.fetchedUpdater),
          Be(Ce(e), Le).audio.addEventListener('loadedmetadata', e.fetchedUpdater),
          Be(Ce(e), Le).audio.addEventListener('durationchange', e.loadTrackData),
          Be(Ce(e), Le).audio.addEventListener('ended', e.runNext)),
        Be(Ce(e), Le).currentTrack && e.loadTrackData(),
        e
      );
    }
    return (
      (e = a),
      (r = [
        {
          key: 'loadTrackData',
          value: function () {
            this.setState({
              trackData: {
                title: Be(this, Le).currentTrack.title,
                author: Be(this, Le).currentTrack.artist,
                cover: st + Be(this, Le).currentTrack.cover,
              },
            });
          },
        },
        {
          key: 'checkPlay',
          value: function () {
            this.state.playState ? Be(this, Le).play() : Be(this, Le).stop();
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
              Be(this, Le).next(),
              this.checkPlay();
          },
        },
        {
          key: 'runPrev',
          value: function () {
            0 === Be(this, Le).audio.currentTime
              ? (Be(this, Le).prev(), this.checkPlay())
              : (Be(this, Le).audio.currentTime = 0);
          },
        },
        {
          key: 'timeUpdater',
          value: function (t) {
            this.fetchedUpdater(t), this.updateWaveFront();
            var e = (Be(this, Le).audio.currentTime / Be(this, Le).audio.duration) * 100;
            this.setState({ trackTime: Be(this, Le).audio.currentTime, trackFilled: e });
          },
        },
        {
          key: 'updateWaveFront',
          value: function () {
            var t = this.state.freqArray;
            if (t) {
              Be(this, Le).analyser.getByteFrequencyData(t);
              for (
                var e = [0, 0, 0, 0],
                  r = [
                    [100, 700],
                    [1e3, 3e3],
                    [4e3, 6e3],
                    [7e3, 1e4],
                  ],
                  n = 0;
                n < e.length;
                n += 1
              ) {
                var o = r[n],
                  i = Math.round(o[0] / 24),
                  a = Math.round(o[1] / 24),
                  c = 0,
                  u = 0;
                t.slice(i, a).forEach(function (t) {
                  (c += t), (u += 1);
                });
                var l = c / u;
                e[n] = (l / 256) * 100;
              }
              this.setState({ freqArray: t, waveHeights: e });
            }
          },
        },
        {
          key: 'fetchedUpdater',
          value: function () {
            var t = Be(this, Le).audio.buffered.end(Be(this, Le).audio.buffered.length - 1);
            this.setState({ trackBuffered: (t / Be(this, Le).audio.duration) * 100 });
          },
        },
        {
          key: 'setTime',
          value: function (t) {
            var e = this.getRelativePosition(t);
            Be(this, Le).audio.currentTime = e * Be(this, Le).audio.duration;
          },
        },
        {
          key: 'setVolume',
          value: function (t) {
            var e = this.getRelativePosition(t);
            this.setState({ trackVolume: 100 * e }), (Be(this, Le).audio.volume = e);
          },
        },
        {
          key: 'getRelativePosition',
          value: function (t) {
            t.preventDefault();
            var e = t.currentTarget.getBoundingClientRect(),
              r = (t.x - e.left) / (e.right - e.left);
            return r < 0 ? 0 : r;
          },
        },
        {
          key: 'toogleShuffle',
          value: function () {
            (Be(this, Le).isPlayRand = !Be(this, Le).isPlayRand),
              this.setState({ playRand: Be(this, Le).isPlayRand });
          },
        },
        {
          key: 'toogleMute',
          value: function () {
            (Be(this, Le).audio.volume = this.state.trackVolume > 0 ? 0 : 0.5),
              this.setState({ trackVolume: this.state.trackVolume > 0 ? 0 : 50 });
          },
        },
        {
          key: 'render',
          value: function () {
            var t,
              e = function (t) {
                var e = Math.trunc(t).toString();
                return t >= 10 ? e : '0'.concat(e);
              };
            switch (!0) {
              case 0 === this.state.trackVolume:
                t = 'fa-volume-xmark';
                break;
              case this.state.trackVolume < 25:
                t = 'fa-volume-off';
                break;
              case this.state.trackVolume < 60:
                t = 'fa-volume-low';
                break;
              default:
                t = 'fa-volume-high';
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
                  this.state.playState ? Be(this, Ue) : Be(this, Me),
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
                      style: { 'background-image': 'url("'.concat(oe, '")') },
                    }),
                  ),
                ),
                X.createElement(
                  'div',
                  { class: 'text player__progressbar__time' },
                  ' ',
                  ''.concat(e(this.state.trackTime / 60), ':').concat(e(this.state.trackTime % 60)),
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
                  class: 'fa-solid '.concat(t, ' volume__icon'),
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
      ]) && Te(e.prototype, r),
      Object.defineProperty(e, 'prototype', { writable: !1 }),
      a
    );
  })(X.Component);
  function ze(t) {
    return (
      (ze =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (t) {
              return typeof t;
            }
          : function (t) {
              return t &&
                'function' == typeof Symbol &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? 'symbol'
                : typeof t;
            }),
      ze(t)
    );
  }
  function Fe() {
    return (
      (Fe =
        Object.assign ||
        function (t) {
          for (var e = 1; e < arguments.length; e++) {
            var r = arguments[e];
            for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
          }
          return t;
        }),
      Fe.apply(this, arguments)
    );
  }
  function We(t, e) {
    for (var r = 0; r < e.length; r++) {
      var n = e[r];
      (n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        'value' in n && (n.writable = !0),
        Object.defineProperty(t, n.key, n);
    }
  }
  function He(t, e) {
    return (
      (He =
        Object.setPrototypeOf ||
        function (t, e) {
          return (t.__proto__ = e), t;
        }),
      He(t, e)
    );
  }
  function qe(t, e) {
    if (e && ('object' === ze(e) || 'function' == typeof e)) return e;
    if (void 0 !== e)
      throw new TypeError('Derived constructors may only return object or undefined');
    return (function (t) {
      if (void 0 === t)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return t;
    })(t);
  }
  function $e(t) {
    return (
      ($e = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t);
          }),
      $e(t)
    );
  }
  var Ge = It(null);
  function Je(t, e) {
    return function (r) {
      var n = (function (n) {
        !(function (t, e) {
          if ('function' != typeof e && null !== e)
            throw new TypeError('Super expression must either be null or a function');
          (t.prototype = Object.create(e && e.prototype, {
            constructor: { value: t, writable: !0, configurable: !0 },
          })),
            Object.defineProperty(t, 'prototype', { writable: !1 }),
            e && He(t, e);
        })(l, n);
        var o,
          i,
          a,
          c,
          u =
            ((a = l),
            (c = (function () {
              if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
              if (Reflect.construct.sham) return !1;
              if ('function' == typeof Proxy) return !0;
              try {
                return (
                  Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0
                );
              } catch (t) {
                return !1;
              }
            })()),
            function () {
              var t,
                e = $e(a);
              if (c) {
                var r = $e(this).constructor;
                t = Reflect.construct(e, arguments, r);
              } else t = e.apply(this, arguments);
              return qe(this, t);
            });
        function l(t) {
          var e;
          return (
            (function (t, e) {
              if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
            })(this, l),
            ((e = u.call(this, t)).state = e.context.getState()),
            e
          );
        }
        return (
          (o = l),
          (i = [
            {
              key: 'didMount',
              value: function () {
                var t = this;
                this.context.subscribe(function (e) {
                  t.setState(e);
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
                  Fe(
                    {},
                    this.props,
                    t(o.getState()),
                    null !== (n = e(o.dispatch)) && void 0 !== n ? n : null,
                  ),
                  this.props.children,
                );
              },
            },
          ]),
          i && We(o.prototype, i),
          Object.defineProperty(o, 'prototype', { writable: !1 }),
          l
        );
      })(X.Component);
      return (
        (function (t, e, r) {
          e in t
            ? Object.defineProperty(t, e, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (t[e] = r);
        })(n, 'contextType', Ge),
        n
      );
    };
  }
  function Ye(t, e) {
    for (var r = 0; r < e.length; r++) {
      var n = e[r];
      (n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        'value' in n && (n.writable = !0),
        Object.defineProperty(t, n.key, n);
    }
  }
  var Ze = (function () {
    function t() {
      !(function (t, e) {
        if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
      })(this, t);
    }
    var e, r;
    return (
      (e = t),
      (r = [
        {
          key: 'getPopular',
          value: function () {
            return ft.get('api/v1/tracks/popular').then(function (t) {
              return 200 !== t.status ? Promise.reject(t.body) : t.body.Result;
            });
          },
        },
      ]),
      null && Ye(e.prototype, null),
      r && Ye(e, r),
      Object.defineProperty(e, 'prototype', { writable: !1 }),
      t
    );
  })();
  function Ke(t) {
    Ze.getPopular().then(function (e) {
      t({ type: 'popular/track', payload: e });
    });
  }
  function Xe(t) {
    return (
      (Xe =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (t) {
              return typeof t;
            }
          : function (t) {
              return t &&
                'function' == typeof Symbol &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? 'symbol'
                : typeof t;
            }),
      Xe(t)
    );
  }
  function Qe(t, e) {
    for (var r = 0; r < e.length; r++) {
      var n = e[r];
      (n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        'value' in n && (n.writable = !0),
        Object.defineProperty(t, n.key, n);
    }
  }
  function tr(t, e) {
    return (
      (tr =
        Object.setPrototypeOf ||
        function (t, e) {
          return (t.__proto__ = e), t;
        }),
      tr(t, e)
    );
  }
  function er(t, e) {
    if (e && ('object' === Xe(e) || 'function' == typeof e)) return e;
    if (void 0 !== e)
      throw new TypeError('Derived constructors may only return object or undefined');
    return rr(t);
  }
  function rr(t) {
    if (void 0 === t)
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return t;
  }
  function nr(t) {
    return (
      (nr = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t);
          }),
      nr(t)
    );
  }
  var or = (function (t) {
    !(function (t, e) {
      if ('function' != typeof e && null !== e)
        throw new TypeError('Super expression must either be null or a function');
      (t.prototype = Object.create(e && e.prototype, {
        constructor: { value: t, writable: !0, configurable: !0 },
      })),
        Object.defineProperty(t, 'prototype', { writable: !1 }),
        e && tr(t, e);
    })(a, t);
    var e,
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
          } catch (t) {
            return !1;
          }
        })()),
        function () {
          var t,
            e = nr(n);
          if (o) {
            var r = nr(this).constructor;
            t = Reflect.construct(e, arguments, r);
          } else t = e.apply(this, arguments);
          return er(this, t);
        });
    function a(t) {
      var e;
      return (
        (function (t, e) {
          if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
        })(this, a),
        (function (t, e, r) {
          e in t
            ? Object.defineProperty(t, e, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (t[e] = r);
        })(rr((e = i.call(this, t))), 'render', function () {
          var t = e.props,
            r = t.content,
            n = t.isAuthorized;
          return X.createElement(
            'div',
            { class: 'page', style: { height: ''.concat(e.state.contentHeight.toString(), 'px') } },
            X.createElement(ne, { playlist: e.props.playlist, isAuthorized: n }),
            X.createElement('div', { class: 'content' }, r),
            e.props.playlist ? X.createElement(Ve, { playlist: e.props.playlist }) : '',
          );
        }),
        e.props.getPlaylist(),
        (e.state = { contentHeight: 0 }),
        e
      );
    }
    return (
      (e = a),
      (r = [
        {
          key: 'didUpdate',
          value: function () {
            var t = this.props.content,
              e = document.getElementsByClassName('content')[0]
                ? document.getElementsByClassName('content')[0].clientHeight
                : 0;
            (this.state.contentHeight === e && t === this.state.content) ||
              this.setState({ contentHeight: e, content: t });
          },
        },
      ]) && Qe(e.prototype, r),
      Object.defineProperty(e, 'prototype', { writable: !1 }),
      a
    );
  })(X.Component);
  const ir = Je(
      function (t) {
        return {
          playlist: t.tracksPopular ? t.tracksPopular.popular : null,
          something: t.tracksPopular,
        };
      },
      function (t) {
        return {
          getPlaylist: function () {
            t(Ke);
          },
        };
      },
    )(or),
    ar = t.p + 'images/avatar-9730d9d.jpeg';
  function cr(t) {
    return (
      (cr =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (t) {
              return typeof t;
            }
          : function (t) {
              return t &&
                'function' == typeof Symbol &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? 'symbol'
                : typeof t;
            }),
      cr(t)
    );
  }
  function ur(t, e) {
    return (
      (ur =
        Object.setPrototypeOf ||
        function (t, e) {
          return (t.__proto__ = e), t;
        }),
      ur(t, e)
    );
  }
  function lr(t, e) {
    if (e && ('object' === cr(e) || 'function' == typeof e)) return e;
    if (void 0 !== e)
      throw new TypeError('Derived constructors may only return object or undefined');
    return sr(t);
  }
  function sr(t) {
    if (void 0 === t)
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return t;
  }
  function fr(t) {
    return (
      (fr = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t);
          }),
      fr(t)
    );
  }
  function pr(t, e, r) {
    return (
      e in t
        ? Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 })
        : (t[e] = r),
      t
    );
  }
  var yr = (function (t) {
    !(function (t, e) {
      if ('function' != typeof e && null !== e)
        throw new TypeError('Super expression must either be null or a function');
      (t.prototype = Object.create(e && e.prototype, {
        constructor: { value: t, writable: !0, configurable: !0 },
      })),
        Object.defineProperty(t, 'prototype', { writable: !1 }),
        e && ur(t, e);
    })(i, t);
    var e,
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
          } catch (t) {
            return !1;
          }
        })()),
        function () {
          var t,
            e = fr(r);
          if (n) {
            var o = fr(this).constructor;
            t = Reflect.construct(e, arguments, o);
          } else t = e.apply(this, arguments);
          return lr(this, t);
        });
    function i(t) {
      var e;
      return (
        (function (t, e) {
          if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
        })(this, i),
        pr(sr((e = o.call(this, t))), 'logout', function () {
          e.setState({ isPopupShow: !e.state.isPopupShow });
        }),
        pr(sr(e), 'render', function () {
          var t = e.props.isAuthorized
            ? X.createElement(
                'div',
                { class: 'navbar__avatar' },
                X.createElement(
                  'div',
                  { class: 'navbar__avatar__wrapper' },
                  X.createElement('img', {
                    onClick: e.logout,
                    class: 'navbar__avatar__img_round',
                    src: ar,
                    alt: 'avatar.png',
                  }),
                  X.createElement(
                    'div',
                    { class: 'popup' },
                    X.createElement(
                      Yt,
                      { to: '/settings' },
                      X.createElement('div', { class: 'text popup__text' }, 'Settings'),
                    ),
                    X.createElement(
                      Yt,
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
            t,
          );
        }),
        (e.state = { isPopupShow: !1 }),
        (e.logout = e.logout.bind(sr(e))),
        e
      );
    }
    return (e = i), Object.defineProperty(e, 'prototype', { writable: !1 }), e;
  })(J);
  function dr(t) {
    return (
      (dr =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (t) {
              return typeof t;
            }
          : function (t) {
              return t &&
                'function' == typeof Symbol &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? 'symbol'
                : typeof t;
            }),
      dr(t)
    );
  }
  function br(t, e) {
    if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
  }
  function hr(t, e) {
    return (
      (hr =
        Object.setPrototypeOf ||
        function (t, e) {
          return (t.__proto__ = e), t;
        }),
      hr(t, e)
    );
  }
  function mr(t, e) {
    if (e && ('object' === dr(e) || 'function' == typeof e)) return e;
    if (void 0 !== e)
      throw new TypeError('Derived constructors may only return object or undefined');
    return vr(t);
  }
  function vr(t) {
    if (void 0 === t)
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return t;
  }
  function gr(t) {
    return (
      (gr = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t);
          }),
      gr(t)
    );
  }
  function wr(t, e, r) {
    return (
      e in t
        ? Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 })
        : (t[e] = r),
      t
    );
  }
  var _r = (function (t) {
    !(function (t, e) {
      if ('function' != typeof e && null !== e)
        throw new TypeError('Super expression must either be null or a function');
      (t.prototype = Object.create(e && e.prototype, {
        constructor: { value: t, writable: !0, configurable: !0 },
      })),
        Object.defineProperty(t, 'prototype', { writable: !1 }),
        e && hr(t, e);
    })(i, t);
    var e,
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
          } catch (t) {
            return !1;
          }
        })()),
        function () {
          var t,
            e = gr(r);
          if (n) {
            var o = gr(this).constructor;
            t = Reflect.construct(e, arguments, o);
          } else t = e.apply(this, arguments);
          return mr(this, t);
        });
    function i() {
      var t;
      br(this, i);
      for (var e = arguments.length, r = new Array(e), n = 0; n < e; n++) r[n] = arguments[n];
      return (
        wr(vr((t = o.call.apply(o, [this].concat(r)))), 'render', function () {
          return X.createElement('div', { class: 'carousel-row' }, t.children);
        }),
        t
      );
    }
    return (e = i), Object.defineProperty(e, 'prototype', { writable: !1 }), e;
  })(J);
  function Or(t) {
    return (
      (Or =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (t) {
              return typeof t;
            }
          : function (t) {
              return t &&
                'function' == typeof Symbol &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? 'symbol'
                : typeof t;
            }),
      Or(t)
    );
  }
  function Er(t, e) {
    return (
      (Er =
        Object.setPrototypeOf ||
        function (t, e) {
          return (t.__proto__ = e), t;
        }),
      Er(t, e)
    );
  }
  function jr(t, e) {
    if (e && ('object' === Or(e) || 'function' == typeof e)) return e;
    if (void 0 !== e)
      throw new TypeError('Derived constructors may only return object or undefined');
    return Pr(t);
  }
  function Pr(t) {
    if (void 0 === t)
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return t;
  }
  function kr(t) {
    return (
      (kr = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t);
          }),
      kr(t)
    );
  }
  var Sr = (function (t) {
    !(function (t, e) {
      if ('function' != typeof e && null !== e)
        throw new TypeError('Super expression must either be null or a function');
      (t.prototype = Object.create(e && e.prototype, {
        constructor: { value: t, writable: !0, configurable: !0 },
      })),
        Object.defineProperty(t, 'prototype', { writable: !1 }),
        e && Er(t, e);
    })(i, t);
    var e,
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
          } catch (t) {
            return !1;
          }
        })()),
        function () {
          var t,
            e = kr(r);
          if (n) {
            var o = kr(this).constructor;
            t = Reflect.construct(e, arguments, o);
          } else t = e.apply(this, arguments);
          return jr(this, t);
        });
    function i(t) {
      var e;
      return (
        (function (t, e) {
          if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
        })(this, i),
        (function (t, e, r) {
          e in t
            ? Object.defineProperty(t, e, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (t[e] = r);
        })(Pr((e = o.call(this, t))), 'render', function () {
          var t = e.props,
            r = t.cover,
            n = t.title,
            o = t.artist;
          return X.createElement(
            'div',
            { class: 'album' },
            X.createElement('img', { class: 'album__image', src: r }),
            X.createElement('div', { class: 'text album__title' }, n),
            X.createElement('div', { class: 'text album__artist' }, o),
          );
        }),
        (e.state = { cover: '', title: '', artist: '' }),
        e
      );
    }
    return (e = i), Object.defineProperty(e, 'prototype', { writable: !1 }), e;
  })(X.Component);
  function Rr(t) {
    return (
      (Rr =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (t) {
              return typeof t;
            }
          : function (t) {
              return t &&
                'function' == typeof Symbol &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? 'symbol'
                : typeof t;
            }),
      Rr(t)
    );
  }
  function Tr(t, e) {
    if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
  }
  function xr(t, e) {
    for (var r = 0; r < e.length; r++) {
      var n = e[r];
      (n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        'value' in n && (n.writable = !0),
        Object.defineProperty(t, n.key, n);
    }
  }
  function Ar(t, e) {
    return (
      (Ar =
        Object.setPrototypeOf ||
        function (t, e) {
          return (t.__proto__ = e), t;
        }),
      Ar(t, e)
    );
  }
  function Cr(t, e) {
    if (e && ('object' === Rr(e) || 'function' == typeof e)) return e;
    if (void 0 !== e)
      throw new TypeError('Derived constructors may only return object or undefined');
    return Nr(t);
  }
  function Nr(t) {
    if (void 0 === t)
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return t;
  }
  function Dr(t) {
    return (
      (Dr = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t);
          }),
      Dr(t)
    );
  }
  function Br(t, e, r) {
    return (
      e in t
        ? Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 })
        : (t[e] = r),
      t
    );
  }
  var Ir = (function (t) {
    !(function (t, e) {
      if ('function' != typeof e && null !== e)
        throw new TypeError('Super expression must either be null or a function');
      (t.prototype = Object.create(e && e.prototype, {
        constructor: { value: t, writable: !0, configurable: !0 },
      })),
        Object.defineProperty(t, 'prototype', { writable: !1 }),
        e && Ar(t, e);
    })(a, t);
    var e,
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
          } catch (t) {
            return !1;
          }
        })()),
        function () {
          var t,
            e = Dr(n);
          if (o) {
            var r = Dr(this).constructor;
            t = Reflect.construct(e, arguments, r);
          } else t = e.apply(this, arguments);
          return Cr(this, t);
        });
    function a() {
      var t;
      Tr(this, a);
      for (var e = arguments.length, r = new Array(e), n = 0; n < e; n++) r[n] = arguments[n];
      return (
        Br(Nr((t = i.call.apply(i, [this].concat(r)))), 'render', function () {
          var e = t.props,
            r = e.cover,
            n = e.name;
          return X.createElement(
            'div',
            { onclick: t.props.onClick, class: 'artist' },
            X.createElement('img', { class: 'artist__image', src: r }),
            X.createElement('div', { class: 'text artist__name' }, ' ', n),
          );
        }),
        t
      );
    }
    return (
      (e = a),
      (r = [
        {
          key: 'someHandler',
          value: function () {
            console.log('hui');
          },
        },
      ]) && xr(e.prototype, r),
      Object.defineProperty(e, 'prototype', { writable: !1 }),
      a
    );
  })(X.Component);
  function Lr(t, e) {
    for (var r = 0; r < e.length; r++) {
      var n = e[r];
      (n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        'value' in n && (n.writable = !0),
        Object.defineProperty(t, n.key, n);
    }
  }
  var Mr = (function () {
    function t() {
      !(function (t, e) {
        if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
      })(this, t);
    }
    var e, r;
    return (
      (e = t),
      (r = [
        {
          key: 'getPopular',
          value: function () {
            return ft.get('api/v1/albums/popular').then(function (t) {
              return 200 !== t.status ? Promise.reject(t.body) : t.body.Result;
            });
          },
        },
      ]),
      null && Lr(e.prototype, null),
      r && Lr(e, r),
      Object.defineProperty(e, 'prototype', { writable: !1 }),
      t
    );
  })();
  function Ur(t) {
    Mr.getPopular().then(function (e) {
      t({ type: 'popular/album', payload: e });
    });
  }
  const Vr = {
    popular: 'api/v1/artists/popular',
    artistID: 'api/v1/artists/',
    artistPopular: 'api/v1/artists/{id}/popular',
  };
  function zr(t, e) {
    for (var r = 0; r < e.length; r++) {
      var n = e[r];
      (n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        'value' in n && (n.writable = !0),
        Object.defineProperty(t, n.key, n);
    }
  }
  var Fr = (function () {
    function t() {
      !(function (t, e) {
        if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
      })(this, t);
    }
    var e, r;
    return (
      (e = t),
      (r = [
        {
          key: 'getPopular',
          value: function () {
            return ft.get(Vr.popular).then(function (t) {
              return 200 !== t.status ? Promise.reject(t.body) : t.body.Result;
            });
          },
        },
        {
          key: 'getArtistById',
          value: function (t) {
            return ft.get(Vr.artistID + t.toString()).then(function (e) {
              if (200 !== e.status) return Promise.reject(e.body);
              console.log('req id:', t);
              var r = {};
              return (r[t] = e.body.Result), r;
            });
          },
        },
        {
          key: 'getArtistPopularById',
          value: function (t) {
            var e = Vr.artistPopular.replace('{id}', t.toString());
            return ft.get(e).then(function (e) {
              if (200 !== e.status) return Promise.reject(e.body);
              console.log('req id:', t);
              var r = {};
              return (r[t] = e.body.Result), r;
            });
          },
        },
      ]),
      null && zr(e.prototype, null),
      r && zr(e, r),
      Object.defineProperty(e, 'prototype', { writable: !1 }),
      t
    );
  })();
  function Wr(t) {
    Fr.getPopular().then(function (e) {
      t({ type: 'popular/artist', payload: e });
    });
  }
  function Hr(t) {
    return (
      (Hr =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (t) {
              return typeof t;
            }
          : function (t) {
              return t &&
                'function' == typeof Symbol &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? 'symbol'
                : typeof t;
            }),
      Hr(t)
    );
  }
  function qr(t, e) {
    return (
      (qr =
        Object.setPrototypeOf ||
        function (t, e) {
          return (t.__proto__ = e), t;
        }),
      qr(t, e)
    );
  }
  function $r(t, e) {
    if (e && ('object' === Hr(e) || 'function' == typeof e)) return e;
    if (void 0 !== e)
      throw new TypeError('Derived constructors may only return object or undefined');
    return Gr(t);
  }
  function Gr(t) {
    if (void 0 === t)
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return t;
  }
  function Jr(t) {
    return (
      (Jr = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t);
          }),
      Jr(t)
    );
  }
  var Yr = (function (t) {
    !(function (t, e) {
      if ('function' != typeof e && null !== e)
        throw new TypeError('Super expression must either be null or a function');
      (t.prototype = Object.create(e && e.prototype, {
        constructor: { value: t, writable: !0, configurable: !0 },
      })),
        Object.defineProperty(t, 'prototype', { writable: !1 }),
        e && qr(t, e);
    })(i, t);
    var e,
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
          } catch (t) {
            return !1;
          }
        })()),
        function () {
          var t,
            e = Jr(r);
          if (n) {
            var o = Jr(this).constructor;
            t = Reflect.construct(e, arguments, o);
          } else t = e.apply(this, arguments);
          return $r(this, t);
        });
    function i(t) {
      var e;
      return (
        (function (t, e) {
          if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
        })(this, i),
        (function (t, e, r) {
          e in t
            ? Object.defineProperty(t, e, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (t[e] = r);
        })(Gr((e = o.call(this, t))), 'render', function () {
          return X.createElement(
            'div',
            { class: 'main__popular' },
            X.createElement(
              'div',
              { class: 'main__popular__albums main__popular_slider-hidden' },
              X.createElement('div', { class: 'text main__popular__title' }, 'Popular albums'),
              X.createElement(
                _r,
                null,
                e.props.albums
                  ? e.props.albums.map(function (t) {
                      return X.createElement(Sr, {
                        cover: st + t.cover,
                        title: t.title,
                        artist: t.artist,
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
                _r,
                null,
                e.props.artists
                  ? e.props.artists.map(function (t) {
                      return X.createElement(Yt, {
                        to: '/artist/'.concat(t.cover.split('_')[1].split('.')[0]),
                        as: Ir,
                        cover: st + t.cover,
                        name: t.name,
                      });
                    })
                  : '',
              ),
            ),
          );
        }),
        e.props.getAlbums(),
        e.props.getArtist(),
        console.log(e.props),
        e
      );
    }
    return (e = i), Object.defineProperty(e, 'prototype', { writable: !1 }), e;
  })(X.Component);
  const Zr = Je(
    function (t) {
      return {
        artists: t.artistPopular ? t.artistPopular.popular : null,
        albums: t.albumPopular ? t.albumPopular.popular : null,
      };
    },
    function (t) {
      return {
        getArtist: function () {
          t(Wr);
        },
        getAlbums: function () {
          t(Ur);
        },
      };
    },
  )(Yr);
  function Kr(t) {
    return (
      (Kr =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (t) {
              return typeof t;
            }
          : function (t) {
              return t &&
                'function' == typeof Symbol &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? 'symbol'
                : typeof t;
            }),
      Kr(t)
    );
  }
  function Xr(t, e) {
    if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
  }
  function Qr(t, e) {
    return (
      (Qr =
        Object.setPrototypeOf ||
        function (t, e) {
          return (t.__proto__ = e), t;
        }),
      Qr(t, e)
    );
  }
  function tn(t, e) {
    if (e && ('object' === Kr(e) || 'function' == typeof e)) return e;
    if (void 0 !== e)
      throw new TypeError('Derived constructors may only return object or undefined');
    return en(t);
  }
  function en(t) {
    if (void 0 === t)
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return t;
  }
  function rn(t) {
    return (
      (rn = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t);
          }),
      rn(t)
    );
  }
  function nn(t, e, r) {
    return (
      e in t
        ? Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 })
        : (t[e] = r),
      t
    );
  }
  var on = (function (t) {
    !(function (t, e) {
      if ('function' != typeof e && null !== e)
        throw new TypeError('Super expression must either be null or a function');
      (t.prototype = Object.create(e && e.prototype, {
        constructor: { value: t, writable: !0, configurable: !0 },
      })),
        Object.defineProperty(t, 'prototype', { writable: !1 }),
        e && Qr(t, e);
    })(i, t);
    var e,
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
          } catch (t) {
            return !1;
          }
        })()),
        function () {
          var t,
            e = rn(r);
          if (n) {
            var o = rn(this).constructor;
            t = Reflect.construct(e, arguments, o);
          } else t = e.apply(this, arguments);
          return tn(this, t);
        });
    function i() {
      var t;
      Xr(this, i);
      for (var e = arguments.length, r = new Array(e), n = 0; n < e; n++) r[n] = arguments[n];
      return (
        nn(en((t = o.call.apply(o, [this].concat(r)))), 'render', function () {
          var e = t.props.isAuthorized;
          return X.createElement(
            'div',
            { class: 'main__page' },
            X.createElement(yr, { isAuthorized: e }),
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
            X.createElement(Zr, null),
          );
        }),
        t
      );
    }
    return (e = i), Object.defineProperty(e, 'prototype', { writable: !1 }), e;
  })(J);
  function an(t, e) {
    (null == e || e > t.length) && (e = t.length);
    for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
    return n;
  }
  function cn(t, e) {
    return (
      (function (t) {
        if (Array.isArray(t)) return t;
      })(t) ||
      (function (t, e) {
        var r =
          null == t
            ? null
            : ('undefined' != typeof Symbol && t[Symbol.iterator]) || t['@@iterator'];
        if (null != r) {
          var n,
            o,
            i = [],
            a = !0,
            c = !1;
          try {
            for (
              r = r.call(t);
              !(a = (n = r.next()).done) && (i.push(n.value), !e || i.length !== e);
              a = !0
            );
          } catch (t) {
            (c = !0), (o = t);
          } finally {
            try {
              a || null == r.return || r.return();
            } finally {
              if (c) throw o;
            }
          }
          return i;
        }
      })(t, e) ||
      (function (t, e) {
        if (t) {
          if ('string' == typeof t) return un(t, e);
          var r = Object.prototype.toString.call(t).slice(8, -1);
          return (
            'Object' === r && t.constructor && (r = t.constructor.name),
            'Map' === r || 'Set' === r
              ? Array.from(t)
              : 'Arguments' === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
              ? un(t, e)
              : void 0
          );
        }
      })(t, e) ||
      (function () {
        throw new TypeError(
          'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
        );
      })()
    );
  }
  function un(t, e) {
    (null == e || e > t.length) && (e = t.length);
    for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
    return n;
  }
  const ln = (function (t) {
    return function (e, r) {
      return (
        Object.entries(t).map(function (t) {
          var n,
            o,
            i =
              ((o = 2),
              (function (t) {
                if (Array.isArray(t)) return t;
              })((n = t)) ||
                (function (t, e) {
                  var r =
                    null == t
                      ? null
                      : ('undefined' != typeof Symbol && t[Symbol.iterator]) || t['@@iterator'];
                  if (null != r) {
                    var n,
                      o,
                      i = [],
                      a = !0,
                      c = !1;
                    try {
                      for (
                        r = r.call(t);
                        !(a = (n = r.next()).done) && (i.push(n.value), !e || i.length !== e);
                        a = !0
                      );
                    } catch (t) {
                      (c = !0), (o = t);
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
                (function (t, e) {
                  if (t) {
                    if ('string' == typeof t) return an(t, e);
                    var r = Object.prototype.toString.call(t).slice(8, -1);
                    return (
                      'Object' === r && t.constructor && (r = t.constructor.name),
                      'Map' === r || 'Set' === r
                        ? Array.from(t)
                        : 'Arguments' === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                        ? an(t, e)
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
          e[a] || (e[a] = {}), c(e[a], r);
        }),
        e
      );
    };
  })({
    tracksPopular: function (t, e) {
      return 'popular/track' === e.type && (t.popular = e.payload), t;
    },
    albumPopular: function (t, e) {
      return 'popular/album' === e.type && (t.popular = e.payload), t;
    },
    artistPopular: function (t, e) {
      return 'popular/artist' === e.type && (t.popular = e.payload), t;
    },
    artist: function (t, e) {
      if ('get/artist' === e.type)
        for (var r = 0, n = Object.entries(e.payload); r < n.length; r++) {
          var o = cn(n[r], 2),
            i = o[0],
            a = o[1];
          t[i] = a;
        }
      return t;
    },
    artistPopularTracks: function (t, e) {
      if ('get/artist/popular' === e.type)
        for (var r = 0, n = Object.entries(e.payload); r < n.length; r++) {
          var o = cn(n[r], 2),
            i = o[0],
            a = o[1];
          console.log('key', i, a), (t[i] = a);
        }
      return t;
    },
    user: function (t, e) {
      switch (e.type) {
        case 'logout/user':
          return null;
        case 'self/user':
        case 'login/user':
        case 'signup/user':
          return e.payload;
        default:
          return t;
      }
    },
  });
  function sn(t, e) {
    if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
  }
  function fn(t, e) {
    for (var r = 0; r < e.length; r++) {
      var n = e[r];
      (n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        'value' in n && (n.writable = !0),
        Object.defineProperty(t, n.key, n);
    }
  }
  function pn(t, e, r) {
    !(function (t, e) {
      if (e.has(t))
        throw new TypeError('Cannot initialize the same private elements twice on an object');
    })(t, e),
      e.set(t, r);
  }
  function yn(t, e) {
    return (function (t, e) {
      return e.get ? e.get.call(t) : e.value;
    })(t, bn(t, e, 'get'));
  }
  function dn(t, e, r) {
    return (
      (function (t, e, r) {
        if (e.set) e.set.call(t, r);
        else {
          if (!e.writable) throw new TypeError('attempted to set read only private field');
          e.value = r;
        }
      })(t, bn(t, e, 'set'), r),
      r
    );
  }
  function bn(t, e, r) {
    if (!e.has(t)) throw new TypeError('attempted to ' + r + ' private field on non-instance');
    return e.get(t);
  }
  var hn = new WeakMap(),
    mn = new WeakMap(),
    vn = new WeakMap(),
    gn = new WeakMap(),
    wn = (function () {
      function t() {
        var e =
            arguments.length > 0 && void 0 !== arguments[0]
              ? arguments[0]
              : function (t) {
                  return t;
                },
          r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
          n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        sn(this, t),
          pn(this, hn, { writable: !0, value: void 0 }),
          pn(this, mn, { writable: !0, value: void 0 }),
          pn(this, vn, { writable: !0, value: void 0 }),
          pn(this, gn, { writable: !0, value: void 0 }),
          dn(this, hn, n),
          console.log('Middleware', r),
          (this.dispatch = this.dispatch.bind(this));
        for (var o = 0; o < r.length; o += 1) {
          var i = r[o];
          this.dispatch = i(this)(this.dispatch);
        }
        dn(this, gn, []), dn(this, vn, e), (this.subscribe = this.subscribe.bind(this));
      }
      var e, r;
      return (
        (e = t),
        (r = [
          {
            key: 'getState',
            value: function () {
              return yn(this, hn);
            },
          },
          {
            key: 'subscribe',
            value: function (t) {
              yn(this, gn).push(t);
            },
          },
          {
            key: 'dispatch',
            value: function (t) {
              var e = this;
              console.log('dispatch:', this),
                dn(this, hn, yn(this, vn).call(this, yn(this, hn), t)),
                yn(this, gn).forEach(function (t) {
                  t(yn(e, hn));
                });
            },
          },
        ]) && fn(e.prototype, r),
        Object.defineProperty(e, 'prototype', { writable: !1 }),
        t
      );
    })();
  function _n(t) {
    return (
      (_n =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (t) {
              return typeof t;
            }
          : function (t) {
              return t &&
                'function' == typeof Symbol &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? 'symbol'
                : typeof t;
            }),
      _n(t)
    );
  }
  function On(t, e) {
    if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
  }
  function En(t, e) {
    for (var r = 0; r < e.length; r++) {
      var n = e[r];
      (n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        'value' in n && (n.writable = !0),
        Object.defineProperty(t, n.key, n);
    }
  }
  function jn(t, e) {
    return (
      (jn =
        Object.setPrototypeOf ||
        function (t, e) {
          return (t.__proto__ = e), t;
        }),
      jn(t, e)
    );
  }
  function Pn(t, e) {
    if (e && ('object' === _n(e) || 'function' == typeof e)) return e;
    if (void 0 !== e)
      throw new TypeError('Derived constructors may only return object or undefined');
    return (function (t) {
      if (void 0 === t)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return t;
    })(t);
  }
  function kn(t) {
    return (
      (kn = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t);
          }),
      kn(t)
    );
  }
  var Sn = (function (t) {
      !(function (t, e) {
        if ('function' != typeof e && null !== e)
          throw new TypeError('Super expression must either be null or a function');
        (t.prototype = Object.create(e && e.prototype, {
          constructor: { value: t, writable: !0, configurable: !0 },
        })),
          Object.defineProperty(t, 'prototype', { writable: !1 }),
          e && jn(t, e);
      })(a, t);
      var e,
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
            } catch (t) {
              return !1;
            }
          })()),
          function () {
            var t,
              e = kn(n);
            if (o) {
              var r = kn(this).constructor;
              t = Reflect.construct(e, arguments, r);
            } else t = e.apply(this, arguments);
            return Pn(this, t);
          });
      function a() {
        return On(this, a), i.apply(this, arguments);
      }
      return (
        (e = a),
        (r = [
          {
            key: 'render',
            value: function () {
              return X.createElement(X.Fragment, null, this.props.children);
            },
          },
        ]) && En(e.prototype, r),
        Object.defineProperty(e, 'prototype', { writable: !1 }),
        a
      );
    })(X.Component),
    Rn = /^(?:(?:\/:?[\w_~.-]+)*|\/)$/,
    Tn = /^(?:(?:\/[\w_~.-]+)*|\/)$/;
  function xn(t, e, r) {
    if (!t.match(Rn)) throw Error('Invalid route: '.concat(t));
    if (!e.match(Tn)) throw Error('Invalid path: '.concat(e));
    var n = t.split('/').filter(function (t) {
        return t;
      }),
      o = e.split('/').filter(function (t) {
        return t;
      }),
      i = {};
    if (n.length > o.length) return null;
    if (r && n.length !== o.length) return null;
    if (
      !n.every(function (t, e) {
        var r = o[e];
        return t.startsWith(':') ? ((i[t.slice(1)] = r), !0) : t === r;
      })
    )
      return null;
    var a = '/'.concat(o.slice(0, n.length).join('/')),
      c = '/'.concat(o.slice(n.length).join('/'));
    return { params: i, handled: a, rest: c };
  }
  function An(t) {
    return (
      (An =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (t) {
              return typeof t;
            }
          : function (t) {
              return t &&
                'function' == typeof Symbol &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? 'symbol'
                : typeof t;
            }),
      An(t)
    );
  }
  function Cn(t, e) {
    (null == e || e > t.length) && (e = t.length);
    for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
    return n;
  }
  function Nn(t, e) {
    for (var r = 0; r < e.length; r++) {
      var n = e[r];
      (n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        'value' in n && (n.writable = !0),
        Object.defineProperty(t, n.key, n);
    }
  }
  function Dn(t, e) {
    return (
      (Dn =
        Object.setPrototypeOf ||
        function (t, e) {
          return (t.__proto__ = e), t;
        }),
      Dn(t, e)
    );
  }
  function Bn(t, e) {
    if (e && ('object' === An(e) || 'function' == typeof e)) return e;
    if (void 0 !== e)
      throw new TypeError('Derived constructors may only return object or undefined');
    return (function (t) {
      if (void 0 === t)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return t;
    })(t);
  }
  function In(t) {
    return (
      (In = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t);
          }),
      In(t)
    );
  }
  var Ln = (function (t) {
    !(function (t, e) {
      if ('function' != typeof e && null !== e)
        throw new TypeError('Super expression must either be null or a function');
      (t.prototype = Object.create(e && e.prototype, {
        constructor: { value: t, writable: !0, configurable: !0 },
      })),
        Object.defineProperty(t, 'prototype', { writable: !1 }),
        e && Dn(t, e);
    })(a, t);
    var e,
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
          } catch (t) {
            return !1;
          }
        })()),
        function () {
          var t,
            e = In(n);
          if (o) {
            var r = In(this).constructor;
            t = Reflect.construct(e, arguments, r);
          } else t = e.apply(this, arguments);
          return Bn(this, t);
        });
    function a(t) {
      var e;
      if (
        ((function (t, e) {
          if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
        })(this, a),
        ((e = i.call(this, t)).toRenderIdx = null),
        null == e.context)
      )
        throw Error('Router has not been found');
      return e;
    }
    return (
      (e = a),
      (r = [
        {
          key: 'route',
          value: function () {
            var t = this.context;
            if (
              !this.children.every(function (t) {
                return t instanceof X.VirtualElement && t.type === Sn;
              })
            )
              throw Error('RouteSwitch have to contain only Route components');
            this.toRenderIdx = null;
            var e,
              r = 0,
              n = (function (t, e) {
                var r = ('undefined' != typeof Symbol && t[Symbol.iterator]) || t['@@iterator'];
                if (!r) {
                  if (
                    Array.isArray(t) ||
                    (r = (function (t, e) {
                      if (t) {
                        if ('string' == typeof t) return Cn(t, e);
                        var r = Object.prototype.toString.call(t).slice(8, -1);
                        return (
                          'Object' === r && t.constructor && (r = t.constructor.name),
                          'Map' === r || 'Set' === r
                            ? Array.from(t)
                            : 'Arguments' === r ||
                              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                            ? Cn(t, e)
                            : void 0
                        );
                      }
                    })(t)) ||
                    (e && t && 'number' == typeof t.length)
                  ) {
                    r && (t = r);
                    var n = 0,
                      o = function () {};
                    return {
                      s: o,
                      n: function () {
                        return n >= t.length ? { done: !0 } : { done: !1, value: t[n++] };
                      },
                      e: function (t) {
                        throw t;
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
                    r = r.call(t);
                  },
                  n: function () {
                    var t = r.next();
                    return (a = t.done), t;
                  },
                  e: function (t) {
                    (c = !0), (i = t);
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
              for (n.s(); !(e = n.n()).done; ) {
                var o = e.value.props,
                  i = o.to,
                  a = o.exact,
                  c = xn(i, t.unhandledPath, a);
                if (c) {
                  var u = c.params,
                    l = c.handled,
                    s = c.rest;
                  (t.unhandledPath = s),
                    t.handledSwitchers.push({ path: l, switcher: this, params: u }),
                    (this.toRenderIdx = r);
                  break;
                }
                r += 1;
              }
            } catch (t) {
              n.e(t);
            } finally {
              n.f();
            }
          },
        },
        {
          key: 'render',
          value: function () {
            var t = this.context;
            if ((t.contains(this) || this.route(), null == this.toRenderIdx))
              throw (console.log(t), Error('RouteSwitch no match'));
            return X.createElement(
              Lt.Provider,
              { value: t },
              this.props.children[this.toRenderIdx],
            );
          },
        },
      ]) && Nn(e.prototype, r),
      Object.defineProperty(e, 'prototype', { writable: !1 }),
      a
    );
  })(X.Component);
  function Mn(t, e) {
    (null == e || e > t.length) && (e = t.length);
    for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
    return n;
  }
  function Un(t, e) {
    for (var r = 0; r < e.length; r++) {
      var n = e[r];
      (n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        'value' in n && (n.writable = !0),
        Object.defineProperty(t, n.key, n);
    }
  }
  !(function (t, e, r) {
    e in t
      ? Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 })
      : (t[e] = r);
  })(Ln, 'contextType', Lt);
  var Vn = (function () {
    function t(e) {
      !(function (t, e) {
        if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
      })(this, t),
        (this.handledSwitchers = []),
        (this.unhandledPath = window.location.pathname),
        (this.router = e);
    }
    var e, r;
    return (
      (e = t),
      (r = [
        {
          key: 'params',
          get: function () {
            return D.apply(
              void 0,
              (function (t) {
                if (Array.isArray(t)) return Mn(t);
              })(
                (t = this.handledSwitchers.map(function (t) {
                  return t.params;
                })),
              ) ||
                (function (t) {
                  if (
                    ('undefined' != typeof Symbol && null != t[Symbol.iterator]) ||
                    null != t['@@iterator']
                  )
                    return Array.from(t);
                })(t) ||
                (function (t, e) {
                  if (t) {
                    if ('string' == typeof t) return Mn(t, e);
                    var r = Object.prototype.toString.call(t).slice(8, -1);
                    return (
                      'Object' === r && t.constructor && (r = t.constructor.name),
                      'Map' === r || 'Set' === r
                        ? Array.from(t)
                        : 'Arguments' === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                        ? Mn(t, e)
                        : void 0
                    );
                  }
                })(t) ||
                (function () {
                  throw new TypeError(
                    'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                  );
                })(),
            );
            var t;
          },
        },
        {
          key: 'start',
          value: function () {
            var t = this;
            window.onpopstate = function (e) {
              e.preventDefault(), t.rerender(window.location.pathname);
            };
          },
        },
        {
          key: 'go',
          value: function (t) {
            t === window.location.pathname
              ? window.history.replaceState(null, '', t)
              : window.history.pushState(null, '', t),
              this.rerender(t);
          },
        },
        {
          key: 'contains',
          value: function (t) {
            return this.handledSwitchers.some(function (e) {
              return e.switcher === t;
            });
          },
        },
        {
          key: 'rerender',
          value: function (t) {
            (this.unhandledPath = t),
              (this.handledSwitchers.length = 0),
              this.router.enqueueUpdate();
          },
        },
      ]) && Un(e.prototype, r),
      Object.defineProperty(e, 'prototype', { writable: !1 }),
      t
    );
  })();
  function zn(t) {
    return (
      (zn =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (t) {
              return typeof t;
            }
          : function (t) {
              return t &&
                'function' == typeof Symbol &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? 'symbol'
                : typeof t;
            }),
      zn(t)
    );
  }
  function Fn(t, e) {
    for (var r = 0; r < e.length; r++) {
      var n = e[r];
      (n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        'value' in n && (n.writable = !0),
        Object.defineProperty(t, n.key, n);
    }
  }
  function Wn(t, e) {
    return (
      (Wn =
        Object.setPrototypeOf ||
        function (t, e) {
          return (t.__proto__ = e), t;
        }),
      Wn(t, e)
    );
  }
  function Hn(t, e) {
    if (e && ('object' === zn(e) || 'function' == typeof e)) return e;
    if (void 0 !== e)
      throw new TypeError('Derived constructors may only return object or undefined');
    return qn(t);
  }
  function qn(t) {
    if (void 0 === t)
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return t;
  }
  function $n(t) {
    return (
      ($n = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t);
          }),
      $n(t)
    );
  }
  var Gn = (function (t) {
    !(function (t, e) {
      if ('function' != typeof e && null !== e)
        throw new TypeError('Super expression must either be null or a function');
      (t.prototype = Object.create(e && e.prototype, {
        constructor: { value: t, writable: !0, configurable: !0 },
      })),
        Object.defineProperty(t, 'prototype', { writable: !1 }),
        e && Wn(t, e);
    })(a, t);
    var e,
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
          } catch (t) {
            return !1;
          }
        })()),
        function () {
          var t,
            e = $n(n);
          if (o) {
            var r = $n(this).constructor;
            t = Reflect.construct(e, arguments, r);
          } else t = e.apply(this, arguments);
          return Hn(this, t);
        });
    function a(t) {
      var e;
      return (
        (function (t, e) {
          if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
        })(this, a),
        ((e = i.call(this, t)).navigator = new Vn(qn(e))),
        e.navigator.start(),
        e
      );
    }
    return (
      (e = a),
      (r = [
        {
          key: 'render',
          value: function () {
            return X.createElement(Lt.Provider, { value: this.navigator }, this.props.children);
          },
        },
      ]) && Fn(e.prototype, r),
      Object.defineProperty(e, 'prototype', { writable: !1 }),
      a
    );
  })(X.Component);
  function Jn(t, e) {
    for (var r = 0; r < e.length; r++) {
      var n = e[r];
      (n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        'value' in n && (n.writable = !0),
        Object.defineProperty(t, n.key, n);
    }
  }
  var Yn,
    Zn,
    Kn = (function () {
      function t() {
        !(function (t, e) {
          if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
        })(this, t);
      }
      var e, r;
      return (
        (e = t),
        (r = [
          {
            key: 'getCSRFToken',
            value: function () {
              return ft.get('api/v1/get_csrf').then(function (t) {
                return console.log(t), t;
              });
            },
          },
          {
            key: 'getUser',
            value: function () {
              return ft.get('api/v1/users/self').then(function (t) {
                return 200 !== t.status ? Promise.reject(t.body) : t.body;
              });
            },
          },
          {
            key: 'logout',
            value: function () {
              var e = null;
              return ft
                .post('api/v1/logout', null)
                .then(function (r) {
                  return 200 !== r.status
                    ? Promise.reject(r.body)
                    : ((e = r.body), t.getCSRFToken());
                })
                .then(function () {
                  return e;
                });
            },
          },
          {
            key: 'login',
            value: function (t) {
              var e = t.email,
                r = t.username,
                n = t.password;
              return ft
                .post('api/v1/login', { email: e, username: r, password: n })
                .then(function (t) {
                  return 200 !== t.status ? Promise.reject(t.body) : t.body;
                });
            },
          },
          {
            key: 'signup',
            value: function (t) {
              return ft.post('api/v1/signup', t).then(function (t) {
                return 200 !== t.status ? Promise.reject(t.body) : t.body;
              });
            },
          },
          {
            key: 'updateUser',
            value: function (t) {
              return ft.put('api/v1/users/self', t).then(function (t) {
                return 200 !== t.status ? Promise.reject(t.body) : t.body;
              });
            },
          },
        ]),
        null && Jn(e.prototype, null),
        r && Jn(e, r),
        Object.defineProperty(e, 'prototype', { writable: !1 }),
        t
      );
    })();
  function Xn(t) {
    return /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/.test(
      String(t).toLowerCase(),
    );
  }
  function Qn(t) {
    return /^[a-z0-9_]{3,16}$/.test(String(t).toLowerCase());
  }
  function to(t) {
    return (
      (to =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (t) {
              return typeof t;
            }
          : function (t) {
              return t &&
                'function' == typeof Symbol &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? 'symbol'
                : typeof t;
            }),
      to(t)
    );
  }
  function eo(t, e) {
    for (var r = 0; r < e.length; r++) {
      var n = e[r];
      (n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        'value' in n && (n.writable = !0),
        Object.defineProperty(t, n.key, n);
    }
  }
  function ro(t, e) {
    return (
      (ro =
        Object.setPrototypeOf ||
        function (t, e) {
          return (t.__proto__ = e), t;
        }),
      ro(t, e)
    );
  }
  function no(t, e) {
    if (e && ('object' === to(e) || 'function' == typeof e)) return e;
    if (void 0 !== e)
      throw new TypeError('Derived constructors may only return object or undefined');
    return oo(t);
  }
  function oo(t) {
    if (void 0 === t)
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return t;
  }
  function io(t) {
    return (
      (io = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t);
          }),
      io(t)
    );
  }
  var ao =
    ((Yn = X.util.Debounce(600)),
    (Zn = (function (t) {
      !(function (t, e) {
        if ('function' != typeof e && null !== e)
          throw new TypeError('Super expression must either be null or a function');
        (t.prototype = Object.create(e && e.prototype, {
          constructor: { value: t, writable: !0, configurable: !0 },
        })),
          Object.defineProperty(t, 'prototype', { writable: !1 }),
          e && ro(t, e);
      })(a, t);
      var e,
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
            } catch (t) {
              return !1;
            }
          })()),
          function () {
            var t,
              e = io(n);
            if (o) {
              var r = io(this).constructor;
              t = Reflect.construct(e, arguments, r);
            } else t = e.apply(this, arguments);
            return no(this, t);
          });
      function a(t) {
        var e;
        return (
          (function (t, e) {
            if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
          })(this, a),
          ((e = i.call(this, t)).inputRef = new X.Ref()),
          (e.state = { isInvalid: !1 }),
          (e.inputHandler = e.inputHandler.bind(oo(e))),
          e
        );
      }
      return (
        (e = a),
        (r = [
          {
            key: 'value',
            get: function () {
              return this.inputRef.instance.value;
            },
          },
          {
            key: 'validate',
            value: function () {
              var t = this.inputRef.instance,
                e = !this.props.checker(t.value);
              return this.setState({ isInvalid: e }), !e;
            },
          },
          {
            key: 'validateDebounced',
            value: function () {
              this.validate();
            },
          },
          {
            key: 'inputHandler',
            value: function (t) {
              var e = this.props.onInput;
              null != e && e(t), this.validateDebounced();
            },
          },
          {
            key: 'render',
            value: function () {
              var t = this.state.isInvalid,
                e = this.props,
                r = e.placeholder,
                n = e.type,
                o = e.errorMessage;
              return X.createElement(
                X.Fragment,
                null,
                X.createElement('input', {
                  type: n,
                  placeholder: r,
                  class: 'input-line '.concat(t ? 'input__wrong' : ''),
                  ref: this.inputRef,
                  onInput: this.inputHandler,
                }),
                X.createElement(
                  'label',
                  { class: 'tooltip_danger input-label '.concat(t ? '' : 'invisible') },
                  o,
                ),
              );
            },
          },
        ]) && eo(e.prototype, r),
        Object.defineProperty(e, 'prototype', { writable: !1 }),
        a
      );
    })(X.Component)),
    (function (t, e, r, n, o) {
      var i = {};
      Object.keys(n).forEach(function (t) {
        i[t] = n[t];
      }),
        (i.enumerable = !!i.enumerable),
        (i.configurable = !!i.configurable),
        ('value' in i || i.initializer) && (i.writable = !0),
        (i = r
          .slice()
          .reverse()
          .reduce(function (r, n) {
            return n(t, e, r) || r;
          }, i)),
        o &&
          void 0 !== i.initializer &&
          ((i.value = i.initializer ? i.initializer.call(o) : void 0), (i.initializer = void 0)),
        void 0 === i.initializer && (Object.defineProperty(t, e, i), (i = null));
    })(
      Zn.prototype,
      'validateDebounced',
      [Yn],
      Object.getOwnPropertyDescriptor(Zn.prototype, 'validateDebounced'),
      Zn.prototype,
    ),
    Zn);
  function co(t) {
    return (
      (co =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (t) {
              return typeof t;
            }
          : function (t) {
              return t &&
                'function' == typeof Symbol &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? 'symbol'
                : typeof t;
            }),
      co(t)
    );
  }
  function uo(t, e) {
    for (var r = 0; r < e.length; r++) {
      var n = e[r];
      (n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        'value' in n && (n.writable = !0),
        Object.defineProperty(t, n.key, n);
    }
  }
  function lo(t, e) {
    return (
      (lo =
        Object.setPrototypeOf ||
        function (t, e) {
          return (t.__proto__ = e), t;
        }),
      lo(t, e)
    );
  }
  function so(t, e) {
    if (e && ('object' === co(e) || 'function' == typeof e)) return e;
    if (void 0 !== e)
      throw new TypeError('Derived constructors may only return object or undefined');
    return fo(t);
  }
  function fo(t) {
    if (void 0 === t)
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return t;
  }
  function po(t) {
    return (
      (po = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t);
          }),
      po(t)
    );
  }
  function yo(t, e, r) {
    return (
      e in t
        ? Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 })
        : (t[e] = r),
      t
    );
  }
  var bo = (function (t) {
    !(function (t, e) {
      if ('function' != typeof e && null !== e)
        throw new TypeError('Super expression must either be null or a function');
      (t.prototype = Object.create(e && e.prototype, {
        constructor: { value: t, writable: !0, configurable: !0 },
      })),
        Object.defineProperty(t, 'prototype', { writable: !1 }),
        e && lo(t, e);
    })(a, t);
    var e,
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
          } catch (t) {
            return !1;
          }
        })()),
        function () {
          var t,
            e = po(n);
          if (o) {
            var r = po(this).constructor;
            t = Reflect.construct(e, arguments, r);
          } else t = e.apply(this, arguments);
          return so(this, t);
        });
    function a(t) {
      var e;
      return (
        (function (t, e) {
          if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
        })(this, a),
        yo(fo((e = i.call(this, t))), 'usernameInputRef', new X.Ref()),
        yo(fo(e), 'passwordInputRef', new X.Ref()),
        (e.handleSubmit = e.handleSubmit.bind(fo(e))),
        e
      );
    }
    return (
      (e = a),
      (r = [
        {
          key: 'handleSubmit',
          value: function (t) {
            t.preventDefault();
            var e = this.usernameInputRef.instance,
              r = this.passwordInputRef.instance,
              n = e.validate(),
              o = r.validate();
            if ((console.log(n, o), n && o)) {
              var i = e.value,
                a = r.value;
              console.log(i, a);
            }
          },
        },
        {
          key: 'render',
          value: function () {
            return X.createElement(
              'div',
              { class: 'login-page' },
              X.createElement(
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
                  X.createElement(ao, {
                    ref: this.usernameInputRef,
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
                  X.createElement(ao, {
                    ref: this.passwordInputRef,
                    type: 'password',
                    placeholder: 'Password',
                    checker: Xn,
                    errorMessage:
                      'Password have to contain at least 6 characters (digits and letters)',
                  }),
                ),
                X.createElement(
                  'div',
                  { class: 'login-form_align' },
                  X.createElement(
                    'button',
                    { onClick: this.handleSubmit, class: 'button button_blue login-form__button' },
                    'Log in',
                  ),
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
                  X.createElement('p', { class: 'menu-footer__text' }, "Don't have an account?"),
                  X.createElement(
                    'div',
                    { class: 'button button_gray menu-footer__button' },
                    X.createElement('span', null, 'Sign up'),
                  ),
                ),
              ),
            );
          },
        },
      ]) && uo(e.prototype, r),
      Object.defineProperty(e, 'prototype', { writable: !1 }),
      a
    );
  })(X.Component);
  const ho = Je(
    function (t) {
      return { user: t.Auth ? t.Auth.user : null };
    },
    function (t) {
      return {
        login: function (e) {
          var r,
            n = e.username,
            o = e.email,
            i = e.password;
          t(
            ((r = { username: n, email: o, password: i }),
            function (t) {
              Kn.login(r).then(function (e) {
                t({ type: 'logout/user', payload: e });
              });
            }),
          );
        },
        signup: function (e) {
          var r,
            n = e.username,
            o = e.email,
            i = e.password;
          t(
            ((r = { username: n, email: o, password: i }),
            function (t) {
              Kn.signup(r).then(function (e) {
                t({ type: 'signup/user', payload: e });
              });
            }),
          );
        },
      };
    },
  )(bo);
  function mo(t) {
    return (
      (mo =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (t) {
              return typeof t;
            }
          : function (t) {
              return t &&
                'function' == typeof Symbol &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? 'symbol'
                : typeof t;
            }),
      mo(t)
    );
  }
  function vo(t, e) {
    for (var r = 0; r < e.length; r++) {
      var n = e[r];
      (n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        'value' in n && (n.writable = !0),
        Object.defineProperty(t, n.key, n);
    }
  }
  function go(t, e) {
    return (
      (go =
        Object.setPrototypeOf ||
        function (t, e) {
          return (t.__proto__ = e), t;
        }),
      go(t, e)
    );
  }
  function wo(t, e) {
    if (e && ('object' === mo(e) || 'function' == typeof e)) return e;
    if (void 0 !== e)
      throw new TypeError('Derived constructors may only return object or undefined');
    return _o(t);
  }
  function _o(t) {
    if (void 0 === t)
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return t;
  }
  function Oo(t) {
    return (
      (Oo = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t);
          }),
      Oo(t)
    );
  }
  var Eo = (function (t) {
    !(function (t, e) {
      if ('function' != typeof e && null !== e)
        throw new TypeError('Super expression must either be null or a function');
      (t.prototype = Object.create(e && e.prototype, {
        constructor: { value: t, writable: !0, configurable: !0 },
      })),
        Object.defineProperty(t, 'prototype', { writable: !1 }),
        e && go(t, e);
    })(a, t);
    var e,
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
          } catch (t) {
            return !1;
          }
        })()),
        function () {
          var t,
            e = Oo(n);
          if (o) {
            var r = Oo(this).constructor;
            t = Reflect.construct(e, arguments, r);
          } else t = e.apply(this, arguments);
          return wo(this, t);
        });
    function a(t) {
      var e;
      return (
        (function (t, e) {
          if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
        })(this, a),
        (function (t, e, r) {
          e in t
            ? Object.defineProperty(t, e, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (t[e] = r);
        })(_o((e = i.call(this, t))), 'render', function () {
          var t = e.props,
            r = t.num,
            n = t.cover,
            o = t.listenedCnt,
            i = t.name,
            a = t.duration,
            c = function (t) {
              var e = Math.trunc(t).toString();
              return t >= 10 ? e : '0'.concat(e);
            },
            u = e.state.isLiked ? 'fa-solid' : 'fa-regular';
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
                onclick: e.toogleLike,
                class: 'liked-icon '.concat(u, ' fa-heart'),
              }),
              X.createElement(
                'div',
                { class: 'artist-track__duration' },
                ''.concat(c(a / 60), ':').concat(c(a % 60)),
              ),
            ),
          );
        }),
        (e.state = { isLiked: !1 }),
        (e.toogleLike = e.toogleLike.bind(_o(e))),
        e
      );
    }
    return (
      (e = a),
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
            var t = this.props.isLiked;
            this.setState({ isLiked: t });
          },
        },
      ]) && vo(e.prototype, r),
      Object.defineProperty(e, 'prototype', { writable: !1 }),
      a
    );
  })(J);
  function jo(t) {
    return (
      (jo =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (t) {
              return typeof t;
            }
          : function (t) {
              return t &&
                'function' == typeof Symbol &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? 'symbol'
                : typeof t;
            }),
      jo(t)
    );
  }
  function Po(t, e) {
    if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
  }
  function ko(t, e) {
    return (
      (ko =
        Object.setPrototypeOf ||
        function (t, e) {
          return (t.__proto__ = e), t;
        }),
      ko(t, e)
    );
  }
  function So(t, e) {
    if (e && ('object' === jo(e) || 'function' == typeof e)) return e;
    if (void 0 !== e)
      throw new TypeError('Derived constructors may only return object or undefined');
    return Ro(t);
  }
  function Ro(t) {
    if (void 0 === t)
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return t;
  }
  function To(t) {
    return (
      (To = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t);
          }),
      To(t)
    );
  }
  function xo(t, e, r) {
    return (
      e in t
        ? Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 })
        : (t[e] = r),
      t
    );
  }
  var Ao = (function (t) {
    !(function (t, e) {
      if ('function' != typeof e && null !== e)
        throw new TypeError('Super expression must either be null or a function');
      (t.prototype = Object.create(e && e.prototype, {
        constructor: { value: t, writable: !0, configurable: !0 },
      })),
        Object.defineProperty(t, 'prototype', { writable: !1 }),
        e && ko(t, e);
    })(i, t);
    var e,
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
          } catch (t) {
            return !1;
          }
        })()),
        function () {
          var t,
            e = To(r);
          if (n) {
            var o = To(this).constructor;
            t = Reflect.construct(e, arguments, o);
          } else t = e.apply(this, arguments);
          return So(this, t);
        });
    function i() {
      var t;
      Po(this, i);
      for (var e = arguments.length, r = new Array(e), n = 0; n < e; n++) r[n] = arguments[n];
      return (
        xo(Ro((t = o.call.apply(o, [this].concat(r)))), 'render', function () {
          var e = t.props.playlist;
          console.log('playlist:', e);
          var r = 1;
          return X.createElement(
            'div',
            { class: 'artist-playlist' },
            e
              ? e.map(function (t) {
                  return X.createElement(Eo, {
                    num: r++,
                    cover: st + t.cover,
                    name: t.title,
                    listenedCnt: t.listenings,
                    isLiked: !1,
                    duration: t.duration,
                  });
                })
              : '',
          );
        }),
        t
      );
    }
    return (e = i), Object.defineProperty(e, 'prototype', { writable: !1 }), e;
  })(J);
  function Co(t) {
    return (
      (Co =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (t) {
              return typeof t;
            }
          : function (t) {
              return t &&
                'function' == typeof Symbol &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? 'symbol'
                : typeof t;
            }),
      Co(t)
    );
  }
  function No(t, e) {
    for (var r = 0; r < e.length; r++) {
      var n = e[r];
      (n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        'value' in n && (n.writable = !0),
        Object.defineProperty(t, n.key, n);
    }
  }
  function Do(t, e) {
    return (
      (Do =
        Object.setPrototypeOf ||
        function (t, e) {
          return (t.__proto__ = e), t;
        }),
      Do(t, e)
    );
  }
  function Bo(t, e) {
    if (e && ('object' === Co(e) || 'function' == typeof e)) return e;
    if (void 0 !== e)
      throw new TypeError('Derived constructors may only return object or undefined');
    return Io(t);
  }
  function Io(t) {
    if (void 0 === t)
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return t;
  }
  function Lo(t) {
    return (
      (Lo = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t);
          }),
      Lo(t)
    );
  }
  function Mo(t, e, r) {
    return (
      e in t
        ? Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 })
        : (t[e] = r),
      t
    );
  }
  var Uo = (function (t) {
    !(function (t, e) {
      if ('function' != typeof e && null !== e)
        throw new TypeError('Super expression must either be null or a function');
      (t.prototype = Object.create(e && e.prototype, {
        constructor: { value: t, writable: !0, configurable: !0 },
      })),
        Object.defineProperty(t, 'prototype', { writable: !1 }),
        e && Do(t, e);
    })(a, t);
    var e,
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
          } catch (t) {
            return !1;
          }
        })()),
        function () {
          var t,
            e = Lo(n);
          if (o) {
            var r = Lo(this).constructor;
            t = Reflect.construct(e, arguments, r);
          } else t = e.apply(this, arguments);
          return Bo(this, t);
        });
    function a(t) {
      var e;
      return (
        (function (t, e) {
          if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
        })(this, a),
        Mo(Io((e = i.call(this, t))), 'render', function () {
          var t = e.context.params.slug;
          if (!e.props.artist || !e.props.popularTracks)
            return X.createElement('div', { class: 'artist-page' });
          var r = e.props.artist[t] ? e.props.artist[t] : null,
            n = e.props.popularTracks[t] ? e.props.popularTracks[t] : null;
          return r && n
            ? X.createElement(
                'div',
                { class: 'artist-page' },
                X.createElement(
                  'div',
                  {
                    class: 'artist-page__main',
                    style: { 'background-image': 'url('.concat(st + r.cover, ')') },
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
                            onclick: e.setLikeToArtist,
                            class: ''.concat(
                              e.state.isLiked ? 'fa-solid' : 'fa-regular',
                              ' fa-heart likes__icon',
                            ),
                          }),
                          X.createElement('div', { class: 'likes__num' }, e.state.albumLikes),
                        ),
                      ),
                    ),
                  ),
                ),
                X.createElement(
                  'div',
                  { class: 'artist-page__popular' },
                  X.createElement('div', { class: 'text artist__title' }, 'Popular songs'),
                  X.createElement(Ao, { playlist: n }),
                ),
                X.createElement(
                  'div',
                  { class: 'artist-page__albums' },
                  X.createElement('div', { class: 'text artist__title' }, 'Albums'),
                  X.createElement(
                    _r,
                    null,
                    r.albums
                      ? r.albums.map(function (t) {
                          return X.createElement(Sr, {
                            cover: st + t.cover,
                            title: t.title,
                            artist: t.artist,
                          });
                        })
                      : '',
                  ),
                ),
              )
            : X.createElement('div', { class: 'artist-page' });
        }),
        console.log(e.props),
        (e.getArtist = e.getArtist.bind(Io(e))),
        (e.getTracks = e.getTracks.bind(Io(e))),
        (e.state = { albumLikes: 12511, isLiked: !1 }),
        (e.setLikeToArtist = e.setLikeToArtist.bind(Io(e))),
        e
      );
    }
    return (
      (e = a),
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
            var t = this.context.params.slug;
            (this.props.artist && this.props.artist[t]) || this.props.getArtist(t);
          },
        },
        {
          key: 'getTracks',
          value: function () {
            var t = this.context.params.slug;
            (this.props.popularTracks && this.props.popularTracks[t]) ||
              this.props.getArtistPopularTracks(t);
          },
        },
        {
          key: 'setLikeToArtist',
          value: function () {
            var t = this.state.albumLikes;
            t = this.state.isLiked ? t - 1 : t + 1;
            var e = !this.state.isLiked;
            this.setState({ albumLikes: t, isLiked: e });
          },
        },
      ]) && No(e.prototype, r),
      Object.defineProperty(e, 'prototype', { writable: !1 }),
      a
    );
  })(X.Component);
  Mo(Uo, 'contextType', Lt);
  const Vo = Je(
    function (t) {
      return {
        artist: t.artist ? t.artist : null,
        popularTracks: t.artistPopularTracks ? t.artistPopularTracks : null,
      };
    },
    function (t) {
      return {
        getArtist: function (e) {
          t(
            (function (t) {
              return function (e) {
                Fr.getArtistById(t).then(function (t) {
                  e({ type: 'get/artist', payload: t });
                });
              };
            })(e),
          );
        },
        getArtistPopularTracks: function (e) {
          t(
            (function (t) {
              return function (e) {
                Fr.getArtistPopularById(t).then(function (t) {
                  e({ type: 'get/artist/popular', payload: t });
                });
              };
            })(e),
          );
        },
      };
    },
  )(Uo);
  function zo(t) {
    return (
      (zo =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (t) {
              return typeof t;
            }
          : function (t) {
              return t &&
                'function' == typeof Symbol &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? 'symbol'
                : typeof t;
            }),
      zo(t)
    );
  }
  function Fo(t, e) {
    for (var r = 0; r < e.length; r++) {
      var n = e[r];
      (n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        'value' in n && (n.writable = !0),
        Object.defineProperty(t, n.key, n);
    }
  }
  function Wo(t, e) {
    return (
      (Wo =
        Object.setPrototypeOf ||
        function (t, e) {
          return (t.__proto__ = e), t;
        }),
      Wo(t, e)
    );
  }
  function Ho(t, e) {
    if (e && ('object' === zo(e) || 'function' == typeof e)) return e;
    if (void 0 !== e)
      throw new TypeError('Derived constructors may only return object or undefined');
    return qo(t);
  }
  function qo(t) {
    if (void 0 === t)
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return t;
  }
  function $o(t) {
    return (
      ($o = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t);
          }),
      $o(t)
    );
  }
  var Go = (function (t) {
    !(function (t, e) {
      if ('function' != typeof e && null !== e)
        throw new TypeError('Super expression must either be null or a function');
      (t.prototype = Object.create(e && e.prototype, {
        constructor: { value: t, writable: !0, configurable: !0 },
      })),
        Object.defineProperty(t, 'prototype', { writable: !1 }),
        e && Wo(t, e);
    })(a, t);
    var e,
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
          } catch (t) {
            return !1;
          }
        })()),
        function () {
          var t,
            e = $o(n);
          if (o) {
            var r = $o(this).constructor;
            t = Reflect.construct(e, arguments, r);
          } else t = e.apply(this, arguments);
          return Ho(this, t);
        });
    function a(t) {
      var e;
      return (
        (function (t, e) {
          if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
        })(this, a),
        (function (t, e, r) {
          e in t
            ? Object.defineProperty(t, e, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (t[e] = r);
        })(qo((e = i.call(this, t))), 'render', function () {
          return (
            e.props.isAuthorized,
            X.createElement(
              'div',
              { class: 'personal-page' },
              X.createElement(yr, { isAuthorized: !0 }),
              X.createElement(
                'form',
                { onsubmit: e.submitForm, class: 'text personal-page__settings-form' },
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
                    onblur: e.tryAcceptUName,
                    value: e.state.username,
                    onfocus: e.clearUName,
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
                    onblur: e.tryAcceptPassword,
                    value: e.state.password,
                    onfocus: e.clearPassword,
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
                    onblur: e.tryAcceptPasswordRepeat,
                    onfocus: e.clearPasswordRepeat,
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
                      onchange: e.tryAcceptAvatar,
                      onfocus: e.clearAvatar,
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
        (e.state = {
          username: '',
          password: '',
          confirmPassword: !1,
          userNameChecked: !1,
          passwordChecked: !1,
          fileLoaded: !1,
        }),
        (e.tryAcceptPassword = e.tryAcceptPassword.bind(qo(e))),
        (e.tryAcceptPasswordRepeat = e.tryAcceptPasswordRepeat.bind(qo(e))),
        (e.tryAcceptUName = e.tryAcceptUName.bind(qo(e))),
        (e.tryAcceptAvatar = e.tryAcceptAvatar.bind(qo(e))),
        (e.submitForm = e.submitForm.bind(qo(e))),
        e
      );
    }
    return (
      (e = a),
      (r = [
        {
          key: 'submitForm',
          value: function (t) {
            if (
              (t.preventDefault(),
              this.state.confirmPassword &&
                this.state.userNameChecked &&
                this.state.passwordChecked &&
                this.state.fileLoaded)
            ) {
              var e = new FormData();
              e.append('username', t.target.username.value),
                e.append('password', t.target.password.value),
                e.append('avatar', t.target.avatar.files[0]),
                this.props.updateUser(e);
            }
          },
        },
        {
          key: 'tryAcceptUName',
          value: function (t) {
            var e = t.target.value;
            if (!Qn(e))
              return (
                t.target.classList.add('input__wrong'),
                document
                  .getElementById('form__username-label_danger')
                  .classList.remove('invisible'),
                void this.setState({ userNameChecked: !1, password })
              );
            this.setState({ userNameChecked: !0, username: e });
          },
        },
        {
          key: 'tryAcceptPassword',
          value: function (t) {
            var e = t.target.value;
            if (!Xn(e))
              return (
                t.target.classList.add('input__wrong'),
                document
                  .getElementById('form__password-label_danger')
                  .classList.remove('invisible'),
                void this.setState({ passwordChecked: !1, password: e })
              );
            this.setState({ passwordChecked: !0, password: e });
          },
        },
        {
          key: 'tryAcceptPasswordRepeat',
          value: function (t) {
            if (t.target.value !== this.state.password)
              return (
                t.target.classList.add('input__wrong'),
                document.getElementById('form__confirm-label_danger').classList.remove('invisible'),
                void this.setState({ confirmPassword: !1 })
              );
            this.setState({ confirmPassword: !0 });
          },
        },
        {
          key: 'tryAcceptAvatar',
          value: function (t) {
            var e = t.target.files[0];
            e &&
              ('image/png' !== e.type &&
                (t.target.classList.add('input__wrong'),
                document.getElementById('form__avatar-label_danger').classList.remove('invisible'),
                this.setState({ fileLoaded: !1 })),
              this.setState({ fileLoaded: !0 }));
          },
        },
        {
          key: 'clearUName',
          value: function (t) {
            t.target.classList.remove('input__wrong'),
              document.getElementById('form__username-label_danger').classList.add('invisible');
          },
        },
        {
          key: 'clearPassword',
          value: function (t) {
            t.target.classList.remove('input__wrong'),
              document.getElementById('form__password-label_danger').classList.add('invisible');
          },
        },
        {
          key: 'clearPasswordRepeat',
          value: function (t) {
            t.target.classList.remove('input__wrong'),
              document.getElementById('form__confirm-label_danger').classList.add('invisible');
          },
        },
        {
          key: 'clearAvatar',
          value: function (t) {
            t.target.classList.remove('input__wrong'),
              document.getElementById('form__avatar-label_danger').classList.add('invisible');
          },
        },
      ]) && Fo(e.prototype, r),
      Object.defineProperty(e, 'prototype', { writable: !1 }),
      a
    );
  })(X.Component);
  const Jo = Je(
    function (t) {
      return {};
    },
    function (t) {
      return {
        updateUser: function (e) {
          t(
            (function (t) {
              return function (e) {
                Kn.updateUser(t).then(function (t) {
                  e({ type: 'update/user', payload: t });
                });
              };
            })(e),
          );
        },
      };
    },
  )(Go);
  function Yo(t) {
    return (
      (Yo =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (t) {
              return typeof t;
            }
          : function (t) {
              return t &&
                'function' == typeof Symbol &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? 'symbol'
                : typeof t;
            }),
      Yo(t)
    );
  }
  function Zo(t, e) {
    if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
  }
  function Ko(t, e) {
    for (var r = 0; r < e.length; r++) {
      var n = e[r];
      (n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        'value' in n && (n.writable = !0),
        Object.defineProperty(t, n.key, n);
    }
  }
  function Xo(t, e) {
    return (
      (Xo =
        Object.setPrototypeOf ||
        function (t, e) {
          return (t.__proto__ = e), t;
        }),
      Xo(t, e)
    );
  }
  function Qo(t, e) {
    if (e && ('object' === Yo(e) || 'function' == typeof e)) return e;
    if (void 0 !== e)
      throw new TypeError('Derived constructors may only return object or undefined');
    return (function (t) {
      if (void 0 === t)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return t;
    })(t);
  }
  function ti(t) {
    return (
      (ti = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t);
          }),
      ti(t)
    );
  }
  var ei = new wn(
      ln,
      [
        function (t) {
          return function (e) {
            return function (r) {
              console.log('action', r), e(r), console.log('state', t.getState());
            };
          };
        },
        function (t) {
          return function (e) {
            return function (r) {
              return 'function' == typeof r ? r(e, t.getState()) : e(r);
            };
          };
        },
      ],
      {},
    ),
    ri = (function (t) {
      !(function (t, e) {
        if ('function' != typeof e && null !== e)
          throw new TypeError('Super expression must either be null or a function');
        (t.prototype = Object.create(e && e.prototype, {
          constructor: { value: t, writable: !0, configurable: !0 },
        })),
          Object.defineProperty(t, 'prototype', { writable: !1 }),
          e && Xo(t, e);
      })(a, t);
      var e,
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
            } catch (t) {
              return !1;
            }
          })()),
          function () {
            var t,
              e = ti(n);
            if (o) {
              var r = ti(this).constructor;
              t = Reflect.construct(e, arguments, r);
            } else t = e.apply(this, arguments);
            return Qo(this, t);
          });
      function a() {
        return Zo(this, a), i.apply(this, arguments);
      }
      return (
        (e = a),
        (r = [
          {
            key: 'render',
            value: function () {
              return X.createElement(
                Gn,
                null,
                X.createElement(
                  Ge.Provider,
                  { value: ei },
                  X.createElement(
                    Ln,
                    null,
                    X.createElement(
                      Sn,
                      { exact: !0, to: '/login' },
                      X.createElement(ho, { isSignup: !1 }),
                    ),
                    X.createElement(
                      Sn,
                      { exact: !0, to: '/signup' },
                      X.createElement(ho, { isSignup: !0 }),
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
                            X.createElement(Vo, { isAuthorized: !0 }),
                          ),
                          X.createElement(Sn, { to: '/settings' }, X.createElement(Jo, null)),
                        ),
                      }),
                    ),
                  ),
                ),
              );
            },
          },
        ]) && Ko(e.prototype, r),
        Object.defineProperty(e, 'prototype', { writable: !1 }),
        a
      );
    })(X.Component);
  Kn.getCSRFToken().then(function () {
    X.render(X.createElement(ri, null), document.getElementById('root'));
  });
})();
