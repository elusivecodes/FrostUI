/**
 * Dropdown Class
 * @class
 */
class Dropdown {

    /**
     * New Dropdown constructor.
     * @param {HTMLElement} node The input node.
     * @param {object} [settings] The options to create the Dropdown with.
     * @param {number} [settings.duration=100] The duration of the animation.
     * @param {string} [settings.placement=bottom] The placement of the dropdown relative to the toggle.
     * @param {string} [settings.position=start] The position of the dropdown relative to the toggle.
     * @param {Boolean} [settings.fixed=false] Whether the dropdown position is fixed.
     * @param {number} [settings.spacing=2] The spacing between the dropdown and the toggle.
     * @param {number} [settings.minContact=false] The minimum amount of contact the dropdown must make with the toggle.
     * @returns {Dropdown} A new Dropdown object.
     */
    constructor(node, settings) {
        this._node = node;

        this._settings = Core.extend(
            {},
            Dropdown.defaults,
            dom.getDataset(this._node),
            settings
        );

        this._containerNode = dom.parent(this._node);

        this._menuNode = dom.siblings(this._node)
            .find(child => dom.hasClass(child, 'dropdown-menu'));

        if (this._settings.reference) {
            if (this._settings.reference === 'parent') {
                this._referenceNode = this._containerNode;
            } else {
                this._referenceNode = dom.findOne(this._settings.reference);
            }
        } else {
            this._referenceNode = this._node;
        }

        // Attach popper
        if (!dom.closest(this._node, '.navbar-nav').length) {
            this._popper = new Popper(
                this._menuNode,
                {
                    reference: this._referenceNode,
                    placement: this._settings.placement,
                    position: this._settings.position,
                    fixed: this._settings.fixed,
                    spacing: this._settings.spacing,
                    minContact: this._settings.minContact
                }
            );
        }

        this._events();

        dom.setData(this._node, 'dropdown', this);
    }

    /**
     * Destroy the Dropdown.
     */
    destroy() {
        dom.stop(this._menuNode, true);

        if (this._popper) {
            this._popper.destroy();
        }

        dom.removeClass(this._containerNode, 'open');

        dom.removeEvent(document, 'click.frost.dropdown', this._documentClickEvent);
        dom.removeEvent(this._node, 'click.frost.dropdown', this._clickEvent);
        dom.removeEvent(this._node, 'keyup.frost.dropdown', this._keyUpEvent);
        dom.removeEvent(this._node, 'keydown.frost.dropdown', this._keyDownEvent);
        dom.removeEventDelegate(this._menuNode, 'keydown.frost.dropdown', '.dropdown-item', this._menuKeyDownEvent);

        dom.removeData(this._node, 'dropdown');
    }

    /**
     * Hide the Dropdown.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    hide() {
        return new Promise((resolve, reject) => {
            if (!dom.hasClass(this._containerNode, 'open') || dom.getDataset(this._menuNode, 'animating')) {
                return reject();
            }

            if (!DOM._triggerEvent(this._node, 'hide.frost.dropdown')) {
                return reject();
            }

            dom.setDataset(this._menuNode, 'animating', true);

            dom.removeEvent(document, 'click.frost.dropdown', this._documentClickEvent);

            dom.fadeOut(this._menuNode, {
                duration: this._settings.duration
            }).then(_ => {
                dom.removeClass(this._containerNode, 'open');
                dom.setAttribute(this._node, 'aria-expanded', false);

                dom.triggerEvent(this._node, 'hidden.frost.dropdown');

                resolve();
            }).catch(reject).finally(_ =>
                dom.removeDataset(this._menuNode, 'animating')
            );
        });
    }

    /**
     * Show the Dropdown.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    show() {
        return new Promise((resolve, reject) => {
            if (dom.hasClass(this._containerNode, 'open') || dom.getDataset(this._menuNode, 'animating')) {
                return reject();
            }

            if (!DOM._triggerEvent(this._node, 'show.frost.dropdown')) {
                return reject();
            }

            dom.setDataset(this._menuNode, 'animating', true);

            dom.addClass(this._containerNode, 'open');

            dom.fadeIn(this._menuNode, {
                duration: this._settings.duration
            }).then(_ => {
                dom.setAttribute(this._node, 'aria-expanded', true);

                dom.addEvent(document, 'click.frost.dropdown', this._documentClickEvent);

                dom.triggerEvent(this._node, 'shown.frost.dropdown');

                resolve();
            }).catch(reject).finally(_ =>
                dom.removeDataset(this._menuNode, 'animating')
            );
        });
    }

    /**
     * Toggle the Dropdown.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    toggle() {
        return dom.hasClass(this._containerNode, 'open') ?
            this.hide() :
            this.show();
    }

}
