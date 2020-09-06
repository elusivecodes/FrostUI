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

        this._input = dom.findOne('input', this._node);
        this._isRadio = this._input && dom.is(this._input, '[type="radio"]');

        if (this._isRadio) {
            this._siblings = dom.siblings(this._node);
        }

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
        this._isRadio ?
            this._toggleRadio() :
            this._toggleCheckbox();
    }

    /**
     * Toggle a checkbox-type Button.
     */
    _toggleCheckbox() {
        dom.toggleClass(this._node, 'active');

        if (this._input) {
            const isChecked = dom.getProperty(this._input, 'checked');
            dom.setProperty(this._input, 'checked', !isChecked);
            dom.triggerEvent(this._input, 'change');
        }
    }

    /**
     * Toggle a radio-type Button.
     */
    _toggleRadio() {
        dom.addClass(this._node, 'active');
        dom.removeClass(this._siblings, 'active');
        dom.setProperty(this._input, 'checked', true);
        dom.triggerEvent(this._input, 'change');
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
