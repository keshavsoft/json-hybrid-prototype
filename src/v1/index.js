/**
 * json-hybrid-prototype v1
 * 
 * Supply guarded structure.json templates and blueprints.
 * 
 * Zero external imports: This repo manages and exposes templates, structures,
 * and validation guards. Compilers (json-to-spec) and renderers (json-to-dom)
 * can be passed in or resolved from global/CDN.
 * 
 * Parameter convention:
 * All functions accept a single object with 'in'-prefixed properties,
 * assigned to 'local'-prefixed variables immediately at the function start.
 */

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
 * Uses inCompile if provided, or falls back to globalThis.ks["json-to-spec"].compile.
 */
export const compileTemplate = ({
    inKey,
    inData,
    inCompile,
    inRegistry,
    // Shorthand aliases
    key,
    data,
    compile: compileFn,
    registry
} = {}) => {
    const localKey = inKey || key;
    const localData = inData || data || {};
    const localRegistry = inRegistry || registry || templateRegistry;
    const localCompile = inCompile || compileFn || globalThis?.ks?.["json-to-spec"]?.compile;

    if (typeof localCompile !== "function") {
        throw new Error(
            `compileTemplate requires a compile function. Pass { inCompile: compile } or load json-to-spec from CDN.`
        );
    }

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

    // 4. Compile via provided/CDN compiler (structure + data -> spec)
    return localCompile({
        inStructure: structure,
        inData: localData
    });
};

/**
 * Compiles a template and renders it as a DOM element.
 * Uses inBuildSpecElement if provided, or falls back to globalThis.buildSpecElement.
 */
export const renderTemplate = ({
    inKey,
    inData,
    inCompile,
    inBuildSpecElement,
    inTargetContainerId,
    inRegistry,
    // Shorthand aliases
    key,
    data,
    compile: compileFn,
    buildSpecElement: buildFn,
    targetContainerId,
    registry
} = {}) => {
    const localKey = inKey || key;
    const localData = inData || data || {};
    const localTargetContainerId = inTargetContainerId || targetContainerId;
    const localRegistry = inRegistry || registry || templateRegistry;
    const localBuildSpecElement = inBuildSpecElement || buildFn || globalThis?.buildSpecElement;

    const spec = compileTemplate({
        inKey: localKey,
        inData: localData,
        inCompile,
        inRegistry: localRegistry
    });

    if (typeof document === "undefined") {
        return {
            spec,
            element: null,
            warning: "renderTemplate requires a DOM environment (window.document). Spec compiled successfully."
        };
    }

    if (typeof localBuildSpecElement !== "function") {
        throw new Error(
            `renderTemplate requires buildSpecElement function. Pass { inBuildSpecElement } or load json-to-dom from CDN.`
        );
    }

    const element = localBuildSpecElement({ inSpec: spec });

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
