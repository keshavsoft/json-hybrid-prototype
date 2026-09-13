const VOID_TAGS = ["input", "img", "br", "hr", "meta", "link", "source"];

/**
 * Validates a single structure node recursively.
 */
const validateNode = ({ node, path = "root" }) => {
    const localNode = node;
    const localPath = path;
    const errors = [];

    if (!localNode || typeof localNode !== "object") {
        errors.push(`[${localPath}] Node must be a non-null object.`);
        return errors;
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
                    const templateErrors = validateNode({
                        node: template,
                        path: `${localPath}.jsonToSpec.template`
                    });
                    errors.push(...templateErrors);
                }
            }
        }
    }

    // Void tag restrictions
    if (localNode.tagName && typeof localNode.tagName === "string") {
        const lowerTag = localNode.tagName.toLowerCase();
        if (VOID_TAGS.includes(lowerTag) && localNode.children && localNode.children.length > 0) {
            errors.push(`[${localPath}] Void tag <${localNode.tagName}> cannot have children.`);
        }
    }

    // Recursive check on children
    if (Array.isArray(localNode.children)) {
        localNode.children.forEach((child, index) => {
            const childErrors = validateNode({
                node: child,
                path: `${localPath}.children[${index}]`
            });
            errors.push(...childErrors);
        });
    }

    return errors;
};

/**
 * Chapter 2: The Gatekeeper (Structure Integrity Guard)
 * Validates structure blueprint syntax before compilation.
 * 
 * @param {Object} options
 * @param {Object|Array} options.structure - The blueprint structure
 * @throws {Error} If blueprint structure is invalid
 * @returns {boolean} True if validation passes
 */
export const guardStructure = ({ structure } = {}) => {
    const localStructure = structure;

    if (!localStructure) {
        throw new Error("Chapter 2 (Gatekeeper) Error: Structure blueprint is missing or null.");
    }

    const errors = [];
    if (Array.isArray(localStructure)) {
        localStructure.forEach((item, index) => {
            errors.push(...validateNode({ node: item, path: `root[${index}]` }));
        });
    } else if (typeof localStructure === "object") {
        errors.push(...validateNode({ node: localStructure, path: "root" }));
    } else {
        throw new Error("Chapter 2 (Gatekeeper) Error: Structure blueprint must be an object or array.");
    }

    if (errors.length > 0) {
        throw new Error(`Chapter 2 (Gatekeeper) Blueprint Rejected: ${errors.join("; ")}.`);
    }

    return true;
};

export default guardStructure;
