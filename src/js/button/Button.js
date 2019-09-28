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

        this._input = dom.findOne('input[type="checkbox"], input[type="radio"]', this._node);
        this._isRadio = this._input && dom.is(this._input, '[type="radio"]');

        if (this._isRadio) {
            this._siblings = dom.siblings(this._node);
        }

        this._events();

        dom.setData(this._node, 'button', this);
    }

    /**
     * Destroy the Button.
     */
    destroy() {
        dom.removeEvent(this._node, 'frost.click.button', this._clickEvent);

        dom.removeData(this._node, 'button');
    }

    /**
     * Toggle the Button.
     */
    toggle() {
        this._isRadio ?
            this._toggleRadio() :
            this._toggleCheckbox();

    }

}
