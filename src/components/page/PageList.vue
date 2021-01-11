<template>
  <div>
    <p>
      <b-button size="sm" 
        @click="selectAllRows"
        :disabled="this.$store.state.page.updateBtn == true"  
      >모두 선택</b-button>
      <b-button size="sm" @click="clearSelected">선택 초기화</b-button>
      <b-button size="sm" 
        @click="onclickAddBtn"
        v-b-tooltip.hover 
        :disabled="this.$store.state.page.insertBtn == true"
        :variant="this.$store.state.page.insertBtn == true ? 'warning' : ''"
        >등록</b-button>
      <b-button 
        size="sm" 
        @click="onclickDeleteBtn"
        v-b-tooltip.hover 
        title="선택된 데이터를 삭제"
        >삭제</b-button>
      <b-button 
      size="sm" 
      @click="onclickUpdateBtn"
      :variant="this.$store.state.page.updateBtn == true ? 'warning' : ''"
      :disabled="this.$store.state.page.updateBtn == true"
      >수정모드</b-button>
    </p>
    <span
    style="color: red"
    >
    {{ this.msg }}
    </span>
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
    result : {{result}}
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
        selected: '',
        msg: '',
        result: '',
      }
    },
    computed:{
      items(){
        return this.$store.state.page.pages
      },
      selectMode(){
        return this.$store.state.page.selectMode
      },
    },
    created(){
      this.$store.dispatch('page/selectPageList')
    },
    watch: {
      selected: function(val){
        this.msg = ''
        this.result = val[0]
        this.$emit('selected-page', val[0])
      }
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
        this.$store.state.page.selectMode = 'multi'
        this.$store.state.page.insertBtn = true
        this.$store.state.page.updateBtn = false
      },
      onclickDeleteBtn(){
        if(this.selected == ""){
          this.msg = '※ 데이터가 선택되지 않았습니다.'
        }else{
          this.msg = ''
          this.$store.dispatch('page/deletePage', this.selected)
        }
      },
      onclickUpdateBtn(){
        this.selected = ''
        this.$store.state.page.selectMode = 'single'
        this.$store.state.page.updateBtn = true
        this.$store.state.page.insertBtn = false
      }
    }
  }
</script>

<style scoped>
button.btn-sm{
  margin: 5px;
}
</style>