import React from 'react';
import uuid from 'uuid';
import {Stage, Layer} from 'react-konva';
import EventComponent from 'others/EventComponent';
import {createElement} from 'utils/ElementUtil';
import events from './events';
@mixin(events)
export default class GraphLayoutComponent extends EventComponent {
    static defaultProps = {
        data: new Map(),
        width: 1016,
        height: 516
    }
    state = {
        scale: {
            x: 1,
            y: 1
        },
        activeElement: null,
        selected: false,
        elements: this.props.data,
        tmpElement: {}, // 添加的临时对象
        mouse: {} // 鼠标在临时节点的位置
    }
    /**
     * 初始化节点信息
     */
    _initElement(elements) {
        return ([code, info]) => {
            return createElement(info, elements);
        }
    }
    _formatElement(code, info) {
        return {
            type: info.type,
            props: {
                key: code,
                code: code,
                width: info.props.width,
                height: info.props.height,
                borderWidth: info.props.borderWidth,
                draggable: true,
                prevElements: [],
                nextElements: []
            }
        }
    }
    // 文档点击事件，触发失焦
    _onDocumentClick() {
        this.executeEvent('element.blur');
    }
    _onDocumentKeyDown(e) {
        const {activeElement} = this.state;
        if (activeElement) {
            if (e.keyCode == 8) {
                e.preventDefault();
                activeElement.fire('delete', {
                    type: 'delete',
                    target: activeElement,
                    evt: e.evt
                }, true);
            } else if (e.keyCode > 36 && e.keyCode < 41) {
                activeElement.fire('move', {
                    type: 'move',
                    target: activeElement,
                    evt: e.evt,
                    keyCode: e.keyCode
                }, true);
            }
        }
    }
    // 画布点击事件，获取当前活动节点
    _onCanvasClick(e) {
        let target = e.target;
        while (!target.attrs.id) {
            target = target.parent;
        }
        this.state.activeElement = target;
        this.state.selected = true;
        const info = this.state.elements.get(target.attrs.id);
        if (info.type == 'SimpleTask') {
            this.props.onSelect && this.props.onSelect(this.state.elements.get(target.attrs.id).props);
        }
    }
    // 画布内容点击事件，判断时候点击到空白区域并触发失焦
    _onCanvasContentClick(e) {
        if (!this.state.selected) {
            this.executeEvent('element.blur');
        }
        this.state.selected = false;
    }
    _onDrop(e) {
        let {x, y} = this.refs.stage.node.attrs;
        x = x || 0;
        y = y || 0;
        const code = uuid.v4();
        const element = this._formatElement(code, this.state.tmpElement);
        element.props.x = e.layerX - x - this.state.mouse.x;
        element.props.y = e.layerY - y - this.state.mouse.y;
        this.state.elements.set(element.props.code, element);
        this.forceUpdate();
    }
    _onDragOver(e) {
        e.preventDefault();
    }
    setProps(code, value, attr) {
        const {activeElement, elements} = this.state;
        if (!code && !activeElement) {
            return;
        }
        if (!value) {
            return;
        }
        code = code || activeElement.attrs.id;
        const info = elements.get(code);
        info.props[attr] = value;
        this.executeEvent('element.update.' + code, [value, attr]);
    }
    /**
     * 阻止参数变化触发重新渲染
     */
    shouldComponentUpdate(state, props) {
        return state != this.state;
    }
    componentWillMount() {
        const {width, height} = this.props;
        const {elements} = this.state;
        if (!elements.size) {
            const code = uuid.v4();
            const info = {
                type: 'StartEvent',
                props: {
                    key: code,
                    code: code,
                    draggable: true,
                    radius: 30,
                    x: 30,
                    y: height / 2 - 15,
                    prevElements: [],
                    nextElements: []
                }
            }
            elements.set(code, info);
        }
    }
    _onContentWheel(e) {
        const {scale} = this.state;
        this.setState({
            scale: {
                x: scale.x * e.evt.wheelDelta,
                y: scale.y * e.evt.wheelDelta
            }
        })
    }
    render() {
        const {elements, scale} = this.state;
        const {width, height} = this.props;
        const events = {
            onclick: this._onCanvasClick.bind(this),
            oncontentclick: this._onCanvasContentClick.bind(this),
            ondragmove: this._onDragMove,
            ondragend: this._onDragEnd,
            oncontentdrop: this._onDrop.bind(this),
            oncontentwheel: this._onContentWheel.bind(this)
        }
        return (
            <div ref="graph" className="bpmn-graph">
                <Stage ref="stage" tabIndex="1" width={width} height={height} draggable={true} {...events}>
                    <Layer>
                        {[...elements].map(this._initElement.call(this, elements))}
                    </Layer>
                </Stage>
            </div>
        );
    }
    componentDidMount() {
        document.addEventListener('click', this._onDocumentClick.bind(this));
        document.addEventListener('keydown', this._onDocumentKeyDown.bind(this));
        this.refs.graph.addEventListener('drop', this._onDrop.bind(this));
        this.refs.graph.addEventListener('click', (e) => e.stopPropagation());
        this.refs.graph.addEventListener('dragover', this._onDragOver.bind(this));
        this.addEventListener('connector.create', this._onCreateConnector.bind(this));
        this.addEventListener('connector.destory', this._onDestoryConnector.bind(this));
        this.addEventListener('connector.move.in', this._onConnectorMoveIn.bind(this));
        this.addEventListener('connector.move.out', this._onConnectorMoveOut.bind(this));
        this.addEventListener('connector.complete', this._onConnectComplete.bind(this));
        this.addEventListener('element.change', this._onElementChange.bind(this));
        this.addEventListener('element.add', this._onElementAdd.bind(this));
        this.addEventListener('element.delete', this._onElementDelete.bind(this));
    }
    componentWillUnmount() {
        document.removeEventListener('click');
        document.removeEventListener('keyup');
        this.refs.graph.removeEventListener('drop');
        this.refs.graph.removeEventListener('click');
        this.refs.graph.removeEventListener('dragover');
        this.removeEventListener('connector.create');
        this.removeEventListener('connector.destory');
        this.removeEventListener('connector.move.in');
        this.removeEventListener('connector.move.out');
        this.removeEventListener('connector.complete');
        this.removeEventListener('element.change');
        this.removeEventListener('element.add');
        this.removeEventListener('element.delete');
    }
}
