import React from 'react';
import uuid from 'uuid';
import EventComponent from 'others/EventComponent';
import {Stage, Layer} from 'react-konva';
import {createElement} from 'utils/ElementUtil';
const mouse = {
    x: 0,
    y: 0
};
export default class ToolLayoutComponent extends EventComponent {
    static defaultProps = {
        width: 100,
        height: 60,
        configs: [
            {
                type: 'EndEvent',
                title: '结束'
            }, {
                type: 'ParallelGateway',
                title: '并行'
            }, {
                type: 'ExclusiveGateway',
                title: '条件'
            }, {
                type: 'ComplexGateway',
                title: '合并'
            }, {
                type: 'SimpleTask',
                title: '任务'
            }
        ]
    }
    _getInfo(type, width, height) {
        const code = uuid.v4();
        const borderWidth = 2;
        const radius = height / 2;
        const info = {
            type,
            props: {
                code,
                x: borderWidth,
                y: borderWidth,
                key: code,
                pointVisible: false,
                draggable: false,
                noEvents: true,
                borderWidth
            }
        }
        switch (type) {
            case 'ParallelGateway':
            case 'InclusiveGateway':
            case 'ExclusiveGateway':
            case 'ComplexGateway':
            case 'EndEvent':
                info.props.radius = radius;
                info.props.width = height + borderWidth * 2;
                info.props.height = height + borderWidth * 2;
                break;
            case 'SimpleTask':
                info.props.width = width;
                info.props.height = height;
                break;
        }
        return info;
    }
    _format(item, width, height) {
        const info = this._getInfo(item.type, width, height);
        const style = {
            width: info.props.width + 4,
            height: info.props.height + 4
        };
        return (
            <div className="bpmn-tool-item" key={item.type}>
                <section ref={item.type} className="bpmn-tool-item-wrap" style={style} draggable onDragStart={e => this._onItemDragStart(e, info)}>
                    <Stage {...style}>
                        <Layer>{createElement(info)}</Layer>
                    </Stage>
                    <div className="bpmn-tool-item-dragger"></div>
                </section>
                <p>{item.title}</p>
            </div>
        )
    }
    _onItemMouseMove(e) {
        mouse.x = e.offsetX - e.pageX;
        mouse.y = e.offsetY - e.pageY;
    }
    _onItemDragStart(e, info) {
        mouse.x = mouse.x + e.pageX;
        mouse.y = mouse.y + e.pageY;
        this.executeEvent('element.add', [info, mouse]);
    }
    shouldComponentUpdate(state, props) {
        return state != this.state;
    }
    render() {
        const {width, height, configs} = this.props;
        return (
            <div className="bpmn-tool">
                {configs.map(item => this._format(item, width, height))}
            </div>
        )
    }
    componentDidMount() {
        for (let type in this.refs) {
            this.refs[type].addEventListener('mousemove', this._onItemMouseMove, false);
        }
    }
    componentWillUnmount() {
        for (let type in this.refs) {
            this.refs[type].reomoveEventListener('mousemove');
        }
    }
}
