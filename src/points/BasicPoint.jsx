import React from 'react';
import BasicElement from 'commons/BasicElement';
import HoverMixin from 'mixins/HoverMixin';
import DragMixin from 'mixins/DragMixin';
@mixin(HoverMixin, DragMixin)
export default class BasicPoint extends BasicElement {
    setVisible(visible) {
        this.setState({visible});
    }
    componentWillReceiveProps(props) {
        this.state.visible = props.visible;
        this.state.x = props.x;
        this.state.y = props.y;
    }
    shouldComponentUpdate(props, state) {
        return this.props != props || this.state != state;
    }
    componentWillMount() {
        this._dragEvents = this._getDragEvents();
        this._hoverEvents = this._getHoverEvents();
        this.state.radius = this.props.radius;
        this.state.visible = this.props.visible;
    }
}
