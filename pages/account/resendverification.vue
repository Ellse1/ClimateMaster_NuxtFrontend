<template>
    <div class="container mt-4">

        <h4>Verifizierungslink noch einmal senden.</h4>
        <p>Geben Sie Ihre E-Mail ein. Wir senden Ihnen dann einen Verifizierungslink an Ihre E-Mail Adresse.
            Folgen Sie einfach dem Verifizierungslink um Ihr Konto zu aktivieren.
        </p>
        <form @submit.prevent="sendVerificatioLink">
            <div class="form-group">
                <input class="form-control col-md-6" v-model="email" placeholder="Email Adresse" required/>
            </div>
            <div class="form-group">
                <button id="id_button_sendVerificationLink" class="btn btn-success col-md-6">Verifizierungslink senden</button>
            </div>
        </form>
        <notification :message="error" v-if="error" class="text-danger col-md-6" />
        <notification :message="success" v-if="success" class="text-success col-md-6" />

    </div>
</template>

<script>
import notification from '~/components/MainComponents/Notification';
export default {
    components:{
        notification
    },
    data(){
        return {
            error: null,
            success: null,
            email: null
        };
    },
    methods:{
        async sendVerificatioLink(){
            
            $('#id_button_sendVerificationLink').addClass("loading-animation");

            let formData = new FormData();
            formData.append('email', this.email);

            try {
                const{data} = await this.$axios.post('/resendVerificationLink', 
                formData,
                {
                    headers:{
                        "Content-Type" : "'multipart/form-data'"
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

            $('#id_button_sendVerificationLink').removeClass("loading-animation");

        }
    }
}
</script>