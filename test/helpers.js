const waitFor = ms => {
    return _ => new Promise(resolve => {
        setTimeout(
            resolve,
            ms
        );
    });
};

module.exports = {
    waitFor
};