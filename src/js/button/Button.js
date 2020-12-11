/**
 * Button Class
 * @class
 */
class Button extends BaseComponent {

    /**
     * Toggle the Button.
     */
    toggle() {
        dom.toggleClass(this._node, 'active');

        const pressed = dom.hasClass(this._node, 'active');
        dom.setAttribute('aria-pressed', pressed);
    }

}
