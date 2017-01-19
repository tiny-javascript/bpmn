import React from 'react';
import {Group, Arrow} from 'react-konva';
import BasicElement from 'commons/BasicElement';
import {createLinePoints} from 'utils/LineUtil';
import {getVirtualConnecterPointPosition} from 'utils/PointUtil';
import ClickMixin from 'mixins/ClickMixin';
@mixin(ClickMixin)
export default class BasicConnector extends BasicElement {
    _getArrowProps() {
        const {code, typeName} = this.state;
        const {pointerLength, pointerWidth, borderWidth, borderColor, backgroundColor} = this.state;
        return {
            pointerLength,
            pointerWidth,
            id: code,
            name: typeName,
            stroke: borderColor,
            fill: backgroundColor,
            strokeWidth: borderWidth
        };
    }
    /**
     * 计算初始坐标
     */
    _calcLineAxis(element, position, shouldArray) {
        let {x, y, width, height, radius} = element.props;
        if (radius) {
            width = height = radius * 2;
        }
        const axis = {};
        switch (position) {
            case 'north':
                axis.x = x + width / 2;
                axis.y = y;
                break;
            case 'east':
                axis.x = x + width;
                axis.y = y + height / 2;
                break;
            case 'south':
                axis.x = x + width / 2;
                axis.y = y + height;
                break;
            case 'west':
                axis.x = x;
                axis.y = y + height / 2;
                break;
        }
        return shouldArray && [axis.x, axis.y] || axis;
    }
    _handlePositonUpdate(data) {
        const {prevElements, nextElements} = this.state;
        const prev = prevElements[0];
        const next = nextElements[0];
        if (prev.element == data.props.code) {
            prev.data = data;
        } else if (next.element == data.props.code) {
            if (data.type == 'VirtualElement') {
                const {x, y} = data.props;
                next.position = getVirtualConnecterPointPosition(prev, x, y);
            }
            next.data = data;
        }
    }
    _handelDataUpdate(data) {
        this.state.prevElements = data.props.prevElements;
        this.state.nextElements = data.props.nextElements;
    }
    _handlePointUpdate(data) {
        const {code, position} = data;
        const {prevElements, nextElements} = this.state;
        const prev = prevElements[0];
        const next = nextElements[0];
        if (prev.element == code) {
            prev.position = position;
        } else if (next.element == code) {
            next.position = position;
        }
    }
    _onUpdate(data, type) {
        if (type == 'position') {
            this._handlePositonUpdate(data);
        } else if (type == 'data') {
            this._handelDataUpdate(data);
        } else if (type == 'point') {
            this._handlePointUpdate(data);
        }
        this.forceUpdate();
    }
    componentWillMount() {
        super.componentWillMount();
        this._clickEvents = this._getClickEvents();
        // 连接线宽度
        this.state.borderWidth = this.props.borderWidth;
        // 箭头长度
        this.state.pointerLength = this.props.pointerLength;
        // 箭头宽度
        this.state.pointerWidth = this.props.pointerWidth;
        // 箭头路径
        this.state.points = [];
        // 更新事件KEY
        if (!this.props.noEvents) {
            this.addEventListener('connector.update.' + this.state.code, this._onUpdate.bind(this));
        }
    }
    shouldComponentUpdate(state, props) {
        return this.state != state;
    }
    render() {
        const {prevElements, nextElements, status} = this.state;
        const source = prevElements[0].data;
        const sourcePoint = prevElements[0].position;
        const target = nextElements[0].data;
        const targetPoint = nextElements[0].position;
        // 箭头属性
        const props = this._getArrowProps();
        props.draggable = true;
        if (status == this._STATUS_ACTIVE_) {
            props.shadowColor = 'red';
        }
        // 事件
        const events = Object.assign({}, this._clickEvents);
        events.ondelete = this._onDelete.bind(this);
        // 开始坐标
        const startAxis = this._calcLineAxis(source, sourcePoint, true);
        // 结束坐标
        const endAxis = this._calcLineAxis(target, targetPoint, true);
        // 绘制坐标点
        const points = createLinePoints(startAxis, source, sourcePoint)(endAxis, target, targetPoint)();
        this.state.points = points;
        return <Arrow ref="container" points={points} {...props} {...events}/>;
    }
    componentWillUnmount() {
        super.componentWillUnmount();
        if (!this.props.noEvents) {
            this.removeEventListener('connector.update.' + this.state.code);
        }
    }
}
