import React from 'react';
import ReactDom from 'react-dom';
import 'decorators/mixin';
import BPMNComponent from 'index';
// 渲染页面
const app = <BPMNComponent/>;
ReactDom.render(app, document.getElementById('bpmn'));
