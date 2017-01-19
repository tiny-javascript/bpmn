import React from 'react';
import BasicEvent from './BasicEvent';
export default class StartEvent extends BasicEvent {
    static defaultProps = {
        x: 30,
        y: 30,
        radius: 30,
        borderColor: '#000',
        borderWidth: 2,
        draggable: true,
        backgroundColor: '#66c484',
        title: '开始'
    }
    componentWillMount() {
        super.componentWillMount();
        this.state.typeName = 'StartEvent';
        this.state.connectStatus.prev = false;
    }
}
