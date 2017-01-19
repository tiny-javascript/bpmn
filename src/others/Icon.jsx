import React from 'react';
import {Rect, Group, Text} from 'react-konva';
const padding = 4;
export default class IconElement extends React.Component {
    static defaultProps = {
        x: 0,
        y: 0,
        name: "\ue73d",
        size: 14,
        color: '#fff',
        visible: true
    }
    _onClick() {
        const {onClick} = this.props;
        onClick && onClick();
    }
    _onEnter() {
        document.body.style.cursor = 'pointer';
    }
    _onLeave() {
        document.body.style.cursor = 'default';
    }
    componentWillMount() {
        this.events = {
            onclick: this._onClick.bind(this),
            onmouseenter: this._onEnter.bind(this),
            onmouseleave: this._onLeave.bind(this)
        }
    }
    render() {
        const {
            x,
            y,
            name,
            size,
            color,
            visible
        } = this.props;
        const events = this.events;
        const props = {
            x: x - padding - size,
            y: padding,
            text: name,
            fill: color,
            fontSize: size,
            visible
        }
        return <Text fontFamily="iconfont" {...props} {...events}/>;
    }
}
