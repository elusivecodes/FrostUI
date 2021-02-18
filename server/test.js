const server = require('../server/server.js');
const port = 3001;

(async function() {
    await server.start(port);
})();