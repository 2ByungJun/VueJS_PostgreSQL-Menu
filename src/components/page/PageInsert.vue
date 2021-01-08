<template>
    <b-card>
        <b-form 
            @submit="onSubmit" 
            @reset="onReset" 
            >
            <b-row>
                <b-form-group
                    id="input-group-1"
                    label="페이지명"
                    label-for="input-1"
                    class="col-lg-6"
                >
                    <b-form-input
                        id="input-1"
                        v-model="form.pageNm"
                        type="text"
                        required
                    ></b-form-input>
                </b-form-group>

                <b-form-group
                    id="input-group-1"
                    label="페이지영문명"
                    label-for="input-1"
                    class="col-lg-6"
                >
                    <b-form-input
                        id="input-1"
                        v-model="form.pageNmEn"
                        type="text"
                        required
                    ></b-form-input>
                </b-form-group>
            </b-row>

            <b-row>
                <b-form-group
                    id="input-group-1"
                    label="url"
                    label-for="input-1"
                    class="col-lg-6"
                >
                    <b-form-input
                        id="input-1"
                        v-model="form.url"
                        type="text"
                        placeholder="경로를 작성해주세요."
                        required
                    ></b-form-input>
                </b-form-group>

                <b-form-group
                    id="input-group-1"
                    label="등록인"
                    label-for="input-1"
                    class="col-lg-6"
                >
                    <b-form-input
                        id="input-1"
                        v-model="form.registId"
                        type="text"
                        placeholder="등록인을 작성해주세요."
                        required
                    ></b-form-input>
                </b-form-group>
            </b-row>

            <b-button type="submit" variant="outline-success">추가</b-button>
            <b-button @click="cancel" variant="outline-danger">닫기</b-button>
            <b-button type="reset" variant="outline-warning">초기화</b-button>
        </b-form>
    </b-card>
</template>

<script>
export default {
    data() {
        return {
            form: {
                pageNm: '',
                pageNmEn: '',
                url: '/',
                registId: 'admin',
            },
        }
    },
    methods: {
        onSubmit(event) {
            event.preventDefault()
            this.$store.dispatch('page/insertPage', this.form)
        },
        onReset(event) {
            event.preventDefault()
            this.form.pageNm = ''
            this.form.pageNmEn = ''
            this.form.url = '/'
            this.form.registId = ''
        },
        cancel(){
            this.$store.state.page.addBtn = false
        }
    }
}
</script>

<style scoped>
.btn{
    margin: 2px;
}
</style>