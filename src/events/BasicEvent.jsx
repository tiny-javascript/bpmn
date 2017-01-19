import React from 'react';
import {Group, Circle, Text} from 'react-konva';
import LogicElement from 'commons/LogicElement';
export default class BasicEvent extends LogicElement {
    _getTextProps() {
        const {title, width, height} = this.state;
        return {
            width,
            y: (height - 12) / 2,
            align: 'center',
            fontSize: 12,
            fill: '#fff',
            text: title
        };
    }
    _onResize(e) {
        const {x, y, width, height} = this._resize(e, this.state, this._spins, true);
        const radius = (width > height && width || height) / 2;
        this.setState({
            x,
            y,
            radius,
            width: radius * 2,
            height: radius * 2
        });
        this._refreshPoints();
    }
    getData() {
        const {code, x, y, radius, typeName} = this.state;
        const {prevElements, nextElements} = this.state;
        return {
            type: typeName,
            props: {
                code,
                x,
                y,
                radius,
                prevElements,
                nextElements
            }
        }
    }
    render() {
        const {radius, backgroundColor, borderColor, borderWidth} = this.state;
        const events = Object.assign({}, this._clickEvents, this._dragEvents, this._hoverEvents);
        const containerProps = this._getContainerProps();
        const textProps = this._getTextProps();
        return (
            <Group {...containerProps} {...events}>
                <Circle x={radius} y={radius} radius={radius} stroke={borderColor} strokeWidth={borderWidth} fill={backgroundColor}></Circle>
                <Text {...textProps}></Text>
                {this._rendreConnectPoint()}
            </Group>
        )
    }
    componentWillMount() {
        super.componentWillMount();
        const {radius} = this.props;
        this.state.width = radius * 2;
        this.state.height = radius * 2;
        this.state.radius = this.props.radius;
        this.state.title = this.props.title;
    }
}
