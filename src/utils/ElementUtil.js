import React from 'react';
import VirtualElement from 'commons/VirtualElement';
import SimpleTask from 'tasks/SimpleTask';
import StartEvent from 'events/StartEvent';
import EndEvent from 'events/EndEvent';
import ParallelGateway from 'gateways/ParallelGateway';
import ExclusiveGateway from 'gateways/ExclusiveGateway';
import InclusiveGateway from 'gateways/InclusiveGateway';
import ComplexGateway from 'gateways/ComplexGateway';
import SimpleConnector from 'connectors/SimpleConnector';
const elements = new Map();
elements.set('VirtualElement', VirtualElement);
elements.set('SimpleTask', SimpleTask);
elements.set('StartEvent', StartEvent);
elements.set('EndEvent', EndEvent);
elements.set('ParallelGateway', ParallelGateway);
elements.set('ExclusiveGateway', ExclusiveGateway);
elements.set('InclusiveGateway', InclusiveGateway);
elements.set('ComplexGateway', ComplexGateway);
elements.set('SimpleConnector', SimpleConnector);
/**
 * 创建节点
 */
export function createElement(info, data) {
    const props = Object.assign({}, info.props);
    props.key = props.code;
    const Element = elements.get(info.type);
    if (data && info.type == 'SimpleConnector') {
        props.prevElements[0].data = data.get(props.prevElements[0].element);
        props.nextElements[0].data = data.get(props.nextElements[0].element);
    }
    return <Element {...props}/>;
}
/**
 * 创建链接线
 */
export function createConnector(source, target, elements) {
    const virtualCode = 'virtual' + Date.now();
    const connectorCode = 'connector' + Date.now();
    const virtual = {
        type: 'VirtualElement',
        props: {
            code: virtualCode,
            x: target.x,
            y: target.y,
            width: 0,
            height: 0,
            prevElements: [connectorCode],
            nextElements: []
        }
    }
    const connector = {
        type: 'SimpleConnector',
        props: {
            code: connectorCode,
            prevElements: [
                {
                    position: source.position,
                    element: source.code
                }
            ],
            nextElements: [
                {
                    position: getDefaultPointPosition(source),
                    element: virtualCode
                }
            ]
        }
    }
    elements.set(virtual.props.code, virtual);
    elements.set(connector.props.code, connector);
    return {virtual, connector};
}
export function getDefaultPointPosition(source) {
    let position = 'west';
    switch (source.position) {
        case 'north':
            position = 'south';
            break;
        case 'south':
            position = 'north';
            break;
        case 'west':
            position = 'east';
            break;
    }
    return position;
}
