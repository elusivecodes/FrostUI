/**
 * Dropdown Class
 * @class
 */
class Dropdown extends BaseComponent {

    /**
     * New Dropdown constructor.
     * @param {HTMLElement} node The input node.
     * @param {object} [settings] The options to create the Dropdown with.
     * @returns {Dropdown} A new Dropdown object.
     */
    constructor(node, settings) {
        super(node, settings);

        this._menuNode = dom.next(this._node, '.dropdown-menu').shift();

        if (this._settings.reference) {
            if (this._settings.reference === 'parent') {
                this._referenceNode = dom.parent(this._node).shift();
            } else {
                this._referenceNode = dom.findOne(this._settings.reference);
            }
        } else {
            this._referenceNode = this._node;
        }

        // Attach popper
        if (this._settings.display !== 'static' && dom.closest(this._node, '.navbar-nav').length) {
            this._settings.display = 'static';
        }

        if (this._settings.display === 'dynamic') {
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
    }

    /**
     * Destroy the Dropdown.
     */
    destroy() {
        if (this._popper) {
            this._popper.destroy();
        }

        dom.removeEvent(this._node, 'keyup.ui.dropdown');

        super.destroy();
    }

    /**
     * Hide the Dropdown.
     */
    hide() {
        if (
            this._animating ||
            !dom.hasClass(this._menuNode, 'show') ||
            !dom.triggerOne(this._node, 'hide.ui.dropdown')
        ) {
            return;
        }

        this._animating = true;

        dom.fadeOut(this._menuNode, {
            duration: this._settings.duration
        }).then(_ => {
            dom.removeClass(this._menuNode, 'show');
            dom.setAttribute(this._node, 'aria-expanded', false);
            dom.triggerEvent(this._node, 'hidden.ui.dropdown');
        }).catch(_ => { }).finally(_ => {
            this._animating = false;
        });
    }

    /**
     * Show the Dropdown.
     */
    show() {
        if (
            this._animating ||
            dom.hasClass(this._menuNode, 'show') ||
            !dom.triggerOne(this._node, 'show.ui.dropdown')
        ) {
            return;
        }

        this._animating = true;
        dom.addClass(this._menuNode, 'show');

        dom.fadeIn(this._menuNode, {
            duration: this._settings.duration
        }).then(_ => {
            dom.setAttribute(this._node, 'aria-expanded', true);
            dom.triggerEvent(this._node, 'shown.ui.dropdown');
        }).catch(_ => { }).finally(_ => {
            this._animating = false;
        });
    }

    /**
     * Toggle the Dropdown.
     */
    toggle() {
        dom.hasClass(this._menuNode, 'show') ?
            this.hide() :
            this.show();
    }

    /**
     * Update the Dropdown position.
     */
    update() {
        if (this._settings.display === 'dynamic') {
            return;
        }

        this._popper.update();
    }

    /**
     * Auto-hide all visible dropdowns.
     * @param {HTMLElement} [target] The target node.
     * @param {Boolean} [noHideSelf=false] Whether to force prevent hiding self.
     */
    static autoHide(target, noHideSelf = false) {
        if (!noHideSelf) {
            noHideSelf = dom.is(target, 'form');
        }

        const menus = dom.find('.dropdown-menu.show');

        for (const menu of menus) {
            if (
                target &&
                dom.hasDescendent(menu, target) &&
                (
                    noHideSelf ||
                    dom.closest(target, 'form', menu).length
                )
            ) {
                continue;
            }

            const trigger = dom.prev(menu).shift();

            if (trigger === target) {
                continue;
            }

            const dropdown = this.init(trigger);
            dropdown.hide();
        }
    }

}
