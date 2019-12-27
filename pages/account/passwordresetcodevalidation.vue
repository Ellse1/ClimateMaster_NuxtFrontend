<template>
    <div class="container">
        <div class="container text-center mt-4" style="max-width:400px;">
            
            <h4>Passwort zurücksetzen.</h4>
            Hier können Sie ein neues Passwort für Ihr ClimateMaster Konto bestimmen.
            <form @submit.prevent="resetPassword">

                <div class="form-group">
                    <!-- Hidden field for id -->
                    <input type="hidden" class="form-control text-center" v-model="userID"/>
                </div>
                <div class="form-group">
                    <input type="hidden" class="form-control text-center" v-model="password_reset_code"  placeholder="Passwort Reset Code"/>
                </div>
                <div class="form-group">
                    <input type="password" class="form-control text-center" v-model="password" placeholder="Neues Passwort" required/>
                </div>
                <div class="form-group">
                    <button id="id_button_reset_password" class="btn btn-success">Passwort neu setzen</button>
                </div>
            </form> 

            <notification :message="error" v-if="error" class="text-danger text-center" />
            <notification :message="success" v-if="success" class="text-success text-center" />

        </div>
    </div>
</template>
<script>
import notification from '~/components/MainComponents/Notification';
export default {
    components:{
        notification
    },
    data(){
        return{
            userID : this.$route.query.userID,
            password_reset_code : this.$route.query.password_reset_code,
            password: null,
            error:null,
            success:null
        };
    },
    methods:{
        async resetPassword(){
            $('#id_button_reset_password').addClass("loading-animation");

            let formData = new FormData();
            formData.append('userID', this.userID);
            formData.append('password_reset_code', this.password_reset_code);
            formData.append('password', this.password);

            try {
                const{data} = await this.$axios.post('/passwordReset', 
                formData, {
                    headers: {
                        "Content-Type" : "multiple/Form-Data"
                    }
                });

                if(data.state == 'error'){
                    this.error = data.message;
                    this.success = null;
                }
                if(data.state == 'success'){
                    this.success = data.message;
                    this.error = null;
                }

            } catch (e) {
                this.error = e.response.data.message
            }

            $('#id_button_reset_password').removeClass("loading-animation");

        }
    }
}
</script>