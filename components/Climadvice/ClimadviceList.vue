<template>
    <div>
        <div class="row">
            <div class="col-md-4" v-for="climadvice in climadvices" v-bind:key="climadvice.id" :id="climadvice.name" >
                <div class="card mb-3">
                    <div class="card-body" v-on:click="climadviceClicked(climadvice.name)">

                        <h5>{{climadvice.title}}</h5>
                        <p class="card-text">
                            {{climadvice.shortDescription}}
                        </p>
                        <div class="text-center">
                            <img :src="'http://localhost:8000/images/climadviceIcons/' + climadvice.iconName" class="mx-center" alt="not found"  width="100px"/>                        
                        </div>
                    </div>
                    <div class="card-footer text-center" v-if="loggedIn">
                        <button v-on:click="editClimadvice(climadvice)" class="btn btn-default border">Bearbeiten</button>
                        <button v-on:click="deleteClimadvice(climadvice)" class="btn btn-default border">Löschen</button>
                    </div>
                </div>
            </div>

            <!-- To add a climadvice -->
            <climadviceAdd id="id_climadviceAdd" v-if="loggedIn" @climadviceAdded="climadviceAdded"/>

        </div>

        <climadviceEdit style="display:none;" id="id_climadviceEdit" @climadviceEdited="climadviceEdited" :climadviceForEdit="climadviceForEdit"/>
        <climadviceDelete style="display:none;" id="id_climadviceDelete" @climadviceDeleted="climadviceDeleted" :climadviceForDelete="climadviceForEdit" />
    </div>
</template>

<script>
import climadviceEdit from '~/components/Climadvice/ClimadviceEdit';
import climadviceAdd from '~/components/Climadvice/ClimadviceAdd';
import climadviceDelete from '~/components/Climadvice/ClimadviceDelete';
import Vue from 'vue';
var VueScrollTo = require('vue-scrollto');
var openedClimadviceID = null;
export default {
    props:['climadvices'],
    components:{
        climadviceAdd,
        climadviceEdit,
        climadviceDelete
    },
    data(){
        return{
            climadviceForEdit: {id: '', name : '', title: '', shortDescription: ''}
        };
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
        },
        editClimadvice(climadvice){
            this.climadviceForEdit = climadvice;
            $('#id_climadviceEdit').css('display', 'block');
        },
        climadviceEdited(climadvice){
            this.climadviceForEdit = climadvice;
            Vue.set(this.climadvices, this.climadvices.map(function(e) { return e.id; }).indexOf(climadvice.id), climadvice);
        },
        deleteClimadvice(climadvice){
            this.climadviceForEdit = climadvice;
            $('#id_climadviceDelete').css('display', 'block');
        },
        climadviceDeleted(climadvice){
            // this.climadviceForEdit = climadvice;
            this.climadvices.splice(this.climadvices.map(function(e){return e.id}).indexOf(climadvice.id), 1);
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