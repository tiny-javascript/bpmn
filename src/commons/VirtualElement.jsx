import React from 'react';
import {Group} from 'react-konva';
import LogicElement from './LogicElement';
export default class VirtualElement extends LogicElement {
    _update(e) {
        const stage = e.target.getStage();
        let {x, y} = stage.attrs;
        x = x || 0;
        y = y || 0;
        this.state.x = e.evt.layerX - x;
        this.state.y = e.evt.layerY - y;
        this._noticeConnectorUpdate();
    }
    getData() {
        const {code, x, y, width, height} = this.state;
        const {prevElements, nextElements, typeName} = this.state;
        return {
            type: 'VirtualElement',
            props: {
                code,
                x,
                y,
                width,
                height,
                prevElements,
                nextElements
            }
        }
    }
    componentWillMount() {
        super.componentWillMount();
        this.addEventListener('element.virtual.update.' + this.state.code, this._update.bind(this));
    }
    render() {
        return (
            <Group visible={false}></Group>
        )
    }
    componentWillUnmount() {
        super.componentWillUnmount();
        this.removeEventListener('element.virtual.update.' + this.state.code);
    }
}
