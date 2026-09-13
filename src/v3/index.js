/**
 * json-hybrid-prototype v3
 * 
 * Clean, lean entry point exporting only callable functions:
 * - renderTemplate  : Compiles and mounts template directly to DOM
 * - compileTemplate : Compiles structure blueprint + data into Spec JSON
 * - getStructure    : Supplies guarded structure.json blueprint
 * - listTemplates   : Discovers available template keys and metadata
 */

export { renderTemplate } from "./render/index.js";
export { compileTemplate } from "./compiler/index.js";
export { getStructure, listTemplates } from "./registry/index.js";

export { renderTemplate as default } from "./render/index.js";
