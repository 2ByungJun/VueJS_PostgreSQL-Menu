<template>
    <div>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-row>
                <b-col cols="6">
                    <b-form-group
                    id="input-group-1" 
                    label="메뉴명*" 
                    label-for="input-2">
                        <b-form-input
                        id="input-1"
                        v-model="form.email"
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
                        v-model="form.food"
                        :options="foods"
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
                        v-model="form.food"
                        :options="foods"
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
                        v-model="form.food"
                        :options="foods"
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
                    v-model="form.name"
                    required
                    ></b-form-input>
                </b-form-group>
                </b-col>
            </b-row>

            <b-button type="submit" variant="primary">저장</b-button>
        </b-form>
    </div>
</template>

<script>
export default {
    data() {
    return {
        form: {
        email: '',
        name: '',
        food: null,
        checked: []
        },
        foods: [
            { text: 'Select One', value: null }, 
            'Carrots', 'Beans', 'Tomatoes', 'Corn'],
        show: true
    }
    },
    methods: {
    onSubmit(event) {
        event.preventDefault()
        alert(JSON.stringify(this.form))
    },
    onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.name = ''
        this.form.food = null
        this.form.checked = []
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
        this.show = true
        })
    }
    }
}
</script>