export default {
    namespaced: true, 
    state: () => ({
        // id : 번호
        // isLeaf : false(폴더)/ true(파일)
        // name : 폴더 및 파일명
        // pid : 부모 id
        // children : [] 자식
        menus: [{
            "id": 0,
            "isLeaf": false,
            "name": "root",
            "children": [
                {
                    "id": 1610673642530,
                    "isLeaf": false,
                    "name": "new node",
                    "pid": 0
                },
                {
                    "id": 1610673642658,
                    "isLeaf": false,
                    "name": "new node",
                    "pid": 0,
                    "children": [
                    {
                        "id": 1610673644810,
                        "isLeaf": false,
                        "name": "new folder",
                        "pid": 1610673642658,
                        "children": [
                        {
                            "id": 1610673648274,
                            "isLeaf": true,
                            "name": "new file",
                            "pid": 1610673644810
                        }
                        ]
                    },
                    {
                        "id": 1610673646738,
                        "isLeaf": true,
                        "name": "new file",
                        "pid": 1610673642658
                    }
                    ]
                }
            ]
        }],
    }),
    mutations: {
        updateState(state, payload){
            state.menus = payload
        },
    },
    actions: {
        async selectMenus({commit}){
            await commit('updateState', menusData)
        }
    },
    getters: {
    }
};


// dragDisabled: true,
// addTreeNodeDisabled: true,
// addLeafNodeDisabled: true,
// editNodeDisabled: true,
// delNodeDisabled: true,
// disabled: true
const menusData = [{
        name: 'Node 1',
        id: 1,
        pid: 0,
        children: [
            {
                name: 'Node 1-2',
                id: 2,
                isLeaf: true,
                pid: 1
            }
        ]
    },
    {
        name: 'Node 2',
        id: 3,
        pid: 0,
    },
    {
        name: 'Node 3',
        id: 4,
        pid: 0
    }
]