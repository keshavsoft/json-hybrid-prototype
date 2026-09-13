import { getTemplate } from "./getTemplate.js";
import { validateStructure } from "../guards/index.js";

/**
 * Supplies the pure structure.json blueprint for a given template key,
 * running both key and structure integrity guards.
 */
export const getStructure = ({ inKey, inRegistry } = {}) => {
    const localKey = inKey;
    const localRegistry = inRegistry;

    const template = getTemplate({
        inKey: localKey,
        inRegistry: localRegistry
    });

    if (!template.structure) {
        throw new Error(`Template "${localKey}" is missing a structure definition.`);
    }

    const structureValidation = validateStructure({
        inStructure: template.structure
    });

    if (!structureValidation.isValid) {
        throw new Error(`Structure validation failed for "${localKey}": ${structureValidation.errors.join("; ")}`);
    }

    return template.structure;
};

export default getStructure;
