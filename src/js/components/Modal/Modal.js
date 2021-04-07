/**
 * Modal Class
 * @class
 */
class Modal extends BaseComponent {

    /**
     * New Modal constructor.
     * @param {HTMLElement} node The input node.
     * @param {object} [settings] The options to create the Modal with.
     * @returns {Modal} A new Modal object.
     */
    constructor(node, settings) {
        super(node, settings);

        this._dialog = dom.child(this._node, '.modal-dialog').shift();

        if (this._settings.show) {
            this.show();
        }
    }

    /**
     * Dispose the Modal.
     */
    dispose() {
        this._dialog = null;
        this._activeTarget = null;
        this._backdrop = null;

        this.constructor._stack.delete(this);

        super.dispose();
    }

    /**
     * Hide the Modal.
     * @returns {Modal} The Modal.
     */
    hide() {
        if (
            this._animating ||
            !dom.hasClass(this._node, 'show') ||
            !dom.triggerOne(this._node, 'hide.ui.modal')
        ) {
            return this;
        }

        this._animating = true;

        this.constructor._stack.delete(this);

        const stackSize = this.constructor._stack.size;
        const offcanvas = Offcanvas._current;

        Promise.all([
            dom.fadeOut(this._dialog, {
                duration: this._settings.duration
            }),
            dom.dropOut(this._dialog, {
                duration: this._settings.duration,
                direction: 'top'
            }),
            dom.fadeOut(this._backdrop, {
                duration: this._settings.duration
            })
        ]).then(_ => {
            dom.removeAttribute(this._node, 'aria-modal');
            dom.setAttribute(this._node, 'aria-hidden', true);

            if (stackSize) {
                dom.setStyle(this._node, 'zIndex', '');
            } else {
                if (!offcanvas) {
                    UI.resetScrollPadding();
                }

                dom.removeClass(document.body, 'modal-open');
            }

            dom.removeClass(this._node, 'show');

            if (this._settings.backdrop) {
                dom.remove(this._backdrop);
                this._backdrop = null;
            }

            if (this._activeTarget) {
                dom.focus(this._activeTarget);
            }

            dom.triggerEvent(this._node, 'hidden.ui.modal');
        }).catch(_ => { }).finally(_ => {
            this._animating = false;
        });

        return this;
    }

    /**
     * Show the Modal.
     * @param {HTMLElement} [activeTarget] The active target.
     * @returns {Modal} The Modal.
     */
    show(activeTarget) {
        if (
            this._animating ||
            dom.hasClass(this._node, 'show') ||
            !dom.triggerOne(this._node, 'show.ui.modal')
        ) {
            return this;
        }

        this._activeTarget = activeTarget;
        this._animating = true;

        const stackSize = this.constructor._stack.size;

        if (stackSize) {
            let zIndex = dom.css(this._node, 'zIndex');
            zIndex = parseInt(zIndex);
            zIndex += stackSize * 20;

            dom.setStyle(this._node, 'zIndex', zIndex);
        } else {
            if (!Offcanvas._current) {
                UI.addScrollPadding();
            }

            dom.addClass(document.body, 'modal-open');
        }

        dom.addClass(this._node, 'show');

        this.constructor._stack.add(this);

        if (this._settings.backdrop) {
            this._backdrop = dom.create('div', {
                class: 'modal-backdrop'
            });

            dom.append(document.body, this._backdrop);

            if (stackSize) {
                let zIndex = dom.css(this._backdrop, 'zIndex');
                zIndex = parseInt(zIndex);
                zIndex += stackSize * 20;

                dom.setStyle(this._backdrop, 'zIndex', zIndex);
            }
        }

        Promise.all([
            dom.fadeIn(this._dialog, {
                duration: this._settings.duration
            }),
            dom.dropIn(this._dialog, {
                duration: this._settings.duration,
                direction: 'top'
            }),
            dom.fadeIn(this._backdrop, {
                duration: this._settings.duration
            })
        ]).then(_ => {
            dom.removeAttribute(this._node, 'aria-hidden');
            dom.setAttribute(this._node, 'aria-modal', true);

            if (this._settings.focus) {
                dom.focus(this._node);
            }

            dom.triggerEvent(this._node, 'shown.ui.modal');
        }).catch(_ => { }).finally(_ => {
            this._animating = false;
        });

        return this;
    }

    /**
     * Toggle the Modal.
     * @returns {Modal} The Modal.
     */
    toggle() {
        return dom.hasClass(this._node, 'show') ?
            this.hide() :
            this.show();
    }

}
