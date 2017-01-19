import React from 'react';
import {Group, Circle} from 'react-konva';
import BasicPoint from './BasicPoint';
export default class ConnectorPoint extends BasicPoint {
    static defaultProps = {
        x: 0,
        y: 0,
        radius: 5,
        borderColor: 'red',
        visible: false,
        draggable: true,
        position: 'north'
    }
    _onDragStart(e) {
        e.source = this.state;
        this.props.onConnectStart && this.props.onConnectStart(e);
    }
    _onDragMove(e) {
        e.source = this.state;
        const {x, y} = this.props;
        this.props.onConnect && this.props.onConnect(e);
        this.setState({x, y});
    }
    _onDragEnd(e) {
        e.source = this.state;
        this.props.onConnectEnd && this.props.onConnectEnd(e);
    }
    _onMouseEnter(e) {
        this.setCursor("crosshair");
    }
    componentWillMount() {
        super.componentWillMount();
        this.state.position = this.props.position;
        this.state.typeName = 'ConnectorPoint';
    }
    render() {
        const {x, y, radius, borderColor} = this.state;
        const {draggable, visible, disabled} = this.state;
        let events = Object.assign({}, this._dragEvents, this._hoverEvents);
        return (
            <Group ref="container" id={this.state.code} name="ConnectorPoint" draggable={draggable} visible={visible} x={x} y={y} width={radius * 2} height={radius * 2} {...events}>
                <Circle x={radius} y={radius} radius={radius} fill={borderColor}/>
                <Circle x={radius} y={radius} radius={radius - 1} fill="white"/>
            </Group>
        );
    }
}
