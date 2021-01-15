import axios from "axios";

export default {
    namespaced: true, 
    state: () => ({
        // id : 번호
        // isLeaf : false(폴더)/ true(파일)
        // name : 폴더 및 파일명
        // pid : 부모 id
        // children : [] 자식
        menus: [
                  {
                    "id": 1,
                    "isLeaf": false,
                    "name": "폴더 1",
                    "pid": 0,
                    "dragDisabled": true,
                    "children": [
                      {
                        "id": 2,
                        "isLeaf": true,
                        "name": "파일 1-1",
                        "dragDisabled": true,
                        "pid": 1
                      }
                    ]
                  },
                  {
                    "id": 3,
                    "isLeaf": false,
                    "name": "폴더 2",
                    "dragDisabled": true,
                    "pid": 0,
                  },
                  {
                    "id": 4,
                    "isLeaf": false,
                    "name": "폴더 3",
                    "dragDisabled": true,
                    "pid": 0
                  }
            ] ,
        menu: {
          id: '',
          isLeaf: '',
          name: '',
          pid: '',
          useAt: '',
        },
    }),
    mutations: {
        updateState(state, payload){
          state.menus = payload
        },
        onClickMenu(state, payload){
          state.menu.id = payload.id
          state.menu.isLeaf = payload.isLeaf
          state.menu.name = payload.name
          state.menu.pid = payload.pid
        }
    },
    actions: {
        async selectMenus({state}){
            await axios.get('/vue/selectMenuList').then((res) => {
                console.log(state.menus)
                console.log(res.data)
            }) 
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