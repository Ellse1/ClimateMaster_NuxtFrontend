<template>
    <div>
        <h4>Angemeldete Benutzer</h4>

        <div v-for="(user, index) in allUsers" v-bind:key="user.id">
            <div class="row col-md-8 mx-auto">
                <div class="col">
                    {{index}}
                </div>
                <div class="col">
                    {{user.email}}
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
        return{
            error:null,
            success: null,
            allUsers: null
        }
    },
    async mounted(){
        try {
            const{data} = await this.$axios.post('admin/getAllUsers');

            if(data.state == 'error'){
                this.error = data.message;
                this.success = null;
            }
            else if(data.state == "success"){
                this.error = null;
                this.allUsers = data.data;
            }
            else{
                this.error = "Die User konnten leider nicht geholt werden."
            }

        } catch (e) {
            this.error = "Die User konnten leider nicht geholt werden. " + e.response.data.message;
        }
    }   
}
</script>