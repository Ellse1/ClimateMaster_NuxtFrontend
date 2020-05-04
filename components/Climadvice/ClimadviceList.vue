<template>
    <div>
        <div class="row" v-if="climadvices != null && climadvices.length > 1">
            <div class="col-md-4" v-for="climadvice in climadvices" v-bind:key="climadvice.id" :id="climadvice.name" >
                <div class="card mb-3">
                    <div class="card-body text-center">

                        <!-- v-on:clicked here on title and shortDescription because i cannot put it on the whole element!
                        whole element: if i click for example the 'x' to close, this "climadviceClikcked" is also triggerd -->
                        <div v-on:click="climadviceClicked(climadvice.name)">
                            <h5>{{climadvice.title}}</h5>
                            <p class="card-text">
                                {{climadvice.shortDescription}}
                            </p>
                            <div class="text-center">
                                <font-awesome-icon :icon=climadvice.iconName class="text-success" style="font-size: 100px"/> 
                            </div>
                        </div>


                        <!-- Individual ClimadviceComponent -->
                        <component v-bind:is="climadvice.name"  v-if="openedClimadviceNameIDForIndividualComponent == climadvice.name" />


                    </div>

                    <client-only>
                    <!-- If admin -->
                    <div class="card-footer text-center" v-if="user.role === 'admin'">
                        <button v-on:click="editClimadvice(climadvice)" class="btn btn-default border">Bearbeiten</button>
                        <button v-on:click="deleteClimadvice(climadvice)" class="btn btn-default border">Löschen</button>
                    </div>
                    </client-only>
                </div>
            </div>

            <client-only>
            <!--If admin ->  To add a climadvice -->
            <climadviceAdd id="id_climadviceAdd" v-if="user.role === 'admin'" @climadviceAdded="climadviceAdded"/>
            </client-only>
        </div>

        <!-- If it is only one climadvice -> show only the one -> it exists only one climadvice [0]  -->
        <div v-if="climadvices != null && climadvices.length == 1">
            <div class="w-100" :id="climadvices[0].name">
                <div class="card">
                    <div class="card-body text-center">
                        <span class="x_to_close_climadvice" :id="'id_x_to_close_' + climadvices[0].name" v-on:click="closeClimadvice(climadvices[0].name)" style="position:absolute;top:10px;right:10px; transform:rotate(20deg);"><h2>+</h2></span>
                        <div>
                            <h5>{{climadvices[0].title}}</h5>
                            <p class="card-text">
                                {{climadvices[0].shortDescription}}
                            </p>
                            <div class="text-center">
                                <font-awesome-icon :icon=climadvices[0].iconName class="text-success" style="font-size: 100px"/> 
                            </div>
                        </div>

                        <component v-bind:is="climadvices[0].name"/>


                    </div>
                </div>
            </div>
        </div>


        <climadviceEdit style="display:none;" id="id_climadviceEdit" @climadviceEdited="climadviceEdited" :climadviceForEdit="climadviceForEdit"/>
        <climadviceDelete style="display:none;" id="id_climadviceDelete" @climadviceDeleted="climadviceDeleted" :climadviceForDelete="climadviceForEdit" />
    </div>
</template>

<script>
import climadviceEdit from '~/components/Climadvice/ClimadviceEdit';
import climadviceAdd from '~/components/Climadvice/ClimadviceAdd';
import climadviceDelete from '~/components/Climadvice/ClimadviceDelete';

import buyLess from '~/components/ClimadviceContent/buyLess/buyLess';
import buyGreenElectricity from '~/components/ClimadviceContent/buyGreenElectricity/buyGreenElectricity';
import installPhotovoltaik from '~/components/ClimadviceContent/installPhotovoltaik/installPhotovoltaik';
import eatVegetarian from '~/components/ClimadviceContent/eatVegetarian/eatVegetarian';
import houseIsolation from '~/components/ClimadviceContent/houseIsolation/houseIsolation';
import climateFriendlyHeating from '~/components/ClimadviceContent/climateFriendlyHeating/climateFriendlyHeating';
import buyElectricCar from '~/components/ClimadviceContent/buyElectricCar/buyElectricCar';
import usePublicTransport from '~/components/ClimadviceContent/usePublicTransport/usePublicTransport';
import dontFly from '~/components/ClimadviceContent/dontFly/dontFly';
import buyRegionalSeasonal from '~/components/ClimadviceContent/buyRegionalSeasonal/buyRegionalSeasonal';
import climateFriendlyInvestment from '~/components/ClimadviceContent/climateFriendlyInvestment/climateFriendlyInvestment';
import saveEnergy from '~/components/ClimadviceContent/saveEnergy/saveEnergy';


import Vue from 'vue';
var VueScrollTo = require('vue-scrollto');
export default {
    props:['climadvices'],
    components:{
        climadviceAdd,
        climadviceEdit,
        climadviceDelete,
        buyLess,
        buyGreenElectricity,
        installPhotovoltaik,
        eatVegetarian,
        houseIsolation,
        climateFriendlyHeating,
        buyElectricCar,
        usePublicTransport,
        dontFly,
        buyRegionalSeasonal,
        climateFriendlyInvestment,
        saveEnergy
    },
    data(){
        return{
            climadviceForEdit: {id: '', name : '', title: '', shortDescription: ''},
            openedClimadviceNameIDForIndividualComponent : '',
        };
    },
    methods:{
        climadviceAdded(climadvice){
            this.climadvices.push(climadvice);
        },
        //one Climadvice card was clicked
        climadviceClicked(climadviceNameID){
            this.$emit("showOnlyOneClimadvice", climadviceNameID);
        },
        closeClimadvice(climadviceNameID){
            this.$emit("closeClimadvice")
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