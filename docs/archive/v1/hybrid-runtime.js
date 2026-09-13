import { compile as y } from "https://keshavsoft.github.io/json-to-spec/dist/v3/min.js";
import { buildSpecElement as N } from "https://keshavsoft.github.io/json-to-dom/dist/v27/min.js";
const u = {
  customerForm: {
    title: "Customer Form",
    description: "Instruction-driven customer form template",
    guard: {
      requiredKeys: ["header.title"],
      requiredArrays: ["customers"]
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
                  attributes: { class: "text-dark" }
                },
                {
                  tagName: "span",
                  textContent: "${role}",
                  attributes: { class: "badge bg-secondary" }
                }
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
    guard: {
      requiredArrays: ["rows"]
    },
    structure: {
      tagName: "table",
      attributes: {
        class: "table table-hover table-striped align-middle border mb-0"
      },
      children: [
        {
          tagName: "thead",
          attributes: { class: "table-light" },
          children: [
            {
              tagName: "tr",
              children: [
                { tagName: "th", textContent: "Name" },
                { tagName: "th", textContent: "Amount", attributes: { class: "text-end" } }
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
                    { tagName: "td", textContent: "${amount}", attributes: { class: "text-end font-monospace" } }
                  ]
                }
              }
            }
          ]
        }
      ]
    }
  },
  voucherDirectory: {
    title: "Vouchers Directory",
    description: "Comprehensive voucher directory with toolbar, data table, and detail form",
    guard: {
      requiredKeys: ["toolbar.title", "summary.totalCount"],
      requiredArrays: ["tableRows", "tableColumns"]
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
            attributes: { class: "row g-2 align-items-center" },
            children: [
              {
                tagName: "div",
                attributes: { class: "col-md-3" },
                children: [
                  {
                    tagName: "h6",
                    textContent: "${toolbar.title}",
                    attributes: { class: "mb-0 fw-bold text-dark" }
                  }
                ]
              },
              {
                tagName: "div",
                attributes: { class: "col-md-4" },
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
                attributes: { class: "col-md-3" },
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
                        attributes: { value: "${value}" }
                      }
                    }
                  }
                ]
              },
              {
                tagName: "div",
                attributes: { class: "col-md-2 d-grid" },
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
                attributes: { class: "fw-bold text-dark" }
              },
              {
                tagName: "span",
                textContent: "${summary.totalCount} Vouchers Total",
                attributes: { class: "badge bg-secondary font-monospace" }
              }
            ]
          },
          {
            tagName: "div",
            attributes: { class: "table-responsive" },
            children: [
              {
                tagName: "table",
                attributes: { class: "table table-hover table-striped align-middle mb-0" },
                children: [
                  {
                    tagName: "thead",
                    attributes: { class: "table-light" },
                    children: [
                      {
                        tagName: "tr",
                        children: [
                          {
                            tagName: "th",
                            textContent: "#",
                            attributes: { class: "text-center", style: "width: 50px;" }
                          },
                          {
                            jsonToSpec: {
                              operation: "iterate",
                              source: "tableColumns",
                              filter: { isVisible: !0 },
                              template: {
                                tagName: "th",
                                textContent: "${title}",
                                attributes: { class: "text-start" }
                              }
                            }
                          },
                          {
                            tagName: "th",
                            textContent: "Action",
                            attributes: { class: "text-end px-3", style: "width: 100px;" }
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
                            attributes: { class: "text-center font-monospace text-muted small" }
                          },
                          {
                            jsonToSpec: {
                              operation: "iterate",
                              source: "tableColumns",
                              filter: { isVisible: !0 },
                              template: {
                                tagName: "td",
                                textContent: "${value}",
                                attributes: { class: "text-start small" }
                              }
                            }
                          },
                          {
                            tagName: "td",
                            attributes: { class: "text-end px-3" },
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
                    attributes: { class: "table-light border-top" },
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
                attributes: { class: "fw-bold fs-6 text-dark" }
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
            attributes: { class: "p-4" },
            children: [
              {
                tagName: "div",
                attributes: { class: "row g-3" },
                jsonToSpec: {
                  operation: "iterate",
                  source: "formColumns",
                  filter: { isVisible: !0 },
                  template: {
                    tagName: "div",
                    attributes: { class: "col-md-6" },
                    children: [
                      {
                        tagName: "label",
                        textContent: "${title}",
                        attributes: { class: "form-label fw-semibold text-secondary small" }
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
  }
}, d = ({ templateKey: s } = {}) => {
  const e = s;
  if (!e || typeof e != "string")
    throw new Error("Chapter 1 (Identity) Error: templateKey must be a non-empty string.");
  const t = u[e];
  if (!t) {
    const a = Object.keys(u).join(", ");
    throw new Error(`Chapter 1 (Identity) Error: Template "${e}" not found. Available keys: [${a}].`);
  }
  return t;
}, b = ({ dataAsJson: s, path: e }) => {
  const t = s, a = e;
  if (!t || !a) return;
  const r = a.split(".");
  let o = t;
  for (const n of r) {
    if (o == null || typeof o != "object")
      return;
    o = o[n];
  }
  return o;
}, h = ({ template: s, dataAsJson: e = {} } = {}) => {
  const t = s, a = e, r = [];
  if (!t || typeof t != "object")
    throw new Error("Chapter 2 (Gatekeeper) Error: Template blueprint is required for contract validation.");
  const o = t.guard || t.contract;
  if (!o)
    return !0;
  if (Array.isArray(o.requiredKeys))
    for (const n of o.requiredKeys) {
      const l = b({ dataAsJson: a, path: n });
      (l == null || l === "") && r.push(`Missing required key "${n}"`);
    }
  if (Array.isArray(o.requiredArrays))
    for (const n of o.requiredArrays) {
      const l = b({ dataAsJson: a, path: n });
      Array.isArray(l) || r.push(`Field "${n}" must be an array`);
    }
  if (r.length > 0)
    throw new Error(`Chapter 2 (Gatekeeper) Blocked: ${r.join("; ")}.`);
  return !0;
}, x = ["input", "img", "br", "hr", "meta", "link", "source"], c = ({ node: s, path: e = "root" }) => {
  const t = s, a = e, r = [];
  if (!t || typeof t != "object")
    return r.push(`[${a}] Node must be a non-null object.`), r;
  if (t.jsonToSpec)
    if (typeof t.jsonToSpec != "object" || Array.isArray(t.jsonToSpec))
      r.push(`[${a}] jsonToSpec directive must be an object.`);
    else {
      const { operation: o, source: n, template: l } = t.jsonToSpec;
      if ((!o || typeof o != "string") && r.push(`[${a}.jsonToSpec] Operation must be a non-empty string.`), o === "iterate")
        if ((!n || typeof n != "string") && r.push(`[${a}.jsonToSpec] "iterate" operation requires a "source" string.`), !l || typeof l != "object")
          r.push(`[${a}.jsonToSpec] "iterate" operation requires a "template" object.`);
        else {
          const i = c({
            node: l,
            path: `${a}.jsonToSpec.template`
          });
          r.push(...i);
        }
    }
  if (t.tagName && typeof t.tagName == "string") {
    const o = t.tagName.toLowerCase();
    x.includes(o) && t.children && t.children.length > 0 && r.push(`[${a}] Void tag <${t.tagName}> cannot have children.`);
  }
  return Array.isArray(t.children) && t.children.forEach((o, n) => {
    const l = c({
      node: o,
      path: `${a}.children[${n}]`
    });
    r.push(...l);
  }), r;
}, w = ({ structure: s } = {}) => {
  const e = s;
  if (!e)
    throw new Error("Chapter 2 (Gatekeeper) Error: Structure blueprint is missing or null.");
  const t = [];
  if (Array.isArray(e))
    e.forEach((a, r) => {
      t.push(...c({ node: a, path: `root[${r}]` }));
    });
  else if (typeof e == "object")
    t.push(...c({ node: e, path: "root" }));
  else
    throw new Error("Chapter 2 (Gatekeeper) Error: Structure blueprint must be an object or array.");
  if (t.length > 0)
    throw new Error(`Chapter 2 (Gatekeeper) Blueprint Rejected: ${t.join("; ")}.`);
  return !0;
}, g = ({ structure: s, dataAsJson: e = {} } = {}) => y({
  inStructure: s,
  inData: e
}), v = ({ spec: s } = {}) => {
  const e = s;
  return typeof document > "u" ? {
    spec: e,
    element: null,
    warning: "buildDom requires a browser DOM environment (window.document)."
  } : N({ inSpec: e });
}, C = ({ element: s, targetHtmlId: e } = {}) => {
  const t = s, a = e;
  if (!a || typeof document > "u") return;
  const r = document.getElementById(a);
  r && (r.innerHTML = "", Array.isArray(t) ? t.forEach((o) => {
    o instanceof Node && r.appendChild(o);
  }) : t instanceof Node && r.appendChild(t));
}, A = ({ templateKey: s, inKey: e, dataAsJson: t, inData: a, targetHtmlId: r, inTargetContainerId: o } = {}) => {
  const n = s || e, l = t !== void 0 ? t : a !== void 0 ? a : {}, i = r || o, m = d({ templateKey: n });
  h({ template: m, dataAsJson: l });
  const f = g({ structure: m.structure, dataAsJson: l }), p = v({ spec: f });
  return i && C({ element: p, targetHtmlId: i }), p;
}, j = ({ templateKey: s, inKey: e, dataAsJson: t, inData: a } = {}) => {
  const r = s || e, o = t !== void 0 ? t : a !== void 0 ? a : {}, n = d({ templateKey: r });
  return h({ template: n, dataAsJson: o }), g({ structure: n.structure, dataAsJson: o });
}, S = ({ templateKey: s, inKey: e } = {}) => {
  const a = d({ templateKey: s || e });
  return w({ structure: a.structure }), a.structure;
}, E = () => Object.entries(u).map(([s, e]) => ({
  key: s,
  title: e.title,
  description: e.description,
  guard: e.guard
}));
export {
  j as compileTemplate,
  A as default,
  S as getStructure,
  E as listTemplates,
  A as renderTemplate
};
