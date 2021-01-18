import axios from "axios"

export default {
    namespaced: true, 
    state: () => ({
        menus: [],
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
    },
    actions: {
        async selectMenus({state}){
            await axios.get('/vue/selectMenuList').then((res) => {
                var data = res.data
                var menuDemy = new Array()
                // 위 로직을 사용하려면, 폴더와 파일을 분기시켜주는 데이터가 필요하다.
                // 없는경우 폴더보다 메뉴객체가 먼저 생성될 위험이 있다.
                // ** 아래 반복문인 경우 대처하지 않은 방안이다. **
                for(var i=0; i<data.length; i++){
                  menuDemy.push(data[i])
                }

                //var parent
                var child 
                var parent
                while(menuDemy.length > 0){
                  child = menuDemy.shift()
                  parent = menuDemy.find(test => test.menuSeq === child.upperMenuSeq)
                  // children이 없는 경우 
                  if(!Object.prototype.hasOwnProperty.call(parent,"children")){
                    parent.children = []
                    parent.children.push(child)
                    menuDemy.splice(menuDemy.findIndex(test => test.menuSeq === child.upperMenuSeq), 1)
                  }
                  
                  console.log("child : ",child)
                  console.log('parent : ',parent)
                  break;
                }
                console.log('menuDemy : ', menuDemy, menuDemy.length)
                console.log(state)
                //commit('updateState', menuDemy)
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

// id : 번호
// isLeaf : false(폴더)/ true(파일)
// name : 폴더 및 파일명
// pid : 부모 id
// children : [] 자식


// Folder
// if(data[i].isLeaf == 'N'){
//   var temp = {
//     "id": parseInt(data[i].menuSeq),
//     "isLeaf": false,
//     "name": data[i].menuNm,
//     "pid": parseInt(data[i].upperMenuSeq),
//     "useAt": data[i].useAt,
//     "dragDisabled": true,
//   }
//   menuDemy.push(temp)
// }
// File
// if(data[i].upperMenuSeq != "0"){
//   var temp = {
//     id: parseInt(data[i].menuSeq),
//     isLeaf: true,
//     name: data[i].menuNm,
//     pid: parseInt(data[i].upperMenuSeq),
//     useAt: data[i].useAt,
//     dragDisabled: true,
//   }
//   menuDemy.push(temp)
// }