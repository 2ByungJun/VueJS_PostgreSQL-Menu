<template>
  <div id="app" style="width:100%">
    <div style="width: 30vh">
      <SideBar />
    </div>
    <div class="container" style="width: 80%">
      <router-view/>
    </div>
  </div>
</template>

<script>
import SideBar from './components/sideBar/SideBar.vue'

export default {
  components:{
    SideBar,
  }
}
</script>

<style scoped>

</style>