import React from 'react';
import {Group, Line} from 'react-konva';
import BasicGateway from './BasicGateway';
export default class ParallelGateway extends BasicGateway {
    _renderIcon() {
        const {radius, iconLineWidth, padding} = this.state;
        const max = radius * 2 - padding;
        const verticalLinePoints = [padding, radius, max, radius];
        const horizontalLinePoints = [radius, padding, radius, max];
        return (
            <Group>
                <Line points={horizontalLinePoints} stroke="#000" strokeWidth={iconLineWidth}></Line>
                <Line points={verticalLinePoints} stroke="#000" strokeWidth={iconLineWidth}></Line>
            </Group>
        )
    }
    _setNextElement(connector) {
        this.state.nextElements.push(connector);
    }
    _removeNextElement(connector, index, elements) {
        elements.splice(index, 1);
        this.state.nextElements = elements;
    }
    componentWillMount() {
        super.componentWillMount();
        this.state.typeName = 'ParallelGateway';
    }
}
