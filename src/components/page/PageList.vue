<template>
  <div>
    <p>
      <b-button size="sm" @click="selectAllRows">모두 선택</b-button>
      <b-button size="sm" @click="clearSelected">선택 초기화</b-button>
      <b-button size="sm" @click="onclickAddBtn">등록</b-button>
      <b-button size="sm" @click="onclickDeleteBtn">삭제</b-button>
    </p>
    <b-table
      :items="items"
      :fields="fields"
      :select-mode="selectMode"
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
  </div>
</template>

<script>
  export default {
    data() {
      return {
        fields: [
          { key: 'selected', sortable: false },
          { key: 'pageNm', sortable: true },
          { key: 'pageNmEn', sortable: true },
          { key: 'url', sortable: true },
          { key: 'registDt', sortable: true },
          { key: 'registId', sortable: false }
        ],
        selectMode: 'multi',
        selected: []
      }
    },
    computed:{
      items(){
        return this.$store.state.page.pages
      }
    },
    created(){
      this.$store.dispatch('page/selectPageList')
    },
    methods: {
      onRowSelected(items) {
        this.selected = items
      },
      selectAllRows() {
        this.$refs.selectableTable.selectAllRows()
      },
      clearSelected() {
        this.$refs.selectableTable.clearSelected()
      },
      onclickAddBtn() {
        this.$store.state.page.addBtn = true
      },
      onclickDeleteBtn(){
        this.$store.dispatch('page/deletePage', this.selected)
      }
    }
  }
</script>

<style scoped>
button.btn-sm{
  margin: 5px;
}
</style>