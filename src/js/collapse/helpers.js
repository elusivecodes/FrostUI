/**
 * Collapse Helpers
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
     * Get accordion toggles and targets for the target nodes.
     * @param {array} targets The target nodes.
     * @return {object} The accordion toggles and targets.
     */
    _getAccordion(targets) {
        const accordionToggles = [];
        const accordionTargets = [];

        for (const target of targets) {
            const parent = dom.getDataset(target, 'parent');
            if (!parent) {
                continue;
            }

            const parentNode = dom.closest(target, parent);
            const collapseToggles = dom.find('[data-toggle="collapse"]', parentNode)
                .filter(toggle => !dom.isSame(toggle, this._node) && dom.hasData(toggle, 'collapse'));

            for (const toggle of collapseToggles) {
                if (accordionToggles.includes(toggle)) {
                    continue;
                }

                const collapse = dom.getData(toggle, 'collapse');
                const collapseTargets = dom.find(collapse._settings.target)
                    .filter(target => !targets.includes(target) && !accordionTargets.includes(target) && dom.hasClass(target, 'show'));

                if (!collapseTargets.length) {
                    continue;
                }

                if (collapseTargets.find(target => dom.getDataset(target, 'animating'))) {
                    return false;
                }

                accordionToggles.push(toggle);
                accordionTargets.push(...collapseTargets);
            }
        }

        return {
            nodes: accordionToggles,
            targets: accordionTargets
        };
    },

    /**
     * Set the ARIA expanded attribute for all targets.
     * @param {array} targets The targets array.
     * @param {Boolean} [expanded=true] Whether the target is expanded.
     */
    _setExpanded(targets, expanded = true) {
        for (const target of targets) {
            const toggles = Collapse._toggles.get(target);
            for (const toggle of toggles) {
                dom.setAttribute(toggle, 'aria-expanded', expanded);
            }
        }
    }

});
