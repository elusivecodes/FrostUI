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

        if (dom.hasClass(this._node, 'modal-left')) {
            this._direction = 'left';
        } else if (dom.hasClass(this._node, 'modal-right')) {
            this._direction = 'right';
        } else {
            this._direction = 'top';
        }

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

        Promise.all([
            dom.fadeOut(this._dialog, {
                duration: this._settings.duration
            }),
            dom.dropOut(this._dialog, {
                duration: this._settings.duration,
                direction: this._direction
            }),
            dom.fadeOut(this._backdrop, {
                duration: this._settings.duration
            })
        ]).then(_ => {
            dom.removeAttribute(this._node, 'aria-modal');
            dom.setAttribute(this._node, 'aria-hidden', true);

            dom.removeClass(this._node, 'show');
            dom.removeClass(document.body, 'modal-open');

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

        dom.addClass(this._node, 'show');
        dom.addClass(document.body, 'modal-open');

        if (this._settings.backdrop) {
            this._backdrop = dom.create('div', {
                class: 'modal-backdrop'
            });
            dom.append(document.body, this._backdrop);
        }

        Promise.all([
            dom.fadeIn(this._dialog, {
                duration: this._settings.duration
            }),
            dom.dropIn(this._dialog, {
                duration: this._settings.duration,
                direction: this._direction
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
