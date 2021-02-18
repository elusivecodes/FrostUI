/**
 * Alert Class
 * @class
 */
class Alert extends BaseComponent {

    /**
     * Close the Alert.
     */
    close() {
        if (
            this._animating ||
            !dom.triggerOne(this._node, 'close.ui.alert')
        ) {
            return;
        }

        this._animating = true;

        dom.fadeOut(this._node, {
            duration: this._settings.duration
        }).then(_ => {
            dom.detach(this._node);
            dom.triggerEvent(this._node, 'closed.ui.alert');
            dom.remove(this._node);
        }).catch(_ => { }).finally(_ => {
            this._animating = false;
        });
    }

}
