<template>
<div>
    <b-table
    :items="items"
    :fields="fields"
    select-mode="single"
    responsive="sm"
    ref="selectableTable"
    selectable
    @row-selected="onRowSelected"
    sort-icon-left
    >
    <template #cell(selected)="{ rowSelected }">
        <template v-if="rowSelected">
        <span aria-hidden="true">&check;</span>
        <span class="sr-only">Selected</span>
        </template>
        <template v-else>
        <span aria-hidden="true">&nbsp;</span>
        <span class="sr-only">Not selected</span>
        </template>
    </template>
    </b-table>
    result : {{result}}
</div>
</template>

<script>
export default {
    data() {
        return {
            fields: [
            { key: 'pageNm', label: '페이지명', sortable: true },
            { key: 'url', label: 'url', sortable: true },
            { key: 'selected', label: '추가', sortable: false },
            ],
            selected: '',
            result: '',
        }
    },
    computed:{
        items(){
            return this.$store.state.menu.noConnectMenuPages
        },
    },
    watch: {
        selected: function(val){
            this.result = val[0]
            this.$emit('selected-page', val[0])
        }
    },
    methods: {
        onRowSelected(items) {
            this.selected = items
        },
    }
}
</script>

<style scoped>
button.btn-sm{
margin: 5px;
}
</style>