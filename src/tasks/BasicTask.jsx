import React from 'react';
import LogicElement from 'commons/LogicElement';
export default class BasicTask extends LogicElement {
    /**
     * 变形中
     */
    _onResize(e) {
        const state = this._resize(e, this.state, this._spins);
        this.state.x = state.x;
        this.state.y = state.y;
        this.state.width = state.width;
        this.state.height = state.height;
        setTimeout(() => {
            this._noticeConnectorUpdate();
        }, 10);
        this.forceUpdate();
    }
    _renderIcons() {
        return null;
    }
    componentWillMount() {
        super.componentWillMount();
        const {title, deletable, icons} = this.props;
        this.state.icons = icons;
        this.state.title = title;
        this.state.deletable = deletable;
    }
}
