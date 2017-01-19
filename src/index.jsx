import React from 'react';
import EventComponent from 'others/EventComponent';
import GraphLayout from 'layouts/graph';
import ToolLayout from 'layouts/tool';
import mock from 'mock';
// 事件池对象
window.EventMap = new Map();
export default class BPMNComponent extends EventComponent {
    _onSelect(info) {
        const {title, backgroundColor} = info;
        this.refs.form.setInfo(title, backgroundColor);
    }
    _onFormSubmit(data) {
        this.setTitle(null, data.title);
        this.setBackground(null, data.color);
    }
    setButton(code, configs) {}
    setTitle(code, title) {
        this.refs.graph.setProps(code, title, 'title');
    }
    setBackground(code, color) {
        this.refs.graph.setProps(code, color, 'backgroundColor');
    }
    render() {
        const data = mock.mock1();
        return (
            <div ref="bpmn" className="bpmn-container">
                <ToolLayout/>
                <GraphLayout data={data} ref="graph" onSelect={this._onSelect.bind(this)}/>
                <FormComponent ref="form" onSubmit={this._onFormSubmit.bind(this)}/>
            </div>
        )
    }
}
class FormComponent extends React.Component {
    state = {
        title: '',
        color: '#00000'
    }
    _onTitleChange(e) {
        this.setState({
            title: e.target.value
        }, () => {
            this.props.onSubmit && this.props.onSubmit(this.state);
        });
    }
    _onColorChange(e) {
        this.setState({
            color: e.target.value
        }, () => {
            this.props.onSubmit && this.props.onSubmit(this.state);
        });
    }
    setInfo(title, color) {
        this.setState({title, color});
    }
    render() {
        return (
            <div className="bpmn-test">
                <form>
                    <div className="form-group">
                        <label htmlFor="text">文本</label>
                        <input className="form-control" ref="text" id="text" value={this.state.title} onChange={this._onTitleChange.bind(this)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="color">颜色</label>
                        <input className="form-control" type="color" id="color" value={this.state.color} onChange={this._onColorChange.bind(this)}/>
                    </div>
                </form>
            </div>
        )
    }
    componentDidMount() {
        this.refs.text.addEventListener('keydown', e => e.stopPropagation(), false);
    }
}
