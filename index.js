'use strict';

let {
    view, n
} = require('kabanery');

let {
    map, compact
} = require('bolzano');

let {
    isObject
} = require('basetype');

let {
    getWindowWidth, getWindowHeight
} = require('doming');

let idgener = require('idgener');

/**
 * @param data Object
 *  data is a normal js object without circle
 */

let renderMap = view(({
    data,
    hidden,
    onselected,
    targetPosition,
    maxShowItemNum = 10, selectedPath = '', parentPath = '',
}, {
    update
}) => {

    let selectedName = selectedPath.split('.')[0];
    let restPath = selectedPath.substring(selectedName.length + 1);
    let width = 164,
        height = 16;
    if (hidden) return null;

    let expandedItem = (item, name) => {
        let left = 0,
            top = 0,
            windowWidth = getWindowWidth(),
            windowHeight = getWindowHeight();

        if (targetPosition) {
            left = targetPosition.left - left + width;
            top = targetPosition.top + top;
            if (targetPosition.right + width > windowWidth) {
                left = left - 2 * width;
            }
            let itemHeight = height * Object.keys(item).length;
            if (targetPosition.bottom + itemHeight > windowHeight) {
                top = top - itemHeight;
            }
        }

        return n('div', {
            style: {
                position: targetPosition ? 'fixed' : 'relative',
                left,
                top,
                zIndex: 1000
            }
        }, renderMap({
            data: item,
            selectedPath: restPath,
            onselected,
            parentPath: getPath(name, parentPath)
        }));
    };

    return n('ul', {
        style: {
            width: width,
            maxHeight: maxShowItemNum * height,
            overflow: 'scroll',
            'display': 'inline-block',
            'margin': 0,
            'padding': '3 0',
            border: '1px solid rgba(80, 80, 80, 0.3)',
            borderRadius: 4,
            boxShadow: '0px 0px 2px #888888',
            backgroundColor: 'rgba(244, 244, 244, 0.95)'
        }
    }, map(data, (item, name) => {
        return n('li', {
            style: {
                position: 'relative',
                listStyle: 'none',
                cursor: 'pointer',
                minWidth: 100,
                padding: '5 10',
                backgroundColor: name === selectedName ? '#3879d9' : 'none',
                color: name === selectedName ? 'white' : 'black'
            },

            'class': SELECT_ITEM_HOVER_CLASS,

            onclick: () => {
                update('hidden', true);
            }
        }, [
            n('div', {
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
                            height
                        }
                    }, [
                        n('span', '>'),
                        name === selectedName && expandedItem(item, name),
                    ])
                ],
                n('div', {
                    style: {
                        clear: 'both'
                    }
                })
            ]),

            n('div', {
                style: {
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    left: 0,
                    top: 0
                },

                onclick: (e) => {
                    if (isObject(item)) {
                        e.stopPropagation();
                        // expand it
                        update([
                            ['selectedPath', name === selectedName ? '' : name],
                            ['targetPosition', e.target.getBoundingClientRect()]
                        ]);
                    } else {
                        onselected && onselected(item, getPath(name, parentPath));
                        update('hidden', true);
                    }
                }
            }),

        ]);
    }));
});

let getPath = (name, parentPath) => {
    return compact([parentPath, name]).join('.');
};

const SELECT_ITEM_HOVER_CLASS = 'select-item-' + idgener().replace(/\./g, '-');

module.exports = (data) => {
    document.getElementsByTagName('head')[0].appendChild(n('style', {
        type: 'text/css'
    }, `.${SELECT_ITEM_HOVER_CLASS}:hover{background-color: #118bfb}`));

    return renderMap(data);
};
