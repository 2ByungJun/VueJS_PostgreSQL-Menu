<template>
  <div class="page">
    <br>
    <div v-if="pageInsertShow">
      <PageInsert />
    </div>
    <div v-if="pageUpdateShow">
      <!-- 선택된 페이지 전송 props -->
      <PageUpdate :page-props="{page}" />
    </div>
    <br>
    <!-- 선택된 페이지를 받기 emit -->
    <PageList @selected-page="selectedPage"/>
    <br>
  </div>
</template>

<script>
import PageList from '@/components/page/PageList.vue'
import PageInsert from '@/components/page/PageInsert.vue'
import PageUpdate from '@/components/page/PageUpdate.vue'

export default {
  data(){
    return{
      page: '',
    }
  },
  components: {
    PageList,
    PageInsert,
    PageUpdate,
  },
  computed:{
    pageInsertShow(){
      return this.$store.state.page.insertBtn
    },
    pageUpdateShow(){
      return this.$store.state.page.updateBtn
    }
  },
  methods: {
    selectedPage(payload){
      this.page = payload
    }
  }
}
</script>
