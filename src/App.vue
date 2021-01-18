<template>
  <div id="app">
    <div>
      <SideBar />
    </div>
    <div class="container" >
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