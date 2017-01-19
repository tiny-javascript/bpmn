const DragMixin = {
    /**
     * 拖拽开始事件，处理图形
     */
    __onDragStart(e) {
        if (!this.state.draggable)
            return;
        e.target.moveToTop();
        this.setStatus(this._STATUS_MOVE_);
        this.executeEvent('element.blur', [this.refs.container]);
        this._onDragStart(e);
    },
    /**
     * 拖拽移动事件，处理图形
     */
    __onDragMove(e) {
        if (!this.state.draggable)
            return;
        const {x, y} = e.target.attrs;
        this.state.x = x;
        this.state.y = y;
        this._onDragMove(e);
    },
    /**
     * 拖拽结束事件，处理图形
     */
    __onDragEnd(e) {
        if (!this.state.draggable)
            return;
        if(this.state.status == this._STATUS_CONNECT_){
            this.setStatus();
        }else{
            this.setStatus(this._STATUS_ACTIVE_);
        }
        this._onDragEnd(e);
    },
    __onDragEnter(e) {
        this.setStatus(this._STATUS_HOVER_);
        this._onDragEnter(e);
    },
    __onDragLeave(e) {
        this.setStatus(this._STATUS_DEFAULT_);
        this._onDragLeave(e);
    },
    __onDragOver(e) {
        this._onDragOver(e);
    },
    __onDrop(e) {
        this.setStatus(this._STATUS_ACTIVE_);
        this._onDrop(e);
    },
    // 拖拽开始事件，处理业务
    _onDragStart() {
        this.setCursor('move');
    },
    // 拖拽移动事件，处理业务
    _onDragMove() {},
    // 拖拽结束事件，处理业务
    _onDragEnd() {},
    // 移入事件，处理业务
    _onDragEnter() {},
    // 移出事件，处理业务
    _onDragLeave() {},
    _onDragOver() {},
    // 放下事件，处理业务
    _onDrop() {},
    /**
     * 获取所有拖拽事件
     */
    _getDragEvents() {
        const events = {
            ondragstart: this.__onDragStart.bind(this),
            ondragmove: this.__onDragMove.bind(this),
            ondragend: this.__onDragEnd.bind(this),
            ondragenter: this.__onDragEnter.bind(this),
            ondragleave: this.__onDragLeave.bind(this),
            ondragover: this.__onDragOver.bind(this),
            ondrop: this.__onDrop.bind(this)
        };
        return events;
    }
};
export default DragMixin;
