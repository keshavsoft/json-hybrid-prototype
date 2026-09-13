/**
 * Mounts a single DOM node or an array of DOM nodes into a target container ID.
 */
export const mountElement = ({ inElement, inTargetContainerId }) => {
    const localElement = inElement;
    const localTargetContainerId = inTargetContainerId;

    if (!localTargetContainerId || typeof document === "undefined") return;

    const container = document.getElementById(localTargetContainerId);
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

export default mountElement;
