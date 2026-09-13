/**
 * Chapter 4: The Realization
 * Mounts a single DOM node or an array of DOM nodes into a target HTML ID.
 * 
 * @param {Object} options
 * @param {Node|Array<Node>} options.element - DOM node or array of nodes
 * @param {string} options.targetHtmlId - ID attribute of target container element
 */
export const mountDom = ({ element, targetHtmlId } = {}) => {
    const localElement = element;
    const localTargetHtmlId = targetHtmlId;

    if (!localTargetHtmlId || typeof document === "undefined") return;

    const container = document.getElementById(localTargetHtmlId);
    if (!container) return;

    container.innerHTML = "";
    if (Array.isArray(localElement)) {
        localElement.forEach(node => {
            if (node instanceof Node) {
                container.appendChild(node);
            }
        });
    } else if (localElement instanceof Node) {
        container.appendChild(localElement);
    }
};

export default mountDom;
