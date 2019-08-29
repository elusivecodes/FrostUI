/**
 * Popper Class
 * @class
 */
class Popper {

    /**
     * New Popper constructor.
     * @param {HTMLElement} node The input node.
     * @param {HTMLElement} reference The reference node.
     * @param {object} [settings] The options to create the Popper with.
     * @returns {Popper} A new Popper object.
     */
    constructor(node, reference, settings) {
        this._node = node;
        this._referenceNode = reference;

        this._fixed = dom.isFixed(this._referenceNode);

        this._settings = {
            ...Popper.defaults,
            ...dom.getDataset(this._node),
            ...settings
        };

        this._relativeParent = dom.closest(this._node, parent => dom.css(parent, 'position') === 'relative', document.body).shift();
        console.log(this._relativeParent);

        const wrapper = dom.create('div', {
            style: {
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: this._settings.zIndex
            }
        });
        if (this._settings.width && this._settings.width !== 'reference') {
            dom.setStyle(wrapper, 'width', this._settings.width);
        }

        dom.wrap(this._node, wrapper);
        this._wrapper = dom.parent(this._node);

        dom.setData(this._node, 'popper', this);

        this.update();

        if (!this._fixed) {
            Popper._poppers.set(this._node, this);
            Popper.start();
        }
    }

    /**
     * Destroy the Popper.
     */
    destroy() {
        dom.before(this._wrapper, dom.contents(this._wrapper));
        dom.remove(this._wrapper);

        dom.removeData(this._node, 'popper');
        Popper._poppers.delete(this._node);
    }

    /**
     * Update the Popper position.
     */
    update() {
        if (!dom.isConnected(this._node)) {
            return;
        }

        if (!this._settings.width) {
            dom.setStyle(this._node, 'width', '');
            dom.setStyle(this._wrapper, 'width', '100%');
        }

        // calculate boxes
        const nodeBox = dom.rect(this._node, !this._fixed);
        const referenceBox = dom.rect(this._referenceNode, !this._fixed);
        const windowY = this._fixed ? 0 : dom.getScrollY(window);
        const windowX = this._fixed ? 0 : dom.getScrollX(window);
        const docWidth = dom.width(document);
        const docHeight = dom.height(document);

        // check object could be seen
        if (windowY > referenceBox.bottom + nodeBox.height + this._settings.spacing ||
            windowX > referenceBox.right + nodeBox.width + this._settings.spacing ||
            windowY + docHeight < referenceBox.top - nodeBox.height - this._settings.spacing ||
            windowX + docWidth < referenceBox.left - nodeBox.width - this._settings.spacing) {
            return;
        }

        // get optimal placement
        const placement = this._settings.fixed ?
            this._settings.placement :
            Popper.getPopperPlacement(
                nodeBox,
                referenceBox.top - windowY,
                windowX + docWidth - referenceBox.right,
                windowY + docHeight - referenceBox.bottom,
                referenceBox.left - windowX,
                this._settings.placement,
                this._settings.spacing + 2
            );

        dom.setDataset(this._referenceNode, 'placement', placement);
        dom.setDataset(this._node, 'placement', placement);

        // calculate actual offset
        let offsetY = Math.round(referenceBox.y);
        let offsetX = Math.round(referenceBox.x);

        if (this._relativeParent) {
            const relativeParentBox = dom.rect(this._relativeParent, !this._fixed);
            offsetY -= Math.round(relativeParentBox.y);
            offsetX -= Math.round(relativeParentBox.x);
        }

        if (placement === 'top') {
            offsetY -= Math.round(nodeBox.height) + this._settings.spacing;
        } else if (placement === 'bottom') {
            offsetY += Math.round(referenceBox.height) + this._settings.spacing;
        } else if (placement === 'left') {
            offsetX -= Math.round(nodeBox.width) + this._settings.spacing;
        } else if (placement === 'right') {
            offsetX += Math.round(referenceBox.width) + this._settings.spacing;
        }

        // adjust position
        const deltaX = Math.round(nodeBox.width) - Math.round(referenceBox.width);
        const deltaY = Math.round(nodeBox.height) - Math.round(referenceBox.height);

        const position = this._settings.fixed ?
            this._settings.position :
            Popper.getPopperPosition(
                referenceBox,
                deltaX,
                deltaY,
                docWidth,
                docHeight,
                placement,
                this._settings.position
            );

        if (position === 'center') {
            if (placement === 'top' || placement === 'bottom') {
                offsetX -= Math.round(deltaX / 2);
            } else {
                offsetY -= Math.round(deltaY / 2);
            }
        } else if (position === 'end') {
            if (placement === 'top' || placement === 'bottom') {
                offsetX -= deltaX;
            } else {
                offsetY -= deltaY;
            }
        }

        // corrective positioning
        if (!this._settings.fixed) {
            if (placement === 'left' || placement === 'right') {
                if (offsetY + nodeBox.height > windowY + docHeight) {
                    let diff = (offsetY + nodeBox.height) - (windowY + docHeight);
                    offsetY = Math.max(referenceBox.top, offsetY - diff);
                } else if (offsetY < windowY) {
                    let diff = offsetY - windowY;
                    offsetY = Math.min(referenceBox.bottom - nodeBox.height, offsetY - diff);
                }
            } else {
                if (offsetX + nodeBox.width > windowX + docWidth) {
                    let diff = (offsetX + nodeBox.width) - (windowX + docWidth);
                    offsetX = Math.max(referenceBox.left, offsetX - diff);
                } else if (offsetX < windowX) {
                    let diff = offsetX - windowX;
                    offsetX = Math.min(referenceBox.right - nodeBox.width, offsetX - diff);
                }
            }
        }

        // relative position
        dom.setStyle(this._wrapper, 'transform', '');
        const offset = dom.position(this._wrapper, !this._fixed);
        offsetY -= Math.round(offset.y);
        offsetX -= Math.round(offset.x);

        // update position
        if (this._settings.arrow) {
            const arrowBox = dom.rect(this._settings.arrow);
            const arrowStyles = {
                top: '',
                right: '',
                bottom: '',
                left: ''
            };

            if (placement === 'top' || placement === 'bottom') {
                arrowStyles[placement === 'top' ? 'bottom' : 'top'] = -arrowBox.height;
                const diff = (referenceBox.width - nodeBox.width) / 2;
                let offset = (nodeBox.width / 2) - (arrowBox.width / 2);
                if (position === 'start') {
                    offset += diff;
                } else if (position === 'end') {
                    offset -= diff;
                }
                arrowStyles.left = offset;
            } else {
                arrowStyles[placement === 'right' ? 'left' : 'right'] = -arrowBox.width;
                const diff = (referenceBox.height - nodeBox.height) / 2;
                let offset = (nodeBox.height / 2) - arrowBox.height;
                if (position === 'start') {
                    offset += diff;
                } else if (position === 'end') {
                    offset -= diff;
                }
                arrowStyles.top = Core.clamp(offset, 0, nodeBox.height);
            }

            dom.setStyle(this._settings.arrow, arrowStyles);
        }

        const style = {
            transform: 'translate3d(' + offsetX + 'px , ' + offsetY + 'px , 0)'
        };
        if (!this._settings.width) {
            dom.setStyle(this._node, 'width', '100%');
            style.width = Math.ceil(nodeBox.width);
        } else if (this._settings.width === 'reference') {
            style.width = Math.ceil(referenceBox.width);
        }
        dom.setStyle(this._wrapper, style);
    }

}
