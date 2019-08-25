/**
 * Collapse Private
 */

Object.assign(Collapse.prototype, {

    /**
     * Hide accordion nodes for all targets.
     * @param {array} targets The target nodes.
     */
    _hideAccordion(targets) {
        const parents = [];
        const collapses = [];

        for (const target of targets) {
            const parent = dom.getDataset(target, 'parent');
            if (!parent) {
                continue;
            }

            const parentNode = dom.closest(target, parent);
            if (!parents.includes(parentNode)) {
                parents.push(parentNode);
            }
        }

        for (const parent of parents) {
            const collapseToggle = dom.find('[data-toggle="collapse"]', parent);
            for (const toggle of collapseToggle) {
                if (dom.isSame(this._node, toggle)) {
                    continue;
                }

                const collapse = dom.getData(toggle, 'collapse');
                const targets = dom.find(collapse._settings.target);
                const animating = targets.find(target => dom.getDataset(target, 'animating') === 'true');
                if (animating) {
                    return false;
                }

                collapses.push(collapse);
            }
        }

        for (const collapse of collapses) {
            collapse.hide().catch(_ => { });
        }

        return true;
    }

});
