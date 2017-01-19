import React from 'react';
import {Group, Circle} from 'react-konva';
import BasicGateway from './BasicGateway';
export default class InclusiveGateway extends BasicGateway {
    _renderIcon() {
        const {radius, iconLineWidth, padding} = this.state;
        const nRadius = radius / 2;
        return <Circle x={radius} y={radius} radius={nRadius} strokeWidth={iconLineWidth} stroke='#000'/>;
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
        this.state.typeName = 'InclusiveGateway';
    }
}
