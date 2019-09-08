/**
 * Popper Static
 */

Object.assign(Popper, {

    /**
     * Get the actual placement of the Popper.
     * @param {object} nodeBox The computed bounding rectangle of the node.
     * @param {object} referenceBox The computed bounding rectangle of the reference.
     * @param {object} containerBox The computed bounding rectangle of the container.
     * @param {string} placement The initial placement of the Popper.
     * @param {number} spacing The amount of spacing to use.
     * @returns {string} The new placement of the Popper.
     */
    getPopperPlacement(nodeBox, referenceBox, containerBox, placement, spacing) {
        const spaceTop = referenceBox.top - containerBox.top;
        const spaceRight = containerBox.right - referenceBox.right;
        const spaceBottom = containerBox.bottom - referenceBox.bottom;
        const spaceLeft = referenceBox.left - containerBox.left;

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
                maxHSpace > nodeBox.width + spacing &&
                minVSpace + referenceBox.height - nodeBox.height > spacing
            ) {
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
     * @param {object} nodeBox The computed bounding rectangle of the node.
     * @param {object} referenceBox The computed bounding rectangle of the reference.
     * @param {object} containerBox The computed bounding rectangle of the container.
     * @param {string} placement The actual placement of the Popper.
     * @param {string} position The initial position of the Popper.
     * @returns {string} The new position of the Popper.
     */
    getPopperPosition(nodeBox, referenceBox, containerBox, placement, position) {

        const deltaX = nodeBox.width - referenceBox.width;
        const deltaY = nodeBox.height - referenceBox.height;

        if (['bottom', 'top'].includes(placement)) {
            const spaceLeft = referenceBox.left - containerBox.left;
            const spaceRight = containerBox.right - referenceBox.right;

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
            const spaceTop = referenceBox.top - containerBox.top;
            const spaceBottom = containerBox.bottom - referenceBox.bottom;

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

});