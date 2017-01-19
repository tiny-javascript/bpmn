import React from 'react';
import BasicEvent from './BasicEvent';
export default class EndEvent extends BasicEvent {
    static defaultProps = {
        x: 30,
        y: 30,
        radius: 30,
        borderColor: '#000',
        borderWidth: 2,
        backgroundColor: 'red',
        title: '结束',
        draggable: true
    }
    _setPrevElement(connector) {
        this.state.prevElements.push(connector);
    }
    _removePrevElement(connector, index, elements) {
        elements.splice(index, 1);
        this.state.prevElements = elements;
    }
    componentWillMount() {
        super.componentWillMount();
        this.state.typeName = 'EndEvent';
    }
}
