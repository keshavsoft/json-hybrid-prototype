import { compile } from "https://keshavsoft.github.io/json-to-spec/dist/v3/min.js";

/**
 * Chapter 3: The Transformation
 * Compiles the guarded structure blueprint and dataAsJson into pure Spec JSON.
 * 
 * @param {Object} options
 * @param {Object|Array} options.structure - Guarded structure blueprint
 * @param {Object} options.dataAsJson - Contract-verified data payload
 * @returns {Object|Array} Pure Spec JSON ready for DOM materialization
 */
export const compileSpec = ({ structure, dataAsJson = {} } = {}) => {
    const localStructure = structure;
    const localDataAsJson = dataAsJson;

    return compile({
        inStructure: localStructure,
        inData: localDataAsJson
    });
};

export default compileSpec;
