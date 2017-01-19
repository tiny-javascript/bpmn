import React from 'react';
import {Line, Group} from 'react-konva';
import Icon from 'others/Icon';
import {getRatios, getPositionByArea} from 'utils/PointUtil';
import BasicElement from 'commons/BasicElement';
import ResizePoint from 'points/ResizePoint';
import ConnectorPoint from 'points/ConnectorPoint';
import DragMixin from 'mixins/DragMixin';
import ClickMixin from 'mixins/ClickMixin';
import ResizeMixin from 'mixins/ResizeMixin';
import HoverMixin from 'mixins/HoverMixin';
import ConnectMixin from 'mixins/ConnectMixin';
@mixin(DragMixin, ClickMixin, ResizeMixin, HoverMixin, ConnectMixin)
export default class LogicElement extends BasicElement {
    /**
     * 重写设置状态
     */
    _handleStatus(status) {
        // 处理透明度
        this.state.opacity = status != this._STATUS_MOVE_ && 1 || 0.75;
        // 处理point显示
        this.state.connectorPointVisible = status != this._STATUS_DEFAULT_;
        this.state.resizePointVisible = status != this._STATUS_DEFAULT_;
    }
    /**
     * 通知连接器更新
     */
    _noticeConnectorUpdate() {
        const {prevElements, nextElements} = this.state;
        const data = this.getData();
        prevElements.concat(nextElements).forEach(key => {
            this.executeEvent('connector.update.' + key, [data, 'position']);
        })
    }
    /**
     * 获取矩形边框坐标
     */
    _getRectBorderPoints(width, height) {
        const xMax = width + 0.5;
        const yMax = height + 0.5;
        let points = [];
        // 左上角坐标
        points = points.concat([-0.5, -0.5]);
        // 右上角坐标
        points = points.concat([xMax, -0.5]);
        // 右下角坐标
        points = points.concat([xMax, yMax]);
        // 左下角坐标
        points = points.concat([-0.5, yMax]);
        return points;
    }
    /**
     * 获取连接点坐标
     */
    _getConnectorPointPosition() {
        const {width, height, pointRaduis, borderWidth, connectable} = this.state;
        const top = {
            x: width / 2 - pointRaduis - borderWidth + 1,
            y: borderWidth / 2 - pointRaduis - 1
        };
        const right = {
            x: width - pointRaduis - borderWidth / 2 + 1,
            y: height / 2 - pointRaduis - borderWidth
        };
        const bottom = {
            x: width / 2 - pointRaduis - borderWidth + 1,
            y: height - pointRaduis - borderWidth / 2 + 1
        };
        const left = {
            x: borderWidth / 2 - pointRaduis - 1,
            y: height / 2 - pointRaduis - borderWidth
        };
        return connectable && [top, right, bottom, left] || [];
    }
    /**
     * 获取变形点坐标
     */
    _getResizePointPosition() {
        const {width, height, pointRaduis, borderWidth, resizable} = this.state;
        const topLeft = {
            x: borderWidth - pointRaduis - 1,
            y: borderWidth - pointRaduis - 1,
            cursor: 'nw-resize'
        };
        const topRight = {
            x: width - pointRaduis - borderWidth + 1,
            y: borderWidth - pointRaduis - 1,
            cursor: 'ne-resize'
        };
        const bottomLeft = {
            x: borderWidth - pointRaduis - 1,
            y: height - pointRaduis - borderWidth + 1,
            cursor: 'sw-resize'
        };
        const bottomRight = {
            x: width - pointRaduis - borderWidth + 1,
            y: height - pointRaduis - borderWidth + 1,
            cursor: 'se-resize'
        };
        return resizable && [topLeft, topRight, bottomRight, bottomLeft] || [];
    }
    _rendreConnectPoint() {
        const {width, height, pointRaduis, connectorPointVisible} = this.state;
        const connectorPoints = this._getConnectorPointPosition();
        const connectEvents = this._connectEvents;
        const positions = ['north', 'east', 'south', 'west'];
        return (
            <Group width={width} height={height}>
                {connectorPoints.map((point, index) => {
                    point.ref = `cp${index}`;
                    point.position = positions[index];
                    return <ConnectorPoint visible={connectorPointVisible} key={index} radius={pointRaduis} {...point} {...connectEvents}/>
                })}
            </Group>
        )
    }
    _rendreResizePoint() {
        const {width, height, pointRaduis, resizePointVisible} = this.state;
        const resizePoints = this._getResizePointPosition();
        const resizeEvents = this._resizeEvents;
        return (
            <Group width={width} height={height}>
                {resizePoints.map((point, index) => {
                    point.ref = `rp${index}`;
                    return <ResizePoint visible={resizePointVisible} key={index} radius={pointRaduis} {...point} {...resizeEvents}/>
                })}
            </Group>
        )
    }
    _renderBorderLine() {
        const {width, height, borderVisible, borderWidth, borderColor} = this.state;
        const borderPoints = this._getRectBorderPoints(width, height);
        return (
            <Line x={0} y={0} visible={borderVisible} points={borderPoints} stroke={borderColor} strokeWidth={borderWidth} closed></Line>
        )
    }
    _renderDeleteIcon() {
        const {width, height, status} = this.state;
        const deleteIconVisible = status == this._STATUS_ACTIVE_ || status == this._STATUS_HOVER_;
        return (
            <Icon x={width} y={height} visible={deleteIconVisible} onClick={this._onDelete.bind(this)}></Icon>
        )
    }
    _setPrevElement(connector) {
        this.state.prevElements = [connector];
        this.state.connectStatus.prev = false;
    }
    _setNextElement(connector) {
        this.state.nextElements = [connector];
        this.state.connectStatus.next = false;
    }
    _removePrevElement(connector, index, elements) {
        this.state.prevElements = [];
        this.state.connectStatus.prev = true;
    }
    _removeNextElement(connector, index, elements) {
        this.state.nextElements = [];
        this.state.connectStatus.next = true;
    }
    _onResizeStart() {
        const {x, y, width, height} = this.state;
        this._spins = this._getSpins(x, y, width, height);
    }
    _onDragMove(e) {
        this._noticeConnectorUpdate();
        this._handleDataChange();
    }
    _onDragEnter(e) {
        if (!this.state.connectStatus.prev) {
            return;
        }
        this._ratios = getRatios(this.state);
        this.executeEvent('connector.move.in', [
            this.state.code, (connector) => {
                this._connecter = connector;
            }
        ]);
    }
    _onDragOver(e) {
        if (!this._connecter || !this.state.connectStatus.prev) {
            return;
        }
        let {x, y} = e.target.getStage().attrs;
        x = x || 0;
        y = y || 0;
        const {layerX, layerY} = e.evt;
        const position = getPositionByArea(this.state, this._ratios, layerX - x, layerY - y);
        if (!(this._movePosition && this._movePosition == position)) {
            const code = this.state.code;
            const key = 'connector.update.' + this._connecter.props.code;
            this.executeEvent(key, [
                {
                    code,
                    position
                },
                'point'
            ]);
            this._movePosition = position;
        }
    }
    _onDragLeave(e) {
        if (!this._connecter || !this.state.connectStatus.prev) {
            return;
        }
        this._connecter = void 0;
        this._movePosition = void 0;
        this.executeEvent('connector.move.out');
    }
    _onElementConnect(type, connector) {
        if (type == 'prev') {
            this._setPrevElement(connector);
        } else if (type == 'next') {
            this._setNextElement(connector);
        }
        this._handleDataChange();
    }
    _onElementUnconnect(connector) {
        const {prevElements, nextElements} = this.state;
        const prevIndex = prevElements.indexOf(connector);
        const nextIndex = nextElements.indexOf(connector);
        if (prevIndex != -1) {
            this._removePrevElement(connector, prevIndex, prevElements);
        }
        if (nextIndex != -1) {
            this._removeNextElement(connector, nextIndex, nextElements);
        }
        this._handleDataChange();
    }
    componentWillMount() {
        super.componentWillMount();
        this._clickEvents = this._getClickEvents();
        this._dragEvents = this._getDragEvents();
        this._resizeEvents = this._getResizeEvents();
        this._hoverEvents = this._getHoverEvents();
        this._connectEvents = this._getConnectEvents();
        // 设置初始状态
        this.state.status = this._STATUS_DEFAULT_;
        // 最小区域
        this.state.minArea = 30;
        // 边框宽度
        this.state.borderWidth = 1;
        // 边框可见
        this.state.borderVisible = true;
        // 变形点可见
        this.state.resizePointVisible = false;
        // 连接点可见
        this.state.connectorPointVisible = false;
        // point半径
        this.state.pointRaduis = 4;
        // 可变形性
        this.state.resizable = true;
        // 可连接性
        this.state.connectable = true;
        // 链接状态
        this.state.connectStatus = {
            prev: true,
            next: true
        };
        // 初始化状态池
        this._statusPool.push(this._STATUS_DEFAULT_);
        if (!this.props.noEvents) {
            this.addEventListener('element.connect.' + this.state.code, this._onElementConnect.bind(this));
            this.addEventListener('element.unconnect.' + this.state.code, this._onElementUnconnect.bind(this));
        }
    }
    componentWillUnmount() {
        super.componentWillUnmount();
        if (!this.props.noEvents) {
            this.removeEventListener('element.connect.' + this.state.code);
            this.removeEventListener('element.unconnect.' + this.state.code);
        }
    }
    shouldComponentUpdate(props, state) {
        return this.state != state;
    }
}
