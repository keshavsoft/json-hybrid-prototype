import { catalog } from "./catalog.js";

/**
 * Chapter 1: Identity
 * Resolves the template blueprint from the catalog by templateKey.
 * 
 * @param {Object} options
 * @param {string} options.templateKey - Template key name
 * @returns {Object} The resolved template blueprint
 */
export const resolveTemplate = ({ templateKey } = {}) => {
    const localTemplateKey = templateKey;

    if (!localTemplateKey || typeof localTemplateKey !== "string") {
        throw new Error("Chapter 1 (Identity) Error: templateKey must be a non-empty string.");
    }

    const template = catalog[localTemplateKey];
    if (!template) {
        const availableKeys = Object.keys(catalog).join(", ");
        throw new Error(`Chapter 1 (Identity) Error: Template "${localTemplateKey}" not found. Available keys: [${availableKeys}].`);
    }

    return template;
};

export default resolveTemplate;
