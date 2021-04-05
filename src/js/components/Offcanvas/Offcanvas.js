/**
 * Offcanvas Class
 * @class
 */
class Offcanvas extends BaseComponent {

    /**
     * Dispose the Offcanvas.
     */
    dispose() {
        this._activeTarget = null;

        if (this._settings.backdrop) {
            dom.removeClass(document.body, 'offcanvas-backdrop');
        }

        if (!this._settings.scroll) {
            dom.setStyle(document.body, 'overflow', '');
        }

        this.constructor.current = null;

        super.dispose();
    }

    /**
     * Hide the Offcanvas.
     * @returns {Offcanvas} The Offcanvas.
     */
    hide() {
        if (
            this._animating ||
            !dom.hasClass(this._node, 'show') ||
            !dom.triggerOne(this._node, 'hide.ui.offcanvas')
        ) {
            return this;
        }

        this._animating = true;

        this.constructor.current = null;

        Promise.all([
            dom.fadeOut(this._node, {
                duration: this._settings.duration
            }),
            dom.dropOut(this._node, {
                duration: this._settings.duration,
                direction: this._getDirection()
            }),
            dom.fadeOut(this._backdrop, {
                duration: this._settings.duration
            })
        ]).then(_ => {
            dom.removeAttribute(this._node, 'aria-modal');
            dom.setAttribute(this._node, 'aria-hidden', true);

            dom.removeClass(this._node, 'show');

            if (this._settings.backdrop) {
                dom.removeClass(document.body, 'offcanvas-backdrop');
            }

            if (!this._settings.scroll) {
                dom.setStyle(document.body, 'overflow', '');
            }

            if (this._activeTarget) {
                dom.focus(this._activeTarget);
            }

            dom.triggerEvent(this._node, 'hidden.ui.offcanvas');
        }).catch(_ => { }).finally(_ => {
            this._animating = false;
        });

        return this;
    }

    /**
     * Show the Offcanvas.
     * @param {HTMLElement} [activeTarget] The active target.
     * @returns {Offcanvas} The Offcanvas.
     */
    show(activeTarget) {
        if (
            this._animating ||
            dom.hasClass(this._node, 'show') ||
            !dom.triggerOne(this._node, 'show.ui.offcanvas')
        ) {
            return this;
        }

        this._activeTarget = activeTarget;
        this._animating = true;

        dom.addClass(this._node, 'show');

        this.constructor.current = this;

        if (this._settings.backdrop) {
            dom.addClass(document.body, 'offcanvas-backdrop');
        }

        if (!this._settings.scroll) {
            dom.setStyle(document.body, 'overflow', 'hidden');
        }

        Promise.all([
            dom.fadeIn(this._node, {
                duration: this._settings.duration
            }),
            dom.dropIn(this._node, {
                duration: this._settings.duration,
                direction: this._getDirection()
            }),
            dom.fadeIn(this._backdrop, {
                duration: this._settings.duration
            })
        ]).then(_ => {
            dom.removeAttribute(this._node, 'aria-hidden');
            dom.setAttribute(this._node, 'aria-modal', true);

            dom.triggerEvent(this._node, 'shown.ui.offcanvas');
        }).catch(_ => { }).finally(_ => {
            this._animating = false;
        });

        return this;
    }

    /**
     * Toggle the Offcanvas.
     * @returns {Offcanvas} The Offcanvas.
     */
    toggle() {
        return dom.hasClass(this._node, 'show') ?
            this.hide() :
            this.show();
    }

}
