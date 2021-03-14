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
            'resize.ui.popper',
            DOM.debounce(_ => {
                for (const popper of this._poppers) {
                    popper.update();
                }
            })
        );

        dom.addEvent(
            document,
            'scroll.ui.popper',
            DOM.debounce(e => {
                for (const popper of this._poppers) {
                    if (!Core.isDocument(e.target) && !dom.hasDescendent(e.target, popper._node)) {
                        continue;
                    }

                    popper.update();
                }
            }),
            true
        );

        this._running = true;
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

}
