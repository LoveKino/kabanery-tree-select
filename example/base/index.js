'use strict';

let TreeSelect = require('../../index.js');

let treeSelect = TreeSelect({
    data: {
        a: 10,
        b: 20,
        a1: 11,
        a2: 12,
        a3: 13,
        a4: 14,
        a5: 15,
        c: {
            d: 3,
            e: {
                f: 10,
                g: {
                    h: '183875fhjfjdhgfdjhg'
                }
            }
        }
    },

    onselected: (v, path) => {
        console.log(v, path);
    }
});

document.body.appendChild(treeSelect);
