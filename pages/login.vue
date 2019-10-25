<template>
    <div class="container text-center">
        <h2>Login</h2>

        <Notification :message="error" v-if="error" class="mt-4 text-danger"/>

        <form class="text-center" @submit.prevent="addUser">
            <div class="form-group">
                <label for="email">E-Mail</label>
                <input name="email" type="email" v-model="userForm.email" id="email" class="form-control col-md-6 text-center" style="margin:auto;" placeholder="email" required/>
                <span class="invalid-feedback" role="alert"><strong></strong></span>
            </div>
            <div class="form-group">
                <label for="password">Passwort</label>
                <input name="password" type="password" v-model="userForm.password"  id="password" class="form-control col-md-6 text-center" style="margin:auto;" placeholder="password" required/>
                <span class="invalid-feedback" role="alert"><strong></strong></span>
            </div>
            <button type="submit" class="btn btn-default border">login</button>
        </form>
    </div>
</template>

<script>
import Notification from '~/components/Notification';

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