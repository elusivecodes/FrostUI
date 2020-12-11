/**
 * Collapse Class
 * @class
 */
class Collapse extends BaseComponent {

    /**
     * New Collapse constructor.
     * @param {HTMLElement} node The input node.
     * @param {object} [settings] The options to create the Collapse with.
     * @returns {Collapse} A new Collapse object.
     */
    constructor(node, settings) {
        super(node, settings);

        const id = this._node.getAttribute('id');
        this._triggers = dom.find(
            `[data-ui-toggle="collapse"][data-ui-target="#${id}"]`
        );

        if (this._settings.parent) {
            this._parent = dom.findOne(this._settings.parent);
        }
    }

    /**
     * Hide the element.
     */
    hide() {
        if (
            this._animating ||
            !dom.hasClass(this._node, 'show') ||
            !dom.triggerOne(this._node, 'hide.ui.collapse')
        ) {
            return;
        }

        this._animating = true;
        dom.addClass(this._triggers, 'collapsed');

        dom.squeezeOut(this._node, {
            direction: this._settings.direction,
            duration: this._settings.duration
        }).then(_ => {
            dom.removeClass(this._node, 'show');
            dom.setAttribute(this._triggers, 'aria-expanded', false);
            dom.triggerEvent(this._node, 'hidden.ui.collapse');
        }).catch(_ => { }).finally(_ => {
            this._animating = false;
        });
    }

    /**
     * Show the element.
     */
    show() {
        if (
            this._animating ||
            dom.hasClass(this._node, 'show')
        ) {
            return;
        }

        const collapses = [];
        if (this._parent) {
            const siblings = dom.find('.collapse.show', this._parent);
            for (const sibling of siblings) {
                const collapse = this.constructor.init(sibling);

                if (this._parent !== collapse._parent) {
                    continue;
                }

                if (collapse._animating) {
                    return;
                }

                collapses.push(collapse);
            }
        }

        if (!dom.triggerOne(this._node, 'show.ui.collapse')) {
            return;
        }

        for (const collapse of collapses) {
            collapse.hide();
        }

        this._animating = true;
        dom.addClass(this._node, 'show');
        dom.removeClass(this._triggers, 'collapsed');

        dom.squeezeIn(this._node, {
            direction: this._settings.direction,
            duration: this._settings.duration
        }).then(_ => {
            dom.setAttribute(this._triggers, 'aria-expanded', true);
            dom.triggerEvent(this._node, 'shown.ui.collapse');
        }).catch(_ => { }).finally(_ => {
            this._animating = false;
        });
    }

    /**
     * Toggle the element.
     */
    toggle() {
        dom.hasClass(this._node, 'show') ?
            this.hide() :
            this.show();
    }

}
