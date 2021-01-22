import axios from 'axios'
import {swalToastAlert, swalConfirm} from "@/plugins/custom-swal.js"

export default {
    namespaced: true, 
    state: () => ({
        pages: [],
        insertBtn: false,
        updateBtn: false,
        selectMode: 'multi',
    }),
    mutations: {
        updateState(state, payload){
            state.pages = payload
        },
    },
    actions: {
        async selectPageList({commit}){
            await axios.get('/vue/selectPageList').then((res)=>{
                commit('updateState', res.data)
            })
        },
        async insertPage({commit}, data){
            await axios.post('/vue/insertPage', data).then((res)=>{
                commit('updateState', res.data)
                swalToastAlert({title: '등록되었습니다.'})
            }).catch((e) => {
                swalToastAlert({icon: 'error',title: e})
            })
        },
        async updatePage({commit}, data){
            await axios.post('/vue/updatePage', data).then((res)=>{
                commit('updateState', res.data)
                swalToastAlert({title: '수정되었습니다.'})
            }).catch((e) => {
                swalToastAlert({icon: 'error',title: e})
            })
        },
        async deletePage({commit}, data){
            swalConfirm().then( async (result) => {
                if(result.value){
                    await axios.post('/vue/deletePage', data).then((res)=>{
                        commit('updateState', res.data)
                        swalToastAlert({title: '삭제하였습니다.'})
                    }).catch((e) => {
                        swalToastAlert({icon: 'error',title: e})
                    })
                }else{
                    swalToastAlert({icon: 'error',title: '취소하였습니다.'})
                }
            })
        },
    },
    getters: {
    }
};