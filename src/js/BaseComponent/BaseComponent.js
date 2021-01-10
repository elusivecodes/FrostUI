/**
 * BaseComponent Class
 * @class
 */
class BaseComponent {

    /**
     * New BaseComponent constructor.
     * @param {HTMLElement} node The input node.
     * @param {object} [settings] The options to create the BaseComponent with.
     * @returns {BaseComponent} A new BaseComponent object.
     */
    constructor(node, settings) {
        this._node = node;

        this._settings = Core.extend(
            {},
            this.constructor.defaults,
            UI.getDataset(this._node),
            settings
        );

        dom.addEvent(this._node, this.constructor.REMOVE_EVENT, _ => {
            this.dispose();
        });

        dom.setData(this._node, this.constructor.DATA_KEY, this);
    }

    /**
     * Dispose the BaseComponent.
     */
    dispose() {
        dom.removeEvent(this._node, this.constructor.REMOVE_EVENT);
        dom.removeData(this._node, this.constructor.DATA_KEY);
        this._node = null;
        this._settings = null;
    }

    /**
     * Initialize a BaseComponent.
     * @param {HTMLElement} node The input node.
     * @returns {BaseComponent} A new BaseComponent object.
     */
    static init(node, ...args) {
        return dom.hasData(node, this.DATA_KEY) ?
            dom.getData(node, this.DATA_KEY) :
            new this(node, ...args);
    }

}

UI.BaseComponent = BaseComponent;
