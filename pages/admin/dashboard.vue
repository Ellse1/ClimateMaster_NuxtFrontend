<template>
    <div class="container">
        <div class="container bg-light text-center p-2" style="min-height:600px;">
            <h1>Hallo {{user.firstname}}</h1>
            <h4>Sie befinden sich im Admin Dashboard</h4>
            <div class="text-center">
                <hr class="col-6 mx-auto">
            </div>

            <div class="row">
                <div class="col-md-3 mt-4">
                    <div class="w-100 rounded">
                        <button class="w-100 btn btn-default" v-on:click="changeOpenedDashboardComponent('verifyCompanies')">Firmenanfragen</button>
                        <button class="w-100 btn btn-default" v-on:click="changeOpenedDashboardComponent('showAllUsers')">Benutzer</button>
                        <button class="w-100 btn btn-default" v-on:click="changeOpenedDashboardComponent('imagecreatorSharingPermitted')">Imagecreator</button>
                        <button class="w-100 btn btn-default" v-on:click="changeOpenedDashboardComponent('showPageLogs')">Aufrufinformation</button>
                        <button class="w-100 btn btn-default" v-on:click="changeOpenedDashboardComponent('climadviceChecks')">ClimadviceChecks</button>
                    </div>
                </div>

                <hr id="id_line_mobile" class="col-5 mx-auto">


                <div class="col-md-9 mt-4">
                    <!-- To Verify companies -->
                    <verifyCompanies v-if="openedDashboardComponent == 'verifyCompanies'" />

                    <!-- To Show all Users -->
                    <showAllUsers v-if="openedDashboardComponent == 'showAllUsers'"/>

                    <!-- To download images from imagecreator -> download pictures of all users with "sharing_permitted" = true -->
                    <imagecreatorSharingPermitted v-if="openedDashboardComponent == 'imagecreatorSharingPermitted'"/>
                
                    <showPageLogs v-if="openedDashboardComponent == 'showPageLogs'"/>

                    <!-- To add / edit / delete climadviceChecks -->
                    <climadviceChecks v-if="openedDashboardComponent == 'climadviceChecks'" />
                </div>
            </div>



                
        </div>
    </div>
</template>
<script>
import verifyCompanies from '~/components/AdminDashboard/verifyCompanies';
import showAllUsers from '~/components/AdminDashboard/showAllUsers';
import imagecreatorSharingPermitted from '~/components/AdminDashboard/imagecreatorSharingPermitted';
import showPageLogs from '~/components/AdminDashboard/showPageLogs';
import climadviceChecks from '~/components/AdminDashboard/climadviceChecks';

export default {
    middleware: 'auth',
    components:{
        verifyCompanies,
        showAllUsers,
        imagecreatorSharingPermitted,
        showPageLogs,
        climadviceChecks
    },
    data(){
        return{
            openedDashboardComponent: 'verifyCompanies'
        }
    },
    mounted(){
        if(this.user.role != 'admin'){
            this.$router.push("/");
        }
    },
    methods:{
        changeOpenedDashboardComponent(componentNameToOpen){
            this.openedDashboardComponent = componentNameToOpen;
        }
    }
}
</script>
<style scoped>
#id_line_mobile{
    display:none;
}
@media only screen and (max-width: 600px) {
    #id_line_mobile{
        display: block;
    }
}
</style>