/**
 * Dropdown Class
 * @class
 */
class Dropdown {

    /**
     * New Dropdown constructor.
     * @param {HTMLElement} node The input node.
     * @param {object} [settings] The options to create the Dropdown with.
     * @returns {Dropdown} A new Dropdown object.
     */
    constructor(node, settings) {
        this._node = node;
        this._settings = {
            ...Dropdown.defaults,
            ...dom.getDataset(this._node),
            ...settings
        };

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
        this._popper = new Popper(
            this._menuNode,
            this._referenceNode,
            {
                placement: this._settings.placement,
                position: this._settings.position,
                fixed: this._settings.fixed,
                spacing: this._settings.spacing,
                width: this._settings.width,
                zIndex: this._settings.zIndex
            }
        );

        this._visible = dom.hasClass(this._containerNode, 'open');

        this._getDir = _ => dom.getDataset(this._referenceNode, 'placement');

        this._events();

        dom.setData(this._node, 'dropdown', this);
    }

    /**
     * Destroy the Dropdown.
     */
    destroy() {
        dom.stop(this._menuNode, true);
        this._popper.destroy();
        dom.removeClass(this._containerNode, 'open');
        dom.removeEvent(window, 'click.frost.dropdown', this._windowClickEvent);
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
            if (!this._visible || this._animating || !DOM._triggerEvent(this._node, 'hide.frost.dropdown')) {
                return reject();
            }

            this._animating = true;
            dom.removeEvent(window, 'click.frost.dropdown', this._windowClickEvent);
            Promise.all([
                dom.fadeOut(this._menuNode, {
                    duration: this._settings.duration
                }),
                dom.squeezeOut(this._menuNode, {
                    dir: this._getDir,
                    duration: this._settings.duration
                })
            ]).then(_ => {
                this._visible = false;
                dom.removeClass(this._containerNode, 'open');
                dom.triggerEvent(this._node, 'hidden.frost.dropdown');
                resolve();
            }).catch(_ =>
                reject()
            ).finally(_ => {
                this._animating = false;
            });
        });
    }

    /**
     * Show the Dropdown.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    show() {
        return new Promise((resolve, reject) => {
            if (this._visible || this._animating || !DOM._triggerEvent(this._node, 'show.frost.dropdown')) {
                return reject();
            }

            this._animating = true;
            this._visible = true;
            dom.addClass(this._containerNode, 'open');
            Promise.all([
                dom.fadeIn(this._menuNode, {
                    duration: this._settings.duration
                }),
                dom.squeezeIn(this._menuNode, {
                    dir: this._getDir,
                    duration: this._settings.duration
                })
            ]).then(_ => {
                dom.addEventOnce(window, 'click.frost.dropdown', this._windowClickEvent);
                dom.triggerEvent(this._node, 'shown.frost.dropdown');
                resolve();
            }).catch(_ =>
                reject()
            ).finally(_ => {
                this._animating = false;
            });
        });
    }

    /**
     * Toggle the Dropdown.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    toggle() {
        return this._visible ?
            this.hide() :
            this.show();
    }

}
