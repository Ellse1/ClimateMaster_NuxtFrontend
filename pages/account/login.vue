<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <div style="max-width:400px;margin-top:100px;background-color:rgba(247, 247, 247, 0.3)" class="container border border-success rounded text-center">
                    <h4><span class="text-success">Climate</span>Master</h4>                    
                    <h5>Einloggen</h5> 
                    <Notification :message="error" v-if="error" class="mt-4 text-danger"/>

                    <form class="text-center" @submit.prevent="addUser">
                        <div class="form-group">
                            <!-- <label for="email">E-Mail</label> -->
                            <input name="email" type="email" v-model="userForm.email" id="email" class="form-control text-center" style="margin:auto;" placeholder="email" required/>
                        </div>
                        <div class="form-group">
                            <!-- <label for="password">Passwort</label> -->
                            <input name="password" type="password" v-model="userForm.password"  id="password" class="form-control text-center" style="margin:auto;" placeholder="password" required/>
                        </div>
                        <div class="form-group">
                            <button id="id_button_login" type="submit" class="btn mb-2 btn-success pl-5 pr-5">Einloggen</button>
                        </div>
                        <div class="form-group">
                            <nuxt-link to="/account/passwordreset"><small>Passwort vergessen</small></nuxt-link>
                        </div>

                    </form>
                </div>
                <div style="max-width:400px;background-color:rgba(247, 247, 247, 0.3)" class="container mt-2 border border-success rounded text-center">
                    Noch kein <span class="text-success">Climate</span>Master Konto?<br>
                    <nuxt-link to="/account/register" class="btn btn-success m-2 pl-4 pr-4">Registrieren</nuxt-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Notification from '~/components/MainComponents/Notification';

export default {
    components: {
        Notification
    },

    data() {
        return {
            userForm: {
                email: '',
                password: ''
            },
            error: null,
            success: null
        }
    },
    methods: {
        async addUser() {
            $("#id_button_login").addClass('loading-animation')
            try{
                await this.$auth.login({
                    data: this.userForm
                });
            }catch(e){
                this.error = e.response.data.message;
            }
            $("#id_button_login").removeClass('loading-animation')

        }
    }
}
</script>


<style scoped>

</style>