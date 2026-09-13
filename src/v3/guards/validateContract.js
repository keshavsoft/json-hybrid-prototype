/**
 * Resolves a dot-delimited path on an object (e.g. "header.title").
 */
const getPathValue = ({ inData, inPath }) => {
    const localData = inData;
    const localPath = inPath;

    if (!localData || !localPath) return undefined;
    const parts = localPath.split(".");
    let current = localData;

    for (const part of parts) {
        if (current === null || current === undefined || typeof current !== "object") {
            return undefined;
        }
        current = current[part];
    }
    return current;
};

/**
 * Data contract guard.
 * Validates incoming data payload against template required keys and collection types.
 */
export const validateContract = ({ inTemplate, inData }) => {
    const localTemplate = inTemplate;
    const localData = inData || {};
    const errors = [];

    if (!localTemplate || typeof localTemplate !== "object") {
        return {
            isValid: false,
            errors: ["Template definition is required to validate data contract."]
        };
    }

    const guard = localTemplate.guard || localTemplate.contract;
    if (!guard) {
        return {
            isValid: true,
            errors: []
        };
    }

    // Check required key paths
    if (Array.isArray(guard.requiredKeys)) {
        for (const keyPath of guard.requiredKeys) {
            const val = getPathValue({ inData: localData, inPath: keyPath });
            if (val === undefined || val === null || val === "") {
                errors.push(`Required data key "${keyPath}" is missing in data payload.`);
            }
        }
    }

    // Check required arrays/collections
    if (Array.isArray(guard.requiredArrays)) {
        for (const arrPath of guard.requiredArrays) {
            const val = getPathValue({ inData: localData, inPath: arrPath });
            if (!Array.isArray(val)) {
                errors.push(`Data path "${arrPath}" must be an array.`);
            }
        }
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

export default validateContract;
