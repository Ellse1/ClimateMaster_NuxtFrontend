<template>
    <div class="container">
        <div class="container bg-light text-center" style="min-height:600px;">
            <h1>Hallo {{user.firstname}}</h1>
            <h4>Sie befinden sich im Admin Dashboard</h4>
            <div class="text-center">
                <hr class="col-md-6">
            </div>

            
            <verifyCompanies />
                
        </div>
    </div>
</template>
<script>
import verifyCompanies from '~/components/AdminDashboard/verifyCompanies';
export default {
    middleware: 'auth',
    components:{
        verifyCompanies
    },
    mounted(){
        if(this.user.role != 'admin'){
            this.$router.push("/");
        }
    }
}
</script>