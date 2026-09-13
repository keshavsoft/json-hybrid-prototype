import { renderTemplate } from "../../../hybrid-runtime.js";

const data = {
  header: { title: "Customer Directory" },
  customers: [
    { name: "Asha Sharma", role: "Principal Architect" },
    { name: "Karthik Verma", role: "Frontend Lead" },
    { name: "Sneha Reddy", role: "Systems Engineer" }
  ]
};

renderTemplate({
  templateKey: "customerForm",
  dataAsJson: data,
  targetHtmlId: "app"
});

