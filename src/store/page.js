import axios from 'axios'

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
            })
        },
        async updatePage({commit}, data){
            await axios.post('/vue/updatePage', data).then((res)=>{
                commit('updateState', res.data)
            })
        },
        async deletePage({commit}, data){
            await axios.post('/vue/deletePage', data).then((res)=>{
                commit('updateState', res.data)
            })
        },
    },
    getters: {
    }
};