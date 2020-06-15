<template>
    <div>
        <div class="row" v-if="climadvices != null && climadvices.length > 1">
            <div class="col-md-4" v-for="climadvice in climadvices" v-bind:key="climadvice.id" :id="climadvice.name">
                <div class="card mb-3 cursor-pointer">
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
                        <!-- <component v-bind:is="climadvice.name"  v-if="openedClimadviceNameIDForIndividualComponent == climadvice.name" /> -->

                        <!-- Render the climadviceChecks -->
                        <div v-for="climadviceCheck in climadviceChecks" v-bind:key="climadviceCheck.id">
                            <div v-if="climadviceCheck.climadvice_id == climadvice.id" class="bg-light border rounded mt-2">
                                <button class="w-100 btn btn-default border-0" type="button" data-toggle="collapse" :data-target="'#collapseClimadviceCheck_' + climadviceCheck.id" :id="'id_button_climadviceCheck_showCollapse_' + climadviceCheck.id" aria-expanded="false">
                                    {{climadviceCheck.action}}<br>
                                    <font-awesome-icon :id="'id_climadvicesCheck_checkCircle_' + climadviceCheck.id" icon="check-circle"  style="font-size:20px;display:none;"/>     
                                    <span class="class_span_climadviceCheck_loading_animation"></span>
                                </button>
                                <!-- show message to make climadviceChecks public -->
                                <div class="text-center">
                                    <nuxt-link to="/account/myProfile?page=publish" :id="'id_link_publish_climadviceChecks_' + climadviceCheck.id" style="display:none;">Erreichte ClimadviceChecks anzeigen</nuxt-link>
                                </div>
                                <div class="collapse mt-2 px-2" :id="'collapseClimadviceCheck_' + climadviceCheck.id">
                                    <div v-if="climadviceCheck.question != null">
                                        <small>optional</small><br>
                                        <label>{{climadviceCheck.question}}</label>
                                        <input class="form-control text-center" :id="'id_climadviceCheck_input_answer_' + climadviceCheck.id" :placeholder="climadviceCheck.answer_proposal" v-on:input="climadviceCheckAnswerChanged(climadviceCheck.id)" />
                                    </div>
                                    <button class="btn btn-default border-dark mt-1 mb-1" :id="'id_climadviceCheck_button_send_' + climadviceCheck.id" v-on:click="climadviceCheckSubmitted(climadviceCheck.id)">{{climadviceCheck.action}}</button>
                                </div>
                                <!-- Notification to login, if the user is not logged in -->
                                <div :id="'id_div_notification_to_login_' + climadviceCheck.id" style="display:none;">
                                    <nuxt-link to="/account/login">Melde dich an, </nuxt-link> damit dein Fortschritt nicht verloren geht.
                                </div>
                                
                            </div>
                            
                        </div>

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
                        <!-- <span class="x_to_close_climadvice" :id="'id_x_to_close_' + climadvices[0].name" v-on:click="closeClimadvice(climadvices[0].name)" style="position:absolute;top:10px;right:10px; transform:rotate(20deg);"><h2>+</h2></span> -->
                        <div>
                            <h5>{{climadvices[0].title}}</h5>
                            <p class="card-text">
                                {{climadvices[0].shortDescription}}
                            </p>
                            <div class="text-center">
                                <font-awesome-icon :icon=climadvices[0].iconName class="text-success" style="font-size: 100px"/> 
                            </div>
                        </div>
                        
                        <!-- Individual ClimadviceComponent -->
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
            climadviceChecks: null,
            climadviceUserChecks: null,
            publicUserProfile: null
        };
    },
    async mounted(){
        //get the climadviceChecks
        try {
            const{data} = await this.$axios.post("climadviceCheck/getVisibleClimadviceChecks");
            if(data.state == "error"){
            }
            else if(data.state == "success"){
                this.climadviceChecks = data.data;
            }
        } catch (error) {
        }

        //get the climadviceUserChecks of the current User
        if(this.loggedIn == true){
            try {
                const{data} = await this.$axios.post("climadviceUserCheck/getClimadviceUserChecks_ByCurrentUser");
                if(data.state == "error"){}
                else if(data.state == "success"){
                    this.climadviceUserChecks = data.data;
            
                    $(".class_span_climadviceCheck_loading_animation").removeClass('loading-animation-green');
                    this.climadviceUserChecks.forEach((climadviceUserCheck) => {
                        //The ClimadviceChecks this user has done -> show buttons green and show check circle
                        $("#id_button_climadviceCheck_showCollapse_" + climadviceUserCheck.climadvice_check_id).addClass("btn-success")
                        $("#id_climadvicesCheck_checkCircle_" + climadviceUserCheck.climadvice_check_id).show(); 
                        $("#id_climadviceCheck_button_send_" + climadviceUserCheck.climadvice_check_id).addClass("btn-success")

                        //fill the input field with the provided answer
                        $("#id_climadviceCheck_input_answer_" + climadviceUserCheck.climadvice_check_id).val(climadviceUserCheck.question_answer);

                    })
                }
                else{}
            
            } catch (error) {}


            //get the publicUserProfile -> show message to publish the climadviceChecks
            try {
                const{data} = await this.$axios.post("publicUserProfile/getPublicUserProfile_ByCurrentUser");
                if(data.state == "error"){}
                else if(data.state == "success"){
                    this.publicUserProfile = data.data;   
                    
                    //show link to make the profile public
                    if(this.publicUserProfile.public_climadvice_checks == false){
                        this.climadviceUserChecks.forEach((climadviceUserCheck) => {
                                $("#id_link_publish_climadviceChecks_" + climadviceUserCheck.climadvice_check_id).show();
                            
                        })     
                    }           
                }
                else{}
            } catch (error) {
                
            }
        }
    },
    updated(){
        if(this.climadviceUserChecks != null){
            $(".class_span_climadviceCheck_loading_animation").removeClass('loading-animation-green');
            this.climadviceUserChecks.forEach((climadviceUserCheck) => {
                //The ClimadviceChecks this user has done -> show buttons green and show check circle
                $("#id_button_climadviceCheck_showCollapse_" + climadviceUserCheck.climadvice_check_id).addClass("btn-success")
                $("#id_climadvicesCheck_checkCircle_" + climadviceUserCheck.climadvice_check_id).show(); 
                $("#id_climadviceCheck_button_send_" + climadviceUserCheck.climadvice_check_id).addClass("btn-success")
            })   
        }else{
            //if logged in -> load the climadviceUserChecks -> show loading animation
            if(this.loggedIn){
                $(".class_span_climadviceCheck_loading_animation").addClass('loading-animation-green');
            }
        }
    },
    methods:{
        climadviceAdded(climadvice){
            this.climadvices.push(climadvice);
        },
        //one Climadvice card was clicked
        climadviceClicked(climadviceNameID){
            if(this.$route.query.climatemasterarea != undefined){
                var climatemasterareaFromRoute = this.$route.query.climatemasterarea;
                this.$router.push({path: "/climadvices", query:{climatemasterarea: climatemasterareaFromRoute, climadvice: climadviceNameID}});
            }else{
                this.$router.push({path: "/climadvices", query:{climadvice: climadviceNameID}});
            }


            // this.$emit("showOnlyOneClimadvice", climadviceNameID);
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
        },

        //Render the button new, if the user typed in a answer
        climadviceCheckAnswerChanged(climadviceCheckID){
            var answer = $("#id_climadviceCheck_input_answer_" + climadviceCheckID).val();
            //if there is no answer -> show only the action on the button
            if(answer.length == 0){
                $("#id_climadviceCheck_button_send_" + climadviceCheckID).html(this.climadviceChecks.find(x => x.id === climadviceCheckID).action);
            }
            //if there is a answer, show the action and the individual answer on the send button
            else{
                $("#id_climadviceCheck_button_send_" + climadviceCheckID).html(this.climadviceChecks.find(x => x.id === climadviceCheckID).button_send_text + " " + answer);
            }
        },
        async climadviceCheckSubmitted(climadviceCheckID){
           
           $("#id_climadviceCheck_button_send_" + climadviceCheckID).addClass("loading-animation-green");

            var answer = $("#id_climadviceCheck_input_answer_" + climadviceCheckID).val();
            var answerToSend = null;

            //only if an answer longer than 2 letters is provided -> send request to backend
            if(answer != null){
                if(answer.length >= 3){
                    answerToSend = answer;
                }
            }

            if(answerToSend != null || this.loggedIn != false)

                try {
                    //get the climadvice_id
                    var climadviceCheck = this.climadviceChecks.find(x => x.id == climadviceCheckID);
                    var climadvice_id = climadviceCheck.climadvice_id;

                    const{data} = await this.$axios.post("climadviceUserCheck/store", {
                        climadvice_check_id : climadviceCheckID,
                        climadvice_id: climadvice_id,
                        question_answer: answerToSend
                    });

                    if(data.state == "error"){

                    }
                    if(data.state == "success"){

                    }
                    else{

                    }

                } catch (error) {
                    
                }
            
            
            //if not logged in -> show message to login
            if(this.loggedIn == false){
                $("#id_div_notification_to_login_" + climadviceCheckID).show();
            }else{
                //show link to make the profile public
                if(this.publicUserProfile.public_climadvice_checks == false){
                    $("#id_link_publish_climadviceChecks_" + climadviceCheckID).show();
                }     
            }

            //make both buttons green and show check circle
            $("#id_button_climadviceCheck_showCollapse_" + climadviceCheckID).addClass('btn-success');
            $("#id_climadviceCheck_button_send_" + climadviceCheckID).addClass('btn-success');
            $("#id_climadvicesCheck_checkCircle_" + climadviceCheckID).show();

  
            //collapse content
            $("#id_button_climadviceCheck_showCollapse_" + climadviceCheckID).click();
        
        


            $("#id_climadviceCheck_button_send_" + climadviceCheckID).removeClass("loading-animation-green");
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