/**
 * Modal Class
 * @class
 */
class Modal {

    /**
     * New Modal constructor.
     * @param {HTMLElement} node The input node.
     * @param {object} [settings] The options to create the Modal with.
     * @param {number} [settings.duration=250] The duration of the animation.
     * @param {Boolean} [settings.backdrop=true] Whether to display a backdrop for the modal.
     * @param {Boolean} [settings.focus=true] Whether to set focus on the modal when shown.
     * @param {Boolean} [settings.show=true] Whether to show the modal on initialization.
     * @param {Boolean} [settings.keyboard=true] Whether to close the modal when the escape key is pressed.
     * @returns {Modal} A new Modal object.
     */
    constructor(node, settings) {
        this._node = node;

        this._settings = Core.extend(
            {},
            this.constructor.defaults,
            dom.getDataset(node),
            settings
        );

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

        dom.setData(this._node, 'modal', this);
    }

    /**
     * Destroy the Modal.
     */
    destroy() {
        dom.removeData(this._node, 'modal');
    }

    /**
     * Hide the Modal.
     */
    hide() {
        if (
            this._animating ||
            !dom.hasClass(this._node, 'show') ||
            !dom.triggerOne(this._node, 'hide.frost.modal')
        ) {
            return;
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
            if (this._settings.backdrop) {
                dom.remove(this._backdrop);
                this._backdrop = null;
            }

            dom.removeAttribute(this._node, 'aria-modal');
            dom.setAttribute(this._node, 'aria-hidden', true);

            dom.removeClass(this._node, 'show');
            dom.removeClass(document.body, 'modal-open');

            if (this._activeTarget) {
                dom.focus(this._activeTarget);
            }

            dom.triggerEvent(this._node, 'hidden.frost.modal');
        }).catch(_ => { }).finally(_ => {
            this._animating = false;
        });
    }

    /**
     * Show the Modal.
     * @param {HTMLElement} [activeTarget] The active target.
     */
    show(activeTarget) {
        if (
            this._animating ||
            dom.hasClass(this._node, 'show') ||
            !dom.triggerOne(this._node, 'show.frost.modal')
        ) {
            return;
        }

        if (this._settings.backdrop) {
            this._backdrop = dom.create('div', {
                class: 'modal-backdrop'
            });
            dom.append(document.body, this._backdrop);
        }

        this._activeTarget = activeTarget;
        this._animating = true;

        dom.addClass(this._node, 'show');
        dom.addClass(document.body, 'modal-open');

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

            dom.triggerEvent(this._node, 'shown.frost.modal');
        }).catch(_ => { }).finally(_ => {
            this._animating = false;
        });
    }

    /**
     * Toggle the Modal.
     */
    toggle() {
        dom.hasClass(this._node, 'show') ?
            this.hide() :
            this.show();
    }

    /**
     * Initialize a Modal.
     * @param {HTMLElement} node The input node.
     * @param {object} [settings] The options to create the Modal with.
     * @param {number} [settings.duration=250] The duration of the animation.
     * @param {Boolean} [settings.backdrop=true] Whether to display a backdrop for the modal.
     * @param {Boolean} [settings.focus=true] Whether to set focus on the modal when shown.
     * @param {Boolean} [settings.show=true] Whether to show the modal on initialization.
     * @param {Boolean} [settings.keyboard=true] Whether to close the modal when the escape key is pressed.
     * @returns {Modal} A new Modal object.
     */
    static init(node, settings) {
        return dom.hasData(node, 'modal') ?
            dom.getData(node, 'modal') :
            new this(node, settings);
    }

}
