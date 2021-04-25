# FrostUI

**FrostUI** is a free, open-source UI library for *JavaScript*.

It takes heavy inspiration from **Bootstrap**, offering a (mostly) compatible set of features, with more opinionated default styling, additional features and components, and is highly customizable.

It utilizes [FrostDOM](https://github.com/elusivecodes/FrostDOM) for DOM manipulation and animations.


## Table Of Contents
- [Installation](#installation)
- [Usage](#usage)



## Installation

**Dependencies**

- [FrostCore](https://github.com/elusivecodes/FrostCore)
- [FrostDOM](https://github.com/elusivecodes/FrostDOM)

**CSS**

```html
<link rel="stylesheet" href="/path/to/frost-ui.min.css" />
```

**JS**

```html
<script type="text/javascript" src="/path/to/frost-core.min.js"></script>
<script type="text/javascript" src="/path/to/frost-dom.min.js"></script>
<script type="text/javascript" src="/path/to/frost-ui.min.js"></script>
```

Alternatively, a bundle version is supplied which includes the *FrostCore* and *FrostDOM* libraries in a single JS file.

```html
<script type="text/javascript" src="/path/to/frost-ui-bundle.min.js"></script>
```

**Using NPM**

```
npm i frostui
```

In Node.js:

```javascript
const { JSDOM } = require('jsdom');
const { window } = new JSDOM('');
const { UI } = require('frostui')(window);
```


## Usage

Check the demo folder for examples. Full documentation and website coming soon™.