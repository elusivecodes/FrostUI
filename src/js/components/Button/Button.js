/**
 * Button Class
 * @class
 */
class Button extends BaseComponent {

    /**
     * Toggle the Button.
     * @returns {Button} The Button.
     */
    toggle() {
        dom.toggleClass(this._node, 'active');

        const pressed = dom.hasClass(this._node, 'active');
        dom.setAttribute(this._node, 'aria-pressed', pressed);

        return this;
    }

}
