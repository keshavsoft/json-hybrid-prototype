/**
 * Validation guards for json-hybrid-prototype.
 * 
 * Strict parameter naming convention:
 * All functions accept a single object with 'in'-prefixed properties,
 * assigned to 'local'-prefixed variables immediately at the function start.
 */

const VOID_TAGS = ["input", "img", "br", "hr", "meta", "link", "source"];

/**
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

/**
 * Validates a single structure node recursively for integrity.
 */
const validateNode = ({ inNode, inPath = "root" }) => {
    const localNode = inNode;
    const localPath = inPath;
    const errors = [];
    const warnings = [];

    if (!localNode || typeof localNode !== "object") {
        errors.push(`[${localPath}] Node must be a non-null object.`);
        return { isValid: false, errors, warnings };
    }

    // Check jsonToSpec compiler directives
    if (localNode.jsonToSpec) {
        if (typeof localNode.jsonToSpec !== "object" || Array.isArray(localNode.jsonToSpec)) {
            errors.push(`[${localPath}] jsonToSpec directive must be an object.`);
        } else {
            const { operation, source, template } = localNode.jsonToSpec;
            if (!operation || typeof operation !== "string") {
                errors.push(`[${localPath}.jsonToSpec] Operation must be a non-empty string (e.g. "iterate").`);
            }
            if (operation === "iterate") {
                if (!source || typeof source !== "string") {
                    errors.push(`[${localPath}.jsonToSpec] "iterate" operation requires a "source" string.`);
                }
                if (!template || typeof template !== "object") {
                    errors.push(`[${localPath}.jsonToSpec] "iterate" operation requires a "template" object.`);
                } else {
                    const templateValidation = validateNode({
                        inNode: template,
                        inPath: `${localPath}.jsonToSpec.template`
                    });
                    errors.push(...templateValidation.errors);
                    warnings.push(...templateValidation.warnings);
                }
            }
        }
    }

    // Check tagName if present
    if (localNode.tagName) {
        if (typeof localNode.tagName !== "string") {
            errors.push(`[${localPath}] tagName must be a string.`);
        } else {
            const lowerTag = localNode.tagName.toLowerCase();
            if (VOID_TAGS.includes(lowerTag) && localNode.children && localNode.children.length > 0) {
                errors.push(`[${localPath}] Void tag <${localNode.tagName}> cannot have children.`);
            }
        }
    }

    // Recursively check children
    if (localNode.children) {
        if (!Array.isArray(localNode.children)) {
            errors.push(`[${localPath}] children must be an array.`);
        } else {
            localNode.children.forEach((child, index) => {
                const childValidation = validateNode({
                    inNode: child,
                    inPath: `${localPath}.children[${index}]`
                });
                errors.push(...childValidation.errors);
                warnings.push(...childValidation.warnings);
            });
        }
    }

    return {
        isValid: errors.length === 0,
        errors,
        warnings
    };
};

/**
 * Validates a structure definition (array or object) before compilation.
 */
export const validateStructure = ({ inStructure }) => {
    const localStructure = inStructure;
    const errors = [];
    const warnings = [];

    if (!localStructure) {
        return {
            isValid: false,
            errors: ["Structure is missing or null."],
            warnings: []
        };
    }

    if (Array.isArray(localStructure)) {
        if (localStructure.length === 0) {
            warnings.push("[root] Structure array is empty.");
        }
        localStructure.forEach((item, index) => {
            const res = validateNode({ inNode: item, inPath: `root[${index}]` });
            errors.push(...res.errors);
            warnings.push(...res.warnings);
        });
    } else if (typeof localStructure === "object") {
        const res = validateNode({ inNode: localStructure, inPath: "root" });
        errors.push(...res.errors);
        warnings.push(...res.warnings);
    } else {
        return {
            isValid: false,
            errors: ["Structure must be an object or array."],
            warnings: []
        };
    }

    return {
        isValid: errors.length === 0,
        errors,
        warnings
    };
};

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
 * Validates an incoming data payload against template contract specifications.
 */
export const validateDataContract = ({ inTemplate, inData }) => {
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

    // Validate required key paths
    if (Array.isArray(guard.requiredKeys)) {
        for (const keyPath of guard.requiredKeys) {
            const val = getPathValue({ inData: localData, inPath: keyPath });
            if (val === undefined || val === null || val === "") {
                errors.push(`Required data key "${keyPath}" is missing in data payload.`);
            }
        }
    }

    // Validate collections (must be arrays if expected)
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

export default {
    validateKey,
    validateStructure,
    validateDataContract
};
