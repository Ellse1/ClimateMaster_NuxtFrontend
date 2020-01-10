<template>
    <div>
        <div class="row">
            <div class="col-md-4" v-for="climadvice in climadvices" v-bind:key="climadvice.id" :id="climadvice.name" >
                <div class="card mb-3">
                    <div class="card-body" >

                        <!-- x to close -->
                        <span class="x_to_close_climadvice" :id="'id_x_to_close_' + climadvice.name" v-on:click="closeClimadvice(climadvice.name)" style="display:none;position:absolute;top:10px;right:10px; transform:rotate(20deg);"><h2>+</h2></span>

                        <!-- v-on:clicked here on title and shortDescription because i cannot put it on the whole element!
                        whole element: if i click for example the 'x' to close, this "climadviceClikcked" is also triggerd -->
                        <h5 v-on:click="climadviceClicked(climadvice.name)">{{climadvice.title}}</h5>
                        <p class="card-text" v-on:click="climadviceClicked(climadvice.name)">
                            {{climadvice.shortDescription}}
                        </p>
                        <div class="text-center">
                            <!-- <font-awesome-icon :icon=climadvice.iconName class="text-success" style="font-size: 100px"/>  -->
                            <!-- <font-awesome-icon icon="dollar-sign"  style="font-size: 30px"/> -->
        
                        </div>
                    </div>

                    <!-- If admin -->
                    <div class="card-footer text-center" v-if="user.role === 'admin'">
                        <button v-on:click="editClimadvice(climadvice)" class="btn btn-default border">Bearbeiten</button>
                        <button v-on:click="deleteClimadvice(climadvice)" class="btn btn-default border">Löschen</button>
                    </div>
                </div>
            </div>

            <!--If admin ->  To add a climadvice -->
            <climadviceAdd id="id_climadviceAdd" v-if="user.role === 'admin'" @climadviceAdded="climadviceAdded"/>

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
        //one Climadvice card was clicked
        climadviceClicked(climadviceNameID){
            //If other is opened -> close and dont show 'x' to close
            if(openedClimadviceID != null && openedClimadviceID != climadviceNameID){
                $("#" + openedClimadviceID).removeClass("col-md-12").addClass("col-md-4");
                $("#id_x_to_close_" + openedClimadviceID).css("display", "none");
            }
            //open the climadvice which was clicked
            $("#" + climadviceNameID).removeClass("col-md-4").addClass("col-md-12");
            openedClimadviceID = climadviceNameID;
            var scrollTo = VueScrollTo.scrollTo("#" + climadviceNameID);
            $("#id_x_to_close_" + climadviceNameID).css("display", "block");
        },
        closeClimadvice(climadviceNameID){
            //if this climadvice is allready opened -> close
            if(openedClimadviceID != null && openedClimadviceID == climadviceNameID){
                $("#" + climadviceNameID).removeClass("col-md-12").addClass("col-md-4");
                $("#id_x_to_close_" + climadviceNameID).css("display", "none");
                openedClimadviceID = null;
            }
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

.x_to_close_climadvice:hover{
    animation:spin 0.3s ease-out;
}



@-moz-keyframes spin { 100% { -moz-transform: rotate(180deg); } }
@-webkit-keyframes spin { 100% { -webkit-transform: rotate(180deg); } }
@keyframes spin { 100% { -webkit-transform: rotate(180deg); transform:rotate(180deg); } }
</style>