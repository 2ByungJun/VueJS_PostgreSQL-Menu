<template>
  <div class="page">
    <div v-if="pageInsertShow">
      <PageInsert />
    </div>
    <br>
    <PageList />
  </div>
</template>

<script>
import PageList from '@/components/page/PageList.vue'
import PageInsert from '@/components/page/PageInsert.vue'

export default {
  components: {
    PageList,
    PageInsert,
  },
  computed:{
    pageInsertShow(){
      return this.$store.state.page.addBtn
    }
  },
}
</script>
