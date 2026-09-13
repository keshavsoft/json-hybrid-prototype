const N = ({ inData: n, inPath: s }) => {
  const l = n, e = s;
  if (l == null) return;
  if (e == null || e === "" || e === ".")
    return l;
  const i = Array.isArray(e) ? e : String(e).split(".");
  let o = l;
  for (const d of i) {
    if (o == null)
      return;
    o = o[d];
  }
  return o;
}, R = ({ inText: n, inItemContext: s, inRootData: l }) => {
  const e = n, i = s, o = l;
  return typeof e != "string" || !e.includes("${") ? e : e.replace(/\$\{([^}]+)\}/g, (d, t) => {
    const f = t.trim();
    let m = N({ inData: i, inPath: f });
    return m === void 0 && i && typeof i == "object" && (i.item && typeof i.item == "object" && (m = N({ inData: i.item, inPath: f })), m === void 0 && i.row && typeof i.row == "object" && (m = N({ inData: i.row, inPath: f }))), m === void 0 && o && (m = N({ inData: o, inPath: f })), m != null ? String(m) : "";
  });
}, v = ({ inNode: n, inContext: s = {}, inRootData: l = {} } = {}) => {
  var m;
  const e = n, i = s || {}, o = l || {};
  if (e == null) return null;
  if (Array.isArray(e)) {
    const c = [];
    for (const r of e) {
      const u = v({
        inNode: r,
        inContext: i,
        inRootData: o
      });
      Array.isArray(u) ? c.push(...u) : u != null && c.push(u);
    }
    return c;
  }
  if (typeof e != "object")
    return R({
      inText: e,
      inItemContext: i,
      inRootData: o
    });
  if (e.operation === "iterate" || !!e.$iterate) {
    const c = e.source || e.iterateOn || e.$iterate, r = o && o[c] || N({ inData: o, inPath: c }) || i && i[c] || N({ inData: i, inPath: c });
    if (!Array.isArray(r)) return [];
    const u = e.template || e.item || {}, x = e.filter, A = r.filter((a) => {
      if (!a || typeof a != "object") return !0;
      if (x && typeof x == "object") {
        for (const [h, p] of Object.entries(x))
          if (a[h] !== p) return !1;
      }
      return a.isVisible !== !1;
    }), y = [];
    return A.forEach((a, h) => {
      const p = {
        ...i,
        item: a,
        ...typeof a == "object" && a !== null ? a : {},
        $index: h,
        $number: h + 1
      };
      if ((c === "rows" || c.endsWith(".rows") || c === "items") && (p.row = a), i.row && (a.field || a.columnName || a.name)) {
        const w = a.field || a.columnName || a.name, g = i.row[w];
        g !== void 0 && (p.cellValue = g, p.value = g);
      }
      const b = v({
        inNode: u,
        inContext: p,
        inRootData: o
      });
      Array.isArray(b) ? y.push(...b) : b != null && y.push(b);
    }), y;
  }
  const t = { ...e }, f = {
    ...typeof i.item == "object" ? i.item : {},
    ...i
  };
  if (f.type === "textarea" && t.tagName === "input" && (t.tagName = "textarea", t.attributes && (t.attributes = { ...t.attributes }, delete t.attributes.type)), t.textContent && (t.textContent = R({
    inText: t.textContent,
    inItemContext: f,
    inRootData: o
  })), t.attributes) {
    t.attributes = { ...t.attributes };
    for (const [r, u] of Object.entries(t.attributes))
      typeof u == "string" && (t.attributes[r] = R({
        inText: u,
        inItemContext: f,
        inRootData: o
      }));
    if (["input", "textarea", "select", "option"].includes((m = t.tagName) == null ? void 0 : m.toLowerCase())) {
      const r = f.field || f.columnName || f.name;
      f.value !== void 0 && f.value !== null ? t.attributes.value = String(f.value) : r && o[r] !== void 0 && o[r] !== null ? t.attributes.value = String(o[r]) : r && o.values && o.values[r] !== void 0 && o.values[r] !== null && (t.attributes.value = String(o.values[r]));
    }
  }
  if (Array.isArray(t.children)) {
    const c = [];
    for (const r of t.children) {
      const u = v({
        inNode: r,
        inContext: i,
        inRootData: o
      });
      Array.isArray(u) ? c.push(...u) : u != null && c.push(u);
    }
    t.children = c;
  }
  return t;
}, P = {
  version: "2.0.0",
  name: "json-to-spec/v2",
  description: "Pure JSON Specification Compiler: (contextJson, dataJson) -> Spec JSON ready for json-to-dom"
}, k = (n, s = {}) => {
  let l = n, e = s || {};
  return n && typeof n == "object" && !Array.isArray(n) && ("context" in n && ("data" in n || s === void 0 || Object.keys(s).length === 0) ? (l = n.context, e = n.data || e) : "structure" in n && ("data" in n || s === void 0 || Object.keys(s).length === 0) ? (l = n.structure, e = n.data || e) : ("inStructure" in n || "inContext" in n || "inTree" in n) && (l = n.inStructure || n.inContext || n.inTree, e = n.inData || e)), v({
    inNode: l,
    inContext: e,
    inRootData: e
  });
};
typeof globalThis < "u" && (globalThis.ks ?? (globalThis.ks = {}), globalThis.ks["json-to-spec"] = {
  meta: P,
  compile: k,
  compileNode: v,
  resolvePath: N
});
const C = ({ inData: n, inPath: s }) => {
  const l = n, e = s;
  if (l == null) return;
  if (e == null || e === "" || e === ".")
    return l;
  const i = Array.isArray(e) ? e : String(e).split(".");
  let o = l;
  for (const d of i) {
    if (o == null)
      return;
    o = o[d];
  }
  return o;
}, $ = ({ inPath: n, inItemContext: s, inRootData: l }) => {
  const e = n, i = s, o = l;
  let d = C({ inData: i, inPath: e });
  return d === void 0 && i && typeof i == "object" && (i.item && typeof i.item == "object" && (d = C({ inData: i.item, inPath: e })), d === void 0 && i.row && typeof i.row == "object" && (d = C({ inData: i.row, inPath: e }))), d === void 0 && o && (d = C({ inData: o, inPath: e })), d;
}, j = ({ inValue: n, inItemContext: s, inRootData: l }) => {
  const e = n, i = s, o = l;
  if (typeof e != "string" || !e.includes("${"))
    return e;
  const d = e.match(/^\$\{([^}]+)\}$/);
  if (d) {
    const t = $({
      inPath: d[1].trim(),
      inItemContext: i,
      inRootData: o
    });
    return t ?? "";
  }
  return e.replace(/\$\{([^}]+)\}/g, (t, f) => {
    const m = $({
      inPath: f.trim(),
      inItemContext: i,
      inRootData: o
    });
    return m != null ? String(m) : "";
  });
}, S = ({ inText: n, inItemContext: s, inRootData: l }) => {
  const e = j({
    inValue: n,
    inItemContext: s,
    inRootData: l
  });
  return e != null ? String(e) : "";
}, T = ({ inNode: n, inContext: s = {}, inRootData: l = {} } = {}) => {
  var m;
  const e = n, i = s || {}, o = l || {};
  if (e == null) return null;
  if (Array.isArray(e)) {
    const c = [];
    for (const r of e) {
      const u = T({
        inNode: r,
        inContext: i,
        inRootData: o
      });
      Array.isArray(u) ? c.push(...u) : u != null && c.push(u);
    }
    return c;
  }
  if (typeof e != "object")
    return S({
      inText: e,
      inItemContext: i,
      inRootData: o
    });
  const d = e.jsonToSpec || (e.operation ? e : null);
  if (d && (d.operation === "iterate" || d.source || d.$iterate)) {
    const c = d.source || d.iterateOn || d.$iterate, r = C({ inData: o, inPath: c }) || o && o[c] || C({ inData: i, inPath: c }) || i && i[c];
    if (!Array.isArray(r)) {
      if (e.tagName) {
        const a = { ...e };
        return delete a.jsonToSpec, a.children = [], a;
      }
      return [];
    }
    const u = d.template || d.item || {}, x = d.filter, A = r.filter((a) => {
      if (!a || typeof a != "object") return !0;
      if (x && typeof x == "object") {
        for (const [h, p] of Object.entries(x))
          if (a[h] !== p) return !1;
      }
      return a.isVisible !== !1;
    }), y = [];
    if (A.forEach((a, h) => {
      const p = {
        ...i,
        item: a,
        ...typeof a == "object" && a !== null ? a : {},
        $index: h,
        $number: h + 1
      };
      if ((c === "rows" || c.endsWith(".rows") || c === "items" || c.endsWith("Rows")) && (p.row = a), i.row && (a.field || a.columnName || a.name)) {
        const w = a.field || a.columnName || a.name, g = i.row[w];
        g !== void 0 && (p.cellValue = g, p.value = g, typeof a == "object" && a !== null && a.value === void 0 && (a.value = g));
      }
      const b = T({
        inNode: u,
        inContext: p,
        inRootData: o
      });
      Array.isArray(b) ? y.push(...b) : b != null && y.push(b);
    }), e.tagName) {
      const a = { ...e };
      if (delete a.jsonToSpec, a.children = y, a.textContent && (a.textContent = S({
        inText: a.textContent,
        inItemContext: i,
        inRootData: o
      })), a.attributes) {
        a.attributes = { ...a.attributes };
        for (const [h, p] of Object.entries(a.attributes))
          typeof p == "string" && (a.attributes[h] = j({
            inValue: p,
            inItemContext: i,
            inRootData: o
          }));
      }
      if (a.properties) {
        a.properties = { ...a.properties };
        for (const [h, p] of Object.entries(a.properties))
          typeof p == "string" && (a.properties[h] = j({
            inValue: p,
            inItemContext: i,
            inRootData: o
          }));
      }
      return a;
    }
    return y;
  }
  const t = { ...e };
  "jsonToSpec" in t && delete t.jsonToSpec;
  const f = {
    ...typeof i.item == "object" ? i.item : {},
    ...i
  };
  if (f.type === "textarea" && t.tagName === "input" && (t.tagName = "textarea", t.attributes && (t.attributes = { ...t.attributes }, delete t.attributes.type)), t.textContent && (t.textContent = S({
    inText: t.textContent,
    inItemContext: f,
    inRootData: o
  })), t.attributes) {
    t.attributes = { ...t.attributes };
    for (const [r, u] of Object.entries(t.attributes))
      typeof u == "string" && (t.attributes[r] = j({
        inValue: u,
        inItemContext: f,
        inRootData: o
      }));
    if (["input", "textarea", "select", "option"].includes((m = t.tagName) == null ? void 0 : m.toLowerCase())) {
      const r = f.field || f.columnName || f.name;
      f.value !== void 0 && f.value !== null ? (t.attributes.value = String(f.value), t.tagName === "textarea" && !t.textContent && (t.textContent = String(f.value))) : r && o[r] !== void 0 && o[r] !== null ? (t.attributes.value = String(o[r]), t.tagName === "textarea" && !t.textContent && (t.textContent = String(o[r]))) : r && o.values && o.values[r] !== void 0 && o.values[r] !== null && (t.attributes.value = String(o.values[r]), t.tagName === "textarea" && !t.textContent && (t.textContent = String(o.values[r])));
    }
  }
  if (t.properties) {
    t.properties = { ...t.properties };
    for (const [c, r] of Object.entries(t.properties))
      typeof r == "string" && (t.properties[c] = j({
        inValue: r,
        inItemContext: f,
        inRootData: o
      }));
  }
  if (Array.isArray(t.children)) {
    const c = [];
    for (const r of t.children) {
      const u = T({
        inNode: r,
        inContext: i,
        inRootData: o
      });
      Array.isArray(u) ? c.push(...u) : u != null && c.push(u);
    }
    t.children = c;
  }
  return t;
}, F = {
  version: "3.0.0",
  name: "json-to-spec/v3",
  description: "Pure JSON Specification Compiler with jsonToSpec namespace: (structure, data) -> Spec JSON ready for json-to-dom"
}, I = (n, s = {}) => {
  let l = n, e = s || {};
  return n && typeof n == "object" && !Array.isArray(n) && ("structure" in n && ("data" in n || s === void 0 || Object.keys(s).length === 0) ? (l = n.structure, e = n.data || e) : "context" in n && ("data" in n || s === void 0 || Object.keys(s).length === 0) ? (l = n.context, e = n.data || e) : ("inStructure" in n || "inContext" in n || "inTree" in n) && (l = n.inStructure || n.inContext || n.inTree, e = n.inData || e)), T({
    inNode: l,
    inContext: e,
    inRootData: e
  });
};
typeof globalThis < "u" && (globalThis.ks ?? (globalThis.ks = {}), globalThis.ks["json-to-spec"] = {
  meta: F,
  compile: I,
  compileNode: T,
  resolvePath: C
}, globalThis.ks["json-to-spec-v3"] = globalThis.ks["json-to-spec"]);
const D = {
  customerForm: {
    title: "Customer Form",
    description: "Instruction-driven customer form template",
    structure: {
      tagName: "div",
      attributes: { class: "card p-4" },
      children: [
        { tagName: "h3", textContent: "${header.title}" },
        {
          jsonToSpec: {
            operation: "iterate",
            source: "customers",
            template: {
              tagName: "div",
              attributes: { class: "border rounded p-2 mb-2" },
              children: [
                { tagName: "strong", textContent: "${name}" },
                { tagName: "div", textContent: "${role}" }
              ]
            }
          }
        }
      ]
    }
  },
  salesTable: {
    title: "Sales Table",
    description: "Instruction-driven sales table template",
    structure: {
      tagName: "table",
      attributes: { class: "table table-striped" },
      children: [
        {
          tagName: "thead",
          children: [
            {
              tagName: "tr",
              children: [
                { tagName: "th", textContent: "Name" },
                { tagName: "th", textContent: "Amount" }
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
                    { tagName: "td", textContent: "${name}" },
                    { tagName: "td", textContent: "${amount}" }
                  ]
                }
              }
            }
          ]
        }
      ]
    }
  }
}, V = ({ key: n, registry: s = D } = {}) => {
  const l = s == null ? void 0 : s[n];
  if (!l)
    throw new Error(`Template "${n}" not found in provided registry.`);
  return l;
}, J = ({ key: n, data: s = {}, registry: l = D } = {}) => {
  const e = V({ key: n, registry: l });
  if (!e.structure)
    throw new Error(`Template "${n}" is missing a structure definition.`);
  return I({
    inStructure: e.structure,
    inData: s
  });
}, K = ({ key: n, template: s, registry: l = D } = {}) => {
  if (!n || !s)
    throw new Error("registerTemplate requires both key and template.");
  return l[n] = s, l;
}, E = D, W = {
  compileTemplate: J,
  getTemplate: V,
  registerTemplate: K,
  templateRegistry: E
};
export {
  J as compileTemplate,
  W as default,
  V as getTemplate,
  K as registerTemplate,
  E as templateRegistry
};
