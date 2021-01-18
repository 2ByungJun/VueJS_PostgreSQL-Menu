<template>
<div>
    <div>
    <router-link to="/menu">메뉴트리</router-link> |
    <router-link to="/copy">복사관계</router-link> 
    </div>
    <b-row>
    <b-col>
        <b-card title="예제1" subTitle="배열인 경우">
            <button @click="aa">aa</button>
            <br>
            {{testa}}
            <img
                src="@/assets/aa.png"
                width="400"
                height="400"
            >
        </b-card>
    </b-col>
    <b-col>
        <b-card title="예제2" subTitle="객체인경우 얕은복사시">
            <button @click="bb">bb</button>
            <br>
            {{testb}}
            <img
                src="@/assets/bb.png"
                width="400"
                height="400"
            >
        </b-card>
    </b-col>
    <b-col>
        <b-card title="예제3" subTitle="lodash로 깊은복사">
            <button @click="cc">cc</button>
            <br>
            {{testc}}
            <img
                src="@/assets/cc.png"
                width="400"
                height="450"
            >
        </b-card>
    </b-col>
</b-row>
</div>
</template>

<script>
import _ from 'lodash'

export default {
    data(){
        return {
            testa: '',
            testb: '',
            testc: '',
        }
    },
    methods:{
        aa(){
            var array = ['사과', '포도', '바나나']
            var name = ''

            for(var i=0; i<1; i++){
                name = '망고'
                array.push(name)

                name = '딸기' 
                array.push(name)
            }
            this.testa = array
        },
        bb(){
            var array = ['사과', '포도', '바나나']
            var temp = {
                name : ''
            }

            for(var i=0; i<1; i++){
                temp.name = '망고'
                array.push(temp.name)
                // array.push(temp)  // temp의 주소값을 바라보게 함

                temp.name = '딸기'  
                array.push(temp.name)
                // array.push(temp)
            }
            this.testb = array
        },
        cc(){
            var array = ['사과', '포도', '바나나']
            var temp = {
                name : ''
            }

            for(var i=0; i<1; i++){
                temp.name = '망고'

                array.push(_.cloneDeep(temp))
                
                temp.name = '딸기'
                
                array.push(_.cloneDeep(temp))
                
            }
            this.testc = array
        }
    }
}
</script>
