
/**
 * Get the direction offset from an index.
 * @param {number} index The index.
 * @param {number} totalItems The total number of items.
 * @return {number} The direction.
 */
export function getDirOffset(index, totalItems) {
    if (index < 0) {
        return -1;
    }

    if (index > totalItems - 1) {
        return 1;
    }

    return 0;
};

/**
 * Get the direction from an offset and index.
 * @param {number} offset The direction offset.
 * @param {number} oldIndex The old item index.
 * @param {number} newIndex The new item index.
 * @return {string} The direction.
 */
export function getDirection(offset, oldIndex, newIndex) {
    if (offset == -1 || (offset == 0 && newIndex < oldIndex)) {
        return 'left';
    }

    return 'right';
};

/**
 * Get the real index from an index.
 * @param {number} index The item index.
 * @param {number} totalItems The total number of items.
 * @return {number} The real item index.
 */
export function getIndex(index, totalItems) {
    index %= totalItems;

    if (index < 0) {
        return totalItems + index;
    }

    return index;
};
