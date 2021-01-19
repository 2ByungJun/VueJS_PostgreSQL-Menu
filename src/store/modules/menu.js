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
          url: '',
          upperMenuNm: '',
        },
        pidOptions : [],
        pageOptions: [],
        page: [],
    }),
    mutations: {
        updateMenus(state, payload){ // 메뉴정보
          state.menus = payload
        },
        updatePidOptions(state, payload){ // 상위메뉴
          state.pidOptions = payload
        },
        updatePageOptions(state, payload){ // 메뉴 정보> 대표 URL
          state.pageOptions = payload
        },
        updatePageList(state, payload){ // 페이지 정보> 페이지 데이터
          state.page = payload
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
          state.menu.url = payload.url
          state.menu.upperMenuNm = payload.upperMenuNm
        },
    },
    actions: {
        // 전체 페이지 url 
        // async selectPidOptions({commit}, data){
        //   console.log(data)
        //   await commit('onClickMenu', data)
        //   await axios.get('/vue/selectPageUrlList').then((res) => {
        //     var data = res.data
        //     var array = new Array()
        //     for(var i=0; i<data.length; i++){
        //       array.push(data[i].url)
        //     }
        //     commit('updatePageOptions', array)
        //   })
        // },

        // 메뉴 클릭시 관련 페이지 정보 호출 액션
        async selectPageOptions({commit}, data){
          await commit('onClickMenu', data) 
            await axios.post('/vue/selectPageOptionList', data.id ).then((res) => {
              commit('updatePageList', res.data)
            })
        },
        
        // 메뉴 리스트 트리형태 호출 액션
        async selectMenus({commit}){
          await axios.get('/vue/selectMenuList').then((res) => {
              var data = res.data
              var tree = new Array()
              var array = new Array()
              for(var i=0; i<data.length; i++){
                /*
                 * temp : vue-tree-list용 가공객체
                 * child : 가공된 객체(temp)를 담음(파일)
                 * parent : child의 pid와 일치하는 id값을 가져옴(폴더)
                 */
                  var temp = {
          /*menuSeq*/"id": parseInt(data[i].menuSeq), 
          /*isLeaf*/ "isLeaf": data[i].isLeaf == "Y" ? true : false,
          /*menuNm*/ "name": data[i].menuNm, 
    /*uppperMenuSeq*/"pid": parseInt(data[i].upperMenuSeq), 
            /*ustAt*/"useAt": data[i].useAt == "Y" ? "사용" : "미사용",
              /*url*/"url": data[i].url,
          /*colOrd*/ "colOrd": data[i].colOrd,
          /*pageSeq*/"pageSeq": data[i].pageSeq,
      /*upperMenuNm*/"upperMenuNm": data[i].upperMenuNm,
            /*level*/"level": data[i].level,
        /*드래그방지*/"dragDisabled": true,
                    "children": [],
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
                commit('updateMenus', tree)
          })
        }
    },
    getters: {
    }
}