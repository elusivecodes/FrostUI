'use strict';

export default (_) => {
    return {
        map: {
            inline: false,
            annotation: true,
            sourcesContent: true,
        },
        plugins: {
            autoprefixer: {
                cascade: false,
            },
        },
    };
};
