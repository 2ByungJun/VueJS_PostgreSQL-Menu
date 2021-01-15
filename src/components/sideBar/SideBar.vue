<template>
    <div>
    <b-button v-b-toggle.sidebar-variant>사이드바</b-button>
    <b-sidebar 
        id="sidebar-variant" 
        title="Sidebar" 
        bg-variant="dark" 
        text-variant="light" 
        shadow 
        width="30vh"
        >
        <!-- no-close-on-route-change
        no-close-on-esc
        no-close-on-backdrop 
        visible-->
        <div class="px-3 py-2">
            <nav class="mb-3">
                <b-nav vertical>
                    <b-nav-item ><router-link to="/">페이지</router-link></b-nav-item>
                    <b-nav-item > <router-link to="/menu">메뉴</router-link></b-nav-item>
                </b-nav>
            </nav>
        </div>
    </b-sidebar>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>