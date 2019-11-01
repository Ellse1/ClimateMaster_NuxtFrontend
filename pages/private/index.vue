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
    layout: 'indexLayout',
    components:{
        becomeClimateMasterPrivate
    },
    async asyncData(){
        const climadvicesData = await axios.get('http://localhost:8000/api/climadvice/index');
        return {climadvices: climadvicesData.data.data}
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