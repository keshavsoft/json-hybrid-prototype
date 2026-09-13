import { buildSpecElement } from "https://keshavsoft.github.io/json-to-dom/dist/v27/min.js";
import { compileTemplate } from "../compiler/index.js";
import { mountElement } from "./mountElement.js";

/**
 * Compiles a registered template with data and renders it directly into a DOM container.
 * 
 * @param {Object} options
 * @param {string} options.inKey - Registered template key
 * @param {Object} [options.inData] - Data payload matching template contract
 * @param {string} [options.inTargetContainerId] - Optional DOM container ID to mount into
 * @param {Object} [options.inRegistry] - Optional custom registry
 * @returns {HTMLElement|Array<HTMLElement>|Object} Rendered DOM node(s)
 */
export const renderTemplate = ({ inKey, inData = {}, inTargetContainerId, inRegistry } = {}) => {
    const localKey = inKey;
    const localData = inData;
    const localTargetContainerId = inTargetContainerId;
    const localRegistry = inRegistry;

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
        mountElement({
            inElement: element,
            inTargetContainerId: localTargetContainerId
        });
    }

    return element;
};

export default renderTemplate;
