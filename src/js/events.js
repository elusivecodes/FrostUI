// Track the target of mousedown events
dom.addEvent(window, 'mousedown.ui', e => {
    UI._clickTarget = e.target;
}, true);

dom.addEvent(window, 'mouseup.ui', _ => {
    setTimeout(_ => {
        UI._clickTarget = null;
    }, 0);
}, true);
