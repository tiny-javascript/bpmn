import React from 'react';
import {Group, RegularPolygon} from 'react-konva';
import LogicElement from 'commons/LogicElement';
export default class BasicGateway extends LogicElement {
    static defaultProps = {
        x: 30,
        y: 30,
        radius: 30,
        padding: 12,
        iconLineWidth: 4,
        borderColor: '#000',
        borderWidth: 2,
        draggable: true,
        backgroundColor: '#ffb352'
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
    _renderIcon() {
        return null;
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
        return (
            <Group {...containerProps} {...events}>
                <RegularPolygon x={radius} y={radius} sides={4} radius={radius} stroke={borderColor} strokeWidth={borderWidth} fill={backgroundColor}></RegularPolygon>
                {this._renderIcon()}
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
        this.state.padding = this.props.padding;
        this.state.iconLineWidth = this.props.iconLineWidth;
    }
}
