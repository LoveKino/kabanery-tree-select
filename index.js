'use strict';

let {
    view, n
} = require('kabanery');

let {
    map
} = require('bolzano');

let {
    isObject
} = require('basetype');

/**
 * @param data Object
 *  data is a normal js object without circle
 */
module.exports = view(({
    data,
    selectedPath
}) => {
    return renderMap(data, selectedPath);
});

let renderMap = (data, selectedPath = '', position = 'right') => {
    let selectedName = selectedPath.split('.')[0];
    return n('ul', {
        style: {
            width: 164,
            'display': 'inline-block',
            'margin': 0,
            'padding': 0,
            border: '1px solid #999999',
            borderRadius: 4,
            boxShadow: '0px 0px 2px #888888'
        }
    }, map(data, (item, name) => {
        return n('li', {
            style: {
                listStyle: 'none',
                cursor: 'pointer',
                minWidth: 100,
                padding: '5 10'
            },
            onclick: () => {
                if (isObject(item)) {
                    //
                } else {
                    //
                }
            }
        }, n('div', [
            n('div', {
                style: {
                    'float': 'left',
                    position: 'relative',
                    width: '95%',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden'
                }
            }, [
                n('span', name)
            ]),
            isObject(item) && [
                n('div', {
                    style: {
                        'float': 'right',
                        position: 'relative',
                        width: '5%'
                    }
                }, [
                    n('span', '>'),
                    name === selectedName && n('div', {
                        style: {
                            position: 'relative',
                            left: position === 'right' ? 17 : -314,
                            top: -16
                        }
                    }, renderMap(item)),
                ])
            ],
            n('div', {
                style: {
                    clear: 'both'
                }
            })
        ]));
    }));

};
