/**
 * Popper Static
 */

Object.assign(Popper, {

    /**
     * Get the actual placement of the Popper.
     * @param {object} nodeBox The computed bounding rectangle of the node.
     * @param {number} spaceTop Available pixels above the node.
     * @param {number} spaceRight Available pixels to the right of the node.
     * @param {number} spaceBottom Available pixels below the node.
     * @param {number} spaceLeft Available pixels to the left of the node.
     * @param {string} placement The initial placement of the Popper.
     * @param {number} spacing The amount of spacing to use.
     * @returns {string} The new placement of the Popper.
     */
    getPopperPlacement(nodeBox, spaceTop, spaceRight, spaceBottom, spaceLeft, placement, spacing) {
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
            const vLoss = Math.min(spaceTop, spaceBottom);
            const vSpace = Math.max(spaceTop, spaceBottom);
            const hSpace = Math.max(spaceRight, spaceLeft);

            if (hSpace > vSpace && hSpace > nodeBox.width + spacing && vLoss > nodeBox.height) {
                if (spaceLeft > spaceRight) {
                    return 'left';
                }

                return 'right';
            }

            if (spaceBottom > spaceTop) {
                return 'bottom';
            }

            return 'top';
        }

        return placement
    },

    /**
     * Get the actual position of the Popper.
     * @param {object} referenceBox The computed bounding rectangle of the reference.
     * @param {number} deltaX The difference between the node and reference widths.
     * @param {number} deltaY The difference between the node and reference heights.
     * @param {number} docWidth The width of the document.
     * @param {number} docHeight The height of the document.
     * @param {string} placement The actual placement of the Popper.
     * @param {string} position The initial position of the Popper.
     * @returns {string} The new position of the Popper.
     */
    getPopperPosition(referenceBox, deltaX, deltaY, docWidth, docHeight, placement, position) {
        if (placement === 'top' || placement === 'bottom') {

            if (position === 'start') {
                if (referenceBox.right > docWidth) {
                    if (referenceBox.right - deltaX < docWidth &&
                        referenceBox.left - deltaX > 0) {
                        return 'end';
                    }

                    if (referenceBox.right - (deltaX / 2) < docWidth &&
                        referenceBox.left - (deltaX / 2) > 0) {
                        return 'center';
                    }
                }

            } else if (position === 'center') {
                if (referenceBox.left - (deltaX / 2) < 0 ||
                    referenceBox.right - (deltaX / 2) > docWidth) {
                    if (referenceBox.right < docWidth &&
                        referenceBox.left > 0) {
                        return 'start';
                    }

                    if (referenceBox.right - deltaX < docWidth &&
                        referenceBox.left - deltaX > 0) {
                        return 'end';
                    }
                }

            } else if (position === 'end') {
                if (referenceBox.left - deltaX < 0) {
                    if (referenceBox.right < docWidth &&
                        referenceBox.left > 0) {
                        return 'start';
                    }

                    if (referenceBox.right - (deltaX / 2) < docWidth &&
                        referenceBox.left - (deltaX / 2) > 0) {
                        return 'center';
                    }
                }
            }

        } else if (placement === 'left' || placement === 'right') {

            if (position === 'start') {
                if (referenceBox.bottom > docHeight) {
                    if (referenceBox.bottom - deltaY < docHeight &&
                        referenceBox.top - deltaY > 0) {
                        return 'end';
                    }

                    if (referenceBox.bottom - (deltaY / 2) < docHeight &&
                        referenceBox.top - (deltaY / 2) > 0) {
                        return 'center';
                    }
                }

            } else if (position === 'center') {
                if (referenceBox.top - (deltaY / 2) < 0 ||
                    referenceBox.bottom - (deltaY / 2) > docHeight) {
                    if (referenceBox.bottom < docHeight &&
                        referenceBox.top > 0) {
                        return 'start';
                    }

                    if (referenceBox.bottom - deltaY < docHeight &&
                        referenceBox.top - deltaY > 0) {
                        return 'end';
                    }
                }

            } else if (position === 'end') {
                if (referenceBox.top - deltaY < 0) {
                    if (referenceBox.bottom < docHeight &&
                        referenceBox.top > 0) {
                        return 'start';
                    }

                    if (referenceBox.bottom - (deltaY / 2) < docHeight &&
                        referenceBox.top - (deltaY / 2) > 0) {
                        return 'center';
                    }
                }

            }
        }

        return position;
    },

    /**
     * Update the position of all Poppers.
     */
    run() {
        this._poppers.forEach(popper => popper.update());

        if (this._poppers.size === 0) {
            dom.removeEvent(window, 'resize.frost.popper scroll.frost.popper');
            this._running = false;
        }
    },

    /**
     * Start updating the position of all Poppers.
     */
    start() {
        if (this._running) {
            return;
        }

        this._running = true;

        dom.addEvent(window, 'resize.frost.popper scroll.frost.popper', Core.animation(_ => Popper.run()));
    }

});