<template>
    <div> 
        <h4>Firmen Anfragen</h4>
        <div v-for="(company, index) in companies" v-bind:key="company.id">
            <div class="row mt-2">
                <div class="col-md-6">
                    <h4>{{company.name}}</h4>
                </div>
                <div class="col-md-3 mt-1">
                    <nuxt-link :to="{name: 'company-showCompany-id', params:{id:company.id}}" class="btn btn-default border">Details ansehen</nuxt-link>
                </div>
                <!-- if not verified -->
                <div v-if="company.verified == false"  class="col-md-3 mt-1" >
                    <button class="btn btn-success" v-on:click="activateCompany(company.id, index)">Aktivieren</button>
                </div>
                <div v-else class="col-md-3 mt-1">
                     <button class="btn btn-danger" v-on:click="deactivateCompany(company.id, index)">Deaktivieren</button>                   
                </div>
            </div>


        </div>
        
        <notification :message="error" v-if="error" class="text-danger mt-2" />
        <notification :message="success" v-if="success" class="text-success mt-2" />

            
    </div>
</template>
<script>
import notification from "~/components/MainComponents/Notification";
export default {
    components:{
        notification
    },
    data(){
        return {
            error: null,
            success: null,
            companies: []
        }
    },
    async mounted(){
        try {
            const{data} = await this.$axios.get('company/getAllCompanies');

            if(data.state == "error"){
                this.error = data.message
                this.success = null;
            }
            else if(data.state == 'success'){
                this.success = data.message;
                this.error = null;
                this.companies = data.data;
            }
            else{
                this.error = "Es konnten keine Firmen geholt werden.";
            }
        } catch (e) {
            this.error = e.response.data.message;
        }
    },
    methods:{
        async activateCompany(companyID, index){
            try {
                const{data} = await this.$axios.post('admin/activateCompany_ByCompanyID', {
                    company_id: companyID
                });

                if(data.state == "error"){
                    this.error = data.message;
                    this.success = null;
                }
                else if(data.state == 'success'){
                    this.success = data.message;
                    this.error = null;
                    this.companies[index].verified = true;
                }
                else{
                    this.error = "Firma konnte leider nicht verifiziert werden.";
                }
            } catch (e) {
                this.error = "Firma konnte leider nicht verifiziert werden. Versuchen Sie es später noch einmal.";
            }
        },
        async deactivateCompany(companyID, index){
            try {
                const{data} = await this.$axios.post('admin/deactivateCompany_ByCompanyID', {
                    company_id: companyID
                });

                if(data.state == "error"){
                    this.error = data.message;
                    this.success = null;
                }
                else if(data.state == 'success'){
                    this.success = data.message;
                    this.error = null;
                    this.companies[index].verified = false;
                }
                else{
                    this.error = "Firma konnte leider nicht deaktiviert werden.";
                }
            } catch (e) {
                this.error = "Firma konnte leider nicht deaktiviert werden. Versuchen Sie es später noch einmal.";
            }
        }
    }
}
</script>