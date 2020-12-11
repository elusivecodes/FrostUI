/**
 * PopperSet Class
 * @class
 */
class PopperSet {

    /**
     * Add a Popper to the set.
     * @param {Popper} popper The popper to add.
     */
    static add(popper) {
        this._poppers.push(popper);

        if (this._running) {
            return;
        }

        dom.addEvent(
            window,
            'resize.ui.popper scroll.ui.popper',
            DOM.debounce(_ => {
                for (const popper of this._poppers) {
                    popper.update();
                }
            })
        );
        this._running = true;
    }

    /**
     * Add a Popper to a scrolling parent set.
     * @param {HTMLElement} scrollParent The scrolling container element.
     * @param {Popper} popper The popper to add.
     */
    static addOverflow(scrollParent, popper) {
        if (!this._popperOverflows.has(scrollParent)) {
            this._popperOverflows.set(scrollParent, []);
            dom.addEvent(
                scrollParent,
                'scroll.ui.popper',
                DOM.debounce(_ => {
                    for (const popper of this._popperOverflows.get(scrollParent)) {
                        popper.update();
                    }
                })
            );
        }

        this._popperOverflows.get(scrollParent).push(popper);
    }

    /**
     * Remove a Popper from the set.
     * @param {Popper} popper The popper to remove.
     */
    static remove(popper) {
        this._poppers = this._poppers.filter(oldPopper => oldPopper !== popper);

        if (this._poppers.length) {
            return;
        }

        dom.removeEvent(window, 'resize.ui.popper scroll.ui.popper');
        this._running = false;
    }

    /**
     * Remove a Popper from a scrolling parent set.
     * @param {HTMLElement} scrollParent The scrolling container element.
     * @param {Popper} popper The popper to remove.
     */
    static removeOverflow(scrollParent, popper) {
        if (!this._popperOverflows.has(scrollParent)) {
            return;
        }

        const poppers = this._popperOverflows.get(scrollParent).filter(oldPopper => oldPopper !== popper);

        if (poppers.length) {
            this._popperOverflows.set(scrollParent, poppers);
            return;
        }

        this._popperOverflows.delete(scrollParent);
        dom.removeEvent(scrollParent, 'scroll.ui.popper');
    }

}
