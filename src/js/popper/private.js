/**
 * Popper Private
 */

Object.assign(Popper.prototype, {

    /**
     * Constrain the offset within the containerBox.
     * @param {object} offset The offset object.
     * @param {DOMRect} nodeBox The computed bounding rectangle of the node.
     * @param {DOMRect} referenceBox The computed bounding rectangle of the reference.
     * @param {DOMRect} containerBox The computed bounding rectangle of the container.
     * @param {string} placement The actual placement of the Popper.
     */
    _adjustConstrain(offset, nodeBox, referenceBox, containerBox, placement) {
        if (this._fixed) {
            return;
        }

        if (['left', 'right'].includes(placement)) {
            const offsetY = this._scrollParent || this._relativeParent ?
                offset.y + containerBox.top :
                offset.y;
            if (offsetY + nodeBox.height + this._settings.spacing > containerBox.bottom) {
                // bottom of offset node is below the container
                const diff = offsetY + nodeBox.height - (containerBox.bottom);
                offset.y = Math.max(
                    referenceBox.height >= nodeBox.height ?
                        referenceBox.top :
                        referenceBox.top - (nodeBox.height - referenceBox.height),
                    offset.y - diff
                );
            } else if (offsetY - this._settings.spacing < containerBox.top) {
                // top of offset node is above the container
                const diff = offsetY - containerBox.top;
                offset.y = Math.min(
                    referenceBox.height >= nodeBox.height ?
                        referenceBox.top - (referenceBox.top - nodeBox.top) :
                        referenceBox.top,
                    offset.y - diff
                );
            }
        } else {
            const offsetX = this._scrollParent || this._relativeParent ?
                offset.x + containerBox.left :
                offset.x;
            if (offsetX + nodeBox.width + this._settings.spacing > containerBox.right) {
                // right of offset node is to the right of the container
                const diff = offsetX + nodeBox.width - containerBox.right;
                offset.x = Math.max(
                    referenceBox.width >= nodeBox.width ?
                        referenceBox.left :
                        referenceBox.left - (nodeBox.width - referenceBox.width),
                    offset.x - diff
                );
            } else if (offsetX - this._settings.spacing < containerBox.left) {
                // left of offset node is to the left of the container
                const diff = offsetX - containerBox.left;
                offset.x = Math.min(
                    referenceBox.width >= nodeBox.width ?
                        referenceBox.left - (referenceBox.width - nodeBox.width) :
                        referenceBox.left,
                    offset.x - diff
                );
            }
        }
    },

    /**
     * Adjust the offset for the placement.
     * @param {object} offset The offset object.
     * @param {DOMRect} nodeBox The computed bounding rectangle of the node.
     * @param {DOMRect} referenceBox The computed bounding rectangle of the reference.
     * @param {string} placement The actual placement of the Popper.
     */
    _adjustPlacement(offset, nodeBox, referenceBox, placement) {
        if (placement === 'top') {
            offset.y -= Math.round(nodeBox.height) + this._settings.spacing;
        } else if (placement === 'right') {
            offset.x += Math.round(referenceBox.width) + this._settings.spacing;
        } else if (placement === 'bottom') {
            offset.y += Math.round(referenceBox.height) + this._settings.spacing;
        } else if (placement === 'left') {
            offset.x -= Math.round(nodeBox.width) + this._settings.spacing;
        }
    },

    /**
     * Adjust the offset for the placement.
     * @param {object} offset The offset object.
     * @param {DOMRect} nodeBox The computed bounding rectangle of the node.
     * @param {DOMRect} referenceBox The computed bounding rectangle of the reference.
     * @param {string} placement The actual placement of the Popper.
     * @param {string} position The actual position of the Popper.
     */
    _adjustPosition(offset, nodeBox, referenceBox, placement, position) {
        if (position === 'start') {
            return;
        }

        if (['top', 'bottom'].includes(placement)) {
            const deltaX = Math.round(nodeBox.width) - Math.round(referenceBox.width);

            if (position === 'center') {
                offset.x -= Math.round(deltaX / 2);
            } else if (position === 'end') {
                offset.x -= deltaX;
            }
        } else {
            const deltaY = Math.round(nodeBox.height) - Math.round(referenceBox.height);

            if (position === 'center') {
                offset.y -= Math.round(deltaY / 2);
            } else if (position === 'end') {
                offset.y -= deltaY;
            }
        }
    },

    /**
     * Adjust the offset for a relative positioned parent.
     * @param {object} offset The offset object.
     */
    _adjustRelative(offset) {
        if (!this._relativeParent) {
            return;
        }

        const relativeParentBox = dom.rect(this._relativeParent, !this._fixed);
        offset.x -= Math.round(relativeParentBox.x);
        offset.y -= Math.round(relativeParentBox.y);
    },

    /**
     * Attach events for the Popper.
     */
    _events() {
        this._updateEvent = Core.animation(_ => this.update());

        dom.addEvent(window, 'resize.frost.popper', this._updateEvent);
        dom.addEvent(window, 'scroll.frost.popper', this._updateEvent);
        if (this._scrollParent) {
            dom.addEvent(this._scrollParent, 'scroll.frost.popper', this._updateEvent);
        }
    },

    /**
     * Returns true if the node can not be visible inside the window.
     * @param {object} offset The offset object.
     * @param {DOMRect} nodeBox The computed bounding rectangle of the node.
     * @param {DOMRect} referenceBox The computed bounding rectangle of the reference.
     * @param {object} windowContainer The computed bounding rectangle of the window.
     * @returns {Boolean} TRUE if the node can not be visible inside the window, otherwise FALSE.
     */
    _isNodeHidden(nodeBox, referenceBox, windowContainer) {
        return windowContainer.top > referenceBox.bottom + nodeBox.height + this._settings.spacing ||
            windowContainer.left > referenceBox.right + nodeBox.width + this._settings.spacing ||
            windowContainer.bottom < referenceBox.top - nodeBox.height - this._settings.spacing ||
            windowContainer.right < referenceBox.left - nodeBox.width - this._settings.spacing;
    },

    /**
     * Update the position of the arrow for the actual placement and position.
     * @param {DOMRect} nodeBox The computed bounding rectangle of the node.
     * @param {DOMRect} referenceBox The computed bounding rectangle of the reference.
     * @param {string} placement The actual placement of the Popper.
     * @param {string} position The actual position of the Popper.
     */
    _updateArrow(nodeBox, referenceBox, placement, position) {
        if (!this._settings.arrow) {
            return;
        }

        dom.show(this._settings.arrow);

        const arrowBox = dom.rect(this._settings.arrow, !this._fixed);
        const arrowStyles = {
            top: '',
            right: '',
            bottom: '',
            left: ''
        };

        if (['top', 'bottom'].includes(placement)) {
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
    },

    /**
     * Update the position of the node.
     * @param {object} offset The offset object.
     */
    _updatePosition(offset) {
        const style = {};
        if (this._settings.useGpu) {
            style.transform = 'translate3d(' + offset.x + 'px , ' + offset.y + 'px , 0)'
        } else {
            style.marginLeft = offset.x;
            style.marginTop = offset.y;
        }

        dom.setStyle(this._node, style);
    },

    /**
     * Calculate the computed bounding rectangle of the window.
     * @returns {object} The computed bounding rectangle of the window.
     */
    _windowContainer() {
        const scrollX = this._fixed ?
            0 :
            dom.getScrollX(window);
        const scrollY = this._fixed ?
            0 :
            dom.getScrollY(window);
        const windowWidth = dom.width(document);
        const windowHeight = dom.height(document);

        return {
            x: scrollX,
            y: scrollY,
            w: windowWidth,
            h: windowHeight,
            top: scrollY,
            right: scrollX + windowWidth,
            bottom: scrollY + windowHeight,
            left: scrollX
        };
    }

});
