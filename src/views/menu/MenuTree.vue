<template>
    <div>
        <!-- <button @click="addNode">폴더 추가</button> -->
        <!-- default-expanded : true(펼쳐있는 상태)/false(접힌 상태) -->
        <vue-tree-list
            @click="onClick"
            @change-name="onChangeName"
            @delete-node="onDel"
            @add-node="onAddNode"
            :model="menu"
            default-tree-node-name="new node"
            v-bind:default-expanded="true" 
        > 
        <template v-slot:leafNameDisplay="slotProps">
            <span>{{ slotProps.model.name }}</span>
        </template>
        <span class="icon" slot="addTreeNodeIcon" style="display:none">📂</span>
        <span class="icon" slot="addLeafNodeIcon">📃</span>
        <span class="icon" slot="editNodeIcon">📝</span>
        <span class="icon" slot="delNodeIcon">✂️</span>
        <span class="icon" slot="leafNodeIcon">📃</span>
        <span class="icon" slot="treeNodeIcon">📂</span>
        </vue-tree-list>
        <br><br>
    </div>
</template>

<script>
import { VueTreeList, Tree, TreeNode } from 'vue-tree-list'

export default {
    components: {
        VueTreeList
    },
    computed:{
        menu(){
            return new Tree(this.$store.state.menu.menus)
        }
    },
    data() {
        return {
            newTree: {},
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
                this.$store.dispatch('menu/selectPageOptions', params)
            }
        },
        onDel(node) {
            console.log('---onDel---')
            console.log(node)
            node.remove()
        },
        onChangeName(params) {
            if(params.eventTpye == "blur"){
                console.log('---onChangeName---')
                console.log(params)
            }
        },
        onAddNode(params) {
            console.log('---onAddNode---')
            console.log(params)
        },
        addNode() {
            console.log('---addNode---')
            var node = new TreeNode({ 
                name: 'new node', 
                isLeaf: false,
                addLeafNodeDisabled: true,
            })
            if (!this.data.children) this.data.children = []
            this.data.addChildren(node)
        },
        getNewTree() {
            console.log('---getNewTree---')
            var vm = this
            function _dfs(oldNode) {
            var newNode = {}

            for (var k in oldNode) {
                if (k !== 'children' && k !== 'parent') {
                newNode[k] = oldNode[k]
                }
            }

            if (oldNode.children && oldNode.children.length > 0) {
                newNode.children = []
                for (var i = 0, len = oldNode.children.length; i < len; i++) {
                newNode.children.push(_dfs(oldNode.children[i]))
                }
            }
            return newNode
            }

            vm.newTree = _dfs(vm.data)
        }
    }
}
</script> 