/**
 * Modal Class
 * @class
 */
class Modal {

    /**
     * New Modal constructor.
     * @param {HTMLElement} node The input node.
     * @param {object} [settings] The options to create the Modal with.
     * @returns {Modal} A new Modal object.
     */
    constructor(node, settings) {
        this._node = node;
        this._settings = {
            ...Modal.defaults,
            ...dom.getDataset(node),
            ...settings
        };

        this._dialog = dom.child(this._node, '.modal-dialog');

        this._visible = dom.isVisible(this._node);

        this._windowKeyDownEvent = e => {
            if (e.key !== 'Escape') {
                return;
            }

            e.preventDefault();

            this.hide();
        };

        if (this._settings.show) {
            this.show();
        }

        dom.setData(this._node, 'modal', this);
    }

    /**
     * Destroy the Modal.
     */
    destroy() {
        dom.stop([this._node, this._dialog, this._backdrop], true);

        if (this._settings.keyboard) {
            dom.removeEvent(window, 'keydown.frost.modal', this._windowKeyDownEvent);
        }

        dom.removeData(this._node, 'modal');
    }

    /**
     * Hide the Modal.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    hide() {
        return new Promise((resolve, reject) => {
            if (!this._visible || this._animating || !DOM._triggerEvent(this._node, 'hide.frost.modal')) {
                return reject();
            }

            this._animating = true;
            dom.removeEvent(this._backdrop, 'click.frost.autocomplete');
            Promise.all([
                dom.fadeOut(this._dialog, {
                    duration: this._settings.duration
                }),
                dom.dropOut(this._dialog, {
                    duration: this._settings.duration
                }),
                dom.fadeOut(this._backdrop, {
                    duration: this._settings.duration
                })
            ]).then(_ => {
                this._visible = false;

                if (this._settings.backdrop) {
                    dom.remove(this._backdrop);
                }

                if (this._settings.keyboard) {
                    dom.removeEvent(window, 'keydown.frost.modal', this._windowKeyDownEvent);
                }

                dom.removeClass(this._node, 'show');
                dom.removeClass(document.body, 'modal-open');
                dom.triggerEvent(this._node, 'hidden.frost.modal');
                resolve();
            }).catch(_ =>
                reject()
            ).finally(_ => {
                this._animating = false;
            });
        });
    }

    /**
     * Show the Modal.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    show() {
        return new Promise((resolve, reject) => {
            if (this._visible || this._animating || !DOM._triggerEvent(this._node, 'show.frost.modal')) {
                return reject();
            }

            if (this._settings.backdrop) {
                this._backdrop = dom.create('div', {
                    class: 'modal-backdrop'
                });
                dom.append(document.body, this._backdrop);
            }

            this._animating = true;
            this._visible = true;
            dom.addClass(this._node, 'show');
            dom.addClass(document.body, 'modal-open');
            Promise.all([
                dom.fadeIn(this._dialog, {
                    duration: this._settings.duration
                }),
                dom.dropIn(this._dialog, {
                    duration: this._settings.duration
                })
                , dom.fadeIn(this._backdrop, {
                    duration: this._settings.duration
                })
            ]).then(_ => {
                this._animating = false;

                if (this._settings.backdrop) {
                    dom.addEventOnce(this._backdrop, 'click.frost.modal', _ => this.hide());
                }

                if (this._settings.keyboard) {
                    dom.addEvent(window, 'keydown.frost.modal', this._windowKeyDownEvent);
                }

                if (this._settings.focus) {
                    dom.focus(this._node);
                }

                dom.triggerEvent(this._node, 'shown.frost.modal');
                resolve();
            }).catch(_ =>
                reject()
            ).finally(_ => {
                this._animating = false;
            });
        });
    }

    /**
     * Toggle the Modal.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    toggle() {
        return this._visible ?
            this.hide() :
            this.show();
    }

}
