<template>
<div>
    <b-table
    :items="items"
    :fields="fields"
    responsive="sm"
    sort-icon-left
    stacked="md"
    show-empty
    >
    <template #emptyfiltered="scope">
        <h4>{{ scope.emptyText }}</h4>
    </template>
    <template #cell(actions)="row">
        <b-button size="sm" @click="deletePage(row.item)" class="mr-1">삭제</b-button>
    </template>
    </b-table>
</div>
</template>

<script>
export default {
    data() {
        return {
            fields: [
                { key: 'pageNm', label: '페이지명', sortable: true },
                { key: 'url', label: 'url', sortable: true },
                { key: 'actions', label: '삭제', sortable: false },
            ],
        }
    },
    computed:{
        items(){
            return this.$store.state.menu.menuPages
        },
        menu(){
            return this.$store.state.menu.menu
        }
    },
    methods: {
        deletePage(item) {
            this.$store.dispatch('menu/deleteMenuPage', {
                'deletePage' : {
                    'menuSeq' : this.menu.id,
                    'pageSeq' : parseInt(item.pageSeq),
                    'registId' : 'admin'
                },
                'menu' : this.menu
            })
        },
    }
}
</script>

<style scoped>
button.btn-sm{
margin: 5px;
}
</style>