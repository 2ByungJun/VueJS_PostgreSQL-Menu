<template>
    <b-card>
        <b-form 
            @submit="onSubmit" 
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

            <b-button type="submit" variant="outline-success">수정</b-button>
            <b-button @click="cancel" variant="outline-danger">닫기</b-button>
        </b-form>
    </b-card>
</template>

<script>
export default {
    props: {
        pageProps: Object
    },
    computed:{
        form(){
            if(!this.pageProps.page){
                // undefined
                return{
                    pageNm: '',
                    pageNmEn: '',
                    url: '',
                    registId: ''
                }
            }else{
                return {
                    pageSeq: this.pageProps.page.pageSeq,
                    pageNm: this.pageProps.page.pageNm,
                    pageNmEn: this.pageProps.page.pageNmEn,
                    url: this.pageProps.page.url,
                    registId: this.pageProps.page.registId
                }
            }
            
        }
    },
    methods: {
        onSubmit(event) {
            event.preventDefault()
            console.log(this.form)
            this.$store.dispatch('page/updatePage', this.form)
        },
        cancel(){
            this.$store.state.page.updateBtn = false
            this.$store.state.page.selectMode = 'multi'
        }
    }
}
</script>

<style scoped>
.btn{
    margin: 2px;
}
</style>