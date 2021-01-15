<template>
  <div>
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
    </b-col>
  </b-row>
  </div>
</template>

<script>
import MenuTree from '@/views/menu/MenuTree.vue'
import MenuUpdate from '@/views/menu/MenuUpdate.vue'

export default {
  components:{
    MenuTree,
    MenuUpdate,
  }
}
</script>
