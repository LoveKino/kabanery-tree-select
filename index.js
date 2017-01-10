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

let idgener = require('idgener');

/**
 * @param data Object
 *  data is a normal js object without circle
 */

let renderMap = view(({
    data,
    selectedPath,
    hidden,
    onselected
}, {
    update
}) => {
    let selectedName = selectedPath.split('.')[0];
    let restPath = selectedPath.substring(selectedName.length + 1);
    let className = 'select-item-' + idgener().replace(/\./g, '-');

    document.getElementsByTagName('head')[0].appendChild(n('style', {
        type: 'text/css'
    }, `.${className}:hover{background-color: #118bfb}`));

    if (hidden) return null;

    return n('ul', {
        style: {
            width: 164,
            'display': 'inline-block',
            'margin': 0,
            'padding': '3 0',
            border: '1px solid rgba(80, 80, 80, 0.3)',
            borderRadius: 4,
            boxShadow: '0px 0px 2px #888888'
        }
    }, map(data, (item, name) => {
        return n('li', {
            style: {
                listStyle: 'none',
                cursor: 'pointer',
                minWidth: 100,
                padding: '5 10',
                backgroundColor: name === selectedName ? '#3879d9' : 'none',
                color: name === selectedName ? 'white' : 'black'
            },

            'class': className,

            onclick: (e) => {
                if (e.finished) {
                    update('hidden', true);
                } else if (isObject(item)) {
                    e.stopPropagation();
                    update('selectedPath', name === selectedName ? '' : name);
                } else {
                    //
                    e.finished = true;
                    onselected && onselected(item, name, selectedPath);
                    update('hidden', true);
                }
            }
        }, n('div', {
            style: {
                height: 16,
                lineHeight: 16
            }
        }, [
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
                        width: '5%',
                        height: 16
                    }
                }, [
                    n('span', '>'),
                    name === selectedName && n('div', {
                        style: {
                            position: 'relative',
                            left: 17,
                            top: -26
                        }
                    }, renderMap({
                        data: item,
                        selectedPath: restPath,
                        onselected
                    })),
                ])
            ],
            n('div', {
                style: {
                    clear: 'both'
                }
            })
        ]));
    }));
});

module.exports = renderMap;
