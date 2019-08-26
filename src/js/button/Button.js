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
        this._settings = {
            ...Button.defaults,
            ...dom.getDataset(this._node),
            ...settings
        };

        const group = dom.closest(this._node, '[data-toggle="buttons"]');
        this._siblings = dom.find('.btn', group).filter(node => !dom.isSame(node, this._node));
        this._input = dom.findOne('input[type="checkbox"], input[type="radio"]', this._node);

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
        if (!this._siblings.length) {
            if (this._input) {
                dom.setProperty(this._input, 'checked', !dom.getProperty(this._input, 'checked'));
            }
            dom.toggleClass(this._node, 'active');
            return;
        }

        if (dom.hasClass(this._node, 'active')) {
            return;
        }
        dom.removeClass(this._siblings, 'active');
        dom.addClass(this._node, 'active');
        if (this._input) {
            dom.setProperty(this._input, 'checked', true);
        }
    }

}
