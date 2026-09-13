import { catalog } from "./catalog.js";

/**
 * Returns a list of all available templates in the catalog with metadata.
 */
export const listTemplates = ({ inRegistry = catalog } = {}) => {
    const localRegistry = inRegistry;
    return Object.entries(localRegistry).map(([key, template]) => ({
        key,
        title: template.title || key,
        description: template.description || "",
        guard: template.guard || null
    }));
};

export default listTemplates;
