import React from 'react';
import {Rect, Group, Text} from 'react-konva';
import BasicTask from './BasicTask';
export default class SimpleTask extends BasicTask {
    static defaultProps = {
        x: 0,
        y: 0,
        width: 90,
        height: 60,
        borderColor: '#000',
        borderWidth: 2,
        cornerRadius: 3,
        backgroundColor: '#009ef1',
        draggable: true,
        deletable: true,
        title: 'Task',
        icons: []
    }
    _getTextProps() {
        const {title, width, height} = this.state;
        return {
            width,
            y: (height - 12) / 2,
            align: 'center',
            fontSize: 14,
            fill: '#fff',
            lineHeight: 1.2,
            text: title
        };
    }
    _onElementUpdate(value, attr) {
        const newState = {};
        newState[attr] = value;
        this.setState(newState);
    }
    getData() {
        const {code, x, y, width, height} = this.state;
        const {prevElements, nextElements, typeName, title, backgroundColor} = this.state;
        return {
            type: typeName,
            props: {
                code,
                x,
                y,
                width,
                height,
                prevElements,
                nextElements,
                title,
                backgroundColor
            }
        }
    }
    componentWillMount() {
        super.componentWillMount();
        this.state.typeName = 'SimpleTask';
        this.state.cornerRadius = this.props.cornerRadius;
        this.addEventListener('element.update.' + this.state.code, this._onElementUpdate.bind(this));
    }
    render() {
        const {title, width, height, borderColor, borderWidth} = this.state;
        const {backgroundColor, cornerRadius, deletable} = this.state;
        const events = Object.assign({}, this._clickEvents, this._dragEvents, this._hoverEvents);
        const containerProps = this._getContainerProps();
        const textProps = this._getTextProps();
        return (
            <Group {...containerProps} {...events}>
                <Rect width={width} height={height} stroke={borderColor} strokeWidth={borderWidth} fill={backgroundColor} cornerRadius={cornerRadius}/>
                <Text {...textProps}></Text>
                {deletable && this._renderDeleteIcon() || null}
                {this._renderIcons()}
                {this._rendreConnectPoint()}
                {this._rendreResizePoint()}
            </Group>
        )
    }
    componentWillUnmount() {
        super.componentWillUnmount();
        this.removeEventListener('element.update.' + this.state.code)
    }
}
