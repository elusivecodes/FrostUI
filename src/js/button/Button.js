/**
 * Button Class
 * @class
 */
class Button {

    /**
     * New Button constructor.
     * @param {HTMLElement} node The input node.
     * @param {object} [settings] The options to create the Button with.
     * @returns {Button} A new Button object.
     */
    constructor(node, settings) {
        this._node = node;

        this._settings = Core.extend(
            {},
            this.constructor.defaults,
            dom.getDataset(this._node),
            settings
        );

        dom.setData(this._node, 'button', this);
    }

    /**
     * Destroy the Button.
     */
    destroy() {
        dom.removeData(this._node, 'button');
    }

    /**
     * Toggle the Button.
     */
    toggle() {
        dom.toggleClass(this._node, 'active');

        const pressed = dom.hasClass(this._node, 'active');
        dom.setAttribute('aria-pressed', pressed);
    }

    /**
     * Initialize a Button.
     * @param {HTMLElement} node The input node.
     * @param {object} [settings] The options to create the Button with.
     * @returns {Button} A new Button object.
     */
    static init(node, settings) {
        return dom.hasData(node, 'button') ?
            dom.getData(node, 'button') :
            new this(node, settings);
    }

}
