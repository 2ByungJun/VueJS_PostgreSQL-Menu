<template>
    <div>
        <b-form @submit="onSubmit">
            <b-row>
                <b-col cols="6">
                    <b-form-group
                    id="input-group-1" 
                    label="메뉴명*" 
                    label-for="input-2">
                        <b-form-input
                        id="input-1"
                        v-model="form.name"
                        placeholder="메뉴명"
                        required
                        ></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col cols="6">
                    <b-form-group
                    id="input-group-2" 
                    label="메뉴여부*" 
                    label-for="input-2">
                        <b-form-select
                        id="input-2"
                        v-model="form.useAt"
                        :options="useAtOptions"
                        required
                        ></b-form-select>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col cols="6">
                    <b-form-group 
                    id="input-group-3" 
                    label="상위메뉴*" 
                    label-for="input-3">
                        <b-form-select
                        id="input-3"
                        v-model="form.upperMenuNm"
                        :options="pidOptions"
                        required
                        ></b-form-select>
                    </b-form-group>
                </b-col>
                <b-col cols="6">
                    <b-form-group 
                    id="input-group-4" 
                    label="대표 URL*" 
                    label-for="input-4">
                        <b-form-select
                        id="input-4"
                        v-model="form.url"
                        :options="pageOptions"
                        required
                        ></b-form-select>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col cols="6">
                    <b-form-group 
                    id="input-group-5" 
                    label="정렬순서*" 
                    label-for="input-5">
                        <b-form-input
                        id="input-5"
                        v-model="form.colOrd"
                        required
                        ></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <div style="text-align-last: center;">
                <b-button type="submit" variant="outline-info">저장</b-button>
            </div>
        </b-form>
    </div>
</template>

<script>
export default {
    computed :{
        form(){
            return this.$store.state.menu.menu
        },
        pidOptions(){
            return this.$store.state.menu.pidOptions
        },
        pageOptions(){
            return this.$store.state.menu.pageOptions
        },
    },
    mounted(){
        this.$store.dispatch('menu/selectPidOptions')
    },
    data() {
        return {
            useAtOptions: ['사용', '미사용'],
        }
    },
    methods: {
        onSubmit(event) {
            event.preventDefault()
            alert(JSON.stringify(this.form))
        },
    }
}
</script>