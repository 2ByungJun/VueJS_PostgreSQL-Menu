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
                    "isLeaf": false, // 난해
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
        // 클릭시, 메뉴 정보에 나타나게 함
        onClickMenu(state, payload){
          state.menu.id = payload.id
          state.menu.isLeaf = payload.isLeaf
          state.menu.name = payload.name
          state.menu.pid = payload.pid
        },
        // 메뉴 업데이트
    },
    actions: {
        async selectMenus({state}){
            await axios.get('/vue/selectMenuList').then((res) => {
                var data = res.data
                var temp = {
                  id: '',
                  isLeaf: false,
                  name: '',
                  pid: '',
                  useAt: '',
                  dragDisabled: true,
                }
               // conso
                var menuDemy = new Array()
                console.log('-----------------')
                // 위 로직을 사용하려면, 폴더와 파일을 분기시켜주는 데이터가 필요하다.
                // 없는경우 폴더보다 메뉴객체가 먼저 생성될 위험이 있다.
                // ** 아래 반복문인 경우 대처하지 않은 방안이다. **
                console.log(data,"처음",menuDemy)
                for(var i=0; i<data.length; i++){
                
                  // Folder
                  if(data[i].upperMenuSeq == "0"){
                    console.log(data[i].menuSeq)
                    console.log(data[i].menuNm)
                    temp.id = parseInt(data[i].menuSeq)
                    temp.pid = parseInt(data[i].upperMenuSeq)
                    // temp.isLeaf = false
                    temp.name = data[i].menuNm
                    // temp.useAt = data[i].useAt
                    console.log(temp, i)
                    console.log(menuDemy,i,'teee')
                    menuDemy.push(temp)
                    console.log(menuDemy,i)
                  }
                  // // File
                  // if(data[i].upperMenuSeq != "0"){
                  //   temp.id = parseInt(data[i].menuSeq)
                  //   temp.pid = parseInt(data[i].upperMenuSeq)
                  //   temp.isLeaf = false
                  //   temp.name = data[i].menuNm
                  //   temp.useAt = data[i].useAt
                  // }
                }
                console.log('최종',menuDemy)
                console.log('-------------------------')
                console.log(state.menus)
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