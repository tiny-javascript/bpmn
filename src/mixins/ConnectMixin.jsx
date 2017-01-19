const ConnectorMixin = {
    __onConnectStart(e) {
        this.state.draggable = false;
        if (!this.state.connectStatus.next) {
            return;
        }
        this.setCursor('crosshair');
        const target = {
            x: this.state.x + e.source.x,
            y: this.state.y + e.source.y
        }
        const source = {
            code: this.state.code,
            position: e.source.position
        }
        const callback = (connectorCode, virtualCode) => {
            this._connecterCode = connectorCode;
            this._virtualCode = virtualCode;
        }
        this.executeEvent('connector.create', [source, target, callback]);
        this._onConnectStart(e);
        this.setStatus(this._STATUS_CONNECT_);
    },
    __onConnect(e) {
        if (!this.state.connectStatus.next) {
            return;
        }
        this.executeEvent('element.virtual.update.' + this._virtualCode, [e]);
        this._onConnect(e);
    },
    __onConnectEnd(e) {
        this.state.draggable = true;
        if (!this.state.connectStatus.next) {
            return;
        }
        this.setCursor();
        this._virtualCode = void 0;
        this._connecterCode = void 0;
        this.executeEvent('connector.complete');
        this._onConnectEnd(e);
    },
    _onConnectStart() {},
    _onConnect() {},
    _onConnectEnd() {},
    _getConnectEvents() {
        return {onConnectStart: this.__onConnectStart.bind(this), onConnect: this.__onConnect.bind(this), onConnectEnd: this.__onConnectEnd.bind(this)};
    }
};
export default ConnectorMixin;
