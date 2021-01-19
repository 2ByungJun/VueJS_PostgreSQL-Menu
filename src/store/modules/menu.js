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
          pageSeq:'',
          colOrd: '',
        },
    }),
    mutations: {
        updateState(state, payload){
          state.menus = payload
        },
        // MenuUpdate에서 메뉴를 클릭시 정보를 전달
        onClickMenu(state, payload){
          state.menu.id = payload.id
          state.menu.isLeaf = payload.isLeaf
          state.menu.name = payload.name
          state.menu.pid = payload.pid
          state.menu.useAt = payload.useAt
          state.menu.pageSeq = payload.pageSeq
          state.menu.colOrd = payload.colOrd
        },
    },
    actions: {
        // 메뉴 불러오기 액션
        async selectMenus({commit}){
          await axios.get('/vue/selectMenuList').then((res) => {
              var data = res.data
              var tree = new Array()
              var array = new Array()
              for(var i=0; i<data.length; i++){
                /*
                 * temp : vue-tree-list용 객체
                 * child : temp 객체를 담음(파일)
                 * parent : child의 pid와 일치하는 id값을 가져옴(폴더)
                 */
                  var temp = {
                    "id": parseInt(data[i].menuSeq), // menuSeq
                    "isLeaf": data[i].isLeaf == "Y" ? true : false,
                    "name": data[i].menuNm,
                    "pid": parseInt(data[i].upperMenuSeq), // upperMenuSeq
                    "useAt": data[i].useAt == "Y" ? "사용" : "미사용",
                    "colOrd": data[i].colOrd,
                    "pageSeq": data[i].pageSeq,
                    "level": data[i].level,
                    "children": [],
                    "dragDisabled": true,
                  }
                  array.push(temp)
                  var child = temp
                  var parent = array.find(tmp => tmp.id === child.pid)
                  
                  // level 1, 2, 3
                  switch(child.level){
                    case "1":
                      tree.push(child)
                      break
                    case "2":
                      if(parent){
                        parent.children.push(child)
                      }
                      break
                    case "3":
                      if(parent){
                        parent.children.push(child)
                      }
                      break
                  }
                }
                commit('updateState', tree)
          })
        }
    },
    getters: {
    }
}