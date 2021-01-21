<template>
  <div>
    <div>
      <router-link to="/menu">메뉴트리</router-link> |
      <router-link to="/copy">복사관계</router-link> 
    </div>
    <b-row>
      <b-col>
        <b-card title="메뉴">
          <MenuTree />
        </b-card>
      </b-col>
    <b-col>
      <b-card title="메뉴 정보">
        <MenuUpdate />
      </b-card>
      <br>
      <div v-if="pageInsertShow">
        <b-button type="button" @click="onCloseAddPage" variant="outline-secondary">페이지 닫기</b-button>
      </div>
      <div v-else>
        <b-button type="button" @click="onClickAddPage" variant="info">페이지 추가</b-button>
      </div>
      <div v-if="pageInsertShow">
        <b-card title="페이지 추가">
          <PageInsertTable />
        </b-card>
      </div>
      <br>
      <b-card title="페이지 정보">
        <PageTable />
      </b-card>
    </b-col>
  </b-row>
  </div>
</template>

<script>
import MenuTree from '@/views/menu/MenuTree.vue'
import MenuUpdate from '@/views/menu/MenuUpdate.vue'
import PageTable from '@/views/menu/PageTable.vue'
import PageInsertTable from '@/views/menu/PageInsertTable.vue'

export default {
  components:{
    MenuTree,
    MenuUpdate,
    PageTable,
    PageInsertTable,
  },
  computed:{
    pageInsertShow(){
      return this.$store.state.menu.pageInsertShow
    }
  },
  methods: {
    onClickAddPage(){
      this.$store.state.menu.pageInsertShow = true
    },
    onCloseAddPage(){
      this.$store.state.menu.pageInsertShow = false
    }
  }
}
</script>
