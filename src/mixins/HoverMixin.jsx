const HoverMixin = {
    __onMouseEnter(e) {
        this._onMouseEnter(e);
        if(this.state.status !== this._STATUS_ACTIVE_){
            this.setStatus(this._STATUS_HOVER_);
        }
    },
    __onMouseLeave(e) {
        // 恢复光标
        this.setCursor();
        this._onMouseLeave(e);
        if(this.state.status == this._STATUS_HOVER_){
            this.setStatus();
        }
    },
    _onMouseEnter() {},
    _onMouseLeave() {},
    _getHoverEvents() {
        return {onmouseenter: this.__onMouseEnter.bind(this), onmouseleave: this.__onMouseLeave.bind(this)}
    }
}
export default HoverMixin;
