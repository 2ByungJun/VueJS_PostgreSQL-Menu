<template>
    <div>
        <button @click="addNode">Add Node</button>
        <br><br>
        <!-- default-expanded : true(펼쳐있는 상태)/false(접힌 상태) -->
        <vue-tree-list
            @click="onClick"
            @change-name="onChangeName"
            @delete-node="onDel"
            @add-node="onAddNode"
            :model="data"
            default-tree-node-name="new folder"
            default-leaf-node-name="new file"
            v-bind:default-expanded="false" 
        > 
        <template v-slot:leafNameDisplay="slotProps">
            <span>{{ slotProps.model.name }}</span>
        </template>
        <span class="icon" slot="addTreeNodeIcon">📂</span>
        <span class="icon" slot="addLeafNodeIcon">📄</span>
        <span class="icon" slot="editNodeIcon">📝</span>
        <span class="icon" slot="delNodeIcon">❌</span>
        <span class="icon" slot="leafNodeIcon">📄</span>
        <span class="icon" slot="treeNodeIcon">📂</span>
        </vue-tree-list>
        <br><br>

        <button @click="getNewTree">Get new tree</button>
        <pre>
        {{newTree}}
        </pre>
    </div>
</template>

<script>
import { VueTreeList, Tree, TreeNode } from 'vue-tree-list'
import { mapActions } from 'vuex'

export default {
    components: {
        VueTreeList
    },
    data() {
        return {
            newTree: {},
            data: new Tree(this.$store.state.menu.menus)
        }
    },
    mounted(){
        this.selectMenus()
    },
    methods: {
        ...mapActions('menu' ,[
            'selectMenus'
        ]),
        onClick(params) {
            console.log('---onClick---')
            console.log(params)
        },
        onDel(node) {
            console.log('---onDel---')
            console.log(node)
            node.remove()
        },
        onChangeName(params) {
            console.log('---onChangeName---')
            console.log(params)
        },
        onAddNode(params) {
            console.log('---onAddNode---')
            console.log(params)
        },
        addNode() {
            console.log('---addNode---')
            var node = new TreeNode({ name: 'new node', isLeaf: false })
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