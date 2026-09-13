import assert from "node:assert/strict";
import { compile } from "../../json-to-spec/src/index.js";
import {
  compileTemplate,
  getStructure,
  getTemplate,
  registerTemplate,
  listTemplates,
  validateKey,
  validateStructure,
  validateDataContract
} from "../src/v1/index.js";

// Provide compiler to global context for Node execution
globalThis.ks = { "json-to-spec": { compile } };

console.log("Running Hybrid Repository Tests...");

// 1. Test listTemplates
const templates = listTemplates();
assert.ok(Array.isArray(templates), "listTemplates should return an array");
assert.ok(templates.length >= 3, "Should have at least 3 templates registered");
const keys = templates.map(t => t.key);
assert.ok(keys.includes("customerForm"));
assert.ok(keys.includes("salesTable"));
assert.ok(keys.includes("voucherDirectory"));
console.log("✓ listTemplates verified");

// 2. Test getStructure supplies pure structure.json
const customerStructure = getStructure({ inKey: "customerForm" });
assert.ok(customerStructure, "customerStructure must be defined");
assert.equal(customerStructure.tagName, "div", "customerForm root must be div");
assert.ok(Array.isArray(customerStructure.children), "customerForm children must be an array");

const salesStructure = getStructure({ inKey: "salesTable" });
assert.equal(salesStructure.tagName, "table", "salesTable root must be table");

const voucherStructure = getStructure({ inKey: "voucherDirectory" });
assert.ok(Array.isArray(voucherStructure), "voucherDirectory must be an array of cards");
assert.equal(voucherStructure.length, 3, "voucherDirectory should have 3 section cards");
console.log("✓ getStructure verified for all registered blueprints");

// 3. Test Key Guard
assert.throws(() => {
  getStructure({ inKey: "unknownKey" });
}, /Template "unknownKey" not found in registry/, "Should throw for unknown key");

assert.throws(() => {
  getStructure({ inKey: "" });
}, /Template key must be a non-empty string/, "Should throw for empty key");
console.log("✓ Key Guard verified");

// 4. Test Structure Guard
const validCheck = validateStructure({ inStructure: customerStructure });
assert.equal(validCheck.isValid, true, "customerForm structure should be valid");

const invalidVoidTag = {
  tagName: "input",
  children: [{ tagName: "span" }]
};
const voidCheck = validateStructure({ inStructure: invalidVoidTag });
assert.equal(voidCheck.isValid, false, "Void tag with children should be invalid");
assert.ok(voidCheck.errors.some(e => e.includes("Void tag <input> cannot have children")));

const invalidDirective = {
  tagName: "div",
  jsonToSpec: { operation: "iterate" } // missing source and template
};
const directiveCheck = validateStructure({ inStructure: invalidDirective });
assert.equal(directiveCheck.isValid, false, "Directive missing source and template should be invalid");
console.log("✓ Structure Guard verified");

// 5. Test Data Contract Guard
const customerTemplate = getTemplate({ inKey: "customerForm" });
const missingDataCheck = validateDataContract({
  inTemplate: customerTemplate,
  inData: {}
});
assert.equal(missingDataCheck.isValid, false, "Missing header.title and customers should fail contract");

const invalidTypeCheck = validateDataContract({
  inTemplate: customerTemplate,
  inData: {
    header: { title: "Test" },
    customers: "not-an-array"
  }
});
assert.equal(invalidTypeCheck.isValid, false, "customers as string should fail array check");
assert.ok(invalidTypeCheck.errors.some(e => e.includes("Data path \"customers\" must be an array")));
console.log("✓ Data Contract Guard verified");

// 6. Test compileTemplate with valid data
const customerSpec = compileTemplate({
  inKey: "customerForm",
  inData: {
    header: { title: "Engineering Leads" },
    customers: [
      { name: "John Doe", role: "Principal" },
      { name: "Jane Smith", role: "Staff" }
    ]
  }
});
assert.equal(customerSpec.tagName, "div");
assert.equal(customerSpec.children[0].textContent, "Engineering Leads");
assert.equal(customerSpec.children.length, 3); // 1 header + 2 customer items

const salesSpec = compileTemplate({
  inKey: "salesTable",
  inData: {
    rows: [
      { name: "Widget A", amount: 42 },
      { name: "Widget B", amount: 84 }
    ]
  }
});
assert.equal(salesSpec.tagName, "table");
const tbody = salesSpec.children.find(c => c.tagName === "tbody");
assert.equal(tbody.children.length, 2);
assert.equal(tbody.children[0].children[0].textContent, "Widget A");
assert.equal(tbody.children[0].children[1].textContent, "42");
console.log("✓ compileTemplate verified for customerForm and salesTable");

// 7. Test voucherDirectory compilation
const voucherData = {
  toolbar: {
    title: "Quarterly Vouchers",
    statusOptions: [{ text: "All Statuses", value: "" }]
  },
  summary: { totalCount: 2, totalAmount: 1500 },
  tableColumns: [
    { title: "Voucher #", field: "voucherNo", isVisible: true, value: "VCH-001" },
    { title: "Party", field: "partyName", isVisible: true, value: "Acme Corp" }
  ],
  tableRows: [
    { voucherNo: "VCH-001", partyName: "Acme Corp", amount: 1000, status: "Approved" },
    { voucherNo: "VCH-002", partyName: "Beta LLC", amount: 500, status: "Pending" }
  ],
  formColumns: [
    { title: "Party Name", field: "partyName", inputType: "text", isVisible: true },
    { title: "Voucher Amount", field: "amount", inputType: "number", isVisible: true }
  ]
};

const voucherSpec = compileTemplate({
  inKey: "voucherDirectory",
  inData: voucherData
});
assert.ok(Array.isArray(voucherSpec));
assert.equal(voucherSpec.length, 3);
console.log("✓ voucherDirectory compileTemplate verified");

// 8. Test registerTemplate with guard
const customTemplate = {
  title: "Custom Card",
  guard: { requiredKeys: ["cardTitle"] },
  structure: {
    tagName: "div",
    children: [{ tagName: "h4", textContent: "${cardTitle}" }]
  }
};
registerTemplate({ inKey: "customCard", inTemplate: customTemplate });
assert.ok(getStructure({ inKey: "customCard" }));
const compiledCustom = compileTemplate({
  inKey: "customCard",
  inData: { cardTitle: "Guarded Title" }
});
assert.equal(compiledCustom.children[0].textContent, "Guarded Title");
console.log("✓ registerTemplate with guards verified");

console.log("\nAll hybrid repository tests passed successfully! 🎉");
