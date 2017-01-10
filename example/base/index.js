'use strict';

let TreeSelect = require('../../index.js');

let treeSelect = TreeSelect({
    data: {
        a: 10,
        b: 20,
        c: {
            d: 3
        }
    },
    selectedPath: 'c.d'
});

document.body.appendChild(treeSelect);
