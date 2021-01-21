import axios from "axios"

function changeMenuVO(data){
  return {
    "menuSeq" : data.id,
    "upperMenuSeq" : data.pid,
    "isLeaf" : data.isLeaf == true ? 'Y' : 'N',
    "pageSeq" : data.pageSeq,
    "menuNm" : data.name,
    "url" : data.url,
    "useAt" : data.useAt == "사용" ? 'Y' : 'N',
    "colOrd" : data.colOrd,
    "registId" : 'admin',
    "updateId" : 'admin',
  }
}
// dragDisabled: true,
// addTreeNodeDisabled: true,
// addLeafNodeDisabled: true,
// editNodeDisabled: true,
// delNodeDisabled: true,
function changeTreeVO(data){
  return {
    /*menuSeq*/"id": parseInt(data.menuSeq), 
    /*isLeaf*/ "isLeaf": data.isLeaf == "Y" ? true : false,
    /*menuNm*/ "name": data.menuNm, 
/*uppperMenuSeq*/"pid": parseInt(data.upperMenuSeq), 
      /*ustAt*/"useAt": data.useAt == "Y" ? "사용" : "미사용",
        /*url*/"url": data.url,
    /*colOrd*/ "colOrd": data.colOrd,
    /*pageSeq*/"pageSeq": data.pageSeq,
/*upperMenuNm*/"upperMenuNm": data.upperMenuNm,
      /*level*/"level": data.level,
  /*드래그방지*/"dragDisabled": true,
  /*수정방지*/  "editNodeDisabled": true,
  /*폴더생성방지*/ "addTreeNodeDisabled" : parseInt(data.level) > 1 ? true : false,
  /*파일생성방지*/ "addLeafNodeDisabled" : data.level == '3' ? true : false,
              "children": [],
  }
}

export default {
    namespaced: true, 
    state: () => ({
        // MenuTree
        menus: [],
        // MenuUpdate
        menu: {
          id: '',
          isLeaf: '',
          name: '',
          pid: '',
          useAt: '',
          pageSeq:'',
          colOrd: '',
          url: '',
        },
        pidOptions : [],
        pageOptions: [],
        // PageTable
        menuPages: [],
        // PageInsertTable
        noConnectMenuPages: [],
        pageInsertShow: false,
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
          state.menuPages = payload
        },
        updateNoConnectMenuPages(state, payload){
          state.noConnectMenuPages = payload
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
        },
    },
    actions: {
        // 메뉴 수정
        async updateMenu({dispatch}, data){
          // 변경된 pageSeq는 대표 URL에 따라서 백단에서 변경하고 있다.
          await axios.post('/vue/updateMenu', changeMenuVO(data))
          await dispatch('selectMenus')
        },

        // 메뉴 삭제
        async deleteMenu({dispatch}, data){
          await axios.post('vue/deleteMenu', changeMenuVO(data))
          await dispatch('selectMenus')
        },

        // 메뉴 삽입
        async insertMenu({dispatch}, data){
          console.log('data', changeMenuVO(data))
          await axios.post('vue/insertMenu', changeMenuVO(data))
          await dispatch('selectMenus')
        },

        // 페이지 추가 컴포넌트
        async selectNotConnectPage({commit}){
          await axios.get('vue/selectNotConnectPage').then((res) => {
            commit('updateNoConnectMenuPages', res.data)
          })
        },

        // 상위 메뉴*
        async selectPidOptions({commit}){
          await axios.get('/vue/selectUpperMenuList').then((res) => {
            var data = res.data
            var array = new Array()
            array.push({
              'text' : 'root',
              'value' : '0'
            })
            for(var i=0; i<data.length; i++){
              array.push({
                'text' : data[i].menuNm,  // 상위 메뉴 이름
                'value' : data[i].menuSeq // 상위 메뉴 시퀀스
              })
            }
            console.log(array)
            commit('updatePidOptions', array)
          })
        },

        // 메뉴 클릭시 관련 페이지 정보 호출 액션
        async onclickMenu({commit}, clickData){
          console.log('clickData', clickData)
          // 메뉴 정보 업데이트
          await commit('onClickMenu', clickData)
          // 관련 페이지 정보 컴포넌트 테이블 리스트
          await axios.post('/vue/selectPageOptionList', clickData.id ).then((res) => {
            commit('updatePageList', res.data) 
          })
          // 메뉴와 연결안된 페이지 리스트
          await axios.get('vue/selectNotConnectPage').then((res) => {
            var data = res.data
            var array = []
            if(clickData.url != null){
              array.push(clickData.url)
            }
            for(var i=0; i<data.length; i++){
              array.push(data[i].url)
            }
            // 대표 URL*
            commit('updatePageOptions', array)
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
                  var temp = changeTreeVO(data[i])
                  array.push(temp)
                  var child = temp
                  var parent = array.find(tmp => tmp.id === child.pid)
                  
                  // level 1, 2, 3
                  switch(child.level){
                    case "1":
                      tree.push(child)
                      break
                    default:
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
