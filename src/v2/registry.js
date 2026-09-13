import registryData from "./registryData.js";
import { validateKey, validateStructure } from "./guards.js";

export const templateRegistry = { ...registryData };

/**
 * Retrieves a registered template definition by key, running key validation guards.
 */
export const getTemplate = ({ inKey, inRegistry = templateRegistry } = {}) => {
    const localKey = inKey;
    const localRegistry = inRegistry;

    const keyValidation = validateKey({
        inKey: localKey,
        inRegistry: localRegistry
    });

    if (!keyValidation.isValid) {
        throw new Error(keyValidation.error);
    }

    return keyValidation.template;
};

/**
 * Supplies the pure structure.json blueprint for a given template key,
 * running both key and structure integrity guards.
 */
export const getStructure = ({ inKey, inRegistry = templateRegistry } = {}) => {
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

/**
 * Registers a new template into the registry after validating its structure.
 */
export const registerTemplate = ({ inKey, inTemplate, inRegistry = templateRegistry } = {}) => {
    const localKey = inKey;
    const localTemplate = inTemplate;
    const localRegistry = inRegistry;

    if (!localKey || typeof localKey !== "string") {
        throw new Error("registerTemplate requires a valid string key.");
    }

    if (!localTemplate || typeof localTemplate !== "object" || !localTemplate.structure) {
        throw new Error(`registerTemplate requires a template object with a "structure" property.`);
    }

    const structureValidation = validateStructure({
        inStructure: localTemplate.structure
    });

    if (!structureValidation.isValid) {
        throw new Error(`Cannot register template "${localKey}": ${structureValidation.errors.join("; ")}`);
    }

    localRegistry[localKey] = localTemplate;
    return localRegistry;
};

/**
 * Returns a list of all registered template keys and their descriptions.
 */
export const listTemplates = ({ inRegistry = templateRegistry } = {}) => {
    const localRegistry = inRegistry;
    return Object.entries(localRegistry).map(([key, template]) => ({
        key,
        title: template.title || key,
        description: template.description || "",
        guard: template.guard || null
    }));
};

export default {
    templateRegistry,
    getTemplate,
    getStructure,
    registerTemplate,
    listTemplates
};
