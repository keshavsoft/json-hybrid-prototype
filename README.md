# json-hybrid-prototype

Guarded template registry and end-to-end UI compiler. Supplying declarative `structure.json` blueprints with pre-compilation guards, compiling via `json-to-spec`, and materializing into living DOM via `json-to-dom`.

---

## 📖 The 4-Chapter Story Architecture (`v4`)

Starting in **`v4`**, the library is organized as a narrative journey that tells the complete story of data turning into interactive DOM:

```
src/v4/
├── index.js                    # The Master Storyteller (Orchestrates the 4 chapters)
└── chapters/
    ├── chapter1_identity/      # Chapter 1: Identity — "Who are you?"
    │   ├── catalog.js          # The library of registered blueprints
    │   ├── resolveTemplate.js  # Key resolution & existence verification
    │   └── index.js
    │
    ├── chapter2_gatekeeper/    # Chapter 2: The Gatekeeper — "Are you worthy to enter?"
    │   ├── guardContract.js    # Data contract check (required keys & array types)
    │   ├── guardStructure.js   # Blueprint schema & void tag validator
    │   └── index.js
    │
    ├── chapter3_transformation/# Chapter 3: Transformation — Structure + Data -> Spec
    │   ├── compileSpec.js      # Compiles structure + dataAsJson via json-to-spec v3
    │   └── index.js
    │
    └── chapter4_realization/   # Chapter 4: Realization — Spec -> Living DOM
        ├── buildDom.js         # Materializes Spec JSON via json-to-dom
        ├── mountDom.js         # Mounts element into targetHtmlId
        └── index.js
```

---

## Clean Caller API (`v4`)

The outside API is strictly focused on **3 self-documenting parameters with zero `in-` prefixes**:

```javascript
import { renderTemplate } from "./src/v4/index.js";

// Sample Data Payload matching the template contract
const data = {
  header: { title: "Customer Directory" },
  customers: [
    { name: "Asha Sharma", role: "Principal Architect" },
    { name: "Karthik Verma", role: "Frontend Lead" },
    { name: "Sneha Reddy", role: "Systems Engineer" }
  ]
};

// 1. Compile & mount directly into <div id="app"></div>
renderTemplate({
  templateKey: "customerForm",
  dataAsJson: data,
  targetHtmlId: "app"
});
```

### Additional Caller Operations:

```javascript
import { compileTemplate, getStructure, listTemplates } from "./src/v4/index.js";

// 2. Compile to pure Spec JSON (Chapters 1 to 3)
const spec = compileTemplate({
  templateKey: "salesTable",
  dataAsJson: { rows: [...] }
});

// 3. Supply the guarded structure.json blueprint (Chapters 1 & 2)
const structure = getStructure({ templateKey: "voucherDirectory" });

// 4. Discover available templates in catalog
const templates = listTemplates();
```

---

## 🏛️ Architectural Evolution

| Version | Architecture | Description |
| :--- | :--- | :--- |
| **`v1`** | **Decoupled Fallback** | Original fail-safe baseline; accepts compiler and renderer dependencies as arguments or globals. |
| **`v2`** | **Encapsulated CDN** | Self-contained module importing `json-to-spec` and `json-to-dom` directly from CDNs. |
| **`v3`** | **Modular Subfolders** | Code shifted into dedicated technical domain folders (`guards/`, `registry/`, `compiler/`, `render/`). |
| **`v4`** | **4-Chapter Story** | **Current recommended**: Story-driven architecture with clean `{ templateKey, dataAsJson, targetHtmlId }` API. |

---

## 🌐 Live GitHub Pages & CDN Documentation

The documentation, interactive explorer, and test suites are published to GitHub Pages and run purely via CDN:

- **Documentation Landing Page (Live)**: [https://keshavsoft.github.io/json-hybrid-prototype/](https://keshavsoft.github.io/json-hybrid-prototype/)
- **Interactive Story Explorer (Live)**: [https://keshavsoft.github.io/json-hybrid-prototype/explorer/](https://keshavsoft.github.io/json-hybrid-prototype/explorer/)
- **Tests Suite (Live CDN)**: [https://keshavsoft.github.io/json-hybrid-prototype/tests/](https://keshavsoft.github.io/json-hybrid-prototype/tests/)
  - Customer Form: [https://keshavsoft.github.io/json-hybrid-prototype/tests/customerForm/](https://keshavsoft.github.io/json-hybrid-prototype/tests/customerForm/)
  - Sales Table: [https://keshavsoft.github.io/json-hybrid-prototype/tests/salesTable/](https://keshavsoft.github.io/json-hybrid-prototype/tests/salesTable/)
  - Voucher Directory: [https://keshavsoft.github.io/json-hybrid-prototype/tests/voucherDirectory/](https://keshavsoft.github.io/json-hybrid-prototype/tests/voucherDirectory/)
- **CDN Runtime**: [https://keshavsoft.github.io/json-hybrid-prototype/hybrid-runtime.js](https://keshavsoft.github.io/json-hybrid-prototype/hybrid-runtime.js)

---

## 🧪 Isolated Test Suites (Local Development)

Run the local development server:

```bash
npx serve
```

Then visit the pages in your browser:

- **Landing Page (Root)**: `http://localhost:3000/`
- **Interactive Explorer (Root)**: `http://localhost:3000/explorer/`
- **Docs Landing Page**: `http://localhost:3000/docs/`
- **Docs Explorer**: `http://localhost:3000/docs/explorer/`
- **Tests Suite**: `http://localhost:3000/tests/`
  - Customer Form: `http://localhost:3000/tests/customerForm/`
  - Sales Table: `http://localhost:3000/tests/salesTable/`
  - Voucher Directory: `http://localhost:3000/tests/voucherDirectory/`
- **Legacy Test Suites (Archive)**: `http://localhost:3000/tests/legacy/`
  - Tests v1: `http://localhost:3000/tests/legacy/v1/`
  - Tests v2: `http://localhost:3000/tests/legacy/v2/`
  - Tests v3: `http://localhost:3000/tests/legacy/v3/`
