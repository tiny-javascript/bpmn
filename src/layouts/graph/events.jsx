import {createConnector, getDefaultPointPosition} from 'utils/ElementUtil';
let previousElement; // 上次移入的图形
let currentConnector; // 当前连接线
let virtualCode; // 虚拟节点code
let sourceElement; // 源节点信息
// 处理节点交叉
function handleIntersection(prev, group) {
    if (prev != null) {
        return prev;
    } else {
        const sx = this.attrs.x || 0;
        const sy = this.attrs.y || 0;
        const pos = this.getPointerPosition();
        const {x, y, width, height} = group.attrs;
        const chk = pos.x - sx >= x && pos.x - sx <= x + width && pos.y - sy >= y && pos.y - sy <= y + height;
        return chk && group || null;
    }
}
const EventMethod = {
    // 节点移动事件
    _onDragMove(e) {
        // 只允许链接点移入
        if (e.target.attrs.name !== 'ConnectorPoint') {
            return;
        }
        const element = e.target.getLayer().children.reduce(handleIntersection.bind(this), null);
        // 如果移入到源节点就阻止触发事件
        if (element && sourceElement && element.attrs.id == sourceElement.code) {
            return;
        }
        // 在内部移动
        if (previousElement && element) {
            previousElement.fire('dragover', {
                type: 'dragover',
                target: previousElement,
                evt: e.evt,
                coverTarget: e.target
            }, true);
        } else if (!previousElement && element) { // 移入
            previousElement = element;
            element.fire('dragenter', {
                type: 'dragenter',
                target: element,
                evt: e.evt,
                coverTarget: e.target
            }, true);
        } else if (previousElement && !element) { // 移出
            previousElement.fire('dragleave', {
                type: 'dragleave',
                target: previousElement,
                evt: e.evt,
                coverTarget: e.target
            }, true);
            previousElement = null;
        }
    },
    _onDragEnd(e) {
        if (e.target.attrs.name !== 'ConnectorPoint') {
            return;
        }
        const pos = this.getPointerPosition();
        const element = e.target.getLayer().children.reduce(handleIntersection.bind(this), null);
        if (element && previousElement) {
            previousElement.fire('drop', {
                type: 'drop',
                target: previousElement,
                evt: e.evt
            }, true);
        }
        previousElement = null;
    },
    // 节点数据变化
    _onElementChange(data) {
        this.state.elements.set(data.props.code, data);
    },
    // 创建连接线
    _onCreateConnector(source, target, callback) {
        const {connector, virtual} = createConnector(source, target, this.state.elements);
        sourceElement = source;
        virtualCode = virtual.props.code;
        currentConnector = connector;
        callback && callback(connector.props.code, virtualCode);
        this.forceUpdate();
    },
    // 连接线进入节点
    _onConnectorMoveIn(element, callback) {
        if (!currentConnector) {
            return;
        }
        callback && callback(currentConnector);
        this._handleMove(element);
        this.forceUpdate();
    },
    // 连接线离开节点
    _onConnectorMoveOut() {
        if (!currentConnector && !virtualCode) {
            return;
        }
        this._handleMove(virtualCode);
        this.forceUpdate();
    },
    // 连接线绘制完成
    _onConnectComplete() {
        const {code, prevElements, nextElements} = currentConnector.props;
        const prev = prevElements[0];
        const next = nextElements[0];
        if (previousElement == null || next.data.type == 'VirtualElement') {
            this._onDestoryConnector();
        } else {
            this.executeEvent('element.connect.' + prev.element, ['next', code]);
            this.executeEvent('element.connect.' + next.element, ['prev', code]);
            this.state.elements.delete(virtualCode);
        }
        currentConnector = void 0;
        virtualCode = void 0;
        sourceElement = void 0;
        this.forceUpdate();
    },
    // 销毁连接线
    _onDestoryConnector() {
        const {code, nextElements} = currentConnector.props;
        const next = nextElements[0];
        if (next.data.type == 'VirtualElement') {
            this.state.elements.delete(next.element);
        }
        this.state.elements.delete(code);
        this.forceUpdate();
    },
    _onElementAdd(info, mouse) {
        this.state.tmpElement = info;
        this.state.mouse = mouse;
    },
    _onElementDelete(code, relates, elementType) {
        const {elements} = this.state;
        // 如果被删除的本身不是连接线，那么根据连接他的连接线进行删除，并删除这些连接线
        if (elementType == 'SimpleConnector') {
            relates.forEach(item => {
                this.executeEvent('element.unconnect.' + item.element, [code]);
            });
        } else {
            relates.forEach(item => {
                const connector = elements.get(item).props;
                const points = connector.prevElements.concat(connector.nextElements);
                points.forEach(item => {
                    this.executeEvent('element.unconnect.' + item.element, [connector.code]);
                });
                this.state.elements.delete(connector.code);
            })
        }
        this.state.elements.delete(code);
        this.forceUpdate();
    },
    // 处理连接线移入移出
    _handleMove(element) {
        const {props} = currentConnector;
        props.nextElements = [
            {
                element,
                position: getDefaultPointPosition(sourceElement)
            }
        ];
        props.prevElements[0].data = this.state.elements.get(props.prevElements[0].element);
        props.nextElements[0].data = this.state.elements.get(props.nextElements[0].element);
        const key = 'connector.update.' + currentConnector.props.code;
        this.executeEvent(key, [currentConnector, 'data']);
    }
}
export default EventMethod;
