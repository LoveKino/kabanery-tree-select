'use strict';

let TreeSelect = require('../../index.js');

let treeSelect = TreeSelect({
    data: {
        a: 10,
        b: {
            b1: 5,
            b2: {
                b3: 10
            }
        },
        a1: 11,
        a2: 12,
        a3: 13,
        a4: 14,
        a5: 15,
        'cdhjbcdsh9847923847023sbfjdvbfjhbhj': {
            d: 3,
            e: {
                f: 10,
                g: {
                    h: '183875fhjfjdhgfdjhg'
                }
            }
        }
    },

    nameMap: {
        'a4': 'this is a4',
        'b.b1': 'this is b.b1',
        'b.b2.b3': 'this is b.b2.b3'
    },

    onselected: (v, path) => {
        console.log(v, path);
    }
});

document.body.appendChild(treeSelect);
