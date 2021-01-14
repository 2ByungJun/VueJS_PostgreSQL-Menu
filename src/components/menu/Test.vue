<template>
    <div>
        <!-- <input type="checkbox" v-model="checkedValues" value="1">
        <input type="checkbox" v-model="checkedValues" value="2">
        <input type="checkbox" v-model="checkedValues" value="3">
        <input type="checkbox" v-model="checkedValues" value="4">
        {{checkedValues}} -->

        <!-- <input type="radio" v-model="radioValues" value="1R">
        <input type="radio" v-model="radioValues" value="2R">
        <input type="radio" v-model="radioValues" value="3R">
        <input type="radio" v-model="radioValues" value="4R">
        {{radioValues}} -->

        <select v-model="selected" multiple>
            <option :value="{name: 'LEE'}">LEE</option>
            <option :value="{name: 'Byung'}">Byung</option>
            <option :value="{name: 'Jun'}">Jun</option>
        </select>
        {{selected}}
    </div>
</template>

<script>
export default {
    data(){
        return{
            checkedValues: [],
            radioValues: '',
            selected: '',
        }
    }
}
</script>