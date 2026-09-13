import { catalog } from "./catalog.js";
import { validateKey } from "../guards/index.js";

/**
 * Retrieves a registered template definition by key, running key validation guards.
 */
export const getTemplate = ({ inKey, inRegistry = catalog } = {}) => {
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

export default getTemplate;
