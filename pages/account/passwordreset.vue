<template>
    <div>
        <div class="container text-center mt-4" style="max-width:400px;">
            <h4>Passwort zurücksetzen</h4>
            <p>Hier können Sie Ihr Passwort zurücksetzen, falls Sie dieses vergessen haben. Geben Sie unten
                Ihre Email-Adresse ein, wir senden Ihnen dann einen Link, um ein neues Passwort auszuwählen.
            </p>

            <form @submit.prevent="sendPasswordResetLink">
                <div class="form-group">
                    <input type="email" class="form-control text-center" v-model="email" placeholder="Email Adresse" required/>
                </div>
                <div class="form-group">
                    <button id="id_button_resetPassword" class="btn btn-success">Passwort zurücksetzen</button>
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
            error: null,
            success: null,
            email: null
        };
    },
    methods:{
        async sendPasswordResetLink(){

            $('#id_button_resetPassword').addClass('loading-animation');

            let formData = new FormData();
            formData.append('email', this.email);

            try {
                const{data} = await this.$axios.post('/sendResetPasswordLink', 
                formData,{
                    headers:{
                        "Content-Type" : "multipart/form-data"
                    }
                });

                if(data.state == "error"){
                    this.error = data.message;
                    this.success = null;
                }
                if(data.state == "success"){
                    this.success = data.message;
                    this.error = null;
                }

            } catch (e) {
                this.error = e.response.data.message;
            }
            
            $('#id_button_resetPassword').removeClass('loading-animation');

        }
    }
}
</script>