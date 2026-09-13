/**
 * json-hybrid-prototype v4 — The Story of a Data-Driven UI
 * 
 * Chapter 1: Identity       — Resolve blueprint by templateKey & verify existence
 * Chapter 2: The Gatekeeper — Validate incoming dataAsJson against blueprint contract
 * Chapter 3: Transformation — Compile guarded structure + dataAsJson into pure Spec JSON
 * Chapter 4: Realization    — Materialize Spec into living DOM elements & mount to targetHtmlId
 */

import { resolveTemplate, catalog } from "./chapters/chapter1_identity/index.js";
import { guardContract, guardStructure } from "./chapters/chapter2_gatekeeper/index.js";
import { compileSpec } from "./chapters/chapter3_transformation/index.js";
import { buildDom, mountDom } from "./chapters/chapter4_realization/index.js";

/**
 * Executes the complete 4-Chapter story from Data to DOM.
 * 
 * @param {Object} options
 * @param {string} options.templateKey - Template key name
 * @param {Object} [options.dataAsJson={}] - Contract-verified data payload
 * @param {string} [options.targetHtmlId] - Target HTML element ID to mount into
 * @returns {HTMLElement|Array<HTMLElement>|Object} Materialized DOM element(s)
 */
export const renderTemplate = ({ templateKey, inKey, dataAsJson, inData, targetHtmlId, inTargetContainerId } = {}) => {
    const localTemplateKey = templateKey || inKey;
    const localDataAsJson = dataAsJson !== undefined ? dataAsJson : (inData !== undefined ? inData : {});
    const localTargetHtmlId = targetHtmlId || inTargetContainerId;

    // Chapter 1: Identity
    const template = resolveTemplate({ templateKey: localTemplateKey });

    // Chapter 2: The Gatekeeper
    guardContract({ template, dataAsJson: localDataAsJson });

    // Chapter 3: The Transformation
    const spec = compileSpec({ structure: template.structure, dataAsJson: localDataAsJson });

    // Chapter 4: The Realization
    const element = buildDom({ spec });
    if (localTargetHtmlId) {
        mountDom({ element, targetHtmlId: localTargetHtmlId });
    }

    return element;
};

/**
 * Compiles a template and data into pure Spec JSON (Chapters 1 to 3).
 * 
 * @param {Object} options
 * @param {string} [options.templateKey] - Template key name
 * @param {string} [options.inKey] - Legacy alias for template key name
 * @param {Object} [options.dataAsJson={}] - Contract-verified data payload
 * @param {Object} [options.inData] - Legacy alias for data payload
 * @returns {Object|Array} Pure Spec JSON
 */
export const compileTemplate = ({ templateKey, inKey, dataAsJson, inData } = {}) => {
    const localTemplateKey = templateKey || inKey;
    const localDataAsJson = dataAsJson !== undefined ? dataAsJson : (inData !== undefined ? inData : {});

    // Chapter 1: Identity
    const template = resolveTemplate({ templateKey: localTemplateKey });

    // Chapter 2: The Gatekeeper
    guardContract({ template, dataAsJson: localDataAsJson });

    // Chapter 3: The Transformation
    return compileSpec({ structure: template.structure, dataAsJson: localDataAsJson });
};

/**
 * Supplies the pure guarded structure.json blueprint (Chapters 1 & 2).
 * 
 * @param {Object} options
 * @param {string} [options.templateKey] - Template key name
 * @param {string} [options.inKey] - Legacy alias for template key name
 * @returns {Object|Array} Guarded structure blueprint
 */
export const getStructure = ({ templateKey, inKey } = {}) => {
    const localTemplateKey = templateKey || inKey;

    // Chapter 1: Identity
    const template = resolveTemplate({ templateKey: localTemplateKey });

    // Chapter 2: The Gatekeeper
    guardStructure({ structure: template.structure });

    return template.structure;
};

/**
 * Discovers available templates in the catalog with metadata.
 * 
 * @returns {Array<{ key: string, title: string, description: string, guard: Object }>}
 */
export const listTemplates = () => {
    return Object.entries(catalog).map(([key, item]) => ({
        key,
        title: item.title,
        description: item.description,
        guard: item.guard
    }));
};

export default renderTemplate;
