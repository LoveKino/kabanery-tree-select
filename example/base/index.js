'use strict';

let TreeSelect = require('../../index.js');

let treeSelect = TreeSelect({
    data: {
        a: 10,
        b: 20,
        c: {
            d: 3,
            e: {
                f: 10
            }
        }
    },
    selectedPath: 'c.e.f'
});

document.body.appendChild(treeSelect);
