import { compile } from "../json-to-spec/src/index.js";
import {
  compileTemplate,
  getStructure,
  listTemplates
} from "./src/index.js";

// Provide compiler to global context for Node execution
globalThis.ks = { "json-to-spec": { compile } };

console.log("=== Registered Templates in Hybrid Repository ===");
console.log(listTemplates());

console.log("\n=== 1. Supplying structure.json (HOW Blueprint with Guards) ===");
const customerStructure = getStructure({ inKey: "customerForm" });
console.log(`Supplied "customerForm" root tagName: <${customerStructure.tagName}>, children: ${customerStructure.children.length}`);

console.log("\n=== 2. Compiling customerForm with Data (WHAT) ===");
const sampleData = {
  header: { title: "Customer Directory" },
  customers: [
    { name: "Asha", role: "Architect" },
    { name: "Karthik", role: "Engineer" }
  ]
};

const customerSpec = compileTemplate({ inKey: "customerForm", inData: sampleData });
console.log(JSON.stringify(customerSpec, null, 2));

console.log("\n=== 3. Compiling salesTable with Data ===");
const tableData = {
  rows: [
    { name: "Laptop", amount: 1200 },
    { name: "Mouse", amount: 90 }
  ]
};

const salesSpec = compileTemplate({ inKey: "salesTable", inData: tableData });
console.log(JSON.stringify(salesSpec, null, 2));
