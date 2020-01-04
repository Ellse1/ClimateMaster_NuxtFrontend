<template>
    <div>
        <becomeClimateMasterPrivate :climadvices="climadvices" id="id_becomeClimateMasterPrivate"/>
    </div>
</template>
<script>
import becomeClimateMasterPrivate from '~/components/Climadvice/BecomeClimateMasterPrivate';
import axios from 'axios';
var VueScrooTo = require('vue-scrollto')
export default {
    components:{
        becomeClimateMasterPrivate
    },
    async asyncData({$axios}){
        const climadvicesData = await $axios.$get('climadvice/index');
        return {climadvices: climadvicesData.data}
    },
    data(){
        return{
            climadvices : null
        }
    },
    mounted(){
        var scroll = VueScrooTo.scrollTo('#id_becomeClimateMasterPrivate');
    },

}
</script>