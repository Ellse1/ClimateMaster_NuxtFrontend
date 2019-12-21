<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <div style="max-width:400px;margin-top:100px;" class="container border border-success rounded text-center">
                    <h4>Login at</h4> 
                    <h4><span class="text-success">Climate</span>Master</h4>
                    <Notification :message="error" v-if="error" class="mt-4 text-danger"/>

                    <form class="text-center" @submit.prevent="addUser">
                        <div class="form-group">
                            <!-- <label for="email">E-Mail</label> -->
                            <input name="email" type="email" v-model="userForm.email" id="email" class="form-control text-center" style="margin:auto;" placeholder="email" required/>
                            <span class="invalid-feedback" role="alert"><strong></strong></span>
                        </div>
                        <div class="form-group">
                            <!-- <label for="password">Passwort</label> -->
                            <input name="password" type="password" v-model="userForm.password"  id="password" class="form-control text-center" style="margin:auto;" placeholder="password" required/>
                            <span class="invalid-feedback" role="alert"><strong></strong></span>
                        </div>
                        <button type="submit" class="btn m-2 btn-success pl-5 pr-5">login</button>
                    </form>
                </div>
                <div style="max-width:400px;" class="container mt-2 border border-success rounded text-center">
                    Noch kein <span class="text-success">Climate</span>Master Konto?<br>
                    <nuxt-link to="/register" class="btn btn-success m-2 pl-4 pr-4">register</nuxt-link>
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
            try{
                await this.$auth.login({
                    data: this.userForm
                });
            }catch(e){
                this.error = e.response.data.message;
            }
        }
    }
}
</script>


<style scoped>

</style>