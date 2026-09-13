import { renderTemplate } from "../../../src/v4/index.js";

const data = {
  rows: [
    { name: "ThinkPad X1 Carbon", amount: "1,450" },
    { name: "Dell UltraSharp 32\"", amount: "820" },
    { name: "Logitech MX Master 3S", amount: "99" }
  ]
};

renderTemplate({
  templateKey: "salesTable",
  dataAsJson: data,
  targetHtmlId: "app"
});
