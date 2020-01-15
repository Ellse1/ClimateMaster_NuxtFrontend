<template>
    <div class="container bg-light pt-4" style="min-height:400px;">
        <h2 class="text-center">Mein ClimateMaster Profil</h2>


        <!-- For profile picture -->
        <div class="text-center">
            <label for="id_profilePicture">
                <div class="border border-dark pl-3 pr-3 pt-3" style="border-radius:50px;" id="id_div_uploadProfilePicture">
                    <!-- icon if no profile_picture -->
                    <font-awesome-icon v-if="profile_picture_name === null" icon="user-circle" id="id_icon_profile_picture" style="font-size: 200px;"/> 
                    <div id="id_div_loading" class="bg-success rounded mt-2 mb-2" style="width:50%;margin:auto;"></div>
                    <!-- image if profile picture available -->
                    <div  id="id_div_profilePicture" style="width:200px;height:200px;border-radius:50%;overflow:hidden;display:none;" class="border bg-dark">
                        <img id="id_img_profilePicture" style="height:100%;">
                    </div>
                    
                    <small id="id_message_typeAndSize_profilePicture" class="text-danger">
                        jpg, png, max:2MB<br>
                    </small>
                    <small>
                        Bild hochladen
                    </small>
                    
                </div>
            </label>
            <input type="file" class="mt-2" ref="image" id="id_profilePicture" name="profilePicture" v-on:change="handleImageUpload" style="display:none;"/>
        </div>

        <div class="row">
            <div class="col-md-6 mt-4">
                <h4 class="text-center">Meine Persönlichen Daten</h4>
                <div class="row">
                    <div class="col-6">
                        <input class="form-control text-center" v-model="firstname" disabled/>
                    </div>
                    <div class="col-6">
                        <input class="form-control text-center" v-model="lastname" disabled/>
                    </div>
                    <div class="col-12 mt-3">
                        <input class="form-control text-center" v-model="username" disabled/>
                    </div>
                    <div class="col-12 text-center mt-3">
                        <input class="form-control text-center" v-model="email" disabled/>
                    </div>
                </div>
            </div>

            <div class="col-md-6 mt-4">
                <h4 class="text-center">Mein zu Hause</h4>
                <div class="row">
                    <div class="col-9">
                        <input class="form-control text-center" v-model="street" placeholder="Staße"/>
                    </div>
                    <div class="col-3">
                        <input class="form-control text-center" v-model="house_number" placeholder="Nr."/>
                    </div>
                    <div class="col-4 text-center mt-3">
                        <input class="form-control text-center" v-model="postcode" placeholder="Plz."/>
                    </div>
                    <div class="col-8 text-center mt-3">
                        <input class="form-control text-center" v-model="residence" placeholder="Wohnort" />
                    </div>
                </div>
            </div>
        </div>

        <div class="col-md-12 mt-4 text-center" >
            <button id="id_button_save" class="btn btn-success mb-4 " style="width:90%" v-on:click="saveAddress">Änderungen speichern</button>
        
            <notification :message="error" v-if="error" class="text-danger mt-3" />
            <notification :message="success" v-if="success" class="text-success mt-3" />
        </div>


    </div>
</template>
<script>
import notification from "~/components/MainComponents/Notification"
export default {
    middleware: 'auth',
    components:{
        notification
    },
    data(){
        return{
            error:null,
            success: null,
            profile_picture_name: this.$auth.user.profile_picture_name,
            firstname: this.$auth.user.firstname,
            lastname: this.$auth.user.lastname,
            username: this.$auth.user.username,
            email: this.$auth.user.email,
            street: this.$auth.user.street,
            house_number: this.$auth.user.house_number,
            postcode: this.$auth.user.postcode,
            residence: this.$auth.user.residence
        };
    },
    async mounted(){
        //Get profile Picture if available
        
        $("#id_div_loading").addClass("loading-animation");
        try {
            const{data} = await this.$axios.post("user/getProfilePicture");
            
            if(data.state != 'error'){
                var rawResponse = data;
                //Give picture to element
                $("#id_img_profilePicture").attr('src', 'data:image/jfif;base64,'+rawResponse);

                //Show right element
                $("#id_div_profilePicture").show();
                $("#id_img_profilePicture").show();
                $("#id_icon_profile_picture").hide();
            }
        } catch (e) {
            
        }
        
        $("#id_div_loading").removeClass("loading-animation");

    },
    methods:{

        async handleImageUpload(){

            $("#id_div_loading").addClass("loading-animation");

            this.profilePicture = this.$refs.image.files[0];

            let formData = new FormData();
            formData.append('profilePicture', this.profilePicture);

            try {
                const{data} = await this.$axios.post('user/addProfilePicture', 
                formData, {
                    headers:{
                        'Content-Type' : 'multipart/form-data'
                    }
                })
                var rawResponse = data;
                //Give picture to element
                $("#id_img_profilePicture").attr('src', 'data:image/jfif;base64,'+rawResponse);

                //Show right element
                $("#id_div_profilePicture").show();
                $("#id_img_profilePicture").show();
                $("#id_icon_profile_picture").hide();
                
            } catch (e) {
                
            }

            $("#id_div_loading").removeClass("loading-animation");

        },

        async saveAddress(){
            $("#id_button_save").addClass("loading-animation");

            let formData = new FormData();
            formData.append('street', this.street);
            formData.append('house_number', this.house_number);
            formData.append('postcode', this.postcode);
            formData.append('residence', this.residence);

            try {
                const{data} = await this.$axios.post("user/saveAddress",
                formData,{
                    headers:{
                        "Content-Type" : "multipart/form-data"
                }
                });

                if(data.state == 'error'){
                    this.error = data.message;
                    this.success = null;
                }
                else if(data.state == 'success'){
                    this.success = data.message;
                    this.error = null;
                }
                else{
                    this.error = "Konnte nicht gespeichert werden, versuchen Sie es später noch einmal."
                }

            } catch (e) {
                this.error = e.response.data.message;
            }
            
            $("#id_button_save").removeClass("loading-animation");
        }
    }
}
</script>
<style  scoped>
#id_div_uploadProfilePicture:hover{
    box-shadow: 0 0 10px gray;
    cursor: pointer;
}
#id_message_typeAndSize_profilePicture{
    display: none;
}
#id_div_uploadProfilePicture:hover #id_message_typeAndSize_profilePicture {
    display: block;
}

</style>