
export default {
    namespaced: true, 
    state: () => ({
        menus: [],
    }),
    mutations: {
        updateState(state, payload){
            state.pages = payload
        },
    },
    actions: {
    },
    getters: {
    }
};