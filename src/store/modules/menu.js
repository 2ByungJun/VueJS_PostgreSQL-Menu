import axios from "axios"
import {swalToastAlert, swalConfirm} from "@/plugins/custom-swal.js"

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
        // Menu
        pageInsertShow: false,
        pageInsertDivShow: false,
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
        resetMenu(state){
          state.menu = []
        },
        resetPageTable(state){
          state.menuPages = []
        },
        showPageInsertBtn(state){
          state.pageInsertDivShow = true
        },
        hidePageInsertBtn(state){
          state.pageInsertDivShow = false
        }
    },
    actions: {
        // 페이지 추가 > 추가버튼
        async insertMenuPage({dispatch}, data){
          // 컴포넌트 데이터 전달 - registId : 'admin'가 포함되는 중
          await axios.post('vue/insertMenuPage', data.insertPage).then(() => {
            swalToastAlert({title: '페이지가 추가되었습니다.'})
          }).catch((e)=>{
            swalToastAlert({icon: 'error', title: e})
          })
          await dispatch('onclickMenu', data.menu)
        },

        // 페이지 정보 > 삭제버튼
        async deleteMenuPage({dispatch}, data){
          await axios.post('vue/deleteMenuPage', data.deletePage).then(() => {
            swalToastAlert({title: '페이지가 삭제되었습니다.'})
          }).catch((e)=>{
            swalToastAlert({icon: 'error', title: e})
          })
          await dispatch('onclickMenu', data.menu)
        },
      
        // 루트 폴더,파일 삽입
        async insertRootMenu({dispatch}, isLeaf){
          await axios.post('vue/insertMenu', {
            'pageSeq' : 0,
            'upperMenuSeq' : 0,
            'isLeaf': isLeaf,
            'registId': 'admin',
          }).then(() => {
            swalToastAlert({title: '생성되었습니다.'})
          }).catch((e)=>{
            swalToastAlert({icon: 'error', title: e})
          })
          await dispatch('selectMenus')
        },

        // 메뉴 수정
        async updateMenu({dispatch}, data){
          // 변경된 pageSeq는 대표 URL에 따라서 백단에서 변경하고 있다.
          await axios.post('/vue/updateMenu', changeMenuVO(data)).then(() => {
            swalToastAlert({title: '수정되었습니다.'})
          }).catch((e)=>{
            swalToastAlert({icon: 'error', title: e})
          })
          await dispatch('selectMenus')
        },

        // 메뉴 삭제
        async deleteMenu({dispatch}, data){
          swalConfirm().then( async (result)=>{
            if(result.value){
              await axios.post('vue/deleteMenu', changeMenuVO(data))
              dispatch('selectMenus')
              swalToastAlert({title: '삭제되었습니다.'})
            }else{
              swalToastAlert({icon: 'error', title: '취소되었습니다.'})
            }
          })
        },

        // 메뉴 삽입
        async insertMenu({dispatch}, data){
          await axios.post('vue/insertMenu', changeMenuVO(data)).then(() => {
            swalToastAlert({title: '생성되었습니다.'})
          }).catch((e)=>{
            swalToastAlert({icon: 'error', title: e})
          })
          await dispatch('selectMenus')
        },

        
        // 상위 메뉴* selectBar
        async selectPidOptions({commit}){
          await axios.get('/vue/selectUpperMenuList').then((res) => {
            var data = res.data
            var array = []
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
            commit('updatePidOptions', array)
          })
        },

        // 대표 URL* selectBar
        async selectPageOptions({commit}, clickData){
          await axios.get('vue/selectNotConnectPage').then((res) => {
            var data = res.data
            var array = []
            if(clickData.url != null){
              array.push(clickData.url)
            }
            for(var i=0; i<data.length; i++){
              array.push(data[i].url)
            }
            commit('updatePageOptions', array)
          })
        },
        
        // 페이지 추가 컴포넌트
        async selectNotConnectPage({commit}){
          await axios.get('vue/selectNotConnectPage').then((res) => {
            commit('updateNoConnectMenuPages', res.data)
          })
        },

        // 페이지 정보 컴포넌트
        async selectConnectPage({commit}, clickData){
          await axios.post('/vue/selectPageOptionList', changeMenuVO(clickData)).then((res) => {
            commit('updatePageList', res.data) 
          })
        },


        // 메뉴 onclick
        async onclickMenu({commit, dispatch}, clickData){
          // 대표 URL* selectBar
          await dispatch('selectPageOptions', clickData)
          // 메뉴 정보 업데이트
          await commit('onClickMenu', clickData)
          // 관련 페이지 정보 컴포넌트 테이블 리스트
          await dispatch('selectConnectPage', clickData)
          // 페이지 추가 컴포넌트 업데이트
          await dispatch('selectNotConnectPage')
          // 페이지 추가버튼 보이기
          await commit('showPageInsertBtn')
        },

        
        // 메뉴 리스트 트리형태 호출 액션
        async selectMenus({commit, dispatch}){
          await axios.get('/vue/selectMenuList').then((res) => {
              var data = res.data
              var tree = []
              var array = []
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
          }).catch((e) => {
            swalToastAlert({icon:'error', title: e})
          })
          // 초기화
          await dispatch('init')
        },

        // 초기화
        async init({dispatch, commit}){
          await dispatch('selectPidOptions') // 상위메뉴 초기화
          await dispatch('selectNotConnectPage') // 페이지추가 컴포넌트 초기화
          await commit('resetMenu') // 메뉴 초기화
          await commit('resetPageTable') // 페이지 정보 컴포넌트 초기화
          await commit('hidePageInsertBtn') // 페이지추가 버튼 감추기
        }
    },
    getters: {
    }
}
