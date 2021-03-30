const puppeteer = require('puppeteer');
const assert = require('assert');
const fs = require('fs');
const path = require('path');
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

    const context = browser.defaultBrowserContext();
    context.overridePermissions('http://localhost:3001', ['clipboard-read']);

    page = await browser.newPage();

    await page.goto('http://localhost:3001', {
        waitUntil: 'domcontentloaded'
    });

    await page.setViewport({ width: 800, height: 600 });

    assert.strictEqual(
        await page.evaluate(_ => {
            return UI.Carousel.defaults.interval;
        }),
        5000
    );

    assert.strictEqual(
        await page.evaluate(_ => {
            return UI.Carousel.defaults.transition;
        }),
        500
    );

    assert.strictEqual(
        await page.evaluate(_ => {
            return UI.Collapse.defaults.duration;
        }),
        250
    );

    assert.strictEqual(
        await page.evaluate(_ => {
            return UI.Toast.defaults.delay;
        }),
        5000
    );

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
        dom.empty(document.body);
        dom.setHTML(
            document.head,
            '<link rel="stylesheet" href="assets/frost-ui.css">'
        );
    });

    await page.waitForFunction(_ => {
        const test = dom.create('div', { class: 'text-center' });
        dom.append(document.body, test);
        const result = dom.css(test, 'textAlign') === 'center';
        dom.detach(test);
        return result;
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

const screenshot = async (filePath, type = 'jpeg', fullPage = false) => {
    const dir = path.dirname(filePath);

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    await page.screenshot({ path: filePath, type, fullPage });
};

module.exports = {
    exec,
    screenshot
};