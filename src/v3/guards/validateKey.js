/**
 * Key existence guard.
 * Validates that the requested template key exists in the registry.
 */
export const validateKey = ({ inKey, inRegistry }) => {
    const localKey = inKey;
    const localRegistry = inRegistry;

    if (!localKey || typeof localKey !== "string") {
        return {
            isValid: false,
            error: "Template key must be a non-empty string."
        };
    }

    if (!localRegistry || typeof localRegistry !== "object") {
        return {
            isValid: false,
            error: "Registry must be a valid object."
        };
    }

    const template = localRegistry[localKey];
    if (!template) {
        const availableKeys = Object.keys(localRegistry).join(", ");
        return {
            isValid: false,
            error: `Template "${localKey}" not found in registry. Available keys: [${availableKeys}].`
        };
    }

    return {
        isValid: true,
        error: null,
        template
    };
};

export default validateKey;
