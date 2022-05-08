import type { ElementConfig } from './element-config.type';

export function element(config: ElementConfig): HTMLElement {
    const [tagName, attributes = {}, children] = config;
    const el = document.createElement(tagName);

    Object.keys(attributes).forEach((key) => {
        el.setAttribute(key, attributes[key]);
    });

    if (Array.isArray(children)) {
        children.forEach((child) => {
            el.appendChild(element(child));
        });
    } else if (children !== undefined) {
        el.innerText = children;
    }

    return el;
}
