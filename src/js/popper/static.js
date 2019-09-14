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
    adjustConstrain(offset, nodeBox, referenceBox, minimumBox, relativeBox, placement, minContact) {
        if (['left', 'right'].includes(placement)) {
            const offsetY = relativeBox ?
                offset.y + relativeBox.top :
                offset.y;
            const refTop = relativeBox ?
                referenceBox.top - relativeBox.top :
                referenceBox.top;
            const minSize = minContact ?
                minContact :
                referenceBox.height;
            if (offsetY + nodeBox.height > minimumBox.bottom) {
                // bottom of offset node is below the container
                const diff = offsetY + nodeBox.height - (minimumBox.bottom);
                offset.y = Math.max(
                    refTop - nodeBox.height + minSize,
                    offset.y - diff
                );
            } else if (offsetY < minimumBox.top) {
                // top of offset node is above the container
                const diff = offsetY - minimumBox.top;
                offset.y = Math.min(
                    refTop + referenceBox.height - minSize,
                    offset.y - diff
                );
            }
        } else {
            const offsetX = relativeBox ?
                offset.x + minimumBox.left :
                offset.x;
            const refLeft = relativeBox ?
                referenceBox.left - relativeBox.left :
                referenceBox.left;
            const minSize = minContact ?
                minContact :
                referenceBox.width;
            if (offsetX + nodeBox.width > minimumBox.right) {
                // right of offset node is to the right of the container
                const diff = offsetX + nodeBox.width - minimumBox.right;
                offset.x = Math.max(
                    refLeft - nodeBox.width + minSize,
                    offset.x - diff
                );
            } else if (offsetX < minimumBox.left) {
                // left of offset node is to the left of the container
                const diff = offsetX - minimumBox.left;
                offset.x = Math.min(
                    referenceBox.width >= nodeBox.width ?
                        refLeft + referenceBox.width - minSize :
                        refLeft,
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
    adjustPlacement(offset, nodeBox, referenceBox, placement, spacing) {
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
     * Adjust the offset for the placement.
     * @param {object} offset The offset object.
     * @param {DOMRect} nodeBox The computed bounding rectangle of the node.
     * @param {DOMRect} referenceBox The computed bounding rectangle of the reference.
     * @param {string} placement The actual placement of the Popper.
     * @param {string} position The actual position of the Popper.
     */
    adjustPosition(offset, nodeBox, referenceBox, placement, position) {
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
    getPopperPlacement(nodeBox, referenceBox, minimumBox, placement, spacing) {
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
     * Get the actual position of the Popper.
     * @param {DOMRect} nodeBox The computed bounding rectangle of the node.
     * @param {DOMRect} referenceBox The computed bounding rectangle of the reference.
     * @param {object} minimumBox The computed minimum bounding rectangle of the container.
     * @param {string} placement The actual placement of the Popper.
     * @param {string} position The initial position of the Popper.
     * @returns {string} The new position of the Popper.
     */
    getPopperPosition(nodeBox, referenceBox, minimumBox, placement, position) {

        const deltaX = nodeBox.width - referenceBox.width;
        const deltaY = nodeBox.height - referenceBox.height;

        if (['bottom', 'top'].includes(placement)) {
            const spaceLeft = referenceBox.left - minimumBox.left;
            const spaceRight = minimumBox.right - referenceBox.right;

            if (position === 'start') {
                if (spaceRight < deltaX) {
                    if (spaceLeft >= deltaX / 2 && spaceRight >= deltaX / 2) {
                        return 'center';
                    }

                    if (spaceLeft >= deltaX) {
                        return 'end';
                    }
                }

            } else if (position === 'center') {
                if (spaceLeft < deltaX / 2 || spaceRight < deltaX / 2) {
                    if (spaceRight >= deltaX) {
                        return 'start';
                    }

                    if (spaceLeft >= deltaX) {
                        return 'end';
                    }
                }

            } else if (position === 'end') {
                if (spaceLeft < deltaX) {
                    if (spaceLeft >= deltaX / 2 && spaceRight >= deltaX / 2) {
                        return 'center';
                    }

                    if (spaceRight >= deltaX) {
                        return 'start';
                    }
                }
            }

        } else {
            const spaceTop = referenceBox.top - minimumBox.top;
            const spaceBottom = minimumBox.bottom - referenceBox.bottom;

            if (position === 'start') {
                if (spaceBottom < deltaY) {
                    if (spaceBottom >= deltaY / 2 && spaceTop >= deltaY / 2) {
                        return 'center';
                    }

                    if (spaceTop >= deltaY) {
                        return 'end';
                    }
                }

            } else if (position === 'center') {
                if (spaceTop < deltaY / 2 || spaceBottom < deltaY / 2) {
                    if (spaceBottom >= deltaY) {
                        return 'start';
                    }

                    if (spaceTop >= deltaY) {
                        return 'end';
                    }
                }

            } else if (position === 'end') {
                if (spaceTop < deltaY) {
                    if (spaceTop >= deltaY / 2 && spaceBottom >= deltaY / 2) {
                        return 'center';
                    }

                    if (spaceBottom >= deltaY) {
                        return 'start';
                    }
                }

            }
        }

        return position;
    },

    /**
     * Returns true if the node can not be visible inside the window.
     * @param {object} offset The offset object.
     * @param {DOMRect} nodeBox The computed bounding rectangle of the node.
     * @param {DOMRect} referenceBox The computed bounding rectangle of the reference.
     * @param {object} windowContainer The computed bounding rectangle of the window.
     * @param {number} spacing The amount of spacing to use.
     * @returns {Boolean} TRUE if the node can not be visible inside the window, otherwise FALSE.
     */
    isNodeHidden(nodeBox, referenceBox, windowContainer, spacing) {
        return windowContainer.top > referenceBox.bottom + nodeBox.height + spacing ||
            windowContainer.left > referenceBox.right + nodeBox.width + spacing ||
            windowContainer.bottom < referenceBox.top - nodeBox.height - spacing ||
            windowContainer.right < referenceBox.left - nodeBox.width - spacing;
    },

    /**
     * Calculate the computed bounding rectangle of the window.
     * @param {Boolean} fixed Whether the Popper is fixed.
     * @returns {object} The computed bounding rectangle of the window.
     */
    windowContainer(fixed) {
        const scrollX = fixed ?
            0 :
            dom.getScrollX(window);
        const scrollY = fixed ?
            0 :
            dom.getScrollY(window);
        const windowWidth = dom.width(document);
        const windowHeight = dom.height(document);

        return {
            x: scrollX,
            y: scrollY,
            width: windowWidth,
            height: windowHeight,
            top: scrollY,
            right: scrollX + windowWidth,
            bottom: scrollY + windowHeight,
            left: scrollX
        };
    }

});