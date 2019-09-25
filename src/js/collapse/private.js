/**
 * Collapse Private
 */

Object.assign(Collapse.prototype, {

    /**
     * Attach events for the Collapse.
     */
    _events() {
        this._clickEvent = e => {
            e.preventDefault();

            this.toggle().catch(_ => { });
        };

        dom.addEvent(this._node, 'click.frost.collapse', this._clickEvent);
    },

    /**
     * Hide accordion nodes for all targets.
     * @param {array} targets The target nodes.
     */
    _hideAccordion(targets) {
        if (!this._hasAccordion) {
            return [];
        }

        const parents = [];
        const nodes = [];
        const newTargets = [];

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

                if (!dom.hasData(toggle, 'collapse')) {
                    continue;
                }

                const collapse = dom.getData(toggle, 'collapse');

                const collapseTargets = dom.find(collapse._settings.target)
                    .filter(target => dom.hasClass(target, 'show'));
                if (!collapseTargets.length) {
                    continue;
                }
                const animating = collapseTargets.find(target => dom.getDataset(target, 'animating'));
                if (animating) {
                    return false;
                }
                nodes.push(collapse._node);
                newTargets.push(...collapseTargets);
            }
        }

        return {
            nodes,
            targets: newTargets
        };
    }

});
