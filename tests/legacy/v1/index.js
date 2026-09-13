import { compile } from "https://keshavsoft.github.io/json-to-spec/dist/v3/min.js";
import { buildSpecElement } from "https://keshavsoft.github.io/json-to-dom/dist/v27/min.js";
import { renderTemplate } from "../../src/v1/index.js";

// Helper to mount rendered element (single node or array of nodes)
const mount = (containerId, nodeOrArray) => {
  const container = document.getElementById(containerId);
  if (!container) return;
  if (Array.isArray(nodeOrArray)) {
    nodeOrArray.forEach(n => container.appendChild(n));
  } else if (nodeOrArray) {
    container.appendChild(nodeOrArray);
  }
};

// ==========================================
// 1. Render Customer Form
// ==========================================
const customerData = {
  header: { title: "Customer Directory" },
  customers: [
    { name: "Asha Sharma", role: "Principal Architect" },
    { name: "Karthik Verma", role: "Frontend Lead" },
    { name: "Sneha Reddy", role: "Systems Engineer" }
  ]
};

const customerElement = renderTemplate({
  inKey: "customerForm",
  inData: customerData,
  inCompile: compile,
  inBuildSpecElement: buildSpecElement
});

mount("customerForm-container", customerElement);

// ==========================================
// 2. Render Sales Table
// ==========================================
const salesData = {
  rows: [
    { name: "ThinkPad X1 Carbon", amount: "1,450" },
    { name: "Dell UltraSharp 32\"", amount: "820" },
    { name: "Logitech MX Master 3S", amount: "99" }
  ]
};

const salesElement = renderTemplate({
  inKey: "salesTable",
  inData: salesData,
  inCompile: compile,
  inBuildSpecElement: buildSpecElement
});

mount("salesTable-container", salesElement);

// ==========================================
// 3. Render Voucher Directory (Multi-card)
// ==========================================
const voucherData = {
  toolbar: {
    title: "September Vouchers",
    statusOptions: [
      { text: "All Statuses", value: "" },
      { text: "Approved", value: "Approved" },
      { text: "Pending", value: "Pending" }
    ]
  },
  summary: { totalCount: 3, totalAmount: "14,500" },
  tableColumns: [
    { title: "Voucher #", field: "voucherNo", isVisible: true, value: "VCH-2026-001" },
    { title: "Date", field: "voucherDate", isVisible: true, value: "2026-09-13" },
    { title: "Party Name", field: "partyName", isVisible: true, value: "Nexus Tech" },
    { title: "Amount (₹)", field: "amount", isVisible: true, value: "6,200" },
    { title: "Status", field: "status", isVisible: true, value: "Approved" }
  ],
  tableRows: [
    { voucherNo: "VCH-2026-001", voucherDate: "2026-09-13", partyName: "Nexus Tech", amount: "6,200", status: "Approved" },
    { voucherNo: "VCH-2026-002", voucherDate: "2026-09-12", partyName: "Apex Logistics", amount: "4,800", status: "Pending" },
    { voucherNo: "VCH-2026-003", voucherDate: "2026-09-11", partyName: "Zeta Systems", amount: "3,500", status: "Approved" }
  ],
  formColumns: [
    { title: "Voucher #", field: "voucherNo", inputType: "text", isVisible: true },
    { title: "Voucher Date", field: "voucherDate", inputType: "date", isVisible: true },
    { title: "Party Name", field: "partyName", inputType: "text", isVisible: true },
    { title: "Amount", field: "amount", inputType: "number", isVisible: true }
  ]
};

const voucherElements = renderTemplate({
  inKey: "voucherDirectory",
  inData: voucherData,
  inCompile: compile,
  inBuildSpecElement: buildSpecElement
});

mount("voucherDirectory-container", voucherElements);
