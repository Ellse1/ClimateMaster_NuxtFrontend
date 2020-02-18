<template>
    <div class="container">
        <div class="container bg-light text-center p-2" style="min-height:600px;">
            <h1>Hallo {{user.firstname}}</h1>
            <h4>Sie befinden sich im Admin Dashboard</h4>
            <div class="text-center">
                <hr class="col-md-6">
            </div>

            <div class="row">
                <div class="col-md-3 mt-4">
                    <div class="w-100 rounded">
                        <button class="w-100 btn btn-default" v-on:click="changeOpenedDashboardComponent('verifyCompanies')">Firmenanfragen</button>
                        <button class="w-100 btn btn-default" v-on:click="changeOpenedDashboardComponent('showAllUsers')">Benutzer</button>
                    </div>
                </div>
                <div class="col-md-9 mt-4">
                    <!-- To Verify companies -->
                    <verifyCompanies v-if="openedDashboardComponent == 'verifyCompanies'" />

                    <!-- To Show all Users -->
                    <showAllUsers v-if="openedDashboardComponent == 'showAllUsers'"/>
                </div>
            </div>



                
        </div>
    </div>
</template>
<script>
import verifyCompanies from '~/components/AdminDashboard/verifyCompanies';
import showAllUsers from '~/components/AdminDashboard/showAllUsers';
export default {
    middleware: 'auth',
    components:{
        verifyCompanies,
        showAllUsers
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