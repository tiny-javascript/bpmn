/**
 * 事件池
 */
const EventMixin = {
    /**
     * 执行事件
     */
    executeEvent(type, args = []) {
        if (typeof type !== 'string') {
            throw '事件类型必须是字符串';
        }
        if (EventMap.has(type)) {
            const funcs = EventMap.get(type);
            funcs.map(item => item.func(...args));
        } else {
            console.log('[Event:Exec]', type + '事件不存在');
        }
    },
    /**
     * 添加事件
     */
    addEventListener(type, func) {
        if (typeof type !== 'string') {
            throw '事件类型必须是字符串';
        }
        // 如果指定了方法，方法参数为字符串
        if (typeof func !== 'function') {
            throw '事件监听方法不是一个有效的方法';
        }
        let tmp = [];
        if (EventMap.has(type)) {
            tmp = EventMap.get(type).concat({func, target: this});
        } else {
            tmp.push({func, target: this});
        }
        EventMap.set(type, tmp);
    },
    /**
     * 移除事件
     */
    removeEventListener(type) {
        if (typeof type !== 'string') {
            throw '事件类型必须是字符串';
        }
        if (EventMap.has(type)) {
            const funcs = [];
            EventMap.get(type).forEach(item => {
                if (item.target != this) {
                    funcs.push(item);
                }
            });
            if (funcs.length) {
                EventMap.set(type, funcs);
            } else {
                EventMap.delete(type);
            }
        }
    }
}
export default EventMixin;
