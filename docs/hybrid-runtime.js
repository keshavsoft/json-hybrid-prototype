const T = ({ inData: r, inPath: t }) => {
  const o = r, e = t;
  if (o == null) return;
  if (e == null || e === "" || e === ".")
    return o;
  const n = Array.isArray(e) ? e : String(e).split(".");
  let a = o;
  for (const i of n) {
    if (a == null)
      return;
    a = a[i];
  }
  return a;
}, B = ({ inText: r, inItemContext: t, inRootData: o }) => {
  const e = r, n = t, a = o;
  return typeof e != "string" || !e.includes("${") ? e : e.replace(/\$\{([^}]+)\}/g, (i, s) => {
    const l = s.trim();
    let d = T({ inData: n, inPath: l });
    return d === void 0 && n && typeof n == "object" && (n.item && typeof n.item == "object" && (d = T({ inData: n.item, inPath: l })), d === void 0 && n.row && typeof n.row == "object" && (d = T({ inData: n.row, inPath: l }))), d === void 0 && a && (d = T({ inData: a, inPath: l })), d != null ? String(d) : "";
  });
}, E = ({ inNode: r, inContext: t = {}, inRootData: o = {} } = {}) => {
  var d;
  const e = r, n = t || {}, a = o || {};
  if (e == null) return null;
  if (Array.isArray(e)) {
    const u = [];
    for (const f of e) {
      const p = E({
        inNode: f,
        inContext: n,
        inRootData: a
      });
      Array.isArray(p) ? u.push(...p) : p != null && u.push(p);
    }
    return u;
  }
  if (typeof e != "object")
    return B({
      inText: e,
      inItemContext: n,
      inRootData: a
    });
  if (e.operation === "iterate" || !!e.$iterate) {
    const u = e.source || e.iterateOn || e.$iterate, f = a && a[u] || T({ inData: a, inPath: u }) || n && n[u] || T({ inData: n, inPath: u });
    if (!Array.isArray(f)) return [];
    const p = e.template || e.item || {}, h = e.filter, y = f.filter((c) => {
      if (!c || typeof c != "object") return !0;
      if (h && typeof h == "object") {
        for (const [b, m] of Object.entries(h))
          if (c[b] !== m) return !1;
      }
      return c.isVisible !== !1;
    }), g = [];
    return y.forEach((c, b) => {
      const m = {
        ...n,
        item: c,
        ...typeof c == "object" && c !== null ? c : {},
        $index: b,
        $number: b + 1
      };
      if ((u === "rows" || u.endsWith(".rows") || u === "items") && (m.row = c), n.row && (c.field || c.columnName || c.name)) {
        const q = c.field || c.columnName || c.name, A = n.row[q];
        A !== void 0 && (m.cellValue = A, m.value = A);
      }
      const w = E({
        inNode: p,
        inContext: m,
        inRootData: a
      });
      Array.isArray(w) ? g.push(...w) : w != null && g.push(w);
    }), g;
  }
  const s = { ...e }, l = {
    ...typeof n.item == "object" ? n.item : {},
    ...n
  };
  if (l.type === "textarea" && s.tagName === "input" && (s.tagName = "textarea", s.attributes && (s.attributes = { ...s.attributes }, delete s.attributes.type)), s.textContent && (s.textContent = B({
    inText: s.textContent,
    inItemContext: l,
    inRootData: a
  })), s.attributes) {
    s.attributes = { ...s.attributes };
    for (const [f, p] of Object.entries(s.attributes))
      typeof p == "string" && (s.attributes[f] = B({
        inText: p,
        inItemContext: l,
        inRootData: a
      }));
    if (["input", "textarea", "select", "option"].includes((d = s.tagName) == null ? void 0 : d.toLowerCase())) {
      const f = l.field || l.columnName || l.name;
      l.value !== void 0 && l.value !== null ? s.attributes.value = String(l.value) : f && a[f] !== void 0 && a[f] !== null ? s.attributes.value = String(a[f]) : f && a.values && a.values[f] !== void 0 && a.values[f] !== null && (s.attributes.value = String(a.values[f]));
    }
  }
  if (Array.isArray(s.children)) {
    const u = [];
    for (const f of s.children) {
      const p = E({
        inNode: f,
        inContext: n,
        inRootData: a
      });
      Array.isArray(p) ? u.push(...p) : p != null && u.push(p);
    }
    s.children = u;
  }
  return s;
}, gt = {
  version: "2.0.0",
  name: "json-to-spec/v2",
  description: "Pure JSON Specification Compiler: (contextJson, dataJson) -> Spec JSON ready for json-to-dom"
}, bt = (r, t = {}) => {
  let o = r, e = t || {};
  return r && typeof r == "object" && !Array.isArray(r) && ("context" in r && ("data" in r || t === void 0 || Object.keys(t).length === 0) ? (o = r.context, e = r.data || e) : "structure" in r && ("data" in r || t === void 0 || Object.keys(t).length === 0) ? (o = r.structure, e = r.data || e) : ("inStructure" in r || "inContext" in r || "inTree" in r) && (o = r.inStructure || r.inContext || r.inTree, e = r.inData || e)), E({
    inNode: o,
    inContext: e,
    inRootData: e
  });
};
typeof globalThis < "u" && (globalThis.ks ?? (globalThis.ks = {}), globalThis.ks["json-to-spec"] = {
  meta: gt,
  compile: bt,
  compileNode: E,
  resolvePath: T
});
const x = ({ inData: r, inPath: t }) => {
  const o = r, e = t;
  if (o == null) return;
  if (e == null || e === "" || e === ".")
    return o;
  const n = Array.isArray(e) ? e : String(e).split(".");
  let a = o;
  for (const i of n) {
    if (a == null)
      return;
    a = a[i];
  }
  return a;
}, U = ({ inPath: r, inItemContext: t, inRootData: o }) => {
  const e = r, n = t, a = o;
  let i = x({ inData: n, inPath: e });
  return i === void 0 && n && typeof n == "object" && (n.item && typeof n.item == "object" && (i = x({ inData: n.item, inPath: e })), i === void 0 && n.row && typeof n.row == "object" && (i = x({ inData: n.row, inPath: e }))), i === void 0 && a && (i = x({ inData: a, inPath: e })), i;
}, V = ({ inValue: r, inItemContext: t, inRootData: o }) => {
  const e = r, n = t, a = o;
  if (typeof e != "string" || !e.includes("${"))
    return e;
  const i = e.match(/^\$\{([^}]+)\}$/);
  if (i) {
    const s = U({
      inPath: i[1].trim(),
      inItemContext: n,
      inRootData: a
    });
    return s ?? "";
  }
  return e.replace(/\$\{([^}]+)\}/g, (s, l) => {
    const d = U({
      inPath: l.trim(),
      inItemContext: n,
      inRootData: a
    });
    return d != null ? String(d) : "";
  });
}, F = ({ inText: r, inItemContext: t, inRootData: o }) => {
  const e = V({
    inValue: r,
    inItemContext: t,
    inRootData: o
  });
  return e != null ? String(e) : "";
}, k = ({ inNode: r, inContext: t = {}, inRootData: o = {} } = {}) => {
  var d;
  const e = r, n = t || {}, a = o || {};
  if (e == null) return null;
  if (Array.isArray(e)) {
    const u = [];
    for (const f of e) {
      const p = k({
        inNode: f,
        inContext: n,
        inRootData: a
      });
      Array.isArray(p) ? u.push(...p) : p != null && u.push(p);
    }
    return u;
  }
  if (typeof e != "object")
    return F({
      inText: e,
      inItemContext: n,
      inRootData: a
    });
  const i = e.jsonToSpec || (e.operation ? e : null);
  if (i && (i.operation === "iterate" || i.source || i.$iterate)) {
    const u = i.source || i.iterateOn || i.$iterate, f = x({ inData: a, inPath: u }) || a && a[u] || x({ inData: n, inPath: u }) || n && n[u];
    if (!Array.isArray(f)) {
      if (e.tagName) {
        const c = { ...e };
        return delete c.jsonToSpec, c.children = [], c;
      }
      return [];
    }
    const p = i.template || i.item || {}, h = i.filter, y = f.filter((c) => {
      if (!c || typeof c != "object") return !0;
      if (h && typeof h == "object") {
        for (const [b, m] of Object.entries(h))
          if (c[b] !== m) return !1;
      }
      return c.isVisible !== !1;
    }), g = [];
    if (y.forEach((c, b) => {
      const m = {
        ...n,
        item: c,
        ...typeof c == "object" && c !== null ? c : {},
        $index: b,
        $number: b + 1
      };
      if ((u === "rows" || u.endsWith(".rows") || u === "items" || u.endsWith("Rows")) && (m.row = c), n.row && (c.field || c.columnName || c.name)) {
        const q = c.field || c.columnName || c.name, A = n.row[q];
        A !== void 0 && (m.cellValue = A, m.value = A, typeof c == "object" && c !== null && c.value === void 0 && (c.value = A));
      }
      const w = k({
        inNode: p,
        inContext: m,
        inRootData: a
      });
      Array.isArray(w) ? g.push(...w) : w != null && g.push(w);
    }), e.tagName) {
      const c = { ...e };
      if (delete c.jsonToSpec, c.children = g, c.textContent && (c.textContent = F({
        inText: c.textContent,
        inItemContext: n,
        inRootData: a
      })), c.attributes) {
        c.attributes = { ...c.attributes };
        for (const [b, m] of Object.entries(c.attributes))
          typeof m == "string" && (c.attributes[b] = V({
            inValue: m,
            inItemContext: n,
            inRootData: a
          }));
      }
      if (c.properties) {
        c.properties = { ...c.properties };
        for (const [b, m] of Object.entries(c.properties))
          typeof m == "string" && (c.properties[b] = V({
            inValue: m,
            inItemContext: n,
            inRootData: a
          }));
      }
      return c;
    }
    return g;
  }
  const s = { ...e };
  "jsonToSpec" in s && delete s.jsonToSpec;
  const l = {
    ...typeof n.item == "object" ? n.item : {},
    ...n
  };
  if (l.type === "textarea" && s.tagName === "input" && (s.tagName = "textarea", s.attributes && (s.attributes = { ...s.attributes }, delete s.attributes.type)), s.textContent && (s.textContent = F({
    inText: s.textContent,
    inItemContext: l,
    inRootData: a
  })), s.attributes) {
    s.attributes = { ...s.attributes };
    for (const [f, p] of Object.entries(s.attributes))
      typeof p == "string" && (s.attributes[f] = V({
        inValue: p,
        inItemContext: l,
        inRootData: a
      }));
    if (["input", "textarea", "select", "option"].includes((d = s.tagName) == null ? void 0 : d.toLowerCase())) {
      const f = l.field || l.columnName || l.name;
      l.value !== void 0 && l.value !== null ? (s.attributes.value = String(l.value), s.tagName === "textarea" && !s.textContent && (s.textContent = String(l.value))) : f && a[f] !== void 0 && a[f] !== null ? (s.attributes.value = String(a[f]), s.tagName === "textarea" && !s.textContent && (s.textContent = String(a[f]))) : f && a.values && a.values[f] !== void 0 && a.values[f] !== null && (s.attributes.value = String(a.values[f]), s.tagName === "textarea" && !s.textContent && (s.textContent = String(a.values[f])));
    }
  }
  if (s.properties) {
    s.properties = { ...s.properties };
    for (const [u, f] of Object.entries(s.properties))
      typeof f == "string" && (s.properties[u] = V({
        inValue: f,
        inItemContext: l,
        inRootData: a
      }));
  }
  if (Array.isArray(s.children)) {
    const u = [];
    for (const f of s.children) {
      const p = k({
        inNode: f,
        inContext: n,
        inRootData: a
      });
      Array.isArray(p) ? u.push(...p) : p != null && u.push(p);
    }
    s.children = u;
  }
  return s;
}, yt = {
  version: "3.0.0",
  name: "json-to-spec/v3",
  description: "Pure JSON Specification Compiler with jsonToSpec namespace: (structure, data) -> Spec JSON ready for json-to-dom"
}, O = (r, t = {}) => {
  let o = r, e = t || {};
  return r && typeof r == "object" && !Array.isArray(r) && ("structure" in r && ("data" in r || t === void 0 || Object.keys(t).length === 0) ? (o = r.structure, e = r.data || e) : "context" in r && ("data" in r || t === void 0 || Object.keys(t).length === 0) ? (o = r.context, e = r.data || e) : ("inStructure" in r || "inContext" in r || "inTree" in r) && (o = r.inStructure || r.inContext || r.inTree, e = r.inData || e)), k({
    inNode: o,
    inContext: e,
    inRootData: e
  });
};
typeof globalThis < "u" && (globalThis.ks ?? (globalThis.ks = {}), globalThis.ks["json-to-spec"] = {
  meta: yt,
  compile: O,
  compileNode: k,
  resolvePath: x
}, globalThis.ks["json-to-spec-v3"] = globalThis.ks["json-to-spec"]);
const tt = {
  version: "v27.0",
  description: "Pure zero-overhead DOM engine with versioned validation and versioned event listener suites (v1 row actions, v2 form footer actions)"
}, wt = ({ inArgs: r, inSpec: t, inShowLog: o } = {}) => {
  var l;
  const e = r, n = t, a = o;
  let i = n !== void 0 ? n : e, s = !!a;
  return e && typeof e == "object" && !Array.isArray(e) && !(typeof Node < "u" && e instanceof Node) && ("inSpec" in e ? (i = e.inSpec, s = !!e.inShowLog) : "spec" in e && (i = e.spec, s = !!e.showLog)), typeof globalThis < "u" && ((l = globalThis == null ? void 0 : globalThis.ks) != null && l.showLog) && (s = !0), {
    spec: i,
    showLog: s
  };
}, Ct = ({ inSpec: r }) => {
  const t = r;
  return t == null;
}, At = ({ inSpec: r }) => typeof Node < "u" && r instanceof Node, vt = ({ inSpec: r }) => {
  const t = r;
  return Array.isArray(t);
}, Tt = ({ inSpec: r }) => {
  const t = r;
  return typeof t == "object" && t !== null && !Array.isArray(t);
}, xt = ({ inSpec: r, inShowLog: t = !1 }) => {
  const o = r, e = t;
  return Array.isArray(o) ? o.map((n) => M({
    inSpec: n,
    inShowLog: e
  })).flat().filter(Boolean) : [];
}, Nt = ({ inTagName: r }) => {
  const t = r == null ? void 0 : r.toLowerCase();
  if (!t) return null;
  if (t === "checkbox") {
    const o = document.createElement("input");
    return o.type = "checkbox", o;
  }
  return document.createElement(t);
}, St = ({ inElement: r, inTextContent: t, inAllowsTextContent: o = !0, inTagName: e, inShowLog: n = !1 }) => {
  const a = r, i = t, s = o, l = e, d = n;
  return !a || i === void 0 || i === null ? a : s ? (a.textContent = i, a) : (d && console.warn(`[json-to-dom v11] textContent is not allowed on <${l}>; discarded "${i}"`), a);
}, jt = ({ inElement: r, inProperties: t }) => {
  const o = r, e = t;
  return o && e && typeof e == "object" && Object.assign(o, e), o;
}, $t = ({ inElement: r, inAttributes: t }) => {
  const o = r, e = t;
  return !o || !e || typeof e != "object" || Object.entries(e).forEach(([n, a]) => {
    n === "class" ? o.className = a : typeof a == "boolean" ? a ? o.setAttribute(n, "") : o.removeAttribute(n) : a != null && o.setAttribute(n, String(a));
  }), o;
}, Vt = ({ inElement: r, inClassList: t }) => {
  const o = r, e = t;
  if (!o || !e) return o;
  let n = [];
  return typeof e == "string" ? n = e.split(/\s+/).filter(Boolean) : Array.isArray(e) && (n = e.filter((a) => typeof a == "string" && a.trim().length > 0)), n.length > 0 && o.classList.add(...n), o;
}, Et = ({ inElement: r, inChildren: t, inAllowsChildren: o = !0, inTagName: e, inShowLog: n = !1 }) => {
  const a = r, i = t, s = o, l = e, d = n;
  return !a || !Array.isArray(i) || i.length === 0 ? a : s ? (i.forEach((u) => {
    typeof Node < "u" && u instanceof Node ? a.appendChild(u) : (typeof u == "string" || typeof u == "number") && a.appendChild(document.createTextNode(String(u)));
  }), a) : (d && console.warn(`[json-to-dom v11] Children are not allowed on void tag <${l}>; discarded ${i.length} child nodes.`), a);
}, kt = ({ inSpec: r, inClassList: t }) => {
  const o = r, e = t || (o == null ? void 0 : o.classList);
  if (!o || !o.tagName) return null;
  const n = Nt({ inTagName: o.tagName });
  return n ? (St({
    inElement: n,
    inTextContent: o.textContent,
    inTagName: o.tagName
  }), jt({
    inElement: n,
    inProperties: o.properties
  }), $t({
    inElement: n,
    inAttributes: o.attributes
  }), Vt({
    inElement: n,
    inClassList: e
  }), Et({
    inElement: n,
    inChildren: o.children,
    inTagName: o.tagName
  }), n) : null;
}, Lt = ({ inChildren: r, inShowLog: t = !1 }) => {
  const o = r, e = t;
  return Array.isArray(o) ? o.map((n) => typeof n == "string" || typeof n == "number" ? typeof document < "u" ? document.createTextNode(String(n)) : String(n) : M({
    inSpec: n,
    inShowLog: e
  })).flat().filter(Boolean) : [];
}, Dt = ({ inSpec: r, inShowLog: t = !1 }) => {
  const o = r, e = t;
  if (!(o != null && o.tagName))
    return e && console.warn("[json-to-dom v23] Missing tagName on spec:", o), null;
  const n = Array.isArray(o.children) && o.children.length > 0 ? Lt({
    inChildren: o.children,
    inShowLog: e
  }) : [];
  return kt({
    inSpec: {
      ...o,
      children: n
    }
  });
}, M = ({ inSpec: r, inShowLog: t = !1 } = {}) => {
  const o = r, e = t;
  return Ct({ inSpec: o }) ? null : At({ inSpec: o }) ? o : vt({ inSpec: o }) ? xt({ inSpec: o, inShowLog: e }) : Tt({ inSpec: o }) ? Dt({ inSpec: o, inShowLog: e }) : null;
}, Rt = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [
    "title",
    "role"
  ],
  childTags: []
}, It = {
  allowsTextContent: !1,
  allowsChildren: !1,
  allowedAttributes: [
    "type",
    "placeholder",
    "value",
    "name",
    "disabled",
    "readonly",
    "required",
    "list"
  ]
}, Pt = {
  allowsTextContent: !1,
  allowsChildren: !1,
  allowedAttributes: [
    "type",
    "checked",
    "name",
    "value",
    "disabled",
    "required"
  ]
}, qt = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [
    "for"
  ],
  childTags: []
}, Bt = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [
    "action",
    "method",
    "autocomplete",
    "enctype",
    "name",
    "novalidate",
    "target"
  ],
  childTags: []
}, Ft = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [
    "name",
    "disabled",
    "required",
    "multiple",
    "size"
  ],
  childTags: [
    "option"
  ]
}, Kt = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: []
}, Ht = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: []
}, Mt = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: []
}, _t = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: []
}, Wt = {
  allowsTextContent: !1,
  allowsChildren: !1,
  allowedAttributes: [
    "src",
    "alt",
    "width",
    "height",
    "loading"
  ]
}, Gt = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [
    "type",
    "disabled",
    "name",
    "value"
  ],
  childTags: []
}, Ut = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [
    "border",
    "cellpadding",
    "cellspacing"
  ],
  childTags: [
    "caption",
    "colgroup",
    "thead",
    "tbody",
    "tfoot",
    "tr"
  ]
}, Jt = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: [
    "tr"
  ]
}, zt = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: [
    "tr"
  ]
}, Yt = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: [
    "tr"
  ]
}, Qt = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: [
    "td",
    "th"
  ]
}, Xt = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [
    "scope",
    "colspan",
    "rowspan"
  ],
  childTags: []
}, Zt = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [
    "colspan",
    "rowspan"
  ],
  childTags: []
}, Ot = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: [
    "option"
  ]
}, te = {
  allowsTextContent: !0,
  allowsChildren: !1,
  allowedAttributes: [
    "value",
    "label",
    "selected",
    "disabled"
  ]
}, N = {
  div: Rt,
  input: It,
  checkbox: Pt,
  label: qt,
  form: Bt,
  select: Ft,
  p: Kt,
  h1: Ht,
  h2: Mt,
  span: _t,
  img: Wt,
  button: Gt,
  table: Ut,
  thead: Jt,
  tbody: zt,
  tfoot: Yt,
  tr: Qt,
  th: Xt,
  td: Zt,
  datalist: Ot,
  option: te
}, ee = ({ inTagName: r, inSpec: t }) => {
  var e;
  const o = (e = r || (t == null ? void 0 : t.tagName)) == null ? void 0 : e.toLowerCase();
  return o ? o in N ? {
    isValid: !0,
    tagName: o,
    definition: N[o],
    error: null
  } : {
    isValid: !1,
    tagName: o,
    definition: null,
    error: `Tag <${o}> is not recognized in tags.json`
  } : {
    isValid: !1,
    tagName: null,
    definition: null,
    error: "Missing tagName"
  };
}, oe = "HTML Global Allowed Attributes", ne = "Standard W3C/WHATWG Global Attributes permitted on all HTML elements.", ae = [
  "accesskey",
  "autocapitalize",
  "autofocus",
  "class",
  "contenteditable",
  "dir",
  "draggable",
  "enterkeyhint",
  "hidden",
  "id",
  "inert",
  "inputmode",
  "is",
  "itemid",
  "itemprop",
  "itemref",
  "itemscope",
  "itemtype",
  "lang",
  "nonce",
  "part",
  "popover",
  "role",
  "slot",
  "spellcheck",
  "style",
  "tabindex",
  "title",
  "translate"
], re = [
  "data-",
  "aria-"
], L = {
  title: oe,
  description: ne,
  attributes: ae,
  wildcardPrefixes: re
}, _ = ({ inAttributeName: r, inAllowedAttributes: t = [] }) => {
  var n;
  const o = r, e = Array.isArray(t) ? t : [];
  return !o || typeof o != "string" ? !1 : L.attributes.includes(o) || (n = L.wildcardPrefixes) != null && n.some((a) => o.startsWith(a)) ? !0 : e.includes(o);
}, se = [
  "tagName",
  "textContent",
  "attributes",
  "classList",
  "children",
  "properties"
], et = ({ inSpec: r }) => {
  const t = r, o = [], e = [], n = [], a = [];
  if (!t || typeof t != "object" || Array.isArray(t))
    return {
      isValid: !1,
      tagName: null,
      errors: ["Specification must be a non-null object"],
      warnings: e,
      unknownKeys: n,
      invalidAttributes: a
    };
  const i = typeof t.tagName == "string" ? t.tagName.toLowerCase().trim() : null;
  if (!i)
    return o.push("Missing or invalid 'tagName'"), {
      isValid: !1,
      tagName: null,
      errors: o,
      warnings: e,
      unknownKeys: n,
      invalidAttributes: a
    };
  const s = N[i];
  if (!s)
    return o.push(`Unknown or unsupported HTML tag: <${i}>`), {
      isValid: !1,
      tagName: i,
      errors: o,
      warnings: e,
      unknownKeys: n,
      invalidAttributes: a
    };
  if (Object.keys(t).forEach((l) => {
    se.includes(l) || (n.push(l), e.push(`Unknown property key "${l}" will be ignored`));
  }), t.textContent !== void 0 && t.textContent !== null && !s.allowsTextContent && o.push(`Tag <${i}> does not allow direct textContent (allowsTextContent: false)`), Array.isArray(t.children) && t.children.length > 0 && !s.allowsChildren && o.push(`Tag <${i}> is a void element and does not allow children (allowsChildren: false)`), t.attributes && typeof t.attributes == "object") {
    const l = Array.isArray(s.allowedAttributes) ? s.allowedAttributes : [];
    Object.keys(t.attributes).forEach((d) => {
      _({ inAttributeName: d, inAllowedAttributes: l }) || (a.push(d), o.push(`Attribute "${d}" is not allowed on <${i}>`));
    });
  }
  return {
    isValid: o.length === 0,
    tagName: i,
    errors: o,
    warnings: e,
    unknownKeys: n,
    invalidAttributes: a
  };
}, ie = ({ inTagName: r }) => {
  const t = r == null ? void 0 : r.toLowerCase();
  return !!(t && t in N);
}, le = ({ inTagName: r }) => {
  const t = r == null ? void 0 : r.toLowerCase();
  return N[t] || null;
}, ce = ({ inAttributes: r, inAllowedAttributes: t, inTagName: o, inShowLog: e = !1 }) => {
  const n = r, a = t, i = o, s = e;
  if (!n || typeof n != "object") return {};
  const l = {}, d = [];
  return Object.entries(n).forEach(([u, f]) => {
    _({ inAttributeName: u, inAllowedAttributes: a }) ? l[u] = f : d.push(u);
  }), d.length > 0 && s && console.warn(`[json-to-dom v23] Discarded invalid attributes for <${i}>:`, d), l;
}, S = (r) => {
  const t = r, o = t && typeof t == "object" && !Array.isArray(t) && ("spec" in t || "inSpec" in t) ? t.spec ?? t.inSpec : t;
  return et({ inSpec: o });
};
S.validateSpec = et;
S.validateTag = ee;
S.isAttributeAllowed = _;
S.isTagValid = ie;
S.getTagDefinition = le;
S.filterAttributes = ce;
const J = {
  li: ["ul", "ol", "menu"],
  dt: ["dl"],
  dd: ["dl"],
  tr: ["table", "thead", "tbody", "tfoot"],
  th: ["tr"],
  td: ["tr"],
  thead: ["table"],
  tbody: ["table"],
  tfoot: ["table"],
  caption: ["table"],
  colgroup: ["table"],
  col: ["colgroup"],
  option: ["select", "optgroup", "datalist"],
  optgroup: ["select"],
  legend: ["fieldset"],
  summary: ["details"],
  source: ["video", "audio", "picture"],
  track: ["video", "audio"]
}, z = {
  a: ["a", "button"],
  button: ["button", "a", "input", "select", "textarea"]
}, ot = ({ inTagName: r, inParentTag: t }) => {
  const o = r == null ? void 0 : r.toLowerCase(), e = t == null ? void 0 : t.toLowerCase(), n = [];
  if (o && J[o]) {
    const a = J[o];
    e && !a.includes(e) && n.push(`HTML Hierarchy Violation: <${o}> cannot be placed inside <${e}>. Required parent: [${a.join(", ")}].`);
  }
  return e && z[e] && z[e].includes(o) && n.push(`HTML Nesting Violation: Interactive element <${o}> cannot be nested inside <${e}>.`), {
    isValid: n.length === 0,
    errors: n
  };
}, nt = [
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "source",
  "track",
  "wbr"
], at = ({ inTagName: r }) => {
  const t = r == null ? void 0 : r.toLowerCase();
  return nt.includes(t);
}, rt = ({ inTagName: r, inSpec: t }) => {
  const o = r == null ? void 0 : r.toLowerCase(), e = t, n = [];
  return at({ inTagName: o }) && ((e == null ? void 0 : e.textContent) !== void 0 && (e == null ? void 0 : e.textContent) !== null && (e == null ? void 0 : e.textContent) !== "" && n.push(`Void Element Violation: <${o}> is a void tag and cannot have 'textContent'.`), Array.isArray(e == null ? void 0 : e.children) && e.children.length > 0 && n.push(`Void Element Violation: <${o}> is a void tag and cannot have 'children'.`)), {
    isValid: n.length === 0,
    errors: n
  };
}, ue = [
  "tagName",
  "textContent",
  "attributes",
  "classList",
  "children",
  "properties"
], de = ({ inAttributeName: r, inAllowedAttributes: t = [] }) => {
  var n;
  const o = r, e = Array.isArray(t) ? t : [];
  return !o || typeof o != "string" ? !1 : L.attributes.includes(o) || (n = L.wildcardPrefixes) != null && n.some((a) => o.startsWith(a)) ? !0 : e.includes(o);
}, I = ({ inSpec: r, inParentTag: t = null, inPath: o = "root" } = {}) => {
  const e = r, n = t, a = o, i = [], s = [], l = [], d = [], u = [];
  if (Array.isArray(e))
    return e.forEach((c, b) => {
      const m = I({
        inSpec: c,
        inParentTag: n,
        inPath: `${a}[${b}]`
      });
      i.push(...m.errors), s.push(...m.warnings), l.push(...m.unknownKeys), d.push(...m.invalidAttributes), u.push(...m.hierarchyViolations);
    }), {
      isValid: i.length === 0,
      path: a,
      tagName: "array",
      errors: i,
      warnings: s,
      unknownKeys: l,
      invalidAttributes: d,
      hierarchyViolations: u
    };
  if (!e || typeof e != "object")
    return {
      isValid: !1,
      path: a,
      tagName: null,
      errors: [`[${a}] Specification must be a non-null object`],
      warnings: s,
      unknownKeys: l,
      invalidAttributes: d,
      hierarchyViolations: u
    };
  const f = typeof e.tagName == "string" ? e.tagName.toLowerCase().trim() : null;
  if (!f)
    return i.push(`[${a}] Missing or invalid 'tagName'`), {
      isValid: !1,
      path: a,
      tagName: null,
      errors: i,
      warnings: s,
      unknownKeys: l,
      invalidAttributes: d,
      hierarchyViolations: u
    };
  const p = `${a} > <${f}>`, h = N[f];
  if (!h)
    return i.push(`[${p}] Unknown or unsupported HTML tag: <${f}>`), {
      isValid: !1,
      path: p,
      tagName: f,
      errors: i,
      warnings: s,
      unknownKeys: l,
      invalidAttributes: d,
      hierarchyViolations: u
    };
  Object.keys(e).forEach((c) => {
    ue.includes(c) || (l.push(c), s.push(`[${p}] Unknown spec property key "${c}" will be ignored`));
  });
  const y = rt({ inTagName: f, inSpec: e });
  if (y.isValid || y.errors.forEach((c) => i.push(`[${p}] ${c}`)), e.attributes && typeof e.attributes == "object") {
    const c = Array.isArray(h.allowedAttributes) ? h.allowedAttributes : [];
    Object.keys(e.attributes).forEach((b) => {
      de({ inAttributeName: b, inAllowedAttributes: c }) || (d.push(b), i.push(`[${p}] Attribute "${b}" is not allowed on <${f}>`));
    });
  }
  const g = ot({ inTagName: f, inParentTag: n });
  return g.isValid || g.errors.forEach((c) => {
    i.push(`[${p}] ${c}`), u.push(c);
  }), Array.isArray(e.children) && e.children.forEach((c, b) => {
    if (c && typeof c == "object") {
      const m = I({
        inSpec: c,
        inParentTag: f,
        inPath: `${p}.children[${b}]`
      });
      i.push(...m.errors), s.push(...m.warnings), l.push(...m.unknownKeys), d.push(...m.invalidAttributes), u.push(...m.hierarchyViolations);
    }
  }), {
    isValid: i.length === 0,
    path: p,
    tagName: f,
    errors: i,
    warnings: s,
    unknownKeys: l,
    invalidAttributes: d,
    hierarchyViolations: u
  };
}, C = (r) => {
  const t = r, o = t && typeof t == "object" && !Array.isArray(t) && ("spec" in t || "inSpec" in t) ? t.spec ?? t.inSpec : t;
  return I({ inSpec: o });
};
C.validateSpec = I;
C.checkHierarchy = ot;
C.checkVoidRules = rt;
C.isVoidTag = at;
C.VOID_TAGS = nt;
const v = (r) => C(r);
v.v1 = S;
v.v2 = C;
v.validateSpec = C.validateSpec;
v.checkHierarchy = C.checkHierarchy;
v.checkVoidRules = C.checkVoidRules;
v.isVoidTag = C.isVoidTag;
const R = (r) => {
  const t = r, o = t && typeof t == "object" && !Array.isArray(t) && !(typeof Node < "u" && t instanceof Node) && ("spec" in t || "inSpec" in t || "outputType" in t || "inOutputType" in t || "validate" in t || "inValidate" in t || "debug" in t || "inDebug" in t), e = o ? t.spec ?? t.inSpec : t, n = o ? (t.outputType ?? t.inOutputType ?? "dom").toLowerCase() : "dom", a = o ? !!(t.showLog ?? t.inShowLog) : !1;
  if ((o ? !!(t.validate ?? t.inValidate ?? t.debug ?? t.inDebug) : !1) && e) {
    const u = v({ spec: e });
    u.isValid ? u.warnings && u.warnings.length > 0 && a && console.warn("[json-to-dom v25: validation warning]", u.warnings) : console.warn("[json-to-dom v25: validation error]", u.errors, u);
  }
  const { spec: s, showLog: l } = wt({ inSpec: e, inShowLog: a }), d = M({ inSpec: s, inShowLog: l });
  return n === "html" ? d ? Array.isArray(d) ? d.map((u) => u.outerHTML).join(`
`) : d.outerHTML : "" : d;
}, st = (r = {}) => {
  const t = r, o = t.spec ?? t.inSpec, e = t.domIdToPushTo ?? t.inDomIdToPushTo, n = !!(t.showLog ?? t.inShowLog), a = !!(t.validate ?? t.inValidate ?? t.debug ?? t.inDebug), i = typeof document < "u" && e ? document.getElementById(e) : null, s = R({ spec: o, outputType: "dom", showLog: n, validate: a });
  return i && s && (Array.isArray(s) ? i.append(...s) : i.appendChild(s)), s;
}, it = (r = {}) => {
  const t = r, o = t && typeof t == "object" && !Array.isArray(t) && ("spec" in t || "inSpec" in t) ? t.spec ?? t.inSpec : t, e = !!((t == null ? void 0 : t.showLog) ?? (t == null ? void 0 : t.inShowLog)), n = !!((t == null ? void 0 : t.validate) ?? (t == null ? void 0 : t.inValidate) ?? (t == null ? void 0 : t.debug) ?? (t == null ? void 0 : t.inDebug));
  return R({ spec: o, outputType: "html", showLog: e, validate: n });
}, Y = {
  meta: tt,
  core: { buildSpecElement: R, specToDom: st, specToHtml: it }
}, fe = {
  tags: N,
  globalAllowedAttributes: L
}, lt = ({ inElement: r }) => {
  const t = r;
  if (!t || typeof t.querySelectorAll != "function")
    return {};
  const o = t.querySelectorAll("input, select, textarea"), e = {};
  return o.forEach((n) => {
    const a = n.name || n.id;
    a && (n.type === "checkbox" ? e[a] = n.checked : n.type === "radio" ? n.checked && (e[a] = n.value) : e[a] = n.value);
  }), e;
}, ct = ({ inTargetElement: r, inClosestElement: t, inContainerElement: o }) => {
  var l, d, u;
  const e = r, n = t, a = o;
  if (!e || !n || !(((l = e.dataset) == null ? void 0 : l.highlight) === "true")) return;
  const s = (d = e.dataset) != null && d.highlightClass ? e.dataset.highlightClass.split(/\s+/).filter(Boolean) : ["bg-primary-subtle", "border", "border-primary"];
  if (a && typeof a.querySelectorAll == "function") {
    const f = (u = e.dataset) != null && u.closestTarget ? `.${e.dataset.closestTarget}` : ".ksrow", p = a.querySelectorAll("button[data-highlight-class]"), h = new Set(s);
    p.forEach((g) => {
      var c;
      (c = g.dataset) != null && c.highlightClass && g.dataset.highlightClass.split(/\s+/).filter(Boolean).forEach((b) => h.add(b));
    }), a.querySelectorAll(f).forEach((g) => {
      g !== n && g.classList.remove(...h);
    });
  }
  n.classList.add(...s);
}, Q = (r = {}) => {
  const t = r, o = t.container || t.inContainer || (typeof document < "u" && (t.containerId || t.inContainerId) ? document.getElementById(t.containerId || t.inContainerId) : null), e = t.actions || t.inActions || {}, n = !!(t.showLog ?? t.inShowLog);
  if (!o)
    return n && console.warn("[json-to-dom listeners] bindActions: Container not found."), { remove: () => {
    } };
  const a = (i) => {
    var h, y;
    const s = (y = (h = i.target) == null ? void 0 : h.closest) == null ? void 0 : y.call(h, "[data-action]");
    if (!s) return;
    const l = s.dataset.action, d = e[l], u = s.dataset.closestTarget || "ksrow", f = s.closest(`.${u}`) || s.parentElement;
    f && ct({
      inTargetElement: s,
      inClosestElement: f,
      inContainerElement: o
    });
    const p = f ? lt({ inElement: f }) : {};
    n && console.log(`[json-to-dom listeners] Action triggered: "${l}"`, {
      target: s,
      row: f,
      values: p
    }), typeof d == "function" ? d({
      event: i,
      target: s,
      row: f,
      values: p,
      container: o
    }) : n && console.warn(`[json-to-dom listeners] No handler registered for action "${l}".`);
  };
  return o.addEventListener("click", a), {
    remove: () => {
      o.removeEventListener("click", a);
    }
  };
}, K = {
  bindActions: Q,
  bind: Q,
  extractInputs: lt,
  applyHighlight: ct
}, H = (r = {}) => {
  const t = r, o = t.element || t.form || t.container || t.inElement || t.inForm || t.inContainer;
  if (!o || typeof o.querySelectorAll != "function")
    return {};
  const e = o.querySelectorAll("input, select, textarea"), n = {}, a = {};
  return e.forEach((i) => {
    if ((i.type || "").toLowerCase() === "checkbox") {
      const s = i.name || i.id;
      s && (a[s] = (a[s] || 0) + 1);
    }
  }), e.forEach((i) => {
    const s = i.name || i.id;
    if (!s) return;
    const l = (i.type || "").toLowerCase();
    if (!(l === "button" || l === "submit" || l === "reset" || i.tagName === "BUTTON"))
      if (l === "checkbox")
        a[s] > 1 ? (Array.isArray(n[s]) || (n[s] = []), i.checked && n[s].push(i.value)) : n[s] = i.checked;
      else if (l === "radio")
        i.checked ? n[s] = i.value : s in n || (n[s] = null);
      else if (i.tagName === "SELECT" && i.multiple) {
        const d = Array.from(i.selectedOptions || []).map((u) => u.value);
        n[s] = d;
      } else
        n[s] = i.value;
  }), n;
}, ut = (r = {}) => {
  const t = r, o = t.element || t.form || t.container || t.inElement || t.inForm || t.inContainer, e = t.defaultValues || t.inDefaultValues || {};
  return !o || typeof o.querySelectorAll != "function" ? { success: !1 } : o.tagName === "FORM" && typeof o.reset == "function" && Object.keys(e).length === 0 ? (o.reset(), { success: !0 }) : (o.querySelectorAll("input, select, textarea").forEach((a) => {
    const i = a.name || a.id, s = (a.type || "").toLowerCase();
    if (s === "button" || s === "submit" || s === "reset" || a.tagName === "BUTTON")
      return;
    const l = i && i in e ? e[i] : null;
    s === "checkbox" ? a.checked = l !== null ? !!l : !1 : s === "radio" ? a.checked = l !== null ? a.value === l : !1 : a.tagName === "SELECT" ? l !== null ? a.value = l : a.options && a.options.length > 0 ? a.selectedIndex = 0 : a.value = "" : a.value = l !== null ? String(l) : "";
  }), { success: !0 });
}, dt = ({ inTargetElement: r, inClosestElement: t, inContainerElement: o }) => {
  var l, d, u;
  const e = r, n = t, a = o;
  if (!e || !n || !(((l = e.dataset) == null ? void 0 : l.highlight) === "true")) return;
  const s = (d = e.dataset) != null && d.highlightClass ? e.dataset.highlightClass.split(/\s+/).filter(Boolean) : ["bg-primary-subtle", "border", "border-primary"];
  if (a && typeof a.querySelectorAll == "function") {
    const f = (u = e.dataset) != null && u.closestTarget ? `.${e.dataset.closestTarget}` : ".ksrow", p = a.querySelectorAll("button[data-highlight-class]"), h = new Set(s);
    p.forEach((g) => {
      var c;
      (c = g.dataset) != null && c.highlightClass && g.dataset.highlightClass.split(/\s+/).filter(Boolean).forEach((b) => h.add(b));
    }), a.querySelectorAll(f).forEach((g) => {
      g !== n && g.classList.remove(...h);
    });
  }
  n.classList.add(...s);
}, X = (r = {}) => {
  const t = r, o = t.container || t.form || t.inContainer || t.inForm || (typeof document < "u" && (t.containerId || t.formId || t.inContainerId || t.inFormId) ? document.getElementById(t.containerId || t.formId || t.inContainerId || t.inFormId) : null), e = t.actions || t.inActions || {}, n = t.defaultValues || t.inDefaultValues || {}, a = !!(t.showLog ?? t.inShowLog);
  if (!o)
    return a && console.warn("[json-to-dom listeners.v2] bindActions: Container/Form not found."), { remove: () => {
    } };
  const i = (s) => {
    var c, b;
    const l = (b = (c = s.target) == null ? void 0 : c.closest) == null ? void 0 : b.call(c, "[data-action]");
    if (!l) return;
    const d = l.dataset.action, u = e[d], f = l.dataset.closestTarget === "ksrow" || l.dataset.scope === "row";
    let p = null, h = null, y = {};
    if (f) {
      const m = l.dataset.closestTarget || "ksrow";
      p = l.closest(`.${m}`) || l.parentElement, p && (dt({
        inTargetElement: l,
        inClosestElement: p,
        inContainerElement: o
      }), y = H({ inElement: p }));
    } else
      h = l.closest("form") || l.closest(".ksform") || o, y = H({ inElement: h });
    const g = () => ut({
      inElement: h || o,
      inDefaultValues: n
    });
    if (a && console.log(`[json-to-dom listeners.v2] Action triggered: "${d}"`, {
      target: l,
      scope: f ? "row" : "form",
      row: p,
      form: h,
      values: y
    }), (d === "cancel" || d === "reset") && typeof u != "function") {
      g();
      return;
    }
    typeof u == "function" ? u({
      event: s,
      target: l,
      row: p,
      form: h || o,
      values: y,
      reset: g,
      container: o
    }) : a && console.warn(`[json-to-dom listeners.v2] No handler registered for action "${d}".`);
  };
  return o.addEventListener("click", i), {
    remove: () => {
      o.removeEventListener("click", i);
    }
  };
}, $ = {
  bindActions: X,
  bind: X,
  extractFormValues: H,
  resetForm: ut,
  applyHighlight: dt
}, D = (r) => $.bindActions(r), pe = {
  v1: K,
  v2: $,
  bindActions: D,
  bind: D,
  extractFormValues: $.extractFormValues,
  extractInputs: K.extractInputs,
  resetForm: $.resetForm,
  applyHighlight: $.applyHighlight
};
D.v1 = K.bindActions;
D.v2 = $.bindActions;
const he = ({ inApi: r } = {}) => {
  const t = r;
  typeof window < "u" && (window.ks = window.ks || {}, window.ks["json-to-dom"] = t);
}, me = {
  meta: tt,
  jsonToDom: Y,
  core: Y.core,
  validate: v,
  data: fe,
  listeners: pe
};
he({
  inApi: {
    ...me,
    buildSpecElement: R,
    specToDom: st,
    specToHtml: it,
    bindActions: D
  }
});
const ge = {
  title: "Customer Form",
  description: "Instruction-driven customer form template",
  guard: {
    requiredKeys: [
      "header.title"
    ],
    requiredArrays: [
      "customers"
    ]
  },
  structure: {
    tagName: "div",
    attributes: {
      class: "card p-4 shadow-sm border"
    },
    children: [
      {
        tagName: "h3",
        textContent: "${header.title}",
        attributes: {
          class: "h5 fw-bold text-primary mb-3"
        }
      },
      {
        jsonToSpec: {
          operation: "iterate",
          source: "customers",
          template: {
            tagName: "div",
            attributes: {
              class: "border rounded p-2 mb-2 bg-light d-flex justify-content-between align-items-center"
            },
            children: [
              {
                tagName: "strong",
                textContent: "${name}",
                attributes: {
                  class: "text-dark"
                }
              },
              {
                tagName: "span",
                textContent: "${role}",
                attributes: {
                  class: "badge bg-secondary"
                }
              }
            ]
          }
        }
      }
    ]
  }
}, be = {
  title: "Sales Table",
  description: "Instruction-driven sales table template",
  guard: {
    requiredArrays: [
      "rows"
    ]
  },
  structure: {
    tagName: "table",
    attributes: {
      class: "table table-hover table-striped align-middle border mb-0"
    },
    children: [
      {
        tagName: "thead",
        attributes: {
          class: "table-light"
        },
        children: [
          {
            tagName: "tr",
            children: [
              {
                tagName: "th",
                textContent: "Name"
              },
              {
                tagName: "th",
                textContent: "Amount",
                attributes: {
                  class: "text-end"
                }
              }
            ]
          }
        ]
      },
      {
        tagName: "tbody",
        children: [
          {
            jsonToSpec: {
              operation: "iterate",
              source: "rows",
              template: {
                tagName: "tr",
                children: [
                  {
                    tagName: "td",
                    textContent: "${name}"
                  },
                  {
                    tagName: "td",
                    textContent: "${amount}",
                    attributes: {
                      class: "text-end font-monospace"
                    }
                  }
                ]
              }
            }
          }
        ]
      }
    ]
  }
}, ye = {
  title: "Vouchers Directory",
  description: "Comprehensive voucher directory with toolbar, data table, and detail form",
  guard: {
    requiredKeys: [
      "toolbar.title",
      "summary.totalCount"
    ],
    requiredArrays: [
      "tableRows",
      "tableColumns"
    ]
  },
  structure: [
    {
      tagName: "div",
      attributes: {
        class: "card border rounded-3 shadow-sm bg-white p-3 mb-4"
      },
      children: [
        {
          tagName: "div",
          attributes: {
            class: "row g-2 align-items-center"
          },
          children: [
            {
              tagName: "div",
              attributes: {
                class: "col-md-3"
              },
              children: [
                {
                  tagName: "h6",
                  textContent: "${toolbar.title}",
                  attributes: {
                    class: "mb-0 fw-bold text-dark"
                  }
                }
              ]
            },
            {
              tagName: "div",
              attributes: {
                class: "col-md-4"
              },
              children: [
                {
                  tagName: "input",
                  attributes: {
                    type: "text",
                    name: "filterSearch",
                    placeholder: "Search voucher # or party...",
                    class: "form-control form-control-sm"
                  }
                }
              ]
            },
            {
              tagName: "div",
              attributes: {
                class: "col-md-3"
              },
              children: [
                {
                  tagName: "select",
                  attributes: {
                    name: "filterStatus",
                    class: "form-select form-select-sm"
                  },
                  jsonToSpec: {
                    operation: "iterate",
                    source: "toolbar.statusOptions",
                    template: {
                      tagName: "option",
                      textContent: "${text}",
                      attributes: {
                        value: "${value}"
                      }
                    }
                  }
                }
              ]
            },
            {
              tagName: "div",
              attributes: {
                class: "col-md-2 d-grid"
              },
              children: [
                {
                  tagName: "button",
                  textContent: "Apply Filter",
                  attributes: {
                    type: "button",
                    class: "btn btn-primary btn-sm",
                    "data-action": "applyFilter",
                    "data-action-type": "click"
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      tagName: "div",
      attributes: {
        class: "card border rounded-3 shadow-sm bg-white overflow-hidden mb-4"
      },
      children: [
        {
          tagName: "div",
          attributes: {
            class: "card-header bg-light p-3 border-bottom d-flex justify-content-between align-items-center"
          },
          children: [
            {
              tagName: "span",
              textContent: "Vouchers Directory",
              attributes: {
                class: "fw-bold text-dark"
              }
            },
            {
              tagName: "span",
              textContent: "${summary.totalCount} Vouchers Total",
              attributes: {
                class: "badge bg-secondary font-monospace"
              }
            }
          ]
        },
        {
          tagName: "div",
          attributes: {
            class: "table-responsive"
          },
          children: [
            {
              tagName: "table",
              attributes: {
                class: "table table-hover table-striped align-middle mb-0"
              },
              children: [
                {
                  tagName: "thead",
                  attributes: {
                    class: "table-light"
                  },
                  children: [
                    {
                      tagName: "tr",
                      children: [
                        {
                          tagName: "th",
                          textContent: "#",
                          attributes: {
                            class: "text-center",
                            style: "width: 50px;"
                          }
                        },
                        {
                          jsonToSpec: {
                            operation: "iterate",
                            source: "tableColumns",
                            filter: {
                              isVisible: !0
                            },
                            template: {
                              tagName: "th",
                              textContent: "${title}",
                              attributes: {
                                class: "text-start"
                              }
                            }
                          }
                        },
                        {
                          tagName: "th",
                          textContent: "Action",
                          attributes: {
                            class: "text-end px-3",
                            style: "width: 100px;"
                          }
                        }
                      ]
                    }
                  ]
                },
                {
                  tagName: "tbody",
                  jsonToSpec: {
                    operation: "iterate",
                    source: "tableRows",
                    template: {
                      tagName: "tr",
                      children: [
                        {
                          tagName: "td",
                          textContent: "${$number}",
                          attributes: {
                            class: "text-center font-monospace text-muted small"
                          }
                        },
                        {
                          jsonToSpec: {
                            operation: "iterate",
                            source: "tableColumns",
                            filter: {
                              isVisible: !0
                            },
                            template: {
                              tagName: "td",
                              textContent: "${value}",
                              attributes: {
                                class: "text-start small"
                              }
                            }
                          }
                        },
                        {
                          tagName: "td",
                          attributes: {
                            class: "text-end px-3"
                          },
                          children: [
                            {
                              tagName: "button",
                              textContent: "Select",
                              attributes: {
                                type: "button",
                                class: "btn btn-outline-primary btn-sm px-2 py-0.5",
                                "data-action": "selectRow",
                                "data-action-type": "click",
                                "data-voucher-no": "${voucherNo}",
                                "data-voucher-date": "${voucherDate}",
                                "data-party-name": "${partyName}",
                                "data-amount": "${amount}",
                                "data-status": "${status}"
                              }
                            }
                          ]
                        }
                      ]
                    }
                  }
                },
                {
                  tagName: "tfoot",
                  attributes: {
                    class: "table-light border-top"
                  },
                  children: [
                    {
                      tagName: "tr",
                      children: [
                        {
                          tagName: "td",
                          textContent: "Total: ${summary.totalCount} vouchers | Gross Amount: ₹${summary.totalAmount}",
                          attributes: {
                            colspan: "7",
                            class: "small text-muted py-2 px-3 fw-semibold"
                          }
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      tagName: "div",
      attributes: {
        class: "ksform border rounded-3 shadow-sm bg-white overflow-hidden"
      },
      children: [
        {
          tagName: "div",
          attributes: {
            class: "bg-body-secondary p-3 border-bottom d-flex justify-content-between align-items-center"
          },
          children: [
            {
              tagName: "span",
              textContent: "Voucher Detail Form",
              attributes: {
                class: "fw-bold fs-6 text-dark"
              }
            },
            {
              tagName: "span",
              textContent: "Auto-filled on row selection",
              attributes: {
                class: "badge bg-info-subtle text-info-emphasis border border-info-subtle"
              }
            }
          ]
        },
        {
          tagName: "div",
          attributes: {
            class: "p-4"
          },
          children: [
            {
              tagName: "div",
              attributes: {
                class: "row g-3"
              },
              jsonToSpec: {
                operation: "iterate",
                source: "formColumns",
                filter: {
                  isVisible: !0
                },
                template: {
                  tagName: "div",
                  attributes: {
                    class: "col-md-6"
                  },
                  children: [
                    {
                      tagName: "label",
                      textContent: "${title}",
                      attributes: {
                        class: "form-label fw-semibold text-secondary small"
                      }
                    },
                    {
                      tagName: "input",
                      attributes: {
                        name: "${field}",
                        type: "${inputType}",
                        placeholder: "Enter ${title}...",
                        class: "form-control"
                      }
                    }
                  ]
                }
              }
            }
          ]
        },
        {
          tagName: "div",
          attributes: {
            class: "bg-light p-3 border-top d-flex justify-content-end gap-2"
          },
          children: [
            {
              tagName: "button",
              textContent: "Reset Form",
              attributes: {
                type: "button",
                class: "btn btn-outline-secondary px-3 py-1.5",
                "data-action": "cancel",
                "data-action-type": "click"
              }
            },
            {
              tagName: "button",
              textContent: "Save Voucher",
              attributes: {
                type: "button",
                class: "btn btn-success px-4 py-1.5 fw-semibold",
                "data-action": "save",
                "data-action-type": "click"
              }
            }
          ]
        }
      ]
    }
  ]
}, we = {
  customerForm: ge,
  salesTable: be,
  voucherDirectory: ye
}, Ce = ["input", "img", "br", "hr", "meta", "link", "source"], ft = ({ inKey: r, inRegistry: t }) => {
  const o = r, e = t;
  if (!o || typeof o != "string")
    return {
      isValid: !1,
      error: "Template key must be a non-empty string."
    };
  if (!e || typeof e != "object")
    return {
      isValid: !1,
      error: "Registry must be a valid object."
    };
  const n = e[o];
  if (!n) {
    const a = Object.keys(e).join(", ");
    return {
      isValid: !1,
      error: `Template "${o}" not found in registry. Available keys: [${a}].`
    };
  }
  return {
    isValid: !0,
    error: null,
    template: n
  };
}, P = ({ inNode: r, inPath: t = "root" }) => {
  const o = r, e = t, n = [], a = [];
  if (!o || typeof o != "object")
    return n.push(`[${e}] Node must be a non-null object.`), { isValid: !1, errors: n, warnings: a };
  if (o.jsonToSpec)
    if (typeof o.jsonToSpec != "object" || Array.isArray(o.jsonToSpec))
      n.push(`[${e}] jsonToSpec directive must be an object.`);
    else {
      const { operation: i, source: s, template: l } = o.jsonToSpec;
      if ((!i || typeof i != "string") && n.push(`[${e}.jsonToSpec] Operation must be a non-empty string (e.g. "iterate").`), i === "iterate")
        if ((!s || typeof s != "string") && n.push(`[${e}.jsonToSpec] "iterate" operation requires a "source" string.`), !l || typeof l != "object")
          n.push(`[${e}.jsonToSpec] "iterate" operation requires a "template" object.`);
        else {
          const d = P({
            inNode: l,
            inPath: `${e}.jsonToSpec.template`
          });
          n.push(...d.errors), a.push(...d.warnings);
        }
    }
  if (o.tagName)
    if (typeof o.tagName != "string")
      n.push(`[${e}] tagName must be a string.`);
    else {
      const i = o.tagName.toLowerCase();
      Ce.includes(i) && o.children && o.children.length > 0 && n.push(`[${e}] Void tag <${o.tagName}> cannot have children.`);
    }
  return o.children && (Array.isArray(o.children) ? o.children.forEach((i, s) => {
    const l = P({
      inNode: i,
      inPath: `${e}.children[${s}]`
    });
    n.push(...l.errors), a.push(...l.warnings);
  }) : n.push(`[${e}] children must be an array.`)), {
    isValid: n.length === 0,
    errors: n,
    warnings: a
  };
}, W = ({ inStructure: r }) => {
  const t = r, o = [], e = [];
  if (!t)
    return {
      isValid: !1,
      errors: ["Structure is missing or null."],
      warnings: []
    };
  if (Array.isArray(t))
    t.length === 0 && e.push("[root] Structure array is empty."), t.forEach((n, a) => {
      const i = P({ inNode: n, inPath: `root[${a}]` });
      o.push(...i.errors), e.push(...i.warnings);
    });
  else if (typeof t == "object") {
    const n = P({ inNode: t, inPath: "root" });
    o.push(...n.errors), e.push(...n.warnings);
  } else
    return {
      isValid: !1,
      errors: ["Structure must be an object or array."],
      warnings: []
    };
  return {
    isValid: o.length === 0,
    errors: o,
    warnings: e
  };
}, Z = ({ inData: r, inPath: t }) => {
  const o = r, e = t;
  if (!o || !e) return;
  const n = e.split(".");
  let a = o;
  for (const i of n) {
    if (a == null || typeof a != "object")
      return;
    a = a[i];
  }
  return a;
}, pt = ({ inTemplate: r, inData: t }) => {
  const o = r, e = t || {}, n = [];
  if (!o || typeof o != "object")
    return {
      isValid: !1,
      errors: ["Template definition is required to validate data contract."]
    };
  const a = o.guard || o.contract;
  if (!a)
    return {
      isValid: !0,
      errors: []
    };
  if (Array.isArray(a.requiredKeys))
    for (const i of a.requiredKeys) {
      const s = Z({ inData: e, inPath: i });
      (s == null || s === "") && n.push(`Required data key "${i}" is missing in data payload.`);
    }
  if (Array.isArray(a.requiredArrays))
    for (const i of a.requiredArrays) {
      const s = Z({ inData: e, inPath: i });
      Array.isArray(s) || n.push(`Data path "${i}" must be an array.`);
    }
  return {
    isValid: n.length === 0,
    errors: n
  };
}, j = { ...we }, G = ({ inKey: r, inRegistry: t = j } = {}) => {
  const n = ft({
    inKey: r,
    inRegistry: t
  });
  if (!n.isValid)
    throw new Error(n.error);
  return n.template;
}, ht = ({ inKey: r, inRegistry: t = j } = {}) => {
  const o = r, n = G({
    inKey: o,
    inRegistry: t
  });
  if (!n.structure)
    throw new Error(`Template "${o}" is missing a structure definition.`);
  const a = W({
    inStructure: n.structure
  });
  if (!a.isValid)
    throw new Error(`Structure validation failed for "${o}": ${a.errors.join("; ")}`);
  return n.structure;
}, Ae = ({ inKey: r, inTemplate: t, inRegistry: o = j } = {}) => {
  const e = r, n = t, a = o;
  if (!e || typeof e != "string")
    throw new Error("registerTemplate requires a valid string key.");
  if (!n || typeof n != "object" || !n.structure)
    throw new Error('registerTemplate requires a template object with a "structure" property.');
  const i = W({
    inStructure: n.structure
  });
  if (!i.isValid)
    throw new Error(`Cannot register template "${e}": ${i.errors.join("; ")}`);
  return a[e] = n, a;
}, ve = ({ inRegistry: r = j } = {}) => Object.entries(r).map(([o, e]) => ({
  key: o,
  title: e.title || o,
  description: e.description || "",
  guard: e.guard || null
})), mt = ({
  inKey: r,
  inData: t,
  inRegistry: o,
  // Shorthand aliases
  key: e,
  data: n,
  registry: a
} = {}) => {
  const i = r || e, s = t || n || {}, l = o || a || j, d = G({
    inKey: i,
    inRegistry: l
  }), u = pt({
    inTemplate: d,
    inData: s
  });
  if (!u.isValid)
    throw new Error(`Data contract validation failed for "${i}": ${u.errors.join("; ")}`);
  const f = ht({
    inKey: i,
    inRegistry: l
  });
  return O({
    inStructure: f,
    inData: s
  });
}, Te = ({
  inKey: r,
  inData: t,
  inTargetContainerId: o,
  inRegistry: e,
  // Shorthand aliases
  key: n,
  data: a,
  targetContainerId: i,
  registry: s
} = {}) => {
  const l = r || n, d = t || a || {}, u = o || i, p = mt({
    inKey: l,
    inData: d,
    inRegistry: e || s || j
  });
  if (typeof document > "u")
    return {
      spec: p,
      element: null,
      warning: "renderTemplate requires a DOM environment (window.document). Spec compiled successfully."
    };
  const h = R({ inSpec: p });
  if (u) {
    const y = document.getElementById(u);
    y && (y.innerHTML = "", Array.isArray(h) ? h.forEach((g) => {
      g && typeof g == "object" && "nodeType" in g && y.appendChild(g);
    }) : h && typeof h == "object" && "nodeType" in h && y.appendChild(h));
  }
  return h;
}, xe = {
  compileTemplate: mt,
  renderTemplate: Te,
  getTemplate: G,
  getStructure: ht,
  registerTemplate: Ae,
  listTemplates: ve,
  templateRegistry: j,
  guards: {
    validateKey: ft,
    validateStructure: W,
    validateDataContract: pt
  }
};
export {
  mt as compileTemplate,
  xe as default,
  ht as getStructure,
  G as getTemplate,
  ve as listTemplates,
  Ae as registerTemplate,
  Te as renderTemplate,
  j as templateRegistry,
  pt as validateDataContract,
  ft as validateKey,
  W as validateStructure
};
