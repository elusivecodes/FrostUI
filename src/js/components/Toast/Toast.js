/**
 * Toast Class
 * @class
 */
class Toast extends BaseComponent {

    /**
     * Hide the Toast.
     * @returns {Toast} The Toast.
     */
    hide() {
        if (
            this._animating ||
            !dom.isVisible(this._node) ||
            !dom.triggerOne(this._node, 'hide.ui.toast')
        ) {
            return this;
        }

        this._animating = true;

        dom.fadeOut(this._node, {
            duration: this._settings.duration
        }).then(_ => {
            dom.setStyle(this._node, 'display', 'none', true);
            dom.removeClass(this._node, 'show');
            dom.triggerEvent(this._node, 'hidden.ui.toast');
        }).catch(_ => { }).finally(_ => {
            this._animating = false;
        });

        return this;
    }

    /**
     * Show the Toast.
     */
    show() {
        if (
            this._animating ||
            dom.isVisible(this._node) ||
            !dom.triggerOne(this._node, 'show.ui.toast')
        ) {
            return this;
        }

        this._animating = true;
        dom.setStyle(this._node, 'display', '');
        dom.addClass(this._node, 'show');

        dom.fadeIn(this._node, {
            duration: this._settings.duration
        }).then(_ => {
            dom.triggerEvent(this._node, 'shown.ui.toast');

            if (this._settings.autohide) {
                setTimeout(
                    _ => this.hide(),
                    this._settings.delay
                );
            }
        }).catch(_ => { }).finally(_ => {
            this._animating = false;
        });

        return this;
    }

}
