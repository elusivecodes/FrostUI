/**
 * Popper Static
 */

Object.assign(Popper, {

    /**
     * Constrain the offset within the minimumBox.
     * @param {object} offset The offset object.
     * @param {DOMRect} nodeBox The computed bounding rectangle of the node.
     * @param {DOMRect} referenceBox The computed bounding rectangle of the reference.
     * @param {object} minimumBox The computed minimum bounding rectangle of the container.
     * @param {DOMRect} [relativeBox] The computed bounding rectangle of the relative parent.
     * @param {string} placement The actual placement of the Popper.
     * @param {number} [minContact] The minimum amount of contact to make with the reference node.
     */
    _adjustConstrain(offset, nodeBox, referenceBox, minimumBox, relativeBox, placement, minContact) {
        if (['left', 'right'].includes(placement)) {
            let offsetY = offset.y;
            let refTop = referenceBox.top;

            if (relativeBox) {
                offsetY += relativeBox.top;
                refTop -= relativeBox.top;
            }

            const minSize = minContact !== false ?
                minContact :
                Math.min(referenceBox.height, nodeBox.height);

            if (offsetY + nodeBox.height > minimumBox.bottom) {
                // bottom of offset node is below the container
                const diff = offsetY + nodeBox.height - minimumBox.bottom;
                offset.y = Math.max(
                    refTop - nodeBox.height + minSize,
                    offset.y - diff
                );
            }

            if (offsetY < minimumBox.top) {
                // top of offset node is above the container
                const diff = offsetY - minimumBox.top;
                offset.y = Math.min(
                    refTop + referenceBox.height - minSize,
                    offset.y - diff
                );
            }
        } else {
            let offsetX = offset.x;
            let refLeft = referenceBox.left;

            if (relativeBox) {
                offsetX += relativeBox.left;
                refLeft -= relativeBox.left;
            }

            const minSize = minContact !== false ?
                minContact :
                Math.min(referenceBox.width, nodeBox.width);

            if (offsetX + nodeBox.width > minimumBox.right) {
                // right of offset node is to the right of the container
                const diff = offsetX + nodeBox.width - minimumBox.right;
                offset.x = Math.max(
                    refLeft - nodeBox.width + minSize,
                    offset.x - diff
                );
            }

            if (offsetX < minimumBox.left) {
                // left of offset node is to the left of the container
                const diff = offsetX - minimumBox.left;
                offset.x = Math.min(
                    refLeft + referenceBox.width - minSize,
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
     * @param {number} spacing The amount of spacing to use.
     */
    _adjustPlacement(offset, nodeBox, referenceBox, placement, spacing) {
        if (placement === 'top') {
            offset.y -= Math.round(nodeBox.height) + spacing
        } else if (placement === 'right') {
            offset.x += Math.round(referenceBox.width) + spacing
        } else if (placement === 'bottom') {
            offset.y += Math.round(referenceBox.height) + spacing
        } else if (placement === 'left') {
            offset.x -= Math.round(nodeBox.width) + spacing
        }
    },

    /**
     * Adjust the offset for the position.
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
     * Get the actual placement of the Popper.
     * @param {DOMRect} nodeBox The computed bounding rectangle of the node.
     * @param {DOMRect} referenceBox The computed bounding rectangle of the reference.
     * @param {object} minimumBox The computed minimum bounding rectangle of the container.
     * @param {string} placement The initial placement of the Popper.
     * @param {number} spacing The amount of spacing to use.
     * @returns {string} The new placement of the Popper.
     */
    _getPopperPlacement(nodeBox, referenceBox, minimumBox, placement, spacing) {
        const spaceTop = referenceBox.top - minimumBox.top;
        const spaceRight = minimumBox.right - referenceBox.right;
        const spaceBottom = minimumBox.bottom - referenceBox.bottom;
        const spaceLeft = referenceBox.left - minimumBox.left;

        if (placement === 'top') {
            // if node is bigger than space top and there is more room on bottom
            if (spaceTop < nodeBox.height + spacing &&
                spaceBottom > spaceTop) {
                return 'bottom';
            }
        } else if (placement === 'right') {
            // if node is bigger than space right and there is more room on left
            if (spaceRight < nodeBox.width + spacing &&
                spaceLeft > spaceRight) {
                return 'left';
            }
        } else if (placement === 'bottom') {
            // if node is bigger than space bottom and there is more room on top
            if (spaceBottom < nodeBox.height + spacing &&
                spaceTop > spaceBottom) {
                return 'top';
            }
        } else if (placement === 'left') {
            // if node is bigger than space left and there is more room on right
            if (spaceLeft < nodeBox.width + spacing &&
                spaceRight > spaceLeft) {
                return 'right';
            }
        } else if (placement === 'auto') {
            const maxVSpace = Math.max(spaceTop, spaceBottom);
            const maxHSpace = Math.max(spaceRight, spaceLeft);
            const minVSpace = Math.min(spaceTop, spaceBottom);

            if (
                maxHSpace > maxVSpace &&
                maxHSpace >= nodeBox.width + spacing &&
                minVSpace + referenceBox.height >= nodeBox.height + spacing - Math.max(0, nodeBox.height - referenceBox.height)
            ) {
                return spaceLeft > spaceRight ?
                    'left' :
                    'right';
            }

            const minHSpace = Math.min(spaceRight, spaceLeft);

            if (
                maxVSpace >= nodeBox.height + spacing &&
                minHSpace + referenceBox.width >= nodeBox.width + spacing - Math.max(0, nodeBox.width - referenceBox.width)
            ) {
                return spaceBottom > spaceTop ?
                    'bottom' :
                    'top';
            }

            const maxSpace = Math.max(maxVSpace, maxHSpace);

            if (spaceBottom === maxSpace && spaceBottom >= nodeBox.height + spacing) {
                return 'bottom';
            }

            if (spaceTop === maxSpace && spaceTop >= nodeBox.height + spacing) {
                return 'top';
            }

            if (spaceRight === maxSpace && spaceRight >= nodeBox.width + spacing) {
                return 'right';
            }

            if (spaceLeft === maxSpace && spaceLeft >= nodeBox.width + spacing) {
                return 'left';
            }

            return 'bottom';
        }

        return placement
    },

    /**
     * Get the relative parent of the node.
     * @param {HTMLElement} node The input node.
     * @return {HTMLElement} The relative parent.
     */
    _getRelativeParent(node) {
        return dom.closest(
            node,
            parent =>
                dom.css(parent, 'position') === 'relative',
            document.body
        ).shift();
    },

    /**
     * Get the scroll parent of the node.
     * @param {HTMLElement} node The input node.
     * @return {HTMLElement} The scroll parent.
     */
    _getScrollParent(node) {
        return dom.closest(
            node,
            parent =>
                dom.css(parent, 'position') === 'relative' &&
                ['overflow', 'overflowX', 'overflowY'].some(overflow =>
                    ['auto', 'scroll'].includes(
                        dom.css(parent, overflow)
                    )
                ),
            document.body
        ).shift();
    },

    /**
     * Calculate the computed bounding rectangle of a node (minus scroll bars).
     * @param {HTMLElement|Window} node The input node.
     * @param {HTMLElement|Document} scrollNode The scroll node.
     * @returns {object} The computed bounding rectangle of the node.
     */
    _scrollContainer(node, scrollNode) {
        const isWindow = Core.isWindow(node);
        const rect = isWindow ?
            this._windowContainer(node) :
            dom.rect(node, true);

        const scrollSizeX = UI.getScrollbarSize(node, scrollNode, 'x');
        const scrollSizeY = UI.getScrollbarSize(node, scrollNode, 'y');

        if (scrollSizeX) {
            rect.height -= scrollSizeX;

            if (isWindow) {
                rect.bottom -= scrollSizeX;
            }
        }

        if (scrollSizeY) {
            rect.width -= scrollSizeY;

            if (isWindow) {
                rect.right -= scrollSizeY;
            }
        }

        return rect;
    },

    /**
     * Calculate the computed bounding rectangle of a window.
     * @returns {object} The computed bounding rectangle of the window.
     */
    _windowContainer(node) {
        const scrollX = dom.getScrollX(node);
        const scrollY = dom.getScrollY(node);
        const width = dom.width(node);
        const height = dom.height(node);

        return {
            x: scrollX,
            y: scrollY,
            width,
            height,
            top: scrollY,
            right: scrollX + width,
            bottom: scrollY + height,
            left: scrollX
        };
    }

});
