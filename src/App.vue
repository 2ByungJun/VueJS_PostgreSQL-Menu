<template>
  <div id="app">
    <SideBar />
    <div class="container">
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
  div.container{
    max-width: 960px;
  } 

</style>