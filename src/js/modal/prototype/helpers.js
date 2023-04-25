import { $ } from './../../globals.js';

/**
 * Start a zoom in/out animation.
 */
export function _zoom() {
    if ($.getDataset(this._dialog, 'uiAnimating')) {
        return;
    }

    $.stop(this._dialog);

    $.animate(
        this._dialog,
        (node, progress) => {
            if (progress >= 1) {
                $.setStyle(node, { transform: '' });
                return;
            }

            const zoomOffset = (progress < .5 ? progress : (1 - progress)) / 20;
            $.setStyle(node, { transform: `scale(${1 + zoomOffset})` });
        },
        {
            duration: 200,
        },
    ).catch((_) => {
        //
    });
};
