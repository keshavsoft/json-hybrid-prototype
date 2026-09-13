import { compile } from "https://keshavsoft.github.io/json-to-spec/dist/v3/min.js";
import { getTemplate, getStructure } from "../registry/index.js";
import { validateContract } from "../guards/index.js";

/**
 * Compiles a template and data payload into pure Spec JSON.
 * Enforces key validation, data contract, and structure integrity.
 */
export const compileTemplate = ({ inKey, inData = {}, inRegistry } = {}) => {
    const localKey = inKey;
    const localData = inData;
    const localRegistry = inRegistry;

    // 1. Guard Key & Retrieve Template
    const template = getTemplate({
        inKey: localKey,
        inRegistry: localRegistry
    });

    // 2. Guard Data Contract
    const contractValidation = validateContract({
        inTemplate: template,
        inData: localData
    });

    if (!contractValidation.isValid) {
        throw new Error(`Data contract validation failed for "${localKey}": ${contractValidation.errors.join("; ")}`);
    }

    // 3. Guard & Supply Structure Blueprint
    const structure = getStructure({
        inKey: localKey,
        inRegistry: localRegistry
    });

    // 4. Compile via json-to-spec CDN compiler
    return compile({
        inStructure: structure,
        inData: localData
    });
};

export default compileTemplate;
