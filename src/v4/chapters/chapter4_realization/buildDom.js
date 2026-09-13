import { buildSpecElement } from "https://keshavsoft.github.io/json-to-dom/dist/v27/min.js";

/**
 * Chapter 4: The Realization
 * Materializes pure Spec JSON into living DOM element(s).
 * 
 * @param {Object} options
 * @param {Object|Array} options.spec - Pure Spec JSON from Chapter 3
 * @returns {HTMLElement|Array<HTMLElement>} Constructed DOM element(s)
 */
export const buildDom = ({ spec } = {}) => {
    const localSpec = spec;

    if (typeof document === "undefined") {
        return {
            spec: localSpec,
            element: null,
            warning: "buildDom requires a browser DOM environment (window.document)."
        };
    }

    return buildSpecElement({ inSpec: localSpec });
};

export default buildDom;
