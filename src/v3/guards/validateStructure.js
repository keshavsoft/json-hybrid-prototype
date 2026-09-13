const VOID_TAGS = ["input", "img", "br", "hr", "meta", "link", "source"];

/**
 * Validates a single structure node recursively.
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
                errors.push(`[${localPath}.jsonToSpec] Operation must be a non-empty string.`);
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

    // Check void tags cannot have children
    if (localNode.tagName && typeof localNode.tagName === "string") {
        const lowerTag = localNode.tagName.toLowerCase();
        if (VOID_TAGS.includes(lowerTag) && localNode.children && localNode.children.length > 0) {
            errors.push(`[${localPath}] Void tag <${localNode.tagName}> cannot have children.`);
        }
    }

    // Recursively check children
    if (Array.isArray(localNode.children)) {
        localNode.children.forEach((child, index) => {
            const childValidation = validateNode({
                inNode: child,
                inPath: `${localPath}.children[${index}]`
            });
            errors.push(...childValidation.errors);
            warnings.push(...childValidation.warnings);
        });
    }

    return {
        isValid: errors.length === 0,
        errors,
        warnings
    };
};

/**
 * Structure blueprint integrity guard.
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

export default validateStructure;
