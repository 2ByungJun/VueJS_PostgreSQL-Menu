<template>
    <div>
        <b-icon icon="folder-plus" font-scale="1.2" variant="warning" @click="addRootFolder"></b-icon>
        <b-icon icon="file-earmark-plus-fill" font-scale="1.2" variant="info" @click="addRootFile"></b-icon>
        <!-- default-expanded : true(펼쳐있는 상태)/false(접힌 상태) -->
        <vue-tree-list
            @click="onClick"
            @delete-node="onDel"
            @add-node="onAddNode"
            :model="menu"
            default-tree-node-name="new node"
            v-bind:default-expanded="true" 
        > 
            <template v-slot:leafNameDisplay="slotProps">
                <span>{{ slotProps.model.name }}</span>
            </template>
            <span class="icon" slot="addTreeNodeIcon"><b-icon icon="folder-plus" font-scale="1.2" variant="warning"></b-icon></span>
            <span class="icon" slot="addLeafNodeIcon"><b-icon icon="file-earmark-plus-fill" font-scale="1.2" variant="info"></b-icon></span>
            <!-- <span class="icon" slot="editNodeIcon">📝</span> -->
            <span class="icon" slot="delNodeIcon"><b-icon icon="x-square-fill" font-scale="1.2" variant="danger"></b-icon></span>
            <span class="icon" slot="leafNodeIcon"><b-icon icon="file-earmark-fill" font-scale="1.2" variant="info"></b-icon></span>
            <span class="icon" slot="treeNodeIcon"><b-icon icon="folder-fill" font-scale="1.2" variant="warning"></b-icon></span>
        </vue-tree-list>
        <br><br>
    </div>
</template>

<script>
import { VueTreeList, Tree } from 'vue-tree-list'

export default {
    components: {
        VueTreeList
    },
    computed:{
        menu(){
            return new Tree(this.$store.state.menu.menus)
        }
    },
    mounted(){
        this.$store.dispatch('menu/selectMenus')
    },
    methods: {
        onClick(params) {
            if(String(params.id).length > 10){
                // 새로 생성된 항목 클릭시
                console.log(params)
            }else{
                // 기존 항목 클릭시
                this.$store.dispatch('menu/onclickMenu', params)
            }
        },
        onDel(node) {
            this.$store.dispatch('menu/deleteMenu', node)
        },
        onAddNode(params) {
            this.$store.dispatch('menu/insertMenu', params)
        },
        addRootFolder(){
            alert("a")
        },
        addRootFile(){
            alert("b")
        },
    }
}
</script>

<style scoped>
.b-icon.bi{
    margin-right: 5px;
}

</style>