/**
 * Resolves a dot-delimited path on an object (e.g. "header.title").
 */
const getPathValue = ({ dataAsJson, path }) => {
    const localDataAsJson = dataAsJson;
    const localPath = path;

    if (!localDataAsJson || !localPath) return undefined;
    const parts = localPath.split(".");
    let current = localDataAsJson;

    for (const part of parts) {
        if (current === null || current === undefined || typeof current !== "object") {
            return undefined;
        }
        current = current[part];
    }
    return current;
};

/**
 * Chapter 2: The Gatekeeper (Data Contract Guard)
 * Validates incoming dataAsJson against required contract keys and arrays before compilation.
 * 
 * @param {Object} options
 * @param {Object} options.template - The resolved template blueprint
 * @param {Object} options.dataAsJson - The incoming data payload
 * @throws {Error} If required keys or array contracts are violated
 * @returns {boolean} True if validation passes
 */
export const guardContract = ({ template, dataAsJson = {} } = {}) => {
    const localTemplate = template;
    const localDataAsJson = dataAsJson;
    const errors = [];

    if (!localTemplate || typeof localTemplate !== "object") {
        throw new Error("Chapter 2 (Gatekeeper) Error: Template blueprint is required for contract validation.");
    }

    const guard = localTemplate.guard || localTemplate.contract;
    if (!guard) {
        return true;
    }

    // Check required key paths
    if (Array.isArray(guard.requiredKeys)) {
        for (const keyPath of guard.requiredKeys) {
            const val = getPathValue({ dataAsJson: localDataAsJson, path: keyPath });
            if (val === undefined || val === null || val === "") {
                errors.push(`Missing required key "${keyPath}"`);
            }
        }
    }

    // Check required arrays/collections
    if (Array.isArray(guard.requiredArrays)) {
        for (const arrPath of guard.requiredArrays) {
            const val = getPathValue({ dataAsJson: localDataAsJson, path: arrPath });
            if (!Array.isArray(val)) {
                errors.push(`Field "${arrPath}" must be an array`);
            }
        }
    }

    if (errors.length > 0) {
        throw new Error(`Chapter 2 (Gatekeeper) Blocked: ${errors.join("; ")}.`);
    }

    return true;
};

export default guardContract;
