export default {
    mock() {
        const elements = new Map();
        elements.set('task1', {
            type: 'SimpleTask',
            props: {
                code: 'task1',
                x: 360,
                y: 300,
                width: 100,
                height: 60,
                prevElements: [],
                nextElements: []
            }
        });
        elements.set('task2', {
            type: 'SimpleTask',
            props: {
                code: 'task2',
                x: 560,
                y: 400,
                width: 100,
                height: 60,
                prevElements: [],
                nextElements: []
            }
        });
        elements.set('task3', {
            type: 'SimpleTask',
            props: {
                code: 'task3',
                x: 760,
                y: 200,
                width: 100,
                height: 60,
                prevElements: [],
                nextElements: []
            }
        });
        return elements;
    },
    mock1() {
        const elements = new Map();
        elements.set('start', {
            type: 'StartEvent',
            props: {
                code: 'start',
                x: 0,
                y: 300,
                radius: 30,
                prevElements: [],
                nextElements: ['connector0']
            }
        });
        elements.set('task0', {
            type: 'SimpleTask',
            props: {
                code: 'task0',
                x: 160,
                y: 300,
                width: 100,
                height: 60,
                title: "任务1",
                backgroundColor: "#79ba5e",
                prevElements: ['connector0'],
                nextElements: ['connector1']
            }
        });
        elements.set('gateway0', {
            type: 'ParallelGateway',
            props: {
                code: 'gateway0',
                x: 360,
                y: 300,
                radius: 30,
                prevElements: ['connector1'],
                nextElements: ['connector2', 'connector3']
            }
        });
        elements.set('task1', {
            type: 'SimpleTask',
            props: {
                code: 'task1',
                x: 560,
                y: 200,
                width: 100,
                height: 60,
                title: "任务2",
                backgroundColor: "#79ba5e",
                prevElements: ['connector2'],
                nextElements: ['connector4']
            }
        });
        elements.set('task2', {
            type: 'SimpleTask',
            props: {
                code: 'task2',
                x: 560,
                y: 400,
                width: 100,
                height: 60,
                title: "任务3",
                backgroundColor: "#cba051",
                prevElements: ['connector3'],
                nextElements: ['connector5']
            }
        });
        elements.set('gateway1', {
            type: 'ComplexGateway',
            props: {
                code: 'gateway1',
                x: 760,
                y: 300,
                radius: 30,
                prevElements: [
                    'connector4', 'connector5'
                ],
                nextElements: ['connector6']
            }
        });
        elements.set('end', {
            type: 'EndEvent',
            props: {
                code: 'end',
                x: 960,
                y: 300,
                radius: 30,
                prevElements: ['connector6'],
                nextElements: []
            }
        });
        elements.set('connector0', {
            type: 'SimpleConnector',
            props: {
                code: 'connector0',
                prevElements: [
                    {
                        position: 'east',
                        element: 'start'
                    }
                ],
                nextElements: [
                    {
                        position: 'west',
                        element: 'task0'
                    }
                ]
            }
        });
        elements.set('connector1', {
            type: 'SimpleConnector',
            props: {
                code: 'connector1',
                prevElements: [
                    {
                        position: 'east',
                        element: 'task0'
                    }
                ],
                nextElements: [
                    {
                        position: 'west',
                        element: 'gateway0'
                    }
                ]
            }
        });
        elements.set('connector2', {
            type: 'SimpleConnector',
            props: {
                code: 'connector2',
                prevElements: [
                    {
                        position: 'north',
                        element: 'gateway0'
                    }
                ],
                nextElements: [
                    {
                        position: 'west',
                        element: 'task1'
                    }
                ]
            }
        });
        elements.set('connector3', {
            type: 'SimpleConnector',
            props: {
                code: 'connector3',
                prevElements: [
                    {
                        position: 'south',
                        element: 'gateway0'
                    }
                ],
                nextElements: [
                    {
                        position: 'west',
                        element: 'task2'
                    }
                ]
            }
        });
        elements.set('connector4', {
            type: 'SimpleConnector',
            props: {
                code: 'connector4',
                prevElements: [
                    {
                        position: 'east',
                        element: 'task1'
                    }
                ],
                nextElements: [
                    {
                        position: 'north',
                        element: 'gateway1'
                    }
                ]
            }
        });
        elements.set('connector5', {
            type: 'SimpleConnector',
            props: {
                code: 'connector5',
                prevElements: [
                    {
                        position: 'east',
                        element: 'task2'
                    }
                ],
                nextElements: [
                    {
                        position: 'south',
                        element: 'gateway1'
                    }
                ]
            }
        });
        elements.set('connector6', {
            type: 'SimpleConnector',
            props: {
                code: 'connector6',
                prevElements: [
                    {
                        position: 'east',
                        element: 'gateway1'
                    }
                ],
                nextElements: [
                    {
                        position: 'west',
                        element: 'end'
                    }
                ]
            }
        });
        return elements;
    }
}
