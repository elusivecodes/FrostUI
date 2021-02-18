const puppeteer = require('puppeteer');
const server = require('../server/server.js');
const port = 3001;

let browser, page;

before(async function() {
    this.timeout(30000);

    await server.start(port);

    browser = await puppeteer.launch({
        args: [
            '--disable-gpu',
            '--disable-dev-shm-usage',
            '--disable-setuid-sandbox',
            '--no-first-run',
            '--no-sandbox',
            '--no-zygote',
            '--single-process'
        ]
    });

    page = await browser.newPage();

    await page.goto('http://localhost:3001', {
        waitUntil: 'domcontentloaded'
    });

    await page.evaluate(_ => {
        Animation.useTimeout = true;
        UI.Carousel.defaults.interval = 200;
        UI.Carousel.defaults.transition = 100;
        UI.Collapse.defaults.duration = 100;
        UI.Toast.defaults.delay = 200;
    });
});

beforeEach(async function() {
    this.timeout(30000);

    await page.evaluate(_ => {
        document.head.innerHTML = '';
        document.body.innerHTML = '';
    });
});

after(async function() {
    this.timeout(30000);

    await page.close();
    await browser.close();
    await server.close();
});

const exec = async (callback, data) =>
    await page.evaluate(callback, data);

module.exports = {
    exec
};