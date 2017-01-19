const ClickMixin = {
    __onClick(e) {
        this.refs.container.moveToTop();
        this.setStatus(this._STATUS_ACTIVE_, () => {
            this._onClick(e);
            this.executeEvent('element.blur', [this.state.code]);
        });
    },
    _onClick(e) {},
    _getClickEvents() {
        return {onclick: this.__onClick.bind(this)}
    }
}
export default ClickMixin;
