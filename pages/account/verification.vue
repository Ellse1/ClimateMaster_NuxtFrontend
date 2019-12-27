<template>
    <div class="container">
        <div id="id_div_loading_animation" class="text-center mt-5 text-success">
            Verifizierung
        </div>
        <div class="text-center">
            <notification :message='error' v-if="error" class="mt-4 text-danger" />
            <notification :message='success' v-if="success" class="mt-4 text-success" />
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
            success: null
        };
    },
    async mounted(){

        $('#id_div_loading_animation').addClass('loading-animation'); 

        let formData = new FormData();
        formData.append('userID', this.$route.query.userID);
        formData.append('verificationCode', this.$route.query.verificationCode);

        try {

            const{data} = await this.$axios.post('verification',
            formData, {
                headers :{
                    'ContentType' : 'multipart/form-Data'
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

            $('#id_div_loading_animation').removeClass('loading-animation');
            
        } catch (e) {
            this.error = e.response.data.message;
            $('#id_div_loading_animation').removeClass('loading-animation');
        }
    }
}
</script>

<style scoped>

.loading-animation:after{
    border-color: green transparent green transparent;
}
</style>