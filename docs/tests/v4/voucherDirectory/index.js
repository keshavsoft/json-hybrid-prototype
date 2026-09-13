import { renderTemplate } from "../../../hybrid-runtime.js";

const data = {
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

renderTemplate({
  templateKey: "voucherDirectory",
  dataAsJson: data,
  targetHtmlId: "app"
});

