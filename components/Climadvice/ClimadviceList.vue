<template>
    <div class="row">
        <div class="col-md-4" v-for="climadvice in climadvices" v-bind:key="climadvice.id" :id="climadvice.name" v-on:click="climadviceClicked(climadvice.name)">
            <div class="card mb-3">
                <div class="card-body">
                    <h5>{{climadvice.title}}</h5>
                    <p class="card-text">
                        {{climadvice.shortDescription}}
                    </p>          
                    <div class="text-center">
                        <img :src="'http://localhost:8000/images/climadviceIcons/' + climadvice.iconName" class="mx-center" alt="not found"  width="100px"/>                        
                    </div>
                </div>
            </div>
        </div>

        <!-- To add a climadvice -->

        <climadviceAdd v-if="loggedIn" @climadviceAdded="climadviceAdded"/>


    </div>
</template>

<script>
import climadviceAdd from '~/components/Climadvice/ClimadviceAdd';
var VueScrollTo = require('vue-scrollto');
var openedClimadviceID = null;
export default {
    props:['climadvices'],
    components:{
        climadviceAdd
    },
    methods:{
        climadviceAdded(climadvice){
            this.climadvices.push(climadvice);
        },
        climadviceClicked(climadviceID){
            if(openedClimadviceID != null && openedClimadviceID != climadviceID){
                $("#" + openedClimadviceID).removeClass("col-md-12").addClass("col-md-4");
            }
            $("#" + climadviceID).removeClass("col-md-4").addClass("col-md-12");
            openedClimadviceID = climadviceID;
            var scrollTo = VueScrollTo.scrollTo("#" + climadviceID);
        }
    }
}
</script>


<style>
.card{
    cursor: pointer;
}
.card:hover{
    box-shadow: 0 0 10px gray;
}
</style>