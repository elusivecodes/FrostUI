# FrostUI

**FrostUI** is a free, open-source UI library for *JavaScript*.

It takes heavy inspiration from **Bootstrap**, offering a (mostly) compatible set of features, with more opinionated default styling, additional features and components, and is highly customizable.

It utilizes [fQuery](https://github.com/elusivecodes/fQuery) for DOM manipulation and animations.


## Table Of Contents
- [Installation](#installation)
- [Usage](#usage)



## Installation

**Dependencies**

- [fQuery](https://github.com/elusivecodes/fQuery)

**CSS**

```html
<link rel="stylesheet" href="/path/to/frost-ui.min.css" />
```

**JS**

```html
<script type="text/javascript" src="/path/to/fquery.min.js"></script>
<script type="text/javascript" src="/path/to/frost-ui.min.js"></script>
```

Alternatively, a bundle version is supplied which includes the *fQuery* library in a single JS file.

```html
<script type="text/javascript" src="/path/to/frost-ui-bundle.min.js"></script>
```

**Using NPM**

```
npm i @fr0st/ui
```

In Node.js:

```javascript
import Alert from './node_modules/@fr0st/ui/src/js/alert/index.js';
import Button from './node_modules/@fr0st/ui/src/js/button/index.js';
import Carousel from './node_modules/@fr0st/ui/src/js/carousel/index.js';
import Collapse from './node_modules/@fr0st/ui/src/js/collapse/index.js';
import Dropdown from './node_modules/@fr0st/ui/src/js/dropdown/index.js';
import FocusTrap from './node_modules/@fr0st/ui/src/js/focus-trap/index.js';
import Modal from './node_modules/@fr0st/ui/src/js/modal/index.js';
import Offcanvas from './node_modules/@fr0st/ui/src/js/offcanvas/index.js';
import Popover from './node_modules/@fr0st/ui/src/js/popover/index.js';
import Popper from './node_modules/@fr0st/ui/src/js/popper/index.js';
import Tab from './node_modules/@fr0st/ui/src/js/tab/index.js';
import Toast from './node_modules/@fr0st/ui/src/js/toast/index.js';
import Tooltip from './node_modules/@fr0st/ui/src/js/tooltip/index.js';

import './node_modules/@fr0st/ui/src/js/clipboard/index.js';
import './node_modules/@fr0st/ui/src/js/ripple/index.js';
import './node_modules/@fr0st/ui/src/js/text-expand/index.js';
```


## Usage

Check the demo folder for examples. Full documentation and website coming soon™.