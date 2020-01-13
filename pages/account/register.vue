<template>
    <div class="container">
        <div class="row mt-3">
            <div class="col text-center" id="id_col_1">
                <div style="margin-top:30%;">
                    <h1>Register now and become</h1>
                    <h1 class="display-3"><b><span class="text-success">Climate</span>Master</b></h1>
                    <h1 class="display-3"><b>2020</b></h1>
                </div>
            </div>
            <div class="col">
                <div style="max-width: 400px; margin:auto; margin-top:100px;background-color:rgba(247, 247, 247, 0.3)" class="border border-success rounded p-4">
                    <div class="text-center">
                        <h4>Register at</h4>
                        <h4><span class="text-success">Climate</span>Master</h4>
                        <p>Die Registrierung ist aus rechtlichen Gründen noch nicht gestattet bzw. freigegeben.</p>
                    </div>
                    <form @submit.prevent="registerUser">
                        <div class="row">
                            <div class="col-6">
                                <input class="form-control" v-model="firstname" required placeholder="Vorname"/>
                            </div>
                            <div class="col-6">
                                <input class="form-control" v-model="lastname" required placeholder="Nachname" />
                            </div>                           
                            <div class="col-12 mt-3">
                                <input class="form-control" v-model="username" required placeholder="Benutzername" />
                            </div>
                            <div class="col-12 mt-3">
                                <input class="form-control" v-model="email" required placeholder="e-mail" />
                            </div>
                            <div class="col-12 mt-3">
                                <input class="form-control" v-model="password" required placeholder="Neues Passwort" type="password"/>
                            </div>
                            <!-- <div class="col-12">
                                <small>optional</small>
                            </div> -->
                            <!-- <div class="col-8 mt-3">
                                <input class="form-control" v-model="street"  placeholder="Straße" />
                            </div>
                            <div class="col-4 mt-3">
                                <input class="form-control" v-model="house_number"  placeholder="Nr." />                               
                            </div>
                            <div class="col-4 mt-3">
                                <input class="form-control" v-model="postcode"  placeholder="Plz." type="number"/>                               
                            </div>
                            <div class="col-8 mt-3">
                                <input class="form-control" v-model="residence" placeholder="Wohnort"/>                               
                            </div> -->

                            <div class="col-12 text-center">
                                <notification :message="error" v-if="error" class="mt-4 text-danger"/>
                                <notification :message="success" v-if="success" class="mt-4 text-success"/>
                            </div>

                            <div class="col-12 mt-3">
                                <div class="text-center">
                                    <button id="id_button_register" class="btn btn-success pl-5 pr-5">
                                        <!-- register -->
                                        <!-- loading ring -->
                                        Registrieren
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div style="margin:auto; max-width:400px;background-color:rgba(247, 247, 247, 0.3)" class="text-center mt-3 border border-success rounded mb-3">
                    Schon ein <span class="text-success">Climate</span>Master Konto?<br>
                    <nuxt-link to="/account/login" class="btn btn-success m-3 pl-5 pr-5">Einloggen</nuxt-link> 
                </div>
            </div>
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
            firstname: '',
            lastname: '',
            username: '',
            email: '',
            password: '',
            street: '',
            house_number: '',
            postcode: '',
            residence: '',
            error: null,
            success: null
        }
    },
    methods:{
        async registerUser(){

            $('#id_button_register').addClass("loading-animation");

            let formData = new FormData();
            formData.append('firstname', this.firstname);
            formData.append('lastname', this.lastname);
            formData.append('username', this.username);
            formData.append('email', this.email);
            formData.append('password', this.password);
            formData.append('street', this.street);
            formData.append('house_number', this.house_number);
            formData.append('postcode', this.postcode);
            formData.append('residence', this.residence);

            try{
                const{data} = await this.$axios.post('register', 
                formData,{
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                if(data.state == 'error'){
                    this.error = data.message;
                    this.success = null;
                }
                if(data.state == 'success'){
                    this.error = null;
                    this.success = data.message;

                  //  this.$router.push('/login');
                }

                $('#id_button_register').removeClass('loading-animation');

            }catch (e){
                alert("Error: " + e);
                this.error = e.response.data.message;
                $('#id_button_register').removeClass('loading-animation');                
            }
        }
    }
}
</script>



<style scoped>




/* Dont display one side if on smartphone */
@media only screen and (max-width: 600px){
#id_col_1{
    display: none;
}
}
</style>