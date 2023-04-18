/**
 * Resolve a Promise after a number of milliseconds.
 * @param {number} ms The number of milliseconds.
 * @return {Promise} The promise.
 */
export function waitFor(ms) {
    return (_) => new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
};
