/**
 * json-hybrid-prototype v2
 * 
 * Encapsulated Option 1 Architecture:
 * - Direct CDN imports for json-to-spec and json-to-dom inside src/v2.
 * - Callers/consumers do NOT need to know about or import compile or buildSpecElement!
 * - Clean outside API: renderTemplate({ inKey, inData, inTargetContainerId })
 * 
 * Parameter convention:
 * All functions accept a single object with 'in'-prefixed properties,
 * assigned to 'local'-prefixed variables immediately at the function start.
 */

import { compile } from "https://keshavsoft.github.io/json-to-spec/dist/v3/min.js";
import { buildSpecElement } from "https://keshavsoft.github.io/json-to-dom/dist/v27/min.js";

import {
    templateRegistry,
    getTemplate,
    getStructure,
    registerTemplate,
    listTemplates
} from "./registry.js";
import {
    validateKey,
    validateStructure,
    validateDataContract
} from "./guards.js";

/**
 * Compiles a registered template with data, enforcing key, contract, and structure guards.
 * Uses internal CDN-imported compile function directly.
 * 
 * @param {Object} options - Options object
 * @param {string} options.inKey - Template key name (e.g. "customerForm")
 * @param {Object} [options.inData] - Data payload matching template contract
 * @param {Object} [options.inRegistry] - Optional custom registry
 * @returns {Object|Array} Compiled pure Spec JSON ready for json-to-dom
 */
export const compileTemplate = ({
    inKey,
    inData,
    inRegistry,
    // Shorthand aliases
    key,
    data,
    registry
} = {}) => {
    const localKey = inKey || key;
    const localData = inData || data || {};
    const localRegistry = inRegistry || registry || templateRegistry;

    // 1. Guard Key & Retrieve Template
    const template = getTemplate({
        inKey: localKey,
        inRegistry: localRegistry
    });

    // 2. Guard Data Contract
    const contractValidation = validateDataContract({
        inTemplate: template,
        inData: localData
    });

    if (!contractValidation.isValid) {
        throw new Error(`Data contract validation failed for "${localKey}": ${contractValidation.errors.join("; ")}`);
    }

    // 3. Guard & Supply Structure JSON
    const structure = getStructure({
        inKey: localKey,
        inRegistry: localRegistry
    });

    // 4. Compile via internally imported CDN compiler (structure + data -> spec)
    return compile({
        inStructure: structure,
        inData: localData
    });
};

/**
 * Compiles a template and renders it as a DOM element directly into inTargetContainerId.
 * Uses internal CDN-imported buildSpecElement function directly.
 * 
 * @param {Object} options - Options object
 * @param {string} options.inKey - Template key (e.g. "customerForm")
 * @param {Object} [options.inData] - Data payload
 * @param {string} [options.inTargetContainerId] - DOM container ID to append rendered element to
 * @param {Object} [options.inRegistry] - Optional custom registry
 * @returns {HTMLElement|Array<HTMLElement>|Object} Rendered DOM node(s)
 */
export const renderTemplate = ({
    inKey,
    inData,
    inTargetContainerId,
    inRegistry,
    // Shorthand aliases
    key,
    data,
    targetContainerId,
    registry
} = {}) => {
    const localKey = inKey || key;
    const localData = inData || data || {};
    const localTargetContainerId = inTargetContainerId || targetContainerId;
    const localRegistry = inRegistry || registry || templateRegistry;

    const spec = compileTemplate({
        inKey: localKey,
        inData: localData,
        inRegistry: localRegistry
    });

    if (typeof document === "undefined") {
        return {
            spec,
            element: null,
            warning: "renderTemplate requires a DOM environment (window.document). Spec compiled successfully."
        };
    }

    const element = buildSpecElement({ inSpec: spec });

    if (localTargetContainerId) {
        const container = document.getElementById(localTargetContainerId);
        if (container) {
            container.innerHTML = "";
            if (Array.isArray(element)) {
                element.forEach(node => {
                    if (node && typeof node === "object" && "nodeType" in node) {
                        container.appendChild(node);
                    }
                });
            } else if (element && typeof element === "object" && "nodeType" in element) {
                container.appendChild(element);
            }
        }
    }

    return element;
};

export {
    templateRegistry,
    getTemplate,
    getStructure,
    registerTemplate,
    listTemplates,
    validateKey,
    validateStructure,
    validateDataContract
};

export default {
    compileTemplate,
    renderTemplate,
    getTemplate,
    getStructure,
    registerTemplate,
    listTemplates,
    templateRegistry,
    guards: {
        validateKey,
        validateStructure,
        validateDataContract
    }
};
