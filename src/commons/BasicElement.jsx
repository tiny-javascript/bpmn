import React from 'react';
import {Line, Group} from 'react-konva';
import EventComponent from 'others/EventComponent';
export default class BasicElement extends EventComponent {
    /*默认状态*/
    _STATUS_DEFAULT_ = '_STATUS_DEFAULT_'
    /*活动状态*/
    _STATUS_ACTIVE_ = '_STATUS_ACTIVE_'
    /*移动状态*/
    _STATUS_MOVE_ = '_STATUS_MOVE_'
    /*变形状态*/
    _STATUS_RESIZE_ = '_STATUS_RESIZE_'
    /*悬浮状态*/
    _STATUS_HOVER_ = '_STATUS_HOVER_'
    /*禁用状态*/
    _STATUS_DISABLE_ = '_STATUS_DISABLE_'
    /*链接状态*/
    _STATUS_CONNECT_ = '_STATUS_CONNECT_'
    // 状态池
    _statusPool = []
    /*状态*/
    state = {
        x: this.props.x,
        y: this.props.y,
        width: this.props.width,
        height: this.props.height,
        status: this._STATUS_DEFAULT_,
        draggable: this.props.draggable,
        opacity: 1,
        borderWidth: this.props.borderWidth,
        borderColor: this.props.borderColor,
        backgroundColor: this.props.backgroundColor,
        code: this.props.code,
        prevElements: this.props.prevElements,
        nextElements: this.props.nextElements
    }
    /**
     * 获取容器属性
     */
    _getContainerProps() {
        const {x, y, width, height, opacity} = this.state;
        const {draggable, code, typeName} = this.state;
        return {
            x,
            y,
            width,
            height,
            opacity,
            draggable,
            id: code,
            name: typeName,
            ref: "container",
            ondelete: this._onDelete.bind(this),
            onmove: this._onMove.bind(this)
        };
    }
    /**
     * 获取矩形边框坐标
     */
    _getRectBorderPoints(width, height) {
        const xMax = width - 0.5;
        const yMax = height - 0.5;
        let points = [];
        // 左上角坐标
        points = points.concat([0.5, 0.5]);
        // 右上角坐标
        points = points.concat([xMax, 0.5]);
        // 右下角坐标
        points = points.concat([xMax, yMax]);
        // 左下角坐标
        points = points.concat([0.5, yMax]);
        // 回到初始地点闭环
        points = points.concat([0.5, 0.5]);
        return points;
    }
    /**
     * 缓存状态
     */
    _cacheStatus(status) {
        if (this._statusPool.length >= 10) {
            this._statusPool.shift();
        }
        this._statusPool.push(status);
    }
    /**
     * 处理状态
     * @desc 需要被重写
     */
    _handleStatus() {}
    /**
     * 通知stage数据变化
     */
    _handleDataChange() {
        const data = this.getData();
        this.executeEvent('element.change', [data]);
    }
    /**
     * 失焦事件
     */
    _onBlur(code) {
        if (this.state.code != code && this.state.status == this._STATUS_ACTIVE_) {
            this.setStatus();
        }
    }
    _onMove(e) {
        let {x, y} = this.state;
        switch (e.keyCode) {
            case 37:
                x--;
                break;
            case 38:
                y--;
                break;
            case 39:
                x++;
                break;
            case 40:
                y++;
                break;
        }
        this.setState({
            x,
            y
        }, () => {
            this._noticeConnectorUpdate();
        });
    }
    _onDelete() {
        const {code, typeName, prevElements, nextElements} = this.state;
        if (typeName == 'StartEvent') {
            return;
        }
        const relates = prevElements.concat(nextElements);
        this.executeEvent('element.delete', [code, relates, typeName]);
    }
    /**
     * 设置状态
     */
    setStatus(status = '_STATUS_DEFAULT_', callback) {
        this._handleStatus(status);
        this._cacheStatus(status);
        this.setState({
            status
        }, callback);
    }
    /**
     * 设置坐标
     */
    setAxis(x, y, callback) {
        this.setState({
            x,
            y
        }, callback);
    }
    setCursor(cursor = 'default') {
        document.body.style.cursor = cursor;
    }
    /**
     * 返回节点数据，该数据用于渲染图形
     */
    getData() {
        return null;
    }
    componentWillMount() {
        if (!this.props.noEvents) {
            this.addEventListener('element.blur', this._onBlur.bind(this));
        }
    }
    render() {
        return null;
    }
    componentWillUnmount() {
        if (!this.props.noEvents) {
            this.removeEventListener('element.blur');
        }
    }
}
