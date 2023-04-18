import BaseComponent from './../base-component.js';
import { $, window } from './../globals.js';
import Popper from './../popper/popper.js';

/**
 * Dropdown Class
 * @class
 */
export default class Dropdown extends BaseComponent {
    /**
     * New Dropdown constructor.
     * @param {HTMLElement} node The input node.
     * @param {object} [options] The options to create the Dropdown with.
     */
    constructor(node, options) {
        super(node, options);

        this._menuNode = $.next(this._node, '.dropdown-menu').shift();

        if (this._options.reference) {
            if (this._options.reference === 'parent') {
                this._referenceNode = $.parent(this._node).shift();
            } else {
                this._referenceNode = $.findOne(this._options.reference);
            }
        } else {
            this._referenceNode = this._node;
        }

        // Attach popper
        if (this._options.display !== 'static' && $.closest(this._node, '.navbar-nav').length) {
            this._options.display = 'static';
        }
    }

    /**
     * Dispose the Dropdown.
     */
    dispose() {
        if (this._popper) {
            this._popper.dispose();
            this._popper = null;
        }

        this._menuNode = null;
        this._referenceNode = null;

        super.dispose();
    }

    /**
     * Hide the Dropdown.
     */
    hide() {
        if (
            $.getDataset(this._menuNode, 'ui-animating') ||
            !$.hasClass(this._menuNode, 'show') ||
            !$.triggerOne(this._node, 'hide.ui.dropdown')
        ) {
            return;
        }

        $.setDataset(this._menuNode, 'ui-animating', true);

        $.fadeOut(this._menuNode, {
            duration: this._options.duration,
        }).then((_) => {
            if (this._popper) {
                this._popper.dispose();
                this._popper = null;
            }

            $.removeClass(this._menuNode, 'show');
            $.setAttribute(this._node, 'aria-expanded', false);
            $.removeDataset(this._menuNode, 'ui-animating');
            $.triggerEvent(this._node, 'hidden.ui.dropdown');
        }).catch((_) => {
            $.removeDataset(this._menuNode, 'ui-animating');
        });
    }

    /**
     * Show the Dropdown.
     */
    show() {
        if (
            $.getDataset(this._menuNode, 'ui-animating') ||
            $.hasClass(this._menuNode, 'show') ||
            !$.triggerOne(this._node, 'show.ui.dropdown')
        ) {
            return;
        }

        $.setDataset(this._menuNode, 'ui-animating', true);
        $.addClass(this._menuNode, 'show');

        if (this._options.display === 'dynamic') {
            this._popper = new Popper(this._menuNode, {
                reference: this._referenceNode,
                placement: this._options.placement,
                position: this._options.position,
                fixed: this._options.fixed,
                spacing: this._options.spacing,
                minContact: this._options.minContact,
            });
        }

        window.requestAnimationFrame((_) => {
            this.update();
        });

        $.fadeIn(this._menuNode, {
            duration: this._options.duration,
        }).then((_) => {
            $.setAttribute(this._node, 'aria-expanded', true);
            $.removeDataset(this._menuNode, 'ui-animating');
            $.triggerEvent(this._node, 'shown.ui.dropdown');
        }).catch((_) => {
            $.removeDataset(this._menuNode, 'ui-animating');
        });
    }

    /**
     * Toggle the Dropdown.
     */
    toggle() {
        if ($.hasClass(this._menuNode, 'show')) {
            this.hide();
        } else {
            this.show();
        }
    }

    /**
     * Update the Dropdown position.
     */
    update() {
        if (this._popper) {
            this._popper.update();
        }
    }
}
